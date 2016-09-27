'use strict';

var F = Function,
    WINDOW = global,
    DOCUMENT = WINDOW.document;



module.exports = {
    w3c: WINDOW.addEventListener instanceof F,
    ie: WINDOW.attachEvent instanceof F,
    customEvent: 'CustomEvent' in WINDOW,
    creator: ('createEvent' in DOCUMENT ?
                            'createEvent' :
                            'createEventObject' in DOCUMENT ?
                                'createEventObject' : false)
};

DOCUMENT = null;
WINDOW = null;
