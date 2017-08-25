'use strict';

import browser from "./browser.js";

var WINDOW = global,
  exported = false;

if (browser) {
  exported = {
    w3c: !!WINDOW.addEventListener,
    ie: !!WINDOW.attachEvent,
    customEvent: !!WINDOW.CustomEvent
  }
}

WINDOW = null;

export default exported;
