'use strict';

var DOCUMENT = global.document;

module.exports = {
    range: DOCUMENT.createRange,
    textrange: DOCUMENT.createElement('input').createTextRange
};

