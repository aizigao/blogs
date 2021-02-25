---
title: nginx_个人常用功能记录一下
date: 2021-02-23 14:41:22
tags:
---


## Nginx的三大主要功能
- 静态web服务器
- 反向代理
- 负载均衡

## location


```
~      波浪线表示执行一个正则匹配，区分大小写
~*    表示执行一个正则匹配，不区分大小写
^~    ^~表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
=     进行普通字符精确匹配
@     "@" 定义一个命名的 location，@定义的locaiton名字一般用在内部定向，例如error_page, try_files命令中。它的功能类似于编程中的goto。
```

**优先级**

```
= > ~^ > ~ = ~* >最长前缀匹配 > /
```


** `@` 命名空间 **
```nginx
location  /images {
  try_files $uri $uri/ @name;
}
location  @name {
  ...
}
```

## UpStream

```nginx
upstream backend {
    server backend1.example.com       weight=5;
    server backend2.example.com:8080;
    server unix:/tmp/backend3;

    server backup1.example.com:8080   backup;
    server backup2.example.com:8080   backup;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```


### break


作用域：server,location,if

停止执行当前虚拟主机的后续rewrite指令集
break指令实例：

```nginx
if ($slow) {
     limit_rate 10k;
     break;
}
```


### if 
支持if条件判断，但不支持else

一个变量名；false如果这个变量是空字符串或者以0开始的字符串；

- 使用= ,!= 比较的一个变量和字符串
- 是用~， ~*与正则表达式匹配的变量，如果这个正则表达式中包含}，;则整个表达式需要用" 或' 包围
- 使用-f ，!-f 检查一个文件是否存在
- 使用-d, !-d 检查一个目录是否存在
- 使用-e ，!-e 检查一个文件、目录、符号链接是否存在
- 使用-x ， !-x 检查一个文件是否可执行

```nginx
 if ($http_user_agent ~ MSIE) {
     rewrite ^(.*)$ /msie/$1 break;
 }

 if ($http_cookie ~* "id=([^;]+)(?:;|$)") {
     set $id $1;
 }

 if ($request_method = POST) {
     return 405;
 }

 if ($slow) {
     limit_rate 10k;
 }

 if ($invalid_referer) {
     return 403;
 }
```


### return

停止处理并返回指定状态码(code)给客户端。
非标准状态码444表示关闭连接且不给客户端发响应头。
从0.8.42版本起，return 支持响应URL重定向(对于301，302，303，307），或者文本响应(对于其他状态码).


### rewrite


```nginx
rewrite regex replacement [flag];
```

**flag:**

- last 停止处理后续rewrite指令集，然后对当前重写的新URI在rewrite指令集上重新查找。
- break 停止处理后续rewrite指令集，并不在重新查找,但是当前location内剩余非rewrite语句和location外的的非rewrite语句可以执行。
- redirect 如果replacement不是以http:// 或https://开始，返回302临时重定向
- permant 返回301永久重定向



作用域：server,location,if

```nginx
 server {
     ...
     rewrite ^(/download/.*)/media/(.*)..*$ $1/mp3/$2.mp3 last;
     rewrite ^(/download/.*)/audio/(.*)..*$ $1/mp3/$2.ra last;
     return 403;
     ...
 }
```


## 反向代理



```nginx
server {
    listen 80;
    server_name www.nginx.cn nginx.cn;

    location /app {
       proxy_pass http://127.0.0.1:8080;
    }
}

```

## 强制https

```nginx
if ($**http_x_forwarded_proto** = "http") {
   return 301 https://$server_name$request_uri;
}
```

**本博客持续修改与更新中，[点击这里查看最新的内容](http://aizigao.xyz//)**
