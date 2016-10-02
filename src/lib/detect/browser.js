'use strict';

var WINDOW = global,
    EXPORTS = false;
    
var match, ieVersion;
    
var DOCUMENT;

if (typeof WINDOW.window === 'object') {
    DOCUMENT = WINDOW.document;
    if (typeof DOCUMENT === 'object' &&
        (DOCUMENT.defaultView || DOCUMENT.parentWindow).document === DOCUMENT) {
        
        match = WINDOW.navigator.userAgent.match(/msie ([0-9]+\.[0-9]+)/i);
        ieVersion = match && parseInt(match[1], 10) || 0;
        
        EXPORTS = {
            strict: DOCUMENT.compatMode === 'CSS1Compat',
            ieVersion: ieVersion,
            ie8: ieVersion === 8
        };
    }
}

module.exports = EXPORTS;

DOCUMENT = null;
WINDOW = null;
