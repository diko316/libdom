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

function isStrict() {
    return IS_BROWSER ? global.document.compatMode === 'CSS1Compat' : false;
}

if (IS_BROWSER) {
    EXPORTS = {
        browser: IS_BROWSER,
        strict: isStrict()
    };
}

module.exports = EXPORTS;