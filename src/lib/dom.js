'use strict';

var DETECTED = require("./detect.js"),
    ERROR_INVALID_DOM = "Invalid DOM [element] parameter.",
    ERROR_INVALID_CALLBACK = "Invalid tree traverse [callback] parameter.",
    EXPORTS = {
        initialize: initialize,
        contains: notSupportedContains,
        is: isDom,
        isView: isDefaultView,
        eachPreorder: preOrderTraverse,
        eachPostorder: postOrderTraverse,
        eachLevel: levelTraverse
    };

function initialize() {
    var info = DETECTED.dom,
        context = EXPORTS;
    
    context.contains = info.compare ?
                            w3cContains :
                            info.contains ?
                                ieContains :
                                notSupportedContains;
}

/**
 * node contains...
 */
function notSupportedContains() {
    throw new Error("DOM position comparison is not supported");
}

function w3cContains(ancestor, descendant) {
    return 0 < ancestor.compareDocumentPosition(descendant) & 16;
}

function ieContains(ancestor, descendant) {
    return ancestor.contains(descendant);
}

/**
 * DOM manipulaton
 * TODO:
 *  insert before
 *  insert after
 *  appendChild
 */


/**
 * DOM select
 * TODO:
 *  CSS2 select = querySelectorAll
 */


function preOrderTraverse(element, callback) {
    if (!isDom(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    if (!(callback instanceof Function)) {
        throw new Error(ERROR_INVALID_CALLBACK);
    }

    return orderTraverse(element, callback, true);
}

function postOrderTraverse(element, callback) {
    if (!isDom(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    if (!(callback instanceof Function)) {
        throw new Error(ERROR_INVALID_CALLBACK);
    }

    return orderTraverse(element, callback, false);
}

function orderTraverse(element, callback, preOrderOnly) {
    var current = element,
        postOrderOnly = !preOrderOnly,
        depth = 0;
	var node;
    
    

	main: for (; current;) {

		// process pre-order
		if (preOrderOnly && current.nodeType === 1 &&
            callback(current) === false) {
			break;
		}

		// go into first child
		node = current.firstChild;

		if (node) {
			depth++;
		}
        // go next sibling or parentNode's nextSibling
        else {
            // process post-order
            if (postOrderOnly && current.nodeType === 1 &&
                callback(current) === false) {
                break;
            }
            
            node = current.nextSibling;
            
            for (; !node && depth-- && current;) {
                current = current.parentNode;
                
                // process post-order
                if (postOrderOnly && current.nodeType === 1 &&
                    callback(current) === false) {
                    break main;
                }
                
                node = current.nextSibling;
            }
        }
        current = node;
	}

	node = current = null;
    return EXPORTS.chain;
}

function levelTraverse(element, callback) {
	var queue, last, node, current;
    
    if (!isDom(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    if (!(callback instanceof Function)) {
        throw new Error(ERROR_INVALID_CALLBACK);
    }
    
    queue = last = {
                    node: element,
                    next: null
                };

	// iterate level siblings
	for (; queue; queue = queue.next) {

		node = queue.node;
		queue.node = null;

		// iterate siblings
		for (; node; node = node.nextSibling) {

			current = node.firstChild;
			if (callback(current) === false) {
				break;
			}

			// insert
			if (current) {
				last.next = { node: current, next: null };
				last = last.next;
			}
		}
	}

	last = queue = node = current = null;
    
    return EXPORTS.chain;
    
}

/**
 * is node
 */
function isDom(node, nodeType) {
    var is = isFinite;
    var type;
    
    if (node && typeof node === 'object') {
        type = node.nodeType;
        if (typeof type === 'number' && is(type)) {
            if (typeof nodeType === 'number' && is(nodeType)) {
                return type === nodeType;
            }
            return true;
        }
    }
    
    return false;
}

function isDefaultView(defaultView) {
    var type = typeof defaultView;
    
    return !!defaultView &&
            (type === 'object' || type === 'function') &&
            defaultView.self === defaultView.window &&
            !!defaultView.document;
}



module.exports = EXPORTS.chain = EXPORTS;
