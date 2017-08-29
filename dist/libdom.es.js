import { array, camelize, contains, createRegistry, each, env, method, middleware, number, object, register, string } from 'libcore';

var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {};

var MAIN = null;

function use(chain) {
        MAIN = chain;
    }
    
function get() {
        return MAIN;
    }

var ROOT = global$1;
var browser = env.browser;
var ieVersion = 0;
var exported$3 = false;

var match;
var ieVersion;

if (browser) {
  match = env.userAgent.match(/msie ([0-9]+\.[0-9]+)/i);

  exported$3 = {
    strict: ROOT.document.compatMode === 'CSS1Compat',
    ieVersion: match && parseInt(match[1], 10) || 0,
    ie8: ieVersion === 8
  };

}

ROOT = null;

var browser$1 = exported$3;

var WINDOW = global$1;
var exported$4 = false;

if (browser$1) {
  exported$4 = {
    w3c: !!WINDOW.addEventListener,
    ie: !!WINDOW.attachEvent,
    customEvent: !!WINDOW.CustomEvent
  };
}

WINDOW = null;

var domEvent = exported$4;

var WINDOW$1 = global$1;
var exported$5 = false;
var DOCUMENT;
var ROOT$1;

if (browser$1) {
  DOCUMENT = WINDOW$1.document;
  ROOT$1 = DOCUMENT.documentElement;
  exported$5 = {
    compare: !!ROOT$1.compareDocumentPosition,
    contains: !!ROOT$1.contains,
    defaultView: DOCUMENT.defaultView ?
                    'defaultView' :
                    DOCUMENT.parentWindow ?
                        'parentWindow' : null,
    querySelectorAll: !!DOCUMENT.querySelectorAll,
    listToArray: ROOT$1.childNodes instanceof Object
  };

}

DOCUMENT = ROOT$1 = null;

var dom = exported$5;

var WINDOW$2 = global$1;
var exported$6 = false;
var DOC;
var DIV;
var STYLE;
var name;
var color;

function detectAlphaColor(style) {
    var rgba = 'rgba(0,0,0,0.5)';

    try {
        style.color = rgba;
        color = style.color;

        if (string(color)) {
            color = color.replace(/[ \r\n\t\s]+/g, '').toLowerCase();
        }

        if (rgba === color) {
            return true;
        }
    }
    catch (e) {}

    return false;
}

function detectTransition(style) {
    var supports = ['OTransition',
                            'webkitTransition',
                            'MozTransition',
                            'transition'],
        l = supports.length;

    for (l = supports.length; l--;) {
        name = supports[l];
        if (typeof style[name] !== 'undefined') {
            return name;
        }
    }
    return false;
}


if (browser$1) {
  DOC = WINDOW$2.document;
  DIV = DOC.createElement('div');
  STYLE = DIV.style;

  exported$6 = {
    w3cStyle: !!WINDOW$2.getComputedStyle,
    ieStyle: !!DOC.documentElement.currentStyle,
    setattribute: !!STYLE.setAttribute,
    setproperty: !!STYLE.setProperty,
    opacity: typeof STYLE.opacity !== 'undefined',
    filterOpacity: typeof STYLE.filter !== 'undefined',
    alphaColor: detectAlphaColor(STYLE),
    transition: detectTransition(STYLE)
  };

}

WINDOW$2 = DOC = DIV = STYLE = null;

var css = exported$6;

var WINDOW$3 = global$1;
var exported$7 = false;
var ieVersion$1;

if (browser$1) {
  ieVersion$1 = browser$1.ieVersion;
  exported$7 = {
    screensize: typeof WINDOW$3.innerWidth !== 'undefined',
    pagescroll: typeof WINDOW$3.pageXOffset !== 'undefined',
    rectmethod: !!WINDOW$3.document.documentElement.getBoundingClientRect,
    zoomfactor: ieVersion$1 > 0 && ieVersion$1 < 8,
    ie8: ieVersion$1 === 8
  };

}

WINDOW$3 = null;

var dimension = exported$7;

var exported$8 = false;
var DOCUMENT$1;
var ROOTSTYLE;
var UNDEFINED;

if (browser$1) {
  DOCUMENT$1 = global$1.document;
  ROOTSTYLE = DOCUMENT$1.documentElement.style;
  UNDEFINED = 'undefined';

  exported$8 = {
    range: !!DOCUMENT$1.createRange,
    textrange: !!DOCUMENT$1.createElement('input').createTextRange,
    cssUnselectable: typeof ROOTSTYLE.MozUserSelect !== UNDEFINED ?
                        'MozUserSelect' :
                        typeof ROOTSTYLE.webkitUserSelect !== UNDEFINED ?
                            'webkitUserSelect' : false
  };

}

DOCUMENT$1 = ROOTSTYLE = null;

var selection = exported$8;

var exported$2 = false;

if (browser$1) {
    exported$2 = {
      browser: browser$1,
      event: domEvent,
      dom: dom,
      css: css,
      dimension: dimension,
      selection: selection
    };
}

var DETECTED = exported$2;

var SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/;
var STYLIZE_RE = /^([Mm]oz|[Ww]ebkit|[Mm]s|[oO])[A-Z]/;
var HTML_ESCAPE_CHARS_RE = /[^\u0021-\u007e]|[\u003e\u003c\&\"\']/g;
var TEXTAREA = null;
var exported$9 = {
        camelize: camelize,
        stylize: stylize,
        addWord: addWord,
        removeWord: removeWord,
        
        xmlEncode: xmlEncode,
        xmlDecode: xmlDecode,
        
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


function initialize() {
    if (DETECTED) {
        TEXTAREA = global$1.document.createElement('textarea');
        // register destructor
        register("libdom.event.global-destroy", onDestroy);
    }
}

function onDestroy() {
    TEXTAREA = null;
}

function stylize(str) {
        str = camelize(str);
        return STYLIZE_RE.test(str) ?
                    str.charAt(0).toUpperCase() + str.substring(1, str.length) :
                    str;
    }

function addWord(str, items) {
        var isString = string,
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

function xmlDecode(subject) {
        var textarea = TEXTAREA;
        var value = '';
        if (textarea) {
            textarea.innerHTML = subject;
            value = textarea.value;
        }
        textarea = null;
        return value;
    }
    
function xmlEncode(subject) {
        return subject.replace(HTML_ESCAPE_CHARS_RE, htmlescapeCallback);
    }


initialize();

var EVENTS = null;
var PAGE_UNLOADED = false;
var MIDDLEWARE = middleware('libdom.event');
var IE_CUSTOM_EVENTS = {};
var ERROR_OBSERVABLE_NO_SUPPORT = exported$9[1131];
var ERROR_INVALID_TYPE = exported$9[1132];
var ERROR_INVALID_HANDLER = exported$9[1133];
var IE_ON = 'on';
var IE_BUBBLE_EVENT = 'beforeupdate';
var IE_NO_BUBBLE_EVENT = 'propertychange';
var exported$10 = {
                on: listen,
                un: unlisten,
                fire: dispatch,
                purge: purge,
                ondestroy: addDestructor
            };

var RESOLVE;
var LISTEN;
var UNLISTEN;
var DISPATCH;
var EVENT_INFO;
var IS_CAPABLE;
var SUBJECT;

function listen(observable, type, handler, context) {
    var last = EVENTS;
    var current, args;

    if (!string(type)) {
        throw new Error(ERROR_INVALID_TYPE);
    }

    if (!method(handler)) {
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
    var found, len, args;

    if (!string(type)) {
        throw new Error(ERROR_INVALID_TYPE);
    }

    if (!method(handler)) {
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

    return get();
}


function dispatch(observable, type, defaults) {

    if (!string(type)) {
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

    return get();
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
    var hasOwn = contains,
        event = global$1.document.createEvent("Event");
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
    var isFunction = method;

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
    var hasOwn = contains,
        event = global$1.document.createEventObject();
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
        var event = global$1.event;
        iePolyfillEvent(event);
        MIDDLEWARE.run('dispatch', [event.type, event]);
        return handler.call(context, event);
    }
    return onEvent;
}

function ieCreateCustomHandler(type, handler, context) {
    function onEvent() {
        var event = global$1.event;
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
    if (method(handler)) {
        MIDDLEWARE.register('global-destroy', handler);
    }
    return get();
}


RESOLVE = LISTEN = UNLISTEN = DISPATCH = null;

/**
 * Initialize
 */
EVENT_INFO = DETECTED && DETECTED.event;

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
        SUBJECT = global$1;

        // register destructors
        listen(SUBJECT, 'beforeunload', onBeforeUnload);
        listen(SUBJECT, 'unload', onBeforeUnload);
        SUBJECT = null;
    }
}

var ORDER_TYPE_PREORDER = 1;
var ORDER_TYPE_POSTORDER = 2;
var ORDER_TYPE_LEVELORDER = 3;
var CSS_SELECT = notSupportedQuerySelector;
var ERROR_INVALID_DOM = exported$9[1101];
var ERROR_INVALID_DOM_NODE = exported$9[1103];
var ERROR_INVALID_CSS_SELECTOR = exported$9[1111];
var ERROR_INVALID_CALLBACK = exported$9[1112];
var ERROR_INVALID_ELEMENT_CONFIG = exported$9[1121];
var INVALID_DESCENDANT_NODE_TYPES = { 9:1, 11:1 };
var STD_CONTAINS = notSupportedContains;
var DOM_ATTRIBUTE_RE = /(^\_|[^a-zA-Z\_])/;
var DOM_ATTRIBUTE_LIST = [
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
    ];
var EVENT_ATTRIBUTE_RE = /^on(\-?[a-zA-Z].+)?$/;
var MANIPULATION_HELPERS = createRegistry();

var DOM_INFO;



/**
 * node contains...
 */


function notSupportedContains() {
    throw new Error(exported$9[2004]);
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
        throw new Error(exported$9[1001]);
    }

    if (!method(handler)) {
        throw new Error(exported$9[1011]);
    }

    MANIPULATION_HELPERS.set(name, handler);

    return get();
}

function purgeEventsFrom(element) {
    exported$10.purge(element);
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
    var listen$$1;

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
        listen$$1 = name.substring(name.charAt(2) === '-' ? 3 : 2, name.length);

        if (listen$$1 === 'on' && object(value)) {
            each(value, applyEventAttribute, element);
        }
        else {
            applyEventAttribute.call(element, value, listen$$1);
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
        exported$10.on(element, name, handler);
    }

    element = null;
}

function applyConfigToElement(element, config, usedFragment) {
    var hasOwn = contains,
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
                childNodes = exported$9.xmlEncode(childNodes);
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
    if (!isDom(dom, 9, 1)) {
        throw new Error(ERROR_INVALID_DOM_NODE);
    }

    if (!string(selector)) {
        throw new Error(ERROR_INVALID_CSS_SELECTOR);
    }

    return Array.prototype.slice.call(dom.querySelectorAll(selector));
}

function notSupportedQuerySelector() {
    throw new Error(exported$9[2003]);
}

function orderTraverse(element, callback, context, orderType, includeRoot) {
    var depth = 0,
        isPostOrder = 0;
    var queue, last, node, current;

    if (!isDom(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }

    if (!method(callback)) {
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


    return get();
}

/**
 * is node
 */
function isDom(node) {
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

function isDefaultView(defaultView) {
        var type = typeof defaultView;

        return !!defaultView &&
                (type === 'object' || type === 'function') &&
                defaultView.self === defaultView.window &&
                !!defaultView.document;
    }

function contains$1(ancestor, descendant) {
        var elementErrorString = exported$9[1102],
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
        else if (object(config)) {
            tagName = getTagNameFromConfig(config);
            if (!tagName) {
                throw new Error(invalidConfig);
            }
            toInsert = element.ownerDocument.createElement(tagName);
            applyConfigToElement(toInsert, config);
        }

        if (!is(toInsert, 1, 3, 4, 7, 8, 11)) {
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
            eachPostorder(node, purgeEventsFrom);
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

        if (!array(nodes)) {
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
        else if (object(config)) {
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
            eachPostorder(node, purgeEventsFrom);
        }

        node.parentNode.replaceChild(toInsert, node);

        return toInsert;
    }

function find(element, node) {
        if (!isDom(element, 1, 11)) {
            throw new Error(ERROR_INVALID_DOM);
        }
        return findChild(element, node, 1);
    }

/**
 * DOM Tree walk
 */
function eachPreorder(element, callback, context, includeRoot) {

        return orderTraverse(element,
                            callback,
                            context,
                            ORDER_TYPE_PREORDER,
                            includeRoot !== false);
    }

function eachPostorder(element, callback, context, includeRoot) {

        return orderTraverse(element,
                            callback,
                            context,
                            ORDER_TYPE_POSTORDER,
                            includeRoot !== false);
    }

function eachLevel(element, callback, context, includeRoot) {

        return orderTraverse(element,
                            callback,
                            context,
                            ORDER_TYPE_LEVELORDER,
                            includeRoot !== false);
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
        CSS_SELECT = DOM_INFO.listToArray ?
                            toArrayQuerySelectorAll :
                            noArrayQuerySelectorAll;
    }
}

var DOM = {
            contains: contains$1,
            is: isDom,
            isView: isDefaultView,
            eachPreorder: eachPreorder,
            eachPostorder: eachPostorder,
            eachLevel: eachLevel,
            documentViewAccess: 'defaultView',
            select: CSS_SELECT,

            helper: registerDomHelper,

            add: add,
            replace: replace,
            move: move,
            remove: remove,
            find: find
        };

var NUMBER = 1;
var HEX = 2;
var PERCENT$1 = 3;
var HAS_UNIT_RE = /\%$/;

function format(value, colorFormat) {
    
    switch (colorFormat) {
    case HEX:
        return parseInt(value, 16) || 0;
    
    case NUMBER:
        value = 1 * value;
        return value || 0;

    case PERCENT$1:
        value = HAS_UNIT_RE.test(value) ?
                    1 * value.substring(0, value.length -1) :
                    1 * value;

        return Math.round((value || 1) * 100);
    }
    return 0;
}

var format$1 = {
                NUMBER: NUMBER,
                HEX: HEX,
                PERCENT: PERCENT$1,
                format: format
            };

var BYTE = 255;
var BYTE_PERCENT = 127;
var BYTE_HUE = 511;
var PERCENT = 100;
var HUE = 360;
var SATURATION = PERCENT;
var LUMINOSITY = PERCENT;

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

function itemize(value, index, colorFormat) {
        var M = Math,
            F = format$1,
            isFloat = index > 2 && colorFormat !== F.PERCENT,
            min = 0,
            max = index < 3 ?
                    BYTE : PERCENT;
            
        value = F.format(value, colorFormat);
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
    
        if (max === min) {
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
        
        if (!number(a)) {
            a = PERCENT;
        }
        
        return ((a & psize) << 23) |
                (((l * LUMINOSITY) & psize) << 16) |
                (((s * SATURATION) & psize) << 9) |
                ((h * HUE) & BYTE_HUE);
    }

function toString$1(integer) {
        var values = toArray(integer),
            alpha = (values[3] / PERCENT);
        values[3] = parseFloat(alpha.toFixed(2));
        return 'rgba(' + values.join(',') + ')';
    }





var rgbaColor = Object.freeze({
	itemize: itemize,
	toArray: toArray,
	toInteger: toInteger,
	toString: toString$1
});

function toHex(integer) {
        var M = Math;
        integer = M.max(0, M.min(integer, 255));
        return (integer < 16 ? '0' : '') + integer.toString(16);
    }

function toString(integer) {
        var convert = toHex,
            values = toArray(integer).slice(0, 3);
        
        values[0] = convert(values[0]);
        values[1] = convert(values[1]);
        values[2] = convert(values[2]);
        
        return '#' + values.join('');
    }





var hexColor = Object.freeze({
	toHex: toHex,
	toString: toString,
	itemize: itemize,
	toArray: toArray,
	toInteger: toInteger
});

function toString$2(integer) {
        return 'rgb(' + toArray(integer).slice(0, 3).join(',') + ')';
    }

function toInteger$1(r, g, b) {
        return toInteger(r, g, b, 100);
    }




var rgbColor = Object.freeze({
	toString: toString$2,
	toInteger: toInteger$1,
	itemize: itemize,
	toArray: toArray
});

var BYTE$1 = 255;
var BYTE_PERCENT$1 = 127;
var BYTE_HUE$1 = 511;
var HUE$1 = 360;
var PERCENT$2 = 100;

function itemize$1(value, index, colorFormat) {
        var F = format$1,
            M = Math,
            percent = PERCENT$2,
            min = 0,
            max = index < 1 ?
                    HUE$1 : percent;
        
        switch (colorFormat) {
        case F.HEX:
            value = (parseInt(value, 16) / BYTE$1) * max;
            break;
        
        case F.NUMBER:
            value = (1 * value) || 0;
            if (index > 2) {
                value *= percent;
            }
            break;
        
        case F.PERCENT:
            value = (1 * value.substring(0, value.length - 1)) || 0;
            break;
        }
        
        return M.max(min, M.min(max, value || 0));
    }

function toInteger$2(h, s, l, a) {
        var psize = BYTE_PERCENT$1;
        
        if (!number(a)) {
            a = PERCENT$2;
        }
        
        return ((a & psize) << 23) |
                ((l & psize) << 16) |
                ((s & psize) << 9) |
                (h & BYTE_HUE$1);
    }

function toArray$1(integer) {
        var psize = BYTE_PERCENT$1;
        return [
            integer & BYTE_HUE$1,
            (integer >> 9) & psize,
            (integer >> 16) & psize,
            (integer >> 23) & psize];
    }

function toString$4(integer) {
        var values = toArray$1(integer);
        values[1] += '%';
        values[2] += '%';
        values[3] = (values[3] / PERCENT$2);
        return 'hsla(' + values.join(',') + ')';
    }




var hslaColor = Object.freeze({
	itemize: itemize$1,
	toInteger: toInteger$2,
	toArray: toArray$1,
	toString: toString$4
});

function toString$3(integer) {
        var values = toArray$1(integer).slice(0, 3);
        values[1] += '%';
        values[2] += '%';
        return 'hsl(' + values.join(',') + ')';
    }





var hslColor = Object.freeze({
	toString: toString$3,
	itemize: itemize$1,
	toArray: toArray$1,
	toInteger: toInteger$2
});

var ERROR_SUBJECT = 'Invalid [subject] parameter.';
var COLOR_RE$1 = /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/;
var NUMBER_RE$1 = /^[0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*$/;
var REMOVE_SPACES = /[ \r\n\t\s]+/g;
var TO_COLOR = {
        rgb: rgbColor,
        rgba: rgbaColor,
        hsl: hslColor,
        hsla: hslaColor,
        hex: hexColor
    };

function preParseValue(str) {
    if (typeof str === 'string') {
        str = str.replace(REMOVE_SPACES, '');
        if (COLOR_RE$1.test(str)) {
            return str;
        }
    }
    return null;
}

function parseColorStringType(str) {
    var list = TO_COLOR,
        m = str.match(COLOR_RE$1),
        type = m[1];

    var items, isHex, item;

    if (!contains(list, type)) {
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

function parseType(subject) {

        if (!string(subject, true)) {
            throw new Error(ERROR_SUBJECT);
        }

        subject = preParseValue(subject);
        if (subject) {
            return parseColorStringType(subject) || null;
        }
        return null;
    }

function parse(subject) {
        var F = format$1,
            formatPercent = F.PERCENT,
            formatNumber = F.NUMBER,
            formatHex = F.HEX,
            numberRe = NUMBER_RE$1;

        var parsed, c, l, item, items, itemizer,
            processor, type, isHex, toProcess;

        if (!string(subject, true)) {
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
                                            item.
                                                charAt(item.length -1) === '%' ?
                                                    formatPercent :
                                                    formatNumber);
            }

            // add type
            return processor.toInteger.apply(processor, toProcess);
        }

        return null;
    }

function stringify(colorValue, type) {
        var list = TO_COLOR;

        if (!number(colorValue) || colorValue < 0) {
            throw new Error("Invalid [colorValue] parameter.");
        }

        if (arguments.length < 2) {
            type = 'hex';
        }
        else if (!string(type)) {
            throw new Error("Invalid [type] parameter.");
        }

        if (!contains(list, type)) {
            return null;
        }

        colorValue = Math.round(colorValue);

        return list[type].toString(colorValue);
    }

var PADDING_BOTTOM = 'paddingBottom';
var PADDING_TOP = 'paddingTop';
var PADDING_LEFT = 'paddingLeft';
var PADDING_RIGHT = 'paddingRight';
var OFFSET_LEFT = 'offsetLeft';
var OFFSET_TOP = 'offsetTop';
var OFFSET_WIDTH = 'offsetWidth';
var OFFSET_HEIGHT = 'offsetHeight';
var CLIENT_WIDTH = 'clientWidth';
var CLIENT_HEIGHT = 'clientHeight';
var COLOR_RE = /[Cc]olor$/;
var EM_OR_PERCENT_RE = /%|em/;
var CSS_MEASUREMENT_RE =
/^([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)(em|px|\%|pt|vh|vw|cm|ex|in|mm|pc|vmin)$/;
var WIDTH_RE = /width/i;
var NUMBER_RE = /\d/;
var BOX_RE = /(top|bottom|left|right|width|height)$/;
var DIMENSION_RE =
        /([Tt]op|[Bb]ottom|[Ll]eft|[Rr]ight|[wW]idth|[hH]eight|Size|Radius)$/;
var IE_ALPHA_OPACITY_RE = /\(opacity\=([0-9]+)\)/i;
var IE_ALPHA_OPACITY_TEMPLATE = 'alpha(opacity=$opacity)';
var IE_ALPHA_OPACITY_TEMPLATE_RE = /\$opacity/;
var GET_OPACITY = opacityNotSupported;
var SET_OPACITY = opacityNotSupported;
var SET_STYLE = styleManipulationNotSupported;
var GET_STYLE = styleManipulationNotSupported;
var ERROR_INVALID_DOM$1 = exported$9[1101];
var exported$11 = {
        add: addClass,
        remove: removeClass,
        computedStyle: computedStyleNotSupported,
        style: setStyle,
        currentStyle: getStyle,
        unitValue: getCSSUnitValue,
        styleOpacity: opacityNotSupported,
        colorUnit: 'hex',
        boxRe: BOX_RE,
        dimensionRe: DIMENSION_RE,

        colorRe: COLOR_RE
    };
var SLICE = Array.prototype.slice;

var CSS_INFO;



function addClass(element, classNames) {
    var isString = string;

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    if (isString(classNames)) {
        classNames = [classNames];
    }

    if (array(classNames)) {
        element.className = exported$9.addWord(element.className || '',
                                           classNames);
    }

    return get();
}

function removeClass(element, classNames) {
    var isString = string;

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    if (isString(classNames)) {
        classNames = [classNames];
    }

    if (array(classNames)) {
        element.className = exported$9.removeWord(element.className,
                                              classNames);
    }

    return get();
}

function applyStyle() {
    /* jshint validthis: true */
    return arguments.length > 1 ?
                // setter
                setStyle.apply(this, arguments) :

                // getter
                getStyle.apply(this, arguments);



}

function setStyle(element, rules, value) {
    var context;

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    if (string(rules)) {
        if (arguments.length > 2) {
            context = {};
            context[rules] = value;
            rules = context;
        }
        else {
            rules = parseCSSText(rules);
        }
    }

    if (!object(rules)) {
        throw new Error(exported$9[1141]);
    }

    context = [element.style];

    each(rules, onStyleElement, context, true);

    context = context[0] = null;

    return get();
}

function getStyle(element) {
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    return parseCSSText(element.style.cssText);
}

function onStyleElement(value, name) {
    var isNumber = number(value),
        isScalar = isNumber || string(value),
        /* jshint validthis: true */
        elementStyle = this[0],
        set = SET_STYLE,
        applied = false;

    name = exported$9.stylize(name);

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
        value = stringify(value, exported$11.colorUnit);
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
    throw new Error(exported$9[2001]);
}

/**
 * Style info
 */

function computedStyleNotSupported() {
    throw new Error(exported$9[2002]);
}

function w3cGetCurrentStyle(element, ruleNames) {
    var camel = exported$9.stylize,
        isString = string;
    var style, c, l, name, value, values, access;

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    style = global$1.getComputedStyle(element);

    values = {};
    if (!array(ruleNames)) {
        ruleNames = SLICE.call(arguments, 1);
    }
    for (c = -1, l = ruleNames.length; l--;) {
        name = ruleNames[++c];
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

function ieGetCurrentStyle(element, ruleNames) {
    var dimensionRe = DIMENSION_RE,
        boxRe = BOX_RE,
        isString = string,
        camel = exported$9.stylize,
        getOpacity = GET_OPACITY,
        pixelSize = ieGetPixelSize;

    var style, c, l, name, value, access, fontSize, values, dimension;

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    style = element.currentStyle;
    fontSize = false;
    dimension = false;
    values = {};

    if (!array(ruleNames)) {
        ruleNames = SLICE.call(arguments, 1);
    }

    for (c = -1, l = ruleNames.length; l--;) {
        name = ruleNames[++c];
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
        parse$$1 = parseFloat,

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
        left -= (parse$$1(parentStyle[pleft]) || 0);
        top -= (parse$$1(parentStyle[ptop]) || 0);

        if (ieAdjust) {
            node = element.parentNode;

            for (; node !== parent; node = node.parentNode) {
                nodeStyle = node.currentStyle;
                if (nodeStyle.position === 'static') {
                    left -= (parse$$1(nodeStyle.paddingLeft) || 0) +
                            (parse$$1(nodeStyle.borderLeftWidth) || 0);
                    top -= (parse$$1(nodeStyle.paddingTop) || 0) +
                            (parse$$1(nodeStyle.borderTopWidth) || 0);
                }
            }

            if (parent === element.ownerDocument.body) {
                left -= parse$$1(parentStyle.marginLeft) || 0;
                top -= parse$$1(parentStyle.marginTop) || 0;
            }
        }

    /* falls through */
    case 'absolute':
    case 'fixed':
        left -= (parse$$1(parentStyle.borderLeftWidth) || 0);
        top -= (parse$$1(parentStyle.borderTopWidth) || 0);
    }


    right -= left;
    bottom -= top;
    width -= (parse$$1(style[pleft]) || 0) +
                (parse$$1(style[pright]) || 0);
    height -= (parse$$1(style[ptop]) || 0) +
                (parse$$1(style[pbottom]) || 0);

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
    throw new Error(exported$9[2006]);
}

function ieGetOpacity(style) {
    var M = Math,
        opacityRe = IE_ALPHA_OPACITY_RE,
        filter = style.filter;
    var m;

    if (string(filter) && opacityRe.test(filter)) {
        m = filter.match(opacityRe);
        m = parseFloat(m[1]);

        return M.max(1,
                    M.min(100,
                        number(m) ? m : 100)) / 100;
    }

    return 1;
}

function ieSetOpacity(style, opacity) {
    var M = Math;

    if (string(opacity)) {
        opacity = parseFloat(opacity);
    }
    if (number(opacity)) {
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

    return number(opacity) ? opacity : 1;
}

function w3cSetOpacity(style, opacity) {
    var M = Math;

    if (string(opacity)) {
        opacity = parseFloat(opacity);
    }

    if (number(opacity)) {
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

    exported$11.computedStyle = CSS_INFO.w3cStyle ?
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
        exported$11.colorUnit = 'rgba';
    }
}

var computedStyle = exported$11.computedStyle;

var ERROR_INVALID_ELEMENT = exported$9[1101];
var ERROR_INVALID_DOM$2 = exported$9[1102];
var OFFSET_TOP$1 = 'offsetTop';
var OFFSET_LEFT$1 = 'offsetLeft';
var OFFSET_WIDTH$1 = 'offsetWidth';
var OFFSET_HEIGHT$1 = 'offsetHeight';
var MARGIN_TOP = 'marginTop';
var MARGIN_LEFT = 'marginLeft';
var SCROLL_TOP = 'scrollTop';
var SCROLL_LEFT = 'scrollLeft';
var BOUNDING_RECT = 'getBoundingClientRect';
var DEFAULTVIEW = null;
var ELEMENT_VIEW = 1;
var PAGE_VIEW = 2;
var USE_ZOOM_FACTOR = false;
var IE_PAGE_STAT_ACCESS = 'documentElement';
var boundingRect = false;
var getPageScroll = null;
var getOffset = null;
var getSize = null;
var getScreenSize = null;
var exported$12 = {
        offset: offset,
        size: size,
        box: box,
        scroll: scroll,
        screen: screen,
        visible: visible,
        translate: translateBox
    };

var DIMENSION_INFO;
var IEVERSION;

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
        M.max(0, element[OFFSET_WIDTH$1] || 0),
        M.max(0, element[OFFSET_HEIGHT$1] || 0)];
}

/**
 * Element Offset
 */
function rectOffset(element, boundingRect) {
    var //scrolled = getPageScroll(element.ownerDocument[DEFAULTVIEW]),
        page = screen(element),
        rect = boundingRect || element[BOUNDING_RECT](),
        factor = DIMENSION_INFO.zoomfactor ?
                    getZoomFactor(global$1.window.document[IE_PAGE_STAT_ACCESS]) :
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
    var root = global$1.document[IE_PAGE_STAT_ACCESS],
        body = root.body,
        css = exported$11,
        
        top = OFFSET_TOP$1,
        left = OFFSET_LEFT$1,
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
        x + element[OFFSET_WIDTH$1] - page[2],
        y + element[OFFSET_HEIGHT$1] - page[3]];
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
    
    return 1;
}


/**
 * checking
 */
function isViewable(dom) {
    var help = DOM;
    var body, viewable;
    
    if (help.is(dom, 1, 9)) {
        
        if (dom.nodeType === 9) {
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
                exported$11.style(element, applyStyle);
            }
            return get();
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
        var css = exported$11,
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
        if (array(x)) {
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
        
        if (!object(target)) {
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
                                (width - element[OFFSET_WIDTH$1])
                            ) + 'px' :
                            width;
        }
        
        height = cssValue(height);
        hasHeight = height !== false;
        if (hasHeight) {
            target.height = typeof height === NUMBER ? (
                                parse(currentDimension.height || 0) +
                                (height - element[OFFSET_HEIGHT$1])
                            ) + 'px' :
                            height;
        }
    
        return hasLeft || hasRight || hasTop || hasBottom ||
                hasWidth || hasHeight ? target : null;
    }

function scroll(dom, x, y) {
        var setter = arguments.length > 1,
            isNumber = number,
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
            throw new Error(ERROR_INVALID_DOM$2);
        }
    }
    
/**
 * Visibility
 */
function visible(element, visibility, displayed) {
        var style = null,
            css = exported$11,
            isString = string,
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
            
            return get();
            
        }
        
        // getter
        if (attached) {
            style = exported$11.computedStyle(element,
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
            subject = global$1.window;
        }
        box = getPageScroll(subject);
        size = getScreenSize(subject);
        
        box[2] = size[0];
        box[3] = size[1];
        subject = null;
        return box;
        
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

var ERROR_DOM = exported$9[1102];
var SELECT_ELEMENT = null;
var CLEAR_SELECTION = null;
var UNSELECTABLE = attributeUnselectable;
var DETECTED_SELECTION = null;
var DETECTED_DOM = null;
var CSS_UNSELECT = null;
    


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
    throw new Error(exported$9[2005]);
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

function select(from, to) {
        var dimension = exported$12;
        
        if (DOM.is(from, 9)) {
            from = from.body;
        }
        
        if (!dimension.visible(from)) {
            throw new Error(exported$9[1101]);
        }
        
        if (arguments.length < 2) {
            to = null;
        }
        
        if (to !== null && !dimension.visible(to)) {
            throw new Error(ERROR_DOM);
        }
        
        SELECT_ELEMENT(from, to);
        
        return get();
        
    }

function clear(documentNode) {
        if (!DOM.is(documentNode, 9)) {
            if (arguments.length > 0) {
                throw new Error(exported$9[1104]);
            }
            else {
                documentNode = global$1.document;
            }
        }
        
        CLEAR_SELECTION(documentNode);
        
        return get();
    }

function unselectable(element, disableSelect) {
        if (!DOM.is(element, 1)) {
            throw new Error(ERROR_DOM);
        }
        
        UNSELECTABLE(element,
                     disableSelect === false);
        
        return get();
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

/**
 *  Easing Formula taken from: http://gizma.com/easing
 *
 *  currentFrame = current frame
 *  startValue = start value
 *  endValue = end value
 *  totalFrames = total frame
 *  
 */
    

var linear = linearTween;
var easeIn = easeInQuad;
var easeOut = easeOutQuad;
var easeInOut = easeInOutQuad;

    
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
                (currentFrame *
                    currentFrame *
                    currentFrame *
                    currentFrame - 1) +
                startValue;
    }

// quartic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuart(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames / 2;
        
        if (currentFrame < 1) {
            return endValue / 2 *
                        currentFrame *
                        currentFrame *
                        currentFrame *
                        currentFrame +
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
            return endValue / 2 *
                        M.pow(2, 10 * (currentFrame - 1)) + startValue;
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
        
        return endValue * Math.sqrt(1 - currentFrame * currentFrame) +
                startValue;
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


var EASING = Object.freeze({
	linear: linear,
	easeIn: easeIn,
	easeOut: easeOut,
	easeInOut: easeInOut,
	linearTween: linearTween,
	easeInQuad: easeInQuad,
	easeOutQuad: easeOutQuad,
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
});

var SESSION_ACCESS = '__animate_session';
var BOX_POSITION = {
        left: 0,
        top: 1,
        right: 2,
        bottom: 3,
        width: 4,
        height: 5
    };
var BOX_RE$1 = exported$11.boxRe;
var DIMENSION_RE$1 = exported$11.dimensionRe;
var COLOR_RE$2 = exported$11.colorRe;
var SESSIONS = {};
var exported$15 = {
        easing: EASING,
        defaultEasing: 'easeOut',
        duration: 0.5,
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
        string$$1 = exported$9,
        easing = EASING,
        isObject = object,
        list = SESSIONS,
        defaultInterval = exported$15.interval,
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
                throw new Error(string$$1[1152]);
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
        callback(result, current, total);
        
        if (last) {
            stop();
        }
        
    }
    
    if (!method(callback)) {
        throw new Error(string$$1[1151]);
    }
    
    if (!isObject(from) || !isObject(to)) {
        throw new Error(string$$1[1152]);
    }
    
    // validate type
    if (alen < 4) {
        type = exported$15.defaultEasing;
    }
    else if (!hasAnimationType(type)) {
        throw new Error(string$$1[1153]);
    }
    
    // validate duration
    if (alen < 5) {
        duration = exported$15.duration;
    }
    else if (!number(duration) || duration < 1) {
        throw new Error(string$$1[1154]);
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
    if (string(value)) {
        value = parseFloat(value);
    }
    return number(value) && value;
}

function applyDisplacements(session, from, to) {
    
    each(to, onApplyDisplacement, [from, session], true);
    
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
        source = contains(from, name) &&
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
    return string(type) && contains(EASING, type);
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
        
    each(styles, eachElementValues, stat);
    
    names = stat[0];
    animateValues = stat[1];
    staticValues = stat[3];
        
    // has animation
    if (names.length) {
        sessionId = element.getAttribute(access);
        defaults = createStyleDefaults(element, names);
        
        if (!hasAnimationType(type)) {
            type = exported$15.defaultEasing;
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
        exported$11.style(element, staticValues);
    }
    
}

function createElementHandler(animate) {
    function onAnimate(values, current, total) {
        var session = animate,
            node = session.node;
        
        // transform dimension
        exported$12.translate(node,
                            'left' in values ? values.left : null,
                            'top' in values ? values.top : null,
                            'right' in values ? values.right : null,
                            'bottom' in values ? values.bottom : null,
                            'width' in values ? values.width : null,
                            'height' in values ? values.height : null,
                            values);
        
        exported$11.style(node, values);
        
        if (current === total) {
            node.removeAttribute(SESSION_ACCESS);
            session.node = null;
            delete session.node;
        }
        
        session = node = null;
    }
    return onAnimate;
}

function createStyleDefaults(element, names) {
    var css = exported$11,
        values = css.computedStyle(element, names),
        dimension = exported$12,
        c = -1,
        l = names.length,
        cssValue = css.unitValue,
        dimensionRe = DIMENSION_RE$1,
        colorRe = COLOR_RE$2,
        parse$$1 = parse,
        boxRe = BOX_RE$1,
        boxPosition = BOX_POSITION,
        box$$1 = null;
    var name, value;
    
    for (; l--;) {
        name = names[++c];
        value = values[name];
        if (boxRe.test(name)) {
            if (!box$$1) {
                box$$1 = dimension.box(element);
            }
            value = box$$1[boxPosition[name]];
        }
        else if (dimensionRe.test(name)) {
            value = cssValue(value);
        }
        else if (colorRe.test(name)) {
            value = parse$$1(value);
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
    else if (BOX_RE$1.test(name) || DIMENSION_RE$1.test(name)) {
        value = exported$11.unitValue(raw);
        
    }
    // color
    else if (COLOR_RE$2.test(name)) {
        value = parse(raw);
        if (value === null) {
            value = false;
        }
    }
    
    if (number(value)) {
        names[names.length] = name;
        values[name] = value;
    }
    else if (value !== false) {
        snames[snames.length] = name;
        statics[name] = value;
    }
}



var exported$1 = Object.freeze({
	env: env,
	info: DETECTED,
	xmlEncode: xmlEncode,
	xmlDecode: xmlDecode,
	is: isDom,
	isView: isDefaultView,
	contains: contains$1,
	get select () { return CSS_SELECT; },
	add: add,
	move: move,
	replace: replace,
	remove: remove,
	eachNodePreorder: eachPreorder,
	eachNodePostorder: eachPostorder,
	eachNodeLevelorder: eachLevel,
	addClass: addClass,
	removeClass: removeClass,
	computedStyle: computedStyle,
	stylize: setStyle,
	stylify: getStyle,
	on: listen,
	un: unlisten,
	purge: purge,
	dispatch: dispatch,
	destructor: addDestructor,
	offset: offset,
	size: size,
	box: box,
	scroll: scroll,
	screen: screen,
	highlight: select,
	unhighlightable: unselectable,
	clearHighlight: clear,
	parseColor: parse,
	parseColorType: parseType,
	formatColor: stringify,
	transition: animate,
	animateStyle: animateStyle
});

global$1.libdom = exported$1;

use(exported$1);

export { DETECTED as info, xmlEncode, xmlDecode, isDom as is, isDefaultView as isView, contains$1 as contains, CSS_SELECT as select, add, move, replace, remove, eachPreorder as eachNodePreorder, eachPostorder as eachNodePostorder, eachLevel as eachNodeLevelorder, addClass, removeClass, computedStyle, setStyle as stylize, getStyle as stylify, listen as on, unlisten as un, purge, dispatch, addDestructor as destructor, offset, size, box, scroll, screen, select as highlight, unselectable as unhighlightable, clear as clearHighlight, parse as parseColor, parseType as parseColorType, stringify as formatColor, animate as transition, animateStyle };
export default exported$1;
export { env } from 'libcore';
//# sourceMappingURL=libdom.es.js.map