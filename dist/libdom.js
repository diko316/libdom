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
            var detect = __webpack_require__(2), dom = __webpack_require__(8), css = __webpack_require__(9), event = __webpack_require__(11), dimension = __webpack_require__(12), EXPORTS = {
                version: "0.0.4",
                info: detect,
                is: dom.is,
                isView: dom.isView,
                contains: dom.contains,
                eachNodePreorder: dom.eachPreorder,
                eachNodePostorder: dom.eachPostorder,
                eachNodeLevelorder: dom.eachLevel,
                addClass: css.add,
                removeClass: css.remove,
                on: event.on,
                un: event.un,
                purge: event.purge,
                dispatch: event.fire,
                offset: dimension.offset,
                size: dimension.size,
                box: dimension.box
            };
            function notBrowser() {
                throw new Error("Unable to proceed, not running in a browser.");
            }
            function notBrowserMethodOverride(context) {
                var O = Object.prototype, F = Function, handler = notBrowser, hasOwn = O.hasOwnProperty;
                var name;
                if (O.toString.call(context) === "[object Object]") {
                    if (!(handler instanceof F)) {
                        handler = notBrowser;
                    }
                    for (name in context) {
                        if (hasOwn.call(context, name) && context[name] instanceof F) {
                            context[name] = handler;
                        }
                    }
                }
                return context;
            }
            global["libdom"] = EXPORTS;
            console.log("libdom");
            if (detect) {
                css.chain = event.chain = dimension.chain = EXPORTS;
                dom.initialize();
                css.initialize();
                event.initialize();
                dimension.initialize();
            } else {
                notBrowserMethodOverride(EXPORTS);
            }
            module.exports = EXPORTS;
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
            var DOCUMENT;
            if (typeof WINDOW.window === "object") {
                DOCUMENT = WINDOW.document;
                if (typeof DOCUMENT === "object" && (DOCUMENT.defaultView || DOCUMENT.parentWindow).document === DOCUMENT) {
                    EXPORTS = {
                        strict: DOCUMENT.compatMode === "CSS1Compat"
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
            var WINDOW = global, DOCUMENT = WINDOW.document;
            module.exports = {
                w3c: !!WINDOW.addEventListener,
                ie: !!WINDOW.attachEvent,
                customEvent: !!WINDOW.CustomEvent,
                creator: DOCUMENT.createEvent ? "createEvent" : DOCUMENT.createEventObject ? "createEventObject" : false
            };
            DOCUMENT = null;
            WINDOW = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports) {
        (function(global) {
            "use strict";
            var ROOT = global.document.documentElement;
            module.exports = {
                comparison: "compareDocumentPosition" in ROOT && "compareDocumentPosition" || "contains" in ROOT && "contains" || null
            };
            ROOT = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports) {
        (function(global) {
            "use strict";
            var WINDOW = global, DOCUMENT = WINDOW.document;
            module.exports = {
                computedStyle: WINDOW.getComputedStyle instanceof Function ? "getComputedStyle" : "currentStyle" in DOCUMENT.documentElement ? "currentStyle" : false
            };
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
                pagescroll: "pageXOffset" in WINDOW && "pageYOffset" in WINDOW ? "pageOffset" : null,
                rectmethod: "getBoundingClientRect" in WINDOW.document.documentElement ? "getBoundingClientRect" : null
            };
            WINDOW = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var DETECTED = __webpack_require__(2), EXPORTS = {
            initialize: initialize,
            contains: notSupportedContains,
            is: isDom,
            isView: isDefaultView,
            eachPreorder: preOrderTraverse,
            eachPostorder: postOrderTraverse,
            eachLevel: levelTraverse
        };
        function initialize() {
            var info = DETECTED.dom, context = EXPORTS;
            switch (info.comparison) {
              case "compareDocumentPosition":
                context.contains = w3cContains;
                break;

              case "contains":
                context.contains = ieContains;
                break;

              default:
                context.contains = notSupportedContains;
            }
        }
        function notSupportedContains() {
            throw new Error("DOM position comparison is not supported");
        }
        function w3cContains(ancestor, descendant) {
            return 0 < ancestor.compareDocumentPosition(descendant) & ancestor.ownerDocument.DOCUMENT_POSITION_CONTAINED_BY;
        }
        function ieContains(ancestor, descendant) {
            return ancestor.contains(descendant);
        }
        function preOrderTraverse(element, callback) {
            if (!isDom(element, 1)) {
                throw new Error("Invalid DOM [element] parameter.");
            }
            if (!(callback instanceof Function)) {
                throw new Error("Invalid pre-order traverse [callback] parameter.");
            }
            return orderTraverse(element, callback, true);
        }
        function postOrderTraverse(element, callback) {
            if (!isDom(element, 1)) {
                throw new Error("Invalid DOM [element] parameter.");
            }
            if (!(callback instanceof Function)) {
                throw new Error("Invalid post-order traverse [callback] parameter.");
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
                throw new Error("Invalid DOM [element] parameter.");
            }
            if (!(callback instanceof Function)) {
                throw new Error("Invalid pre/post-order traverse [callback] parameter.");
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
        function isDom(node, nodeType) {
            var is = isFinite;
            var type;
            if (node && typeof node === "object") {
                type = node.nodeType;
                if (typeof type === "number" && is(type)) {
                    if (typeof nodeType === "number" && is(nodeType)) {
                        return type === nodeType;
                    }
                    return true;
                }
            }
            return false;
        }
        function isDefaultView(defaultView) {
            var type = typeof defaultView;
            return !!defaultView && (type === "object" || type === "function") && defaultView === defaultView.window && !!defaultView.document;
        }
        module.exports = EXPORTS.chain = EXPORTS;
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var STRING = __webpack_require__(10), DETECTED = __webpack_require__(2), DOM = __webpack_require__(8), DIMENSION_RE = /width|height|(margin|padding).*|border.+(Width|Radius)/, EM_OR_PERCENT_RE = /%|em/, WIDTH_RE = /width/i, NUMBER_RE = /\d/, EXPORTS = {
                initialize: initialize,
                add: addClass,
                remove: removeClass,
                style: computedStyleNotSupported
            }, SLICE = Array.prototype.slice;
            function initialize() {
                var info = DETECTED.css, context = EXPORTS, computed = info.computedStyle;
                context.style = computed === "getComputedStyle" ? w3cGetCurrentStyle : computed === "currentStyle" ? ieGetCurrentStyle : computedStyleNotSupported;
            }
            function addClass(element) {
                var className;
                if (!DOM.is(element, 1)) {
                    throw new Error("Invalid DOM [element] parameter.");
                }
                className = element.className;
                element.className = STRING.addWord(className, SLICE.call(arguments, 1));
                return EXPORTS.chain;
            }
            function removeClass(element) {
                var className;
                if (!DOM.is(element, 1)) {
                    throw new Error("Invalid DOM [element] parameter.");
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
                    throw new Error("Invalid DOM [element] parameter.");
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
                    throw new Error("Invalid DOM [element] parameter.");
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
            module.exports = EXPORTS;
            EXPORTS.chain = EXPORTS;
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
            var INFO = __webpack_require__(2), EVENTS = null, IE_CUSTOM_EVENTS = {}, HAS_OWN_PROPERTY = Object.prototype.hasOwnProperty, ERROR_OBSERVABLE_NO_SUPPORT = "Invalid [observable] parameter.", EXPORTS = module.exports = {
                initialize: initialize,
                on: listen,
                un: unlisten,
                fire: dispatch,
                purge: purge
            };
            var RESOLVE, LISTEN, UNLISTEN, DISPATCH;
            function initialize() {
                var info = INFO.event;
                switch (true) {
                  case info.w3c:
                    LISTEN = w3cListen;
                    UNLISTEN = w3cUnlisten;
                    DISPATCH = w3cDispatch;
                    RESOLVE = w3cObservable;
                    break;

                  case info.ie:
                    LISTEN = ieListen;
                    UNLISTEN = ieUnlisten;
                    DISPATCH = ieDispatch;
                    RESOLVE = ieObservable;
                    break;
                }
            }
            function listen(observable, type, handler, context) {
                var last = EVENTS;
                var current;
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
                        event = null;
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
                observable.attachEvent(isCustomEvent ? "ondataavailable" : "on" + type, listener);
                return [ observable, type, handler, context, listener ];
            }
            function ieUnlisten(observable, type, listener) {
                observable.detachEvent(listener.customType ? "ondataavailable" : "on" + type, listener);
            }
            function ieDispatch(observable, type, properties) {
                var hasOwn = HAS_OWN_PROPERTY, event = global.document.createEventObject();
                var name;
                for (name in properties) {
                    if (hasOwn.call(properties, name) && !(name in event)) {
                        event[name] = properties[name];
                    }
                }
                if (ieTestCustomEvent(observable, type)) {
                    event.customType = type;
                    type = "dataavailable";
                }
                observable.fireEvent("on" + type, event);
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
            EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var DETECTED = __webpack_require__(2), DOM = __webpack_require__(8), CSS = __webpack_require__(9), boundingRect = false, getScrollFromChrome = null, getOffset = null, getSize = null, getBox = null, EXPORTS = {
                initialize: initialize,
                offset: offset,
                size: size,
                box: box
            };
            function offset(element, x, y) {
                if (!DOM.is(element, 1)) {
                    throw new Error("Invalid DOM [element] parameter.");
                }
                if (arguments.length > 1) {
                    return box(element, x, y);
                }
                return getOffset(element);
            }
            function size(element, width, height) {
                if (!DOM.is(element, 1)) {
                    throw new Error("Invalid DOM [element] parameter.");
                }
                if (arguments.length > 1) {
                    return box(element, null, null, width, height);
                }
                return getSize(element);
            }
            function box(element, x, y, width, height) {
                var is = isFinite, M = Math, css = CSS;
                var hasLeft, hasTop, hasWidth, hasHeight, parent, diff, diff1, diff2, style, style1, style2, styleAttribute;
                if (!DOM.is(element, 1)) {
                    throw new Error("Invalid DOM [element] parameter.");
                }
                if (arguments.length > 1) {
                    if (x instanceof Array) {
                        height = 3 in x ? x[3] : null;
                        width = 2 in x ? x[2] : null;
                        y = 1 in y ? x[1] : null;
                        x = x[0];
                    }
                    hasLeft = hasTop = hasWidth = hasHeight = false;
                    if (typeof x === "number" && is(x)) {
                        hasLeft = true;
                    }
                    if (typeof y === "number" && is(y)) {
                        hasTop = true;
                    }
                    if (typeof width === "number" && is(width)) {
                        hasWidth = true;
                    }
                    if (typeof height === "number" && is(height)) {
                        hasHeight = true;
                    }
                    if (hasLeft || hasTop || hasWidth || hasHeight) {
                        styleAttribute = element.style;
                        style = css.style(element, "position", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom");
                        if (hasLeft || hasTop) {
                            diff = getOffset(element);
                            diff1 = diff2 = 0;
                            if (hasLeft) {
                                diff1 = x - diff[0];
                            }
                            if (hasTop) {
                                diff2 = y - diff[1];
                            }
                            style1 = element.offsetLeft || 0;
                            style2 = element.offsetTop || 0;
                            switch (style.position) {
                              case "relative":
                                parent = element.offsetParent;
                                if (parent) {
                                    parent = css.style(parent, "paddingTop", "paddingLeft");
                                    style1 -= parseInt(parent.paddingLeft, 10) || 0;
                                    style2 -= parseInt(parent.paddingTop, 10) || 0;
                                }

                              case "absolute":
                              case "fixed":
                                styleAttribute.left = style1 + diff1 + "px";
                                styleAttribute.top = style2 + diff2 + "px";
                                break;
                            }
                        }
                        if (hasWidth || hasHeight) {
                            if (hasWidth) {
                                diff = width - element.offsetWidth;
                                style1 = element.clientWidth - (parseInt(style.paddingLeft, 10) || 0) - (parseInt(style.paddingRight, 10) || 0);
                                styleAttribute.width = M.max(style1 + diff, 0) + "px";
                            }
                            if (hasHeight) {
                                diff = height - element.offsetHeight;
                                style1 = element.clientHeight - (parseInt(style.paddingTop, 10) || 0) - (parseInt(style.paddingBottom, 10) || 0);
                                styleAttribute.height = M.max(style1 + diff, 0) + "px";
                            }
                        }
                    }
                    parent = styleAttribute = null;
                    return EXPORTS.chain;
                }
                return getBox(element);
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
                var scrolled = getScrollFromChrome(), rect = boundingRect || element.getBoundingClientRect(), offset = [ rect.left + scrolled[0], rect.top + scrolled[1] ];
                rect = null;
                return offset;
            }
            function manualOffset(element) {
                var root = global.document.documentElement, offset = [ element.offsetLeft, element.offsetTop ], parent = element.offsetParent;
                for (;parent; parent = parent.offsetParent) {
                    if (parent.nodeType === 1) {
                        offset[0] += (parent.offsetLeft || 0) + (parent.clientLeft || 0);
                        offset[1] += (parent.offsetTop || 0) + (parent.clientTop || 0);
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
            function w3cPageScrollOffset() {
                var win = global, doc = win.document, root = doc.documentElement, body = doc.body, offset = [ (win.pageXOffset || 0) - (root.clientLeft || body.clientLeft || 0), (win.pageYOffset || 0) - (root.clientTop || body.clientTop || 0) ];
                win = doc = root = body = null;
                return offset;
            }
            function iePageScrollOffset() {
                var M = Math, doc = global.document, root = doc.documentElement, body = doc.body, factor = 1;
                var rect, offset;
                if (boundingRect) {
                    rect = body.getBoundingClientRect();
                    factor = M.round((rect.right - rect.left / body.offsetWidth) * 100) / 100;
                }
                offset = [ M.round(root.scrollLeft / factor) - (root.clientLeft || body.clientLeft || 0), M.round(root.scrollTop / factor) - (root.clientTop || body.clientTop || 0) ];
                doc = root = body = null;
                return offset;
            }
            function initialize() {
                var info = DETECTED.dimension;
                getScrollFromChrome = info.pagescroll === "pageOffset" ? w3cPageScrollOffset : iePageScrollOffset;
                boundingRect = info.rectmethod === "getBoundingClientRect";
                getOffset = boundingRect ? rectOffset : manualOffset;
                getSize = boundingRect ? rectSize : manualSize;
                getBox = boundingRect ? rectBox : manualBox;
            }
            module.exports = EXPORTS;
            EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    } ]);
});

