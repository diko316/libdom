'use strict';

var O = Object.prototype,
    hasOwn = O.hasOwnProperty,
    toString = O.toString,
    ie8TypeObject = toString.call(undefined) === '[object Object]';

function assign(target, source) {
    var has = hasOwn;
    var name;
    
    for (name in source) {
        if (has.call(source, name)) {
            target[name] = source[name];
        }
    }
    return target;
}

function contains(obj, name) {
    return hasOwn.call(obj, name);
}

function isType(obj, type) {
    return toString.call(obj) === type;
}

function ieType(obj, type) {
    return (obj === null ? 
                '[object Null]' :
                obj === void(0) ?
                    '[object Undefined]' :
                    toString.call(obj)) === type;
}


function isNumber(number) {
    return typeof number === 'number' && isFinite(number);
}

function isString(string) {
    return typeof string === 'string' && !!string;
}



module.exports = {
    MAX_BIT_INT: 4294967295,
    assign: assign,
    type: ie8TypeObject ?
                ieType : isType,
    contains: contains,
    number: isNumber,
    string: isString
};