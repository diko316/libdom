'use strict';

var F = Function,
    VIEW = global,
    DOC = VIEW.document;



module.exports = {
    w3c: VIEW.addEventListener instanceof F,
    ie: VIEW.attachEvent instanceof F,
    customEvent: 'CustomEvent' in VIEW,
    creator: ('createEvent' in DOC ?
                            'createEvent' :
                            'createEventObject' in DOC ?
                                'createEventObject' : false)
};



DOC = null;
VIEW = null;
