(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define("libdom", [], factory); else if (typeof exports === "object") exports["libdom"] = factory(); else root["libdom"] = factory();
})(this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "/assets/";
        return __webpack_require__(0);
    }([ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(1);
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var detect = __webpack_require__(2), EXPORTS = {
                version: "0.0.7",
                info: detect
            };
            var css, event, dimension, selection;
            function notBrowser() {
                throw new Error("Unable to proceed, not running in a browser.");
            }
            function applyIf(api, moduleObject, access) {
                var hasOwn = Object.prototype.hasOwnProperty, handler = detect ? false : notBrowser;
                var name;
                for (name in access) {
                    if (hasOwn.call(access, name)) {
                        api[name] = handler || moduleObject[access[name]];
                    }
                }
            }
            applyIf(EXPORTS, __webpack_require__(9), {
                is: "is",
                isView: "isView",
                contains: "contains",
                select: "select",
                eachNodePreorder: "eachPreorder",
                eachNodePostorder: "eachPostorder",
                eachNodeLevelorder: "eachLevel"
            });
            applyIf(EXPORTS, css = __webpack_require__(11), {
                addClass: "add",
                removeClass: "remove"
            });
            applyIf(EXPORTS, event = __webpack_require__(12), {
                on: "on",
                un: "un",
                purge: "purge",
                dispatch: "fire"
            });
            applyIf(EXPORTS, dimension = __webpack_require__(13), {
                offset: "offset",
                size: "size",
                box: "box",
                scroll: "scroll",
                screen: "screen"
            });
            applyIf(EXPORTS, selection = __webpack_require__(14), {
                highlight: "select",
                noHighlight: "unselectable",
                clearHighlight: "clear"
            });
            applyIf(EXPORTS, __webpack_require__(15), {
                colorParse: "parse"
            });
            if (detect) {
                css.chain = event.chain = dimension.chain = selection.chain = EXPORTS;
            }
            module.exports = global["libdom"] = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var browser = __webpack_require__(3), EXPORTS = false;
        if (browser) {
            EXPORTS = {
                browser: browser,
                event: __webpack_require__(4),
                dom: __webpack_require__(5),
                css: __webpack_require__(6),
                dimension: __webpack_require__(7),
                selection: __webpack_require__(8)
            };
        }
        module.exports = EXPORTS;
    }, function(module, exports) {
        (function(global) {
            "use strict";
            var WINDOW = global, EXPORTS = false;
            var match, ieVersion;
            var DOCUMENT;
            if (typeof WINDOW.window === "object") {
                DOCUMENT = WINDOW.document;
                if (typeof DOCUMENT === "object" && (DOCUMENT.defaultView || DOCUMENT.parentWindow).document === DOCUMENT) {
                    match = WINDOW.navigator.userAgent.match(/msie ([0-9]+\.[0-9]+)/i);
                    ieVersion = match && parseInt(match[1], 10) || 0;
                    EXPORTS = {
                        strict: DOCUMENT.compatMode === "CSS1Compat",
                        ieVersion: ieVersion,
                        ie8: ieVersion === 8
                    };
                }
            }
            module.exports = EXPORTS;
            DOCUMENT = null;
            WINDOW = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports) {
        (function(global) {
            "use strict";
            var WINDOW = global;
            module.exports = {
                w3c: !!WINDOW.addEventListener,
                ie: !!WINDOW.attachEvent,
                customEvent: !!WINDOW.CustomEvent
            };
            WINDOW = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var DETECTED = __webpack_require__(3), DOCUMENT = global.document, ROOT = DOCUMENT.documentElement, ieVersion = DETECTED.ieVersion;
            module.exports = {
                compare: !!ROOT.compareDocumentPosition,
                contains: !!ROOT.contains,
                defaultView: DOCUMENT.defaultView ? "defaultView" : DOCUMENT.parentWindow ? "parentWindow" : null,
                querySelectorAll: !!DOCUMENT.querySelectorAll,
                listToArray: ieVersion === 0 || ieVersion > 8
            };
            DOCUMENT = ROOT = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports) {
        (function(global) {
            "use strict";
            var WINDOW = global, ROOT = WINDOW.document.documentElement, STYLE = ROOT.style, TRANSITION_SUPPORT = [ "OTransition", "webkitTransition", "MozTransition", "transition" ];
            var name, l, EXPORTS;
            module.exports = EXPORTS = {
                w3cStyle: !!WINDOW.getComputedStyle,
                ieStyle: !!ROOT.currentStyle,
                setattribute: !!STYLE.setAttribute,
                setproperty: !!STYLE.setProperty,
                transition: false
            };
            for (l = TRANSITION_SUPPORT.length; l--; ) {
                name = TRANSITION_SUPPORT[l];
                if (typeof STYLE[name] !== "undefined") {
                    EXPORTS.transition = name;
                    break;
                }
            }
            WINDOW = ROOT = STYLE = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var DETECTED = __webpack_require__(3), WINDOW = global.window, ieVersion = DETECTED.ieVersion;
            module.exports = {
                screensize: typeof WINDOW.innerWidth !== "undefined",
                pagescroll: typeof WINDOW.pageXOffset !== "undefined",
                rectmethod: !!WINDOW.document.documentElement.getBoundingClientRect,
                zoomfactor: ieVersion > 0 && ieVersion < 8,
                ie8: ieVersion === 8
            };
            WINDOW = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports) {
        (function(global) {
            "use strict";
            var DOCUMENT = global.document, ROOTSTYLE = DOCUMENT.documentElement.style, UNDEFINED = "undefined";
            module.exports = {
                range: !!DOCUMENT.createRange,
                textrange: !!DOCUMENT.createElement("input").createTextRange,
                cssUnselectable: typeof ROOTSTYLE.MozUserSelect !== UNDEFINED ? "MozUserSelect" : typeof ROOTSTYLE.webkitUserSelect !== UNDEFINED ? "webkitUserSelect" : false
            };
            DOCUMENT = ROOTSTYLE = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var DETECTED = __webpack_require__(2), STRING = __webpack_require__(10), OBJECT_TYPE = "[object Object]", ORDER_TYPE_PREORDER = 1, ORDER_TYPE_POSTORDER = 2, ORDER_TYPE_LEVELORDER = 3, ERROR_INVALID_DOM = STRING.ERROR_ELEMENT, ERROR_INVALID_DOM_NODE = STRING.ERROR_NODE, ERROR_INVALID_CSS_SELECTOR = STRING.ERROR_SELECTOR, ERROR_INVALID_CALLBACK = STRING.ERROR_TREE_CALLBACK, ERROR_INVALID_ELEMENT_CONFIG = STRING.ERROR_DOM_CONFIG, INVALID_DESCENDANT_NODE_TYPES = {
            9: 1,
            11: 1
        }, STD_CONTAINS = notSupportedContains, OBJECT_TOSTRING = Object.prototype.toString, EXPORTS = {
            contains: contains,
            is: isDom,
            isView: isDefaultView,
            eachPreorder: preOrderTraverse,
            eachPostorder: postOrderTraverse,
            eachLevel: levelTraverse,
            documentViewAccess: "defaultView",
            select: notSupportedQuerySelector,
            add: add,
            remove: remove,
            find: find
        };
        var DOM_INFO;
        function contains(ancestor, descendant) {
            var str = STRING, is = isDom;
            if (!is(ancestor, 1, 9, 11)) {
                throw new Error(str.ERROR_DOM);
            }
            if (!is(descendant) || descendant.nodeType in INVALID_DESCENDANT_NODE_TYPES) {
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
            return config && typeof config === "string" ? config : false;
        }
        function applyConfigToElement(element, config) {
            var hasOwn = Object.prototype.hasOwnProperty, toString = OBJECT_TOSTRING, objectType = OBJECT_TYPE, string = "string";
            var name, value, item, itemName;
            if (toString.call(config) === objectType) {
                main: for (name in config) {
                    if (hasOwn.call(name, config)) {
                        value = config[name];
                        switch (name) {
                          case "tagName":
                            continue main;

                          case "class":
                            if (typeof value !== string) {
                                continue main;
                            }
                            name = "className";
                            break;

                          case "for":
                            if (typeof value !== string) {
                                continue main;
                            }
                            name = "htmlFor";
                            break;

                          case "style":
                            item = element.style;
                            if (typeof value === string) {
                                item.cssText = value;
                            } else if (toString.call(value) === objectType) {
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
            var number = "number", is = isFinite;
            var index, counter, any;
            if (isDom(node, 1, 3, 4, 7, 8) && node.parentNode === element) {
                return node;
            } else if (typeof node === number && is(node) && node > -1) {
                index = node;
                counter = -1;
                any = typeof nodeType !== number || !is(nodeType);
                node = element.firstChild;
                for (;node; node = node.nextSibling) {
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
            (result = []).length = l = list.length;
            for (;l--; ) {
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
        function preOrderTraverse(element, callback, context) {
            return orderTraverse(element, callback, ORDER_TYPE_PREORDER, context);
        }
        function postOrderTraverse(element, callback, context) {
            return orderTraverse(element, callback, ORDER_TYPE_POSTORDER, context);
        }
        function levelTraverse(element, callback, context) {
            return orderTraverse(element, callback, ORDER_TYPE_LEVELORDER, context);
        }
        function orderTraverse(element, callback, orderType, context) {
            var depth = 0, isPostOrder = 0;
            var queue, last, node, current;
            if (!isDom(element, 1)) {
                throw new Error(ERROR_INVALID_DOM);
            }
            if (!(callback instanceof Function)) {
                throw new Error(ERROR_INVALID_CALLBACK);
            }
            if (typeof context === "undefined") {
                context = null;
            }
            switch (orderType) {
              case ORDER_TYPE_LEVELORDER:
                queue = last = {
                    node: element,
                    next: null
                };
                for (;queue; queue = queue.next) {
                    node = queue.node;
                    queue.node = null;
                    for (;node; node = node.nextSibling) {
                        current = node.firstChild;
                        if (callback.call(context, current) === false) {
                            break;
                        }
                        if (current) {
                            last.next = {
                                node: current,
                                next: null
                            };
                            last = last.next;
                        }
                    }
                }
                break;

              case ORDER_TYPE_POSTORDER:
                isPostOrder = 1;

              case ORDER_TYPE_PREORDER:
                main: for (current = element; current; ) {
                    if (!isPostOrder && current.nodeType === 1 && callback.call(context, current) === false) {
                        break;
                    }
                    node = current.firstChild;
                    if (node) {
                        depth++;
                    } else {
                        if (isPostOrder && current.nodeType === 1 && callback.call(context, current) === false) {
                            break;
                        }
                        node = current.nextSibling;
                        for (;!node && depth-- && current; ) {
                            current = current.parentNode;
                            if (isPostOrder && current.nodeType === 1 && callback.call(context, current) === false) {
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
        function isDom(node) {
            var is = isFinite, number = "number";
            var type, c, len, items, match, matched;
            if (node && typeof node === "object") {
                type = node.nodeType;
                if (typeof type === number && is(type)) {
                    items = arguments;
                    len = Math.max(items.length - 1, 0);
                    matched = !len;
                    for (c = 0; len--; ) {
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
            return !!defaultView && (type === "object" || type === "function") && defaultView.self === defaultView.window && !!defaultView.document;
        }
        DOM_INFO = DETECTED && DETECTED.dom;
        if (DOM_INFO) {
            STD_CONTAINS = DOM_INFO.compare ? w3cContains : DOM_INFO.contains ? ieContains : notSupportedContains;
            if (DOM_INFO.querySelectorAll) {
                EXPORTS.select = DOM_INFO.listToArray ? toArrayQuerySelectorAll : noArrayQuerySelectorAll;
            }
        }
        module.exports = EXPORTS.chain = EXPORTS;
    }, function(module, exports) {
        "use strict";
        var SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/, CAMEL_RE = /[^a-z]+[a-z]/gi, STYLIZE_RE = /^([Mm]oz|[Ww]ebkit|[Mm]s|[oO])[A-Z]/, EXPORTS = {
            camelize: camelize,
            stylize: stylize,
            addWord: addWord,
            removeWord: removeWord,
            ERROR_ELEMENT: "Invalid DOM [element] parameter.",
            ERROR_DOM: "Invalid [dom] Object parameter.",
            ERROR_NODE: "Invalid DOM [node] parameter.",
            ERROR_DOC: "Invalid DOM [document] parameter.",
            ERROR_SELECTOR: "Invalid CSS [selector] parameter.",
            ERROR_TREE_CALLBACK: "Invalid tree traverse [callback] parameter.",
            ERROR_DOM_CONFIG: "Invalid DOM Element [config] parameter.",
            ERROR_RULE: "Invalid [style] Rule parameter.",
            ERROR_OBSERV: "Invalid [observable] parameter.",
            ERROR_EVENTTYPE: "Invalid Event [type] parameter.",
            ERROR_EVENTHNDL: "Invalid Event [handler] parameter.",
            ERROR_NS_ATTRSTYLE: "Style Attribute manipulation is not supported",
            ERROR_NS_COMPSTYLE: "Computed style is not supported in this browser.",
            ERROR_NS_SELQUERY: "CSS Selector query form DOM is not supported.",
            ERROR_NS_POSITION: "DOM position comparison is not supported.",
            ERROR_NS_MARK: "DOM selection not supported."
        };
        function camelize(str) {
            return str.replace(CAMEL_RE, onCamelizeMatch);
        }
        function onCamelizeMatch(all) {
            return all[all.length - 1].toUpperCase();
        }
        function onStylizeMatch(all, match) {
            var found = match.toLowerCase(), len = found.length;
            if (found === "moz") {
                found = "Moz";
            }
            return found + all.substring(len, all.length);
        }
        function stylize(str) {
            return camelize(str).replace(STYLIZE_RE, onStylizeMatch);
        }
        function addWord(str, items) {
            var c = -1, l = items.length;
            var cl, name;
            str = str.split(SEPARATE_RE);
            cl = str.length;
            for (;l--; ) {
                name = items[++c];
                if (name && typeof name === "string" && str.indexOf(name) === -1) {
                    str[cl++] = name;
                }
            }
            return str.join(" ");
        }
        function removeWord(str, items) {
            var c = -1, l = items.length;
            var cl, total, name;
            str = str.split(SEPARATE_RE);
            total = str.length;
            for (;l--; ) {
                name = items[++c];
                for (cl = total; cl--; ) {
                    if (name === str[cl]) {
                        str.splice(cl, 1);
                        total--;
                    }
                }
            }
            return str.join(" ");
        }
        module.exports = EXPORTS;
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var STRING = __webpack_require__(10), DETECTED = __webpack_require__(2), DOM = __webpack_require__(9), DIMENSION_RE = /width|height|(margin|padding).*|border.+(Width|Radius)/, EM_OR_PERCENT_RE = /%|em/, CSS_MEASUREMENT_RE = /^([0-9]+(\.[0-9]+)?)(em|px|\%|pt|vh|vw|cm|ex|in|mm|pc|vmin)$/, WIDTH_RE = /width/i, NUMBER_RE = /\d/, SET_STYLE = styleManipulationNotSupported, GET_STYLE = styleManipulationNotSupported, REMOVE_STYLE = styleManipulationNotSupported, ERROR_INVALID_DOM = STRING.ERROR_ELEMENT, EXPORTS = {
                add: addClass,
                remove: removeClass,
                computedStyle: computedStyleNotSupported,
                style: applyStyle,
                unitValue: getCSSUnitValue
            }, SLICE = Array.prototype.slice;
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
            function computedStyleNotSupported() {
                throw new Error(STRING.ERROR_NS_COMPSTYLE);
            }
            function w3cGetCurrentStyle(element) {
                var camel = STRING.stylize;
                var style, list, c, l, name, values;
                if (!DOM.is(element, 1)) {
                    throw new Error(ERROR_INVALID_DOM);
                }
                style = global.getComputedStyle(element);
                values = {};
                list = SLICE.call(arguments, 1);
                for (c = -1, l = list.length; l--; ) {
                    name = list[++c];
                    if (name && typeof name === "string") {
                        values[name] = style[camel(name)];
                    }
                }
                style = null;
                return values;
            }
            function ieGetCurrentStyle(element) {
                var dimensionRe = DIMENSION_RE, camel = STRING.stylize, pixelSize = getPixelSize;
                var style, list, c, l, name, value, access, fontSize, values;
                if (!DOM.is(element, 1)) {
                    throw new Error(ERROR_INVALID_DOM);
                }
                style = element.currentStyle;
                fontSize = false;
                values = {};
                list = SLICE.call(arguments, 1);
                for (c = -1, l = list.length; l--; ) {
                    name = list[++c];
                    if (name && typeof name === "string") {
                        access = camel(name);
                        if (dimensionRe.test(access) && style[access] !== "auto") {
                            if (fontSize === false) {
                                fontSize = pixelSize(element, style, "fontSize", null);
                            }
                            value = pixelSize(element, style, access, fontSize) + "px";
                        } else if (access === "float") {
                            value = style.styleFloat;
                        } else {
                            value = style[access];
                        }
                        values[name] = value;
                    }
                }
                style = value = null;
                return values;
            }
            function getPixelSize(element, style, property, fontSize) {
                var sizeWithSuffix = style[property], size = parseFloat(sizeWithSuffix), suffix = sizeWithSuffix.split(NUMBER_RE)[0];
                var parent;
                switch (suffix) {
                  case "in":
                    return size * 96;

                  case "pt":
                    return size * 96 / 72;

                  case "em":
                  case "%":
                    if (!fontSize) {
                        parent = element.parentElement;
                        fontSize = EM_OR_PERCENT_RE.test(suffix) && parent ? getPixelSize(parent, parent.currentStyle, "fontSize", null) : 16;
                        parent = null;
                    }
                    return suffix === "em" ? size * fontSize : size / 100 * (property == "fontSize" ? fontSize : WIDTH_RE.test(property) ? element.clientWidth : element.clientHeight);

                  default:
                    return size;
                }
            }
            function applyStyle(element, style) {
                var O = Object.prototype, is = isFinite, camelize = STRING.stylize, parse = parseCSSText;
                var hasOwn, name, value, type, elementStyle;
                if (!DOM.is(element, 1)) {
                    throw new Error(ERROR_INVALID_DOM);
                }
                if (arguments.length > 1) {
                    if (typeof style === "string") {
                        style = parse(style);
                    }
                    if (O.toString.call(style) !== "[object Object]") {
                        throw new Error(STRING.ERROR_RULE);
                    }
                    hasOwn = O.hasOwnProperty;
                    elementStyle = element.style;
                    for (name in style) {
                        if (hasOwn.call(style, name)) {
                            value = style[name];
                            type = typeof value;
                            if (value === null || type === "undefined") {
                                REMOVE_STYLE(elementStyle, camelize(name), value);
                            } else if (value && type === "string" || type === "number" && is(value)) {
                                SET_STYLE(elementStyle, camelize(name), value);
                            }
                        }
                    }
                    elementStyle = null;
                    return EXPORTS.chain;
                }
                return parse(element.style.cssText);
            }
            function parseCSSText(str) {
                var STATE_NAME = 1, STATE_VALUE = 2, state = STATE_NAME, c = -1, l = str.length, il = 0, name = [], result = {};
                var chr, value;
                for (;l--; ) {
                    chr = str.charAt(++c);
                    switch (state) {
                      case STATE_NAME:
                        if (chr === ":") {
                            name = name.join("");
                            value = [];
                            il = 0;
                        } else {
                            name[il++] = chr;
                        }
                        break;

                      case STATE_VALUE:
                        if (chr === ";" || !l) {
                            result[name] = value.join("");
                            name = [];
                            il = 0;
                        } else {
                            value[il++] = chr;
                        }
                    }
                }
                return result;
            }
            function getCSSUnitValue(value) {
                var is = isFinite;
                switch (typeof value) {
                  case "number":
                    if (is(value)) {
                        return value;
                    }
                    break;

                  case "string":
                    if (value === "auto" || value === "inherit" || CSS_MEASUREMENT_RE.test(value)) {
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
                throw new Error(STRING.ERROR_NS_ATTRSTYLE);
            }
            function w3cSetStyleValue(style, name, value) {
                style.setProperty(name, value, style.getPropertyPriority(name) || "");
            }
            function w3cGetStyleValue(style, name) {
                return style.getPropertyValue(name);
            }
            function w3cRemoveStyleValue(style, name) {
                style.removeProperty(name);
            }
            function ieSetStyleValue(style, name, value) {
                style.setAttribute(name, value);
            }
            function ieGetStyleValue(style, name) {
                return style.getAttribute(name);
            }
            function ieRemoveStyleValue(style, name) {
                style.removeAttribute(name);
            }
            CSS_INFO = DETECTED && DETECTED.css;
            if (CSS_INFO) {
                EXPORTS.computedStyle = CSS_INFO.w3cStyle ? w3cGetCurrentStyle : CSS_INFO.ieStyle ? ieGetCurrentStyle : computedStyleNotSupported;
                if (CSS_INFO.setattribute) {
                    SET_STYLE = ieSetStyleValue;
                    GET_STYLE = ieGetStyleValue;
                    REMOVE_STYLE = ieRemoveStyleValue;
                } else if (CSS_INFO.setproperty) {
                    SET_STYLE = w3cSetStyleValue;
                    GET_STYLE = w3cGetStyleValue;
                    REMOVE_STYLE = w3cRemoveStyleValue;
                }
            }
            module.exports = EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var INFO = __webpack_require__(2), STRING = __webpack_require__(10), DOM = __webpack_require__(9), EVENTS = null, PAGE_UNLOADED = false, IE_CUSTOM_EVENTS = {}, HAS_OWN_PROPERTY = Object.prototype.hasOwnProperty, ERROR_OBSERVABLE_NO_SUPPORT = STRING.ERROR_OBSERV, ERROR_INVALID_TYPE = STRING.ERROR_EVENTTYPE, ERROR_INVALID_HANDLER = STRING.ERROR_EVENTHNDL, IE_CUSTOM_TYPE_EVENT = "propertychange", EXPORTS = module.exports = {
                on: listen,
                un: unlisten,
                fire: dispatch,
                purge: purge
            };
            var RESOLVE, LISTEN, UNLISTEN, DISPATCH, EVENT_INFO, IS_CAPABLE, SUBJECT;
            function listen(observable, type, handler, context) {
                var last = EVENTS;
                var current;
                if (!type || typeof type !== "string") {
                    throw new Error(ERROR_INVALID_TYPE);
                }
                if (!(handler instanceof Function)) {
                    throw new Error(ERROR_INVALID_HANDLER);
                }
                observable = RESOLVE(observable);
                if (!observable) {
                    throw new Error(ERROR_OBSERVABLE_NO_SUPPORT);
                }
                if (typeof context === "undefined") {
                    context = null;
                }
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
                var found, len;
                if (!type || typeof type !== "string") {
                    throw new Error(ERROR_INVALID_TYPE);
                }
                if (!(handler instanceof Function)) {
                    throw new Error(ERROR_INVALID_HANDLER);
                }
                observable = RESOLVE(observable);
                if (!observable) {
                    throw new Error(ERROR_OBSERVABLE_NO_SUPPORT);
                }
                if (typeof context === "undefined") {
                    context = null;
                }
                found = filter(observable, type, handler, context);
                for (len = found.length; len--; ) {
                    found[len].unlisten();
                }
                return EXPORTS.chain;
            }
            function dispatch(observable, type, defaults) {
                if (!type || typeof type !== "string") {
                    throw new Error(ERROR_INVALID_TYPE);
                }
                observable = RESOLVE(observable);
                if (!observable) {
                    throw new Error(ERROR_OBSERVABLE_NO_SUPPORT);
                }
                return DISPATCH(observable, type, defaults);
            }
            function purge() {
                var found = filter.apply(null, arguments), len = found.length;
                for (;len--; ) {
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
                var last = EVENTS, found = [], len = 0, argLen = arguments.length, HAS_OBSERVABLE = 0, HAS_TYPE = 0, HAS_HANDLER = 0, HAS_CONTEXT = 0;
                switch (true) {
                  case argLen > 3:
                    HAS_CONTEXT = 1;

                  case argLen > 2:
                    HAS_HANDLER = 1;

                  case argLen > 1:
                    HAS_TYPE = 1;

                  case argLen > 0:
                    HAS_OBSERVABLE = 1;
                }
                for (;last; last = last.head) {
                    if (HAS_OBSERVABLE && last[0] !== observable || HAS_TYPE && last[1] !== type || HAS_HANDLER && last[2] !== handler || HAS_CONTEXT && last[3] !== context) {
                        continue;
                    }
                    found[len++] = last;
                }
                return found;
            }
            function w3cListen(observable, type, handler, context) {
                var listener = w3cCreateHandler(handler, context);
                observable.addEventListener(type, listener, false);
                return [ observable, type, handler, context, listener ];
            }
            function w3cUnlisten(observable, type, listener) {
                observable.removeEventListener(type, listener, false);
            }
            function w3cDispatch(observable, type, properties) {
                var hasOwn = HAS_OWN_PROPERTY, event = global.document.createEvent("Event");
                var name;
                event.initEvent(type, properties.bubbles !== false, properties.cancelable !== false);
                for (name in properties) {
                    if (hasOwn.call(properties, name) && !(name in event)) {
                        event[name] = properties[name];
                    }
                }
                observable.dispatchEvent(event);
                return event;
            }
            function w3cObservable(observable) {
                var F = Function;
                return observable && typeof observable === "object" && observable.addEventListener instanceof F && observable.removeEventListener instanceof F && observable.dispatchEvent instanceof F ? observable : false;
            }
            function w3cCreateHandler(handler, context) {
                function onEvent(event) {
                    return handler.call(context, event, event.target);
                }
                return onEvent;
            }
            function ieListen(observable, type, handler, context) {
                var isCustomEvent = ieTestCustomEvent(observable, type);
                var listener = isCustomEvent ? ieCreateCustomHandler(type, handler, context) : ieCreateHandler(handler, context);
                observable.attachEvent("on" + (isCustomEvent ? IE_CUSTOM_TYPE_EVENT : type), listener);
                return [ observable, type, handler, context, listener ];
            }
            function ieUnlisten(observable, type, listener) {
                observable.detachEvent("on" + (listener.customType ? IE_CUSTOM_TYPE_EVENT : type), listener);
            }
            function ieDispatch(observable, type, properties) {
                var hasOwn = HAS_OWN_PROPERTY, event = global.document.createEventObject();
                var name, node;
                for (name in properties) {
                    if (hasOwn.call(properties, name) && !(name in event)) {
                        event[name] = properties[name];
                    }
                }
                if (ieTestCustomEvent(observable, type)) {
                    event.customType = type;
                    type = IE_CUSTOM_TYPE_EVENT;
                }
                name = "on" + type;
                if (DOM.is(observable, 1) && properties.bubbles !== false) {
                    for (node = observable; node; node = node.parentNode) {
                        node.fireEvent(name, event);
                        if (event.cancelBubble) {
                            break;
                        }
                    }
                } else {
                    observable.fireEvent(name, event);
                }
                if (properties.cancelable === false) {
                    event.returnValue = true;
                }
                node = null;
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
                    return handler.call(context, event, event.target || event.srcElement);
                }
                return onEvent;
            }
            function ieCreateCustomHandler(type, handler, context) {
                function onEvent() {
                    var event = global.event;
                    if (event.customType === type) {
                        return handler.call(context, event, event.target || event.srcElement);
                    }
                }
                onEvent.customType = true;
                return onEvent;
            }
            function ieTestCustomEvent(observable, type) {
                var supported = false, list = IE_CUSTOM_EVENTS, ontype = "on" + type;
                var element, access;
                if (observable.nodeType === 9) {
                    observable = observable.documentElement;
                }
                if (observable.nodeType === 1) {
                    access = observable.tagName + ":" + type;
                    if (access in list) {
                        return list[access];
                    }
                    ontype = "on" + type;
                    element = observable.cloneNode(false);
                    supported = ontype in element;
                    if (!supported) {
                        element.setAttribute(ontype, "return;");
                        supported = typeof element[ontype] === "function";
                    }
                    element = null;
                    list[access] = !supported;
                    return !supported;
                }
                return false;
            }
            function onBeforeUnload() {
                if (!PAGE_UNLOADED) {
                    PAGE_UNLOADED = true;
                    purge();
                }
            }
            RESOLVE = LISTEN = UNLISTEN = DISPATCH;
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
                if (IS_CAPABLE) {
                    SUBJECT = global;
                    listen(SUBJECT, "beforeunload", onBeforeUnload);
                    listen(SUBJECT, "unload", onBeforeUnload);
                    SUBJECT = null;
                }
            }
            EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var DETECTED = __webpack_require__(2), STRING = __webpack_require__(10), DOM = __webpack_require__(9), CSS = __webpack_require__(11), ERROR_INVALID_ELEMENT = STRING.ERROR_ELEMENT, ERROR_INVALID_DOM = STRING.ERROR_DOM, DEFAULTVIEW = null, ELEMENT_VIEW = 1, PAGE_VIEW = 2, USE_ZOOM_FACTOR = false, IE_PAGE_STAT_ACCESS = "documentElement", boundingRect = false, getPageScroll = null, getOffset = null, getSize = null, getBox = null, getScreenSize = null, EXPORTS = {
                offset: offset,
                size: size,
                box: box,
                scroll: scroll,
                screen: screen,
                visible: visible
            };
            var DIMENSION_INFO, IEVERSION;
            function offset(element, x, y) {
                if (arguments.length > 1) {
                    return box(element, x, y);
                }
                switch (isViewable(element)) {
                  case PAGE_VIEW:
                    return pageBox(element).slice(0, 2);

                  case ELEMENT_VIEW:
                    return getOffset(element);
                }
                throw new Error(ERROR_INVALID_ELEMENT);
            }
            function size(element, width, height) {
                if (arguments.length > 1) {
                    return box(element, null, null, width, height);
                }
                return isViewable(element) === PAGE_VIEW ? pageBox(element).slice(2, 4) : getSize(element);
            }
            function box(element, x, y, width, height) {
                var css = CSS, toFloat = parseFloat, cssValue = css.unitValue, NUMBER = "number", setter = arguments.length > 1, viewmode = isViewable(element);
                var hasLeft, hasTop, hasWidth, hasHeight, parent, hasPosition, hasSize, diff, style, styleAttribute, applyStyle;
                if (!setter && viewmode === PAGE_VIEW) {
                    return pageBox(element);
                }
                if (viewmode !== ELEMENT_VIEW) {
                    throw new Error(ERROR_INVALID_ELEMENT);
                }
                if (setter) {
                    applyStyle = null;
                    if (x instanceof Array) {
                        height = 3 in x ? x[3] : null;
                        width = 2 in x ? x[2] : null;
                        y = 1 in y ? x[1] : null;
                        x = x[0];
                    }
                    style = css.computedStyle(element, "position", "marginLeft", "marginTop", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom");
                    hasLeft = hasTop = hasWidth = hasHeight = hasPosition = hasSize = false;
                    switch (style.position) {
                      case "relative":
                      case "absolute":
                      case "fixed":
                        x = cssValue(x);
                        if (x !== false) {
                            hasLeft = hasPosition = true;
                        }
                        y = cssValue(y);
                        if (y !== false) {
                            hasTop = hasPosition = true;
                        }
                    }
                    width = cssValue(width);
                    if (width !== false) {
                        hasWidth = hasSize = true;
                    }
                    height = cssValue(height);
                    if (height !== false) {
                        hasHeight = hasSize = true;
                    }
                    if (hasPosition || hasSize) {
                        applyStyle = {};
                        if (hasPosition) {
                            diff = getOffset(element);
                            if (hasLeft) {
                                applyStyle.left = typeof x === NUMBER ? element.offsetLeft - (toFloat(style.marginLeft) || 0) + (x - diff[0]) + "px" : x;
                            }
                            if (hasTop) {
                                applyStyle.top = typeof y === NUMBER ? element.offsetTop - (toFloat(style.marginTop) || 0) + (y - diff[1]) + "px" : y;
                            }
                        }
                        if (hasSize) {
                            if (hasWidth) {
                                applyStyle.width = typeof width === NUMBER ? element.clientWidth - (toFloat(style.paddingLeft) || 0) - (toFloat(style.paddingRight) || 0) + (width - element.offsetWidth) + "px" : width;
                            }
                            if (hasHeight) {
                                applyStyle.height = typeof height === NUMBER ? element.clientHeight - (toFloat(style.paddingTop) || 0) - (toFloat(style.paddingBottom) || 0) + (height - element.offsetHeight) + "px" : height;
                            }
                        }
                        css.style(element, applyStyle);
                    }
                    parent = styleAttribute = null;
                    return EXPORTS.chain;
                }
                return getBox(element);
            }
            function scroll(dom, x, y) {
                var setter = arguments.length > 1, is = isFinite, NUMBER = "number";
                var current, window;
                if (setter) {
                    if (typeof x !== NUMBER || !is(x)) {
                        x = false;
                    }
                    if (typeof y !== NUMBER || !is(y)) {
                        y = false;
                    }
                }
                switch (isViewable(dom)) {
                  case PAGE_VIEW:
                    window = DOM.is(dom) ? dom[DEFAULTVIEW] : dom;
                    current = getPageScroll(window);
                    if (setter) {
                        setPageScroll(window, x === false ? current[0] : x, y === false ? current[1] : y);
                    } else {
                        return current;
                    }
                    break;

                  case ELEMENT_VIEW:
                    if (setter) {
                        dom.scrollLeft = x === false ? dom.scrollLeft : x;
                        dom.scrollTop = y === false ? dom.scrollTop : y;
                    } else {
                        return [ dom.scrollLeft, dom.scrollTop ];
                    }
                    break;

                  default:
                    throw new Error(ERROR_INVALID_DOM);
                }
            }
            function pageBox(dom) {
                var M = Math, help = DOM, subject = dom, box = screen();
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
            function visible(element, visibility, displayed) {
                var style = null, len = arguments.length, string = "string", attached = isViewable(element) === ELEMENT_VIEW;
                var styleAttribute;
                if (len > 1) {
                    styleAttribute = element.style;
                    switch (typeof visibility) {
                      case string:
                        styleAttribute.style.visibility = visibility;
                        break;

                      case "boolean":
                        styleAttribute.style.visibility = "visible";
                    }
                    if (displayed === false) {
                        displayed = "none";
                    }
                    if (displayed && typeof displayed === string) {
                        styleAttribute.style.display = displayed;
                    }
                    styleAttribute = null;
                    return EXPORTS.chain;
                }
                if (attached) {
                    style = CSS.computedStyle(element, "display", "visibility");
                    return style.display !== "none" && style.visibility !== "hidden";
                }
                return false;
            }
            function screen() {
                var window = global.window, box = getPageScroll(window), size = getScreenSize(window);
                box[2] = size[0];
                box[3] = size[1];
                return box;
            }
            function w3cScreenSize(window) {
                return [ window.innerWidth, window.innerHeight ];
            }
            function ieScreenSize(window) {
                var factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1, subject = window.document[IE_PAGE_STAT_ACCESS], size = [ subject.clientWidth * factor, subject.clientHeight * factor ];
                subject = null;
                return size;
            }
            function rectBox(element) {
                var rect = element.getBoundingClientRect(), box = rectOffset(element, rect), size = rectSize(element, rect);
                box[2] = size[0];
                box[3] = size[1];
                box[4] = rect.right;
                box[5] = rect.bottom;
                rect = null;
                return box;
            }
            function manualBox(element) {
                var box = manualOffset(element), size = manualSize(element), width = size[0], height = size[1];
                box[2] = width;
                box[3] = height;
                box[4] = width + box[0];
                box[5] = height + box[1];
                return box;
            }
            function rectSize(element, boundingRect) {
                var M = Math, rect = boundingRect || element.getBoundingClientRect(), size = [ M.max(0, rect.width || 0), M.max(0, rect.height || 0) ];
                rect = null;
                return size;
            }
            function manualSize(element) {
                var M = Math;
                return [ M.max(0, element.offsetWidth || 0), M.max(0, element.offsetHeight || 0) ];
            }
            function rectOffset(element, boundingRect) {
                var scrolled = getPageScroll(element.ownerDocument[DEFAULTVIEW]), rect = boundingRect || element.getBoundingClientRect(), factor = DIMENSION_INFO.zoomfactor ? getZoomFactor(global.window.document[IE_PAGE_STAT_ACCESS]) : 1, offset = [ rect.left * factor + scrolled[0], rect.top * factor + scrolled[1] ];
                rect = null;
                return offset;
            }
            function manualOffset(element) {
                var root = global.document[IE_PAGE_STAT_ACCESS], css = CSS, offset = [ element.offsetLeft, element.offsetTop ], findStyles = [ "marginLeft", "marginTop" ], parent = element.offsetParent, style = css.computedStyle(element, findStyles);
                offset[0] += parseFloat(style.marginLeft) || 0;
                offset[1] += parseFloat(style.marginTop) || 0;
                for (;parent; parent = parent.offsetParent) {
                    if (parent.nodeType === 1) {
                        style = css.computedStyle(parent, findStyles);
                        offset[0] += (parent.offsetLeft || 0) + (parent.clientLeft || 0) + (parseFloat(style.marginLeft) || 0);
                        offset[1] += (parent.offsetTop || 0) + (parent.clientTop || 0) + (parseFloat(style.marginTop) || 0);
                    }
                }
                for (parent = element.parentNode; parent; parent = parent.parentNode) {
                    if (parent.nodeType === 1 && parent !== root) {
                        offset[0] += parent.scrollLeft || 0;
                        offset[1] += parent.scrollTop || 0;
                    }
                }
                root = parent = null;
                return offset;
            }
            function setPageScroll(window, x, y) {
                var factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1;
                window.scrollTo(x * factor, y * factor);
            }
            function w3cPageScrollOffset(window) {
                var offset = [ window.pageXOffset || 0, window.pageYOffset || 0 ];
                return offset;
            }
            function iePageScrollOffset(window) {
                var M = Math, subject = window.document[IE_PAGE_STAT_ACCESS], factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1, offset = [ M.round(subject.scrollLeft / factor), M.round(subject.scrollTop / factor) ];
                subject = null;
                return offset;
            }
            function getZoomFactor(window) {
                var factor = 1;
                var rect, body;
                if (boundingRect) {
                    body = window.document.body;
                    rect = body.getBoundingClientRect();
                    factor = Math.round((rect.right - rect.left / body.offsetWidth) * 100) / 100;
                }
                body = null;
                return factor;
            }
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
            DIMENSION_INFO = DETECTED && DETECTED.dimension;
            if (DIMENSION_INFO) {
                if (!DETECTED.browser.strict) {
                    IE_PAGE_STAT_ACCESS = "body";
                }
                USE_ZOOM_FACTOR = DIMENSION_INFO.zoomfactor;
                DEFAULTVIEW = DETECTED.dom.defaultView;
                IEVERSION = DETECTED.browser.ieVersion;
                getPageScroll = DIMENSION_INFO.pagescroll ? w3cPageScrollOffset : iePageScrollOffset;
                getScreenSize = DIMENSION_INFO.screensize ? w3cScreenSize : ieScreenSize;
                boundingRect = DIMENSION_INFO.rectmethod && "getBoundingClientRect";
                getOffset = boundingRect && (!IEVERSION || IEVERSION > 8) ? rectOffset : manualOffset;
                getSize = boundingRect ? rectSize : manualSize;
                getBox = boundingRect ? rectBox : manualBox;
            }
            module.exports = EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var DETECTED = __webpack_require__(2), STRING = __webpack_require__(10), DOM = __webpack_require__(9), DIMENSION = __webpack_require__(13), DETECTED_DOM = DETECTED.dom, DETECTED_SELECTION = DETECTED.selection, ERROR_DOM = STRING.ERROR_DOM, SELECT_ELEMENT = null, CLEAR_SELECTION = null, UNSELECTABLE = attributeUnselectable, CSS_UNSELECT = DETECTED_SELECTION.cssUnselectable, EXPORTS = {
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
                    throw new Error(STRING.ERROR_ELEMENT);
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
                        throw new Error(STRING.ERROR_DOC);
                    } else {
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
                element.style.webkitUserSelect = selectable ? "text" : "none";
            }
            function geckoUnselectable(element, selectable) {
                element.style.MozUserSelect = selectable ? "text" : "none";
            }
            function attributeUnselectable(element, selectable) {
                element.unselectable = selectable ? "off" : "on";
            }
            function selectionNotSupported() {
                throw new Error(STRING.ERROR_NS_MARK);
            }
            function ieSelectElement(startElement, endElement) {
                var body = startElement.ownerDocument.body, startRange = body.createTextRange();
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
                var document = startElement.ownerDocument, startRange = document.createRange(), endRange = document.createRange(), selection = document[DETECTED_DOM.defaultView].getSelection();
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
            } else if (DETECTED_SELECTION.textrange) {
                SELECT_ELEMENT = ieSelectElement;
                CLEAR_SELECTION = ieClearSelection;
            } else {
                SELECT_ELEMENT = CLEAR_SELECTION = selectionNotSupported;
            }
            if (CSS_UNSELECT) {
                UNSELECTABLE = CSS_UNSELECT === "MozUserSelect" ? geckoUnselectable : webkitUnselectable;
            }
            module.exports = EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var FORMAT = __webpack_require__(16), COLOR_RE = /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/, NUMBER_RE = /^[0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*$/, TO_RGBA = {
            rgba: __webpack_require__(17),
            hsla: __webpack_require__(18)
        }, EXPORTS = {
            parse: itemizeString
        };
        function itemizeString(str) {
            var re = COLOR_RE, F = FORMAT, numberRe = NUMBER_RE;
            var m, alpha, c, l, item, items, get2, returnItems, itemizer, processor, type;
            if (re.test(str)) {
                m = str.match(re);
                alpha = false;
                type = m[1];
                switch (type) {
                  case "hsla":
                    alpha = true;

                  case "hsl":
                    break;

                  case "rgba":
                    alpha = true;

                  case "rgb":
                  case "#":
                  default:
                    type = "rgba";
                }
                processor = TO_RGBA[type];
                itemizer = processor.itemize;
                c = -1;
                items = m[3];
                if (items) {
                    returnItems = items = items.split(",");
                    for (l = items.length; l--; ) {
                        item = items[++c];
                        if (!numberRe.test(item)) {
                            return 0;
                        }
                        items[c] = itemizer(item, c, item.charAt(item.length - 1) === "%" ? F.PERCENT : F.NUMBER);
                    }
                } else {
                    l = 3;
                    get2 = l === 6;
                    returnItems = [];
                    items = m[2];
                    for (l = items.length; l--; ) {
                        ++c;
                        item = items.charAt(c);
                        item = get2 ? items.substring(c * 2, c * 2 + 1) : item + item;
                        returnItems[c] = itemizer(item, c, F.HEX);
                    }
                    returnItems[++c] = 1;
                }
                return processor.toInteger.apply(processor, returnItems);
            }
            return 0;
        }
        module.exports = EXPORTS;
    }, function(module, exports) {
        "use strict";
        module.exports = {
            NUMBER: 1,
            HEX: 2,
            PERCENT: 3
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var FORMAT = __webpack_require__(16);
        module.exports = {
            itemize: function(value, index, format) {
                var F = FORMAT, M = Math, parse = parseFloat, alpha = index > 2, min = 0, max = alpha ? 100 : 255;
                switch (format) {
                  case F.HEX:
                    value = parseInt(value, 16);
                    break;

                  case F.NUMBER:
                    value = parse(value);
                    if (alpha) {
                        value *= 100;
                    }
                    break;

                  case F.PERCENT:
                    value = parse(value);
                    break;
                }
                return M.max(min, M.min(max, M.round(value) || 0));
            },
            toInteger: function(r, g, b, a) {
                return a << 24 | b << 16 | g << 8 | r;
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var FORMAT = __webpack_require__(16), RGBA = __webpack_require__(17);
        function hue2rgb(p, q, t) {
            if (t < 0) {
                t += 1;
            } else if (t > 1) {
                t -= 1;
            }
            switch (true) {
              case t < 1 / 6:
                return p + (q - p) * 6 * t;

              case t < 1 / 2:
                return q;

              case t < 2 / 3:
                return p + (q - p) * (2 / 3 - t) * 6;
            }
            return p;
        }
        module.exports = {
            itemize: function(value, index, format) {
                var F = FORMAT, M = Math, parse = parseFloat, min = 0, max = index < 1 ? 360 : 100;
                switch (format) {
                  case F.HEX:
                    value = parseInt(value, 16) / 255 * max;
                    break;

                  case F.NUMBER:
                    value = parse(value);
                    if (index > 2) {
                        value *= 100;
                    }
                    break;

                  case F.PERCENT:
                    value = parse(value);
                    break;
                }
                return M.max(min, M.min(max, value || 0));
            },
            toInteger: function(h, s, l, a) {
                var M = Math, h2r = hue2rgb, rgba = RGBA;
                var q, p;
                console.log("hue", h);
                h /= 360;
                s /= 100;
                l /= 100;
                console.log([ h, s, l, a ]);
                if (s === 0) {
                    return rgba.toInteger(l, l, l, a);
                }
                q = l < .5 ? l * (1 + s) : l + s - l * s;
                p = 2 * l - q;
                return rgba.toInteger(M.round(h2r(p, q, h + 1 / 3) * 255), M.round(h2r(p, q, h) * 255), M.round(h2r(p, q, h - 1 / 3) * 255), a);
            }
        };
    } ]);
});

