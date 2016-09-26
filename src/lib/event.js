'use strict';

var INFO = require("./detect.js"),
    STOP = require("./stopper.js"),
    EVENTS = null,
    EVENT_INFO = INFO.event,
    w3c = EVENT_INFO.w3c,
    ie = EVENT_INFO.ie,
    LISTEN = w3c ?
                w3cListen :
                ie ?
                    ieListen :
                    unsupported,
    UNLISTEN = w3c ?
                w3cUnlisten :
                ie ?
                    ieUnlisten :
                    unsupported,
                    
    EXPORTS = {
        chain: void(0),
        on: listen,
        un: unlisten,
        purge: purge
    };


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
    
    return EXPORTS.chain;
}

function purge(dom) {
    var last = EVENTS,
        event = last,
        tail = null,
        everything = arguments.length === 0;
    var before;

    for (; event; ) {
        if (everything || dom === event[0]) {
            // unset
            UNLISTEN(event[0], event[1], event[4]);
            
            before = event.before;
            
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
        event = event.before;
    }
    
    EVENTS = last;
    return EXPORTS.chain;
    
}

function dispatch(dom, type, defaults) {
    
}



function w3cListen(dom, type, handler, context) {
    handler = patchEventHandler(handler, context);
    dom.addEventListener(type, handler, false);
    return handler;
}

function w3cUnlisten(dom, type, handler) {
    dom.removeEventListener(type, handler, false);
}

function ieListen(dom, type, handler, context) {
    handler = patchEventHandler(handler, context);
    dom.attachEvent('on' + type, handler);
    return handler;
}

function ieUnlisten(dom, type, handler) {
    dom.detachEvent('on' + type, handler);
}

function unsupported() {
    throw new Error("Event Model is not supported by the current Browser.");
}


function patchEventHandler(handler, context) {
    var ie = EVENT_INFO.ie;
    function patchedEventHandler(event) {
        if (ie) {
            event = global.event;
        }
        handler.call(context, event, ie ? event.srcElement : event.target);
        event = null;
    }
    return patchedEventHandler;
}




module.exports = INFO.enabled ? EXPORTS : STOP.overrideMethods(EXPORTS);