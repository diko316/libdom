'use strict';


var WINDOW = global,
    DOC = WINDOW.document,
    DIV = DOC.createElement('div'),
    STYLE = DIV.style,
    RGBA = 'rgba(0,0,0,0.5)',
    TRANSITION_SUPPORT = ['OTransition',
                            'webkitTransition',
                            'MozTransition',
                            'transition'];

var name, l, EXPORTS, color;


module.exports = EXPORTS = {
    w3cStyle: !!WINDOW.getComputedStyle,
    ieStyle: !!DOC.documentElement.currentStyle,
    setattribute: !!STYLE.setAttribute,
    setproperty: !!STYLE.setProperty,
    transition: false,
    opacity: typeof STYLE.opacity !== 'undefined',
    filterOpacity: typeof STYLE.filter !== 'undefined',
    alphaColor: false
};

// try alpha color
try {
    STYLE.color = RGBA;
    color = STYLE.color;
    
    if (typeof color === 'string') {
        color = color.replace(/[ \r\n\t\s]+/g, '').toLowerCase();
    }

    if (RGBA === color) {
        EXPORTS.alphaColor = true;
        console.log('alpha color supported!');
    }
}
catch (e) {}

console.log('supports alpha color: ', EXPORTS.alphaColor);

// detect transition
for (l = TRANSITION_SUPPORT.length; l--;) {
    name = TRANSITION_SUPPORT[l];
    if (typeof STYLE[name] !== 'undefined') {
        EXPORTS.transition = name;
        break;
    }
}


WINDOW = DOC = DIV = STYLE = null;
