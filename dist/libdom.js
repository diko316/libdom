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
                version: "0.0.4",
                info: detect
            };
            var css, event, dimension;
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
            applyIf(EXPORTS, __webpack_require__(8), {
                is: "is",
                isView: "isView",
                contains: "contains",
                select: "select",
                eachNodePreorder: "eachPreorder",
                eachNodePostorder: "eachPostorder",
                eachNodeLevelorder: "eachLevel"
            });
            applyIf(EXPORTS, css = __webpack_require__(9), {
                addClass: "add",
                removeClass: "remove"
            });
            applyIf(EXPORTS, event = __webpack_require__(11), {
                on: "on",
                un: "un",
                purge: "purge",
                dispatch: "fire"
            });
            applyIf(EXPORTS, dimension = __webpack_require__(12), {
                offset: "offset",
                size: "size",
                box: "box",
                scroll: "scroll",
                screen: "screen"
            });
            if (detect) {
                css.chain = event.chain = dimension.chain = EXPORTS;
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
                dimension: __webpack_require__(7)
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
            var WINDOW = global;
            module.exports = {
                w3cStyle: !!WINDOW.getComputedStyle,
                ieStyle: !!WINDOW.document.documentElement.currentStyle
            };
            WINDOW = null;
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
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var DETECTED = __webpack_require__(2), OBJECT_TYPE = "[object Object]", ERROR_INVALID_DOM = "Invalid DOM [element] parameter.", ERROR_INVALID_DOM_NODE = "Invalid DOM [node] parameter.", ERROR_INVALID_CSS_SELECTOR = "Invalid CSS [selector] parameter.", ERROR_INVALID_CALLBACK = "Invalid tree traverse [callback] parameter.", ERROR_INVALID_ELEMENT_CONFIG = "Invalid DOM Element [config] parameter.", INVALID_DESCENDANT_NODE_TYPES = {
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
            var is = isDom;
            if (!is(ancestor, 1, 9, 11)) {
                throw new Error("Invalid DOM [ancestor] parameter.");
            }
            if (!is(descendant) || descendant.nodeType in INVALID_DESCENDANT_NODE_TYPES) {
                throw new Error("Invalid DOM [descendant] parameter.");
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
            throw new Error("DOM position comparison is not supported.");
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
            l = list.length;
            result = new Array(l);
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
            throw new Error("CSS Selector query form DOM is not supported.");
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
            var current = element, postOrderOnly = !preOrderOnly, depth = 0;
            var node;
            main: for (;current; ) {
                if (preOrderOnly && current.nodeType === 1 && callback(current) === false) {
                    break;
                }
                node = current.firstChild;
                if (node) {
                    depth++;
                } else {
                    if (postOrderOnly && current.nodeType === 1 && callback(current) === false) {
                        break;
                    }
                    node = current.nextSibling;
                    for (;!node && depth-- && current; ) {
                        current = current.parentNode;
                        if (postOrderOnly && current.nodeType === 1 && callback(current) === false) {
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
            for (;queue; queue = queue.next) {
                node = queue.node;
                queue.node = null;
                for (;node; node = node.nextSibling) {
                    current = node.firstChild;
                    if (callback(current) === false) {
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
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var STRING = __webpack_require__(10), DETECTED = __webpack_require__(2), DOM = __webpack_require__(8), DIMENSION_RE = /width|height|(margin|padding).*|border.+(Width|Radius)/, EM_OR_PERCENT_RE = /%|em/, WIDTH_RE = /width/i, NUMBER_RE = /\d/, ERROR_INVALID_DOM = "Invalid DOM [element] parameter.", EXPORTS = {
                add: addClass,
                remove: removeClass,
                style: computedStyleNotSupported
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
                throw new Error("Computed style is not supported in this browser.");
            }
            function w3cGetCurrentStyle(element) {
                var camel = STRING.camelize;
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
                var dimensionRe = DIMENSION_RE, camel = STRING.camelize, pixelSize = getPixelSize;
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
            CSS_INFO = DETECTED && DETECTED.css;
            if (CSS_INFO) {
                EXPORTS.style = CSS_INFO.w3cStyle ? w3cGetCurrentStyle : CSS_INFO.ieStyle ? ieGetCurrentStyle : computedStyleNotSupported;
            }
            module.exports = EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports) {
        "use strict";
        var SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/, CAMEL_RE = /[^a-z]+[a-z]/gi;
        function camelize(str) {
            return str.replace(CAMEL_RE, onCamelizeMatch);
        }
        function onCamelizeMatch(all) {
            return all[all.length - 1].toUpperCase();
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
        module.exports = {
            camelize: camelize,
            addWord: addWord,
            removeWord: removeWord
        };
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var INFO = __webpack_require__(2), DOM = __webpack_require__(8), EVENTS = null, PAGE_UNLOADED = false, IE_CUSTOM_EVENTS = {}, HAS_OWN_PROPERTY = Object.prototype.hasOwnProperty, ERROR_OBSERVABLE_NO_SUPPORT = "Invalid [observable] parameter.", ERROR_INVALID_TYPE = "Invalid Event [type] parameter.", ERROR_INVALID_HANDLER = "Invalid Event [handler] parameter.", IE_CUSTOM_TYPE_EVENT = "propertychange", EXPORTS = module.exports = {
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
            var DETECTED = __webpack_require__(2), DOM = __webpack_require__(8), CSS = __webpack_require__(9), ERROR_INVALID_ELEMENT = "Invalid DOM [element] parameter.", DEFAULTVIEW = null, ELEMENT_VIEW = 1, PAGE_VIEW = 2, USE_ZOOM_FACTOR = false, IE_PAGE_STAT_ACCESS = "documentElement", boundingRect = false, getPageScroll = null, getOffset = null, getSize = null, getBox = null, getScreenSize = null, EXPORTS = {
                offset: offset,
                size: size,
                box: box,
                scroll: scroll,
                screen: screen,
                visible: visible
            };
            var DIMENSION_INFO;
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
                var is = isFinite, M = Math, css = CSS, toFloat = parseFloat, NUMBER = "number", setter = arguments.length > 1, viewmode = isViewable(element);
                var hasLeft, hasTop, hasWidth, hasHeight, parent, hasPosition, hasSize, diff, diff1, diff2, style, style1, style2, styleAttribute;
                if (!setter && viewmode === PAGE_VIEW) {
                    return pageBox(element);
                }
                if (viewmode !== ELEMENT_VIEW) {
                    throw new Error(ERROR_INVALID_ELEMENT);
                }
                if (setter) {
                    if (x instanceof Array) {
                        height = 3 in x ? x[3] : null;
                        width = 2 in x ? x[2] : null;
                        y = 1 in y ? x[1] : null;
                        x = x[0];
                    }
                    style = css.style(element, "position", "marginLeft", "marginTop", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom");
                    hasLeft = hasTop = hasWidth = hasHeight = hasPosition = hasSize = false;
                    switch (style.position) {
                      case "relative":
                      case "absolute":
                      case "fixed":
                        if (typeof x === NUMBER && is(x)) {
                            hasLeft = hasPosition = true;
                        }
                        if (typeof y === NUMBER && is(y)) {
                            hasTop = hasPosition = true;
                        }
                    }
                    if (typeof width === NUMBER && is(width)) {
                        hasWidth = hasSize = true;
                    }
                    if (typeof height === NUMBER && is(height)) {
                        hasHeight = hasSize = true;
                    }
                    if (hasPosition || hasSize) {
                        styleAttribute = element.style;
                        if (hasPosition) {
                            diff = getOffset(element);
                            diff1 = diff2 = 0;
                            if (hasLeft) {
                                diff1 = hasLeft ? x - diff[0] : 0;
                                style1 = element.offsetLeft - (toFloat(style.marginLeft) || 0);
                                styleAttribute.left = style1 + diff1 + "px";
                            }
                            if (hasTop) {
                                diff2 = hasTop ? x - diff[1] : 0;
                                style2 = element.offsetTop + (toFloat(style.marginTop) || 0);
                                styleAttribute.top = style2 + diff2 + "px";
                            }
                        }
                        if (hasSize) {
                            if (hasWidth) {
                                diff = width - element.offsetWidth;
                                style1 = element.clientWidth - (toFloat(style.paddingLeft) || 0) - (toFloat(style.paddingRight) || 0);
                                styleAttribute.width = M.max(style1 + diff, 0) + "px";
                            }
                            if (hasHeight) {
                                diff = height - element.offsetHeight;
                                style1 = element.clientHeight - (toFloat(style.paddingTop) || 0) - (toFloat(style.paddingBottom) || 0);
                                styleAttribute.height = M.max(style1 + diff, 0) + "px";
                            }
                        }
                    }
                    parent = styleAttribute = null;
                    return EXPORTS.chain;
                }
                return getBox(element);
            }
            function scroll(dom, x, y) {
                var setter = arguments.length > 1;
                var current, window;
                if (setter) {
                    if (typeof x !== "number" || !isFinite(x)) {
                        x = false;
                    }
                    if (typeof y !== "number" || !isFinite(y)) {
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
                    throw new Error("Invalid [dom] Object parameter.");
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
                    style = CSS.style(element, "display", "visibility");
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
                var root = global.document[IE_PAGE_STAT_ACCESS], css = CSS, offset = [ element.offsetLeft, element.offsetTop ], findStyles = [ "marginLeft", "marginTop" ], parent = element.offsetParent, style = css.style(element, findStyles);
                offset[0] += parseFloat(style.marginLeft) || 0;
                offset[1] += parseFloat(style.marginTop) || 0;
                for (;parent; parent = parent.offsetParent) {
                    if (parent.nodeType === 1) {
                        style = css.style(parent, findStyles);
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
                console.log("strict? ", DETECTED.browser.strict);
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
                getPageScroll = DIMENSION_INFO.pagescroll ? w3cPageScrollOffset : iePageScrollOffset;
                getScreenSize = DIMENSION_INFO.screensize ? w3cScreenSize : ieScreenSize;
                boundingRect = DIMENSION_INFO.rectmethod && "getBoundingClientRect";
                getOffset = boundingRect && !DIMENSION_INFO.ie8 ? rectOffset : manualOffset;
                getSize = boundingRect ? rectSize : manualSize;
                getBox = boundingRect ? rectBox : manualBox;
            }
            module.exports = EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    } ]);
});

