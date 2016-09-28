'use strict';

var WINDOW = global;



module.exports = {
        pagescroll: typeof WINDOW.pageXOffset !== 'undefined',
        rectmethod: !!WINDOW.document.documentElement.getBoundingClientRect
        
    };

WINDOW = null;

