'use strict';


import {
            string
        } from "libcore";

import browser from "./browser.js";

var WINDOW = global,
    exported = false;
var DOC, DIV, STYLE, name, color;

function detectAlphaColor(style) {
    var rgba = 'rgba(0,0,0,0.5)';

    try {
        style.color = rgba;
        color = style.color;

        if (string(color)) {
            color = color.replace(/[ \r\n\t\s]+/g, '').toLowerCase();
        }

        if (rgba === color) {
            return true;
        }
    }
    catch (e) {}

    return false;
}

function detectTransition(style) {
    var supports = ['OTransition',
                            'webkitTransition',
                            'MozTransition',
                            'transition'],
        l = supports.length;

    for (l = supports.length; l--;) {
        name = supports[l];
        if (typeof style[name] !== 'undefined') {
            return name;
        }
    }
    return false;
}


if (browser) {
  DOC = WINDOW.document;
  DIV = DOC.createElement('div');
  STYLE = DIV.style;

  exported = {
    w3cStyle: !!WINDOW.getComputedStyle,
    ieStyle: !!DOC.documentElement.currentStyle,
    setattribute: !!STYLE.setAttribute,
    setproperty: !!STYLE.setProperty,
    opacity: typeof STYLE.opacity !== 'undefined',
    filterOpacity: typeof STYLE.filter !== 'undefined',
    alphaColor: detectAlphaColor(STYLE),
    transition: = detectTransition(STYLE)
  };

}

WINDOW = DOC = DIV = STYLE = null;

export default exported;
