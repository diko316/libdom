'use strict';


var win = global,
    doc = win.document;


module.exports = {
    computedStyle: win.getComputedStyle instanceof Function ?
                        'getComputedStyle' :
                        'currentStyle' in doc.documentElement ?
                            'currentStyle' : false
};

doc = null;
win = null;
