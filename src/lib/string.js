'use strict';


var SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/,
    CAMEL_RE = /[^a-z]+[a-z]/ig,
    STYLIZE_RE = /^([Mm]oz|[Ww]ebkit|[Mm]s|[oO])[A-Z]/,
    EXPORTS = {
        camelize: camelize,
        stylize: stylize,
        addWord: addWord,
        removeWord: removeWord,
    
        ERROR_ELEMENT: "Invalid DOM [element] parameter.",
        ERROR_DOM: "Invalid [dom] Object parameter.",
        ERROR_NODE: "Invalid DOM [node] parameter.",
        ERROR_DOC: "Invalid DOM [document] parameter.",
        ERROR_SELECTOR: "Invalid CSS [selector] parameter.",
        ERROR_TREE_CALLBACK: "Invalid tree traverse [callback] parameter.",
        ERROR_DOM_CONFIG: "Invalid DOM Element [config] parameter.",
        ERROR_RULE: "Invalid [style] Rule parameter.",
        
        ERROR_OBSERV: "Invalid [observable] parameter.",
        ERROR_EVENTTYPE: "Invalid Event [type] parameter.",
        ERROR_EVENTHNDL: "Invalid Event [handler] parameter.",
        
        
        ERROR_NS_ATTRSTYLE: "Style Attribute manipulation is not supported",
        ERROR_NS_COMPSTYLE: "Computed style is not supported in this browser.",
        ERROR_NS_SELQUERY : "CSS Selector query form DOM is not supported.",
        ERROR_NS_POSITION: "DOM position comparison is not supported.",
        ERROR_NS_MARK: "DOM selection not supported."
        
    };


function camelize(str) {
    return str.replace(CAMEL_RE, onCamelizeMatch);
}

function onCamelizeMatch(all) {
    return all[all.length - 1].toUpperCase();
}

function onStylizeMatch(all, match) {
    var found = match.toLowerCase(),
        len = found.length;
    
    if (found === 'moz') {
        found = 'Moz';
    }
    
    return found + all.substring(len, all.length);
}

function stylize(str) {
    return camelize(str).replace(STYLIZE_RE, onStylizeMatch);
}

function addWord(str, items) {
    var c = -1,
        l = items.length;
    var cl, name;
    
    str = str.split(SEPARATE_RE);
    cl = str.length;
    for (; l--;) {
        name = items[++c];
        if (name && typeof name === 'string' &&
            str.indexOf(name) === -1) {
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



module.exports = EXPORTS;
