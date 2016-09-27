'use strict';

var IS_BROWSER = isBrowser(),
    EXPORTS = false;

function isBrowser() {
    var GLOBAL = global,
        found = false;
    var DOC;
    
    if (GLOBAL === GLOBAL.window) {
        DOC = GLOBAL.document;
        if (DOC && (DOC.defaultView || DOC.parentWindow) === GLOBAL) {
            found = true;
        }
    }
    DOC = null;
    GLOBAL = null;
    
    return found;
}


if (IS_BROWSER) {
    EXPORTS = {
        browser: IS_BROWSER,
        strict: IS_BROWSER && global.document.compatMode === 'CSS1Compat'
    };
}

module.exports = EXPORTS;