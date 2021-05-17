"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGPTScript = loadGPTScript;
var GPT_SRC = {
  standard: 'securepubads.g.doubleclick.net',
  limitedAds: 'pagead2.googlesyndication.com'
};

function doloadGPTScript(resolve, reject, limitedAds) {
  var timerId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  var scriptTag = document.createElement('script');
  scriptTag.src = "".concat(document.location.protocol, "//").concat(limitedAds ? GPT_SRC.limitedAds : GPT_SRC.standard, "/tag/js/gpt.js");
  scriptTag.async = true;
  scriptTag.type = 'text/javascript';

  scriptTag.onerror = function scriptTagOnError(errs) {
    reject(errs);
  };

  scriptTag.onload = function scriptTagOnLoad() {
    resolve(window.googletag);
  };

  document.getElementsByTagName('head')[0].appendChild(scriptTag);

  if (timerId !== null) {
    clearTimeout(timerId);
  }
}

function loadGPTScript() {
  var limitedAds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var deferAds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (deferAds) {
    return new Promise(function (resolve, reject) {
      var timerId = setTimeout(function () {
        doloadGPTScript(resolve, reject, limitedAds, timerId);
      }, 2500);
    });
  }

  return new Promise(function (resolve, reject) {
    doloadGPTScript(resolve, reject, limitedAds);
  });
}