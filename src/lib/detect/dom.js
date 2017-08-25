'use strict';

import browser from "./browser.js";

var WINDOW = global,
    exported = false;
var DOCUMENT, ROOT;

if (browser) {
  DOCUMENT = WINDOW.document;
  ROOT = DOCUMENT.documentElement;
  exported = {
    compare: !!ROOT.compareDocumentPosition,
    contains: !!ROOT.contains,
    defaultView: DOCUMENT.defaultView ?
                    'defaultView' :
                    DOCUMENT.parentWindow ?
                        'parentWindow' : null,
    querySelectorAll: !!DOCUMENT.querySelectorAll,
    listToArray: ROOT.childNodes instanceof Object
  }

}

DOCUMENT = ROOT = null;

export default exported;
