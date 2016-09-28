'use strict';

var INFO = require("./detect.js"),
    DOM = require("./dom.js"),
    EVENT_INFO = null,
    DESTROY_EVENT_TYPE = "domremoveevent",
    ERROR_INVALID_OBSERVABLE = "Invalid [observable] Object parameter.",
    EXPORTS = {
        initialize: initialize,
        on: listen,
        un: unlisten,
        fire: dispatch,
        purge: purge
    };
    
var LISTEN, UNLISTEN, DISPATCH, IS;

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
        
        IS = w3c ?
                w3cIsObservable :
                ie ?
                    ieIsObservable :
                    unsupported;
    
        listen(global, "unload", onUnload);
        listen(global, "beforeunload", onUnload);
    }
}

function listen(observable, type, handler, context) {
    
    if (!IS(observable)) {
        throw new Error(ERROR_INVALID_OBSERVABLE);
    }
    
    LISTEN(observable, type, handler, context);
    
    return EXPORTS.chain;
    
}

function unlisten(observable, type, handler, context) {
    
    if (!IS(observable)) {
        throw new Error(ERROR_INVALID_OBSERVABLE);
    }
    
    UNLISTEN(observable, type, handler, context);
    
    return EXPORTS.chain;
}

function purge(observable) {
    var unlisten = UNLISTEN;
    
    if (arguments.length) {
        
        if (!IS(observable)) {
            throw new Error(ERROR_INVALID_OBSERVABLE);
        }
        
        unlisten(observable, true);
    }
    // purge all!
    else {
        observable = global;
        unlisten(observable, true);
        
        observable = observable.document;
        unlisten(observable, true);
        
        DOM.eachPostorder(observable.documentElement, onPurgeAllListeners);
        observable = null;
    }
    
    return EXPORTS.chain;
    
}

function onPurgeAllListeners(dom) {
    UNLISTEN(dom, true);
}

function dispatch(dom, type, defaults) {
    
    if (!IS(dom)) {
        throw new Error("Invalid Observable [dom] parameter.");
    }
    
    if (Object.prototype.toString.call(defaults) !== '[object Object]') {
        defaults = {};
    }
    DISPATCH(dom, type, defaults);
    return EXPORTS.chain;
}

function w3cCreateEventDestroyer(type, handler, original, context) {
    function destroy(event) {
        var dom;
        if (event.allTargetTypes === true ||
            (type === event.targetType &&
            original === event.targetHandler &&
            context === event.targetContext)) {
            
            dom = event.target;
            dom.removeEventListener(type, handler, false);
            dom.removeEventListener(DESTROY_EVENT_TYPE, destroy, false);
            
        }
        dom = null;
    }
    return destroy;
}

function w3cListen(dom, type, handler, context) {
    var original = handler;
    handler = patchEventHandler(handler, context, false);
    dom.addEventListener(type, handler, false);
    dom.addEventListener(DESTROY_EVENT_TYPE,
                            w3cCreateEventDestroyer(type,
                                                    handler,
                                                    original,
                                                    context),
                            false);
    return handler;
}

function w3cUnlisten(dom, type, handler, context) {
    //dom.removeEventListener(type, handler, false);
    w3cDispatch(dom, DESTROY_EVENT_TYPE, {
                                    allTargetTypes: type === true,
                                    targetType: type,
                                    targetHandler: handler,
                                    targetContext: context,
                                    bubbles: false,
                                    cancelable: false
                                });
}

function w3cDispatch(dom, type, defaults) {
    var hasOwn = Object.prototype.hasOwnProperty,
        event = global.document.createEvent("Event");
    var name;
    
    event.initEvent(type,
            defaults.bubbles !== false,
            defaults.cancelable !== false);
    
    for (name in defaults) {
        if (hasOwn.call(defaults, name) && !(name in event)) {
            event[name] = defaults[name];
        }
    }
    dom.dispatchEvent(event);
}

function w3cIsObservable(subject) {
    var F = Function,
        type = typeof subject;
        
    return !!subject && (type === 'object' || type === 'function') &&
            subject.addEventListener instanceof F &&
            subject.removeEventListener instanceof F &&
            subject.dispatchEvent instanceof F;
}

function ieListen(dom, type, handler, context) {
    var original = handler;
    handler = patchEventHandler(handler, context, true);
    dom.attachEvent('on' + type, handler);
    dom.attachEvent('on' + DESTROY_EVENT_TYPE,
                            ieCreateEventDestroyer(type,
                                                    handler,
                                                    original,
                                                    context),
                            false);
    return handler;
}

function ieUnlisten(dom, type, handler, context) {
    //dom.detachEvent('on' + type, handler);
    ieDispatch(dom, 'on' + DESTROY_EVENT_TYPE, {
                                    allTargetTypes: type === true,
                                    targetType: type,
                                    targetHandler: handler,
                                    targetContext: context,
                                    bubbles: false,
                                    cancelable: false
                                });
}

function ieDispatch(dom, type, defaults) {
    var hasOwn = Object.prototype.hasOwnProperty,
        event = global.document.createEventObject();
    var name;
    
    for (name in defaults) {
        if (hasOwn.call(defaults, name) && !(name in event)) {
            event[name] = defaults[name];
        }
    }
    
   dom.fireEvent('on' + type, event); 
}

function ieCreateEventDestroyer(type, handler, original, context) {
    function destroy(event) {
        var dom;
        if (event.allTargetTypes === true ||
            (type === event.targetType &&
            original === event.targetHandler &&
            context === event.targetContext)) {
            
            dom = event.target;
            dom.detachEvent('on' + type, handler);
            dom.detachEvent('on' + DESTROY_EVENT_TYPE, destroy);
            
        }
        dom = null;
    }
    return destroy;
}

function ieIsObservable(subject) {
    var F = Function,
        type = typeof subject;
        
    return !!subject && (type === 'object' || type === 'function') &&
            subject.attachEvent instanceof F &&
            subject.detachEvent instanceof F &&
            subject.fireEvent instanceof F;
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