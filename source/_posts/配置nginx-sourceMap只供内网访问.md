---
title: 配置nginx-sourceMap只供内网访问
date: 2020-03-25 22:03:27
tags: 
  - nginx 
  - 个人笔记
---

## 背景

最近一直研究部署 [Sentry.io](https://sentry.io/welcome/) 的本地化部署，处理了几个小时，现在终于可以在我司的CICD平台里实现上传SourceMap了. 但是总觉得让别人直接看到我们的 sourceMap 不是很安全的样子，于日究竟了一下在 nginx 里限制只在我们局域网内看 SouceMap 的方式.

## 做法

方式来自 https://docs.fundebug.com/notifier/javascript/sourcemap/download.html,

打开 `etc/nginx` 加入下面这句

```nginx
location ~ ^/dist/(.+)\.map$ 
{
    allow 120.77.xx.xxx; # 局域网ip
    deny all;

    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $host;
    proxy_pass http://xxx.xxx.xx.xxx:8000; # 代理地址
}
```
