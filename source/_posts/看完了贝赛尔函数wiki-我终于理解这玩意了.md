---
title: '看完了贝赛尔函数wiki,我终于看懂了'
date: 2020-04-23 14:25:44
tags:
 - css
 - 动画
---

## 背景

在平时写动画时我们总会使用一些缓动函数，我个人有时会 [easing-js](https://github.com/danro/easing-js/blob/master/easing.js) 抄抄算法，或者 [ceaser](https://matthewlein.com/tools/ceaser) 还有 [cubic-bezier](https://cubic-bezier.com/)下调节一下控制点，拿到一个贝赛尔曲线的配置。然而我却一实不是很懂贝赛尔函数这个控制点，直到看了一下wiki...

## wiki

我们打开 [贝赛尔函数wiki](https://en.wikipedia.org/wiki/B%C3%A9zier_curve), 可以看到一堆的动图, 如下我copy了一份作为记录：

![Imgur](https://imgur.com/ClE17q6.gif)
![Imgur](https://imgur.com/fArQ8Lw.gif)
![Imgur](https://imgur.com/4x1BILZ.gif)

从上面的图，我们可以有所感觉了，原来这几个控制写的是点移动的趋势啊， 瞬间感觉还是wiki好使，但仅仅限于英文 wiki, 之前看中文的 wiki 就没有这些内容了。然后对wiki上的具体实现公式我就懒得看了，我只要知道这个控制点是啥意思就够了，存下这几张图足够使用了, 具体还是看看 wiki 。


## 具体公式实现


TODO: 之后有时间再试试

## 参考

- [Bézier_curve](https://zh.wikipedia.org/wiki/%E8%B2%9D%E8%8C%B2%E6%9B%B2%E7%B7%9A)

**本博客持续修改与更新中，[点击这里查看最新的内容](http://aizigao.xyz/2020/04/23/看完了贝赛尔函数wiki-我终于理解这玩意了/)**
