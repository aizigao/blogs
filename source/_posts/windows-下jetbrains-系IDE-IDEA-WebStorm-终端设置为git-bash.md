---
title: windows 下jetbrains 系IDE IDEA WebStorm 终端设置为git bash
date: 2017-04-18 15:02:56
tags: others
---

@[TOC]

<!-- toc -->

# 背景

虽然本人现在用的osx系统，但是有时操作同事的windows系统时，在ide下没有好用的终端实在是蛋疼，window下的bash方案现在感觉也挺多的，git bash ，cmder ，babun都是不错的选择。今天偶然的发现在 IDEA下的居然有个 terminal 的醒置选项，发现可以设置为 git bash，好评 ​:smile:​
# 具体操作
* 设置为 git bash
  改shell path 为`"C:\Program Files (x86)\Git\bin\sh.exe" --login -i`
  ![git bash](http://3.bp.blogspot.com/-D79tAY6e_wc/Uu7VuixP1pI/AAAAAAAAG5w/a0B39LzwUAI/s1600/ij13-terminal-settings.png)
* 设置为 babun 、cygwin
  改shell path 为`C:\Users\YOUR-USERNAME\.babun\cygwin\bin\bash.exe`
  ![cygwin](http://engineroom.teamwork.com/wp-content/uploads/2015/07/Capture.jpg)
# 参考
> [GIT BASH IN INTELLIJ IDEA 13 ON WINDOWS](http://blog.codeleak.pl/2014/02/git-bash-in-intellij-idea-13-on-windows.html)
> [Using Cygwin’s bash terminal in a JetBrains IDE](https://engineroom.teamwork.com/using-cygwins-bash-terminal-in-a-jetbrains-ide/)

