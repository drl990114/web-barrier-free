[![LICENSE](https://img.shields.io/github/license/bubkoo/html-to-image?style=flat-square)](./LICENSE) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/karma-runner/karma-coverage) [![NPM Version](https://img.shields.io/npm/v/web-barrier-free.svg)][npm-url] [![Build Status](https://app.travis-ci.com/halodong/web-barrier-free.svg?branch=master)](https://www.travis-ci.com) [![jest coverage](coverage/badge-statements.svg)](coverage/badge-statements.svg)

[npm-url]: https://npmjs.org/package/web-barrier-free

# web-barrier-free

一个可以帮助你快速添加无障碍阅读模式的 JavaScript 库。基于 `SpeechSynthesis` API 实现。

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

**示例** 

Wbf 采用单例设计模式，推荐使用 getInstance 创建和获得实例。

```js
const options = {
  language: 'en',
  rate: 1,
  pitch: 1,
  readMode: 'finger'
}
const instance = Wbf.getInstance(options)
openBtn.addEventListener('click', () => {
  instance.open()
})
```

**配置:**

### opening

一个表示当前是否为开启状态的 boolean 值。默认值：false 。

### readMode

```ts
type readMode = 'finger' | 'continuous'
```

continuous: 连读 `document.body.innerText`, finger: 指读，阅读鼠标指向的元素文本，`img` 标签会阅读 `alt` 属性的文本。

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

## 核心的 JavaScript API

### open

开启 Wbf 的函数。

```typescript
open (): void;
```

### close

关闭 Wbf 的函数。

```typescript
close (): void;
```

### changeOptions

修改 Wbf 属性的函数，不能修改没有的属性和 `opening` 属性。

```typescript
changeOptions (keyName: string, value): void;
```

### changeMode

修改 Wbf 阅读模式的函数。

```typescript
type readMode = 'finger' | 'continuous';
changeMode (readMode: readMode): void;
```

### playAudio

阅读字符串的函数。

```typescript
playAudio (str: string): SpeechSynthesisUtterance | undefined
```

## 兼容性

详情请见 [MDN SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis#browser_compatibility)

## 问题

bug 或者建议，你可以通过[create an issue](https://github.com/halodong/web-barrier-free/issues/new)提交。 © 2021 GitHub, Inc.
