'use strict';

var BROWSER = require("./browser.js"),
    ENABLED = BROWSER.browser,
    F = Function,
    VIEW = global,
    DOC = ENABLED && VIEW.document;



module.exports = {
    w3c: ENABLED && VIEW.addEventListener instanceof F,
    ie: ENABLED && VIEW.attachEvent instanceof F,
    customEvent: ENABLED && 'CustomEvent' in VIEW,
    creator: ENABLED && ('createEvent' in DOC ?
                            'createEvent' :
                            'createEventObject' in DOC ?
                                'createEventObject' : false)
};



DOC = null;
VIEW = null;
