'use strict';


var WINDOW = global;

module.exports = {
    w3cStyle: !!WINDOW.getComputedStyle,
    ieStyle: !!WINDOW.document.documentElement.currentStyle
};

WINDOW = null;
