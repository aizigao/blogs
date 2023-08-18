---
title: Manjaro i3wm 一些蓝牙音箱/耳机相关的配置
date: 2019-07-30 18:52:27
tags: linux
---

**本博客持续修改与更新中，[点击这里查看最新的内容](http://aizigao.xyz/manjaro-i3wm-一些声音相关的配置/)**

## 背景

最近又因为系统的一些莫名问题，导致我又重装了一变manjaro i3版本，这个版本的蓝牙毛病挺多的，记录一下，下次好找(虽然已经备份好了dotfile了)

## 问题与解决方案

### 耳机连接后没有声音

缺少模块,安装 `pulseaudio-bluetooth`

```shell
pacman -S pulseaudio-bluetooth
```

### 连接后音量无法调节

默认的音量调节为volumeicon, 改为  `pa-applet`就好了, 安装 `pa-applet`

```shell
sudo pacman -S pa-applet
```

修改 `~/.i3/config`

```shell
#-- 注释它
#exec --no-startup-id volumeicon
exec --no-startup-id pa-applet
```


### 蓝牙音箱或耳机链接后，电脑不会切换播放设备, 需要重启应用才生效G

修改配置 /etc/pulse/default.pa

```
# 添加这一行
load-module module-switch-on-connect
```

### 电脑重启后，不会自动链接

这个比较傻了，在`blueman` 蓝牙管理器里打开 `蓝牙一直可见` 就好了




## 后记

为了用个蓝牙耳机，整得确实挺麻烦的