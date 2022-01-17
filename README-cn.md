[![NPM Version](https://img.shields.io/npm/v/web-barrier-free.svg)][npm-url]
[![Build Status](https://app.travis-ci.com/halodong/web-barrier-free.svg?branch=master)](https://www.travis-ci.com)
[![Downloads](http://img.shields.io/npm/dm/web-barrier-free.svg)][npm-url]
<!-- [![Coverage Status](https://coveralls.io/repos/github/halodong/web-barrier-free/badge.svg?branch=master)](https://coveralls.io/github/halodong/web-barrier-free?branch=master) -->
[npm-url]: https://npmjs.org/package/web-barrier-free
# web-barrier-free
一个可以帮助你快速添加无障碍阅读模式的 JavaScript 库。基于 `SpeechSynthesis` API实现。

## 安装

使用 npm
```
$ npm install web-barrier-free
```
或者 yarn

```
$ yarn add web-barrier-free
```

**demo:**
- [en-demo](https://codesandbox.io/s/pedantic-stitch-ru1no)
- [zh-CN-demo](https://halodong.github.io/)

## 使用

**配置:**

### readMode
```ts
type readMode = 'finger' | 'continuous'
```
continuous: 连读 `document.body.innerText`,
finger: 指读，阅读鼠标指向的元素文本，`img` 标签会阅读 `alt` 属性的文本。

默认值：'finger'。
### language
```ts
type language = 'en' | 'zh-CN'
```
使用语言，默认值 'zh-CN'。
### rate
语速，范围 2 ~ 0.1，默认值：1。

### pitch
语调，范围 2 ~ 0.1，默认值：1。

### volume
音量，范围 2 ~ 0.1，默认值：1。

### externalFn
你可以提供一个外部的阅读文字方法 `externalFn`，而不使用 `class Wbf` 提供的 playAudio 方法。
### needConsole
是否需要默认的控制台元素, 默认值 `true`。

## 兼容性
详情请见[MDN SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis#browser_compatibility)
## 问题

bug 或者建议，你可以通过[create an issue](https://github.com/halodong/web-barrier-free/issues/new)提交。
© 2021 GitHub, Inc.
