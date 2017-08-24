'use strict';

var DETECTED = require("./detect.js"),
    STRING = require("./string.js"),
    DOM = require("./dom.js"),
    DIMENSION = require("./dimension.js"),
    DETECTED_DOM = DETECTED.dom,
    DETECTED_SELECTION = DETECTED.selection,
    ERROR_DOM = STRING[1102],
    SELECT_ELEMENT = null,
    CLEAR_SELECTION = null,
    UNSELECTABLE = attributeUnselectable,
    CSS_UNSELECT = DETECTED_SELECTION.cssUnselectable,
    EXPORTS = {
        select: select,
        clear: clear,
        unselectable: unselectable
    };

function select(from, to) {
    var dimension = DIMENSION;
    
    if (DOM.is(from, 9)) {
        from = from.body;
    }
    
    if (!dimension.visible(from)) {
        throw new Error(STRING[1101]);
    }
    
    if (arguments.length < 2) {
        to = null;
    }
    
    if (to !== null && !dimension.visible(to)) {
        throw new Error(ERROR_DOM);
    }
    
    SELECT_ELEMENT(from, to);
    
    return EXPORTS.chain;
    
}

function clear(documentNode) {
    if (!DOM.is(documentNode, 9)) {
        if (arguments.length > 0) {
            throw new Error(STRING[1104]);
        }
        else {
            documentNode = global.document;
        }
    }
    
    CLEAR_SELECTION(documentNode);
    
    return EXPORTS.chain;
}

function unselectable(element, disableSelect) {
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_DOM);
    }
    
    UNSELECTABLE(element,
                 disableSelect === false);
    
    return EXPORTS.chain;
}

function webkitUnselectable(element, selectable) {
    element.style.webkitUserSelect = selectable ? 'text' : 'none';
}

function geckoUnselectable(element, selectable) {
    element.style.MozUserSelect = selectable ? 'text' : 'none';
}

function attributeUnselectable(element, selectable) {
    element.unselectable = selectable ? 'off' : 'on';
    
}


function selectionNotSupported() {
    throw new Error(STRING[2005]);
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
        selection = document[DETECTED_DOM.defaultView].getSelection();
    
    startRange.selectNodeContents(startElement);
    if (endElement) {
        endRange.selectNodeContents(endElement);
    }
    
    selection.addRange(startRange);
    if (endElement) {
        selection.addRange(endRange);
    }
    
    document = selection = startRange = endRange = null;
}

function w3cClearSelection(document) {
    document[DETECTED_DOM.defaultView].getSelection().removeAllRanges();
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

if (CSS_UNSELECT) {
    UNSELECTABLE = CSS_UNSELECT === 'MozUserSelect' ?
                        geckoUnselectable : webkitUnselectable;
}


module.exports = EXPORTS.chain = EXPORTS;