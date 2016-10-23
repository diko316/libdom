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
            var CORE = __webpack_require__(2), detect = __webpack_require__(9), EXPORTS = {
                version: "0.0.9",
                info: detect
            };
            var css, event, dimension, selection;
            function notBrowser() {
                throw new Error("Unable to proceed, not running in a browser.");
            }
            function applyIf(api, moduleObject, access) {
                var hasOwn = CORE.contains, handler = detect ? false : notBrowser;
                var name;
                for (name in access) {
                    if (hasOwn.call(access, name)) {
                        api[name] = handler || moduleObject[access[name]];
                    }
                }
            }
            applyIf(EXPORTS, __webpack_require__(16), {
                is: "is",
                isView: "isView",
                contains: "contains",
                select: "select",
                eachNodePreorder: "eachPreorder",
                eachNodePostorder: "eachPostorder",
                eachNodeLevelorder: "eachLevel",
                add: "add",
                remove: "remove"
            });
            applyIf(EXPORTS, css = __webpack_require__(18), {
                addClass: "add",
                removeClass: "remove",
                computedStyle: "computedStyle",
                stylize: "style"
            });
            applyIf(EXPORTS, event = __webpack_require__(26), {
                on: "on",
                un: "un",
                purge: "purge",
                dispatch: "fire"
            });
            applyIf(EXPORTS, dimension = __webpack_require__(27), {
                offset: "offset",
                size: "size",
                box: "box",
                scroll: "scroll",
                screen: "screen"
            });
            applyIf(EXPORTS, selection = __webpack_require__(28), {
                highlight: "select",
                noHighlight: "unselectable",
                clearHighlight: "clear"
            });
            applyIf(EXPORTS, __webpack_require__(19), {
                parseColor: "parse",
                formatColor: "stringify"
            });
            applyIf(EXPORTS, __webpack_require__(29), {
                eachDisplacement: "each",
                animateStyle: "style"
            });
            if (detect) {
                css.chain = event.chain = dimension.chain = selection.chain = EXPORTS;
            }
            module.exports = global["libdom"] = EXPORTS["default"] = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = __webpack_require__(3);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var DETECT = __webpack_require__(4), TYPE = __webpack_require__(6), OBJECT = __webpack_require__(7), ARRAY = __webpack_require__(8), EXPORTS = {
            env: DETECT
        };
        OBJECT.assign(EXPORTS, TYPE);
        OBJECT.assign(EXPORTS, OBJECT);
        OBJECT.assign(EXPORTS, ARRAY);
        module.exports = EXPORTS;
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var ROOT = global, doc = ROOT.document, win = ROOT.window, O = Object.prototype, toString = O.toString, A = Array.prototype, objectSignature = "[object Object]", BROWSER = !!doc && !!win && win.self === (doc.defaultView || doc.parentWindow), EXPORTS = {
                browser: BROWSER,
                userAgent: BROWSER ? ROOT.navigator.userAgent : nodeUserAgent(),
                validSignature: toString.call(null) !== objectSignature || toString.call(void 0) !== objectSignature,
                indexOfSupport: "indexOf" in A
            };
            function nodeUserAgent() {
                var PROCESS = __webpack_require__(5), VERSIONS = PROCESS.versions, str = [ "Node ", VERSIONS.node, "(", PROCESS.platform, "; V8 ", VERSIONS.v8 || "unknown", "; arch ", PROCESS.arch, ")" ];
                return str.join("");
            }
            module.exports = EXPORTS;
            ROOT = win = doc = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports) {
        var process = module.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        (function() {
            try {
                if (typeof setTimeout === "function") {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === "function") {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        })();
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                return setTimeout(fun, 0);
            }
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                return clearTimeout(marker);
            }
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }
        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        };
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.binding = function(name) {
            throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
            return "/";
        };
        process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
            return 0;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var DETECTED = __webpack_require__(4), validSignature = DETECTED.validSignature, O = Object.prototype, toString = O.toString, isSignature = validSignature ? objectSignature : ieObjectSignature;
        function objectSignature(subject) {
            return toString.call(subject);
        }
        function ieObjectSignature(subject) {
            if (subject === null) {
                return "[object Null]";
            } else if (subject === void 0) {
                return "[object Undefined]";
            }
            return toString.call(subject);
        }
        function isType(subject, type) {
            return isSignature(subject) === type;
        }
        function isObject(subject) {
            return toString.call(subject) === "[object Object]";
        }
        function ieIsObject(subject) {
            return subject !== null && subject !== void 0 && typeof subject === "object" && subject instanceof O.constructor;
        }
        function isString(subject, allowEmpty) {
            return typeof subject === "string" && (allowEmpty === true || subject.length !== 0);
        }
        function isNumber(subject) {
            return typeof subject === "number" && isFinite(subject);
        }
        function isScalar(subject) {
            switch (typeof subject) {
              case "number":
                return isFinite(subject);

              case "boolean":
              case "string":
                return true;
            }
            return false;
        }
        function isDate(subject) {
            return subject instanceof Date;
        }
        module.exports = {
            signature: isSignature,
            object: validSignature ? isObject : ieIsObject,
            string: isString,
            number: isNumber,
            scalar: isScalar,
            date: isDate,
            type: isType
        };
    }, function(module, exports) {
        "use strict";
        var O = Object.prototype, EXPORTS = {
            each: each,
            assign: assign,
            contains: contains
        };
        function assign(target, source, defaults) {
            var onAssign = apply, eachProperty = each;
            if (defaults) {
                eachProperty(defaults, onAssign, target);
            }
            eachProperty(source, onAssign, target);
            return target;
        }
        function apply(value, name) {
            this[name] = value;
        }
        function each(subject, handler, scope) {
            var hasOwn = O.hasOwnProperty;
            var name;
            if (scope === void 0) {
                scope = null;
            }
            for (name in subject) {
                if (hasOwn.call(subject, name)) {
                    if (handler.call(scope, subject[name], name) === false) {
                        break;
                    }
                }
            }
            return subject;
        }
        function contains(subject, property) {
            return O.hasOwnProperty.call(subject, property);
        }
        module.exports = EXPORTS;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var DETECT = __webpack_require__(4), OBJECT = __webpack_require__(7), A = Array.prototype, EXPORTS = {};
        function indexOf(subject) {
            var array = this, l = array.length, c = -1;
            for (;l--; ) {
                if (subject === array[++c]) {
                    array = null;
                    return c;
                }
            }
            return -1;
        }
        function lastIndexOf(subject) {
            var array = this, l = array.length;
            for (;l--; ) {
                if (subject === array[l]) {
                    array = null;
                    return l;
                }
            }
            return -1;
        }
        function union(array, array2, clone) {
            var subject, l, len, total;
            array = clone !== false ? array : array.slice(0);
            array.push.apply(array, array2);
            total = array.length;
            found: for (l = total; l--; ) {
                subject = array[l];
                for (len = total; len--; ) {
                    if (l !== len && subject === array[len]) {
                        total--;
                        array.splice(l, 1);
                        continue found;
                    }
                }
            }
            return array;
        }
        function intersect(array1, array2, clone) {
            var total1 = array1.length, total2 = array2.length;
            var subject, l1, l2;
            array1 = clone !== false ? array1 : array1.slice(0);
            found: for (l1 = total1; l1--; ) {
                subject = array1[l1];
                foundSame: for (l2 = total2; l2--; ) {
                    if (subject === array2[l2]) {
                        for (l2 = total1; l2--; ) {
                            if (l2 !== l1 && subject === array1[l2]) {
                                break foundSame;
                            }
                        }
                        continue found;
                    }
                }
                array1.splice(l1, 1);
                total1--;
            }
            return array1;
        }
        function difference(array1, array2, clone) {
            var total1 = array1.length, total2 = array2.length;
            var subject, l1, l2;
            array1 = clone !== false ? array1 : array1.slice(0);
            found: for (l1 = total1; l1--; ) {
                subject = array1[l1];
                for (l2 = total2; l2--; ) {
                    if (subject === array2[l2]) {
                        array1.splice(l1, 1);
                        total1--;
                        continue found;
                    }
                }
                for (l2 = total1; l2--; ) {
                    if (l2 !== l1 && subject === array1[l2]) {
                        array1.splice(l1, 1);
                        total1--;
                        continue found;
                    }
                }
            }
            return array1;
        }
        if (!DETECT.indexOfSupport) {
            OBJECT.assign(A, {
                indexOf: indexOf,
                lastIndexOf: lastIndexOf
            });
        }
        OBJECT.assign(EXPORTS, {
            unionList: union,
            intersectList: intersect,
            differenceList: difference
        });
        module.exports = EXPORTS;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var browser = __webpack_require__(10), EXPORTS = false;
        if (browser) {
            EXPORTS = {
                browser: browser,
                event: __webpack_require__(11),
                dom: __webpack_require__(12),
                css: __webpack_require__(13),
                dimension: __webpack_require__(14),
                selection: __webpack_require__(15)
            };
        }
        module.exports = EXPORTS;
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var ROOT = global, CORE = __webpack_require__(2), ENV = CORE.env, EXPORTS = false;
            var match, ieVersion;
            if (ENV.browser) {
                match = ENV.userAgent.match(/msie ([0-9]+\.[0-9]+)/i);
                ieVersion = match && parseInt(match[1], 10) || 0;
                EXPORTS = {
                    strict: ROOT.document.compatMode === "CSS1Compat",
                    ieVersion: ieVersion,
                    ie8: ieVersion === 8
                };
            }
            global.core = CORE;
            module.exports = EXPORTS;
            ROOT = null;
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
            var DETECTED = __webpack_require__(10), DOCUMENT = global.document, ROOT = DOCUMENT.documentElement, ieVersion = DETECTED.ieVersion;
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
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var WINDOW = global, CORE = __webpack_require__(2), DOC = WINDOW.document, DIV = DOC.createElement("div"), STYLE = DIV.style, RGBA = "rgba(0,0,0,0.5)", TRANSITION_SUPPORT = [ "OTransition", "webkitTransition", "MozTransition", "transition" ];
            var name, l, EXPORTS, color;
            module.exports = EXPORTS = {
                w3cStyle: !!WINDOW.getComputedStyle,
                ieStyle: !!DOC.documentElement.currentStyle,
                setattribute: !!STYLE.setAttribute,
                setproperty: !!STYLE.setProperty,
                transition: false,
                opacity: typeof STYLE.opacity !== "undefined",
                filterOpacity: typeof STYLE.filter !== "undefined",
                alphaColor: false
            };
            try {
                STYLE.color = RGBA;
                color = STYLE.color;
                if (CORE.string(color)) {
                    color = color.replace(/[ \r\n\t\s]+/g, "").toLowerCase();
                }
                if (RGBA === color) {
                    EXPORTS.alphaColor = true;
                }
            } catch (e) {}
            for (l = TRANSITION_SUPPORT.length; l--; ) {
                name = TRANSITION_SUPPORT[l];
                if (typeof STYLE[name] !== "undefined") {
                    EXPORTS.transition = name;
                    break;
                }
            }
            WINDOW = DOC = DIV = STYLE = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var DETECTED = __webpack_require__(10), WINDOW = global.window, ieVersion = DETECTED.ieVersion;
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
        var CORE = __webpack_require__(2), DETECTED = __webpack_require__(9), STRING = __webpack_require__(17), ORDER_TYPE_PREORDER = 1, ORDER_TYPE_POSTORDER = 2, ORDER_TYPE_LEVELORDER = 3, ERROR_INVALID_DOM = STRING[1101], ERROR_INVALID_DOM_NODE = STRING[1103], ERROR_INVALID_CSS_SELECTOR = STRING[1111], ERROR_INVALID_CALLBACK = STRING[1112], ERROR_INVALID_ELEMENT_CONFIG = STRING[1121], INVALID_DESCENDANT_NODE_TYPES = {
            9: 1,
            11: 1
        }, STD_CONTAINS = notSupportedContains, MANIPULATION_HELPERS = {}, EXPORTS = {
            contains: contains,
            is: isDom,
            isView: isDefaultView,
            eachPreorder: preOrderTraverse,
            eachPostorder: postOrderTraverse,
            eachLevel: levelTraverse,
            documentViewAccess: "defaultView",
            select: notSupportedQuerySelector,
            helper: registerDomHelper,
            add: add,
            remove: remove,
            find: find
        };
        var DOM_INFO;
        function contains(ancestor, descendant) {
            var elementErrorString = STRING[1102], is = isDom;
            if (!is(ancestor, 1, 9, 11)) {
                throw new Error(elementErrorString);
            }
            if (!is(descendant) || descendant.nodeType in INVALID_DESCENDANT_NODE_TYPES) {
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
        function registerDomHelper(name, handler) {
            if (!CORE.string(name)) {
                throw new Error(STRING[1001]);
            }
            if (!(handler instanceof Function)) {
                throw new Error(STRING[1011]);
            }
            MANIPULATION_HELPERS[":" + name] = handler;
            return EXPORTS.chain;
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
            if (CORE.object(config)) {
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
            var C = CORE;
            if (C.object(config)) {
                config = config.tagName;
            }
            return C.string(config) ? config : false;
        }
        function applyConfigToElement(element, config, usedFragment) {
            var C = CORE, hasOwn = C.contains, isObject = C.object, me = applyConfigToElement, resolveTagName = getTagNameFromConfig, helper = MANIPULATION_HELPERS;
            var name, value, item, access, childNodes, c, l, fragment, doc, created;
            if (isObject(config)) {
                childNodes = null;
                main: for (name in config) {
                    if (hasOwn(name, config)) {
                        value = config[name];
                        switch (name) {
                          case "tagName":
                            continue main;

                          case "class":
                            name = "className";
                            break;

                          case "for":
                            name = "htmlFor";
                            break;

                          case "childNodes":
                          case "innerHTML":
                          case "html":
                            childNodes = value;
                            continue main;
                        }
                        access = ":" + name;
                        if (access in helper) {
                            helper[name](element, value);
                            continue;
                        }
                        element[name] = value;
                    }
                }
                if (C.string(childNodes)) {
                    element.innerHTML = childNodes;
                } else {
                    if (isObject(childNodes)) {
                        childNodes = [ childNodes ];
                    }
                    if (childNodes instanceof Array) {
                        doc = element.ownerDocument;
                        fragment = usedFragment === true ? doc.createDocumentFragment() : element;
                        for (c = -1, l = childNodes.length; l--; ) {
                            item = childNodes[++c];
                            if (isObject(item)) {
                                created = doc.createElement(resolveTagName(item) || "div");
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
            } else if (isNumber(node) && node > -1) {
                index = node;
                counter = -1;
                any = !isNumber(nodeType);
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
            if (!CORE.string(selector)) {
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
            if (!CORE.string(selector)) {
                throw new Error(ERROR_INVALID_CSS_SELECTOR);
            }
            return Array.prototype.slice.call(dom.querySelectorAll(selector));
        }
        function notSupportedQuerySelector() {
            throw new Error(STRING[2003]);
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
            var isNumber = CORE.number;
            var type, c, len, items, match, matched;
            if (node && typeof node === "object") {
                type = node.nodeType;
                if (isNumber(type)) {
                    items = arguments;
                    len = Math.max(items.length - 1, 0);
                    matched = !len;
                    for (c = 0; len--; ) {
                        match = items[++c];
                        if (isNumber(match)) {
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
        "use strict";
        var CORE = __webpack_require__(2), SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/, CAMEL_RE = /[^a-z]+[a-z]/gi, STYLIZE_RE = /^([Mm]oz|[Ww]ebkit|[Mm]s|[oO])[A-Z]/, EXPORTS = {
            camelize: camelize,
            stylize: stylize,
            addWord: addWord,
            removeWord: removeWord,
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
            1151: "Invalid Animation [handler] parameter.",
            1152: "Invalid Animation [displacements] parameter.",
            2001: "Style Attribute manipulation is not supported",
            2002: "Computed style is not supported by this browser.",
            2003: "CSS Selector query form DOM is not supported.",
            2004: "DOM position comparison is not supported.",
            2005: "DOM selection not supported.",
            2006: "CSS Opacity is not supported by this browser"
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
            var isString = CORE.string, c = -1, l = items.length;
            var cl, name;
            str = str.split(SEPARATE_RE);
            cl = str.length;
            for (;l--; ) {
                name = items[++c];
                if (isString(name) && str.indexOf(name) === -1) {
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
            var CORE = __webpack_require__(2), STRING = __webpack_require__(17), DETECTED = __webpack_require__(9), DOM = __webpack_require__(16), COLOR = __webpack_require__(19), PADDING_BOTTOM = "paddingBottom", PADDING_TOP = "paddingTop", PADDING_LEFT = "paddingLeft", PADDING_RIGHT = "paddingRight", OFFSET_LEFT = "offsetLeft", OFFSET_TOP = "offsetTop", OFFSET_WIDTH = "offsetWidth", OFFSET_HEIGHT = "offsetHeight", CLIENT_WIDTH = "clientWidth", CLIENT_HEIGHT = "clientHeight", COLOR_RE = /[Cc]olor$/, EM_OR_PERCENT_RE = /%|em/, CSS_MEASUREMENT_RE = /^([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)(em|px|\%|pt|vh|vw|cm|ex|in|mm|pc|vmin)$/, WIDTH_RE = /width/i, NUMBER_RE = /\d/, BOX_RE = /(top|bottom|left|right|width|height)$/, DIMENSION_RE = /([Tt]op|[Bb]ottom|[Ll]eft|[Rr]ight|[wW]idth|[hH]eight|Size|Radius)$/, IE_ALPHA_OPACITY_RE = /\(opacity\=([0-9]+)\)/i, IE_ALPHA_OPACITY_TEMPLATE = "alpha(opacity=$opacity)", IE_ALPHA_OPACITY_TEMPLATE_RE = /\$opacity/, GET_OPACITY = opacityNotSupported, SET_OPACITY = opacityNotSupported, SET_STYLE = styleManipulationNotSupported, GET_STYLE = styleManipulationNotSupported, ERROR_INVALID_DOM = STRING[1101], EXPORTS = {
                add: addClass,
                remove: removeClass,
                computedStyle: computedStyleNotSupported,
                style: applyStyle,
                unitValue: getCSSUnitValue,
                styleOpacity: opacityNotSupported,
                colorUnit: "hex",
                boxRe: BOX_RE,
                dimensionRe: DIMENSION_RE,
                colorRe: COLOR_RE
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
            function applyStyle(element, style, value) {
                var C = CORE, string = C.string, number = C.number, hasOwn = C.contains, color = COLOR, set = SET_STYLE, setOpacity = SET_OPACITY, colorRe = COLOR_RE, parse = parseCSSText, dimensionRe = DIMENSION_RE, primaryColorUnit = EXPORTS.colorUnit, camelize = STRING.stylize, len = arguments.length;
                var name, elementStyle, isOpacity, isNumber, isScalar;
                if (!DOM.is(element, 1)) {
                    throw new Error(ERROR_INVALID_DOM);
                }
                if (len > 1) {
                    if (string(style)) {
                        if (len > 2) {
                            elementStyle = {};
                            elementStyle[style] = value;
                            style = elementStyle;
                        } else {
                            style = parse(style);
                        }
                    }
                    if (!C.object(style)) {
                        throw new Error(STRING[1141]);
                    }
                    elementStyle = element.style;
                    main: for (name in style) {
                        if (hasOwn(style, name)) {
                            value = style[name];
                            name = camelize(name);
                            isOpacity = name === "opacity";
                            isNumber = number(value);
                            isScalar = isNumber || string(value);
                            switch (true) {
                              case name === "opacity":
                                if (!isScalar) {
                                    set(elementStyle, "filter", value = null);
                                } else {
                                    setOpacity(elementStyle, value);
                                    continue main;
                                }
                                break;

                              case isNumber && dimensionRe.test(name):
                                value = "" + value + "px";
                                isNumber = !(isScalar = true);
                                break;

                              case isNumber && colorRe.test(name):
                                value = color.stringify(value, primaryColorUnit);
                                isNumber = !(isScalar = true);
                                break;

                              default:
                                if (!isScalar) {
                                    value = null;
                                }
                            }
                            set(elementStyle, name, value);
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
                var len;
                switch (typeof value) {
                  case "number":
                    if (is(value)) {
                        return value;
                    }
                    break;

                  case "string":
                    len = value.length;
                    if (CSS_MEASUREMENT_RE.test(value) && value.substring(len - 2, len) !== "px") {
                        return value;
                    } else if (value === "auto" || value === "inherit") {
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
            function computedStyleNotSupported() {
                throw new Error(STRING[2002]);
            }
            function w3cGetCurrentStyle(element, list) {
                var camel = STRING.stylize, isString = CORE.string;
                var style, c, l, name, value, values, access;
                if (!DOM.is(element, 1)) {
                    throw new Error(ERROR_INVALID_DOM);
                }
                style = global.getComputedStyle(element);
                values = {};
                if (!(list instanceof Array)) {
                    list = SLICE.call(arguments, 1);
                }
                for (c = -1, l = list.length; l--; ) {
                    name = list[++c];
                    if (isString(name)) {
                        access = camel(name);
                        switch (access) {
                          case "opacity":
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
                var dimensionRe = DIMENSION_RE, boxRe = BOX_RE, isString = CORE.string, camel = STRING.stylize, getOpacity = GET_OPACITY, pixelSize = ieGetPixelSize;
                var style, c, l, name, value, access, fontSize, values, dimension;
                if (!DOM.is(element, 1)) {
                    throw new Error(ERROR_INVALID_DOM);
                }
                style = element.currentStyle;
                fontSize = false;
                dimension = false;
                values = {};
                if (!(list instanceof Array)) {
                    list = SLICE.call(arguments, 1);
                }
                for (c = -1, l = list.length; l--; ) {
                    name = list[++c];
                    if (isString(name)) {
                        access = camel(name);
                        switch (true) {
                          case access === "opacity":
                            value = getOpacity(style);
                            break;

                          case boxRe.test(access):
                            if (!dimension) {
                                dimension = ieGetPositionStyle(element, style);
                            }
                            value = dimension[access] + "px";
                            break;

                          case dimensionRe.test(access) && style[access] !== "auto":
                            if (fontSize === false) {
                                fontSize = pixelSize(element, style, "fontSize", null);
                            }
                            value = pixelSize(element, style, access, fontSize) + "px";
                            break;

                          case access === "float":
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
                        fontSize = EM_OR_PERCENT_RE.test(suffix) && parent ? ieGetPixelSize(parent, parent.currentStyle, "fontSize", null) : 16;
                        parent = null;
                    }
                    return suffix === "em" ? size * fontSize : size / 100 * (property == "fontSize" ? fontSize : WIDTH_RE.test(property) ? element[CLIENT_WIDTH] : element[CLIENT_HEIGHT]);

                  default:
                    return size;
                }
            }
            function ieGetPositionStyle(element, style) {
                var parent = element.offsetParent, parentStyle = parent.currentStyle, parse = parseFloat, ptop = PADDING_TOP, pleft = PADDING_LEFT, pbottom = PADDING_BOTTOM, pright = PADDING_RIGHT, cwidth = CLIENT_WIDTH, cheight = CLIENT_HEIGHT, left = element[OFFSET_LEFT], top = element[OFFSET_TOP], right = parent[cwidth] - element[OFFSET_WIDTH], bottom = parent[cheight] - element[OFFSET_HEIGHT], width = element[cwidth], height = element[cheight];
                switch (style.position) {
                  case "relative":
                    left -= parse(parentStyle[pleft]) || 0;
                    top -= parse(parentStyle[ptop]) || 0;

                  case "absolute":
                  case "fixed":
                    left -= parse(parentStyle.borderLeftWidth) || 0;
                    top -= parse(parentStyle.borderTopWidth) || 0;
                }
                right -= left;
                bottom -= top;
                width -= (parse(style[pleft]) || 0) + (parse(style[pright]) || 0);
                height -= (parse(style[ptop]) || 0) + (parse(style[pbottom]) || 0);
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
            function opacityNotSupported() {
                throw new Error(STRING[2006]);
            }
            function ieGetOpacity(style) {
                var M = Math, C = CORE, opacityRe = IE_ALPHA_OPACITY_RE, filter = style.filter;
                var m;
                if (C.string(filter) && opacityRe.test(filter)) {
                    m = filter.match(opacityRe);
                    m = parseFloat(m[1]);
                    return M.max(1, M.min(100, C.number(m) ? m : 100)) / 100;
                }
                return 1;
            }
            function ieSetOpacity(style, opacity) {
                var M = Math, C = CORE;
                if (C.string(opacity)) {
                    opacity = parseFloat(opacity);
                }
                if (C.number(opacity)) {
                    style.filter = IE_ALPHA_OPACITY_TEMPLATE.replace(IE_ALPHA_OPACITY_TEMPLATE_RE, M.min(100, M.max(0, M.round(opacity * 100))).toString(10));
                }
            }
            function w3cGetOpacity(style) {
                var opacity = parseFloat(style.opacity);
                return CORE.number(opacity) ? opacity : 1;
            }
            function w3cSetOpacity(style, opacity) {
                var M = Math, C = CORE;
                if (C.string(opacity)) {
                    opacity = parseFloat(opacity);
                }
                if (C.number(opacity)) {
                    style.opacity = M.min(1, M.max(0, opacity)).toFixed(2);
                }
            }
            function w3cSetStyleValue(style, name, value) {
                if (value === null) {
                    style.removeProperty(name);
                } else {
                    style[name] = value;
                }
            }
            function w3cGetStyleValue(style, name) {
                return style.getPropertyValue(name);
            }
            function ieSetStyleValue(style, name, value) {
                if (value === null) {
                    style.removeAttribute(name);
                } else {
                    style[name] = value;
                }
            }
            function ieGetStyleValue(style, name) {
                return style.getAttribute(name);
            }
            DOM.helper("className", addClass);
            DOM.helper("style", applyStyle);
            CSS_INFO = DETECTED && DETECTED.css;
            if (CSS_INFO) {
                EXPORTS.computedStyle = CSS_INFO.w3cStyle ? w3cGetCurrentStyle : CSS_INFO.ieStyle ? ieGetCurrentStyle : computedStyleNotSupported;
                if (CSS_INFO.setattribute) {
                    SET_STYLE = ieSetStyleValue;
                    GET_STYLE = ieGetStyleValue;
                } else if (CSS_INFO.setproperty) {
                    SET_STYLE = w3cSetStyleValue;
                    GET_STYLE = w3cGetStyleValue;
                }
                if (CSS_INFO.opacity) {
                    GET_OPACITY = w3cGetOpacity;
                    SET_OPACITY = w3cSetOpacity;
                } else if (CSS_INFO.filterOpacity) {
                    GET_OPACITY = ieGetOpacity;
                    SET_OPACITY = ieSetOpacity;
                }
                if (CSS_INFO.alphaColor) {
                    EXPORTS.colorUnit = "rgba";
                }
            }
            module.exports = EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var CORE = __webpack_require__(2), FORMAT = __webpack_require__(20), COLOR_RE = /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/, NUMBER_RE = /^[0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*$/, REMOVE_SPACES = /[ \r\n\t\s]+/g, TO_COLOR = {
            rgb: __webpack_require__(21),
            rgba: __webpack_require__(22),
            hsl: __webpack_require__(23),
            hsla: __webpack_require__(24),
            hex: __webpack_require__(25)
        }, EXPORTS = {
            parse: parseColorString,
            parseType: parseType,
            stringify: toColorString
        };
        function parseType(str) {
            str = preParseValue(str);
            if (str) {
                return parseColorStringType(str) || null;
            }
            return null;
        }
        function preParseValue(str) {
            if (typeof str === "string") {
                str = str.replace(REMOVE_SPACES, "");
                if (COLOR_RE.test(str)) {
                    return str;
                }
            }
            return null;
        }
        function parseColorStringType(str) {
            var list = TO_COLOR, m = str.match(COLOR_RE), type = m[1];
            var items, isHex, item;
            if (!CORE.contains(list, type)) {
                type = "hex";
            }
            items = m[3];
            isHex = !items;
            if (isHex) {
                items = m[2];
                if (items.length < 6) {
                    item = items.charAt(2);
                    items = [ items.charAt(0), items.substring(0, 2), items.charAt(1), item, item ].join("");
                }
            } else {
                items = items.split(",");
            }
            return [ type, isHex, items ];
        }
        function parseColorString(str) {
            var F = FORMAT, formatPercent = F.PERCENT, formatNumber = F.NUMBER, formatHex = F.HEX, numberRe = NUMBER_RE;
            var parsed, c, l, item, items, itemizer, processor, type, isHex, toProcess;
            str = preParseValue(str);
            parsed = str && parseColorStringType(str);
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
                } else {
                    l = items.length;
                }
                for (;l--; ) {
                    item = items[++c];
                    if (isHex) {
                        item = items.substring(c * 2, c * 2 + 2);
                    } else if (!numberRe.test(item)) {
                        return null;
                    }
                    toProcess[c] = itemizer(item, c, isHex ? formatHex : item.charAt(item.length - 1) === "%" ? formatPercent : formatNumber);
                }
                return processor.toInteger.apply(processor, toProcess);
            }
            return null;
        }
        function toColorString(colorValue, type) {
            var list = TO_COLOR, C = CORE;
            if (arguments.length < 2) {
                type = "hex";
            }
            if (!C.contains(list, type) || !C.number(colorValue)) {
                return null;
            }
            colorValue = Math.round(colorValue);
            return list[type].toString(colorValue);
        }
        module.exports = EXPORTS;
    }, function(module, exports) {
        "use strict";
        var EXPORTS = module.exports = {
            NUMBER: 1,
            HEX: 2,
            PERCENT: 3,
            format: convert2Number
        };
        function convert2Number(value, format) {
            var parse = parseFloat, F = EXPORTS;
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
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var RGBA = __webpack_require__(22), CORE = __webpack_require__(2), EXPORTS = module.exports = CORE.assign({}, RGBA);
        function toString(integer) {
            return "rgb(" + RGBA.toArray(integer).slice(0, 3).join(",") + ")";
        }
        function toInteger(r, g, b) {
            return RGBA.toInteger(r, g, b, 100);
        }
        EXPORTS.toString = toString;
        EXPORTS.toInteger = toInteger;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var CORE = __webpack_require__(2), FORMAT = __webpack_require__(20), BYTE = 255, BYTE_PERCENT = 127, BYTE_HUE = 511, PERCENT = 100, HUE = 360, SATURATION = PERCENT, LUMINOSITY = PERCENT;
        function hue2rgb(p, q, t) {
            t = (t + 1) % 1;
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
        function itemize(value, index, format) {
            var M = Math, min = 0, max = index > 2 ? PERCENT : BYTE;
            value = FORMAT.format(value, format);
            return M.max(min, M.min(max, value));
        }
        function toArray(integer) {
            var M = Math, h2r = hue2rgb, size = BYTE, psize = BYTE_PERCENT, h = integer & BYTE_HUE, s = integer >> 9 & psize, l = integer >> 16 & psize, a = integer >> 23 & psize;
            var q, p;
            l /= LUMINOSITY;
            if (s === 0) {
                return [ l, l, l ];
            }
            h /= HUE;
            s /= SATURATION;
            q = l < .5 ? l * (1 + s) : l + s - l * s;
            p = 2 * l - q;
            return [ M.round(h2r(p, q, h + 1 / 3) * size), M.round(h2r(p, q, h) * size), M.round(h2r(p, q, h - 1 / 3) * size), a ];
        }
        function toInteger(r, g, b, a) {
            var M = Math, size = BYTE, psize = BYTE_PERCENT;
            var max, min, h, s, l, d;
            r /= size;
            g /= size;
            b /= size;
            max = M.max(r, g, b);
            min = M.min(r, g, b);
            l = (max + min) / 2;
            if (max == min) {
                h = s = 0;
            } else {
                d = max - min;
                s = l > .5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                  case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;

                  case g:
                    h = (b - r) / d + 2;
                    break;

                  case b:
                    h = (r - g) / d + 4;
                    break;
                }
                h /= 6;
            }
            if (!CORE.number(a)) {
                a = PERCENT;
            }
            return (a & psize) << 23 | (l * LUMINOSITY & psize) << 16 | (s * SATURATION & psize) << 9 | h * HUE & BYTE_HUE;
        }
        function toString(integer) {
            var values = toArray(integer), alpha = values[3] / PERCENT;
            values[3] = parseFloat(alpha.toFixed(2));
            return "rgba(" + values.join(",") + ")";
        }
        module.exports = {
            itemize: itemize,
            toArray: toArray,
            toInteger: toInteger,
            toString: toString
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var HSLA = __webpack_require__(23), CORE = __webpack_require__(2), EXPORTS = module.exports = CORE.assign({}, HSLA);
        function toString(integer) {
            var values = HSLA.toArray(integer).slice(0, 3);
            values[1] += "%";
            values[2] += "%";
            return "hsl(" + values.join(",") + ")";
        }
        EXPORTS.toString = toString;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var CORE = __webpack_require__(2), FORMAT = __webpack_require__(20), BYTE = 255, BYTE_PERCENT = 127, BYTE_HUE = 511, HUE = 360, PERCENT = 100;
        function itemize(value, index, format) {
            var F = FORMAT, M = Math, percent = PERCENT, parse = parseFloat, min = 0, max = index < 1 ? HUE : percent;
            switch (format) {
              case F.HEX:
                value = parseInt(value, 16) / BYTE * max;
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
            return (a & psize) << 23 | (l & psize) << 16 | (s & psize) << 9 | h & BYTE_HUE;
        }
        function toArray(integer) {
            var psize = BYTE_PERCENT;
            return [ integer & BYTE_HUE, integer >> 9 & psize, integer >> 16 & psize, integer >> 23 & psize ];
        }
        function toString(integer) {
            var values = toArray(integer);
            values[1] += "%";
            values[2] += "%";
            values[3] = (values[3] / PERCENT).toFixed(2);
            return "hsla(" + values.join(",") + ")";
        }
        module.exports = {
            itemize: itemize,
            toInteger: toInteger,
            toArray: toArray,
            toString: toString
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var RGBA = __webpack_require__(22), CORE = __webpack_require__(2), EXPORTS = module.exports = CORE.assign({}, RGBA);
        function toHex(integer) {
            return (integer < 16 ? "0" : "") + integer.toString(16);
        }
        function toString(integer) {
            var convert = toHex, values = RGBA.toArray(integer).slice(0, 3);
            values[0] = convert(values[0]);
            values[1] = convert(values[1]);
            values[2] = convert(values[2]);
            return "#" + values.join("");
        }
        EXPORTS.toString = toString;
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var CORE = __webpack_require__(2), INFO = __webpack_require__(9), STRING = __webpack_require__(17), DOM = __webpack_require__(16), EVENTS = null, PAGE_UNLOADED = false, IE_CUSTOM_EVENTS = {}, ERROR_OBSERVABLE_NO_SUPPORT = STRING[1131], ERROR_INVALID_TYPE = STRING[1132], ERROR_INVALID_HANDLER = STRING[1133], IE_CUSTOM_TYPE_EVENT = "propertychange", EXPORTS = module.exports = {
                on: listen,
                un: unlisten,
                fire: dispatch,
                purge: purge
            };
            var RESOLVE, LISTEN, UNLISTEN, DISPATCH, EVENT_INFO, IS_CAPABLE, SUBJECT;
            function listen(observable, type, handler, context) {
                var last = EVENTS;
                var current;
                if (!CORE.string(type)) {
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
                if (!CORE.string(type)) {
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
                var hasOwn = CORE.contains, event = global.document.createEvent("Event");
                var name;
                event.initEvent(type, properties.bubbles !== false, properties.cancelable !== false);
                for (name in properties) {
                    if (hasOwn(properties, name) && !(name in event)) {
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
                var hasOwn = CORE.contains, event = global.document.createEventObject();
                var name, node;
                for (name in properties) {
                    if (hasOwn(properties, name) && !(name in event)) {
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
                var supported = false, list = IE_CUSTOM_EVENTS;
                var element, access, ontype;
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
            var CORE = __webpack_require__(2), DETECTED = __webpack_require__(9), STRING = __webpack_require__(17), DOM = __webpack_require__(16), CSS = __webpack_require__(18), ERROR_INVALID_ELEMENT = STRING[1101], ERROR_INVALID_DOM = STRING[1102], OFFSET_TOP = "offsetTop", OFFSET_LEFT = "offsetLeft", OFFSET_WIDTH = "offsetWidth", OFFSET_HEIGHT = "offsetHeight", MARGIN_TOP = "marginTop", MARGIN_LEFT = "marginLeft", SCROLL_TOP = "scrollTop", SCROLL_LEFT = "scrollLeft", BOUNDING_RECT = "getBoundingClientRect", DEFAULTVIEW = null, ELEMENT_VIEW = 1, PAGE_VIEW = 2, USE_ZOOM_FACTOR = false, IE_PAGE_STAT_ACCESS = "documentElement", boundingRect = false, getPageScroll = null, getOffset = null, getSize = null, getScreenSize = null, EXPORTS = {
                offset: offset,
                size: size,
                box: box,
                scroll: scroll,
                screen: screen,
                visible: visible,
                translate: translateBox
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
                    return getOffset(element).slice(0, 2);
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
                var applyStyle, viewmode, dimension;
                if (arguments.length > 1) {
                    applyStyle = translateBox(element, x, y, null, null, width, height);
                    if (applyStyle) {
                        CSS.style(element, applyStyle);
                    }
                    return EXPORTS.chain;
                }
                viewmode = isViewable(element);
                if (viewmode === PAGE_VIEW) {
                    dimension = pageBox(element);
                    x = dimension[0];
                    y = dimension[1];
                    width = dimension[2];
                    height = dimension[3];
                    dimension = screen(element);
                    return [ x, y, width - x - dimension[2], height - y - dimension[3], width, height ];
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
                var css = CSS, cssValue = css.unitValue, parse = parseFloat, NUMBER = "number", hasLeft = false, hasTop = hasLeft, hasRight = hasLeft, hasBottom = hasLeft;
                var hasWidth, hasHeight, diff, currentDimension;
                if (isViewable(element) !== ELEMENT_VIEW) {
                    throw new Error(ERROR_INVALID_ELEMENT);
                }
                if (x instanceof Array) {
                    target = y;
                    if (x.length > 4) {
                        height = 5 in x ? x[5] : null;
                        width = 4 in x ? x[4] : null;
                        bottom = 3 in x ? x[3] : null;
                        right = 2 in x ? x[2] : null;
                    } else {
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
                currentDimension = css.computedStyle(element, "position", "top", "left", "right", "bottom", "width", "height");
                switch (currentDimension.position) {
                  case "relative":
                  case "absolute":
                  case "fixed":
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
                            target.left = typeof x === NUMBER ? parse(currentDimension.left || 0) + (x - diff[0]) + "px" : x;
                        } else if (hasRight) {
                            target.right = typeof right === NUMBER ? parse(currentDimension.right || 0) + (right - diff[2]) + "px" : right;
                        }
                        if (hasTop) {
                            target.top = typeof y === NUMBER ? parse(currentDimension.top || 0) + (y - diff[1]) + "px" : y;
                        } else if (hasBottom) {
                            target.bottom = typeof right === NUMBER ? parse(currentDimension.bottom || 0) + (bottom - diff[3]) + "px" : bottom;
                        }
                    }
                }
                width = cssValue(width);
                hasWidth = width !== false;
                if (hasWidth) {
                    target.width = typeof width === NUMBER ? parse(currentDimension.width || 0) + (width - element[OFFSET_WIDTH]) + "px" : width;
                }
                height = cssValue(height);
                hasHeight = height !== false;
                if (hasHeight) {
                    target.height = typeof height === NUMBER ? parse(currentDimension.height || 0) + (height - element[OFFSET_HEIGHT]) + "px" : height;
                }
                return hasLeft || hasRight || hasTop || hasBottom || hasWidth || hasHeight ? target : null;
            }
            function scroll(dom, x, y) {
                var setter = arguments.length > 1, isNumber = CORE.number, stop = SCROLL_TOP, sleft = SCROLL_LEFT;
                var current, window;
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
                        dom[sleft] = x === false ? dom[sleft] : x;
                        dom[stop] = y === false ? dom[stop] : y;
                    } else {
                        return [ dom[sleft], dom[stop] ];
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
                var style = null, css = CSS, isString = CORE.string, len = arguments.length, attached = isViewable(element) === ELEMENT_VIEW;
                if (len > 1) {
                    style = {};
                    if (isString(visibility)) {
                        style.visibility = visibility;
                    } else if (typeof visiblity === "boolean") {
                        style.visibility = visibility ? "visible" : "hidden";
                    }
                    if (displayed === false) {
                        displayed = "none";
                    }
                    if (isString(displayed)) {
                        style.display = displayed;
                    }
                    css.style(element, style);
                    return EXPORTS.chain;
                }
                if (attached) {
                    style = CSS.computedStyle(element, "display", "visibility");
                    return style.display !== "none" && style.visibility !== "hidden";
                }
                return false;
            }
            function screen(dom) {
                var help = DOM, subject = dom;
                var box, size;
                if (help.is(subject, 1, 9)) {
                    subject = (subject.nodeType === 1 ? subject.ownerDocument : subject)[help.documentViewAccess];
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
                return [ window.innerWidth, window.innerHeight ];
            }
            function ieScreenSize(window) {
                var factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1, subject = window.document[IE_PAGE_STAT_ACCESS], size = [ subject.clientWidth * factor, subject.clientHeight * factor ];
                subject = null;
                return size;
            }
            function rectSize(element, boundingRect) {
                var M = Math, rect = boundingRect || element[BOUNDING_RECT](), size = [ M.max(0, rect.width || 0), M.max(0, rect.height || 0) ];
                rect = null;
                return size;
            }
            function manualSize(element) {
                var M = Math;
                return [ M.max(0, element[OFFSET_WIDTH] || 0), M.max(0, element[OFFSET_HEIGHT] || 0) ];
            }
            function rectOffset(element, boundingRect) {
                var page = screen(element), rect = boundingRect || element[BOUNDING_RECT](), factor = DIMENSION_INFO.zoomfactor ? getZoomFactor(global.window.document[IE_PAGE_STAT_ACCESS]) : 1, scrollX = page[0], scrollY = page[1], x = rect.left * factor + scrollX, y = rect.top * factor + scrollY, offset = [ x, y, rect.right * factor - page[2], rect.bottom * factor - page[3] ];
                rect = null;
                return offset;
            }
            function manualOffset(element) {
                var root = global.document[IE_PAGE_STAT_ACCESS], css = CSS, top = OFFSET_TOP, left = OFFSET_LEFT, mtop = MARGIN_TOP, mleft = MARGIN_LEFT, stop = SCROLL_TOP, sleft = SCROLL_LEFT, findStyles = [ mleft, mtop ], parent = element.offsetParent, style = css.computedStyle(element, [ findStyles ]), page = screen(element), x = element[left], y = element[top];
                x += parseFloat(style[mleft]) || 0;
                y += parseFloat(style[mtop]) || 0;
                for (;parent; parent = parent.offsetParent) {
                    if (parent.nodeType === 1) {
                        style = css.computedStyle(parent, findStyles);
                        x += (parent[left] || 0) + (parent.clientLeft || 0) + (parseFloat(style[mleft]) || 0);
                        y += (parent[top] || 0) + (parent.clientTop || 0) + (parseFloat(style[mtop]) || 0);
                    }
                }
                for (parent = element.parentNode; parent; parent = parent.parentNode) {
                    if (parent.nodeType === 1 && parent !== root) {
                        x += parent[sleft] || 0;
                        y += parent[stop] || 0;
                    }
                }
                root = parent = null;
                return [ x, y, x + element[OFFSET_WIDTH] - page[2], y + element[OFFSET_HEIGHT] - page[3] ];
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
                var M = Math, subject = window.document[IE_PAGE_STAT_ACCESS], factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1, offset = [ M.round(subject[SCROLL_LEFT] / factor), M.round(subject[SCROLL_TOP] / factor) ];
                subject = null;
                return offset;
            }
            function getZoomFactor(window) {
                var factor = 1;
                var rect, body;
                if (boundingRect) {
                    body = window.document.body;
                    rect = body[BOUNDING_RECT]();
                    factor = Math.round((rect.right - rect.left / body[OFFSET_WIDTH]) * 100) / 100;
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
                boundingRect = DIMENSION_INFO.rectmethod && BOUNDING_RECT;
                getOffset = boundingRect ? rectOffset : manualOffset;
                getSize = boundingRect ? rectSize : manualSize;
            }
            module.exports = EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var DETECTED = __webpack_require__(9), STRING = __webpack_require__(17), DOM = __webpack_require__(16), DIMENSION = __webpack_require__(27), DETECTED_DOM = DETECTED.dom, DETECTED_SELECTION = DETECTED.selection, ERROR_DOM = STRING[1102], SELECT_ELEMENT = null, CLEAR_SELECTION = null, UNSELECTABLE = attributeUnselectable, CSS_UNSELECT = DETECTED_SELECTION.cssUnselectable, EXPORTS = {
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
                throw new Error(STRING[2005]);
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
        var STRING = __webpack_require__(17), CORE = __webpack_require__(2), EASING = __webpack_require__(30), COLOR = __webpack_require__(19), CSS = __webpack_require__(18), DIMENSION = __webpack_require__(27), BOX_POSITION = {
            left: 0,
            top: 1,
            right: 2,
            bottom: 3,
            width: 4,
            height: 5
        }, BOX_RE = CSS.boxRe, DIMENSION_RE = CSS.dimensionRe, COLOR_RE = CSS.colorRe, SESSIONS = {}, EXPORTS = {
            interval: 10,
            each: animate,
            has: hasAnimationType,
            style: animateStyle
        };
        function animate(handler, from, to, type, duration) {
            var M = Math, string = STRING, easing = EASING, C = CORE, isObject = C.object, list = SESSIONS, defaultInterval = EXPORTS.interval, clear = clearInterval, set = setInterval, interval = null, frame = 0;
            var frames, displacements;
            function control() {
                var fn = control;
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
                var specs = displacements, typeObject = isObject;
                if (interval) {
                    if (!typeObject(updates)) {
                        throw new Error(string[1152]);
                    }
                    if (!typeObject(initialValues)) {
                        initialValues = specs[3];
                    }
                    applyDisplacements(specs, initialValues, updates, animationType);
                    frame = 0;
                }
            }
            function callback() {
                var specs = displacements, names = specs[0], from = specs[1], to = specs[2], total = frames, current = ++frame, len = names.length, result = {}, eased = type(current, 0, 1, total), last = current === total;
                var start;
                for (;len--; ) {
                    start = from[len];
                    result[names[len]] = (to[len] - start) * eased + start;
                }
                specs[3] = result;
                handler(result, last);
                if (last) {
                    control();
                }
            }
            if (!(handler instanceof Function)) {
                throw new Error(string[1151]);
            }
            if (!isObject(from) || !isObject(to)) {
                throw new Error(string[1152]);
            }
            type = C.contains(easing, type) ? easing[type] : easing.linear;
            duration = (C.number(duration) && duration > 0 ? duration : 1) * 1e3;
            frames = M.max(10, M.round(duration / defaultInterval));
            displacements = [ [], [], [], from, control ];
            interval = set(callback, defaultInterval);
            control.session = interval;
            control.update = update;
            control.running = true;
            list[interval] = displacements;
            displacements = applyDisplacements(displacements, from, to);
            return control;
        }
        function validValue(value) {
            var C = CORE;
            if (C.string(value)) {
                value = parseFloat(value);
            }
            return C.number(value) && value;
        }
        function applyDisplacements(session, from, to) {
            var hasOwn = CORE.contains, format = validValue, names = session[0], sourceValues = session[1], targetValues = session[2], len = names.length;
            var name, index, source, target;
            for (name in to) {
                if (!hasOwn(to, name)) {
                    continue;
                }
                target = format(to[name]);
                if (target === false) {
                    continue;
                }
                index = names.indexOf(name);
                source = hasOwn(from, name) && format(from[name]);
                if (index === -1) {
                    if (source === false) {
                        continue;
                    }
                    index = len++;
                    names[index] = name;
                } else if (source === false) {
                    source = sourceValues[index];
                }
                sourceValues[index] = source;
                targetValues[index] = target;
            }
            return session;
        }
        function hasAnimationType(type) {
            return CORE.contains(EASING, type);
        }
        function animateStyle(element, styles, type) {
            var values = createElementValues(styles);
            var session, sessionId, animateObject, names, defaults, animateValues, staticValues;
            if (values) {
                names = values[0];
                animateValues = values[1];
                staticValues = values[2];
                if (names) {
                    sessionId = element.__animate_session;
                    defaults = createStyleDefaults(element, names);
                    if (!sessionId) {
                        animateObject = {
                            node: element
                        };
                        session = animate(createElementHandler(animateObject), defaults, animateValues, type);
                        animateObject.id = sessionId = session.session;
                        element.__animate_session = sessionId;
                    } else {
                        session = SESSIONS[sessionId][4];
                        session.update(animateValues, defaults, type);
                    }
                }
                if (staticValues) {
                    CSS.style(element, staticValues);
                }
            }
        }
        function createElementHandler(animate) {
            function onAnimate(values, last) {
                var session = animate, node = session.node;
                DIMENSION.translate(node, values.left, values.top, values.right, values.bottom, values.width, values.height, values);
                CSS.style(node, values);
                if (last) {
                    delete node.__animate_session;
                    session.node = null;
                    delete session.node;
                }
                session = node = null;
            }
            return onAnimate;
        }
        function createStyleDefaults(element, names) {
            var css = CSS, values = css.computedStyle(element, names), dimension = DIMENSION, c = -1, l = names.length, cssValue = css.unitValue, dimensionRe = DIMENSION_RE, colorRe = COLOR_RE, colorParse = COLOR.parse, boxRe = BOX_RE, boxPosition = BOX_POSITION, box = null;
            var name, value;
            for (;l--; ) {
                name = names[++c];
                value = values[name];
                if (boxRe.test(name)) {
                    if (!box) {
                        box = dimension.box(element);
                    }
                    value = box[boxPosition[name]];
                } else if (dimensionRe.test(name)) {
                    value = cssValue(value);
                } else if (colorRe.test(name)) {
                    value = colorParse(value);
                }
                values[name] = parseFloat(value) || 0;
            }
            return values;
        }
        function createElementValues(styles) {
            var C = CORE, hasOwn = C.contains, number = C.number, boxRe = BOX_RE, cssValue = CSS.unitValue, dimensionRe = DIMENSION_RE, colorRe = COLOR_RE, parseColor = COLOR.parse, animateNames = [], len = 0, animateValues = {}, staticValues = {}, hasStaticValues = false;
            var name, raw, value;
            for (name in styles) {
                if (hasOwn(styles, name)) {
                    value = raw = styles[name];
                    if (name === "opacity") {
                        value = parseFloat(raw);
                    } else if (boxRe.test(name) || dimensionRe.test(name)) {
                        value = cssValue(raw);
                    } else if (colorRe.test(name)) {
                        value = parseColor(raw);
                        if (value === null) {
                            value = false;
                        }
                    }
                    if (number(value)) {
                        animateNames[len++] = name;
                        animateValues[name] = value;
                    } else if (value !== false) {
                        hasStaticValues = true;
                        staticValues[name] = value;
                    }
                }
            }
            return (!!len || hasStaticValues) && [ len ? animateNames : null, len ? animateValues : null, hasStaticValues ? staticValues : null ];
        }
        module.exports = EXPORTS;
    }, function(module, exports) {
        "use strict";
        var EXPORTS = module.exports = {
            linear: linearTween,
            easeIn: easeInQuad,
            easeInQuad: easeInQuad,
            easeOut: easeOutQuad,
            easeOutQuad: easeOutQuad,
            easeInOut: easeInOutQuad,
            easeInOutQuad: easeInOutQuad,
            easeInCubic: easeInCubic,
            easeOutCubic: easeOutCubic,
            easeInOutCubic: easeInOutCubic,
            easeInQuart: easeInQuart,
            easeOutQuart: easeOutQuart,
            easeInOutQuart: easeInOutQuart,
            easeInQuint: easeInQuint,
            easeOutQuint: easeOutQuint,
            easeInOutQuint: easeInOutQuint,
            easeInSine: easeInSine,
            easeOutSine: easeOutSine,
            easeInOutSine: easeInOutSine,
            easeInExpo: easeInExpo,
            easeOutExpo: easeOutExpo,
            easeInOutExpo: easeInOutExpo,
            easeInCirc: easeInCirc,
            easeOutCirc: easeOutCirc,
            easeInOutCirc: easeInOutCirc
        };
        function linearTween(currentFrame, startValue, endValue, totalFrames) {
            return endValue * currentFrame / totalFrames + startValue;
        }
        function easeInQuad(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames;
            return endValue * currentFrame * currentFrame + startValue;
        }
        function easeOutQuad(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames;
            return -endValue * currentFrame * (currentFrame - 2) + startValue;
        }
        function easeInOutQuad(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames / 2;
            if (currentFrame < 1) {
                return endValue / 2 * currentFrame * currentFrame + startValue;
            }
            currentFrame--;
            return -endValue / 2 * (currentFrame * (currentFrame - 2) - 1) + startValue;
        }
        function easeInCubic(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames;
            return endValue * currentFrame * currentFrame * currentFrame + startValue;
        }
        function easeOutCubic(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames;
            currentFrame--;
            return endValue * (currentFrame * currentFrame * currentFrame + 1) + startValue;
        }
        function easeInOutCubic(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames / 2;
            if (currentFrame < 1) {
                return endValue / 2 * currentFrame * currentFrame * currentFrame + startValue;
            }
            currentFrame -= 2;
            return endValue / 2 * (currentFrame * currentFrame * currentFrame + 2) + startValue;
        }
        function easeInQuart(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames;
            return endValue * currentFrame * currentFrame * currentFrame * currentFrame + startValue;
        }
        function easeOutQuart(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames;
            currentFrame--;
            return -endValue * (currentFrame * currentFrame * currentFrame * currentFrame - 1) + startValue;
        }
        function easeInOutQuart(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames / 2;
            if (currentFrame < 1) {
                return endValue / 2 * currentFrame * currentFrame * currentFrame * currentFrame + startValue;
            }
            currentFrame -= 2;
            return -endValue / 2 * (currentFrame * currentFrame * currentFrame * currentFrame - 2) + startValue;
        }
        function easeInQuint(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames;
            return endValue * currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + startValue;
        }
        function easeOutQuint(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames;
            currentFrame--;
            return endValue * (currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + 1) + startValue;
        }
        function easeInOutQuint(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames / 2;
            if (currentFrame < 1) {
                return endValue / 2 * currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + startValue;
            }
            currentFrame -= 2;
            return endValue / 2 * (currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + 2) + startValue;
        }
        function easeInSine(currentFrame, startValue, endValue, totalFrames) {
            var M = Math;
            return -endValue * M.cos(currentFrame / totalFrames * (M.PI / 2)) + endValue + startValue;
        }
        function easeOutSine(currentFrame, startValue, endValue, totalFrames) {
            var M = Math;
            return endValue * M.sin(currentFrame / totalFrames * (M.PI / 2)) + startValue;
        }
        function easeInOutSine(currentFrame, startValue, endValue, totalFrames) {
            var M = Math;
            return -endValue / 2 * (M.cos(M.PI * currentFrame / totalFrames) - 1) + startValue;
        }
        function easeInExpo(currentFrame, startValue, endValue, totalFrames) {
            return endValue * Math.pow(2, 10 * (currentFrame / totalFrames - 1)) + startValue;
        }
        function easeOutExpo(currentFrame, startValue, endValue, totalFrames) {
            return endValue * (-Math.pow(2, -10 * currentFrame / totalFrames) + 1) + startValue;
        }
        function easeInOutExpo(currentFrame, startValue, endValue, totalFrames) {
            var M = Math;
            currentFrame /= totalFrames / 2;
            if (currentFrame < 1) {
                return endValue / 2 * M.pow(2, 10 * (currentFrame - 1)) + startValue;
            }
            currentFrame--;
            return endValue / 2 * (-M.pow(2, -10 * currentFrame) + 2) + startValue;
        }
        function easeInCirc(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames;
            return -endValue * (Math.sqrt(1 - currentFrame * currentFrame) - 1) + startValue;
        }
        function easeOutCirc(currentFrame, startValue, endValue, totalFrames) {
            currentFrame /= totalFrames;
            currentFrame--;
            return endValue * Math.sqrt(1 - currentFrame * currentFrame) + startValue;
        }
        function easeInOutCirc(currentFrame, startValue, endValue, totalFrames) {
            var M = Math;
            currentFrame /= totalFrames / 2;
            if (currentFrame < 1) {
                return -endValue / 2 * (M.sqrt(1 - currentFrame * currentFrame) - 1) + startValue;
            }
            currentFrame -= 2;
            return endValue / 2 * (M.sqrt(1 - currentFrame * currentFrame) + 1) + startValue;
        }
        module.exports = EXPORTS;
    } ]);
});

