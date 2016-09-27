'use strict';

var win = global,
    doc = win.document,
    root = doc.documentElement;



module.exports = {
        pagescroll: 'pageXOffset' in win && 'pageYOffset' in win ?
                        'pageOffset' : null,
                        
        rectmethod: 'getBoundingClientRect' in root ?
                        'getBoundingClientRect' : null
    };

root = null;
doc = null;
win = null;