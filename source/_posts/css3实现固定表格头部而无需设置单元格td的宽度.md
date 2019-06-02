---
title: css3实现固定表格头部而无需设置单元格td的宽度
date: 2017-02-24 16:27:03
tags: css3
---

**本博客持续修改与更新中，[点击这里查看最新的内容](http://aizigao.xyz/2017/02/24/css3实现固定表格头部而无需设置单元格td的宽度/)**
[TOC]
<!-- toc -->

# 背景

最近小弟在工作都是做后台系统，一堆的表格，各种各样的。然后需求上要有固定的表头的表格，如下图所示

![table-thead-fixed](https://aizigao-blog-1257747336.cos.ap-shanghai.myqcloud.com/table-thead-fixed.gif)

在网上查询固定表头的实现方式为： 

* `thead` 设置为 `fixed`
* 拆分表格为两个表格 `thead`一个，`tbody`一个

​然而上面的实现上有个条件是**要提前设置单元格的大小 **， 如果没有设置对的会就是下面这个样子（下面是其它的博主的例子图， 我盗用下 :smirk: ）

![](https://aizigao-blog-1257747336.cos.ap-shanghai.myqcloud.com/table-thead-fixed-2.jpg)

  ![](http://pic1.win4000.com/pic/9/16/5be1844713.jpg)

​:expressionless::expressionless::expressionless::expressionless: 我可不要**固定单元格宽度**，固定的宽度怎么做组作啊。。。



在css3中的`transform`不会改变原来元素的大小位置，相当于是复制了份出来，然后transform的计算速也够快（这里婊一下absolute加left ，top，经常慢半拍）。用这个做这个功能非常合适，还要加点js用于监听滚轮。



# 实现方式

运行我写的 [在线例子](https://embed.plnkr.co/k7ipmtXkpL0MDT9KGZbc/) *打不开，请使用科学上网**:smirk::smirk::smirk:

<iframe height= 600 width= 100% src="https://embed.plnkr.co/k7ipmtXkpL0MDT9KGZbc/" frameborder=0 allowfullscreen></iframe>

下面贴下代码

js:

```js
// Code goes here
'use strict'
window.onload = function(){
  var tableCont = document.querySelector('#table-cont')
  /**
   * scroll handle
   * @param {event} e -- scroll event
   */
  function scrollHandle (e){
    console.log(this)
    var scrollTop = this.scrollTop;
    this.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
  }
  
  tableCont.addEventListener('scroll',scrollHandle)
}
```

css:

```css
/* Styles go here */

.table-cont{
  /**make table can scroll**/
  max-height: 200px;
  overflow: auto;
  /** add some style**/
  /*padding: 2px;*/
  background: #ddd;
  margin: 20px 10px;
  box-shadow: 0 0 1px 3px #ddd;
}
thead{
  background-color: #ddd;
}
```



html：

```  html
<!DOCTYPE html>
<html>

  <head>
    <link data-require="bootstrap@*" data-semver="3.3.7" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <link rel="stylesheet" href="style.css" />
    <script src="script.js"></script>
  </head>

  <body>
  <div class='table-cont' id='table-cont'><!--看这里-->
    
   <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  </body>

</html>
```

![table-thead-fixed](https://aizigao-blog-1257747336.cos.ap-shanghai.myqcloud.com/table-thead-fixed.gif)

搞定,美滋滋:thumbsup::thumbsup::thumbsup:
