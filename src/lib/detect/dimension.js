'use strict';

var WINDOW = global;



module.exports = {
        pagescroll: 'pageXOffset' in WINDOW && 'pageYOffset' in WINDOW ?
                        'pageOffset' : null,
                        
        rectmethod: 'getBoundingClientRect' in WINDOW.document.documentElement ?
                        'getBoundingClientRect' : null
    };

WINDOW = null;

