'use strict';

var WINDOW = global,
    EXPORTS = false;
    
var DOCUMENT;

if (typeof WINDOW.window === 'object') {
    DOCUMENT = WINDOW.document;
    if (typeof DOCUMENT === 'object' &&
        (DOCUMENT.defaultView || DOCUMENT.parentWindow).document === DOCUMENT) {
        EXPORTS = {
            strict: DOCUMENT.compatMode === 'CSS1Compat'
        };
    }
}

module.exports = EXPORTS;

DOCUMENT = null;
WINDOW = null;
