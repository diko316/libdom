'use strict';

var WINDOW = global,
    DOCUMENT = WINDOW.document;



module.exports = {
    w3c: !!WINDOW.addEventListener,
    ie: !!WINDOW.attachEvent,
    customEvent: !!WINDOW.CustomEvent,
    creator: (DOCUMENT.createEvent  ?
                            'createEvent' :
                            DOCUMENT.createEventObject ?
                                'createEventObject' : false)
};

DOCUMENT = null;
WINDOW = null;
