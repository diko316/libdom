'use strict';

var INFO = require("./detect.js"),
    EVENTS = null,
    IE_CUSTOM_EVENTS = {},
    HAS_OWN_PROPERTY = Object.prototype.hasOwnProperty,
    ERROR_OBSERVABLE_NO_SUPPORT = "Invalid [observable] parameter.",
    EXPORTS = module.exports = {
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
            event = null;
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
    
    observable.attachEvent(
            isCustomEvent ?
                'ondataavailable' :
                'on' + type,
            listener);
    
    return [observable, type, handler, context, listener];
}

function ieUnlisten(observable, type, listener) {
    
    observable.detachEvent(
            listener.customType ?
                'ondataavailable' :
                'on' + type,
            listener);
}

function ieDispatch(observable, type, properties) {
    var hasOwn = HAS_OWN_PROPERTY,
        event = global.document.createEventObject();
    var name;
    
    for (name in properties) {
        if (hasOwn.call(properties, name) && !(name in event)) {
            event[name] = properties[name];
        }
    }
    
    if (ieTestCustomEvent(observable, type)) {
        event.customType = type;
        type = 'dataavailable';
    }
    
    observable.fireEvent('on' + type, event);
    
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




EXPORTS.chain = EXPORTS;