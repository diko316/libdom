'use strict';

import browser from "./browser.js";

var WINDOW = global,
  exported = false;
var DOCUMENT, ROOTSTYLE, UNDEFINED;

if (browser) {
  DOCUMENT = global.document;
  ROOTSTYLE = DOCUMENT.documentElement.style;
  UNDEFINED = 'undefined';

  exported = {
    range: !!DOCUMENT.createRange,
    textrange: !!DOCUMENT.createElement('input').createTextRange,
    cssUnselectable: typeof ROOTSTYLE.MozUserSelect !== UNDEFINED ?
                        'MozUserSelect' :
                        typeof ROOTSTYLE.webkitUserSelect !== UNDEFINED ?
                            'webkitUserSelect' : false
  };

}

DOCUMENT = ROOTSTYLE = null;

export default exported;
