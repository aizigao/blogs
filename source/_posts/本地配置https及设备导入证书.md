---
title: 本地配置https及设备导入证书
date: 2019-09-18 21:20:30
tags:
---

**本博客持续修改与更新中，[点击这里查看最新的内容](http://aizigao.xyz//)**

## 背景

平时开发时可能需要本地试下 https 的功能，要不正式上线时，http 和 https 会有一定的跨域的风险；
如果突然想要使用正式环境的 https 的接口，配置一下 https 也是少不了的

## 方案

### 1. 找个路径生成一下证书

```shell
openssl req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout server.key \ #导出的key名
    -new \
    -out server.crt \ # 导出的crt名
    -subj /CN=m.test.com \ #写你的域名
    -reqexts SAN \
    -extensions SAN \
    -config <(cat /System/Library/OpenSSL/openssl.cnf \
        <(printf '[SAN]\nsubjectAltName=DNS:m.test.com')) \ #写入你的域名
    -sha256 \
    -days 3650 #有效期一个月
```

### 2. 导入 nginx, ssl 是 443 端口，需要导入

```nginx

server {
  listen 80;
  listen [::]:80;
  listen 443 ssl;
  server_name test.com;
  ssl_certificate /Users/martin/MyWorkPlace/test2/dev/server.crt;
  ssl_certificate_key /Users/martin/MyWorkPlace/test2/dev/server.key;
}
```

### 3. mac 下导入证书

mac 双击打开 server.crt，然后在钥匙串里选择 aways trust

![mac下导入证书](https://aizigao-blog-1257747336.cos.ap-shanghai.myqcloud.com/20190918212146.png)

### 4. ios 下导入证书

手机域名绑定啥的我的用 charles 代理过去的

ios 导入证书只能通入自带的 safari,邮箱可能也可以，我没有试过。我的做法
在 server.crt 文件夹内起个服务器,这里我用的是 npm 的 http-server，没有的就按下面的方式安装一下

```shell
npm i -g http-server
```

启动 http-server

```shell
http-server
```

ios 下载完成后，弹出弹窗

然后进入`设置->通用->关于本机->证书信任设置`安装描述文件

### 5. 安卓下导入证书

### 6. 清除 https

#### chrome

- url 输入 `chrome://net-internals/#hsts`
- 在 `Delete domain security policies` 输入你要删除的域名，**注意的如是多级域名,最好一级二级都删一遍**,如`second.first.test.com` 最好输入以下都删一遍
  - second.first.test.com
  - first.test.com
  - test.com

#### 手机

_手机中清除 https 比较麻烦，能用隐私模式就用隐私模式吧, 有通用方案的同学请告知_
