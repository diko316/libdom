'use strict';

var WINDOW = global;

module.exports = {
    w3c: !!WINDOW.addEventListener,
    ie: !!WINDOW.attachEvent,
    customEvent: !!WINDOW.CustomEvent
};

WINDOW = null;
