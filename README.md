[![NPM Version](https://img.shields.io/npm/v/web-barrier-free.svg)][npm-url]
[![Build Status](https://app.travis-ci.com/halodong/web-barrier-free.svg?branch=master)](https://www.travis-ci.com)
[![Downloads](http://img.shields.io/npm/dm/web-barrier-free.svg)][npm-url]
<!-- [![Coverage Status](https://coveralls.io/repos/github/halodong/web-barrier-free/badge.svg?branch=master)](https://coveralls.io/github/halodong/web-barrier-free?branch=master) -->
[npm-url]: https://npmjs.org/package/web-barrier-free
# web-barrier-free
A JavaScript library that can help you quickly add accessible reading modes. Based on `SpeechSynthesis` API implementation.

[简体中文](https://github.com/halodong/web-barrier-free/blob/master/README-cn.md)

## Install

Use npm
```
$ npm install web-barrier-free
```
or yarn

```
$ yarn add web-barrier-free
```

**demo:**
- [en-demo](https://codesandbox.io/s/pedantic-stitch-ru1no)
- [zh-CN-demo](https://halodong.github.io/)

## Use

**Options:**

### readMode
```ts
type readMode = 'finger' | 'continuous'
```
continuous: Continuous reading `document.body.innerText`.
finger: Point to read, read the text of the element pointed by the mouse, the `img` tag will read the text of the `alt` attribute.

defaults：'finger'.
### language
```ts
type language = 'en' | 'zh-CN'
```
Use language, the default value is'zh-CN'.
### rate
Speaking rate, range 2 ~ 0.1, default value: 1.

### pitch
Intonation, range 2 ~ 0.1, default value: 1.

### volume
Volume, range 2 ~ 0.1, default value: 1.

### externalFn
You can provide an external reading text method `externalFn` instead of using the playAudio method provided by `class Wbf`.
### needConsole
Whether the default console element is required, the default value is `true`.

## Compatibility
See for details[MDN SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis#browser_compatibility)

## Problem
For bugs or suggestions, you can submit via [create an issue](https://github.com/halodong/web-barrier-free/issues/new).
© 2021 GitHub, Inc.
