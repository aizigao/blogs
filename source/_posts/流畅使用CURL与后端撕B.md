---
title: 流畅使用CURL与后端撕B
date: 2019-08-02 14:45:25
tags:
---

本博客持续修改与更新中，[点击这里查看最新的内容](http://aizigao.xyz/2019/08/02/流畅使用CURL与后端撕B/)

## 什么是 CURL

curl，全称 CommandLine URL 或 CommandLine Uniform Resource Locator， `curl` 是在命令行方式下工作，利用 URL 的语法进行数据的传输或者文件的传输, 你就单纯把它当成一个能在终端里发送完整的请求的方式就好了。 这个命令行工具在 Unix 和 Linux 操作系统下都自带，是一个开源的工具，功能十分强大, window下可以装上 `git-bash` 也会有，约等于大家电脑里都有。

下面是 curl 的官方网站，我们可以该网站获取该工具的最新版本，还有最全面的使用方法。
我们复制出一个 CURL 请求（csdn 的一个接口）

```shell
curl 'https://msg.csdn.net/v1/chrome/notification/view' -X OPTIONS -H 'Access-Control-Request-Method: POST' -H 'Origin: https://blog.csdn.net' -H 'Referer: https://blog.csdn.net/deliciousion/article/details/78062521' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36' -H 'Access-Control-Request-Headers: content-type' --compressed
```

从上面可以看出一个完整的 CURl 带有些完整的 http 信息,具体的 CURL 的参数与用法可以参考其它的文章,这里主要讲下 CURL 在日常开发中的使用

## 如何撕 B

我们前端开发人员在与后端人员联调时，我们往往会使用 postman 这样的 gui 工具进行调试，可是 postman 毕竟还是要手动的一个输入一个个的参数,这个会比较麻烦.

![](https://i.loli.net/2019/08/02/5d43da6b53c9a98298.png)

试想一下这个场景,当你在写一个很大很复杂的表单，和后端调试需要很长时间, 每次都需要重新填写表单，然后又因为这个调试没法子切到其它工作,这会非常浪费时间。按常理来说，这是后端需要自已测试通过后才行，但是工作场景下确实经常有这个问题发生。

所以这个时候你可以打开 *chrome 控制台*下的 XHR 下的右键复制 CURL 功能,然后把得制下来的 CURL 发经后端开发的同学，之后就可以继续其它工作了。

![](https://i.loli.net/2019/08/02/5d43da6b53c9a98298.png)

![](https://i.loli.net/2019/08/02/5d43dbaf1a25d53570.png)

## 后记

后续可以也可以再多了解一下 `curl` 的格式，这个东西其实可以做很多事情，大体上可以代替 `postman`　的大部分功能了，比如文件上传什么的；在终端上用，之后写个脚本啥的也会比较方便。