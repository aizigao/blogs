---
title: RegExp先行断言后行断言看了半天不懂一看英文我悟到了
date: 2018-10-23 14:24:26
tags:
  - web 前端
  - 个人吐槽
---

## 背景

最近系统性的学习了遍[正则](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions), 开始看的是中文档，看到先行断言和后行断言时，又开始蒙逼了。我完全不能理解“先行断言”和“后行断言”这两个词的意思。

## 学习

打开[英文文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), 得到下面这两张表


| Characters / constructs                                      | Corresponding article                                        |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| `\`, `.`, `\cX`, `\d`, `\D`, `\f`, `\n`, `\r`, `\s`, `\S`, `\t`, `\v`, `\w`, `\W`, `\0`, `\xhh`, `\uhhhh`, `\uhhhhh`, `[\b]` | [Character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes) |
| `^`, `$`, `x(?=y)`, `x(?!y)`, `(?<=y)x`, `(?<!y)x`, `\b`, `\B` | [Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions) |
| `(x)`, `(?:x)`, `(?<Name>x)`, `x|y`, `[xyz]`, `[^xyz]`, `\*Number*` | [Groups and ranges](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges) |
| `*`, `+`, `?`, `x{*n*}`, `x{*n*,}`, `x{*n*,*m*}`             | [Quantifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers) |
| `\p{*UnicodeProperty*}`, `\P{*UnicodeProperty*}`             | [Unicode property escapes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes) |


好吧，断言就是Assertions，先行和后行表示位置，看来还是很信达雅的，就是没有看到原文的话还真看不懂了，之后还是要多翻英文档了。其中“先行” 以应 'lookahead' （看头），“后行”为 'lookbehind'(看尾)。

各种断言也在这里记录一下吧


| Characters | 中文  | Meaning                                                      |
| :--------- | :---  | :----------------------------------------------------------- |
| `x(?=y)`  |  先行断言 | **Lookahead assertion:** (positive lookahead) Matches "x" only if "x" is followed by "y". For example, /`Jack(?=Sprat)/` matches "Jack" only if it is followed by "Sprat". `/Jack(?=Sprat|Frost)/` matches "Jack" only if it is followed by "Sprat" or "Frost". However, neither "Sprat" nor "Frost" is part of the match results. |
| `x(?!y)`   |正向否定查找(这个翻译的也不好，反正我不理解) | **Negative lookahead assertion:** Matches "x" only if "x" is not followed by "y". For example, `/\d+(?!\.)/` matches a number only if it is not followed by a decimal point. `/\d+(?!\.)/.exec('3.141')` matches "141" but not "3". |
| `(?<=y)x` | 后行断言 | **Lookbehind assertion:** Matches "x" only if "x" is preceded by "y". For example, `/(?<=Jack)Sprat/` matches "Sprat" only if it is preceded by "Jack". `/(?<=Jack|Tom)Sprat/` matches "Sprat" only if it is preceded by "Jack" or "Tom". However, neither "Jack" nor "Tom" is part of the match results. |
| `(?<!y)x` |反向否定查找 | **Negative lookbehind assertion:** Matches "x" only if "x" is not preceded by "y". For example, `/(?<!-)\d+/` matches a number only if it is not preceded by a minus sign. `/(?<!-)\d+/.exec('3')` matches "3". `/(?<!-)\d+/.exec('-3')` match is not found because the number is preceded by the minus sign. |


## 图型展示一下

> 可以在 https://regexper.com/ 这个网站测试一下正则还是


**先行断言/positive lookahead**
<iframe height= 600 width= 100% src="https://regexper.com/#%2FJack%28%3F%3DSprat%29%2F" frameborder=0 allowfullscreen></iframe>

**正向否定/negative lookahead**
<iframe height= 600 width= 100% src="https://regexper.com/#%2FJack%28%3F!%3DSprat%29%2F" frameborder=0 allowfullscreen></iframe>


> https://regexper.com/不支持 lookbehind，就不展示了。

## 后记

还是是英文吧 positive lookahead, negative lookahead, positive lookbehind, negative lookbehind 好记多了

