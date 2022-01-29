(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Wbf = factory());
})(this, (function () { 'use strict';

  var defaultOptions = {
      // 语言
      language: 'zh-CN',
      // 语速
      rate: 1,
      // 语调
      pitch: 1,
      // 音量
      volume: 1
  };

  // const
  var showBarDomId = '$$wsashowbar';
  var consoleDomId = '$$wsaConsole';
  var emphasizeClassName = 'emphasizeStyle';
  var consoleClassName = 'consoleEl';
  var optionsArr = ['language', 'rate', 'pitch', 'volume'];
  var cnGather = {
      a: '链接',
      img: '图片',
      nav: '链接',
      close: '关闭',
      continuousRead: '连读',
      fingerRead: '指读',
      volume: '音量',
      rate: '语速'
  };
  var enGather = {
      a: 'Link',
      img: 'Image',
      nav: 'Link',
      close: 'Close',
      continuousRead: 'ContinuousRead',
      fingerRead: 'FingerRead',
      volume: 'Volume',
      rate: 'Rate'
  };
  var lowerCaseImgTagName = 'img';
  var modes = ['finger', 'continuous'];
  // fn
  var getGather = function (language) {
      var gather = cnGather;
      if (language === 'en') {
          gather = enGather;
      }
      return gather;
  };
  var getElText = function (el, language) {
      var tag = descriptionTag(el.tagName, language);
      var notContainChildText = getNotContainChildText(el);
      var text = tag !== null ? tag + ": " + notContainChildText : notContainChildText;
      return text;
  };
  var descriptionTag = function (tagName, language) {
      var tag = tagName.toLowerCase();
      var gather = getGather(language);
      return gather[tag] !== undefined ? gather[tag] : null;
  };
  var getNotContainChildText = function (el) {
      if (el.tagName.toLowerCase() === lowerCaseImgTagName) {
          return el.alt;
      }
      var notContainChildText = Array.prototype.filter
          .call(el.childNodes, function (node) { return node.nodeType === 3; })
          .map(function (node) { return node.nodeValue.trim(); })
          .join('');
      return notContainChildText;
  };
  var testReadMode = function (mode) {
      return Array.prototype.includes.call(modes, mode);
  };

  var overHandler = function (e, wbf) {
      var notContainChildText = getNotContainChildText(e.target);
      if (notContainChildText.length === 0)
          return;
      if (e.target !== document.body && e.target.tagName.toLowerCase() !== 'html' &&
          e.target.id !== showBarDomId) {
          wbf.emphasize(e.target);
          var text = getElText(e.target, wbf.language);
          wbf.readMode === 'finger' && wbf.playAudio(text);
          if (wbf.showBarEl != null) {
              if (text.length > 150) {
                  wbf.showBarEl.style.fontSize = '24px';
              }
              else if (text.length > 100) {
                  wbf.showBarEl.style.fontSize = '26px';
              }
              else if (text.length > 50) {
                  wbf.showBarEl.style.fontSize = '28px';
              }
              else if (text.length > 20) {
                  wbf.showBarEl.style.fontSize = '30px';
              }
              else {
                  wbf.showBarEl.style.fontSize = '32px';
              }
              wbf.showBarEl.innerText = text;
          }
      }
  };
  var outHandler = function (e, wbf) {
      wbf.removeEmphasize(e.target);
  };

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".emphasizeStyle {\r\n  background: black !important;\r\n  color: white !important;\r\n}\r\n\r\n.consoleEl {\r\n  padding: 10px;\r\n  z-index: 9999;\r\n  border-bottom: 1px #2f5bb7 solid;\r\n}\r\n\r\n.consoleEl .consoleEl-main {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  flex-wrap: wrap;\r\n  margin: 0 auto;\r\n  width: 50vw;\r\n}\r\n@media (max-width: 750px) {\r\n  .consoleEl .consoleEl-main {\r\n    width: 100vw;\r\n  }\r\n}\r\n.consoleEl button {\r\n  color: white;\r\n  background: #4c8ffb;\r\n  padding: 5px 10px;\r\n  border-radius: 2px;\r\n  font-weight: bold;\r\n  font-size: 9pt;\r\n  outline: none;\r\n  box-shadow: inset 0 1px 0 #80b0fb;\r\n}\r\n\r\n.consoleEl button:hover {\r\n  border: 1px #2f5bb7 solid;\r\n  box-shadow: 0 1px 1px #eaeaea, inset 0 1px 0 #5a94f1;\r\n  background: #3f83f1;\r\n}\r\n\r\n.consoleEl #_wbfClose {\r\n  border: 1px #f0120b solid;\r\n  background-color: #d1341f;\r\n}\r\n.consoleEl #_wbfClose:hover {\r\n  background-color: #ad2210;\r\n}\r\n";
  styleInject(css_248z);

  var Wbf = /** @class */ (function () {
      function Wbf(options) {
          var _this = this;
          var _a, _b, _c, _d, _e;
          this.readMode = 'finger';
          this.showBarEl = null;
          this.needConsole = true;
          this.externalFn = null;
          if (options == null)
              options = defaultOptions;
          (options === null || options === void 0 ? void 0 : options.readMode) !== undefined && (this.readMode = options.readMode);
          (options === null || options === void 0 ? void 0 : options.needConsole) !== undefined &&
              (this.needConsole = options.needConsole);
          this.language = (_a = options === null || options === void 0 ? void 0 : options.language) !== null && _a !== void 0 ? _a : defaultOptions.language;
          this.rate = (_b = options === null || options === void 0 ? void 0 : options.rate) !== null && _b !== void 0 ? _b : defaultOptions.rate;
          this.pitch = (_c = options === null || options === void 0 ? void 0 : options.pitch) !== null && _c !== void 0 ? _c : defaultOptions.pitch;
          this.volume = (_d = options === null || options === void 0 ? void 0 : options.volume) !== null && _d !== void 0 ? _d : defaultOptions.volume;
          this.externalFn = (_e = options === null || options === void 0 ? void 0 : options.externalFn) !== null && _e !== void 0 ? _e : null;
          this.overHandler = function (e) { return overHandler(e, _this); };
          this.outHandler = function (e) { return outHandler(e, _this); };
      }
      Wbf.prototype.open = function () {
          this.changeMode(this.readMode);
          this.needConsole && this.createConsole();
      };
      Wbf.prototype.close = function () {
          var _this = this;
          var emphasizeEls = document.querySelectorAll("." + emphasizeClassName);
          emphasizeEls.forEach(function (el) {
              _this.removeEmphasize(el);
          });
          speechSynthesis.cancel();
          document.removeEventListener('mouseover', this.overHandler);
          document.removeEventListener('mouseout', this.outHandler);
          this.removeShowBarDom();
          this.removeConsole();
      };
      Wbf.prototype.changeOptions = function (keyName, value) {
          if (optionsArr.includes[keyName] === false && this[keyName] !== undefined) {
              throw new Error(keyName + " options do not exist on wbf");
          }
          if (typeof value === 'number') {
              value >= 2 && (value = 2);
          }
          this[keyName] = value;
      };
      Wbf.prototype.changeMode = function (readMode) {
          if (!testReadMode(readMode)) {
              throw new Error("readMode not includes this " + readMode);
          }
          this.readMode = readMode;
          if (readMode !== 'finger') {
              var allText = document.body.innerText;
              this.playAudio(allText);
          }
          this.addHandler();
      };
      Wbf.prototype.addHandler = function () {
          if (this.showBarEl == null) {
              var showBar = this.createShowBarDom();
              this.showBarEl = showBar;
          }
          document.addEventListener('mouseover', this.overHandler);
          document.addEventListener('mouseout', this.outHandler);
      };
      Wbf.prototype.createUtterance = function (str) {
          var msg = new SpeechSynthesisUtterance();
          msg.text = str;
          msg.lang = this.language;
          msg.pitch = this.pitch;
          msg.rate = this.rate;
          msg.volume = this.volume;
          return msg;
      };
      Wbf.prototype.playAudio = function (str) {
          if (this.externalFn != null) {
              this.externalFn(str);
          }
          else {
              speechSynthesis.cancel();
              var msg = this.createUtterance(str);
              speechSynthesis.speak(msg);
              return msg;
          }
      };
      Wbf.prototype.emphasize = function (el) {
          el.classList.add(emphasizeClassName);
      };
      Wbf.prototype.removeEmphasize = function (el) {
          el.classList.remove(emphasizeClassName);
      };
      Wbf.prototype.createShowBarDom = function () {
          var prev = document.getElementById(showBarDomId);
          if (prev != null)
              return prev;
          var showBar = document.createElement('div');
          showBar.id = showBarDomId;
          showBar.style.position = 'fixed';
          showBar.style.bottom = '0px';
          showBar.style.left = '0px';
          showBar.style.width = '100%';
          showBar.style.minHeight = '50px';
          showBar.style.maxHeight = '300px';
          showBar.style.fontWeight = 'bold';
          showBar.style.textAlign = 'center';
          showBar.style.wordBreak = 'break-word;';
          showBar.style.overflow = 'hidden';
          showBar.style.background = 'white';
          showBar.style.border = '2px solid #eee';
          document.body.appendChild(showBar);
          return showBar;
      };
      Wbf.prototype.createConsole = function () {
          var _this = this;
          var prev = document.getElementById(consoleDomId);
          if (prev != null)
              return;
          var consoleEl = document.createElement('div');
          consoleEl.id = consoleDomId;
          var gather = getGather(this.language);
          consoleEl.classList.add(consoleClassName);
          consoleEl.innerHTML = "\n    <div class=\"" + consoleClassName + "-main\">\n      <div>\n        <button id=\"_wbfClose\">" + gather.close + "</button>\n        <button id=\"_wbfContinuousRead\">" + gather.continuousRead + "</button>\n        <button id=\"_wbfFingerRead\">" + gather.fingerRead + "</button> \n      </div>\n        |\n        <div>\n        " + gather.volume + "\n          <button id=\"_wbfAddVolume\">+</button>\n          <button id=\"_wbfReduceVolume\">-</button>\n        </div>\n        |\n        <div>\n        " + gather.rate + "\n          <button id=\"_wbfAddRate\">+</button>\n          <button id=\"_wbfReduceRate\">-</button>\n        </div>\n    </div>";
          document.body.insertBefore(consoleEl, document.body.firstChild);
          var closeBtn = document.getElementById('_wbfClose');
          var continuousReadBtn = document.getElementById('_wbfContinuousRead');
          var fingerReadBtn = document.getElementById('_wbfFingerRead');
          var addVolumeBtn = document.getElementById('_wbfAddVolume');
          var reduceVolumeBtn = document.getElementById('_wbfReduceVolume');
          var addRateBtn = document.getElementById('_wbfAddRate');
          var reduceRateBtn = document.getElementById('_wbfReduceRate');
          closeBtn != null && (closeBtn.onclick = function () { return _this.close(); });
          continuousReadBtn != null &&
              (continuousReadBtn.onclick = function () { return _this.changeMode('continuous'); });
          fingerReadBtn != null &&
              (fingerReadBtn.onclick = function () { return _this.changeMode('finger'); });
          addVolumeBtn != null &&
              (addVolumeBtn.onclick = function () { return _this.changeOptions('volume', ++_this.volume); });
          reduceVolumeBtn != null &&
              (reduceVolumeBtn.onclick = function () {
                  return _this.changeOptions('volume', --_this.volume);
              });
          addRateBtn != null &&
              (addRateBtn.onclick = function () { return _this.changeOptions('rate', ++_this.rate); });
          reduceRateBtn != null &&
              (reduceRateBtn.onclick = function () { return _this.changeOptions('rate', --_this.rate); });
      };
      Wbf.prototype.removeConsole = function () {
          var consoleEl = document.getElementById(consoleDomId);
          if (consoleEl != null) {
              consoleEl.remove();
          }
      };
      Wbf.prototype.removeShowBarDom = function () {
          if (this.showBarEl != null) {
              this.showBarEl.remove();
              this.showBarEl = null;
          }
      };
      return Wbf;
  }());

  return Wbf;

}));
//# sourceMappingURL=index.js.map
