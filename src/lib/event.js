'use strict';

var INFO = require("./detect.js"),
    EVENTS = null,
    EVENT_INFO = null,
    EXPORTS = {
        initialize: initialize,
        on: listen,
        un: unlisten,
        fire: dispatch,
        purge: purge
    };
    
var LISTEN, UNLISTEN, DISPATCH;

function initialize() {
    var info, w3c, ie;
    
    if (INFO) {
        EVENT_INFO = info = INFO.event;
        w3c = info.w3c;
        ie = info.ie;
        
        LISTEN = w3c ?
                    w3cListen :
                    ie ?
                        ieListen :
                        unsupported;
        UNLISTEN = w3c ?
                    w3cUnlisten :
                    ie ?
                        ieUnlisten :
                        unsupported;
        DISPATCH = w3c ?
                    w3cDispatch :
                    ie ?
                        ieDispatch :
                        unsupported;
    
        listen(global, "unload", onUnload);
        listen(global, "beforeunload", onUnload);
    }
}

function listen(dom, type, handler, context) {
    var newEvent = [dom, type,
                        handler,
                        context,
                        LISTEN(dom, type, handler, context)];
    
    newEvent.before = EVENTS;
    EVENTS = newEvent;
    
    return EXPORTS.chain;
    
}

function unlisten(dom, type, handler, context) {
    var last = EVENTS,
        event = last,
        tail = null;
    var before;
    
    for (; event; event = event.before) {
        if (dom === event[0] &&
            type === event[1] &&
            handler === event[2] &&
            context === event[3]) {
            
            // unset
            UNLISTEN(dom, type, event[4]);
            
            before = event.before;
            
            if (tail) {
                tail.before = before;
            }
            if (event === last) {
                last = before;
            }
            delete event.before;
            event.splice(0, 5);
            
            break;
        }
        tail = event;
    }
    
    EVENTS = last;
    last = event = tail = before = null;
    
    return EXPORTS.chain;
}

function purge(dom) {
    var last = EVENTS,
        event = last,
        tail = null,
        everything = arguments.length === 0;
    var before;

    for (; event; ) {
        before = event.before;
        
        if (everything || dom === event[0]) {
            // unset
            UNLISTEN(event[0], event[1], event[4]);
            
            if (tail) {
                tail.before = before;
            }
            if (event === last) {
                last = before;
            }
            delete event.before;
            event.splice(0, 5);
            event = before;
            continue;
        }
        tail = event;
        event = before;
    }
    
    EVENTS = last;
    last = event = tail = before = null;
    return EXPORTS.chain;
    
}

function dispatch(dom, type, defaults) {
    if (Object.prototype.toString.call(defaults) !== '[object Object]') {
        defaults = {};
    }
    DISPATCH(dom, type, defaults);
    return EXPORTS.chain;
}



function w3cListen(dom, type, handler, context) {
    handler = patchEventHandler(handler, context, false);
    dom.addEventListener(type, handler, false);
    return handler;
}

function w3cUnlisten(dom, type, handler) {
    dom.removeEventListener(type, handler, false);
}

function w3cDispatch(dom, type, defaults) {
    var hasOwn = Object.prototype.hasOwnProperty,
        event = dom.ownerDocument.createEvent("Event");
    var name;
    
    event.initEvent(type,
            defaults.bubbles !== false,
            defaults.cancelable !== false);
    
    for (name in defaults) {
        if (hasOwn.call(defaults, name)) {
            event[name] = defaults[name];
        }
    }
    
    dom.dispatchEvent(event);
}

function ieListen(dom, type, handler, context) {
    handler = patchEventHandler(handler, context, true);
    dom.attachEvent('on' + type, handler);
    return handler;
}

function ieUnlisten(dom, type, handler) {
    dom.detachEvent('on' + type, handler);
}

function ieDispatch(dom, type, defaults) {
    var hasOwn = Object.prototype.hasOwnProperty,
        event = dom.ownerDocument.createEventObject();
    var name;
    
    for (name in defaults) {
        if (hasOwn.call(defaults, name)) {
            event[name] = defaults[name];
        }
    }
    
   dom.fireEvent('on' + type, event); 
}


function unsupported() {
    throw new Error("Event Model is not supported by the current Browser.");
}


function patchEventHandler(handler, context, isIE) {
    function patchedEventHandler(event) {
        var is = isIE;
        if (is === true) {
            event = global.event;
        }
        handler.call(context, event, is ? event.srcElement : event.target);
        event = null;
    }
    return patchedEventHandler;
}


function onUnload() {
    purge();
}

EXPORTS.chain = void(0);
module.exports = EXPORTS;