---
title: 使用yadm (git)管理系统配置文件(dotfiles)
date: 2019-07-29 20:06:41
tags:
---

**本博客持续修改与更新中，[点击这里查看最新的内容](http://aizigao.xyz/2020/07/29/使用yadm-git-管理系统配置文件-dotfiles/)**


## 背景

linux 和 macos下大部分的软件配置文件都是在用户目录对应以 “.”打开的隐藏文件或者是xxxrc 命名的文件，其余的基本上配置也有放在`.config`目录下的。 一般来说只要备份好这些dotfiles 另写一个系统初始化的脚本，在做系统重装或系统迁移时就会比较的方便了。

之前一直在用 [mackup](https://github.com/lra/mackup) 做为管理工具, 但是使用下来个人感觉是不很满意

- 备份文件用的是软链接，不是很喜欢这种方式，很不好管理, 移除mackup时会比较麻烦, 感觉有一定的入侵性
- 数据同步一般用网盘或者手动git的方式，用网盘的话，测不能做到的版本控制, 每次修改完文件后不能回滚

最近逛reddit时，发现一个名为[yadm](https://yadm.io) 的管理工具，作法是默认将整个用户目录处理为一个git仓库但不会影响到正常的git使用，因为方案是用git管理，好处理就不用多说了，cli使用上也和git大体相同。


## 基本使用


 [走一下官方的流程]([https://yadm.io/docs/install#ubuntudebian](https://yadm.io/docs/install#ubuntudebian))
 
我当前的设备为一台manjaro的系统, 使用yay为包管理
```shell
# 安装
yay  yadm
# 
```

基本使用

```shell
yadm init
yadm add <important file>
yadm commit
yadm init
yadm add <important file>
yadm commit
```

可以看到的yadm的用法和`git`本身一毛一样，会用`git`就会用`yadm`,  因为基于git，对配置文件做分支管理，版本回滚都很方便。并且不像mackup那样用`ln`， 入侵性很低。


## 系统级用法 

默认yadm 控制范围是 home目录的，如果你想把 `/etc` 目录下的内容也管理进来的话，我试了两个方案。

- 配置 `yadm`的控制范围为 `/`
- 使用`ln` 将系统的文件链接到home目录下

###  配置 `yadm`的控制范围为 `/`

默认使用 root用户时，控制范围就是 '/', 翻阅yadm 的[issue](https://github.com/TheLocehiliosan/yadm/issues/63) ，也可以同时更改一下config目录, 并加一个alias进行处理

```shell
# create an alias to run yadm for system files
alias sysyadm="sudo yadm -Y /etc/yadm"
# initialize the yadm repo using the worktree of "/"
sysyadm init -w /
```

###  使用`ln` 将系统的文件链接到home目录下

个人当前用 `ln`方式管理系统级的文件，因为不同系统下结构确实也有一些不同，系统级的配置也不会太多，就不做整个系统的管理了，当前我建立了 `~/.config/systemrc` 文件夹，将系统级的文件都软链到这个目录下，如hosts文件

```shell
sudo ln -s -f /home/aizigao/.config/systemrc/etc/hosts /etc/hosts
```

## 忽略文件

平时开发时，习惯性直接 `git add ./` 添加针对整个目录的管理，但是有些日志文件不小心就会被打进去了，如我的rime配置目录

```
.
├── build
├── default.custom.yaml
├── double_pinyin_flypy.schema.yaml
├── installation.yaml
├── luna_pinyin.userdb
├── pinyin_simp.dict.yaml
├── pinyin_simp.schema.yaml
├── sync
├── user.yaml
├── xinshijiwubi.dict.yaml
├── xinshijiwubi.schema.yaml
├── xinshijiwubi.userdb
```

我只有管理部分文件，又不想一个一个的`yadm add`，这时就建一个`.gitignore`就好了
```
build
*.userdb
```


## 自用的alias

由于系统的配置文件还是比较分散的，加了一个alias做修改过的文件的add

```shell
alias yadm_add_m ='yadm ls-files --modified | xargs yadm add'
```


## 其它

- 看了文档，yadm还可以支持文件加密啥的，因为我用了github的私有仓库，这个就没有使用
