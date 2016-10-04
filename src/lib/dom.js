'use strict';

var DETECTED = require("./detect.js"),
    STRING = require("./string.js"),
    OBJECT_TYPE = '[object Object]',
    ERROR_INVALID_DOM = STRING.ERROR_ELEMENT,
    ERROR_INVALID_DOM_NODE = STRING.ERROR_NODE,
    ERROR_INVALID_CSS_SELECTOR = STRING.ERROR_SELECTOR,
    ERROR_INVALID_CALLBACK = STRING.ERROR_TREE_CALLBACK,
    ERROR_INVALID_ELEMENT_CONFIG = STRING.ERROR_DOM_CONFIG,
    INVALID_DESCENDANT_NODE_TYPES = { 9:1, 11:1 },
    STD_CONTAINS = notSupportedContains,
    OBJECT_TOSTRING = Object.prototype.toString,
    EXPORTS = {
        contains: contains,
        is: isDom,
        isView: isDefaultView,
        eachPreorder: preOrderTraverse,
        eachPostorder: postOrderTraverse,
        eachLevel: levelTraverse,
        documentViewAccess: 'defaultView',
        select: notSupportedQuerySelector,
        
        add: add,
        remove: remove,
        find: find
    };
    
var DOM_INFO;

/**
 * node contains...
 */
function contains(ancestor, descendant) {
    var str = STRING,
        is = isDom;
    
    if (!is(ancestor, 1, 9, 11)) {
        throw new Error(str.ERROR_DOM);
    }
    
    if (!is(descendant) ||
        (descendant.nodeType in INVALID_DESCENDANT_NODE_TYPES)) {
        throw new Error(str.ERROR_DOM);
    }
    
    switch (ancestor.nodeType) {
    case 9:
        ancestor = ancestor.documentElement;
        break;
    case 11:
        ancestor = ancestor.firstChild;
        break;
    }

    return STD_CONTAINS(ancestor, descendant);
    
}

function notSupportedContains() {
    throw new Error(STRING.ERROR_NS_POSITION);
}

function w3cContains(ancestor, descendant) {
    return (ancestor.compareDocumentPosition(descendant) & 16) > 0;
}

function ieContains(ancestor, descendant) {
    return ancestor.contains(descendant);
}

/**
 * DOM manipulaton
 */

function add(element, config, before) {
    var tagName, toInsert;
    
    if (!isDom(element, 1, 11)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    tagName = getTagNameFromConfig(config);
    if (!tagName) {
        throw new Error(ERROR_INVALID_ELEMENT_CONFIG);
    }
    
    toInsert = config;
    
    if (OBJECT_TOSTRING.call(config) === OBJECT_TYPE) {
        toInsert = element.ownerDocument.createElement(tagName);
        applyConfigToElement(toInsert, config);
    }
    
    if (!isDom(toInsert)) {
        throw new Error(ERROR_INVALID_ELEMENT_CONFIG);
    }
    
    element.insertBefore(toInsert, findChild(element, before));
    
    return toInsert;
    
}

function remove(element) {
    var parentNode;
    if (!isDom(element, 1, 3, 4, 7, 8)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    parentNode = element.parentNode;
    if (parentNode) {
        parentNode.removeChild(element);
    }
    parentNode = null;
    return element;
}

function find(element, node) {
    if (!isDom(element, 1, 11)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    return findChild(element, node, 1);
}

function getTagNameFromConfig(config) {
    if (OBJECT_TOSTRING.call(config) === OBJECT_TYPE) {
        config = config.tagName;
    }
    
    return config && typeof config === 'string' ?
                                        config : false;
}

function applyConfigToElement(element, config) {
    var hasOwn = Object.prototype.hasOwnProperty,
        toString = OBJECT_TOSTRING,
        objectType = OBJECT_TYPE,
        string = 'string';
    var name, value, item, itemName;
    
    if (toString.call(config) === objectType) {
        main: for (name in config) {
            if (hasOwn.call(name, config)) {
                value = config[name];
                
                switch (name) {
                case 'tagName': continue main;
                case 'class':
                    if (typeof value !== string) {
                        continue main;
                    }
                    name = 'className';
                    break;
                
                case 'for':
                    if (typeof value !== string) {
                        continue main;
                    }
                    name = 'htmlFor';
                    break;
                
                case 'style':
                    item = element.style;
                    if (typeof value === string) {
                        item.cssText = value;
                    }
                    else if (toString.call(value) === objectType) {
                        for (itemName in value) {
                            if (hasOwn.call(value, itemName)) {
                                item[itemName] = value[itemName];
                            }
                        }
                    }
                    continue main;
                }
                element[name] = value;
            }
        }
        item = null;
    }
}

function findChild(element, node, nodeType) {
    var number = 'number',
        is = isFinite;
    var index, counter, any;
    
    if (isDom(node, 1, 3, 4, 7, 8) && node.parentNode === element) {
        return node;
    }
    else if (typeof node === number && is(node) && node > -1) {
        index = node;
        counter = -1;
        any = typeof nodeType !== number || !is(nodeType);
        node = element.firstChild;
        for (; node; node = node.nextSibling) {
            if (any || nodeType === node.nodeType) {
                counter++;
            }
            if (counter === index) {
                return node;
            }
        }
    }
    return null;
}

/**
 * DOM select
 */
function noArrayQuerySelectorAll(dom, selector) {
    var list, c, l, result;
    
    if (!isDom(dom, 9, 1)) {
        throw new Error(ERROR_INVALID_DOM_NODE);
    }
    
    if (!selector || typeof selector !== "string") {
        throw new Error(ERROR_INVALID_CSS_SELECTOR);
    }
    
    list = dom.querySelectorAll(selector);
    c = -1;
    l = list.length;
    result = new Array(l);
    for (; l--;) {
        result[++c] = list[c];
    }
    list = null;
    return result;
}

function toArrayQuerySelectorAll(dom, selector) {
    if (!isDom(dom, 9, 1)) {
        throw new Error(ERROR_INVALID_DOM_NODE);
    }
    
    if (!selector || typeof selector !== "string") {
        throw new Error(ERROR_INVALID_CSS_SELECTOR);
    }

    return Array.prototype.slice.call(dom.querySelectorAll(selector));
}

function notSupportedQuerySelector() {
    throw new Error(STRING.ERROR_NS_SELQUERY);
}

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
function isDom(node) {
    var is = isFinite,
        number = 'number';
    var type, c, len, items, match, matched;
    
    if (node && typeof node === 'object') {
        type = node.nodeType;
        if (typeof type === number && is(type)) {
            items = arguments;
            len = Math.max(items.length - 1, 0);
            matched = !len;
            for (c = 0; len--;) {
                match = items[++c];
                if (typeof match === number && is(match)) {
                    if (type === match) {
                        return true;
                    }
                }
            }
            return matched;
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

/**
 * Initialize
 */

DOM_INFO = DETECTED && DETECTED.dom;
if (DOM_INFO) {
    STD_CONTAINS = DOM_INFO.compare ?
                            w3cContains :
                            DOM_INFO.contains ?
                                ieContains :
                                notSupportedContains;
    
    if (DOM_INFO.querySelectorAll) {
        EXPORTS.select = DOM_INFO.listToArray ?
                                toArrayQuerySelectorAll :
                                noArrayQuerySelectorAll;
    }
}


module.exports = EXPORTS.chain = EXPORTS;
