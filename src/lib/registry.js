'use strict';

var REGISTRY = {},
    NAME_SPLIT_RE = /\.?([^\.]+)$/,
    PREFIX_TRAIL_RE = /\.$/,
    NAMESPACE_PREFIX = ':',
    EXPORTS = {
        set: set,
        get: getValue,
        unset: unset,
        reference: get,
        each: each,
        purge: purge
    };


function parse(name) {
    var m = name.match(NAME_SPLIT_RE),
        prefix = NAMESPACE_PREFIX;
    var len = m ? m[1].length : 0;
    
    return [prefix + (len ? m[1] : ''),
            prefix + name.substring(0, name.length - len).
                            replace(PREFIX_TRAIL_RE, '')];
}

function populatePrefix(name) {
    var list = REGISTRY;
    var prefix;
    
    name = parse(name);
    prefix = name[1];
    name = name[0];
    
    if (!(prefix in list)) {
        list[prefix] = { length: 0 };
    }
    
    return [list[prefix], prefix, name];

}

function getValue(name) {
    var item = get(name);
    
    return item && item[2];
}

function get(name) {
    var list = REGISTRY;
    var namespace, prefix;
    
    name = parse(name);
    prefix = name[1];
    name = name[0];
    if (prefix in list) {
        namespace = list[prefix];
        if (name in namespace) {
            return namespace[name];
        }
    }
    
    return void(0);
}

function set(name, value) {
    var data = populatePrefix(name),
        namespace = data[0],
        last = null,
        item = [last, last, value];
        
    var collection;
    
    name = data[2];
    
    if (name in namespace) {
        collection = namespace[name];
        last = collection[1];
        if (!collection[0]) {
            collection[0] = item;
        }
        else if (last) {
            last[1] = item;
        }
    }
    else {
        last = item;
        namespace[name] = [item, item];
        namespace.length++;
    }
    item[0] = last;
    
    return EXPORTS.chain;
}

function unset(name) {
    var item = get(name);
    var namespace, first, last;
    
    if (item) {
        name = parse(name);
        namespace = REGISTRY[name[1]];
        unsetItem(namespace, item, name[0]);

    }
    
    return EXPORTS.chain;
    
}

function unsetItem(namespace, item, name) {
    var collection = namespace[name],
        before = item[0],
        after = item[1];
    
    if (before) {
        before[1] = after;
    }
    
    if (after) {
        after[0] = before;
    }
    
    if (item === collection[0]) {
        collection[0] = after || before;
    }
    
    if (item === collection [1]) {
        collection[1] = before || after;
    }
    
    // cleanup
    item.length = 0;
    
    // empty
    if (!collection[0]) {
        collection.length = 0;
        collection = null;
        
        // no more items remove from namespace
        if (!--namespace.length) {
            delete namespace[name];
        }
    }
    
}

function purge(name) {
    
}

function each(name, handler, context) {
    var item = get(name);
    
    context = context === void(0) ? null : context;
    if (item) {
        item = item[0];
        for (; item; item = item[1]) {
            if (handler.call(context, item) === false) {
                break;
            }
        }
    }
    
    return EXPORTS.chain;
}

module.exports = EXPORTS.chain = EXPORTS;
