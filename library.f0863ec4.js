!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequired76b;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,r.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired76b=r);var i=r("kvC6y"),o=r("x2KWZ");const a={watchedBtn:document.querySelector("button.watched"),queueBtn:document.querySelector("button.queue"),libraryContainer:document.querySelector(".library__container"),libraryList:document.querySelector(".library__list"),emptyLibrary:document.querySelector(".empty-library"),libraryName:document.querySelector("span.library-name")},u=new(0,i.Spinner)(".spinner");function d(){u.addSpinner(),c(a.watchedBtn,a.queueBtn),l("watched"),a.libraryName.textContent="watched",setTimeout((()=>{u.removeSpinner()}),800)}function c(e,t){e.classList.add("is-active"),t.classList.remove("is-active")}function l(e){const t=(0,o.getDataFromLocalStorage)(e);u.addSpinner(),t&&emptyLibrary.classList.add("visually-hidden"),u.removeSpinner()}a.watchedBtn.addEventListener("click",d),a.queueBtn.addEventListener("click",(function(){u.addSpinner(),c(a.queueBtn,a.watchedBtn),l("queue"),a.libraryName.textContent="queue",setTimeout((()=>{u.removeSpinner()}),800)})),d()}();
//# sourceMappingURL=library.f0863ec4.js.map
