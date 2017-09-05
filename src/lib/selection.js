'use strict';

import { get as getModule } from "./chain.js";

import DETECTED from "./detect.js";

import { ERROR } from "./string.js";

import { is as isDom } from "./dom.js";

import { visible } from "./dimension.js";


var ERROR_DOM = ERROR[1102],
    SELECT_ELEMENT = null,
    CLEAR_SELECTION = null,
    UNSELECTABLE = attributeUnselectable,
    DETECTED_SELECTION = null,
    DETECTED_DOM = null,
    CSS_UNSELECT = null;

    


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
    throw new Error(ERROR[2005]);
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

export
    function highlight(from, to) {
        
        if (isDom(from, 9)) {
            from = from.body;
        }
        
        if (!visible(from)) {
            throw new Error(ERROR[1101]);
        }
        
        if (arguments.length < 2) {
            to = null;
        }
        
        if (to !== null && !visible(to)) {
            throw new Error(ERROR_DOM);
        }
        
        SELECT_ELEMENT(from, to);
        
        return getModule();
        
    }

export
    function clearHighlight(documentNode) {
        if (!isDom(documentNode, 9)) {
            if (arguments.length > 0) {
                throw new Error(ERROR[1104]);
            }
            else {
                documentNode = global.document;
            }
        }
        
        CLEAR_SELECTION(documentNode);
        
        return getModule();
    }

export
    function unhighlightable(element, disableSelect) {
        if (!isDom(element, 1)) {
            throw new Error(ERROR_DOM);
        }
        
        UNSELECTABLE(element,
                     disableSelect === false);
        
        return getModule();
    }

if (DETECTED) {
    DETECTED_DOM = DETECTED.dom;
    DETECTED_SELECTION = DETECTED.selection;
    CSS_UNSELECT = DETECTED_SELECTION.cssUnselectable;
    
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

}

