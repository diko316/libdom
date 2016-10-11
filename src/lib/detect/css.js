'use strict';


var WINDOW = global,
    ROOT = WINDOW.document.documentElement,
    STYLE = ROOT.style,
    TRANSITION_SUPPORT = ['OTransition',
                            'webkitTransition',
                            'MozTransition',
                            'transition'];

var name, l, EXPORTS;


module.exports = EXPORTS = {
    w3cStyle: !!WINDOW.getComputedStyle,
    ieStyle: !!ROOT.currentStyle,
    setattribute: !!STYLE.setAttribute,
    setproperty: !!STYLE.setProperty,
    transition: false,
    opacity: typeof STYLE.opacity !== 'undefined',
    filterOpacity: typeof STYLE.filter !== 'undefined'
};

// detect transition
for (l = TRANSITION_SUPPORT.length; l--;) {
    name = TRANSITION_SUPPORT[l];
    if (typeof STYLE[name] !== 'undefined') {
        EXPORTS.transition = name;
        break;
    }
}


WINDOW = ROOT = STYLE = null;
