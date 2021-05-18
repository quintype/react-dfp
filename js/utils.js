const GPT_SRC = {
  standard: 'securepubads.g.doubleclick.net',
  limitedAds: 'pagead2.googlesyndication.com',
};

function doloadGPTScript(resolve, reject, limitedAds, timerId = null) {
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];

  const scriptTag = document.createElement('script');
  scriptTag.src = `${document.location.protocol}//${limitedAds ? GPT_SRC.limitedAds : GPT_SRC.standard}/tag/js/gpt.js`;
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

export function loadGPTScript(limitedAds = false, deferAdsBy = 2500) {
  if (deferAdsBy > 0) {
    return new Promise((resolve, reject) => {
      const timerId = setTimeout(() => {
        doloadGPTScript(resolve, reject, limitedAds, timerId);
      }, deferAdsBy);
    });
  }
  return new Promise ((resolve, reject) =>  {
    doloadGPTScript(resolve, reject, limitedAds);
  })
}
