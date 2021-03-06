'use strict';

import {
            string,
            number,
            object,
            method,
            array,
            each,
            contains as hasProperty,
            createRegistry
        } from "libcore";

import { get as getModule } from "./chain.js";

import DETECTED from "./detect.js";

import {
            ERROR,
            xmlEncode
        } from "./string.js";

import {
            purge,
            on
        } from "./event.js";



var ORDER_TYPE_PREORDER = 1,
    ORDER_TYPE_POSTORDER = 2,
    ORDER_TYPE_LEVELORDER = 3,
    CSS_SELECT = notSupportedQuerySelector,

    ERROR_INVALID_DOM = ERROR[1101],
    ERROR_INVALID_DOM_NODE = ERROR[1103],
    ERROR_INVALID_DOM_NODES = ERROR[1105],
    ERROR_INVALID_CSS_SELECTOR = ERROR[1111],
    ERROR_INVALID_CALLBACK = ERROR[1112],
    ERROR_INVALID_ELEMENT_CONFIG = ERROR[1121],
    ERROR_INVALID_DESTROY = ERROR[1002],
    
    ALLOW_DESCENDANT_NODE_TYPES = {
        // CDATA_SECTION_NODE
        4: {
            1: 1,
            11: 1
        },
        // COMMENT_NODE
        8: {
            1: 1,
            11: 1
        },
        // DOCUMENT_FRAGMENT_NODE
        //11: [],
        // DOCUMENT_NODE
        //9: [],
        // ELEMENT_NODE
        1: {
            1: 1,
            9: 1,
            11: 1
        },
        // PROCESSING_INSTRUCTION_NODE
        7: {
            1: 1,
            11: 1
        },
        // TEXT_NODE
        3: {
            1: 1,
            11: 1
        }
    },
    NORMALIZED_CONTAINS = notSupportedContains,
    DOM_ATTRIBUTE_RE = /(^\_|[^a-zA-Z\_])/,
    DOM_ATTRIBUTE_LIST = [
        'nodeType',
        'nodeValue',
        'ownerDocument',
        'tagName',
        'attributes',
        'parentNode',
        'childNodes',
        'firstChild',
        'lastChild',
        'previousSibling',
        'nextSibling',
        'sourceIndex',
        'type'
    ],
    EVENT_ATTRIBUTE_RE = /^on(\-?[a-zA-Z].+)?$/,
    MANIPULATION_HELPERS = createRegistry();

var DOM_INFO;



/**
 * node contains...
 */


function notSupportedContains() {
    throw new Error(ERROR[2004]);
}

function w3cContains(ancestor, descendant) {
    return (ancestor.compareDocumentPosition(descendant) & 16) > 0;
}

function ieContains(ancestor, descendant) {
    return ancestor.contains(descendant);
}

/**
 * DOM Manipulation helper
 */
function registerDomHelper(name, handler) {
    if (!string(name)) {
        throw new Error(ERROR[1001]);
    }

    if (!method(handler)) {
        throw new Error(ERROR[1011]);
    }

    MANIPULATION_HELPERS.set(name, handler);

    return getModule();
}

function purgeEventsFrom(element) {
    purge(element);
}



function getTagNameFromConfig(config) {
    if (object(config)) {
        config = 'tagName' in config ?
                    config.tagName :
                    'nodeName' in config ?
                        config.nodeName :
                        'tag' in config ?
                            config.tag : false;
    }

    return string(config) ? config : false;
}


function applyAttributeToElement(value, name) {
    /* jshint validthis:true */
    var element = this,
        helper = MANIPULATION_HELPERS;
    var listen;

    // rename attributes
    switch (name) {
    case 'class':
        name = 'className';
        break;

    case 'for':
        name = 'htmlFor';
        break;
    }

    if (EVENT_ATTRIBUTE_RE.test(name)) {
        listen = name.substring(name.charAt(2) === '-' ? 3 : 2, name.length);

        if (listen === 'on' && object(value)) {
            each(value, applyEventAttribute, element);
        }
        else {
            applyEventAttribute.call(element, value, listen);
        }
    }
    else if (helper.exists(name)) {
        helper.get(name)(element, value);
    }
    else if (DOM_ATTRIBUTE_RE.test(name) ||
            DOM_ATTRIBUTE_LIST.indexOf(name) !== -1) {
        element.setAttribute(name, value);
    }
    else {
        element[name] = value;
    }

    element = null;

}

function applyEventAttribute(handler, name) {
    /* jshint validthis:true */
    var element = this;

    if (method(handler)) {
        on(element, name, handler);
    }

    element = null;
}

function applyConfigToElement(element, config, usedFragment) {
    var hasOwn = hasProperty,
        isObject= object,
        me = applyConfigToElement,
        resolveTagName = getTagNameFromConfig,
        applyAttribute = applyAttributeToElement,
        htmlEncodeChild = false,
        childNodes = null;

    var name, value, item, c, l, fragment, doc, created;

    if (isObject(config)) {
        childNodes = null;

        // apply attributes
        main: for (name in config) {
            if (hasOwn(config, name)) {
                value = config[name];

                // apply non-attributes if found
                switch (name) {
                case 'tagName':
                case 'nodeName':
                case 'tag':
                    continue main;

                case 'text':
                case 'childText':
                case 'innerText':
                    htmlEncodeChild = true;

                /* falls through */
                case 'childNodes':
                case 'innerHTML':
                case 'html':
                    childNodes = value;
                    continue main;

                case 'attributes':
                    if (isObject(value)) {
                        each(value, applyAttribute, element);
                    }
                    continue;
                }

                applyAttribute.call(element, value, name);

            }
        }

        // apply childNodes
        if (string(childNodes)) {

            // convert
            if (htmlEncodeChild) {
                childNodes = xmlEncode(childNodes);
            }

            element.innerHTML = childNodes;
        }

        // fragment
        else if (!htmlEncodeChild) {

            if (isObject(childNodes)) {
                childNodes = [childNodes];
            }

            if (array(childNodes)) {
                doc = element.ownerDocument;
                fragment = usedFragment === true ?
                                element :
                                doc.createDocumentFragment();

                for (c = -1, l = childNodes.length; l--;) {
                    item = childNodes[++c];

                    if (isObject(item)) {
                        created = doc.createElement(
                                        resolveTagName(item) || 'div');
                        // configure
                        me(created, item, true);
                        fragment.appendChild(created);
                    }
                }

                if (fragment !== element) {
                    element.appendChild(fragment);
                }

                doc = fragment = created = null;
            }
        }
        item = null;
    }
}

function findChild(element, node, nodeType) {
    var isNumber = number;
    var index, counter, any;

    if (node === null ||
        (is(node, 1, 3, 4, 7, 8) && node.parentNode === element)) {

        return node;

    }
    else if (isNumber(node) && node > -1) {
        index = node;
        counter = -1;
        any = !isNumber(nodeType);
        node = element.firstChild;
        for (; node; node = node.nextSibling) {
            if (any || nodeType === node.nodeType) {
                counter++;
            }
            if (counter === index) {
                return node;
            }
        }
        return null;
    }
    
    
    return false;
}

function hasParent(child, parent) {
    for (; child; child = child.parentNode) {
        if (child === parent) {
            return true;
        }
    }
    return false;
}

function resolveCreatedNode(node) {
    var item, result, len;

    if (node.nodeType === 11) {
        item = node.firstChild;
        result = [];
        len = 0;
        for (; item; item = item.nextSibling) {
            result[len++] = item;
        }
        item = null;
        return result;
    }
    return node;
}

/**
 * DOM select
 */
function noArrayQuerySelectorAll(dom, selector) {
    var list, c, l, result;

    if (!is(dom, 9, 1)) {
        throw new Error(ERROR_INVALID_DOM_NODE);
    }

    if (!string(selector)) {
        throw new Error(ERROR_INVALID_CSS_SELECTOR);
    }

    list = dom.querySelectorAll(selector);
    c = -1;
    (result = []).length = l = list.length;

    for (; l--;) {
        result[++c] = list[c];
    }
    list = null;
    return result;
}

function toArrayQuerySelectorAll(dom, selector) {
    if (!is(dom, 9, 1)) {
        throw new Error(ERROR_INVALID_DOM_NODE);
    }

    if (!string(selector)) {
        throw new Error(ERROR_INVALID_CSS_SELECTOR);
    }

    return Array.prototype.slice.call(dom.querySelectorAll(selector));
}

function notSupportedQuerySelector() {
    throw new Error(ERROR[2003]);
}

function orderTraverse(element, callback, context, orderType, includeRoot) {
    var depth = 0,
        isPostOrder = 0;
    var queue, last, node, current;

    if (typeof context === 'undefined') {
        context = null;
    }

    includeRoot = includeRoot !== false;

    switch (orderType) {
    case ORDER_TYPE_LEVELORDER:

        queue = last = {
                    node: element,
                    next: null
                };

        for (; queue; queue = queue.next) {

            node = queue.node;
            queue.node = null;

            // iterate siblings
            for (; node; node = node.nextSibling) {

                current = node.firstChild;
                if ((includeRoot || 0 !== depth) &&
                    callback.call(context, current) === false) {
                    break;
                }

                // insert
                if (current) {
                    depth++;
                    last.next = { node: current, next: null };
                    last = last.next;
                }
            }
        }
        break;
    case ORDER_TYPE_POSTORDER:
        isPostOrder = 1;

    /* falls through */
    case ORDER_TYPE_PREORDER:

        main: for (current = element; current;) {

            // process pre-order
            if ((includeRoot || 0 !== depth) &&
                !isPostOrder && current.nodeType === 1 &&
                callback.call(context, current) === false) {
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
                if ((includeRoot || 0 !== depth) &&
                    isPostOrder && current.nodeType === 1 &&
                    callback.call(context, current) === false) {
                    break;
                }

                node = current.nextSibling;

                for (; !node && depth-- && current;) {
                    current = current.parentNode;

                    // process post-order
                    if ((includeRoot || 0 !== depth) &&
                        isPostOrder && current.nodeType === 1 &&
                        callback.call(context, current) === false) {
                        break main;
                    }

                    node = current.nextSibling;
                }
            }
            current = node;
        }
    }

    last = queue = node = current = null;


    return getModule();
}



/**
 * Initialize
 */

DOM_INFO = DETECTED && DETECTED.dom;
if (DOM_INFO) {
    NORMALIZED_CONTAINS = DOM_INFO.compare ?
                            w3cContains :
                            DOM_INFO.contains ?
                                ieContains :
                                notSupportedContains;

    if (DOM_INFO.querySelectorAll) {
        CSS_SELECT = DOM_INFO.listToArray ?
                            toArrayQuerySelectorAll :
                            noArrayQuerySelectorAll;
    }
}

export {
    registerDomHelper as helper,
    CSS_SELECT as select
};

export let
    documentViewAccess = 'defaultView';

/**
 * is node
 */
export
    function is(node) {
        var isNumber = number;

        var type, c, len, items, match, matched;

        if (node && typeof node === 'object') {

            type = node.nodeType;

            if (isNumber(type)) {

                items = arguments;
                len = Math.max(items.length - 1, 0);
                matched = !len;

                for (c = 0; len--;) {
                    match = items[++c];
                    if (type === match) {
                        return true;
                    }
                }

                return matched;
            }
        }

        return false;
    }

export
    function isView(defaultView) {
        var type = typeof defaultView;

        return !!defaultView &&
                (type === 'object' || type === 'function') &&
                defaultView.self === defaultView.window &&
                !!defaultView.document;
    }

export
    function contains(ancestor, descendant) {
        var elementErrorString = ERROR[1102],
            allowList = ALLOW_DESCENDANT_NODE_TYPES,
            isDom = is;
        var ancestorType, descendantType;
        
        if (!isDom(ancestor) || !isDom(descendant)) {
            throw new Error(elementErrorString);
        }
        
        // primary checking if in allow list
        ancestorType = ancestor.nodeType;
        descendantType = descendant.nodeType;
        if (!(descendantType in allowList) ||
            !(ancestorType in allowList[descendantType])) {
            return false;
        }
        
        // normalize ancestory
        switch (ancestorType) {
        case 9:
            ancestor = ancestor.documentElement;
            if (ancestor === descendant) {
                return true;
            }
            break;
        // for document fragment, it requires manual checking if it has a
        // fragment ancestor node.
        case 11:
            return hasParent(descendant, ancestor);
        }

        return NORMALIZED_CONTAINS(ancestor, descendant);

    }

/**
 * DOM manipulaton
 */
export
    function add(element, config, before) {
        var toInsert = null,
            invalidConfig = ERROR_INVALID_ELEMENT_CONFIG,
            isDom = is;
        var tagName, inserted;

        if (!isDom(element, 1, 11)) {
            throw new Error(ERROR_INVALID_DOM);
        }

        if (isDom(config, 1, 3, 4, 7, 8, 11)) {
            toInsert = config;
            if (config.nodeType !== 11 && contains(config, element)) {
                throw new Error(invalidConfig);
            }
        }
        else if (object(config)) {
            tagName = getTagNameFromConfig(config);
            if (!tagName) {
                throw new Error(invalidConfig);
            }
            toInsert = element.ownerDocument.createElement(tagName);
            applyConfigToElement(toInsert, config);
        }
        else {
            throw new Error(invalidConfig);
        }

        // validate [before]
        if (arguments.length > 2) {
            before = findChild(element, before);
            if (before === false) {
                throw new Error(ERROR[1108]);
            }
        }

        inserted = resolveCreatedNode(toInsert);
        element.insertBefore(toInsert, before || null);
        toInsert = null;
        return inserted;

    }

export
    function remove(node, destroy) {
        var parentNode;
        if (!is(node, 1, 3, 4, 7, 8)) {
            throw new Error(ERROR_INVALID_DOM_NODE);
        }

        // unset child events by default
        if (arguments.length > 1) {
            if (typeof destroy !== 'boolean') {
                throw new Error(ERROR_INVALID_DESTROY);
            }

            if (node.nodeType === 1 && destroy) {
                eachNodePostorder(node, purgeEventsFrom);
            }
        }

        parentNode = node.parentNode;
        if (parentNode) {
            parentNode.removeChild(node);
        }
        parentNode = null;
        return node;
    }

export
    function move(nodes, element, before) {
        var isDom = is,
            insert = add,
            fragment = null;
        var c, l, newChild, inserted;

        // if (isDom(nodes, 1, 3, 4, 7, 8, 11)) {
        //     fragment = nodes;
        // }
        // else if (!array(nodes)) {
            
        // }

        if (array(nodes)) {
            fragment = element.ownerDocument.createDocumentFragment();
            for (c = -1, l = nodes.length; l--;) {
                newChild = nodes[++c];
                if (!isDom(newChild, 1, 3, 4, 7, 8) || newChild === element) {
                    throw new Error(ERROR_INVALID_DOM_NODES);
                }
                fragment.appendChild(newChild);
            }
            nodes = fragment;
        }
        else if (!isDom(nodes, 1, 3, 4, 7, 8, 11)) {
            throw new Error(ERROR_INVALID_DOM_NODES);
        }

        inserted = arguments.length > 2 ?
                    insert(element, nodes, before) :
                    insert(element, nodes);

        fragment = newChild = null;

        return inserted;
    }

export
    function replace(node, config, destroy) {
        var toInsert = null,
            invalidConfig = ERROR_INVALID_ELEMENT_CONFIG,
            isDom = is;
        var tagName, inserted;

        if (!isDom(node, 1, 3, 4, 7, 8) || !node.parentNode) {
            throw new Error(ERROR_INVALID_DOM_NODE);
        }

        if (isDom(config, 1, 3, 4, 7, 8, 11)) {
            toInsert = config;
            if (config.nodeType !== 11 && contains(config, node)) {
                throw new Error(invalidConfig);
            }
        }
        else if (object(config)) {
            tagName = getTagNameFromConfig(config);
            if (!tagName) {
                throw new Error(invalidConfig);
            }
            toInsert = node.ownerDocument.createElement(tagName);
            applyConfigToElement(toInsert, config);
        }
        else {
            throw new Error(invalidConfig);
        }

        // remove events before replacing it only if mandated
        if (arguments.length > 2) {
            if (typeof destroy !== 'boolean') {
                throw new Error(ERROR_INVALID_DESTROY);
            }

            if (node.nodeType === 1 && destroy) {
                eachNodePostorder(node, purgeEventsFrom);
            }
        }

        inserted = resolveCreatedNode(toInsert);
        node.parentNode.replaceChild(toInsert, node);
        toInsert = null;

        return inserted;

    }

export
    function find(element, node) {
        if (!is(element, 1, 11)) {
            throw new Error(ERROR_INVALID_DOM);
        }
        return findChild(element, node, 1);
    }

/**
 * DOM Tree walk
 */
export
    function eachNodePreorder(element, callback, context, includeRoot) {
        if (!is(element, 1)) {
            throw new Error(ERROR_INVALID_DOM);
        }

        if (!method(callback)) {
            throw new Error(ERROR_INVALID_CALLBACK);
        }

        return orderTraverse(element,
                            callback,
                            context,
                            ORDER_TYPE_PREORDER,
                            includeRoot !== false);
    }

export
    function eachNodePostorder(element, callback, context, includeRoot) {

        if (!is(element, 1)) {
            throw new Error(ERROR_INVALID_DOM);
        }

        if (!method(callback)) {
            throw new Error(ERROR_INVALID_CALLBACK);
        }

        return orderTraverse(element,
                            callback,
                            context,
                            ORDER_TYPE_POSTORDER,
                            includeRoot !== false);
    }

export
    function eachNodeLevelorder(element, callback, context, includeRoot) {

        if (!is(element, 1)) {
            throw new Error(ERROR_INVALID_DOM);
        }

        if (!method(callback)) {
            throw new Error(ERROR_INVALID_CALLBACK);
        }
        
        return orderTraverse(element,
                            callback,
                            context,
                            ORDER_TYPE_LEVELORDER,
                            includeRoot !== false);
    }
