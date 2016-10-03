'use strict';

var DETECTED = require("./detect.js"),
    DETECTED_SELECTION = DETECTED.selection,
    DOM = require("./dom.js"),
    DIMENSION = require("./dimension.js"),
    SELECT_ELEMENT = null,
    CLEAR_SELECTION = null,
    EXPORTS = {
        select: select,
        clear: clear
    };

function select(element, endElement) {
    var dimension = DIMENSION;
    
    if (DOM.is(element, 9)) {
        element = element.body;
    }
    
    if (!dimension.visible(element)) {
        throw new Error("Invalid DOM [element] parameter.");
    }
    
    if (arguments.length < 2) {
        endElement = null;
    }
    
    if (endElement !== null && !dimension.visible(endElement)) {
        throw new Error("Invalid DOM [endElement] parameter.");
    }
    
    SELECT_ELEMENT(element, endElement);
    
    return EXPORTS.chain;
    
}

function clear(document) {
    if (!DOM.is(document, 9)) {
        if (arguments.length > 0) {
            throw new Error("Invalid DOM [document] parameter.");
        }
        else {
            document = global.document;
        }
    }
    
    CLEAR_SELECTION(document);
    
    return EXPORTS.chain;
}

function selectionNotSupported() {
    throw new Error("DOM selection not supported.");
}

/**
 * Select
 */
function ieSelectElement(startElement, endElement) {
    var body = startElement.ownerDocument.body,
        startRange = body.createTextRange();
    var endRange;
    
    startRange.moveToElementText(startElement);
    if (endElement) {
        endRange = body.createTextRange();
        endRange.moveToElementText(endElement);
        startRange.setEndPoint("EndToEnd", endRange);
    }
    startRange.select();

    body = endRange = startRange = null;
}


function ieClearSelection(document) {
    document.selection.empty();
}



function w3cSelectElement(startElement, endElement) {
    var document = startElement.ownerDocument,
        startRange = document.createRange(),
        endRange = document.createRange(),
        selection = document[DETECTED.dom.defaultView].getSelection();
    
    startRange.selectNodeContents(startElement);
    if (endElement) {
        endRange.selectNodeContents(endElement);
    }
    
    selection.addRange(startRange);
    if (endElement) {
        selection.addRange(endRange);
    }
    
    document = selection = startRange = endRange;
}

function w3cClearSelection(document) {
    document[DETECTED.dom.defaultView].getSelection().removeAllRanges();
}

if (DETECTED_SELECTION.range) {
    SELECT_ELEMENT = w3cSelectElement;
    CLEAR_SELECTION = w3cClearSelection;
}
else if (DETECTED_SELECTION.textrange) {
    SELECT_ELEMENT = ieSelectElement;
    CLEAR_SELECTION = ieClearSelection;
}
else {
    SELECT_ELEMENT = CLEAR_SELECTION = selectionNotSupported;
}



module.exports = EXPORTS.chain = EXPORTS;