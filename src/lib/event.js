'use strict';

var CORE = require("libcore"),
    INFO = require("./detect.js"),
    STRING = require("./string.js"),
    EVENTS = null,
    PAGE_UNLOADED = false,
    IE_CUSTOM_EVENTS = {},
    ERROR_OBSERVABLE_NO_SUPPORT = STRING[1131],
    ERROR_INVALID_TYPE = STRING[1132],
    ERROR_INVALID_HANDLER = STRING[1133],
    IE_BUBBLE_EVENT = 'beforeupdate',
    IE_NO_BUBBLE_EVENT = 'propertychanged',
    NORMALIZER_NAMES = [],
    NORMALIZERS = {},
    KEYBOARD_EVENT_RE = /^key/,
    MOUSE_EVENT_RE = /^(mouse|click|contextmenu)/,
    
/**
 * taken from
 * https://dvcs.w3.org/hg/dom3events/raw-file/tip/html/Note-KeyProps.html
 * Specs:
 *  https://w3c.github.io/uievents-code/#key-alphanumeric-writing-system
 *
 *  Mapping:
 *      code, [..,[keycode, charcode]]
 */
    
    KEY_CODES = [
        "Backspace",
            8,      0,
        "Tab",
            9,      0,
        "Enter",
            13,     13,
            13,     0,
        
        // functional keys
        "Shift",
            16,     0,
        "Control",
            17,     0,
        "Alt",
            18,     0,
        
        "CapsLock",
            20,     0,
        "Escape",
            27,     0,
            
        // Writing
        "Space",
            32,     32,
            0,      32,
            32,     0,
            
        "Digit1",
            49,     33,
            49,     0,
            33,     33,
            33,     0,
        "Digit2",
            50,     34,
            50,     0,
            34,     34,
            34,     0,
        "Digit3",
            51,     35,
            51,     0,
            35,     35,
            35,     0,
        "Digit4",
            52,     36,
            52,     0,
            36,     36,
            36,     0,
        
        // control pad
        "Pause",
            19,     0,
        "PageUp",
            33,     0,
        "End",
            35,     0,
        "Home",
            36,     0,
        "Insert",
            45,     0,
            
        
        
        // number pad
        "NumpadMultiply",
            106,    106,
            0,      106,
            106,    0,
        "NumpadAdd",
            107,    107,
            0,      107,
            107,    0,
        "NumpadSubtract",
            109,    109,
            0,      109,
            109,    0,
        "NumpadDecimal",
            110,    110,
            0,      110,
            110,    0,
        "NumpadDivide",
            111,    111,
            0,      111,
            111,    0,
        
            
        // function keys
        "F1",
            112,    0,
        "F2",
            113,    0,
        "F3",
            114,    0,
        "F4",
            115,    0,
        "F5",
            116,    0,
        "F6",
            117,    0,
        "F7",
            118,    0,
        "F8",
            119,    0,
        "F9",
            120,    0,
        "F10",
            121,    0,
        "F11",
            122,    0,
        "F12",
            123,    0,
        "F13",
            124,    0,
        "F14",
            125,    0,
        "F15",
            126,    0,
        "F16",
            127,    0,
        "F17",
            128,    0,
        "F18",
            129,    0,
        "F19",
            130,    0,
        "F20",
            131,    0,
        "F21",
            132,    0,
        "F22",
            133,    0,
        "F23",
            134,    0,
        "F24",
            135,    0
    ],
    EXPORTS = module.exports = {
                on: listen,
                un: unlisten,
                fire: dispatch,
                purge: purge,
                normalize: getEventObjectValues,
                setNormalizer: registerEventObjectNormalizer
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
    
    if (typeof context === 'undefined') {
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
    
    if (typeof context === 'undefined') {
        context = null;
    }
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
            properties.bubbles !== false,
            properties.cancelable !== false);
    
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
    
    return observable && typeof observable === 'object' &&
            observable.addEventListener instanceof F &&
            observable.removeEventListener instanceof F &&
            observable.dispatchEvent instanceof F ?
                observable : false;

}

function w3cCreateHandler(handler, context) {
    function onEvent(event) {
        return handler.call(context, event, event.target);
    }
    return onEvent;
}


/**
 * ie events
 */
function ieListen(observable, type, handler, context) {
    var listener;
    
    // listen to bubble
    if (ieTestCustomEvent(observable, type)) {
        listener = ieCreateCustomHandler(type, handler, context);
        observable.attachEvent('on' + IE_BUBBLE_EVENT, listener);
        observable.attachEvent('on' + IE_NO_BUBBLE_EVENT, listener);

    }
    else {
        listener = ieCreateHandler(handler, context);
        observable.attachEvent('on' + type, listener);
    }
    
    return [observable, type, handler, context, listener];
}

function ieUnlisten(observable, type, listener) {

    if (listener.customType) {
        observable.detachEvent('on' + IE_BUBBLE_EVENT, listener);
        observable.detachEvent('on' + IE_NO_BUBBLE_EVENT, listener);
    }
    else {
        observable.detachEvent('on' + type, listener);
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
        type = properties.bubbles ?
                    IE_BUBBLE_EVENT : IE_NO_BUBBLE_EVENT;
    }
    
    name = 'on' + type;
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
        return handler.call(context, event, event.target || event.srcElement);
    }
    return onEvent;
}

function ieCreateCustomHandler(type, handler, context) {
    function onEvent() {
        var event = global.event;
        if (event.customType === type) {
            return handler.call(context,
                                event,
                                event.target || event.srcElement);
        }
    }
    
    onEvent.customType = true;
    
    return onEvent;
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

        ontype = 'on' + type;
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
 * get normalized value of event object
 */
function getEventObjectValues(event, properties) {
    var list = NORMALIZERS,
        isString = CORE.string,
        result = {};
    var c, l, access, name, value;
    
    if (!(properties instanceof Array)) {
        properties = NORMALIZER_NAMES;
    }
    
    for (c = -1, l = properties.length; l--;) {
        name = properties[++c];
        if (isString(name)) {
            value = name in event ? event[name] : void(0);
            access = ':' + name;
            
            if (access in list) {
                value = list[access](event, value, result);
            }
            
            result[name] = value;
        }
    }
    
    return result;
}

function registerEventObjectNormalizer(name, handler) {
    var list = NORMALIZERS,
        names = NORMALIZER_NAMES,
        access = ':' + name;
    
    if (!(access in list)) {
        names[names.length] = name;
    }
    
    list[access] = handler;
    
    return EXPORTS;
}

/**
 * event object normalizers 
 */
function normalizeCode(event) {
    var isNumber = CORE.number;
    var value;
    
    if (KEYBOARD_EVENT_RE.test(event.type))  {
        console.log(event.type, ' keycode: ', event.keyCode, ' charCode: ', event.charCode, 'which', event.which, ' event: ', event);
        
        if (isNumber(value = event.charCode)) {
            
            return value;
        }
        else if (isNumber(value = event.keyCode)) {
            return value;
        }
    }
    return 0;
}

function normalizeKeyCode(event) {
    var isNumber = CORE.number;
    var value;
    
    if (KEYBOARD_EVENT_RE.test(event.type))  {
        if (isNumber(value = event.keyCode)) {
            return value;
        }
        else if (isNumber(value = event.which)) {
            return value;
        }
        else if (isNumber(value = event.charCode)) {
            return value;
        }
    }
    return 0;
}

function normalizeButton(event) {
    var isNumber = CORE.number;
    var button;
    
    if (MOUSE_EVENT_RE.test(event.type)) {
        if (isNumber(button = event.which)) {
            return button;
        }
        else if (isNumber(button = event.button)) {
            switch (true) {
            case button & 1: return 1;
            case button & 2: return 3;
            case button & 4: return 2;
            }
        }
    }
    return 0;
}

/**
 * purge after page has unloaded
 */
function onBeforeUnload() {
    if (!PAGE_UNLOADED) {
        PAGE_UNLOADED = true;
        
        purge();
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
        
        // register event object normalizers
        //registerEventObjectNormalizer('button', normalizeButton);
        registerEventObjectNormalizer('code', normalizeCode);
        //registerEventObjectNormalizer('keyCode', normalizeKeyCode);
        
        
        // register destructors
        listen(SUBJECT, 'beforeunload', onBeforeUnload);
        listen(SUBJECT, 'unload', onBeforeUnload);
        SUBJECT = null;
    }
}


EXPORTS.chain = EXPORTS;