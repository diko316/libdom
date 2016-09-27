'use strict';

var WINDOW = global,
    EXPORTS = false;
    
var DOCUMENT;
    
    
if (WINDOW === WINDOW.window) {
    DOCUMENT = WINDOW.document;
    if (DOCUMENT &&
        (DOCUMENT.defaultView || DOCUMENT.parentWindow) === WINDOW) {
        EXPORTS = {
            strict: DOCUMENT.compatMode === 'CSS1Compat'
        };
    }
}

module.exports = EXPORTS;

DOCUMENT = null;
WINDOW = null;
