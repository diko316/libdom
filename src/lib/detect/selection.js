'use strict';

var DOCUMENT = global.document,
    ROOTSTYLE = DOCUMENT.documentElement.style,
    UNDEFINED = 'undefined';

module.exports = {
    range: !!DOCUMENT.createRange,
    textrange: !!DOCUMENT.createElement('input').createTextRange,
    cssUnselectable: typeof ROOTSTYLE.MozUserSelect !== UNDEFINED ?
                        'MozUserSelect' :
                        typeof ROOTSTYLE.webkitUserSelect !== UNDEFINED ?
                            'webkitUserSelect' : false
};


DOCUMENT = null;