'use strict';

var INFO = require("./detect.js"),
    DOM = require("./dom.js"),
    EVENTS = null,
    PAGE_UNLOADED = false,
    IE_CUSTOM_EVENTS = {},
    HAS_OWN_PROPERTY = Object.prototype.hasOwnProperty,
    ERROR_OBSERVABLE_NO_SUPPORT = "Invalid [observable] parameter.",
    ERROR_INVALID_TYPE = "Invalid Event [type] parameter.",
    ERROR_INVALID_HANDLER = "Invalid Event [handler] parameter.",
    IE_CUSTOM_TYPE_EVENT = 'propertychange',
    EXPORTS = module.exports = {
                on: listen,
                un: unlisten,
                fire: dispatch,
                purge: purge
            };
var RESOLVE, LISTEN, UNLISTEN, DISPATCH, EVENT_INFO, IS_CAPABLE, SUBJECT;

function listen(observable, type, handler, context) {
    var last = EVENTS;
    var current;
    
    if (!type || typeof type !== 'string') {
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
    
    if (!type || typeof type !== 'string') {
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
    
    if (!type || typeof type !== 'string') {
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
    var hasOwn = HAS_OWN_PROPERTY,
        event = global.document.createEvent("Event");
    var name;
    
    event.initEvent(type,
            properties.bubbles !== false,
            properties.cancelable !== false);
    
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
    var isCustomEvent = ieTestCustomEvent(observable, type);
    var listener = isCustomEvent ?
                        ieCreateCustomHandler(type, handler, context) :
                        ieCreateHandler(handler, context);
    
    observable.attachEvent('on' +
                            (isCustomEvent ? IE_CUSTOM_TYPE_EVENT : type),
                            listener);
    
    return [observable, type, handler, context, listener];
}

function ieUnlisten(observable, type, listener) {
    
    observable.detachEvent(
            'on' + (listener.customType ? IE_CUSTOM_TYPE_EVENT : type),
            listener);
}

function ieDispatch(observable, type, properties) {
    var hasOwn = HAS_OWN_PROPERTY,
        event = global.document.createEventObject();
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
    
    name = 'on' + type;
    
    // bubbling event
    if (DOM.is(observable, 1) && properties.bubbles !== false) {
        //cancelable = properties.cancelable !== false;
        
        for (node = observable; node; node = node.parentNode) {
            node.fireEvent(name, event);
            
            if (event.cancelBubble) {
                break;
            }
        }
    }
    else {
        observable.fireEvent(name, event);
    }
    
    // set to not cancel if not cancelable
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
        list = IE_CUSTOM_EVENTS,
        ontype = 'on' + type;
    var element, access;
    
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
    if (IS_CAPABLE) {
        SUBJECT = global;
        listen(SUBJECT, 'beforeunload', onBeforeUnload);
        listen(SUBJECT, 'unload', onBeforeUnload);
        SUBJECT = null;
    }
}


EXPORTS.chain = EXPORTS;