'use strict';


var WINDOW = global,
    DOCUMENT = WINDOW.document;


module.exports = {
    computedStyle: WINDOW.getComputedStyle instanceof Function ?
                        'getComputedStyle' :
                        'currentStyle' in DOCUMENT.documentElement ?
                            'currentStyle' : false
};

DOCUMENT = null;
WINDOW = null;
