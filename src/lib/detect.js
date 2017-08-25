'use strict';


import browser from "./detect/browser.js";
import { default as domEvent } from "./detect/event.js";
import dom from "./detect/dom.js";
import css from "./detect/css.js";
import dimension from "./detect/dimension.js";
import selection from "./detect/selection.js";

var exported = false;

if (browser) {
    exported = {
      browser: browser,
      event: domEvent,
      dom: dom,
      css: css,
      dimension: dimension,
      selection: selection
    };
}

export default exported;
