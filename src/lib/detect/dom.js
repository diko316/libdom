'use strict';

var DOCUMENT = global.document,
    ROOT = DOCUMENT.documentElement;

/**
 * TODO:
 *  querySelectorAll detect
 */





module.exports = {
    compare: !!ROOT.compareDocumentPosition,
    contains: !!ROOT.contains,
    defaultView: DOCUMENT.defaultView ?
                    'defaultView' :
                    DOCUMENT.parentWindow ?
                        'parentWindow' : null,
    querySelectorAll: !!DOCUMENT.querySelectorAll
};

DOCUMENT = ROOT = null;