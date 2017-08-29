'use strict';

import {
            string,
            method,
            contains,
            middleware
        } from "libcore";

import STRING from "./string";

import INFO from "./detect.js";

import { get as getModule } from "./chain.js";


var EVENTS = null,
    PAGE_UNLOADED = false,
    MIDDLEWARE = middleware('libdom.event'),
    IE_CUSTOM_EVENTS = {},
    ERROR_OBSERVABLE_NO_SUPPORT = STRING[1131],
    ERROR_INVALID_TYPE = STRING[1132],
    ERROR_INVALID_HANDLER = STRING[1133],
    IE_ON = 'on',
    IE_BUBBLE_EVENT = 'beforeupdate',
    IE_NO_BUBBLE_EVENT = 'propertychange',
    exported = {
                on: listen,
                un: unlisten,
                fire: dispatch,
                purge: purge,
                ondestroy: addDestructor
            };

var RESOLVE, LISTEN, UNLISTEN, DISPATCH, EVENT_INFO, IS_CAPABLE, SUBJECT;

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

    return getModule();
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

    return getModule();
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
    if (method(handler)) {
        MIDDLEWARE.register('global-destroy', handler);
    }
    return getModule();
}


RESOLVE = LISTEN = UNLISTEN = DISPATCH = null;

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


export {
    purge,
    dispatch,
    listen as on,
    unlisten as un,
    addDestructor as ondestroy
};

export default exported;
