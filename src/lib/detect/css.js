'use strict';


var WINDOW = global,
    ROOT = WINDOW.document.documentElement,
    STYLE = ROOT.style;

module.exports = {
    w3cStyle: !!WINDOW.getComputedStyle,
    ieStyle: !!ROOT.currentStyle,
    setattribute: !!STYLE.setAttribute,
    setproperty: !!STYLE.setProperty
    
};

WINDOW = ROOT = STYLE = null;
