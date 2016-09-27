'use strict';

var currentPackage = require("../package.json"),
    detect = require("./lib/detect.js"),
    dom = require("./lib/dom.js"),
    css = require("./lib/css.js"),
    event = require("./lib/event.js"),
    dimension = require("./lib/dimension.js"),
    EXPORTS = {
            version: currentPackage.version,
            info: detect,
            
            // dom structure
            is: dom.is,
            isView: dom.isView,
            contains: dom.contains,
            
            // classes
            addClass: css.add,
            removeClass: css.remove,
            
            // event
            on: event.on,
            un: event.un,
            purge: event.purge,
            dispatch: event.fire,
            
            // dimension
            offset: dimension.offset,
            size: dimension.size,
            box: dimension.box
            
        };

function notBrowser() {
    throw new Error("Unable to proceed, not running in a browser.");
}

function notBrowserMethodOverride(context) {
    var O = Object.prototype,
        F = Function,
        handler = notBrowser,
        hasOwn = O.hasOwnProperty;
    var name;
    
    if (O.toString.call(context) === '[object Object]') {
        if (!(handler instanceof F)) {
            handler = notBrowser;
        }
        
        for (name in context) {
            if (hasOwn.call(context, name) &&
                context[name] instanceof F) {
                context[name] = handler;
            }
        }
    }
    return context;
}

if (detect) {
    
    css.chain =
        event.chain = 
        dimension.chain = EXPORTS;
    
    dom.initialize();
    css.initialize();
    event.initialize();
    dimension.initialize();
    
    global.testDimension = EXPORTS;
    
}
else {
    
    notBrowserMethodOverride(EXPORTS);
}

module.exports = EXPORTS;