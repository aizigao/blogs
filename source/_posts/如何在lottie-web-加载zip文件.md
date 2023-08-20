---
title: 如何在lottie-web 加载zip文件
date: 2023-08-20 18:28:48
tags:
 - web 前端
 - 个人笔记
---

@[TOC]

## 前言

公司刚好有个需求需要用 web 加载一个 zip 的 lottie 的配置文件，文件的内容解压后如下

![如何在lottie-web-加载zip文件](/images/postimgs/如何在lottie-web-加载zip文件__2023-08-20-21-16-36.png)

搜索了一下发现网上没有加载的方案就研究了一下，这里记录一下

## 方案

老哥们都很忙直接上方案 DEMO

<p class="codepen" data-height="450" data-default-tab="js,result" data-slug-hash="XWoJJde" data-user="aizigao" style="height: 450px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aizigao/pen/XWoJJde">
  Untitled</a> by aizigao (<a href="https://codepen.io/aizigao">@aizigao</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

代码如下

```js
/**
 * 核心代码看这里
 * @param zipSrc 远端的链接
 */
const unZipLottieFile = async (zipSrc) => {
  /**
   * 加载zip文件 并用 arrayBuffer 读取，arraybuffer 即不带view的 二进制数据
   */
  const zipBuffer = await fetch(zipSrc).then((response) =>
    response.arrayBuffer()
  );

  /**
   * 使用 jsZip 读取文件
   */
  const zip = await JSZip.loadAsync(zipBuffer);

  // 打印一下给大家看下这个里的结构
  console.log("[zip]", zip);

  const imageUrlsMap = {};
  let oriJson = {};

  for (let zipEntry of Object.values(zip.files)) {
    // 跳过文件夹 和 隐藏文件
    if (zipEntry.dir || /\/\./.test(zipEntry.name)) {
      continue;
    }

    const isJSON = /\.json/i.test(zipEntry.name);
    const isImg = /\.(jpg|jpeg|png|gif)$/i.test(zipEntry.name);

    if (isJSON) {
      // 获取 核心的 JSON 配置文件
      const oriJsonText = await zipEntry.async("text");
      if (oriJsonText) {
        oriJson = JSON.parse(oriJsonText);
      }
    } else if (isImg) {
      // 图片以 blob方式读取
      const imgBlob = await zipEntry.async("blob");
      const fileName = zipEntry.name.split("/").pop();
      // 转成 临时的 URL
      imageUrlsMap[fileName] = URL.createObjectURL(new Blob([imgBlob]));
    }
  }

  /**
   * 定义一个辅助方法替换图片路径
   * @param obj
   * @returns
   */
  function deepUpdateImgPath(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === "p") {
          if (imageUrlsMap[obj[key]]) {
            const filePath = imageUrlsMap[obj[key]];
            obj[key] = filePath.split("/").pop();
          }
        } else {
          obj[key] = deepUpdateImgPath(obj[key]);
        }
      }
    }

    return obj;
  }

  // 替换JSON 内的 assets 内的 p 属性为 临时路径
  const targetJSON = deepUpdateImgPath(oriJson);
  return {
    json: targetJSON,
    imageUrlsMap
  };
};

const loadZipAnimation = async (src) => {
  const { json } = await unZipLottieFile(src);
  console.log(json);
  lottie.loadAnimation({
    container: document.getElementById("anim"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    // 这里要修改为这个
    assetsPath: `blob:${location.origin}/`,
    animationData: json
  });
};

const remoteZipFile = "https://aizigao.xyz/files/lottie-test.zip";
loadZipAnimation(remoteZipFile);
```

## 过程与解析

1. 首先我搜索了下 android 端的加载方案是先下载到本地，然后本地解压在加载

> 掘金 id 慢笑 的博文
> 参考这里 https://juejin.cn/post/6844904116309721095#heading-5

2. web 解压可以用 jsZip 处理，但解压后没法直接引用本地文件，解压也需要用户确认后下载到本地，本想放弃，但突然想到应该用 `blob://` 的临时 URL 路径应该就可以处理了

3. 使用 jsZip 解压后, 可以看到 jsZip 解压后的内容

![如何在lottie-web-加载zip文件](/images/postimgs/如何在lottie-web-加载zip文件__2023-08-20-21-47-35.png)

用 `.` 开头的隐藏文件和文件架是不用处理, 关键的是 json 文件, 可以看到的是 `u` 是文件目录, `p` 是文件名

![如何在lottie-web-加载zip文件](/images/postimgs/如何在lottie-web-加载zip文件__2023-08-20-22-08-46.png =200x200)

4. 现在的目标就是替换 p 的内容为 线上的地址，然后加载 json 就可以了
5. 线上的地址可以直接用 `URL.createObjectURL` 生产一个临时的，可以生产一个临时的 `blob:<location>/<uuid>` 的地址，页面关闭后会立即销毁

```js
// 图片以 blob方式读取
const imgBlob = await zipEntry.async("blob");
const fileName = zipEntry.name.split("/").pop();
// 转成 临时的 URL
imageUrlsMap[fileName] = URL.createObjectURL(new Blob([imgBlob]));
```
6. 已递归的方式替换 JSON 内 `p` 属性即可, 这里需要注意的是 使用 `lottie.loadAnimation` 使用了 `assetsPath`， 所以 JSON 对象的的数据内 `p` 值仅取生产临时链接的 uuid 值即可

```js
 lottie.loadAnimation({
    container: document.getElementById("anim"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    // 这里要修改为这个
    assetsPath: `blob:${location.origin}/`,
    animationData: json
  });
```

