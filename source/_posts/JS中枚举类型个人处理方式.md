---
title: JS中枚举类型个人处理方式(BraketEnum)
date: 2020-06-03 20:56:08
tags:
 - web 前端
---

## 背景

众所周知JS中没有枚举类型，TS是有的，但是也不是很好用； 在我们日常开发中`mysql`的 `Enums` 类型大概率也是没有人用的，原因是添加一个`enum`需要 `Alter` 整张表，以至于到我们前端这边，获取到的 `state`, `status` 啥的永远是 `0,1,2,3,4,5` 这样的数字，如果不对这些 `enum` 进行处理，在代码就会出现一堆的如下面的代码：

```jsx
{state === 1 && (
    <div>xxxx</div>
)}

if (state===1) {
    // ---
}
```

已我浅薄的经验来看，像上面的这个样子的代码，你维护个一段时间，也就看不懂了.jpg 。。。

## TS中的Enums 

现在大家都开始用TS了，在 TS 中的 [enum](https://www.typescriptlang.org/docs/handbook/enums.html) 两种模式，一种是数字，一种是 `map` 结构。


**数字**


```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

console.log(Direction.Up) // 0
console.log(Direction[0]) // "Up"
```

相当于下面,见[demo](https://www.typescriptlang.org/play#code/KYOwrgtgBAIglgJ2AYwC5wPYigbwFBRQCqADlALxQCMANAbBgO4h2EAywAZqq1AEpwA5gAseeAL5A) (注：ts官方的这个 `try`, 先关闭 `adb` 或 `ublock` 广告插件)

```js
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
```


**map**

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

相当于[demo](https://www.typescriptlang.org/play?ssl=1&ssc=1&pln=6&pc=2#code/KYOwrgtgBAIglgJ2AYwC5wPYigbwFBRQCqADlALxQBERAClQDQGwYDu2lVMA8gOoByjZgBlgAM1QVqwgKIAxACpDCAJTgBzABaTOKgJIBxABJKmAXyA)

```js
"use strict";
var Direction;
(function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));
```


我们想想我们日常使用 `enum` 的地方:

- 做条件判断, 不同条件下执行不到代码
- 在 select 或者其它地方做为 `label` 和 `value`，并且需要按一定顺序
- ...

在我看来 TS 中的 `enum` 并不能满足我的需求, 下面我们看下后台java 的定义方式。 
## JAVA 中的Enums

```java
public enum StateEnum {
    'AUDIT_WAIT', (1, '审核中'),
    'AUDIT_PASS', (2, '审核通过')
    // ...
}
```

由我们可以看到 Java 中大致是下面的方式定义enums的:

```
code, value, desc
```

结构也是比较清晰，那么我们也能按上面的结构仿制一个我们自已的 `enum` 了。

## 个人解决方案


对于日常开发中，你可以会直接到 `Object` 创建，如下:

```js
const StateEnum = {
    'AUDIT_WAIT': [1, '审核中']
    'AUDIT_PASS': [2, '审核通过']
}
```

但是要说的是，Object 本身在遍历的时候有特殊顺序的，可以在[这篇文章](https://javascript.info/object#ordered-like-an-object)里看到具体的说明, 也就是说不能按我们在代码中书写的顺序遍历；而在我们日常开发经常要干的一件事就是遍历它，生成一个下拉的 `Select`，所以Object 真的不适合，好在 `ES6` 里的 `Map` 就是有索引又有顺序的好东西，所以我用 `Map` 为基础加一个自已的包。


```js
const StateEnum = new Map([
    ['AUDIT_WAIT', [1, '审核中', 'extra']]
    ['AUDIT_PASS', [2, '审核通过', 'extra']]
])
```


## BracketEnum

我将我的想法做成了一个小的 `npm` 包， 我叫它 [BracketEnum](https://github.com/aizigao/BracketEnum), 由于 Typescript 的泛型支持，在 `VSCode` 下体验良好。


![demo gif](https://i.loli.net/2021/03/01/9SjxY5QD7nqTZzp.gif)


如果要看定义话，鼠标移上去就能见到

![image.png](https://i.loli.net/2021/03/01/Lam54Zhub8PXRBH.png)


**安装**

```
yarn add bracket-enum
```

**定义一个Enum**

```ts
import { BracketEnum } from 'bracket-enum'
const STATUS = BracketEnum.of([
// [CODE, [VALUE, DESC, EXTR]]
['AUDIT_WAIT', [1, '审核中', 'extra1']],
['AUDIT_PASS', [2, '审核通过', 'extra2']],
]);

// --- 或者

const STATUS_2 = new BracketEnum([
// [CODE, [VALUE, DESC, EXTR]]
['AUDIT_WAIT', [1, '审核中', 'extra1']],
['AUDIT_PASS', [2, '审核通过', 'extra2']],
]);

```

> 推荐使用 `BreacketEnum.of` 方式创建, 容易忘记写 `new`

**基本使用**

```ts
// 由 code 得到 value
STATUS.getValueByCode('AUDIT_PASS') // 2

// 由 code 得到 desc
STATUS.getDescByCode('AUDIT_WAIT') //'审核中'

// 由 value 得到 desc
STATUS.getDescByValue(2) // '审核通过'

// 由 value 得到 extra
STATUS.getDescByExtra(2) // extra2

// 获取 所有 value
STATUS.getAllValues() // [1, 2] 拿到数组，可以用于遍历生成

// 判断 当前是 pass 状态
const currentState = 2
STATUS.checkValueByCode('AUDIT_PASS', currentState) // true

```

**扩展**

因为这个小玩意代码也没有什么内容，本身用 `class` 构建，如果要自已添加一个对应的处理方法也很简单


```ts

// 扩展
class myEnums extends Dtnums{
  // ---
}
new myEnums([])
myEnums.of([])
```

比我因为经常用 `antd`, 所以把生成 `antd` 里 `Select` 需要用的 `Options` 结构内置了, 你如果需要定义话，可以按下面的方式

```ts
class myEnums extends Dtnums{
  toMyFormOptions(hasAll: boolean = false): any[] {
    const allOption = {
      key: null,
      value: null,
      label: '全部',
      extra: null,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = this.configList.map(([code, [value, desc, extra]]) => {
      return {
        key: value,
        value,
        label: desc,
        extra,
      };
    });

    if (hasAll) {
      return [allOption, ...result];
    }
    return result;
  }
}

// 初始化；
myEnums.of([])

```

**其它内置的方法**


- `toFormOptions([hasAll:Boolean])` 生成 `antd` 的 `options`
- `toFormValueEnum` 转为antd pro table 需要的ValueEnum


