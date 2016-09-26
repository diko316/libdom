'use strict';

function notBrowser() {
    throw new Error("Unable to proceed, not running in a browser.");
}

function overrideMethods(context, handler) {
    var O = Object.prototype,
        F = Function,
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


module.exports = {
    notBrowser: notBrowser,
    overrideMethods: overrideMethods
};