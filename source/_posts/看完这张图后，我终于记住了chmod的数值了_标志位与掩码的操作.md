---
title: 看完这张图后，我终于记住了chmod的数值了(标志位与掩码的操作)
date: 2020-04-01 14:26:56
tags:
    - 个人笔记
---

## 简述

Linux chmod（英文全拼：change mode）命令是控制用户对文件的权限的命令, 一般我们写 `sudo chmod 777` 时对应的是对文件所有者（Owner）、用户组（Group）、其它用户（Other Users）都加上读, 写和执行的权限。

![来源于菜鸟教程](https://www.runoob.com/wp-content/uploads/2014/08/file-permissions-rwx.jpg)


我们知道读，写，执行 对应的具体数值是 4，2，1, 但是这几个数值点我一直是记不住的，好在可以写`sudo chmod +wr`之类的，直到我翻看了下 [wiki](https://en.wikipedia.org/wiki/Chmod), 看到了这样一张表

|  #   |       Permission        | rwx  | Binary |
| :--: | :---------------------: | :--: | :----: |
|  7   | read, write and execute | rwx  |  111   |
|  6   |     read and write      | rw-  |  110   |
|  5   |    read and execute     | r-x  |  101   |
|  4   |        read only        | r--  |  100   |
|  3   |    write and execute    | -wx  |  011   |
|  2   |       write only        | -w-  |  010   |
|  1   |      execute only       | --x  |  001   |
|  0   |          none           | ---  |  000   |

懂了，421都是对应的二进制表示上的 1/0，1为开，0为关闭，极为清晰。然后也翻阅了一下 mdn 的 [按位操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators), 学习了下标志位与掩码的操作。


## 标志位与掩码的操作

下面的例子来自MDN

```js
var FLAG_A = 0b0001; // 0001 ant
var FLAG_B = 0b0010; // 0010 bat
var FLAG_C = 0b0100; // 0100 cat
var FLAG_D = 0b1000; // 1000 duck


var mask = FLAG_A | FLAG_B | FLAG_D; // 0001 | 0010 | 1000 => 1011

var flags = 0b001

// 如果我们有 cat
if (flags & FLAG_C) { // 0101 & 0100 => 0100 => true
   // do stuff
}

// 如果我们有 bat 或者 cat 至少一个
// (0101 & 0010) || (0101 & 0100) => 0000 || 0100 => true
if ((flags & FLAG_B) || (flags & FLAG_C)) {
   // do stuff
}


// 如果我们有 bat 或者 cat 至少一个
var mask = FLAG_B | FLAG_C; // 0010 | 0100 => 0110
if (flags & mask) { // 0101 & 0110 => 0100 => true
   // do stuff
}

// 我们有 cat 和 duck
var mask = FLAG_C | FLAG_D; // 0100 | 1000 => 1100
flags |= mask;   // 0101 | 1100 => 1101


// 我们没有 ant 也没有 cat
var mask = ~(FLAG_A | FLAG_C); // ~0101 => 1010
flags &= mask;   // 1101 & 1010 => 1000


// 我们没有 ant 也没有 cat
var mask = ~FLAG_A & ~FLAG_C;
flags &= mask;   // 1101 & 1010 => 1000


// 如果我们以前没有 bat ，那么我们现在有 bat
// 但是如果我们已经有了一个，那么现在没有了
// 对 cat 也是相同的情况
var mask = FLAG_B | FLAG_C;
flags = flags ^ mask;   // 1100 ^ 0110 => 1010


// entering parallel universe...
flags = ~flags;    // ~1010 => 0101

```

这样大大的简化比较，在React也大量使用这种方式；


