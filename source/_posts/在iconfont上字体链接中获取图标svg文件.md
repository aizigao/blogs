---
title: 在iconfont上字体链接中获取图标svg文件(python)
date: 2020-07-23 21:08:14
tags: 
   - 脚本 
   - python
---


## 前言

现在国内越来越多的网站开始用[Iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/)　管理图标. 使用svg或者font图标，这种方式确实很方便并且大大减小了前端开发一部分工作量，当我看到一个网站用了iconfont的图标，并且我非常钟意它的设计时，我就有种想要获取一份它们原始svg文件的冲动，在我尝试一番后，终于让我总结了一波如何快速操作的方法。

## 分析

**打开iconfont.cn,　我建了一个测试项目,里面两个图标**

![iconfont 项目截图](https://i.loli.net/2021/03/01/VAT83zxRdBM6Es5.png)

可以看到它提供了三个文件格式
- Unicode
```css
@font-face {
  font-family: 'iconfont';  /* project id 1760743 */
  src: url('//at.alicdn.com/t/font_1760743_cqc31zkvkvd.eot');
  src: url('//at.alicdn.com/t/font_1760743_cqc31zkvkvd.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1760743_cqc31zkvkvd.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1760743_cqc31zkvkvd.woff') format('woff'),
  url('//at.alicdn.com/t/font_1760743_cqc31zkvkvd.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1760743_cqc31zkvkvd.svg#iconfont') format('svg');
}
```
- font Css

```
//at.alicdn.com/t/font_1760743_cqc31zkvkvd.css
```

- `symbols` 格式

```
//at.alicdn.com/t/font_1760743_cqc31zkvkvd.js
```

从上面看，每个项目都有唯一值是 `1760743_cqc31zkvkvd `，只有获取这个字段就可以下载到对应的, Unicode下的ttf/woff之类的字体，fontcss的css文件及 symbols,　我这次的目标是导出svg,　感觉symbols格式是最简单的。 如上面的例子中，对应的symbols内容对应的js文件

![js 里的内容](https://i.loli.net/2021/03/01/UcCo4Iq2DH9Pk3Q.png)

可以看到`el='<svg=....>'`里的就是我们需要的svg, 复制格式化一下,内容为一个svg文件，内部有两个symbol
```html
<svg>
  <symbol id="icon-fail" viewBox="0 0 1024 1024">
    <path
      d="M512 0C228.69504 0 0 228.69504 0 512s228.69504 512 512 512 512-228.69504 512-512S795.30496 0 512 0zM362.67008 332.36992c7.68 0 15.36 2.98496 21.32992 8.96l130.56 126.1568 130.56-126.1568c5.97504-5.97504 13.64992-8.53504 21.32992-8.32 7.68 0.21504 15.36512 3.2 21.34016 8.32 11.94496 11.94496 11.94496 30.72 0 42.67008l-129.8176 125.44 129.8176 125.44c11.94496 11.94496 11.94496 30.72 0 42.67008-11.94496 11.94496-30.72 11.94496-42.67008 0l-130.56-126.1568-130.56 126.1568c-11.94496 11.94496-30.72 11.94496-42.67008 0-11.94496-11.94496-11.94496-30.72 0-42.67008l129.8176-125.44L341.32992 384c-11.94496-11.94496-11.94496-30.72 0-42.67008a30.09024 30.09024 0 0 1 21.34016-8.96z"
      fill="#FF4D29"
    ></path>
  </symbol>
  <symbol id="icon-waitting-copy" viewBox="0 0 1024 1024">
    <path
      d="M512 0C229.23776 0 0 229.23776 0 512s229.23776 512 512 512 512-229.23776 512-512S794.76224 0 512 0z m-16.07168 225.8944a34.13504 34.13504 0 0 1 33.14176 34.11456v286.12096H819.2A34.13504 34.13504 0 0 1 819.2 614.4H494.92992a34.13504 34.13504 0 0 1-33.4592-40.66816 34.13504 34.13504 0 0 1-0.67072-6.52288v-307.2a34.13504 34.13504 0 0 1 35.12832-34.11968z"
      fill="#FF8000"
    ></path>
  </symbol>
</svg>
```

symbol转为svg,其它只要替换`symbol`为`svg` 就好了，再删除原来的最外部的`<svg></svg>`就可以了，如：

```html
<svg id="icon-fail" viewBox="0 0 1024 1024">
<path
    d="M512 0C228.69504 0 0 228.69504 0 512s228.69504 512 512 512 512-228.69504 512-512S795.30496 0 512 0zM362.67008 332.36992c7.68 0 15.36 2.98496 21.32992 8.96l130.56 126.1568 130.56-126.1568c5.97504-5.97504 13.64992-8.53504 21.32992-8.32 7.68 0.21504 15.36512 3.2 21.34016 8.32 11.94496 11.94496 11.94496 30.72 0 42.67008l-129.8176 125.44 129.8176 125.44c11.94496 11.94496 11.94496 30.72 0 42.67008-11.94496 11.94496-30.72 11.94496-42.67008 0l-130.56-126.1568-130.56 126.1568c-11.94496 11.94496-30.72 11.94496-42.67008 0-11.94496-11.94496-11.94496-30.72 0-42.67008l129.8176-125.44L341.32992 384c-11.94496-11.94496-11.94496-30.72 0-42.67008a30.09024 30.09024 0 0 1 21.34016-8.96z"
    fill="#FF4D29"
></path>
</svg>
<svg id="icon-waitting-copy" viewBox="0 0 1024 1024">
<path
    d="M512 0C229.23776 0 0 229.23776 0 512s229.23776 512 512 512 512-229.23776 512-512S794.76224 0 512 0z m-16.07168 225.8944a34.13504 34.13504 0 0 1 33.14176 34.11456v286.12096H819.2A34.13504 34.13504 0 0 1 819.2 614.4H494.92992a34.13504 34.13504 0 0 1-33.4592-40.66816 34.13504 34.13504 0 0 1-0.67072-6.52288v-307.2a34.13504 34.13504 0 0 1 35.12832-34.11968z"
    fill="#FF8000"
></path>
</svg>
```

之后就是将svg取出，取到每个svg的`id`属性做为文件名写入对应文件里就好了，这一块可以写一个脚本处理。

## 简化流程

可以看到整个过程比较通用，我这里写了个python脚本处理一下

```python

import os
import shutil
import re
import requests # 自行安装
import sys


def get_svgs_from_js_link(fileLink):
    # -- 获取内容
    file_content = str(requests.get(fileLink).content)

    # --- 从js中获取svg内容
    svg_str_regex = r"\<svg\>(.*?)\<\/svg\>"
    matches = re.findall(svg_str_regex, file_content)

    # 有svg时
    if len(matches):
        svg_str = re.sub(r'symbol', 'svg', matches[0])
        svg_str = re.sub('</svg>', '</svg>@@@', svg_str)
        svg_list = svg_str.split('@@@')

        # 清理dist
        if os.path.exists('./dist'):
            shutil.rmtree("./dist")
        os.mkdir('./dist')

        for svgContent in svg_list:
            if svgContent:
                fileName = re.findall(r'id=\"(.*?)\"', svgContent)[0]
                print('写入icon %s' % fileName)
                f = open("./dist/%s.svg" % fileName, "a")
                f.write(svgContent)
                f.close()

    print('搞定啦!!!')


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('使用方式如: \n python3 ./icon_symbol_to_svg http://at.alicdn.com/t/font_1760743_cqc31zkvkvd.js')
    else:
        get_svgs_from_js_link(sys.argv[1])


```

运行
```
python3 ./icon_symbol_to_svg http://at.alicdn.com/t/font_1760743_cqc31zkvkvd.js
```

然后你在dist文件下你可以看到所有的svg了



## 后记

- 写了脚本后方便了很多，细节就不考虑了，能用就行;
- python脚本简简写写还是比node方便一点,　不带node_module走比较方便，下次试试deno版本的。

**本博客持续修改与更新中，[点击这里查看最新的内容](http://aizigao.xyz/2020/07/23/在iconfont上字体链接中获取图标svg文件)**
