(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require(undefined));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = typeof exports === 'object' ? factory(require(undefined)) : factory(root["libcore"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {


var CORE = __webpack_require__(0),
    SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/,
    STYLIZE_RE = /^([Mm]oz|[Ww]ebkit|[Mm]s|[oO])[A-Z]/,
    HTML_ESCAPE_CHARS_RE = /[^\u0021-\u007e]|[\u003e\u003c\&\"\']/g,
    TEXTAREA = global.document.createElement('textarea'),
    EXPORTS = {
        camelize: CORE.camelize,
        stylize: stylize,
        addWord: addWord,
        removeWord: removeWord,
        
        xmlEncode: htmlescape,
        xmlDecode: htmlunescape,
        
        1001: "Invalid [name] parameter.",
        1011: "Invalid [handler] parameter.",
    
        1101: "Invalid DOM [element] parameter.",
        1102: "Invalid [dom] Object parameter.",
        1103: "Invalid DOM [node] parameter.",
        1104: "Invalid DOM [document] parameter.",
        
        1111: "Invalid CSS [selector] parameter.",
        1112: "Invalid tree traverse [callback] parameter.",
        
        1121: "Invalid DOM Element [config] parameter.",
        
        1131: "Invalid [observable] parameter.",
        1132: "Invalid Event [type] parameter.",
        1133: "Invalid Event [handler] parameter.",
        
        
        1141: "Invalid [style] Rule parameter.",
        //1142: "Invalid Colorset [type] parameter.",
        //1143: "Invalid [colorValue] integer parameter.",
        
        1151: "Invalid Animation [callback] parameter.",
        1152: "Invalid Animation [displacements] parameter.",
        1153: "Invalid Animation [type] parameter.",
        1154: "Invalid Animation [duration] parameter.",
        
        2001: "Style Attribute manipulation is not supported",
        2002: "Computed style is not supported by this browser.",
        2003 : "CSS Selector query form DOM is not supported.",
        2004: "DOM position comparison is not supported.",
        2005: "DOM selection not supported.",
        2006: "CSS Opacity is not supported by this browser"
        
        
        
    };

function stylize(str) {
    str = CORE.camelize(str);
    return STYLIZE_RE.test(str) ?
                str.charAt(0).toUpperCase() + str.substring(1, str.length) :
                str;
}

function addWord(str, items) {
    var isString = CORE.string,
        c = -1,
        l = items.length;
    var cl, name;
    
    str = str.split(SEPARATE_RE);
    cl = str.length;
    for (; l--;) {
        name = items[++c];
        if (isString(name) && str.indexOf(name) === -1) {
            str[cl++] = name;
        }
    }
    
    return str.join(' ');
}

function removeWord(str, items) {
    var c = -1,
        l = items.length;
    var cl, total, name;
    
    str = str.split(SEPARATE_RE);
    total = str.length;
    
    for (; l--;) {
        name = items[++c];
        for (cl = total; cl--;) {
            if (name === str[cl]) {
                str.splice(cl, 1);
                total--;
            }
        }
    }
    
    return str.join(' ');    
}

function htmlunescape(str) {
    var textarea = TEXTAREA;
    var value = '';
    if (textarea) {
        textarea.innerHTML = str;
        value = textarea.value;
    }
    textarea = null;
    return value;
}

function htmlescape(str) {
    return str.replace(HTML_ESCAPE_CHARS_RE, htmlescapeCallback);
}

function htmlescapeCallback(chr) {
    var code = chr.charCodeAt(0).toString(16);
    var value;
    switch (code) {
    case '26': value = 'amp';
        break;
    case '22': value = 'quot';
        break;
    case '27': value = 'apos';
        break;
    case '3C':
    case '3c': value = 'lt';
        break;
    case '3E':
    case '3e': value = 'gt';
        break;
    default:
        value = '#x' + code;
    }
    return '&' + value + ';';
}


// register destructor
function onDestroy() {
    TEXTAREA = null;
}


CORE.register("libdom.event.global-destroy", onDestroy);

module.exports = EXPORTS;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var browser = __webpack_require__(11),
    EXPORTS = false;
    

if (browser) {
    EXPORTS = {
        browser: browser,
        event: __webpack_require__(21),
        dom: __webpack_require__(20),
        css: __webpack_require__(18),
        dimension: __webpack_require__(19),
        selection: __webpack_require__(22)
    };
}

module.exports = EXPORTS;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CORE = __webpack_require__(0),
    DETECTED = __webpack_require__(3),
    EVENT = __webpack_require__(12),
    STRING = __webpack_require__(2),
    
    ORDER_TYPE_PREORDER = 1,
    ORDER_TYPE_POSTORDER = 2,
    ORDER_TYPE_LEVELORDER = 3,
    
    ERROR_INVALID_DOM = STRING[1101],
    ERROR_INVALID_DOM_NODE = STRING[1103],
    ERROR_INVALID_CSS_SELECTOR = STRING[1111],
    ERROR_INVALID_CALLBACK = STRING[1112],
    ERROR_INVALID_ELEMENT_CONFIG = STRING[1121],
    INVALID_DESCENDANT_NODE_TYPES = { 9:1, 11:1 },
    STD_CONTAINS = notSupportedContains,
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
    MANIPULATION_HELPERS = CORE.createRegistry(),
    EXPORTS = {
        contains: contains,
        is: isDom,
        isView: isDefaultView,
        eachPreorder: preOrderTraverse,
        eachPostorder: postOrderTraverse,
        eachLevel: levelTraverse,
        documentViewAccess: 'defaultView',
        select: notSupportedQuerySelector,
        
        helper: registerDomHelper,
        
        add: add,
        replace: replace,
        move: move,
        remove: remove,
        find: find
    };
    
var DOM_INFO;



/**
 * node contains...
 */
function contains(ancestor, descendant) {
    var elementErrorString = STRING[1102],
        is = isDom;
    
    if (!is(ancestor, 1, 9, 11)) {
        throw new Error(elementErrorString);
    }
    
    if (!is(descendant) ||
        (descendant.nodeType in INVALID_DESCENDANT_NODE_TYPES)) {
        throw new Error(elementErrorString);
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
    throw new Error(STRING[2004]);
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
    var C = CORE;
    if (!C.string(name)) {
        throw new Error(STRING[1001]);
    }
    
    if (!C.method(handler)) {
        throw new Error(STRING[1011]);
    }
    
    MANIPULATION_HELPERS.set(name, handler);
    
    return EXPORTS.chain;
}

/**
 * DOM manipulaton
 */

function add(element, config, before) {
    var toInsert = null,
        invalidConfig = ERROR_INVALID_ELEMENT_CONFIG,
        is = isDom;
    var tagName;
    
    if (!isDom(element, 1, 11)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    if (is(config)) {
        toInsert = config;
    }
    else if (CORE.object(config)) {
        tagName = getTagNameFromConfig(config);
        if (!tagName) {
            throw new Error(invalidConfig);
        }
        toInsert = element.ownerDocument.createElement(tagName);
        applyConfigToElement(toInsert, config);
    }
    
    if (!is(toInsert, 1, 3, 4, 7, 8)) {
        throw new Error(invalidConfig);
    }
    
    element.insertBefore(toInsert, findChild(element, before));
    
    return toInsert;
    
}

function remove(node, destroy) {
    var parentNode;
    if (!isDom(node, 1, 3, 4, 7, 8)) {
        throw new Error(ERROR_INVALID_DOM_NODE);
    }
    
    // unset child events by default
    if (node.nodeType === 1 && destroy !== false) {
        postOrderTraverse(node, purgeEventsFrom);
    }
    
    parentNode = node.parentNode;
    if (parentNode) {
        parentNode.removeChild(node);
    }
    parentNode = null;
    return node;
}

function move(nodes, element) {
    var is = isDom,
        invalidDom = ERROR_INVALID_DOM_NODE,
        created = false;
    var c, l, fragment, newChild;
    
    if (!is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    if (is(nodes, 1, 3, 4, 7, 8)) {
        nodes = [nodes];
        created = true;
    }
    
    if (!CORE.array(nodes)) {
        throw new Error(invalidDom);
    }
    
    fragment = element.ownerDocument.createDocumentFragment();
    for (c = -1, l = nodes.length; l--;) {
        newChild = nodes[++c];
        if (is(newChild, 1, 3, 4, 7, 8)) {
            fragment.appendChild(newChild);
        }
    }
    element.appendChild(fragment);
    
    newChild = null;
    
    if (created) {
        nodes.splice(0, nodes.length);
    }
    
    fragment = null;
    
    return element;
}

function replace(node, config, destroy) {
    var toInsert = null,
        invalidConfig = ERROR_INVALID_ELEMENT_CONFIG,
        is = isDom;
    var tagName;
    
    if (!is(node, 1, 3, 4, 7, 8) || !node.parentNode) {
        throw new Error(ERROR_INVALID_DOM_NODE);
    }
    
    if (is(config)) {
        toInsert = config;
    }
    else if (CORE.object(config)) {
        tagName = getTagNameFromConfig(config);
        if (!tagName) {
            throw new Error(invalidConfig);
        }
        toInsert = node.ownerDocument.createElement(tagName);
        applyConfigToElement(toInsert, config);
    }
    
    if (!is(toInsert, 1, 3, 4, 7, 8)) {
        throw new Error(invalidConfig);
    }
    
    // remove events before replacing it only if mandated
    if (destroy === true && node.nodeType === 1) {
        postOrderTraverse(node, purgeEventsFrom);
    }
    
    node.parentNode.replaceChild(toInsert, node);
    
    return toInsert;
}

function purgeEventsFrom(element) {
    EVENT.purge(element);
}

function find(element, node) {
    if (!isDom(element, 1, 11)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    return findChild(element, node, 1);
}

function getTagNameFromConfig(config) {
    var C = CORE;
    
    if (C.object(config)) {
        config = 'tagName' in config ?
                    config.tagName :
                    'nodeName' in config ?
                        config.nodeName :
                        'tag' in config ?
                            config.tag : false;
    }
    
    return C.string(config) ? config : false;
}


function applyAttributeToElement(value, name) {
    /* jshint validthis:true */
    var element = this,
        C = CORE,
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
        
        if (listen === 'on' && C.object(value)) {
            C.each(value, applyEventAttribute, element);
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
    
    if (CORE.method(handler)) {
        EVENT.on(element, name, handler);
    }
    
    element = null;
}

function applyConfigToElement(element, config, usedFragment) {
    var C = CORE,
        hasOwn = C.contains,
        isObject= C.object,
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
                        C.each(value, applyAttribute, element);
                    }
                    continue;
                }
                
                applyAttribute.call(element, value, name);

            }
        }
        
        // apply childNodes
        if (C.string(childNodes)) {
            
            // convert
            if (htmlEncodeChild) {
                childNodes = STRING.xmlEncode(childNodes);
            }

            element.innerHTML = childNodes;
        }
        
        // fragment
        else if (!htmlEncodeChild) {
            
            if (isObject(childNodes)) {
                childNodes = [childNodes];
            }
            
            if (C.array(childNodes)) {
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
    var isNumber = CORE.number;
    var index, counter, any;
    
    if (isDom(node, 1, 3, 4, 7, 8) && node.parentNode === element) {
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
    
    if (!CORE.string(selector)) {
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
    if (!isDom(dom, 9, 1)) {
        throw new Error(ERROR_INVALID_DOM_NODE);
    }
    
    if (!CORE.string(selector)) {
        throw new Error(ERROR_INVALID_CSS_SELECTOR);
    }

    return Array.prototype.slice.call(dom.querySelectorAll(selector));
}

function notSupportedQuerySelector() {
    throw new Error(STRING[2003]);
}

function preOrderTraverse(element, callback, context, includeRoot) {
    
    return orderTraverse(element,
                        callback,
                        context,
                        ORDER_TYPE_PREORDER,
                        includeRoot !== false);
}

function postOrderTraverse(element, callback, context, includeRoot) {

    return orderTraverse(element,
                        callback,
                        context,
                        ORDER_TYPE_POSTORDER,
                        includeRoot !== false);
}


function levelTraverse(element, callback, context, includeRoot) {
    
    return orderTraverse(element,
                        callback,
                        context,
                        ORDER_TYPE_LEVELORDER,
                        includeRoot !== false);
}


function orderTraverse(element, callback, context, orderType, includeRoot) {
    var depth = 0,
        isPostOrder = 0;
    var queue, last, node, current;
    
    if (!isDom(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    if (!CORE.method(callback)) {
        throw new Error(ERROR_INVALID_CALLBACK);
    }
    
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
    
    
    return EXPORTS.chain;
}

/**
 * is node
 */
function isDom(node) {
    var isNumber = CORE.number;
    
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CORE = __webpack_require__(0),
    isString = CORE.string,
    ERROR_SUBJECT = 'Invalid [subject] parameter.',
    FORMAT = __webpack_require__(6),
    COLOR_RE =
    /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/,
    NUMBER_RE = /^[0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*$/,
    REMOVE_SPACES = /[ \r\n\t\s]+/g,
    TO_COLOR = {
        rgb: __webpack_require__(17),
        rgba: __webpack_require__(7),
        hsl: __webpack_require__(16),
        hsla: __webpack_require__(10),
        hex: __webpack_require__(15),
    },
    EXPORTS = {
        parse: parse,
        parseType: parseType,
        stringify: stringify
    };

function parseType(subject) {
    
    if (!isString(subject, true)) {
        throw new Error(ERROR_SUBJECT);
    }
    
    subject = preParseValue(subject);
    if (subject) {
        return parseColorStringType(subject) || null;
    }
    return null;
}

function preParseValue(str) {
    if (typeof str === 'string') {
        str = str.replace(REMOVE_SPACES, '');
        if (COLOR_RE.test(str)) {
            return str;
        }
    }
    return null;
}


function parseColorStringType(str) {
    var list = TO_COLOR,
        m = str.match(COLOR_RE),
        type = m[1];
        
    var items, isHex, item;
    
    if (!CORE.contains(list, type)) {
        type = 'hex';
    }
    
    items = m[3];
    isHex = !items;
    
    // breakdown hex
    if (isHex) {
        items = m[2];
        
        // three digit
        if (items.length < 6) {
            item = items.charAt(2);
            items = ([items.charAt(0),
                        items.substring(0, 2),
                        items.charAt(1),
                        item,
                        item]).join('');
        }
    }
    else {
        items = items.split(',');
    }
    
    return [type, isHex, items];
    
}

function parse(subject) {
    var F = FORMAT,
        formatPercent = F.PERCENT,
        formatNumber = F.NUMBER,
        formatHex = F.HEX,
        numberRe = NUMBER_RE;
        
    var parsed, c, l, item, items, itemizer, processor, type, isHex, toProcess;
    
    if (!isString(subject, true)) {
        throw new Error(ERROR_SUBJECT);
    }
    
    subject = preParseValue(subject);
    parsed = subject && parseColorStringType(subject);
        
    if (parsed) {
        type = parsed[0];
        processor = TO_COLOR[type];
        itemizer = processor.itemize;
        
        toProcess = [];
        isHex = parsed[1];
        items = parsed[2];
        
        c = -1;
        if (isHex) {
            toProcess[3] = 100;
            l = 3;
        }
        else {
            l = items.length;
        }
        
        for (; l--;) {
            item = items[++c];
            if (isHex) {
                item = items.substring(c * 2, c * 2 + 2);
            }
            else if (!numberRe.test(item)) {
                return null;
            }
            
            toProcess[c] = itemizer(item,
                                    c,
                                    isHex ?
                                        formatHex :
                                        item.charAt(item.length -1) === '%' ?
                                            formatPercent :
                                            formatNumber);
        }
        
        // add type
        return processor.toInteger.apply(processor, toProcess);
    }
    return null;
}


function stringify(colorValue, type) {
    var list = TO_COLOR,
        C = CORE;
    
    if (!C.number(colorValue)) {
        throw new Error("Invalid [colorValue] parameter.");
    }
    
    if (arguments.length < 2) {
        type = 'hex';
    }
    else if (!isString(type)) {
        throw new Error("Invalid [type] parameter.");
    }
    
    if (!C.contains(list, type)) {
        return null;
    }
    
    colorValue = Math.round(colorValue);
    
    return list[type].toString(colorValue);
}


module.exports = EXPORTS;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EXPORTS = module.exports = {
        NUMBER: 1,
        HEX: 2,
        PERCENT: 3,
        format: convert2Number
    };


function convert2Number(value, format) {
    var parse = parseFloat,
        F = EXPORTS;
    
    switch (format) {
    case F.HEX:
        return parseInt(value, 16) || 0;
    
    case F.NUMBER:
        return parse(value) || 0;

    case F.PERCENT:
        return Math.round((parse(value) || 1) * 100);
    }
    return 0;
}



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CORE = __webpack_require__(0),
    FORMAT = __webpack_require__(6),

    BYTE = 255,
    BYTE_PERCENT = 127,
    BYTE_HUE = 511,
    
    PERCENT = 100,
    HUE = 360,
    SATURATION = PERCENT,
    LUMINOSITY = PERCENT;

// from: https://gist.github.com/mjackson/5311256
function hue2rgb(p, q, t) {
    t = (t + 1) % 1;
    switch (true) {
    case t < 1/6: return p + (q - p) * 6 * t;
    case t < 1/2: return q;
    case t < 2/3: return p + (q - p) * (2/3 - t) * 6;
    }
    return p;
}

//function itemize(value, index, format) {
//    var M = Math,
//        min = 0,
//        max = index > 2 ? PERCENT : BYTE;
//    
//    value = FORMAT.format(value, format);
//
//    return M.max(min, M.min(max, value));
//
//}

function itemize(value, index, format) {
    var M = Math,
        F = FORMAT,
        isFloat = index > 2 && format !== F.PERCENT,
        min = 0,
        max = index < 3 ?
                BYTE : PERCENT;
        
    value = F.format(value, format);
    if (isFloat) {
        value *= 100;
    }
    
    return M.max(min, M.min(max, value));

}

function toArray(integer) {
    var M = Math,
        h2r = hue2rgb,
        size = BYTE,
        psize = BYTE_PERCENT,
        h = integer & BYTE_HUE,
        s = (integer >> 9) & psize,
        l = (integer >> 16) & psize,
        a = (integer >> 23) & psize;

    var q, p;
    
    l /= LUMINOSITY;
   
    if (s === 0) {
        return [l, l, l];
    }
    
    h /= HUE;
    s /= SATURATION;
    
    q = l < 0.5 ?
            l * (1 + s) :
            l + s - l * s;
            
    p = 2 * l - q;
    
    return [M.round(h2r(p, q, h + 1/3) * size),
                M.round(h2r(p, q, h) * size),
                M.round(h2r(p, q, h - 1/3) * size),
                (a).toFixed(2)];
}

function toInteger(r, g, b, a) {
    var M = Math,
        size = BYTE,
        psize = BYTE_PERCENT;

    var max, min, h, s, l, d;
    
    r /= size;
    g /= size;
    b /= size;
    max = M.max(r, g, b);
    min = M.min(r, g, b);
    
    l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    }
    else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
    
        h /= 6;
    }
    
    if (!CORE.number(a)) {
        a = PERCENT;
    }
    
    return ((a & psize) << 23) |
            (((l * LUMINOSITY) & psize) << 16) |
            (((s * SATURATION) & psize) << 9) |
            ((h * HUE) & BYTE_HUE);
}

function toString(integer) {
    var values = toArray(integer),
        alpha = (values[3] / PERCENT);
    values[3] = parseFloat(alpha.toFixed(2));
    return 'rgba(' + values.join(',') + ')';
}


module.exports = {
    itemize: itemize,
    toArray: toArray,
    toInteger: toInteger,
    toString: toString
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var CORE = __webpack_require__(0),
    STRING = __webpack_require__(2),
    DETECTED = __webpack_require__(3),
    DOM = __webpack_require__(4),
    COLOR = __webpack_require__(5),
    
    PADDING_BOTTOM = 'paddingBottom',
    PADDING_TOP = 'paddingTop',
    PADDING_LEFT = 'paddingLeft',
    PADDING_RIGHT = 'paddingRight',
    
    OFFSET_LEFT = 'offsetLeft',
    OFFSET_TOP = 'offsetTop',
    OFFSET_WIDTH = 'offsetWidth',
    OFFSET_HEIGHT = 'offsetHeight',
    
    CLIENT_WIDTH = 'clientWidth',
    CLIENT_HEIGHT = 'clientHeight',
    
    COLOR_RE = /[Cc]olor$/,
    
    //DIMENSION_RE = /width|height|(margin|padding).*|border.+(Width|Radius)/,
    EM_OR_PERCENT_RE = /%|em/,
    CSS_MEASUREMENT_RE =
/^([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)(em|px|\%|pt|vh|vw|cm|ex|in|mm|pc|vmin)$/,
    WIDTH_RE = /width/i,
    NUMBER_RE = /\d/,
    BOX_RE = /(top|bottom|left|right|width|height)$/,
    DIMENSION_RE =
        /([Tt]op|[Bb]ottom|[Ll]eft|[Rr]ight|[wW]idth|[hH]eight|Size|Radius)$/,
    
    IE_ALPHA_OPACITY_RE = /\(opacity\=([0-9]+)\)/i,
    IE_ALPHA_OPACITY_TEMPLATE = 'alpha(opacity=$opacity)',
    IE_ALPHA_OPACITY_TEMPLATE_RE = /\$opacity/,
    
    GET_OPACITY = opacityNotSupported,
    SET_OPACITY = opacityNotSupported,
    
    SET_STYLE = styleManipulationNotSupported,
    GET_STYLE = styleManipulationNotSupported,
    
    ERROR_INVALID_DOM = STRING[1101],
    
    EXPORTS = {
        add: addClass,
        remove: removeClass,
        computedStyle: computedStyleNotSupported,
        style: applyStyle,
        unitValue: getCSSUnitValue,
        styleOpacity: opacityNotSupported,
        colorUnit: 'hex',
        boxRe: BOX_RE,
        dimensionRe: DIMENSION_RE,
            
        colorRe: COLOR_RE
    },
    SLICE = Array.prototype.slice;
    
var CSS_INFO;
    


function addClass(element) {
    var className;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    className = element.className;
    
    element.className = STRING.addWord(className, SLICE.call(arguments, 1));
    
    return EXPORTS.chain;
}

function removeClass(element) {
    var className;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    className = element.className;
    
    element.className = STRING.removeWord(className, SLICE.call(arguments, 1));
    
    return EXPORTS.chain;
}

function applyStyle(element, style, value) {
    var C = CORE,
        parse = parseCSSText,
        len = arguments.length;
        
    var context;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    // setter
    if (len > 1) {
        
        if (C.string(style)) {
            if (len > 2) {
                context = {};
                context[style] = value;
                style = context;
            }
            else {
                style = parse(style);
            }
        }
        
        if (!C.object(style)) {
            throw new Error(STRING[1141]);
        }

        //elementStyle = element.style;
        context = [element.style];
        
        CORE.each(style, onStyleElement, context, true);
        
        context = context[0] = null;
        
        return EXPORTS.chain;
    }
    
    // getter
    return parse(element.style.cssText);
    
}

function onStyleElement(value, name) {
    var C = CORE,
        isNumber = C.number(value),
        isScalar = isNumber || C.string(value),
        elementStyle = this[0],
        set = SET_STYLE,
        applied = false;
    
    name = STRING.stylize(name);
    
    // opacity
    if (name === 'opacity') {
        if (!isScalar) {
            // remove IE style opacity
            set(elementStyle, 'filter', null);
        }
        else {
            SET_OPACITY(elementStyle, value);
            applied = true;
        }
        
    }
    // dimension
    else if (isNumber && DIMENSION_RE.test(name)) {
        value = '' + value + 'px';
        
    }
    // color
    else if (isNumber && COLOR_RE.test(name)) {
        value = COLOR.stringify(value, EXPORTS.colorUnit);
    }
    
    // non-scalar value is "unset"
    if (!isScalar) {
        value = null;
    }
    
    set(elementStyle, name, value);
    
    elementStyle = null;
    
}

function parseCSSText(str) {
    var STATE_NAME = 1,
        STATE_VALUE = 2,
        state = STATE_NAME,
        c = -1,
        l = str.length,
        il = 0,
        name = [],
        result = {};
    var chr, value;
    
    for (; l--;) {
        chr = str.charAt(++c);
        
        switch (state) {
        case STATE_NAME:
            if (chr === ':') {
                name = name.join('');
                value = [];
                il = 0;
            }
            else {
                name[il++] = chr;
            }
            break;
        
        case STATE_VALUE:
            if (chr === ';' || !l) {
                result[name] = value.join('');
                name = [];
                il = 0;
            }
            else {
                value[il++] = chr;
            }
        }
    }
    
    return result;
}

function getCSSUnitValue(value) {
    var is = isFinite;
    var len;
    
    switch (typeof value) {
    case 'number':
        if (is(value)) {
            return value;
        }
        break;
    case 'string':
        len = value.length;
        if (CSS_MEASUREMENT_RE.test(value) &&
            value.substring(len - 2, len) !== 'px') {
            return value;
        }
        else if (value === 'auto' || value === 'inherit') {
            return value;
        }
        value = parseFloat(value);
        if (is(value)) {
            return value;
        }
    }
    
    if (value === null) {
        return value;
    }
    
    return false;
    
}

function styleManipulationNotSupported() {
    throw new Error(STRING[2001]);
}

/**
 * Style info
 */

function computedStyleNotSupported() {
    throw new Error(STRING[2002]);
}

function w3cGetCurrentStyle(element, list) {
    var camel = STRING.stylize,
        isString = CORE.string;
    var style, c, l, name, value, values, access;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    style = global.getComputedStyle(element);
    
    values = {};
    if (!CORE.array(list)) {
        list = SLICE.call(arguments, 1);
    }
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (isString(name)) {
            access = camel(name);
            switch (access) {
            case 'opacity':
                value = GET_OPACITY(style);
                break;
            default:
                value = style[access];
            }
            values[name] = value;
        }
    }
    
    style = null;
    
    return values;
}

function ieGetCurrentStyle(element, list) {
    var dimensionRe = DIMENSION_RE,
        C = CORE,
        boxRe = BOX_RE,
        isString = C.string,
        camel = STRING.stylize,
        getOpacity = GET_OPACITY,
        pixelSize = ieGetPixelSize;
        
    var style, c, l, name, value, access, fontSize, values, dimension;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    style = element.currentStyle;
    fontSize = false;
    dimension = false;
    values = {};
    
    if (!C.array(list)) {
        list = SLICE.call(arguments, 1);
    }
    
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (isString(name)) {
            access = camel(name);
            
            switch (true) {
            case access === 'opacity':
                value = getOpacity(style);
                break;
            
            case boxRe.test(access):
                if (!dimension) {
                    dimension = ieGetPositionStyle(element, style);
                }
                value = dimension[access] + 'px';
                break;
            
            case dimensionRe.test(access) && style[access] !== 'auto':
                if (fontSize === false) {
                    fontSize = pixelSize(element, style, 'fontSize', null);
                }
                value = pixelSize(element, style, access, fontSize) + 'px';
                break;
            
            case access === 'float':
                value = style.styleFloat;
                break;
            
            default:
                value = style[access];
            }
            
            values[name] = value;
        }
    }
    
    style = value = null;
    return values;
}


function ieGetPixelSize(element, style, property, fontSize) {
    var sizeWithSuffix = style[property],
        size = parseFloat(sizeWithSuffix),
        suffix = sizeWithSuffix.split(NUMBER_RE)[0];
    var parent;

    switch (suffix) {
    case 'in': return size * 96;
    case 'pt': return size * 96 / 72;
    case 'em': 
    case '%':
        if (!fontSize) {
            parent = element.parentElement;
            fontSize = EM_OR_PERCENT_RE.test(suffix) && parent ?
                            ieGetPixelSize(parent,
                                        parent.currentStyle,
                                        'fontSize',
                                        null) :
                            16;
            parent = null;
        }
        return suffix === 'em' ?
                    size * fontSize :
                    size / 100 * (property === 'fontSize' ?
                                    fontSize :
                                    WIDTH_RE.test(property) ?
                                        element[CLIENT_WIDTH] :
                                        element[CLIENT_HEIGHT]);

    default: return size;
    }
}


function ieGetPositionStyle(element, style) {
    var parent = element.offsetParent,
        parentStyle = parent.currentStyle,
        ieAdjust = DETECTED.browser.ieVersion < 9,
        parse = parseFloat,
        
        ptop = PADDING_TOP,
        pleft = PADDING_LEFT,
        pbottom = PADDING_BOTTOM,
        pright = PADDING_RIGHT,
        
        cwidth = CLIENT_WIDTH,
        cheight = CLIENT_HEIGHT,
        
        left = element[OFFSET_LEFT],
        top = element[OFFSET_TOP],
        right = parent[cwidth] - element[OFFSET_WIDTH],
        bottom = parent[cheight] - element[OFFSET_HEIGHT],
        width = element[cwidth],
        height = element[cheight];
    var node, nodeStyle;
        
    switch (style.position) {
    case 'relative':
        left -= (parse(parentStyle[pleft]) || 0);
        top -= (parse(parentStyle[ptop]) || 0);
        
        if (ieAdjust) {
            node = element.parentNode;
            
            for (; node !== parent; node = node.parentNode) {
                nodeStyle = node.currentStyle;
                if (nodeStyle.position === 'static') {
                    left -= (parse(nodeStyle.paddingLeft) || 0) +
                            (parse(nodeStyle.borderLeftWidth) || 0);
                    top -= (parse(nodeStyle.paddingTop) || 0) +
                            (parse(nodeStyle.borderTopWidth) || 0);
                }
            }
            
            if (parent === element.ownerDocument.body) {
                left -= parse(parentStyle.marginLeft) || 0;
                top -= parse(parentStyle.marginTop) || 0;
            }
        }
        
    /* falls through */
    case 'absolute':
    case 'fixed':
        left -= (parse(parentStyle.borderLeftWidth) || 0);
        top -= (parse(parentStyle.borderTopWidth) || 0);
    }

    
    right -= left;
    bottom -= top;
    width -= (parse(style[pleft]) || 0) +
                (parse(style[pright]) || 0);
    height -= (parse(style[ptop]) || 0) +
                (parse(style[pbottom]) || 0);
    
    parent = parentStyle = null;
    
    return {
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        width: width,
        height: height
    };
}

/**
 * opacity
 */
function opacityNotSupported() {
    throw new Error(STRING[2006]);
}

function ieGetOpacity(style) {
    var M = Math,
        C = CORE,
        opacityRe = IE_ALPHA_OPACITY_RE,
        filter = style.filter;
    var m;
    
    if (C.string(filter) && opacityRe.test(filter)) {
        m = filter.match(opacityRe);
        m = parseFloat(m[1]);
        
        return M.max(1,
                    M.min(100,
                        C.number(m) ? m : 100)) / 100;
    }
    
    return 1;
}

function ieSetOpacity(style, opacity) {
    var M = Math,
        C = CORE;
    
    if (C.string(opacity)) {
        opacity = parseFloat(opacity);
    }
    if (C.number(opacity)) {
        style.filter = IE_ALPHA_OPACITY_TEMPLATE.
                                replace(IE_ALPHA_OPACITY_TEMPLATE_RE,
                                    M.min(100,
                                        M.max(0,
                                            M.round(opacity * 100)
                                        )).toString(10));
    }
}

function w3cGetOpacity(style) {
    var opacity = parseFloat(style.opacity);
    
    return CORE.number(opacity) ? opacity : 1;
}

function w3cSetOpacity(style, opacity) {
    var M = Math,
        C = CORE;
    
    if (C.string(opacity)) {
        opacity = parseFloat(opacity);
    }
    
    if (C.number(opacity)) {
        style.opacity = M.min(1,
                            M.max(0, opacity)).toFixed(2);
    }
}

/**
 * Style manipulation
 */
function w3cSetStyleValue(style, name, value) {
    if (value === null) {
        style.removeProperty(name);
    }
    else {
        style[name] = value;
    }
}

function w3cGetStyleValue(style, name) {
    return style.getPropertyValue(name);
}

function ieSetStyleValue(style, name, value) {
    if (value === null) {
        style.removeAttribute(name);
    }
    else {
        style[name] = value;
    }
}
function ieGetStyleValue(style, name) {
    return style.getAttribute(name);
}



/**
 * DOM Helpers
 */


// register DOM Helpers
DOM.helper('className', addClass);
DOM.helper('style', applyStyle);


CSS_INFO = DETECTED && DETECTED.css;
if (CSS_INFO) {
    
    EXPORTS.computedStyle = CSS_INFO.w3cStyle ?
                                w3cGetCurrentStyle :
                                CSS_INFO.ieStyle ?
                                    ieGetCurrentStyle :
                                    computedStyleNotSupported;
                            
    if (CSS_INFO.setattribute) {
        SET_STYLE = ieSetStyleValue;
        GET_STYLE = ieGetStyleValue;
    }
    else if (CSS_INFO.setproperty) {
        SET_STYLE = w3cSetStyleValue;
        GET_STYLE = w3cGetStyleValue;
    }
    
    if (CSS_INFO.opacity) {
        GET_OPACITY = w3cGetOpacity;
        SET_OPACITY = w3cSetOpacity;
    }
    else if (CSS_INFO.filterOpacity) {
        GET_OPACITY = ieGetOpacity;
        SET_OPACITY = ieSetOpacity;
    }
    
    if (CSS_INFO.alphaColor) {
        EXPORTS.colorUnit = 'rgba';
    }
}


module.exports = EXPORTS.chain = EXPORTS;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var CORE = __webpack_require__(0),
    DETECTED = __webpack_require__(3),
    STRING = __webpack_require__(2),
    DOM = __webpack_require__(4),
    CSS = __webpack_require__(8),
    
    ERROR_INVALID_ELEMENT = STRING[1101],
    ERROR_INVALID_DOM = STRING[1102],
    
    OFFSET_TOP = 'offsetTop',
    OFFSET_LEFT = 'offsetLeft',
    OFFSET_WIDTH = 'offsetWidth',
    OFFSET_HEIGHT = 'offsetHeight',
    
    MARGIN_TOP = 'marginTop',
    MARGIN_LEFT = 'marginLeft',
    
    SCROLL_TOP = 'scrollTop',
    SCROLL_LEFT = 'scrollLeft',
    
    BOUNDING_RECT = 'getBoundingClientRect',
    
    DEFAULTVIEW = null,
    ELEMENT_VIEW = 1,
    PAGE_VIEW = 2,
    USE_ZOOM_FACTOR = false,
    IE_PAGE_STAT_ACCESS = 'documentElement',
    
    boundingRect = false,
    getPageScroll = null,
    getOffset = null,
    getSize = null,
    //getBox = null,
    getScreenSize = null,
    EXPORTS = {
        offset: offset,
        size: size,
        box: box,
        scroll: scroll,
        screen: screen,
        visible: visible,
        translate: translateBox
    };

var DIMENSION_INFO, IEVERSION;

/**
 * Accessors
 */
function offset(element, x, y) {
    
    // setter
    if (arguments.length > 1) {
        return box(element, x, y);
    }
    
    // getter
    switch (isViewable(element)) {
    case PAGE_VIEW:
        return pageBox(element).slice(0, 2);
    case ELEMENT_VIEW:
        return getOffset(element).slice(0, 2);
    }
    
    throw new Error(ERROR_INVALID_ELEMENT);
    
}

function size(element, width, height) {
    
    // setter
    if (arguments.length > 1) {
        return box(element, null, null, width, height);
    }
    
    // getter
    return isViewable(element) === PAGE_VIEW ?
                pageBox(element).slice(2, 4) : getSize(element);
}

function box(element, x, y, width, height) {
    var applyStyle, viewmode, dimension;
    
    // setter
    if (arguments.length > 1) {
        
        applyStyle = translateBox(element, x, y, null, null, width, height);
        
        if (applyStyle) {
            CSS.style(element, applyStyle);
        }
        return EXPORTS.chain;
    }
    
    // getter
    viewmode = isViewable(element);
    if (viewmode === PAGE_VIEW) {
        dimension = pageBox(element);
        x = dimension[0];
        y = dimension[1];
        width = dimension[2];
        height = dimension[3];
        dimension = screen(element);
        return [
            x,
            y,
            width - x - dimension[2],
            height - y - dimension[3],
            width,
            height];
    }
    
    if (viewmode !== ELEMENT_VIEW) {
        throw new Error(ERROR_INVALID_ELEMENT);
    }
    dimension = getSize(element);
    width = dimension[0];
    height = dimension[1];
    dimension = getOffset(element);
    dimension[4] = width;
    dimension[5] = height;
    
    return dimension;
}

function translateBox(element, x, y, right, bottom, width, height, target) {
    var css = CSS,
        cssValue = css.unitValue,
        parse = parseFloat,
        NUMBER = 'number',
        hasLeft = false,
        hasTop = hasLeft,
        hasRight = hasLeft,
        hasBottom = hasLeft;
        
    var hasWidth, hasHeight, diff, currentDimension;
        
    if (isViewable(element) !== ELEMENT_VIEW) {
        throw new Error(ERROR_INVALID_ELEMENT);
    }
    
    // resolve parameters
    if (CORE.array(x)) {
        target = y;
        if (x.length > 4) {
            height = 5 in x ? x[5] : null;
            width = 4 in x ? x[4] : null;
            bottom = 3 in x ? x[3] : null;
            right = 2 in x ? x[2] : null;
        }
        else {
            height = 3 in x ? x[3] : null;
            width = 2 in x ? x[2] : null;
            bottom = null;
            right = null;
        }
        y = 1 in y ? x[1] : null;
        x = x[0];
    }
    
    if (!CORE.object(target)) {
        target = {};
    }
    
    currentDimension = css.computedStyle(element,
                                    'position',
                                    'top',
                                    'left',
                                    'right',
                                    'bottom',
                                    'width',
                                    'height');
    
    // resolve position
    switch (currentDimension.position) {
    case 'relative':
    /* falls through */
    case 'absolute':
    case 'fixed':
        
        // create position
        x = cssValue(x);
        y = cssValue(y);
        right = cssValue(right);
        bottom = cssValue(bottom);
        
        hasLeft = x !== false;
        hasTop = y !== false;
        hasRight = !hasLeft && right !== false;
        hasBottom = !hasBottom && bottom !== false;
        
        if (hasLeft || hasRight || hasTop || hasBottom) {
            
            diff = getOffset(element);
            
            if (hasLeft) {
                target.left = typeof x === NUMBER ? (
                                    (parse(currentDimension.left) || 0) +
                                    (x - diff[0])
                                ) + 'px' :
                                x;
                
            }
            else if (hasRight) {
                target.right = typeof right === NUMBER ? (
                                    (parse(currentDimension.right) || 0) +
                                    (right - diff[2])
                                ) + 'px' :
                                right;
            }
            
            if (hasTop) {
                target.top = typeof y === NUMBER ? (
                                    (parse(currentDimension.top) || 0) +
                                    (y - diff[1])
                                ) + 'px' :
                                y;
            }
            else if (hasBottom) {
                target.bottom = typeof right === NUMBER ? (
                                    (parse(currentDimension.bottom) || 0) +
                                    (bottom - diff[3])
                                ) + 'px' :
                                bottom;
            }
        }
        
    }
    
    
    
    // resolve size
    width = cssValue(width);
    hasWidth = width !== false;
    if (hasWidth) {
        target.width = typeof width === NUMBER ? (
                            parse(currentDimension.width || 0) +
                            (width - element[OFFSET_WIDTH])
                        ) + 'px' :
                        width;
    }
    
    height = cssValue(height);
    hasHeight = height !== false;
    if (hasHeight) {
        target.height = typeof height === NUMBER ? (
                            parse(currentDimension.height || 0) +
                            (height - element[OFFSET_HEIGHT])
                        ) + 'px' :
                        height;
    }

    return hasLeft || hasRight || hasTop || hasBottom ||
            hasWidth || hasHeight ? target : null;
}


function scroll(dom, x, y) {
    var setter = arguments.length > 1,
        isNumber = CORE.number,
        stop = SCROLL_TOP,
        sleft = SCROLL_LEFT;
    var current, window;
    
    // validate x and y
    if (setter) {
        if (!isNumber(x)) {
            x = false;
        }
        if (!isNumber(y)) {
            y = false;
        }
    }
    
    switch (isViewable(dom)) {
    case PAGE_VIEW:
        window = DOM.is(dom) ?
                        dom[DEFAULTVIEW] : dom;
        current = getPageScroll(window);
        
        if (setter) {
            setPageScroll(window,
                            x === false ?
                                current[0] : x,
                            y === false ?
                                current[1] : y);
        }
        else {
            return current;
        }
        break;
    
    case ELEMENT_VIEW:
        if (setter) {
            dom[sleft] = x === false ? dom[sleft] : x;
            dom[stop] = y === false ? dom[stop] : y;
        }
        else {
            return [dom[sleft], dom[stop]];
        }
        break;
    
    default:
        throw new Error(ERROR_INVALID_DOM);
    }
}

function pageBox(dom) {
    var M = Math,
        help = DOM,
        subject = dom,
        box = screen();
    
    // page size
    if (help.isView(subject)) {
        subject = subject.document;
    }
    
    if (subject.nodeType === 9) {
        subject = subject[IE_PAGE_STAT_ACCESS];
        box[2] = M.max(subject.scrollWidth, box[2]);
        box[3] = M.max(subject.scrollHeight, box[3]);
    }
    subject = null;
    
    return box;
}


/**
 * Visibility
 */
function visible(element, visibility, displayed) {
    var style = null,
        css = CSS,
        isString = CORE.string,
        len = arguments.length,
        attached = isViewable(element) === ELEMENT_VIEW;
    
    // setter
    if (len > 1) {
        style = {};
        
        if (isString(visibility)) {
            style.visibility = visibility;
        }
        else if (typeof visiblity === 'boolean') {
            style.visibility = visibility ? 'visible' : 'hidden';
        }
        
        
        if (displayed === false) {
            displayed = 'none';
        }
        
        if (isString(displayed)) {
            style.display = displayed;
        }
        
        css.style(element, style);
        
        return EXPORTS.chain;
        
    }
    
    // getter
    if (attached) {
        style = CSS.computedStyle(element,
                        'display',
                        'visibility');
        return style.display !== 'none' && style.visibility !== 'hidden';
    }
    
    return false;
}

/**
 * Screen offset and size
 */
function screen(dom) {
    var help = DOM,
        subject = dom;
    var box, size;
    if (help.is(subject, 1, 9)) {
        subject = (subject.nodeType === 1 ?
                        subject.ownerDocument : subject)[
                            help.documentViewAccess];
    }
    if (!help.isView(subject)) {
        subject = global.window;
    }
    box = getPageScroll(subject);
    size = getScreenSize(subject);
    
    box[2] = size[0];
    box[3] = size[1];
    subject = null;
    return box;
    
}

function w3cScreenSize(window) {
    return [window.innerWidth, window.innerHeight];
}


function ieScreenSize(window) {
    var factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1,
        subject = window.document[IE_PAGE_STAT_ACCESS],
        size = [subject.clientWidth * factor,
                subject.clientHeight * factor];
        
    subject = null;
    return size;
}

/**
 * Element Size
 */
function rectSize(element, boundingRect) {
    var M = Math,
        rect = boundingRect || element[BOUNDING_RECT](),
        size = [
            M.max(0, rect.width || 0),
            M.max(0, rect.height || 0)];
    rect = null;
    return size;
}

function manualSize(element) {
    var M = Math;
    return [
        M.max(0, element[OFFSET_WIDTH] || 0),
        M.max(0, element[OFFSET_HEIGHT] || 0)];
}

/**
 * Element Offset
 */
function rectOffset(element, boundingRect) {
    var //scrolled = getPageScroll(element.ownerDocument[DEFAULTVIEW]),
        page = screen(element),
        rect = boundingRect || element[BOUNDING_RECT](),
        factor = DIMENSION_INFO.zoomfactor ?
                    getZoomFactor(global.window.document[IE_PAGE_STAT_ACCESS]) :
                    1,
        scrollX = page[0],
        scrollY = page[1],
        x = rect.left * factor + scrollX,
        y = rect.top * factor + scrollY,
        
        offset = [
            x,
            y,
            rect.right * factor - page[2],
            rect.bottom * factor - page[3]];
    rect = null;
    return offset;
}

function manualOffset(element) {
    var root = global.document[IE_PAGE_STAT_ACCESS],
        body = root.body,
        css = CSS,
        
        top = OFFSET_TOP,
        left = OFFSET_LEFT,
        mtop = MARGIN_TOP,
        mleft = MARGIN_LEFT,
        
        stop = SCROLL_TOP,
        sleft = SCROLL_LEFT,

        findStyles = [mleft, mtop],
        parent = element.offsetParent,
        style = css.computedStyle(element,
                        [findStyles]),
        page = screen(element),
        x = element[left],
        y = element[top];
    
    x += parseFloat(style[mleft]) || 0;
    y += parseFloat(style[mtop]) || 0;
    
    for (; parent; parent = parent.offsetParent) {
        
        if (parent.nodeType === 1) {
            
            style = css.computedStyle(parent, findStyles);
            
            x += (parent[left] || 0) +
                            (parent.clientLeft || 0) +
                            (parseFloat(style[mleft]) || 0);
                            
            y += (parent[top] || 0) +
                            (parent.clientTop || 0) +
                            (parseFloat(style[mtop]) || 0);
                            
        }
    }
    
    parent = element.parentNode;
    
    for (; parent && parent !== body; parent = parent.parentNode) {
        if (parent.nodeType === 1 && parent !== root) {
            x += parent[sleft] || 0;
            y += parent[stop] || 0;
        }
    }
    
    root = parent = body = null;
    return [
        x,
        y,
        x + element[OFFSET_WIDTH] - page[2],
        y + element[OFFSET_HEIGHT] - page[3]];
}


/**
 * Page Scroll
 */
function setPageScroll(window, x, y) {
    var factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1;
    window.scrollTo(x * factor, y * factor);
}

function w3cPageScrollOffset(window) {
    var offset = [(window.pageXOffset || 0), (window.pageYOffset || 0)];
    return offset;
}

function iePageScrollOffset(window) {
    var M = Math,
        subject = window.document[IE_PAGE_STAT_ACCESS],
        factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1,
        offset = [M.round(subject[SCROLL_LEFT] / factor),
                    M.round(subject[SCROLL_TOP] / factor)];
    
    subject = null;
    
    return offset;
}

function getZoomFactor() {
    var factor = 1;
    //var rect, body;
    //
    //if (boundingRect) {
    //    body = window.document.body;
    //    
    //    // rect is only in physical pixel size in IE before version 8 
    //    rect = body[BOUNDING_RECT]();
    //
    //    // the zoom level is always an integer percent value
    //    factor = Math.round(
    //                (rect.right - rect.left / body[OFFSET_WIDTH]) * 100) / 100;
    //}
    //
    //body = null;
    
    return factor;
}


/**
 * checking
 */
function isViewable(dom) {
    var help = DOM;
    var body, viewable;
    
    if (help.is(dom)) {
        switch (dom.nodeType) {
        case 9:
        case 11:
            return PAGE_VIEW;
        }
        body = dom.ownerDocument.body;
        viewable = (dom === body || help.contains(body, dom)) && ELEMENT_VIEW;
        body = null;
        return viewable;
        
    }
    
    return help.isView(dom) ? PAGE_VIEW : false;
}

/**
 * initialize
 */
DIMENSION_INFO = DETECTED && DETECTED.dimension;
if (DIMENSION_INFO) {
    
    // strict mode
    if (!DETECTED.browser.strict) {
        IE_PAGE_STAT_ACCESS = 'body';
    }
    
    USE_ZOOM_FACTOR = DIMENSION_INFO.zoomfactor;
    DEFAULTVIEW = DETECTED.dom.defaultView;
    IEVERSION = DETECTED.browser.ieVersion;
    
    getPageScroll = DIMENSION_INFO.pagescroll ?
                        w3cPageScrollOffset :
                        iePageScrollOffset;
    
    getScreenSize = DIMENSION_INFO.screensize ?
                        w3cScreenSize :
                        ieScreenSize;

    boundingRect = DIMENSION_INFO.rectmethod && BOUNDING_RECT;
    
    getOffset = boundingRect ? rectOffset : manualOffset;
    
                        
    getSize = boundingRect ? rectSize : manualSize;
}



module.exports = EXPORTS.chain = EXPORTS;



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CORE = __webpack_require__(0),
    FORMAT = __webpack_require__(6),
    
    BYTE = 255,
    BYTE_PERCENT = 127,
    BYTE_HUE = 511,
    
    HUE = 360,
    PERCENT = 100;
    
function itemize(value, index, format) {
    var F = FORMAT,
        M = Math,
        percent = PERCENT,
        parse = parseFloat,
        min = 0,
        max = index < 1 ?
                HUE : percent;
    
    switch (format) {
    case F.HEX:
        value = (parseInt(value, 16) / BYTE) * max;
        break;
    
    case F.NUMBER:
        value = parse(value);
        if (index > 2) {
            value *= percent;
        }
        break;
    
    case F.PERCENT:
        value = parse(value);
        break;
    }
    
    return M.max(min, M.min(max, value || 0));
}

function toInteger(h, s, l, a) {
    var psize = BYTE_PERCENT;
    
    if (!CORE.number(a)) {
        a = PERCENT;
    }
    
    return ((a & psize) << 23) |
            ((l & psize) << 16) |
            ((s & psize) << 9) |
            (h & BYTE_HUE);
}


function toArray(integer) {
    var psize = BYTE_PERCENT;
    return [
        integer & BYTE_HUE,
        (integer >> 9) & psize,
        (integer >> 16) & psize,
        (integer >> 23) & psize];
}

function toString(integer) {
    var values = toArray(integer);
    values[1] += '%';
    values[2] += '%';
    values[3] = (values[3] / PERCENT);
    return 'hsla(' + values.join(',') + ')';
}

module.exports = {
    itemize: itemize,
    toInteger: toInteger,
    toArray: toArray,
    toString: toString,
};




/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var ROOT = global,
    CORE = __webpack_require__(0),
    ENV = CORE.env,
    EXPORTS = false;
    
var match, ieVersion;

if (ENV.browser) {
    match = ENV.userAgent.match(/msie ([0-9]+\.[0-9]+)/i);
    ieVersion = match && parseInt(match[1], 10) || 0;
    EXPORTS = {
        strict: ROOT.document.compatMode === 'CSS1Compat',
        ieVersion: ieVersion,
        ie8: ieVersion === 8
    };
}

module.exports = EXPORTS;

ROOT = null;


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var CORE = __webpack_require__(0),
    INFO = __webpack_require__(3),
    STRING = __webpack_require__(2),
    EVENTS = null,
    PAGE_UNLOADED = false,
    MIDDLEWARE = CORE.middleware('libdom.event'),
    IE_CUSTOM_EVENTS = {},
    ERROR_OBSERVABLE_NO_SUPPORT = STRING[1131],
    ERROR_INVALID_TYPE = STRING[1132],
    ERROR_INVALID_HANDLER = STRING[1133],
    IE_ON = 'on',
    IE_BUBBLE_EVENT = 'beforeupdate',
    IE_NO_BUBBLE_EVENT = 'propertychange',
    EXPORTS = module.exports = {
                on: listen,
                un: unlisten,
                fire: dispatch,
                purge: purge,
                ondestroy: addDestructor
            };
var RESOLVE, LISTEN, UNLISTEN, DISPATCH, EVENT_INFO, IS_CAPABLE, SUBJECT;

function listen(observable, type, handler, context) {
    var last = EVENTS,
        C = CORE;
    var current, args;
    
    if (!C.string(type)) {
        throw new Error(ERROR_INVALID_TYPE);
    }
    
    if (!C.method(handler)) {
        throw new Error(ERROR_INVALID_HANDLER);
    }
    
    observable = RESOLVE(observable);
    
    if (!observable) {
        throw new Error(ERROR_OBSERVABLE_NO_SUPPORT);
    }
    
    if (typeof context === 'undefined') {
        context = null;
    }
    
    args = [observable, type, handler, context];
    MIDDLEWARE.run('listen', args);
    
    observable = args[0];
    type = args[1];
    handler = args[2];
    context = args[3];
    args.splice(0, 4);
    args = null;
    
    current = LISTEN(observable, type, handler, context);
    
    current.unlisten = createUnlistener(current);
    current.head = last;
    current.tail = null;
    
    if (last) {
        last.tail = current;
    }
    EVENTS = current;
    
    return current.unlisten;
    
}

function unlisten(observable, type, handler, context) {
    var C = CORE;
    var found, len, args;
    
    if (!C.string(type)) {
        throw new Error(ERROR_INVALID_TYPE);
    }
    
    if (!C.method(handler)) {
        throw new Error(ERROR_INVALID_HANDLER);
    }
    
    observable = RESOLVE(observable);
    
    if (!observable) {
        throw new Error(ERROR_OBSERVABLE_NO_SUPPORT);
    }
    
    if (typeof context === 'undefined') {
        context = null;
    }
    
    args = [observable, type, handler, context];
    MIDDLEWARE.run('unlisten', args);
    
    observable = args[0];
    type = args[1];
    handler = args[2];
    context = args[3];
    args.splice(0, 4);
    args = null;
    
    found = filter(observable, type, handler, context);
    
    for (len = found.length; len--;) {
        found[len].unlisten();
    }
    
    return EXPORTS.chain;
}


function dispatch(observable, type, defaults) {
    
    if (!CORE.string(type)) {
        throw new Error(ERROR_INVALID_TYPE);
    }
    
    observable = RESOLVE(observable);
    
    if (!observable) {
        throw new Error(ERROR_OBSERVABLE_NO_SUPPORT);
    }
    
    return DISPATCH(observable, type, defaults);

}

function purge() {
    var found = filter.apply(null, arguments),
        len = found.length;
        
    for (; len--;) {
        found[len].unlisten();
    }
    
    return EXPORTS.chain;
}


function createUnlistener(event) {
    var destroyed = false;
    function destroy() {
        var head, tail;
        if (!destroyed) {
            destroyed = true;
            
            UNLISTEN(event[0], event[1], event[4]);
            
            head = event.head;
            tail = event.tail;
            
            if (head) {
                head.tail = tail;
            }
            
            if (tail) {
                tail.head = head;
            }

            if (event === EVENTS) {
                EVENTS = tail || head;
            }
            
            event[0] = null;
            event.splice(0, 4);
            delete event.unlisten;
            delete event.head;
            delete event.tail;
            event = head = tail = null;
        }
    }
    return destroy;
}


function filter(observable, type, handler, context) {
    var last = EVENTS,
        found = [],
        len = 0,
        argLen = arguments.length,
        HAS_OBSERVABLE = 0,
        HAS_TYPE = 0,
        HAS_HANDLER = 0,
        HAS_CONTEXT = 0;
        
    switch (true) {
    case argLen > 3: HAS_CONTEXT = 1;
    /* fall through */
    case argLen > 2: HAS_HANDLER = 1;
    /* fall through */
    case argLen > 1: HAS_TYPE = 1;
    /* fall through */
    case argLen > 0: HAS_OBSERVABLE = 1;
    }
        
    for (; last; last = last.head) {
        if ((HAS_OBSERVABLE && last[0] !== observable) ||
            (HAS_TYPE && last[1] !== type) ||
            (HAS_HANDLER && last[2] !== handler) ||
            (HAS_CONTEXT && last[3] !== context)) {
            continue;
        }
        found[len++] = last;

    }
    
    return found;
}


/**
 * w3c events
 */
function w3cListen(observable, type, handler, context) {
    var listener = w3cCreateHandler(handler, context);
    observable.addEventListener(type, listener, false);
    return [observable, type, handler, context, listener];
}

function w3cUnlisten(observable, type, listener) {
    observable.removeEventListener(type, listener, false);
}

function w3cDispatch(observable, type, properties) {
    var hasOwn = CORE.contains,
        event = global.document.createEvent("Event");
    var name;
    
    event.initEvent(type,
            'bubbles' in properties && properties.bubbles === true,
            'cancelable' in properties && properties.cancelable !== false);
    
    for (name in properties) {
        if (hasOwn(properties, name) && !(name in event)) {
            event[name] = properties[name];
        }
    }
    observable.dispatchEvent(event);
    
    return event;
}

function w3cObservable(observable) {
    var isFunction = CORE.method;
    
    return observable && typeof observable === 'object' &&
            isFunction(observable.addEventListener) &&
            isFunction(observable.removeEventListener) &&
            isFunction(observable.dispatchEvent) ?
                observable : false;

}

function w3cCreateHandler(handler, context) {
    function onEvent(event) {
        MIDDLEWARE.run('dispatch', [event.type, event]);
        return handler.call(context, event);
    }
    return onEvent;
}


/**
 * ie events
 */
function ieListen(observable, type, handler, context) {
    var on = IE_ON;
    var listener;
    
    // listen to bubble
    if (ieTestCustomEvent(observable, type)) {
        listener = ieCreateCustomHandler(type, handler, context);
        observable.attachEvent(on + IE_BUBBLE_EVENT, listener);
        observable.attachEvent(on + IE_NO_BUBBLE_EVENT, listener);

    }
    else {
        listener = ieCreateHandler(handler, context);
        observable.attachEvent(on + type, listener);
    }
    
    return [observable, type, handler, context, listener];
}

function ieUnlisten(observable, type, listener) {
    var on = IE_ON;
    if (listener.customType) {
        observable.detachEvent(on + IE_BUBBLE_EVENT, listener);
        observable.detachEvent(on + IE_NO_BUBBLE_EVENT, listener);
    }
    else {
        observable.detachEvent(on + type, listener);
    }

}

function ieDispatch(observable, type, properties) {
    var hasOwn = CORE.contains,
        event = global.document.createEventObject();
    var name;
    
    for (name in properties) {
        if (hasOwn(properties, name) && !(name in event)) {
            event[name] = properties[name];
        }
    }
    
    if (ieTestCustomEvent(observable, type)) {
        event.customType = type;
        type = properties.bubbles === true ?
                    IE_BUBBLE_EVENT : IE_NO_BUBBLE_EVENT;
    }
    
    name = IE_ON + type;
    observable.fireEvent(name, event);
    
    // set to not cancel if not cancelable
    if (properties.cancelable === false) {
        event.returnValue = true;
    }
    
    return event;
}

function ieObservable(observable) {
    if (observable) {
        observable = observable.window ? observable.self : observable;
        if (observable.attachEvent && observable.detachEvent) {
            return observable;
        }
        
    }
    return false;
}

function ieCreateHandler(handler, context) {
    function onEvent() {
        var event = global.event;
        iePolyfillEvent(event);
        MIDDLEWARE.run('dispatch', [event.type, event]);
        return handler.call(context, event);
    }
    return onEvent;
}

function ieCreateCustomHandler(type, handler, context) {
    function onEvent() {
        var event = global.event;
        iePolyfillEvent(event);
        if (event.customType === type) {
            MIDDLEWARE.run('dispatch', [type, event]);
            event.type = type;
            return handler.call(context, event);
        }
    }
    
    onEvent.customType = true;
    
    return onEvent;
}

function iePreventDefault() {
    /* jshint validthis:true */
    this.returnValue = false;
}

function ieStopPropagation() {
    /* jshint validthis:true */
    this.cancelBubble = true;
}

function iePolyfillEvent(eventObject) {
    
    eventObject.target = eventObject.target || eventObject.srcElement;
    
    if (!('preventDefault' in eventObject)) {
        eventObject.preventDefault = iePreventDefault;
    }
    
    if (!('stopPropagation' in eventObject)) {
        eventObject.stopPropagation = ieStopPropagation;
    }
}

function ieTestCustomEvent(observable, type) {
    var supported = false,
        list = IE_CUSTOM_EVENTS;
    var element, access, ontype;
    
    if (observable.nodeType === 9) {
        observable = observable.documentElement;
    }
    
    if (observable.nodeType === 1) {
        // dont do another test
        access = observable.tagName + ':' + type;
        if (access in list) {
            return list[access];
        }

        ontype = IE_ON + type;
        element = observable.cloneNode(false);
        supported = ontype in element;
        if (!supported) {
            element.setAttribute(ontype, 'return;');
            supported = typeof element[ontype] === 'function';
        }
        element = null;
        
        list[access] = !supported;
        
        return !supported;
    
    }
    
    return false;
    
}

/**
 * purge after page has unloaded
 */
function onBeforeUnload() {
    if (!PAGE_UNLOADED) {
        PAGE_UNLOADED = true;
        // call middleware
        MIDDLEWARE.run('global-destroy', []);
        purge();
    }
}

function addDestructor(handler) {
    if (CORE.method(handler)) {
        MIDDLEWARE.register('global-destroy', handler);
    }
}


RESOLVE = LISTEN = UNLISTEN = DISPATCH;

/**
 * Initialize
 */
EVENT_INFO = INFO && INFO.event;

if (EVENT_INFO) {
    IS_CAPABLE = true;
    switch (true) {
    case EVENT_INFO.w3c:
        LISTEN = w3cListen;
        UNLISTEN = w3cUnlisten;
        DISPATCH = w3cDispatch;
        RESOLVE = w3cObservable;
        break;
    
    case EVENT_INFO.ie:
        LISTEN = ieListen;
        UNLISTEN = ieUnlisten;
        DISPATCH = ieDispatch;
        RESOLVE = ieObservable;
        break;
    
    default:
        IS_CAPABLE = false;
    }
    
    // postprocess event handlers if platform is capable of L2 events
    if (IS_CAPABLE) {
        SUBJECT = global;
        
        // register destructors
        listen(SUBJECT, 'beforeunload', onBeforeUnload);
        listen(SUBJECT, 'unload', onBeforeUnload);
        SUBJECT = null;
    }
}

EXPORTS.chain = EXPORTS;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var CORE = __webpack_require__(0),
    detect = __webpack_require__(3),
    rehash = CORE.rehash,
    EXPORTS = {
        env: CORE.env,
        info: detect
    };
var css, eventModule, dimension, selection;

if (detect) {
    
    rehash(EXPORTS,
            __webpack_require__(2),
            {
                "xmlEncode": "xmlEncode",
                "xmlDecode": "xmlDecode"
            });

    // dom structure
    rehash(EXPORTS,
            __webpack_require__(4),
            {
                'is': 'is',
                'isView': 'isView',
                'contains': 'contains',
                
                'select': 'select',
                
                'eachNodePreorder': 'eachPreorder',
                'eachNodePostorder': 'eachPostorder',
                'eachNodeLevelorder': 'eachLevel',
                
                'add': 'add',
                'move': 'move',
                'replace': 'replace',
                'remove': 'remove'
            });
    
    rehash(EXPORTS,
            css = __webpack_require__(8),
            {
                'addClass': 'add',
                'removeClass': 'remove',
                'computedStyle': 'computedStyle',
                'stylize': 'style'
            });
    
    
    rehash(EXPORTS,
            eventModule = __webpack_require__(12),
            {
                'on': 'on',
                'un': 'un',
                'purge': 'purge',
                'dispatch': 'fire',
                "destructor": "ondestroy"
            });
    
    rehash(EXPORTS,
            dimension = __webpack_require__(9),
            {
                'offset': 'offset',
                'size': 'size',
                'box': 'box',
                'scroll': 'scroll',
                'screen': 'screen'
            });
    
    rehash(EXPORTS,
            selection = __webpack_require__(24),
            {
                'highlight': 'select',
                'noHighlight': 'unselectable',
                'clearHighlight': 'clear'
            });
    
    rehash(EXPORTS,
            __webpack_require__(5),
            {
                'parseColor': 'parse',
                'parseColorType': 'parseType',
                'formatColor': 'stringify'
            });
    
    rehash(EXPORTS,
            __webpack_require__(14),
            {
                'transition': 'each',
                'animateStyle': 'style'
            });
    
    css.chain =
        eventModule.chain = 
        dimension.chain =
        selection.chain = EXPORTS;
    
}


module.exports =
    EXPORTS['default'] =        // attach "default" for ES6 import
    CORE.dom =                  // attach libdom to libcore from "dom"
    global.libdom = EXPORTS;    // attach as global "libdom" variable



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var STRING =  __webpack_require__(2),
    CORE = __webpack_require__(0),
    EASING = __webpack_require__(23),
    COLOR = __webpack_require__(5),
    CSS_MODULE = __webpack_require__(8),
    DIMENSION = __webpack_require__(9),
    SESSION_ACCESS = '__animate_session',
    BOX_POSITION = {
        left: 0,
        top: 1,
        right: 2,
        bottom: 3,
        width: 4,
        height: 5
    },
    BOX_RE = CSS_MODULE.boxRe,
    DIMENSION_RE = CSS_MODULE.dimensionRe,
    COLOR_RE = CSS_MODULE.colorRe,
    SESSIONS = {},
    EXPORTS = {
        easing: EASING,
        defaultEasing: 'linear',
        interval: 10,
        each: animate,
        has: hasAnimationType,
        style: animateStyle
    };

/**
 * Stuff to try:
 *  transition-timing-function (emulate):
 *      linear|ease|ease-in|ease-out|ease-in-out|
 *      step-start|step-end|steps(int,start|end)|
 *      cubic-bezier(n,n,n,n)|initial|inherit
 */

function animate(callback, from, to, type, duration) {
    var M = Math,
        string = STRING,
        easing = EASING,
        C = CORE,
        isObject = C.object,
        has = C.contains,
        list = SESSIONS,
        defaultInterval = EXPORTS.interval,
        clear = clearInterval,
        set = setInterval,
        interval = null,
        alen = arguments.length,
        frame = 0;
        
    var frames, displacements;
    
    function stop() {
        var fn = stop;
        
        if (interval) {
            clear(interval);
            delete list[interval];
            delete fn.session;
            delete fn.update;
            delete fn.running;
            interval = null;
        }
        fn = null;
    }
    
    function update(updates, initialValues, animationType) {
        var specs = displacements,
            typeObject = isObject;
        
        if (interval) {
            if (!typeObject(updates)) {
                throw new Error(string[1152]);
            }
            
            if (!typeObject(initialValues)) {
                initialValues = specs[3];
            }
            applyDisplacements(specs, initialValues, updates, animationType);
            // reset frame
            frame = 0;
            
        }
    }
    
    function run() {
        var specs = displacements,
            names = specs[0],
            from = specs[1],
            to = specs[2],
            total = frames,
            current = ++frame,
            len = names.length,
            result = {},
            eased = type(current, 0, 1, total),
            last = current === total;
            
        var start;
        
        // normal animation
        for (; len--;) {
            start = from[len];
            result[names[len]] = (to[len] - start) * eased + start;
        }
        
        
        specs[3] = result;
        callback(result, last);
        
        if (last) {
            stop();
        }
        
    }
    
    if (!C.method(callback)) {
        throw new Error(string[1151]);
    }
    
    if (!isObject(from) || !isObject(to)) {
        throw new Error(string[1152]);
    }
    
    // validate type
    if (alen < 4) {
        type = EXPORTS.defaultEasing;
    }
    else if (!C.string(type) || !has(easing, type)) {
        throw new Error(string[1153]);
    }
    
    // validate duration
    if (alen < 5) {
        duration = 1;
    }
    else if (!C.number(duration) || duration < 1) {
        throw new Error(string[1154]);
    }
    
    // prepare displacements
    type = easing[type];
    duration *= 1000;
    frames = M.max(10, M.round(duration / defaultInterval));
    
    displacements = [[], [], [], from, stop];
    interval = set(run, defaultInterval);
    stop.session = interval;
    stop.update = update;
    stop.running = true;
    list[interval] = displacements;
    displacements = applyDisplacements(displacements, from, to);
    return stop;
    
}

function validValue(value) {
    var C = CORE;
    if (C.string(value)) {
        value = parseFloat(value);
    }
    return C.number(value) && value;
}

function applyDisplacements(session, from, to) {
    
    CORE.each(to, onApplyDisplacement, [from, session], true);
    
    return session;
}

function onApplyDisplacement(value, name, to) {
    /* jshint validthis:true */
    var context = this,
        format = validValue,
        from = context[0],
        session = context[1],
        names = session[0],
        sourceValues = session[1];
        
    var index, source, target, sourceEnded;
        
    target = format(to[name]);
    
    if (target !== false) {
        index = names.indexOf(name);
        source = CORE.contains(from, name) &&
                    format(from[name]);
                    
        sourceEnded = source === false;
        
        // create from source if did not exist
        if (index === -1) {
            if (sourceEnded) {
                return true;
            }
            index = names.length;
            names[index] = name;
            
        }
        else if (sourceEnded) {
            
            source = sourceValues[index];
        }
        
        // update
        sourceValues[index] = source;
        session[2][index] = target;
        
    }

    
    return true;
}

function hasAnimationType(type) {
    var C = CORE;
    return C.string(type) && C.contains(EASING, type);
}

/**
 * CSS animation
 */
function animateStyle(element, styles, type) {
    var access = SESSION_ACCESS,
        stat = [[], {}, [], {}];
    //var values = createElementValues(styles);
    
    var session, sessionId, animateObject,
        names, defaults, animateValues, staticValues;
        
    CORE.each(styles, eachElementValues, stat);
    
    names = stat[0];
    animateValues = stat[1];
    staticValues = stat[3];
        
    // has animation
    if (names.length) {
        sessionId = element.getAttribute(access);
        defaults = createStyleDefaults(element, names);
        
        if (!hasAnimationType(type)) {
            type = EXPORTS.defaultEasing;
        }
        
        // create
        if (!sessionId) {
            animateObject = {
                node: element
            };
            
            session = animate(createElementHandler(animateObject),
                                            defaults,
                                            animateValues,
                                            type);
            
            animateObject.id = sessionId = session.session;
            
            element.setAttribute(access, sessionId);
            
        }
        // update
        else {
            
            session = SESSIONS[sessionId][4];
            session.update(animateValues, defaults, type);
            
        }
    }
    
    if (stat[2].length) {
        CSS_MODULE.style(element, staticValues);
    }
    
}

function createElementHandler(animate) {
    function onAnimate(values, last) {
        var session = animate,
            node = session.node;
        
        // transform dimension
        DIMENSION.translate(node,
                            'left' in values ? values.left : null,
                            'top' in values ? values.top : null,
                            'right' in values ? values.right : null,
                            'bottom' in values ? values.bottom : null,
                            'width' in values ? values.width : null,
                            'height' in values ? values.height : null,
                            values);
        
        CSS_MODULE.style(node, values);
        
        if (last) {
            node.removeAttribute(SESSION_ACCESS);
            session.node = null;
            delete session.node;
        }
        
        session = node = null;
    }
    return onAnimate;
}

function createStyleDefaults(element, names) {
    var css = CSS_MODULE,
        values = css.computedStyle(element, names),
        dimension = DIMENSION,
        c = -1,
        l = names.length,
        cssValue = css.unitValue,
        dimensionRe = DIMENSION_RE,
        colorRe = COLOR_RE,
        colorParse = COLOR.parse,
        boxRe = BOX_RE,
        boxPosition = BOX_POSITION,
        box = null;
    var name, value;
    
    for (; l--;) {
        name = names[++c];
        value = values[name];
        if (boxRe.test(name)) {
            if (!box) {
                box = dimension.box(element);
            }
            value = box[boxPosition[name]];
        }
        else if (dimensionRe.test(name)) {
            value = cssValue(value);
        }
        else if (colorRe.test(name)) {
            value = colorParse(value);
        }
        values[name] = parseFloat(value) || 0;
    }
    
    return values;
}


function eachElementValues(value, name) {
    /*jshint validthis:true */
    var stat = this,
        names = stat[0],
        values = stat[1],
        snames = stat[2],
        statics = stat[3],
        raw = value;
    
    // opacity
    if (name === 'opacity') {
        value = parseFloat(raw);
        
    }
    // box and dimension
    else if (BOX_RE.test(name) || DIMENSION_RE.test(name)) {
        value = CSS_MODULE.unitValue(raw);
        
    }
    // color
    else if (COLOR_RE.test(name)) {
        value = COLOR.parse(raw);
        if (value === null) {
            value = false;
        }
    }
    
    if (CORE.number(value)) {
        names[names.length] = name;
        values[name] = value;
    }
    else if (value !== false) {
        snames[snames.length] = name;
        statics[name] = value;
    }
}


module.exports = EXPORTS;




/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RGBA = __webpack_require__(7),
    CORE = __webpack_require__(0),
    EXPORTS = module.exports = CORE.assign({}, RGBA);

function toHex(integer) {
    var M = Math;
    integer = M.max(0, M.min(integer, 255));
    return (integer < 16 ? '0' : '') + integer.toString(16);
}

function toString(integer) {
    var convert = toHex,
        values = RGBA.toArray(integer).slice(0, 3);
    
    values[0] = convert(values[0]);
    values[1] = convert(values[1]);
    values[2] = convert(values[2]);
    
    return '#' + values.join('');
}


EXPORTS.toString = toString;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var HSLA = __webpack_require__(10),
    CORE = __webpack_require__(0),
    EXPORTS = module.exports = CORE.assign({}, HSLA);

function toString(integer) {
    var values = HSLA.toArray(integer).slice(0, 3);
    values[1] += '%';
    values[2] += '%';
    return 'hsl(' + values.join(',') + ')';
}

EXPORTS.toString = toString;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var RGBA = __webpack_require__(7),
    CORE = __webpack_require__(0),
    EXPORTS = CORE.assign({}, RGBA);

function toString(integer) {
    return 'rgb(' + RGBA.toArray(integer).slice(0, 3).join(',') + ')';
}

function toInteger(r, g, b) {
    return RGBA.toInteger(r, g, b, 100);
}

EXPORTS.toString = toString;
EXPORTS.toInteger = toInteger;


module.exports = EXPORTS;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {


var WINDOW = global,
    CORE = __webpack_require__(0),
    DOC = WINDOW.document,
    DIV = DOC.createElement('div'),
    STYLE = DIV.style,
    RGBA = 'rgba(0,0,0,0.5)',
    TRANSITION_SUPPORT = ['OTransition',
                            'webkitTransition',
                            'MozTransition',
                            'transition'];

var name, l, EXPORTS, color;


module.exports = EXPORTS = {
    w3cStyle: !!WINDOW.getComputedStyle,
    ieStyle: !!DOC.documentElement.currentStyle,
    setattribute: !!STYLE.setAttribute,
    setproperty: !!STYLE.setProperty,
    transition: false,
    opacity: typeof STYLE.opacity !== 'undefined',
    filterOpacity: typeof STYLE.filter !== 'undefined',
    alphaColor: false
};

// try alpha color
try {
    STYLE.color = RGBA;
    color = STYLE.color;
    
    if (CORE.string(color)) {
        color = color.replace(/[ \r\n\t\s]+/g, '').toLowerCase();
    }

    if (RGBA === color) {
        EXPORTS.alphaColor = true;
    }
}
catch (e) {}

// detect transition
for (l = TRANSITION_SUPPORT.length; l--;) {
    name = TRANSITION_SUPPORT[l];
    if (typeof STYLE[name] !== 'undefined') {
        EXPORTS.transition = name;
        break;
    }
}


WINDOW = DOC = DIV = STYLE = null;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var DETECTED = __webpack_require__(11),
    WINDOW = global.window,
    ieVersion = DETECTED.ieVersion;

module.exports = {
        screensize: typeof WINDOW.innerWidth !== 'undefined',
        pagescroll: typeof WINDOW.pageXOffset !== 'undefined',
        rectmethod: !!WINDOW.document.documentElement.getBoundingClientRect,
        zoomfactor: ieVersion > 0 && ieVersion < 8,
        ie8: ieVersion === 8
    };

WINDOW = null;


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var DOCUMENT = global.document,
    ROOT = DOCUMENT.documentElement;

module.exports = {
    compare: !!ROOT.compareDocumentPosition,
    contains: !!ROOT.contains,
    defaultView: DOCUMENT.defaultView ?
                    'defaultView' :
                    DOCUMENT.parentWindow ?
                        'parentWindow' : null,
    querySelectorAll: !!DOCUMENT.querySelectorAll,
    listToArray: ROOT.childNodes instanceof Object
};

DOCUMENT = ROOT = null;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var WINDOW = global;

module.exports = {
    w3c: !!WINDOW.addEventListener,
    ie: !!WINDOW.attachEvent,
    customEvent: !!WINDOW.CustomEvent
};

WINDOW = null;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var DOCUMENT = global.document,
    ROOTSTYLE = DOCUMENT.documentElement.style,
    UNDEFINED = 'undefined';

module.exports = {
    range: !!DOCUMENT.createRange,
    textrange: !!DOCUMENT.createElement('input').createTextRange,
    cssUnselectable: typeof ROOTSTYLE.MozUserSelect !== UNDEFINED ?
                        'MozUserSelect' :
                        typeof ROOTSTYLE.webkitUserSelect !== UNDEFINED ?
                            'webkitUserSelect' : false
};


DOCUMENT = ROOTSTYLE = null;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *  Easing Formula taken from: http://gizma.com/easing
 *
 *  currentFrame = current frame
 *  startValue = start value
 *  endValue = end value
 *  totalFrames = total frame
 *  
 */
    


var EXPORTS = module.exports = {
        // simple linear tweening - no easing, no acceleration
        linear: linearTween,
        
        //  quadratic easing in - accelerating from zero velocity
        easeIn: easeInQuad,
        easeInQuad: easeInQuad,

        // quadratic easing out - decelerating to zero velocity
        easeOut: easeOutQuad,
        easeOutQuad: easeOutQuad,
        
        // quadratic easing in/out - acceleration until halfway,
        //                                  then deceleration
        easeInOut: easeInOutQuad,
        easeInOutQuad: easeInOutQuad,
        
        // cubic easing in - accelerating from zero velocity
        easeInCubic: easeInCubic,
        
        // cubic easing out - decelerating to zero velocity
        easeOutCubic: easeOutCubic,
        
        // cubic easing in/out - acceleration until halfway, then deceleration
        easeInOutCubic: easeInOutCubic,
        
        // quartic easing in - accelerating from zero velocity
        easeInQuart: easeInQuart,
        
        // quartic easing out - decelerating to zero velocity
        easeOutQuart: easeOutQuart,
        
        // quartic easing in/out - acceleration until halfway, then deceleration
        easeInOutQuart: easeInOutQuart,

        // quintic easing in - accelerating from zero velocity
        easeInQuint: easeInQuint,
        
        // quintic easing out - decelerating to zero velocity
        easeOutQuint: easeOutQuint,

        // quintic easing in/out - acceleration until halfway, then deceleration
        easeInOutQuint: easeInOutQuint,

		// sinusoidal easing in - accelerating from zero velocity
        easeInSine: easeInSine,	

        // sinusoidal easing out - decelerating to zero velocity
        easeOutSine: easeOutSine,		

        // sinusoidal easing in/out - accelerating until halfway,
        //          then decelerating
        easeInOutSine: easeInOutSine,
        
        // exponential easing in - accelerating from zero velocity
        easeInExpo: easeInExpo,

        // exponential easing out - decelerating to zero velocity
        easeOutExpo: easeOutExpo,
        

        // exponential easing in/out - accelerating until halfway,
        //                      then decelerating
        easeInOutExpo: easeInOutExpo,
        
        // circular easing in - accelerating from zero velocity
        easeInCirc: easeInCirc,
        
        // circular easing out - decelerating to zero velocity
        easeOutCirc: easeOutCirc,
        
        // circular easing in/out - acceleration until halfway,
        //                      then deceleration
        easeInOutCirc: easeInOutCirc
        
    };
    
// simple linear tweening - no easing, no acceleration
function linearTween(currentFrame, startValue, endValue, totalFrames) {
	return endValue *
                currentFrame / totalFrames + startValue;
}

//  quadratic easing in - accelerating from zero velocity
function easeInQuad(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
	return endValue * currentFrame * currentFrame + startValue;
}

// quadratic easing out - decelerating to zero velocity
function easeOutQuad(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
	return -endValue * currentFrame * (currentFrame-2) + startValue;
}

		

// quadratic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuad(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        return endValue / 2 * currentFrame * currentFrame + startValue;
    }
    
	currentFrame--;
	return -endValue / 2 *
                (currentFrame * (currentFrame - 2) - 1) + startValue;
}


// cubic easing in - accelerating from zero velocity
function easeInCubic(currentFrame, startValue, endValue, totalFrames) {
    
	currentFrame /= totalFrames;
    
	return endValue * currentFrame * currentFrame * currentFrame + startValue;
}

		

// cubic easing out - decelerating to zero velocity
function easeOutCubic(currentFrame, startValue, endValue, totalFrames) {
    
	currentFrame /= totalFrames;
	currentFrame--;
	return endValue *
                (currentFrame * currentFrame * currentFrame + 1) +
                startValue;
}

		

// cubic easing in/out - acceleration until halfway, then deceleration
function easeInOutCubic(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        return endValue / 2 *
                currentFrame * currentFrame * currentFrame + startValue;
    }
    
	currentFrame -= 2;
	return endValue / 2 *
            (currentFrame * currentFrame * currentFrame + 2) + startValue;
}
	

// quartic easing in - accelerating from zero velocity
function easeInQuart(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
    
	return endValue *
            currentFrame * currentFrame * currentFrame * currentFrame +
            startValue;
}

		

// quartic easing out - decelerating to zero velocity
function easeOutQuart(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
	currentFrame--;
    
	return -endValue *
            (currentFrame * currentFrame * currentFrame * currentFrame - 1) +
            startValue;
}

		

// quartic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuart(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        return endValue / 2 *
                    currentFrame * currentFrame * currentFrame * currentFrame +
                    startValue;
    }
    
	currentFrame -= 2;
	return -endValue / 2 *
            (currentFrame * currentFrame * currentFrame * currentFrame - 2) +
            startValue;
}


// quintic easing in - accelerating from zero velocity
function easeInQuint(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
    
	return endValue *
            currentFrame * currentFrame * currentFrame *
            currentFrame * currentFrame + startValue;
}

		

// quintic easing out - decelerating to zero velocity
function easeOutQuint(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
	currentFrame--;
    
	return endValue *
                (currentFrame * currentFrame * currentFrame *
                 currentFrame * currentFrame + 1) + startValue;
}

		

// quintic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuint(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        
        return endValue / 2 *
                currentFrame * currentFrame * currentFrame *
                currentFrame * currentFrame + startValue;
    }
    
	currentFrame -= 2;
	return endValue / 2 *
            (currentFrame * currentFrame * currentFrame *
                currentFrame * currentFrame + 2) + startValue;
}
		

// sinusoidal easing in - accelerating from zero velocity
function easeInSine(currentFrame, startValue, endValue, totalFrames) {
    var M = Math;
    
	return -endValue *
            M.cos(currentFrame / totalFrames * (M.PI / 2)) +
            endValue + startValue;
}

		

// sinusoidal easing out - decelerating to zero velocity
function easeOutSine(currentFrame, startValue, endValue, totalFrames) {
    var M = Math;
    
	return endValue *
            M.sin(currentFrame / totalFrames * (M.PI / 2)) + startValue;
}

		

// sinusoidal easing in/out - accelerating until halfway, then decelerating
function easeInOutSine(currentFrame, startValue, endValue, totalFrames) {
    var M = Math;
    
	return -endValue / 2 *
            (M.cos(M.PI * currentFrame / totalFrames) - 1) + startValue;
}

		

// exponential easing in - accelerating from zero velocity
function easeInExpo(currentFrame, startValue, endValue, totalFrames) {
	return endValue *
            Math.pow(2, 10 * (currentFrame / totalFrames - 1)) + startValue;
}

		

// exponential easing out - decelerating to zero velocity
function easeOutExpo(currentFrame, startValue, endValue, totalFrames) {
	return endValue *
            (-Math.pow(2, -10 * currentFrame / totalFrames ) + 1) + startValue;
}

		

// exponential easing in/out - accelerating until halfway, then decelerating
function easeInOutExpo(currentFrame, startValue, endValue, totalFrames) {
    var M = Math;
    
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        return endValue / 2 * M.pow(2, 10 * (currentFrame - 1)) + startValue;
    }
	currentFrame--;
    
	return endValue / 2 * (-M.pow(2, -10 * currentFrame) + 2) + startValue;
}
		

// circular easing in - accelerating from zero velocity
function easeInCirc(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
    
	return -endValue *
            (Math.sqrt(1 - currentFrame * currentFrame) - 1) + startValue;
}

		

// circular easing out - decelerating to zero velocity
function easeOutCirc(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
	currentFrame--;
    
	return endValue * Math.sqrt(1 - currentFrame * currentFrame) + startValue;
}

		

// circular easing in/out - acceleration until halfway, then deceleration
function easeInOutCirc(currentFrame, startValue, endValue, totalFrames) {
    var M = Math;
    
	currentFrame /= totalFrames / 2;
	if (currentFrame < 1) {
        return -endValue / 2 *
                    (M.sqrt(1 - currentFrame * currentFrame) - 1) + startValue;
    }
	currentFrame -= 2;
	return endValue / 2 *
                (M.sqrt(1 - currentFrame * currentFrame) + 1) + startValue;
}


module.exports = EXPORTS;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var DETECTED = __webpack_require__(3),
    STRING = __webpack_require__(2),
    DOM = __webpack_require__(4),
    DIMENSION = __webpack_require__(9),
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

function select(element, endElement) {
    var dimension = DIMENSION;
    
    if (DOM.is(element, 9)) {
        element = element.body;
    }
    
    if (!dimension.visible(element)) {
        throw new Error(STRING[1101]);
    }
    
    if (arguments.length < 2) {
        endElement = null;
    }
    
    if (endElement !== null && !dimension.visible(endElement)) {
        throw new Error(ERROR_DOM);
    }
    
    SELECT_ELEMENT(element, endElement);
    
    return EXPORTS.chain;
    
}

function clear(document) {
    if (!DOM.is(document, 9)) {
        if (arguments.length > 0) {
            throw new Error(STRING[1104]);
        }
        else {
            document = global.document;
        }
    }
    
    CLEAR_SELECTION(document);
    
    return EXPORTS.chain;
}

function unselectable(element, disableSelect) {
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_DOM);
    }
    
    UNSELECTABLE(element, disableSelect === false);
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
    
    document = selection = startRange = endRange;
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ })
/******/ ]);
});