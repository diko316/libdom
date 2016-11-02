'use strict';

var DOCUMENT = global.document,
    ROOT = DOCUMENT.documentElement;

module.exports = {
    compare: !!ROOT.compareDocumentPosition,
    contains: !!ROOT.contains,
    defaultView: DOCUMENT.defaultView ?
                    'defaultView' :
                    DOCUMENT.parentWindow ?
                        'parentWindow' : null,
    querySelectorAll: !!DOCUMENT.querySelectorAll,
    listToArray: ROOT.childNodes instanceof Object
};

DOCUMENT = ROOT = null;