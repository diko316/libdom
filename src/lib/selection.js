'use strict';

var DETECTED = require("./detect.js"),
    DOM = require("./dom.js");

function select(from, to) {
    
}

function unselect(from, to) {
    
}

function clear(document) {
    
}



/**
 * Select
 */
function ieSelectElement(startElement, endElement) {
    var body = startElement.ownerDocument.body,
        startRange = body.createTextRange(),
        endRange = body.createTextRange();
    
    startRange.moveToElementText(startElement);
    endRange.moveToElementText(endElement);
    startRange.setEndPoint("EndToEnd", endRange);
    startRange.select();

    body = endRange = startRange = null;
}



function ieUnselectElement(element, toStart) {
    var body = element.ownerDocument.body,
        range = body.createTextRange();
    
    range.moveToElementText(element);
    range.collapse(toStart !== false);
    
    body = range = null;
}

function ieClearSelection(document) {
    var range = document.selection.createRange();
    range.moveToElementText(document.body);
    range.collapse(true);
    range = null;
}