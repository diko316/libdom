'use strict';

import browser from "./browser.js";

var WINDOW = global,
    exported = false;
var ieVersion;

if (browser) {
  ieVersion = browser.ieVersion;
  exported = {
    screensize: typeof WINDOW.innerWidth !== 'undefined',
    pagescroll: typeof WINDOW.pageXOffset !== 'undefined',
    rectmethod: !!WINDOW.document.documentElement.getBoundingClientRect,
    zoomfactor: ieVersion > 0 && ieVersion < 8,
    ie8: ieVersion === 8
  };

}

WINDOW = null;

export default exported;
