---
title: 黑苹果10.12.* voodooPS2Controller 改caps为ctrl
date: 2017-03-07 12:58:48
tags: others
---

**本博客持续修改与更新中，[点击这里查看最新的内容](http://aizigao.xyz/2017/03/07/黑苹果10-12-voodooPS2Controller-改caps为ctrl/)**

<!-- toc -->

# 背景

黑苹果也就是hackintosh常用的键盘驱动**不能在偏好设置**直接将caps改为control，会有bug。RehabMan本人说也不会去修改这个问题。

![](https://aizigao-blog-1257747336.cos.ap-shanghai.myqcloud.com/others/hackintosh/170307_001.png)



# 操作

RehabMan说可以用 plguin 下info.plist 进行ADB映射去解决这个问题😎，步骤如下



* 进入路径

  ```shell
   $ cd VoodooPS2Controller.kext/Contents/PlugIns/VoodooPS2Keyboard.kext/Contents/ç
  ```

* 修改 Info.plist, 我这里用的编译器是vim。

  ```shell
  vim Info.plist
  ```

* 找到 `IOKitPersonalities->ApplePS2Keyboard->Platform Profile->Default->Custom PS2 Map/Custom ADB Map`这段

  ```shell
   <array>
    <string>;Items must be strings in the form of breaklessscan (in hex)</string>
   </array>
    <key>Custom ADB Map</key>
   <array>
    <string>;Items must be strings in the form of scanfrom=adbto (in hex)</string>
    <string>3a=3b;caps to left ctrl</string>
   </array>
   <key>Custom PS2 Map</key>
  <array>
  <string>;Items must be strings in the form of scanfrom=scanto (in hex)</string>
  <string>e027=0;disable discrete fnkeys toggle</string>
   <string>e028=0;disable discrete trackpad toggle</string>
   </array>
  ```

  上面重点是添加了：

  ```shell
    <string>3a=3b;caps to left ctrl</string>
  ```

  ​

  # 后记

  ![](data:image/jpeg;base64,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)

  你也可以将 **caps改成esc之类**的，这里提供下我的参考资源，如有其它的定制需求，你可以参照下面的贴子

  > * [github 如何使用自定义的按键映射功能](https://github.com/RehabMan/OS-X-Voodoo-PS2-Controller/wiki/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E7%9A%84%E6%8C%89%E9%94%AE%E6%98%A0%E5%B0%84%E5%8A%9F%E8%83%BD)
  > * [[如何使用自定义的按键影射功能](http://www.yekki.me/how-to-mapping-keys-on-ps2/)](http://www.yekki.me/how-to-mapping-keys-on-ps2/)
