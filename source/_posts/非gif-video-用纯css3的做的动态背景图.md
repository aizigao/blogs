---
title: ' 非gif/video,用纯css3的做的动态背景图'
date: 2017-03-08 09:37:11
tags: css3
---

**本博客持续修改与更新中，[点击这里查看最新的内容](http://aizigao.xyz/2017/03/08/%E9%9D%9Egif-video-%E7%94%A8%E7%BA%AFcss3%E7%9A%84%E5%81%9A%E7%9A%84%E5%8A%A8%E6%80%81%E8%83%8C%E6%99%AF%E5%9B%BE/)**

<!-- toc -->

# 背景

 昨天迋reddit，在黑苹果版块上的导航背景图的非常有意思，乍一看还以为是gif或者是一个很小的video，审查后发现并不是，而是用的jpg和一张半透的png实现的。

![](http://b.thumbs.redditmedia.com/AJsfKOOEw8Reo0o1DEb6XtdZcXXd6LseXWubRUS_D_M.jpg)

上图的云会动，图片太大，就不上gif了。。。 😎😎

# 实现代码

[点些运行我的在线实例](https://plnkr.co/edit/yMAQjhDZx28NIIpE9SQh?p=preview)

<iframe width='100%' height='400px' src='https://plnkr.co/edit/yMAQjhDZx28NIIpE9SQh?p=preview'></iframe>

html:

```html
<!DOCTYPE html>
<html>

  <head>
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
   <div id='header'></div> 
  </body>

</html>
```

css

```css
/* Styles go here */

#header {
    background: #000 url(//b.thumbs.redditmedia.com/AJsfKOOEw8Reo0o1DEb6XtdZcXXd6LseXWubRUS_D_M.jpg) center;
    height: 300px;
    border-bottom: 1px solid #7D7C7D;
    background-color: #FFF;
    overflow: hidden;
}

#header::after{
    pointer-events: none;
    content: " ";
    display: block;
    width: 1713px;
    height: 300px;
    position: absolute;
    top: 19px;
    opacity: 1;
    -webkit-transition-property: opactiy;
    transition-property: opactiy;
    -webkit-transition-duration: 5s;
    transition-duration: 5s;
    background-image: url(//b.thumbs.redditmedia.com/JOJvVsBp3R_xQx5IgkRfacpQRMBFju3HroJHC0PrZMA.png);
    -webkit-animation: cloudAnim 35s linear infinite;
    animation: cloudAnim 35s linear infinite;
}


@-webkit-keyframes cloudAnim {
    from {
        -webkit-transform: translateX(-1713px) translateZ(-1713px);
        transform: translateX(-1713px) translateZ(-1713px)
    }

    to {
        -webkit-transform: translateX(1713px) translateZ(-1713px);
        transform: translateX(1713px) translateZ(-1713px)
    }
}

@keyframes cloudAnim {
    from {
        -webkit-transform: translateX(-1713px) translateZ(-1713px);
        -ms-transform: translateX(-1713px) translateZ(-1713px);
        transform: translateX(-1713px) translateZ(-1713px)
    }

    to {
        -webkit-transform: translateX(1713px) translateZ(-1713px);
        -ms-transform: translateX(1713px) translateZ(-1713px);
        transform: translateX(1713px) translateZ(-1713px)
    }
}
```



