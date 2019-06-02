---
title: '使用AHK减少鼠标和方向键的使用频率,高效编辑'
date: 2017-03-01 15:15:53
tags: tools 
---



**本博客持续修改与更新中，点击[这里](http://aizigao.xyz/2017/03/01/使用AHK减少鼠标和方向键的使用频率-高效编辑/) 查看最新的内容** 

[TOC]

[autohotkey](https://www.autohotkey.com/)是一款热键脚本语言，网上相关的介绍很多，我这不多介绍。一般敲多的码的人，对方向键、键盘和鼠标之间来回移动都会觉的是一件很麻烦的事，使用vim的除外，所以我这在这里介绍使autohot实现鼠标与方向键的功能。

一般来说平时capslock键和scrllLock 这两个键使用的频率非常低，我们可以将caplock设为和ctl、alt、win一样的功能键，但是使用capslock这个设置会有出现大小写切换的问题，使用ahk这个软件来换键并不是一个好的解决方案，所以我还要用到另一个改键软件 **KeyTweak**。KeyTweakn改键原理是修改注册表，比ahk更为彻底，我将caplock和scrllLock相换一下，以后大小切换就是scrllLock了（我平时都是按shift的）。

![这里写图片描述](http://img.blog.csdn.net/20160110184918826)

下面开始在ahk中编辑。

## **鼠标功能**

```
这部分代码来自http://www.ahk8.com/，年代久远原作者记记是谁了。。

```

------

```shell
SetScrollLockState, AlwaysOff;禁用SetScrollLockState
#SingleInstance
count = 0
JoyMultiplier = 0.20
JoyThreshold = 3
JoyThresholdUpper := 50 + JoyThreshold
JoyThresholdLower := 50 - JoyThreshold
YAxisMultiplier = -1
SetTimer, WatchKeyboard, 10

Hotkey, F1, ButtonLeft ;F1模拟左键
Hotkey, F2, ButtonRight;F2模拟右键
Hotkey, up, empty
Hotkey, down, empty
Hotkey, left, empty
Hotkey, right, empty
Return

ScrollLock & F1:: ;开启鼠标功能
SetTimer, WatchKeyboard, 10
Hotkey, F1, On
Hotkey, F2, On
Hotkey, up, On
Hotkey, down, On
Hotkey, left, On
Hotkey, right, On
Return

ScrollLock & F2::;关闭鼠标功能
SetTimer, WatchKeyboard, Off
Hotkey, F1, Off
Hotkey, F2, Off
Hotkey, up, Off
Hotkey, down, Off
Hotkey, left, Off
Hotkey, right, Off
Return

empty:
Return
WatchKeyboard:
MouseNeedsToBeMoved := false  ; Set default.
JoyMultiplier+=0.01
SetFormat, float, 03
up:=GetKeyState("Up","p")
down:=GetKeyState("Down","p")
Left:=GetKeyState("Left","p")
right:=GetKeyState("Right","p")
if(Right)
{
    MouseNeedsToBeMoved := true
    DeltaX := 10
}
else if(Left)
{
    MouseNeedsToBeMoved := true
    DeltaX := -10
}
else
    DeltaX = 0
if (up)
{
    MouseNeedsToBeMoved := true
    DeltaY := 10
}
else if (Down)
{
    MouseNeedsToBeMoved := true
    DeltaY := -10
}
else
    DeltaY = 0
if MouseNeedsToBeMoved
{
    SetMouseDelay, -1  ; Makes movement smoother.
    MouseMove, DeltaX * JoyMultiplier, DeltaY * JoyMultiplier * YAxisMultiplier, 0, R
}
Else
count++
If(count>20){
JoyMultiplier = 0.30
count=0
}
return

ButtonLeft:
SetMouseDelay, -1  ; Makes movement smoother.
MouseClick, left,,, 1, 0, D  ; Hold down the left mouse button.
SetTimer, WaitForLeftButtonUp, 10
return

ButtonRight:
SetMouseDelay, -1  ; Makes movement smoother.
MouseClick, right,,, 1, 0, D  ; Hold down the right mouse button.
SetTimer, WaitForRightButtonUp, 10
return


WaitForLeftButtonUp:;使用支持鼠标手势
if GetKeyState("F1")
    return  ; The button is still, down, so keep waiting.
; Otherwise, the button has been released.
SetTimer, WaitForLeftButtonUp, off
SetMouseDelay, -1  ; Makes movement smoother.
MouseClick, left,,, 1, 0, U  ; Release the mouse button.
return

WaitForRightButtonUp:
if GetKeyState("F2")
    return  ; The button is still, down, so keep waiting.
; Otherwise, the button has been released.
SetTimer, WaitForRightButtonUp, off
MouseClick, right,,, 1, 0, U  ; Release the mouse button.
return
;;endmouse
```

## **方向键与其它光标的功能：**


按我的设置上下左右分别为caps+i/j/k/l/j;home,end,delete，pgup,pgdn为caps+h/n/o/[/];


```shell
;scroll事件
ScrollLock & [::send,{WheelUp}
ScrollLock & ]::send,{WheelDown}
; move left
ScrollLock & j::
if GetKeyState("LShift", "P")
    send, +{Left}
else if GetKeyState("LAlt", "P")
    send,^{left}
else
    send, {Left}
Return
; move right
ScrollLock & l::
if GetKeyState("LShift", "P")
    send, +{right}
else if GetKeyState("LAlt", "P")
    send,^{right}
else
    send, {right}
Return
; move up
ScrollLock & i::
if GetKeyState("LShift", "P")
    send, +{up}
else if GetKeyState("LAlt", "P")
    send,^!{up}
else if GetKeyState("LControl", "P")
    send,^+{up}
else
    send, {up}
Return
; move down
ScrollLock & k::
if GetKeyState("LShift", "P")
    send, +{down}
else if GetKeyState("LAlt", "P")
    send,^!{down}
else if GetKeyState("LControl", "P")
    send,^+{down}
else
    send, {down}
Return
;home
ScrollLock & h::
if GetKeyState("LShift", "P")
    send, +{home}
else
    send, {home}
Return
; end
ScrollLock & n::
if GetKeyState("LShift", "P")
    send, +{end}
else
    send, {end}
Return
;delelte
ScrollLock & o::send,{delete}
```

## **拾色器**

利用ahk设置的拾色器非常方便，这里设置的快揵是alt+win+c

```
!#c::
    MouseGetPos, mouseX, mouseY
    PixelGetColor, color, %mouseX%, %mouseY%, RGB
    StringRight color,color,6
    clipboard = #%color%
    tooltip,color is %color%
    sleep 2000
    tooltip,
return123456789123456789
```

## 剪切板

系统自带的剪切板只能一起复制与粘贴，下面的剪切板支持最多30次copy，热键如下：

1. ;win+0：清空 ;
2. ctrl+c：复制 ;
3. win+v：依次粘贴 ;
4. win+]：依次粘贴，但顺序相反

```shell
handleClip(action)
{
global static AddNextNum
global static GetNextNum
global static HighestNum
global static getprevnum
global static highest1
global static ClipArray
global static ClipArray1
global static ClipArray2
global static ClipArray3
global static ClipArray4
global static ClipArray5
global static ClipArray6
global static ClipArray7
global static ClipArray8
global static ClipArray9
global static ClipArray10
global static ClipArray11
global static ClipArray12
global static ClipArray13
global static ClipArray14
global static ClipArray15
global static ClipArray16
global static ClipArray17
global static ClipArray18
global static ClipArray19
global static ClipArray20
global static ClipArray21
global static ClipArray22
global static ClipArray23
global static ClipArray24
global static ClipArray25
global static ClipArray26
global static ClipArray27
global static ClipArray28
global static ClipArray29
global static ClipArray30

if (action = "save")
{
if (AddNextNum < 30)
{
AddNextNum += 1 ;
}
else
{
AddNextNum := 1 ;
}


if (HighestNum < 30)
{
HighestNum += 1 ;
}

GetNextNum := AddNextNum ;
ClipArray%AddNextNum% := Clipboard
highest1 := highestnum + 1
getprevnum := 1

}
else if ((action = "get") OR (action = "roll"))
{
if (GetNextNum != 0)
{
if (action = "roll")
{
Send, ^z
}
Clipboard := ClipArray%GetNextNum%
if (GetNextNum > 1)
{
GetNextNum -= 1 ;
getprevnum++
}
else
{
getprevnum := 1
GetNextNum := HighestNum

}
Send, ^v
}
}
else if (action = "get-reverse")
{
if (GetNextNum != 0)
{

Clipboard := ClipArray%getprevnum%
if (GetNextNum > 1)
{
GetNextNum -= 1 ;
getprevnum++
}
else
{
getprevnum := 1
GetNextNum := HighestNum

}
Send, ^v
}
}


else if (action = "rollforward")
{
if (GetNextNum != 0)
{
Send, ^z
if (GetNextNum < HighestNum)
{
GetNextNum += 1 ;
}
else
{
GetNextNum := 1
}
Clipboard := ClipArray%GetNextNum%
Send, ^v
}
}
else if (action = "clear")
{

GetNextNum := 0
AddNextNum := 0
HighestNum := 0
getprevnum := 0
}
}

#0::
handleClip("clear")
return

^c::
suspend on
Send, ^c
suspend off
handleClip("save")

return

#v::
    handleClip("get-reverse")
return

#]::
    handleClip("get")
return
; #\::
;   handleClip("roll")
;   ToolTip,
;   sleep 2000
;   tooltip,
; return
#/::
    clipboard =
return

#^\::
    handleClip("rollforward")
return
; end 剪切板
```