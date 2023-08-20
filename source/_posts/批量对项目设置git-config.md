---
title: 批量对项目设置git config
date: 2017-08-30 07:47:08
tags:
---

## 背景

我一般设置默认的 `git config` 设置为自已的 github 帐号， 但是公司的项目还是设置为公司的 gitlab 的帐号较好，这就出现了一个问题: 如何批量的公司的项目设置 git config 呢

## 方式

1. 我将公司的项目都放在了一个叫 works 的文件夹内
2. 在 works 内新建 `gitConfig.sh`

```sh
#!/bin/bash

for d in */ ; do
  cd $d
  git config user.name 'yourName'
  git config user.email 'youEmail'
  cd ..
done

```

3. 运行

```sh
chmod +x ./gitConfig.sh
./gitConfig.sh
```

原理也很简单，就是遍历当前文件夹，进入文件夹，设置然后返回目录,如果 git 项目不在同一个文件夹内，就建一个数组就好啦
