'use strict';

var WINDOW = global.window,
    match = WINDOW.navigator.userAgent.match(/msie ([0-9]+\.[0-9]+)/i),
    ieVersion = match && parseInt(match[1], 10) || 0;

module.exports = {
        screensize: typeof WINDOW.innerWidth !== 'undefined',
        pagescroll: typeof WINDOW.pageXOffset !== 'undefined',
        rectmethod: !!WINDOW.document.documentElement.getBoundingClientRect,
        zoomfactor: ieVersion > 0 && ieVersion < 8
    };

WINDOW = null;

