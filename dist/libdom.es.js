var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {};

var global$1$1 = typeof global$1 !== "undefined" ? global$1 :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {};

var ROOT = global$1$1;
var browser = isBrowser();
var nodeVersions = nodeVersion(browser);
var nodejs = nodeVersions && !!nodeVersions.node;
var userAgent = getUserAgent(browser,
                             nodeVersions);
var validSignature = hasValidSignature();
var ajax = ROOT.XMLHttpRequest || null;
var indexOfSupport = typeof Array.prototype.indexOf !== "undefined";


// detect browser
function isBrowser() {
    var G = ROOT,
        win = G.document,
        doc = G,
        result = !!doc && !!win &&
                win.self === (doc.defaultView || doc.parentWindow);
    // cleanup
    G = win = doc = null;
    return result;
}

// detect nodejs info
function nodeVersion(browser) {
    var G = ROOT,
        result = browser ?
                    false :
                    ('process' in G && G.process.versions) || false;
    G = null;
    
    return result;
}

// detect userAgent
function getUserAgent(browser, nodeVersions) {
    var G = ROOT,
        result = 'Unknown',
        proc = null;
    
    if (browser) {
        result = G.navigator.userAgent;
        
    }
    else if (nodeVersions && 'process' in G) {
        proc = G.process;
        result = (['Node ',
                    nodeVersions.node,
                    '(',
                        proc.platform,
                        '; V8 ',
                        nodeVersions.v8 || 'unknown',
                        '; arch ',
                        proc.arch,
                    ')']).
                    join('');
    }
    
    G = proc = null;
    
    return result;       
    
}

function hasValidSignature() {
    var toString = Object.prototype.toString,
        objectSignature = '[object Object]';
        
    return toString.call(null) !== objectSignature ||
                        toString.call(void(0)) !== objectSignature;
}

// empty function for unsupported "console"
//function empty() {
//    
//}
//function polyfillConsole() {
//    var cons = {},
//        names = [
//            'log',
//            'info',
//            'warn',
//            'error',
//            'assert'
//        ],
//        original = ROOT.console;
//    var l;
//    
//    // console polyfill so that IE 8 will not have fatal errors
//    //      for not openning dev tool window
//    if (!original) {
//        for (l = names.length; l--;) {
//            cons[l] = empty;
//        }
//    }
//}
//
//polyfillConsole();

ROOT = null;








var DETECT = Object.freeze({
	browser: browser,
	nodeVersions: nodeVersions,
	nodejs: nodejs,
	userAgent: userAgent,
	validSignature: validSignature,
	ajax: ajax,
	indexOfSupport: indexOfSupport
});

var OBJECT_SIGNATURE = '[object Object]';
var ARRAY_SIGNATURE = '[object Array]';
var NULL_SIGNATURE = '[object Null]';
var UNDEFINED_SIGNATURE = '[object Undefined]';
var NUMBER_SIGNATURE = '[object Number]';
var STRING_SIGNATURE = '[object String]';
var BOOLEAN_SIGNATURE = '[object Boolean]';
var METHOD_SIGNATURE = '[object Function]';
var DATE_SIGNATURE = '[object Date]';
var REGEX_SIGNATURE = '[object RegExp]';
var STRING = 'string';
var NUMBER = 'number';
var BOOLEAN = 'boolean';
var OBJECT = Object;
var O$1 = OBJECT.prototype;
var toString = O$1.toString;
var isSignature = objectSignature;

/** is object signature **/
function objectSignature(subject) {
    if (subject === undefined) {
        return UNDEFINED_SIGNATURE;
    }
    
    if (subject === null ||
        (typeof subject === NUMBER && !isFinite(subject))) {
        return NULL_SIGNATURE;
    }
    
    return toString.call(subject);
}

function isType(subject, type) {
    var len;
    switch (type) {
    case "scalar":
        switch (isSignature(subject)) {
        case STRING_SIGNATURE:
        case NUMBER_SIGNATURE:
        case BOOLEAN_SIGNATURE: return true;
        }
        return false;
    
    case "regexp":
    case "regex":
        type = "RegExp";
        break;
    
    case "method":
        type = "Function";
        break;
    
    case "native":
    case "nativeObject":
        return isNativeObject(subject);
    }
    if (typeof type === STRING) {
        len = type.length;
        if (len) {
            return isSignature(subject) === '[object ' +
                                        type.charAt(0).toUpperCase() +
                                        type.substring(1, len) +
                                        ']';
        }
    }
    return false;
}

/** is object **/
function isObject(subject) {
    return toString.call(subject) === OBJECT_SIGNATURE;
}

function ieIsObject(subject) {
    return subject !== null &&
            subject !== void(0) &&
            toString.call(subject) === OBJECT_SIGNATURE;
}

function isNativeObject(subject) {
    var O = OBJECT;
    var constructor, result;
    
    if (isSignature(subject) === OBJECT_SIGNATURE) {
        constructor = subject.constructor;
        
        // check constructor
        if (O.hasOwnProperty.call(subject, 'constructor')) {
            delete subject.constructor;
            result = subject.constructor === O;
            subject.constructor = constructor;
            return result;
        }
        return constructor === O;
    }
    
    return false;
}

/** is string **/
function isString(subject, allowEmpty) {
    return (typeof subject === STRING ||
            O$1.toString.call(subject) === STRING_SIGNATURE) &&

            (allowEmpty === true || subject.length !== 0);
}

/** is number **/
function isNumber(subject) {
    return typeof subject === NUMBER && isFinite(subject);
}

/** is scalar **/
function isScalar(subject) {
    switch (typeof subject) {
    case NUMBER: return isFinite(subject);
    case BOOLEAN:
    case STRING: return true;
    }
    return false;
}

/** is function **/
function isFunction(subject) {
    return toString.call(subject) === METHOD_SIGNATURE;
}

/** is array **/
function isArray(subject, notEmpty) {
    return toString.call(subject) === ARRAY_SIGNATURE &&
            (notEmpty !== true || subject.length !== 0);
}

/** is date **/
function isDate(subject) {
    return toString.call(subject) === DATE_SIGNATURE;
}

/** is regexp **/
function isRegExp(subject) {
    return toString.call(subject) === REGEX_SIGNATURE;
}


function isThenable(subject) {
    // filter non-thenable scalar natives
    switch (subject) {
    case undefined:
    case null:
    case true:
    case false:
    case NaN: return false;
    }
    // filter scalar
    switch (objectSignature(subject)) {
    case NUMBER_SIGNATURE:
    case STRING_SIGNATURE:
    case BOOLEAN_SIGNATURE: return false;
    }
    
    return 'then' in subject && isFunction(subject.then);
}

function isIterable(subject) {
    
    // filter non-iterable scalar natives
    switch (subject) {
    case undefined:
    case null:
    case true:
    case false:
    case NaN: return false;
    }
    
    // try signature
    switch (objectSignature(subject)) {
    case NUMBER_SIGNATURE:
    case BOOLEAN_SIGNATURE:
        // bogus js engines provides readonly "length" property to functions
    case METHOD_SIGNATURE: return false;

    case STRING_SIGNATURE:
    case ARRAY_SIGNATURE: return true;
    }
    
    return 'length' in subject && isNumber(subject.length);
}


var object = validSignature ?
                        isObject : ieIsObject;

/**
 * @external libcore
 */

//import * as STRING from "./string.js";

var Obj = Object;
var O = Obj.prototype;
var EACH = typeof Obj.getOwnPropertyNames === 'function' ?
                es5each : es3each;
var OHasOwn = O.hasOwnProperty;
var ARRAY_INDEX_RE = /^[1-9][0-9]*|0$/;
    

function empty() {
    
}

function isValidObject(target) {
    var signature$$1 = isSignature(target);
    
    switch (signature$$1) {
    case REGEX_SIGNATURE:
    case DATE_SIGNATURE:
    case ARRAY_SIGNATURE:
    case OBJECT_SIGNATURE:
    case METHOD_SIGNATURE: return signature$$1;
    }
    return false;
}

/**
 * Assign properties of source Object to target Object
 * @alias module:libcore.assign
 * @param {Object} target - the target object
 * @param {Object} source - the source object containing properties
 *                          to be assigned to target object
 * @param {Object} [defaults] - object containing default properties
 *                          which will be assigned first to
 *                          target before source.
 * @param {Boolean} [ownedOnly] - only assign properties owned by "source"
 * @returns {Object} target object from first parameter
 */


function apply(value, name) {
    /*jshint validthis:true */
    this[name] = value;
}

/**
 * Relocate and rename properties of source Object into target Object.
 * 
 * @name libcore.rehash
 * @function
 * @param {Object|Function} target - the target object
 * @param {Object|Function} source - the source object containing properties
 *                                  to be relocated.
 * @param {Object} access - the rename map object containing "renamed property"
 *                          as map object's property name, and
 *                          "source property name" as map object's
 *                          property value. (e.g. { "newname": "from source" })
 * @returns {Object} target object from first parameter
 */


function applyProperties(value, name) {
    /*jshint validthis:true */
    var target = this;
    target[0][name] = target[1][value];
    target = null;
}

function assignAll(target, source, defaults) {
    var onAssign = apply,
        eachProperty = EACH;
        
    if (defaults) {
        eachProperty(defaults, onAssign, target, false);
    }
    
    eachProperty(source, onAssign, target);
    
    return target;
}


/**
 * Iterates all iteratable property of an object calling "handler" parameter on
 *      each iteration.
 * @name libcore.each
 * @function
 * @param {Object} subject
 * @param {Function} handler - the callback of each iteration of
 *                          "subject" object's property.
 * @param {*} [scope] - "this" object to use inside the "handler" parameter
 * @param {boolean} [hasown] - performs checking to only include
 *                          source object property that is overridden
 *                          (Object.protototype.hasOwnProperty() returns true)
 *                          when this parameter is set to true.
 * @returns {Object} The subject parameter
 */
function es3each(subject, handler, scope, hasown) {
    var hasOwn = OHasOwn,
        noChecking = hasown === false;
    var name;
    
    if (!isValidObject(subject)) {
        throw new Error("Invalid [subject] parameter.");
    }
    
    if (arguments.length > 3 && typeof hasown !== 'boolean') {
        throw new Error("Invalid [hasown] hasOwnProperty parameter.");
    }
    
    if (scope === void(0)) {
        scope = null;
    }
    
    for (name in subject) {
        if ((noChecking || hasOwn.call(subject, name)) &&
            handler.call(scope, subject[name], name, subject) === false) {
            break;
        }
    }
    
    return subject;
}

function es5each(subject, handler, scope, hasown) {
    var hasOwn = OHasOwn,
        noChecking = hasown === false;
    var names, name, c, l;
    
    if (!isValidObject(subject)) {
        throw new Error("Invalid [subject] parameter.");
    }
    
    if (arguments.length > 3 && typeof hasown !== 'boolean') {
        throw new Error("Invalid [hasown] hasOwnProperty parameter.");
    }
    
    if (scope === void(0)) {
        scope = null;
    }
    
    names = Obj.getOwnPropertyNames(subject);
    for (c = -1, l = names.length; l--;) {
        name = names[++c];
        if ((noChecking || hasOwn.call(subject, name)) &&
            handler.call(scope, subject[name], name, subject) === false) {
            break;
        }
    }
    
    return subject;
}

/**
 * Checks if "subject" Object contains overridden property.
 *      The same symantics of Object.prototype.hasOwnProperty.
 *      
 * @name libcore.contains
 * @function
 * @param {Object} subject
 * @param {String} property - Property Name to inspect
 * @returns {boolean} True if subject Object contains property and dirty.
 *                      False if subject Object's property do not exist or not
 *                      dirty.
 */




/**
 * Clears Object properties. This method only deletes overridden properties and
 *      will not fill "undefined" to non-owned properties from its prototype.
 * @name libcore.clear
 * @function
 * @param {Object} subject
 * @returns {Object} subject parameter.
 */

function applyClear() {
    delete arguments[2][arguments[1]];
}

function applyFillin(value, name) {
    /* jshint validthis:true */
    var target = this;
    if (!contains(target, name)) {
        target[name] = value;
    }
    target = null;
}

/**
 * Builds instance of "Class" parameter without executing its constructor.
 * @name libcore.instantiate
 * @function
 * @param {Function} Class
 * @param {Object} overrides
 * @returns {Object} Instance created from Class without executing
 *                      its constructor.
 */


/**
 * Deep compares two scalar, array, object, regex and date objects
 * @name libcore.compare
 * @function
 * @param {*} object1
 * @param {*} object2
 * @returns {boolean} True if scalar, regex, date, object properties, or array
 *                      items of object1 is identical to object2.
 */


function compareLookback(object1, object2, references) {
    var isObject = object,
        isArray$$1 = isArray,
        isRegex = isRegExp,
        isDate$$1 = isDate,
        onCompare = onEachCompareObject,
        each = EACH,
        me = compareLookback,
        depth = references.length;
    var len, context;
    
    switch (true) {
        
    // prioritize same object, same type comparison
    case object1 === object2: return true;
    
    // native object comparison
    case isObject(object1):
        if (!isObject(object2)) {
            return false;
        }
        
        // check if object is in references
        if (references.lastIndexOf(object1) !== -1 &&
            references.lastIndexOf(object2) !== -1) {
            return true;
        }
        
        // proceed
        references[depth] = object1;
        references[depth + 1] = object2;
        
        context = [object2, references, true];
        each(object1, onCompare, context);
        if (!context[2]) {
            return false;
        }
        
        context[0] = object1;
        each(object2, onCompare, context);
        if (!context[2]) {
            return false;
        }
        
        references.length = depth;
        
        return true;
    
    // array comparison
    case isArray$$1(object1):
        if (!isArray$$1(object2)) {
            return false;
        }
        
        // check references
        if (references.lastIndexOf(object1) !== -1 &&
            references.lastIndexOf(object2) !== -1) {
            return true;
        }
        
        len = object1.length;
        
        if (len !== object2.length) {
            return false;
        }
        
        // proceed
        references[depth] = object1;
        references[depth + 1] = object2;
        
        for (; len--;) {
            if (!me(object1[len], object2[len], references)) {
                return false;
            }
        }
        
        references.length = depth;
        
        return true;
        
    
    // RegExp compare
    case isRegex(object1):
        return isRegex(object2) && object1.source === object2.source;
    
    // Date compare
    case isDate$$1(object1):
        return isDate$$1(object2) && object1.toString() === object2.toString();
    }
    
    return false;
}

function onEachCompareObject(value, name) {
    /* jshint validthis:true */
    var context = this,
        target = context[0],
        result = name in target ?
                    compareLookback(value, target[name], context[1]) :
                    false;
    context[2] = result;
    
    return result;
}

/**
 * Clones scalar, array, object, regex or date objects
 * @name libcore.clone
 * @function
 * @param {*} data - scalar, array, object, regex or date object to clone.
 * @param {boolean} [deep] - apply deep clone to object properties or
 *                          array items.
 * @returns {*} Cloned object based from data
 */



function cloneObject(data, parents, cloned) {
    var depth = parents.length,
        recreated = {},
        context = [recreated,
                   parents,
                   cloned];
    
    parents[depth] = data;
    cloned[depth] = recreated;
    
    EACH(data, onEachClonedProperty, context);
    
    parents.length = cloned.length = depth;
    
    return recreated;
}

function cloneArray(data, parents, cloned) {
    var depth = parents.length,
        onProperty = onEachClonedProperty,
        recreated = [],
        context = [recreated,
                   parents,
                   cloned],
        c = 0,
        l = data.length;
    
    parents[depth] = data;
    cloned[depth] = recreated;
    
    for (; l--; c++) {
        onProperty.call(context,
                        data[c],
                        c,
                        data);
    }
    
    parents.length = cloned.length = depth;
    
    return recreated;
}

function onEachClonedProperty(value, name) {
    var /* jshint validthis:true */
        context = this,
        isNative = isNativeObject(value),
        parents = context[1],
        cloned = context[2];
    var index;
    
    if (isNative || isArray(value)) {
        index = parents.lastIndexOf(value);
        value = index === -1 ?
                    (isNative ?
                        cloneObject :
                        cloneArray)(value, parents, cloned) :
                    
                    cloned[index];
    }
    else {
        value = clone(value, false);
    }
    
    context[0][name] = value;
}

function onMaxNumericIndex(value, name, context) {
    if (ARRAY_INDEX_RE.test(name)) {
        context[0] = Math.max(1 * name, context[0]);
    }
}



function assign(target, source, defaults, ownedOnly) {
        var onAssign = apply,
            is = isValidObject,
            eachProperty = EACH,
            len = arguments.length;
        
        if (!is(target)) {
            throw new Error("Invalid [target] parameter.");
        }
        
        if (!is(source)) {
            throw new Error("Invalid [source] parameter.");
        }
        
        if (typeof defaults === 'boolean') {
            ownedOnly = defaults;
            len = 2;
        }
        else {
            ownedOnly = ownedOnly !== false;
        }
        
        if (is(defaults)) {
            eachProperty(defaults, onAssign, target, ownedOnly);
        }
        else if (len > 2) {
            throw new Error("Invalid [defaults] parameter.");
        }
        
        eachProperty(source, onAssign, target, ownedOnly);
        
        return target;
    }

function rehash(target, source, access) {
        var is = isValidObject,
            context = [target, source];
            
        if (!is(target)) {
            throw new Error("Invalid [target] parameter.");
        }
        
        if (!is(source)) {
            throw new Error("Invalid [source] parameter.");
        }
        
        if (!object(access)) {
            throw new Error("Invalid [access] parameter.");
        }
        
        EACH(access, applyProperties, context);
        context = context[0] = context[1] =  null;
        return target;
    }

function contains(subject, property) {
    
        if (!isString(property) && !isNumber(property)) {
            throw new Error("Invalid [property] parameter.");
        }
        
        return OHasOwn.call(subject, property);
    }

function instantiate(Class, overrides) {
        empty.prototype = Class.prototype;
        
        if (object(overrides)) {
            return assign(new empty(), overrides);
        }
        return new empty();
    }
    
function clone(data, deep) {
        var isNative = isNativeObject(data);
        
        deep = deep === true;
        
        if (isNative || isArray(data)) {
            return deep ?
                        
                        (isNative ? cloneObject : cloneArray)(data, [], []) :
                        
                        (isNative ? assignAll({}, data) : data.slice(0));
        }
        
        if (isRegExp(data)) {
            return new RegExp(data.source, data.flags);
        }
        else if (isDate(data)) {
            return new Date(data.getFullYear(),
                        data.getMonth(),
                        data.getDate(),
                        data.getHours(),
                        data.getMinutes(),
                        data.getSeconds(),
                        data.getMilliseconds());
        }
        
        return data;
    }
    
function compare(object1, object2) {
        return compareLookback(object1, object2, []);
    }
    
function fillin(target, source, hasown) {
        if (!isValidObject(target)) {
            throw new Error("Invalid [target] parameter");
        }
        EACH(source, applyFillin, target, hasown !== false);
        return target;
    }

function clear(subject) {
        EACH(subject, applyClear, null, true);
        return subject;
    }
    
function maxObjectIndex(subject) {
        var context;
        
        if (isArray(subject)) {
            return subject.length - 1;
        }
        
        if (isValidObject(subject)) {
            
            context = [-1];
            EACH(subject, onMaxNumericIndex, context);
            return context[0];
        }
        return false;
    }

//export default {
//        each: EACH,
//        assign: assign,
//        rehash: rehash,
//        contains: contains,
//        instantiate: instantiate,
//        clone: clone,
//        compare: compare,
//        fillin: fillin,
//        clear: clear,
//        maxObjectIndex: maxObjectIndex
//    };

var G = global$1$1;
var NAME_RE = /^(([^\.]+\.)*)((before|after)\:)?([a-zA-Z0-9\_\-\.]+)$/;
var POSITION_BEFORE = 1;
var POSITION_AFTER = 2;
var RUNNERS = {};
var NAMESPACES = {};
var NATIVE_SET_IMMEDIATE = !!G.setImmediate;
var CHAIN = {};

    
function set(name, handler) {
    var parsed = parseName(name),
        list = RUNNERS;
    var access, items;
    
    if (parsed && handler instanceof Function) {
        name = parsed[1];
        access = ':' + name;
        if (!(access in list)) {
            list[access] = {
                name: name,
                before: [],
                after: []
            };
        }
        
        items = list[access][getPositionAccess(parsed[0])];
        
        items[items.length] = handler;
    }
    
    return CHAIN;
}


function run(name, args, scope) {
    var runners = get(name);
    var c, l;

    if (runners) {
        if (typeof scope === 'undefined') {
            scope = null;
        }
        if (!(args instanceof Array)) {
            args = [];
        }
        
        for (c = -1, l = runners.length; l--;) {
            runners[++c].apply(scope, args);
        }
        
    }
    
    return CHAIN;
}

function get(name) {
    var list = RUNNERS,
        parsed = parseName(name);
    var access;
    
    if (parsed) {
        access = ':' + parsed[1];
        
        if (access in list) {
            return list[access][getPositionAccess(parsed[0])];
            
        }
    }
    
    return void(0);
}

function getPositionAccess(input) {
    return  input === POSITION_BEFORE ? 'before' : 'after';
}

function parseName(name) {
    var match = isString(name) && name.match(NAME_RE);
    var position, namespace;
    
    
    
    
    if (match) {
        namespace = match[1];
        position = match[4] === 'before' ? POSITION_BEFORE : POSITION_AFTER;
        //console.log('parsed ', name, ' = ', [position, (namespace || '') + match[5]]);
        return [position, (namespace || '') + match[5]];
        
    }
    
    return void(0);
    
}

function middlewareNamespace(name) {
    var list = NAMESPACES;
    var access, register, run;
 
    if (isString(name)) {
        access = name + '.';
        if (!(access in list)) {
            run = createRunInNamespace(access);
            register = createRegisterInNamespace(access);
            list[access] = register.chain = run.chain = {
                                                        run: run,
                                                        register: register
                                                    };
        }
        return list[access];
    }
    return void(0);
}

function createRunInNamespace(ns) {
    function nsRun(name, args, scope) {
        run(ns + name, args, scope);
        return nsRun.chain;
    }
    return nsRun;
}

function createRegisterInNamespace(ns) {
    function nsRegister(name, handler) {
        set(ns + name, handler);
        return nsRegister.chain;
    }
    return nsRegister;
}


function timeoutAsync(handler) {
    return G.setTimeout(handler, 1);
}

function clearTimeoutAsync(id) {
    return G.clearTimeout(id);
}

function nativeSetImmediate (fn) {
    return G.setImmediate(fn);
}

function nativeClearImmediate(id) {
    return G.clearImmediate(id);
}

function setModuleChain(chain) {
        CHAIN = chain;
    }
    
var setAsync = NATIVE_SET_IMMEDIATE ?
                        nativeSetImmediate : timeoutAsync;
var clearAsync = NATIVE_SET_IMMEDIATE ?
                        nativeClearImmediate : clearTimeoutAsync;

// motivation of set operations:
// https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php
//DETECT = require('./detect.js'),
    //OBJECT = require('./object.js'),
    //TYPE = require('./type.js'),

var INVALID_ARRAY1 = 'Invalid [array1] parameter.';
var INVALID_ARRAY2 = 'Invalid [array2] parameter.';
var A = Array.prototype;

function indexOf(subject) {
    /*jshint validthis:true */
    var array$$1 = this,
        l = array$$1.length,
        c = -1;
    
    for (; l--;) {
        if (subject === array$$1[++c]) {
            array$$1 = null;
            return c;
        }
    }
    
    return -1;
}

function lastIndexOf(subject) {
    /*jshint validthis:true */
    var array$$1 = this,
        l = array$$1.length;
        
    for (; l--;) {
        if (subject === array$$1[l]) {
            array$$1 = null;
            return l;
        }
    }
    
    return -1;
}

/**
 * Creates a union of two arrays
 * @name libcore.unionList
 * @function
 * @param {Array} array1 - source array
 * @param {Array} array2 - array to merge
 * @param {boolean} [clone] - Filters array1 parameter with union of array2
 *                          if this parameter is false. It returns a new set
 *                          of array containing union of array1 and array2
 *                          otherwise.
 * @returns {Array} union of first two array parameters
 */
function union(array1, array2, clone$$1) {
    var isarray = isArray;
    var subject, l, len, total;
    
    if (!isarray(array1)) {
        throw new Error(INVALID_ARRAY1);
    }
    
    if (!isarray(array2)) {
        throw new Error(INVALID_ARRAY2);
    }
    
    array1 = clone$$1 === true ? array1.slice(0) : array1;
    
    // apply
    array1.push.apply(array1, array2);
    total = array1.length;
    
    // apply unique
    found: for (l = total; l--;) {
        subject = array1[l];
        
        // remove if not unique
        for (len = total; len--;) {
            if (l !== len && subject === array1[len]) {
                total--;
                array1.splice(l, 1);
                continue found;
            }
        }
    }
    
    return array1;
}

/**
 * Creates an intersection of two arrays
 * @name libcore.intersect
 * @function
 * @param {Array} array1 - source array 
 * @param {Array} array2 - array to intersect
 * @param {boolean} [clone] - Filters array1 parameter with intersection of
 *                          array2 if this parameter is false. It returns a
 *                          new set of array containing intersection of
 *                          array1 and array2 otherwise.
 * @returns {Array} intersection of first two array parameters
 */
function intersect(array1, array2, clone$$1) {
    var isarray = isArray;
    var subject, l1, l2, total1, total2;
    
    if (!isarray(array1)) {
        throw new Error(INVALID_ARRAY1);
    }
    
    if (!isarray(array2)) {
        throw new Error(INVALID_ARRAY2);
    }
    
    total1 = array1.length;
    total2 = array2.length;
        
    // create a copy
    array1 = clone$$1 === true ? array1.slice(0) : array1;
    
    found: for (l1 = total1; l1--;) {
        subject = array1[l1];
        foundSame: for (l2 = total2; l2--;) {
            if (subject === array2[l2]) {
                // intersect must be unique
                for (l2 = total1; l2--;) {
                    if (l2 !== l1 && subject === array1[l2]) {
                        break foundSame;
                    }
                }
                continue found;
            }
        }
        array1.splice(l1, 1);
        total1--;
    }
    
    return array1;
}


/**
 * Creates a difference of two arrays
 * @name libcore.differenceList
 * @function
 * @param {Array} array1 - source array 
 * @param {Array} array2 - array to be applied as difference of array1
 * @param {boolean} [clone] - Filters array1 parameter with difference of array2
 *                          if this parameter is false. It returns a new set
 *                          of array containing difference of
 *                          array1 and array2 otherwise.
 * @returns {Array} difference of first two array parameters
 */
function difference(array1, array2, clone$$1) {
    var isarray = isArray;
    var subject, l1, l2, total1, total2;
    
    if (!isarray(array1)) {
        throw new Error(INVALID_ARRAY1);
    }
    
    if (!isarray(array2)) {
        throw new Error(INVALID_ARRAY2);
    }
    
    total1 = array1.length;
    total2 = array2.length;
        
    // create a copy
    array1 = clone$$1 === true ? array1.slice(0) : array1;
    
    found: for (l1 = total1; l1--;) {
        subject = array1[l1];
        
        // remove if found
        for (l2 = total2; l2--;) {
            if (subject === array2[l2]) {
                array1.splice(l1, 1);
                total1--;
                continue found;
            }
        }
        
        // diff must be unique
        for (l2 = total1; l2--;) {
            if (l2 !== l1 && subject === array1[l2]) {
                array1.splice(l1, 1);
                total1--;
                continue found;
            }
        }
    }
    
    return array1;
}





// apply polyfill
if (!indexOfSupport) {
    assign(A, {
        indexOf: indexOf,
        lastIndexOf: lastIndexOf
    });
}

var HALF_BYTE = 0x80;
var SIX_BITS = 0x3f;
var ONE_BYTE = 0xff;
var fromCharCode = String.fromCharCode;
var BASE64_MAP =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var NOT_BASE64_RE = /[^a-zA-Z0-9\+\/\=]/g;
var BASE64_EXCESS_REMOVE_RE = /[^a-zA-Z0-9\+\/]/;
var CAMEL_RE = /[^a-z]+[a-z]/ig;
var UNCAMEL_RE = /\-*[A-Z]/g;
var INVALID_SUBJECT = 'Invalid [subject] parameter.';

function base64Encode(subject) {
    var map = BASE64_MAP,
        buffer = [],
        bl = 0,
        c = -1,
        excess = false,
        pad = map.charAt(64);
    var l, total, code, flag, end, chr;
    
    if (!isString(subject, true)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    // decode to ascii
    subject = utf16ToUtf8(subject);
    l = total = subject.length;
    
    for (; l--;) {
        code = subject.charCodeAt(++c);
        flag = c % 3;
        
        switch (flag) {
        case 0:
            chr = map.charAt((code & 0xfc) >> 2);
            excess = (code & 0x03) << 4;
            break;
        case 1:
            chr = map.charAt(excess | (code & 0xf0) >> 4);
            excess = (code & 0x0f) << 2;
            break;
        case 2:
            chr = map.charAt(excess | (code & 0xc0) >> 6);
            excess = code & 0x3f;
        }
        buffer[bl++] = chr;
        
        end = !l;
        if ((end || flag === 2)) {
            buffer[bl++] = map.charAt(excess);
        }
        
        
        if (!l) {
            l = bl % 4;
            for (l = l && 4 - l; l--;) {
                buffer[bl++] = pad;
            }
            break;
        }
    }
    
    return buffer.join('');
    
}

function base64Decode(subject) {
    var map = BASE64_MAP,
        oneByte = ONE_BYTE,
        buffer = [],
        bl = 0,
        c = -1,
        code2str = fromCharCode;
    var l, code, excess, chr, flag;
    
    if (!isString(subject, true) || NOT_BASE64_RE.test(subject)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    subject = subject.replace(BASE64_EXCESS_REMOVE_RE, '');
    l = subject.length;
    
    for (; l--;) {
        code = map.indexOf(subject.charAt(++c));
        flag = c % 4;
        
        switch (flag) {
        case 0:
            chr = 0;
            break;
        case 1:
            chr = ((excess << 2) | (code >> 4)) & oneByte;
            break;
        case 2:
            chr = ((excess << 4) | (code >> 2)) & oneByte;
            break;
        case 3:
            chr = ((excess << 6) | code) & oneByte;
        }
        
        excess = code;
        
        if (!l && flag < 3 && chr < 64) {
            break;
        }

        if (flag) {
            buffer[bl++] = code2str(chr);
        }
    }
    
    //return decodeURIComponent(escape(buffer.join("")));
    
    return utf8ToUtf16(buffer.join(""));
    //return binbuffer.join("");
    
}


function utf16ToUtf8(subject) {
    var half = HALF_BYTE,
        sixBits = SIX_BITS,
        code2char = fromCharCode,
        utf8 = [],
        ul = 0;
    var code, c, l;
    
    if (!isString(subject, true)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    for (c = -1, l = subject.length; l--;) {
        code = subject.charCodeAt(++c);
        
        if (code < half) {
            utf8[ul++] = code2char(code);
        }
        else if (code < 0x800) {
            utf8[ul++] = code2char(0xc0 | (code >> 6));
            utf8[ul++] = code2char(half | (code & sixBits));
        }
        else if (code < 0xd800 || code > 0xdfff) {
            utf8[ul++] = code2char(0xe0 | (code >> 12));
            utf8[ul++] = code2char(half | ((code >> 6) & sixBits));
            utf8[ul++] = code2char(half | (code  & sixBits));
        }
        else {
            l--;
            code = 0x10000 + (((code & 0x3ff)<<10)
                      | (subject.charCodeAt(++c) & 0x3ff));
            
            utf8[ul++] = code2char(0xf0 | (code >> 18));
            utf8[ul++] = code2char(half | ((code >> 12) & sixBits));
            utf8[ul++] = code2char(half | ((code >> 6) & sixBits));
            utf8[ul++] = code2char(half | (code >> sixBits));
            
        }
    }
    
    return utf8.join('');
}


// based from https://gist.github.com/weishuaiwang/4221687
function utf8ToUtf16(subject) {
    var code2char = fromCharCode;
    var utf16, ul, c, l, code;
    
    if (!isString(subject, true)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    utf16 = [];
    ul = 0;
    for (c = -1, l = subject.length; l--;) {
        code = subject.charCodeAt(++c);
        switch (code >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            // 0xxxxxxx
            utf16[ul++] = subject.charAt(c);
            break;
        case 12:
        case 13:
            // 110x xxxx 10xx xxxx
            l--;
            utf16[ul++] = code2char(((code & 0x1F) << 6) |
                                    (subject.charCodeAt(++c) & 0x3F));
            break;
        case 14:
            // 1110 xxxx10xx xxxx10xx xxxx
            utf16[ul++] = code2char(((code & 0x0F) << 12) |
                                    ((subject.charCodeAt(++c) & 0x3F) << 6) |
                                    ((subject.charCodeAt(++c) & 0x3F) << 0));
            l -= 2;
            break;
        }
    }
    
    return utf16.join("");
}

function camelize(subject) {
    return subject.replace(CAMEL_RE, applyCamelize);
}

function applyCamelize(all) {
    return all.charAt(all.length - 1).toUpperCase();
}

function uncamelize(subject) {
    return subject.replace(UNCAMEL_RE, applyUncamelize);
}

function applyUncamelize(all) {
    return '-' + all.charAt(all.length -1).toLowerCase();
}

//TYPE = require("./type.js"),
//    OBJECT = require("./object.js"),


var NUMERIC_RE = /^([1-9][0-9]*|0)$/;
var ARRAY_INDEX_RE$1 = /^([1-9][0-9]*|0|)$/;
var ERROR_NATIVE_OBJECT = "Root [subject] requires native Object to accept " +
                            "non-numeric property name.";
var ERROR_PATH_INVALID = 'Invalid [path] parameter.';
var START = "start";
var START_ESCAPED = "start_escaped";
var QUEUE = "queue";
var END = "end";
var END_EMPTY = "end_empty";
var STATE = {
        "start": {
            "[": "bracket_start",
            "'": "any_sq_start",
            '"': "any_dq_start",
            "default": "any",
            "\\": "any_escape"
        },
        
        "bracket_start": {
            "]": "property_end",
            "'": "sq_start",
            '"': "dq_start",
            "default": "bracket_any"
        },
        
        "any_sq_start": {
            "'": "property_end",
            "\\": "any_sq_escape",
            "default": "any_sq"
        },
        
        "any_sq": {
            "'": "property_end",
            "\\": "any_sq_escape",
            "default": "any_sq"
        },
        
        "any_sq_escape": {
            "default": "any_sq"
        },
        
        "any_dq_start": {
            '"': "property_end",
            "\\": "any_dq_escape",
            "default": "any_dq"
        },
        
        "any_dq": {
            '"': "property_end",
            "\\": "any_dq_escape",
            "default": "any_dq"
        },
        
        "any_dq_escape": {
            "default": "any_dq"
        },
        
        "sq_start": {
            "'": "bracket_end",
            "\\": "sq_escape",
            "default": "sq"
        },
        "sq": {
            "'": "bracket_end",
            "\\": "sq_escape",
            "default": "sq"
        },
        "sq_escape": {
            "default": "sq"
        },
        "dq_start": {
            '"': "bracket_end",
            "\\": "dq_escape",
            "default": "dq"
        },
        "dq": {
            '"': "bracket_end",
            "\\": "dq_escape",
            "default": "dq"
        },
        "dq_escape": {
            "default": "dq"
        },
        
        "bracket_any": {
            "]": "property_end",
            "\\": "bracket_any_escape",
            "default": "bracket_any"
        },
        
        "bracket_any_escape": {
            "default": "bracket_any"
        },
        
        "bracket_end": {
            "]": "property_end"
        },
        
        "any": {
            ".": "start",
            "\\": "any_escape",
            "[": "bracket_start",
            "default": "any"
        },
        "any_escape": {
            "default": "any"
        },
        
        "property_end": {
            "[": "bracket_start",
            ".": "start"
        }
    };
var STATE_ACTION = {
        "start": {
            "any": START,
            "any_escape": START_ESCAPED
        },
        
        "any_sq_start": {
            "any_sq": START,
            "property_end": END_EMPTY
            
        },
        
        "any_sq": {
            "any_sq": QUEUE,
            "property_end": END
        },
        
        "any_sq_escape": {
            "any_sq": QUEUE
        },
        
        "any_dq_start": {
            "any_dq": START,
            "property_end": END_EMPTY
            
        },
        
        "any_dq": {
            "any_dq": QUEUE,
            "property_end": END
        },
        
        "any_dq_escape": {
            "any_dq": QUEUE
        },
        
        "any": {
            "any": QUEUE,
            "start": END,
            "bracket_start": END
        },
        "any_escape": {
            "any": QUEUE,
            "bracket_start": END,
            "start": START
        },
        
        "bracket_start": {
            "bracket_any": START,
            "property_end": END_EMPTY
        },
        
        "bracket_any": {
            "bracket_any": QUEUE,
            "property_end": END
        },
        
        "bracket_any_escape": {
            "bracket_any": QUEUE
        },
        
        "sq_start": {
            "sq": START,
            "bracket_end": END_EMPTY
        },
        "sq": {
            "sq": QUEUE,
            "bracket_end": END
        },
        "sq_escape": {
            "sq": QUEUE
        },
        
        "dq_start": {
            "dq": START,
            "bracket_end": END_EMPTY
        },
        "dq": {
            "dq": QUEUE,
            "bracket_end": END
        },
        "dq_escape": {
            "dq": QUEUE
        }
    };




function onParsePath(property, last, context) {
    context[context.length] = property;
}



function isAccessible(subject, item) {
    var signature$$1 = isSignature(subject);
    
    switch (signature$$1) {
    case NUMBER_SIGNATURE:
        return isFinite(subject) && item in Number.prototype && signature$$1;
        
    case STRING_SIGNATURE:
        return item in String.prototype && signature$$1;
    
    case BOOLEAN_SIGNATURE:
        return item in Boolean.prototype && signature$$1;
    
    case REGEX_SIGNATURE:
    case DATE_SIGNATURE:
    case ARRAY_SIGNATURE:
    case OBJECT_SIGNATURE:
    case METHOD_SIGNATURE:
        if (item in subject) {
            return signature$$1;
        }
    }
    return false;
}

function isWritable(subject) {
    var signature$$1 = isSignature(subject);
    
    switch (signature$$1) {
    case REGEX_SIGNATURE:
    case DATE_SIGNATURE:
    case ARRAY_SIGNATURE:
    case OBJECT_SIGNATURE:
    case METHOD_SIGNATURE:
        return signature$$1;
    }
    return false;
}

function isJSONWritable(subject) {
    var signature$$1 = isSignature(subject);
    
    switch (signature$$1) {
    case ARRAY_SIGNATURE:
    case OBJECT_SIGNATURE:
        return signature$$1;
    }
    return false;
}

function findCallback(item, last, operation) {
    var subject = operation[1];
    
    if (!isAccessible(subject, item)) {
        operation[0] = void(0);
        return false;
    }
    
    operation[last ? 0 : 1] = subject[item];
    return true;
}







function onPopulatePath(item, last, context) {
    var subject = context[1],
        iswritable = isWritable,
        writable = iswritable(subject),
        U = void(0),
        success = false;
        
    // populate
    if (!last) {
        // populate
        if (writable) {
            // set object
            if (!(item in subject)) {
                subject[item] = {};
                success = true;
                
            }
            // allow only when writable
            else if (iswritable(subject[item])) {
                success = true;
            }
        }
    
        context[1] = success ? subject[item] : U;
        
    }
    // end it with writable state?
    else {
        success = writable;
        context[2] = success && item;
        
    }
   
    return success;

}




function onRemovePath(item, last, context) {
    var subject = context[1],
        iswritable = isWritable,
        writable = iswritable(subject),
        U = void(0),
        success = false;
        
    // populate
    if (!last) {
        if (writable && item in subject) {
            
            // go to next
            if (iswritable(subject[item])) {
                success = true;
            }
            // still a success, nothing to remove
            else {
                context[3] = true;
            }

        }
    
        context[1] = success ? subject[item] : U;
        
    }
    // end it with writable state?
    else {
        success = writable;
        context[2] = success && item;
        context[3] = true;
    }
    
    return success;
}







function existsCallback(item, last, context) {
    var subject = context[0],
        exists = isAccessible(subject, item);
    
    if (exists) {
        context[0] = subject[item];
    }
    
    if (last) {
        context[1] = !!exists;
    }
    
    return exists;
}




function jsonParsePath(path) {
        var items = [];
        
        return jsonEach(path, onParsePath, items) && items.length ?
                    items : null;
        
    }
    
function jsonFind(path, object$$1) {
        var operation = [void(0), object$$1];
        jsonEach(path, findCallback, operation);
        operation[1] = null;
        return operation[0];
    }
    
function jsonCompare(path, object1, object2) {
        return compare(jsonFind(path, object1), object2);
    }

function jsonClone(path, object$$1, deep) {
        return clone(jsonFind(path, object$$1), deep === true);
    }
    
function jsonEach(path, callback, arg1, arg2, arg3, arg4, arg5) {
        var map = STATE,
            action = STATE_ACTION,
            start = START,
            start_escaped = START_ESCAPED,
            queue = QUEUE,
            end = END,
            end_empty = END_EMPTY,
            DEFAULT = "default";
        var c, l, chr, state, stateObject, items, len, last,
            next, actionObject, buffer, bl, buffered, pending,
            start_queue, restart;
        
        if (!isString(path)) {
            throw new Error(ERROR_PATH_INVALID);
        }
        
        if (!isFunction(callback)) {
            throw new Error("Invalid [callback] parameter");
        }
        
        buffer = bl = false;
        state = "start";
        stateObject = map.start;
        
        items = [];
        len = pending = 0;
        
        for (c = -1, l = path.length; l--;) {
            buffered = false;
            chr = path.charAt(++c);
            last = !l;
            
            // find next state
            if (chr in stateObject) {
                next = stateObject[chr];
            }
            else if (DEFAULT in stateObject) {
                next = stateObject[DEFAULT];
            }
            else {
                return null;
            }
            
            // check for actions
            if (state in action) {
                actionObject = action[state];
                if (next in actionObject) {
                    start_queue = restart = false;
                    
                    switch (actionObject[next]) {
                    
                    case start:
                        start_queue = true;
                    /* falls through */
                    case start_escaped:
                            if (buffer !== false) {
                                return false;
                            }
                            
                            if (start_queue && !last) {
                                buffer = [chr];
                                bl = 1;
                            }
                            else {
                                buffer = [];
                                bl = 0;
                            }
                            
                            // exit if not last
                            if (!last) {
                                break;
                            }
                    /* falls through */
                    case queue:
                            if (buffer === false) {
                                return false;
                            }
                            buffer[bl++] = chr;
                            // exit if not last
                            if (!last) {
                                break;
                            }
                    /* falls through */
                    case end:
                            if (buffer === false) {
                                return false;
                            }
                            items[len++] = buffer.join('');
                            buffer = bl = false;
                        break;
                    case end_empty:
                            if (buffer !== false) {
                                return false;
                            }
                            items[len++] = '';
    
                        break;
                    }
                }
            }
            
            
            state = next;
            stateObject = map[state];
            
            if (pending < len - 1) {
                if (callback(items[pending++],
                            false,
                            arg1,
                            arg2,
                            arg3,
                            arg4,
                            arg5) === false) {
                    return true;
                }
            }
            // last
            if (last) {
                l = len - pending;
                for (; l--;) {
                    if (callback(items[pending++],
                                !l,
                                arg1,
                                arg2,
                                arg3,
                                arg4,
                                arg5) === false) {
                        return true;
                    }
                }
                break;
            }
    
        }
        
        return true;
    
    }
    
function jsonSet(path, subject, value, overwrite) {
        var typeArray = ARRAY_SIGNATURE,
            apply = assign,
            writable = isWritable;
        var context, name, current, valueSignature, currentSignature,
            arrayOperation, arrayPush, canApply;
        
        if (!isString(path)) {
            throw new Error(ERROR_PATH_INVALID);
        }
        
        // main subject should be accessible and native object
        context = [void(0), subject, false];
        jsonEach(path, onPopulatePath, context);
        name = context[2];
        
        if (name !== false) {
            subject = context[1];
            valueSignature = writable(value);
            arrayOperation = isArray(subject) && NUMERIC_RE.test(name);
            
            if (name in subject) {
                current = subject[name];
                currentSignature = writable(current);
            }
            else {
                current = undefined;
                currentSignature = null;
            }
            
            canApply = valueSignature && !!currentSignature;
            arrayPush = canApply &&
                            valueSignature === typeArray &&
                            currentSignature === typeArray;
                            
            
            // finalize overwrite type
            switch (overwrite) {
            // only available if subject is array and name is numeric index
            case 'insert':
                overwrite = !arrayOperation;
                if (arrayOperation) {
                    subject.splice(name * 1, 0, value);
                }
                break;
            
            // only available if subject canApply
            case 'apply':
                overwrite = !canApply;
                if (canApply) {
                    apply(current, value);
                }
                break;
            
            // only available if current is array and value is array
            case 'push':
                overwrite = !arrayPush;
                if (arrayPush) {
                    current.push.apply(current, value);
                }
                break;
            
            // only available if current is array and value is array
            case 'unshift':
                overwrite = !arrayPush;
                if (arrayPush) {
                    current.splice.apply(current, [0, 0].concat(value));
                }
                break;
            
            // default is no overwrite if possible
            case false:
            /* falls through */
            default:
                // can apply or push only if non-scalar current and value
                overwrite = !canApply;
                if (canApply) {
                    if (arrayPush) {
                        current.push.apply(current, value);
                    }
                    else {
                        apply(current, value);
                    }
                }
            }
            
            // plain overwrite!
            if (overwrite === true) {
                subject[name] = value;
            }
            
            return true;
        
        }
        return false;
    }
    
function jsonUnset(path, subject) {
        var context, name, returnValue;
        
        if (!isString(path)) {
            throw new Error(ERROR_PATH_INVALID);
        }
        
        // main subject should be accessible and native object
        context = [void(0), subject, false, false];
        jsonEach(path, onRemovePath, context);
        
        name = context[2];
        returnValue = context[3];
        
        // found! and must be removed
        if (returnValue && name !== false) {
            
            subject = context[1];
            
            if (!(name in subject)) {
                
                returnValue = false;
            }
            else {
            
                // remove item
                if (isArray(subject) && NUMERIC_RE.test(name)) {
                    subject.splice(name * 1, 1);
                    
                }
                else {
                    
                    delete subject[name];
                    // check if removable
                    returnValue = !(name in subject);
                    
                }
                
            }
        }
        
        return returnValue;
    }

function jsonFill(path, subject, value) { //, overwrite) {
        var typeArray = ARRAY_SIGNATURE,
            getMax = maxObjectIndex,
            apply = assign,
            has = contains,
            arrayIndexRe = ARRAY_INDEX_RE$1,
            iswritable = isJSONWritable,
            isSubjectArray = isArray(subject);
            
        var parent, c, l, item, parentIndex,
            property, arrayIndex, writable;
            
        
        
        if (!isString(path)) {
            throw new Error(ERROR_PATH_INVALID);
        }
        
        // root subject should be an object
        if (!object(subject) && !isSubjectArray) {
            return false;
        }
        
        // unable to create items from path
        path = jsonParsePath(path);
        if (!path || !path.length) {
            return false;
        }
        
        parent = subject;
        parentIndex = path[0];
        
        // finalize parent index
        if (!parentIndex) {
            parentIndex = getMax(parent) + 1;
        }
        
        l = path.length -1;
        
        for (c = 0; l--;) {
            item = path[++c];
            
            // only determine if arrayIndex or not,
            //      resolve this later if it will turn into parentIndex
            arrayIndex = arrayIndexRe.test(item);
            
            // finalize property
            if (has(parent, parentIndex)) {
                property = parent[parentIndex];
                writable = iswritable(property);
                
                // recreate array into object to support "named" property
                if (writable === typeArray && !arrayIndex) {
                    property = apply({}, property);
                    delete property.length;
                    
                }
                // contain current property
                else if (!writable) {
                    property = arrayIndex ?
                        [property] : {"": property};
                }
    
            }
            // error! unable to replace root object
            else if (isSubjectArray && parent === subject && !arrayIndex) {
                throw new Error(ERROR_NATIVE_OBJECT);
            }
            // populate
            else {
                property = arrayIndex ? [] : {};
            }
            
            parent = parent[parentIndex] = property;
            parentIndex = item;
            
            // resolve empty parentIndex
            if (!item) {
                parentIndex = getMax(parent) + 1;
            }
            
        }
        
        // if not overwrite, then fill-in value in array or object
        //if (overwrite !== true && has(parent, parentIndex)) {
        //    property = parent[parentIndex];
        //    
        //    // append
        //    if (T.array(property)) {
        //        parent = property;
        //        parentIndex = parent.length;
        //    }
        //    else {
        //        parent = parent[parentIndex] = [property];
        //        parentIndex = 1;
        //    }
        //}
        
        parent[parentIndex] = value;
        
        return true;
        
    }
    
function jsonExists(path, subject) {
        var operation = [subject, false];
        
        jsonEach(path, existsCallback, operation);
        operation[0] = null;
        
        return operation[1];
    }
    
//export {
//    parsePath as jsonParsePath,
//    find as jsonFind,
//    compare as jsonCompare,
//    clone as jsonClone,
//    eachPath as jsonEach,
//    assign as jsonSet,
//    remove as jsonUnset,
//    fill as jsonFill,
//    exists as jsonExists
//}

var ERROR_NAME = 'Invalid [name] parameter.';
var ERROR_PATH = 'Invalid [path] parameter.';

function create() {
    return new Registry();
}

function isIndex(name) {
    switch (isSignature(name)) {
    case STRING_SIGNATURE:
    case NUMBER_SIGNATURE: return true;
    }
    return false;
}

function Registry() {
    this.data = {};
}

Registry.prototype = {
    constructor: Registry,
    
    onApply: function (value) {
        assign(this.data, value, true);
    },
    
    onSet: function (name, value) {
        this.data[name] = value;
    },
    
    get: function (name) {
        var list = this.data;
        
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        if (contains(list, name)) {
            return list[name];
        }
        
        return void(0);
    },
    
    set: function (name, value) {
        switch (isSignature(name)) {
        case OBJECT_SIGNATURE:
        case ARRAY_SIGNATURE:
            this.onApply(name);
            break;
        
        case STRING_SIGNATURE:
        case NUMBER_SIGNATURE:
            this.onSet(name, value);
            break;
            
        default:
            throw new Error(ERROR_NAME);
        }
        
        return this;
    },
    
    unset: function (name) {
        var list = this.data;
        
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        if (contains(list, name)) {
            delete list[name];
        }
        
        return this;
    },
    
    find: function (path) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return jsonFind(path, this.data);
    },
    
    insert: function (path, value) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        jsonFill(path, this.data, value, true);
        
        return this;
    
    },
    
    remove: function (path) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        jsonUnset(path, this.data);
        
        return this;
    },
    
    exists: function (name) {
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        return contains(this.data, name);
    },
    
    pathExists: function (path) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return jsonExists(path, this.data);
    },
    
    assign: function(value) {
        switch (isSignature(value)) {
        case OBJECT_SIGNATURE:
        case ARRAY_SIGNATURE:
            this.onApply(value);
            return this;
        
        default:
            throw new Error("Invalid [value] parameter");
        }
        
    },
    
    clear: function () {
        clear(this.data);
        return this;
    },
    
    clone: function () {
        var list = this.data;
        return clone(list, true);
    }
    
};

var slice = Array.prototype.slice;
var G$1 = global$1$1;
var ERROR_ITERABLE = 'Invalid [iterable] parameter.';
var INDEX_STATUS = 0;
var INDEX_DATA = 1;
var INDEX_PENDING = 2;

function createPromise(instance) {
    var Class = Promise;
    
    if (!(instance instanceof Class)) {
        instance = instantiate(Class);
    }
    
    instance.__state = [null,
                        void(0),
                        [],
                        null,
                        null];
    return instance;
}

function resolveValue(data, callback) {
    function resolve(data) {
        try {
            callback(true, data);
        }
        catch (error) {
            callback(false, error);
        }
    }
    
    if (isThenable(data)) {
        data.then(resolve,
                  function (error) {
                        callback(false, error);
                    });
    }
    else {
        resolve(data);
    }
}

function finalizeValue(promise, success, data) {
    var state = promise.__state,
        list = state[INDEX_PENDING];
        
    state[INDEX_STATUS] = success;
    state[INDEX_DATA] = data;
    
    // notify callbacks
    for (; list.length; ) {
        list[0](success, data);
        list.splice(0, 1);
    }
}

function Promise(resolver) {
    var finalized = false;
    var instance;
    
    function onFinalize(success, data) {
        finalizeValue(instance, success, data);
    }
    
    function resolve(data) {
        if (!finalized) {
            finalized = true;
            resolveValue(data, onFinalize);
        }
    }
    
    function reject(error) {
        if (!finalized) {
            finalized = true;
            onFinalize(false, error);
        }
    }
    
    if (!isFunction(resolver)) {
        throw new Error('Promise resolver is not a function.');
    }
    
    instance = createPromise(this);
    
    try {
        resolver(resolve, reject);
    }
    catch (error) {
        reject(error);
    }
    
    return instance;
}

function resolve(data) {
    return new Promise(function (resolve) {
        resolve(data);
    });
}

function reject(reason) {
    return new Promise(function () {
        arguments[1](reason);
    });
}

function all(iterable$$1) {
    var total;
    
    function resolver(resolve, reject) {
        var list = iterable$$1,
            remaining = total,
            stopped = false,
            l = remaining,
            c = 0,
            result = [];

        function process(index, item) {
            function finalize(success, data) {
                var found = result;
                
                if (stopped) { return; }
                
                if (!success) {
                    reject(data);
                    stopped = true;
                    return;
                }
                
                found[index] = data;
                
                if (!--remaining) {
                    resolve(found);
                }
            }
            resolveValue(item, finalize);
        }
        
        for (result.length = l; l--; c++) {
            process(c, list[c]);
        }
    }
    
    if (!isIterable(iterable$$1)) {
        throw new TypeError(ERROR_ITERABLE);
    }
    
    iterable$$1 = slice.call(iterable$$1, 0);
    total = iterable$$1.length;
    
    if (!total) {
        return resolve([]);
    }
    
    return new Promise(resolver);
}

function race(iterable$$1) {
    function resolver(resolve, reject) {
        var stopped = false,
            tryResolve = resolveValue,
            list = iterable$$1,
            c = -1,
            l = list.length;
        
        function onFulfill(success, data) {
            if (!stopped) {
                stopped = true;
                (success ? resolve : reject)(data);
            }
        }
        
        for (; l--;) {
            tryResolve(list[++c], onFulfill);
        }
    }
    
    if (!isIterable(iterable$$1)) {
        throw new TypeError(ERROR_ITERABLE);
    }
    
    iterable$$1 = slice.call(iterable$$1, 0);
    
    return new Promise(resolver);
}

Promise.prototype = {
    constructor: Promise,
    then: function (onFulfill, onReject) {
        var me = this,
            state = me.__state,
            success = state[INDEX_STATUS],
            list = state[INDEX_PENDING],
            instance = createPromise();
            
        function run$$1(success, data) {
            var finalize = finalizeValue,
                handle = success ? onFulfill : onReject;
            
            if (isFunction(handle)) {
                try {
                    data = handle(data);
                    resolveValue(data,
                                function (success, data) {
                                    finalize(instance,
                                             success,
                                             data);
                                });
                    return;
                }
                catch (error) {
                    data = error;
                    success = false;
                }
            }
            finalize(instance, success, data);
        }
        
        if (success === null) {
            list[list.length] = run$$1;
        }
        else {
            setAsync(function () {
                run$$1(success, state[INDEX_DATA]);
            });
        }
        
        return instance;
    },
    
    "catch": function (onReject) {
        return this.then(null, onReject);
    }
};

// static methods
assign(Promise, {
    all: all,
    race: race,
    reject: reject,
    resolve: resolve
});

// Polyfill if promise is not supported
if (!isFunction(G$1.Promise)) {
    G$1.Promise = Promise;
}

G$1 = null;

var env = DETECT;





var BUNDLE$1 = Object.freeze({
	env: env,
	createRegistry: create,
	Promise: Promise,
	each: EACH,
	assign: assign,
	rehash: rehash,
	contains: contains,
	instantiate: instantiate,
	clone: clone,
	compare: compare,
	fillin: fillin,
	clear: clear,
	maxObjectIndex: maxObjectIndex,
	setModuleChain: setModuleChain,
	run: run,
	register: set,
	middleware: middlewareNamespace,
	setAsync: setAsync,
	clearAsync: clearAsync,
	object: object,
	OBJECT: OBJECT_SIGNATURE,
	ARRAY: ARRAY_SIGNATURE,
	NULL: NULL_SIGNATURE,
	UNDEFINED: UNDEFINED_SIGNATURE,
	NUMBER: NUMBER_SIGNATURE,
	STRING: STRING_SIGNATURE,
	BOOLEAN: BOOLEAN_SIGNATURE,
	METHOD: METHOD_SIGNATURE,
	FUNCTION: METHOD_SIGNATURE,
	DATE: DATE_SIGNATURE,
	REGEX: REGEX_SIGNATURE,
	signature: isSignature,
	nativeObject: isNativeObject,
	string: isString,
	number: isNumber,
	scalar: isScalar,
	array: isArray,
	method: isFunction,
	date: isDate,
	regex: isRegExp,
	type: isType,
	thenable: isThenable,
	iterable: isIterable,
	unionList: union,
	intersectList: intersect,
	differenceList: difference,
	camelize: camelize,
	uncamelize: uncamelize,
	encode64: base64Encode,
	decode64: base64Decode,
	utf2bin: utf16ToUtf8,
	bin2utf: utf8ToUtf16,
	jsonParsePath: jsonParsePath,
	jsonFind: jsonFind,
	jsonCompare: jsonCompare,
	jsonClone: jsonClone,
	jsonEach: jsonEach,
	jsonSet: jsonSet,
	jsonUnset: jsonUnset,
	jsonFill: jsonFill,
	jsonExists: jsonExists
});

setModuleChain(BUNDLE$1);

var ROOT$1 = global$1;
var browser$1 = env.browser;
var ieVersion = 0;
var exported$3 = false;

var match;
var ieVersion;

if (browser$1) {
  match = env.userAgent.match(/msie ([0-9]+\.[0-9]+)/i);

  exported$3 = {
    strict: ROOT$1.document.compatMode === 'CSS1Compat',
    ieVersion: match && parseInt(match[1], 10) || 0,
    ie8: ieVersion === 8
  };

}

ROOT$1 = null;

var browser$2 = exported$3;

var WINDOW = global$1;
var exported$4 = false;

if (browser$2) {
  exported$4 = {
    w3c: !!WINDOW.addEventListener,
    ie: !!WINDOW.attachEvent,
    customEvent: !!WINDOW.CustomEvent
  };
}

WINDOW = null;

var domEvent = exported$4;

var WINDOW$1 = global$1;
var exported$5 = false;
var DOCUMENT;
var ROOT$2;

if (browser$2) {
  DOCUMENT = WINDOW$1.document;
  ROOT$2 = DOCUMENT.documentElement;
  exported$5 = {
    compare: !!ROOT$2.compareDocumentPosition,
    contains: !!ROOT$2.contains,
    defaultView: DOCUMENT.defaultView ?
                    'defaultView' :
                    DOCUMENT.parentWindow ?
                        'parentWindow' : null,
    querySelectorAll: !!DOCUMENT.querySelectorAll,
    listToArray: ROOT$2.childNodes instanceof Object
  };

}

DOCUMENT = ROOT$2 = null;

var dom = exported$5;

var WINDOW$2 = global$1;
var exported$6 = false;
var DOC;
var DIV;
var STYLE;
var name;
var color;

function detectAlphaColor(style) {
    var rgba = 'rgba(0,0,0,0.5)';

    try {
        style.color = rgba;
        color = style.color;

        if (isString(color)) {
            color = color.replace(/[ \r\n\t\s]+/g, '').toLowerCase();
        }

        if (rgba === color) {
            return true;
        }
    }
    catch (e) {}

    return false;
}

function detectTransition(style) {
    var supports = ['OTransition',
                            'webkitTransition',
                            'MozTransition',
                            'transition'],
        l = supports.length;

    for (l = supports.length; l--;) {
        name = supports[l];
        if (typeof style[name] !== 'undefined') {
            return name;
        }
    }
    return false;
}


if (browser$2) {
  DOC = WINDOW$2.document;
  DIV = DOC.createElement('div');
  STYLE = DIV.style;

  exported$6 = {
    w3cStyle: !!WINDOW$2.getComputedStyle,
    ieStyle: !!DOC.documentElement.currentStyle,
    setattribute: !!STYLE.setAttribute,
    setproperty: !!STYLE.setProperty,
    opacity: typeof STYLE.opacity !== 'undefined',
    filterOpacity: typeof STYLE.filter !== 'undefined',
    alphaColor: detectAlphaColor(STYLE),
    transition: detectTransition(STYLE)
  };

}

WINDOW$2 = DOC = DIV = STYLE = null;

var css = exported$6;

var WINDOW$3 = global$1;
var exported$7 = false;
var ieVersion$1;

if (browser$2) {
  ieVersion$1 = browser$2.ieVersion;
  exported$7 = {
    screensize: typeof WINDOW$3.innerWidth !== 'undefined',
    pagescroll: typeof WINDOW$3.pageXOffset !== 'undefined',
    rectmethod: !!WINDOW$3.document.documentElement.getBoundingClientRect,
    zoomfactor: ieVersion$1 > 0 && ieVersion$1 < 8,
    ie8: ieVersion$1 === 8
  };

}

WINDOW$3 = null;

var dimension = exported$7;

var exported$8 = false;
var DOCUMENT$1;
var ROOTSTYLE;
var UNDEFINED;

if (browser$2) {
  DOCUMENT$1 = global$1.document;
  ROOTSTYLE = DOCUMENT$1.documentElement.style;
  UNDEFINED = 'undefined';

  exported$8 = {
    range: !!DOCUMENT$1.createRange,
    textrange: !!DOCUMENT$1.createElement('input').createTextRange,
    cssUnselectable: typeof ROOTSTYLE.MozUserSelect !== UNDEFINED ?
                        'MozUserSelect' :
                        typeof ROOTSTYLE.webkitUserSelect !== UNDEFINED ?
                            'webkitUserSelect' : false
  };

}

DOCUMENT$1 = ROOTSTYLE = null;

var selection = exported$8;

var exported$2 = false;

if (browser$2) {
    exported$2 = {
      browser: browser$2,
      event: domEvent,
      dom: dom,
      css: css,
      dimension: dimension,
      selection: selection
    };
}

var DETECTED = exported$2;

var SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/;
var STYLIZE_RE = /^([Mm]oz|[Ww]ebkit|[Mm]s|[oO])[A-Z]/;
var HTML_ESCAPE_CHARS_RE = /[^\u0021-\u007e]|[\u003e\u003c\&\"\']/g;
var TEXTAREA = null;
var exported$9 = {
        camelize: camelize,
        stylize: stylize,
        addWord: addWord,
        removeWord: removeWord,
        
        xmlEncode: xmlEncode,
        xmlDecode: xmlDecode,
        
        1001: "Invalid [name] parameter.",
        1011: "Invalid [handler] parameter.",
    
        1101: "Invalid DOM [element] parameter.",
        1102: "Invalid [dom] Object parameter.",
        1103: "Invalid DOM [node] parameter.",
        1104: "Invalid DOM [document] parameter.",
        
        1111: "Invalid CSS [selector] parameter.",
        1112: "Invalid tree traverse [callback] parameter.",
        
        1121: "Invalid DOM Element [config] parameter.",
        
        1131: "Invalid [observable] parameter.",
        1132: "Invalid Event [type] parameter.",
        1133: "Invalid Event [handler] parameter.",
        
        
        1141: "Invalid [style] Rule parameter.",
        //1142: "Invalid Colorset [type] parameter.",
        //1143: "Invalid [colorValue] integer parameter.",
        
        1151: "Invalid Animation [callback] parameter.",
        1152: "Invalid Animation [displacements] parameter.",
        1153: "Invalid Animation [type] parameter.",
        1154: "Invalid Animation [duration] parameter.",
        
        2001: "Style Attribute manipulation is not supported",
        2002: "Computed style is not supported by this browser.",
        2003 : "CSS Selector query form DOM is not supported.",
        2004: "DOM position comparison is not supported.",
        2005: "DOM selection not supported.",
        2006: "CSS Opacity is not supported by this browser"

    };


    
function htmlescapeCallback(chr) {
    var code = chr.charCodeAt(0).toString(16);
    var value;
    switch (code) {
    case '26': value = 'amp';
        break;
    case '22': value = 'quot';
        break;
    case '27': value = 'apos';
        break;
    case '3C':
    case '3c': value = 'lt';
        break;
    case '3E':
    case '3e': value = 'gt';
        break;
    default:
        value = '#x' + code;
    }
    return '&' + value + ';';
}


function initialize() {
    if (DETECTED) {
        TEXTAREA = global$1.document.createElement('textarea');
        // register destructor
        set("libdom.event.global-destroy", onDestroy);
    }
}

function onDestroy() {
    TEXTAREA = null;
}

function stylize(str) {
        str = camelize(str);
        return STYLIZE_RE.test(str) ?
                    str.charAt(0).toUpperCase() + str.substring(1, str.length) :
                    str;
    }

function addWord(str, items) {
        var isString$$1 = isString,
            c = -1,
            l = items.length;
        var cl, name;
        
        str = str.split(SEPARATE_RE);
        cl = str.length;
        for (; l--;) {
            name = items[++c];
            if (isString$$1(name) && str.indexOf(name) === -1) {
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

function xmlDecode(subject) {
        var textarea = TEXTAREA;
        var value = '';
        if (textarea) {
            textarea.innerHTML = subject;
            value = textarea.value;
        }
        textarea = null;
        return value;
    }
    
function xmlEncode(subject) {
        return subject.replace(HTML_ESCAPE_CHARS_RE, htmlescapeCallback);
    }


initialize();

var MAIN = null;

function use(chain) {
        MAIN = chain;
    }
    
function get$1() {
        return MAIN;
    }

var EVENTS = null;
var PAGE_UNLOADED = false;
var MIDDLEWARE = middlewareNamespace('libdom.event');
var IE_CUSTOM_EVENTS = {};
var ERROR_OBSERVABLE_NO_SUPPORT = exported$9[1131];
var ERROR_INVALID_TYPE = exported$9[1132];
var ERROR_INVALID_HANDLER = exported$9[1133];
var IE_ON = 'on';
var IE_BUBBLE_EVENT = 'beforeupdate';
var IE_NO_BUBBLE_EVENT = 'propertychange';
var exported$10 = {
                on: listen,
                un: unlisten,
                fire: dispatch,
                purge: purge,
                ondestroy: addDestructor
            };

var RESOLVE;
var LISTEN;
var UNLISTEN;
var DISPATCH;
var EVENT_INFO;
var IS_CAPABLE;
var SUBJECT;

function listen(observable, type, handler, context) {
    var last = EVENTS;
    var current, args;

    if (!isString(type)) {
        throw new Error(ERROR_INVALID_TYPE);
    }

    if (!isFunction(handler)) {
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

    if (!isString(type)) {
        throw new Error(ERROR_INVALID_TYPE);
    }

    if (!isFunction(handler)) {
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

    return get$1();
}


function dispatch(observable, type, defaults) {

    if (!isString(type)) {
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

    return get$1();
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
        event = global$1.document.createEvent("Event");
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
    var isFunction$$1 = isFunction;

    return observable && typeof observable === 'object' &&
            isFunction$$1(observable.addEventListener) &&
            isFunction$$1(observable.removeEventListener) &&
            isFunction$$1(observable.dispatchEvent) ?
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
        event = global$1.document.createEventObject();
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
        var event = global$1.event;
        iePolyfillEvent(event);
        MIDDLEWARE.run('dispatch', [event.type, event]);
        return handler.call(context, event);
    }
    return onEvent;
}

function ieCreateCustomHandler(type, handler, context) {
    function onEvent() {
        var event = global$1.event;
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
    if (isFunction(handler)) {
        MIDDLEWARE.register('global-destroy', handler);
    }
    return get$1();
}


RESOLVE = LISTEN = UNLISTEN = DISPATCH = null;

/**
 * Initialize
 */
EVENT_INFO = DETECTED && DETECTED.event;

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
        SUBJECT = global$1;

        // register destructors
        listen(SUBJECT, 'beforeunload', onBeforeUnload);
        listen(SUBJECT, 'unload', onBeforeUnload);
        SUBJECT = null;
    }
}

var ORDER_TYPE_PREORDER = 1;
var ORDER_TYPE_POSTORDER = 2;
var ORDER_TYPE_LEVELORDER = 3;
var CSS_SELECT = notSupportedQuerySelector;
var ERROR_INVALID_DOM = exported$9[1101];
var ERROR_INVALID_DOM_NODE = exported$9[1103];
var ERROR_INVALID_CSS_SELECTOR = exported$9[1111];
var ERROR_INVALID_CALLBACK = exported$9[1112];
var ERROR_INVALID_ELEMENT_CONFIG = exported$9[1121];
var INVALID_DESCENDANT_NODE_TYPES = { 9:1, 11:1 };
var STD_CONTAINS = notSupportedContains;
var DOM_ATTRIBUTE_RE = /(^\_|[^a-zA-Z\_])/;
var DOM_ATTRIBUTE_LIST = [
        'nodeType',
        'nodeValue',
        'ownerDocument',
        'tagName',
        'attributes',
        'parentNode',
        'childNodes',
        'firstChild',
        'lastChild',
        'previousSibling',
        'nextSibling',
        'sourceIndex',
        'type'
    ];
var EVENT_ATTRIBUTE_RE = /^on(\-?[a-zA-Z].+)?$/;
var MANIPULATION_HELPERS = create();

var DOM_INFO;



/**
 * node contains...
 */


function notSupportedContains() {
    throw new Error(exported$9[2004]);
}

function w3cContains(ancestor, descendant) {
    return (ancestor.compareDocumentPosition(descendant) & 16) > 0;
}

function ieContains(ancestor, descendant) {
    return ancestor.contains(descendant);
}

/**
 * DOM Manipulation helper
 */
function registerDomHelper(name, handler) {
    if (!isString(name)) {
        throw new Error(exported$9[1001]);
    }

    if (!isFunction(handler)) {
        throw new Error(exported$9[1011]);
    }

    MANIPULATION_HELPERS.set(name, handler);

    return get$1();
}

function purgeEventsFrom(element) {
    exported$10.purge(element);
}



function getTagNameFromConfig(config) {
    if (object(config)) {
        config = 'tagName' in config ?
                    config.tagName :
                    'nodeName' in config ?
                        config.nodeName :
                        'tag' in config ?
                            config.tag : false;
    }

    return isString(config) ? config : false;
}


function applyAttributeToElement(value, name) {
    /* jshint validthis:true */
    var element = this,
        helper = MANIPULATION_HELPERS;
    var listen$$1;

    // rename attributes
    switch (name) {
    case 'class':
        name = 'className';
        break;

    case 'for':
        name = 'htmlFor';
        break;
    }

    if (EVENT_ATTRIBUTE_RE.test(name)) {
        listen$$1 = name.substring(name.charAt(2) === '-' ? 3 : 2, name.length);

        if (listen$$1 === 'on' && object(value)) {
            EACH(value, applyEventAttribute, element);
        }
        else {
            applyEventAttribute.call(element, value, listen$$1);
        }
    }
    else if (helper.exists(name)) {
        helper.get(name)(element, value);
    }
    else if (DOM_ATTRIBUTE_RE.test(name) ||
            DOM_ATTRIBUTE_LIST.indexOf(name) !== -1) {
        element.setAttribute(name, value);
    }
    else {
        element[name] = value;
    }

    element = null;

}

function applyEventAttribute(handler, name) {
    /* jshint validthis:true */
    var element = this;

    if (isFunction(handler)) {
        exported$10.on(element, name, handler);
    }

    element = null;
}

function applyConfigToElement(element, config, usedFragment) {
    var hasOwn = contains,
        isObject= object,
        me = applyConfigToElement,
        resolveTagName = getTagNameFromConfig,
        applyAttribute = applyAttributeToElement,
        htmlEncodeChild = false,
        childNodes = null;

    var name, value, item, c, l, fragment, doc, created;

    if (isObject(config)) {
        childNodes = null;

        // apply attributes
        main: for (name in config) {
            if (hasOwn(config, name)) {
                value = config[name];

                // apply non-attributes if found
                switch (name) {
                case 'tagName':
                case 'nodeName':
                case 'tag':
                    continue main;

                case 'text':
                case 'childText':
                case 'innerText':
                    htmlEncodeChild = true;

                /* falls through */
                case 'childNodes':
                case 'innerHTML':
                case 'html':
                    childNodes = value;
                    continue main;

                case 'attributes':
                    if (isObject(value)) {
                        EACH(value, applyAttribute, element);
                    }
                    continue;
                }

                applyAttribute.call(element, value, name);

            }
        }

        // apply childNodes
        if (isString(childNodes)) {

            // convert
            if (htmlEncodeChild) {
                childNodes = exported$9.xmlEncode(childNodes);
            }

            element.innerHTML = childNodes;
        }

        // fragment
        else if (!htmlEncodeChild) {

            if (isObject(childNodes)) {
                childNodes = [childNodes];
            }

            if (isArray(childNodes)) {
                doc = element.ownerDocument;
                fragment = usedFragment === true ?
                                element :
                                doc.createDocumentFragment();

                for (c = -1, l = childNodes.length; l--;) {
                    item = childNodes[++c];

                    if (isObject(item)) {
                        created = doc.createElement(
                                        resolveTagName(item) || 'div');
                        // configure
                        me(created, item, true);
                        fragment.appendChild(created);
                    }
                }

                if (fragment !== element) {
                    element.appendChild(fragment);
                }

                doc = fragment = created = null;
            }
        }
        item = null;
    }
}

function findChild(element, node, nodeType) {
    var isNumber$$1 = isNumber;
    var index, counter, any;

    if (isDom(node, 1, 3, 4, 7, 8) && node.parentNode === element) {
        return node;
    }
    else if (isNumber$$1(node) && node > -1) {
        index = node;
        counter = -1;
        any = !isNumber$$1(nodeType);
        node = element.firstChild;
        for (; node; node = node.nextSibling) {
            if (any || nodeType === node.nodeType) {
                counter++;
            }
            if (counter === index) {
                return node;
            }
        }
    }
    return null;
}

/**
 * DOM select
 */
function noArrayQuerySelectorAll(dom, selector) {
    var list, c, l, result;

    if (!isDom(dom, 9, 1)) {
        throw new Error(ERROR_INVALID_DOM_NODE);
    }

    if (!isString(selector)) {
        throw new Error(ERROR_INVALID_CSS_SELECTOR);
    }

    list = dom.querySelectorAll(selector);
    c = -1;
    (result = []).length = l = list.length;

    for (; l--;) {
        result[++c] = list[c];
    }
    list = null;
    return result;
}

function toArrayQuerySelectorAll(dom, selector) {
    if (!isDom(dom, 9, 1)) {
        throw new Error(ERROR_INVALID_DOM_NODE);
    }

    if (!isString(selector)) {
        throw new Error(ERROR_INVALID_CSS_SELECTOR);
    }

    return Array.prototype.slice.call(dom.querySelectorAll(selector));
}

function notSupportedQuerySelector() {
    throw new Error(exported$9[2003]);
}

function orderTraverse(element, callback, context, orderType, includeRoot) {
    var depth = 0,
        isPostOrder = 0;
    var queue, last, node, current;

    if (!isDom(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }

    if (!isFunction(callback)) {
        throw new Error(ERROR_INVALID_CALLBACK);
    }

    if (typeof context === 'undefined') {
        context = null;
    }

    includeRoot = includeRoot !== false;

    switch (orderType) {
    case ORDER_TYPE_LEVELORDER:

        queue = last = {
                    node: element,
                    next: null
                };

        for (; queue; queue = queue.next) {

            node = queue.node;
            queue.node = null;

            // iterate siblings
            for (; node; node = node.nextSibling) {

                current = node.firstChild;
                if ((includeRoot || 0 !== depth) &&
                    callback.call(context, current) === false) {
                    break;
                }

                // insert
                if (current) {
                    depth++;
                    last.next = { node: current, next: null };
                    last = last.next;
                }
            }
        }
        break;
    case ORDER_TYPE_POSTORDER:
        isPostOrder = 1;

    /* falls through */
    case ORDER_TYPE_PREORDER:

        main: for (current = element; current;) {

            // process pre-order
            if ((includeRoot || 0 !== depth) &&
                !isPostOrder && current.nodeType === 1 &&
                callback.call(context, current) === false) {
                break;
            }

            // go into first child
            node = current.firstChild;

            if (node) {
                depth++;
            }
            // go next sibling or parentNode's nextSibling
            else {
                // process post-order
                if ((includeRoot || 0 !== depth) &&
                    isPostOrder && current.nodeType === 1 &&
                    callback.call(context, current) === false) {
                    break;
                }

                node = current.nextSibling;

                for (; !node && depth-- && current;) {
                    current = current.parentNode;

                    // process post-order
                    if ((includeRoot || 0 !== depth) &&
                        isPostOrder && current.nodeType === 1 &&
                        callback.call(context, current) === false) {
                        break main;
                    }

                    node = current.nextSibling;
                }
            }
            current = node;
        }
    }

    last = queue = node = current = null;


    return get$1();
}

/**
 * is node
 */
function isDom(node) {
        var isNumber$$1 = isNumber;

        var type, c, len, items, match, matched;

        if (node && typeof node === 'object') {

            type = node.nodeType;

            if (isNumber$$1(type)) {

                items = arguments;
                len = Math.max(items.length - 1, 0);
                matched = !len;

                for (c = 0; len--;) {
                    match = items[++c];
                    if (type === match) {
                        return true;
                    }
                }

                return matched;
            }
        }

        return false;
    }

function isDefaultView(defaultView) {
        var type = typeof defaultView;

        return !!defaultView &&
                (type === 'object' || type === 'function') &&
                defaultView.self === defaultView.window &&
                !!defaultView.document;
    }

function contains$1(ancestor, descendant) {
        var elementErrorString = exported$9[1102],
            is = isDom;

        if (!is(ancestor, 1, 9, 11)) {
            throw new Error(elementErrorString);
        }

        if (!is(descendant) ||
            (descendant.nodeType in INVALID_DESCENDANT_NODE_TYPES)) {
            throw new Error(elementErrorString);
        }

        switch (ancestor.nodeType) {
        case 9:
            ancestor = ancestor.documentElement;
            break;
        case 11:
            ancestor = ancestor.firstChild;
            break;
        }

        return STD_CONTAINS(ancestor, descendant);

    }

/**
 * DOM manipulaton
 */
function add(element, config, before) {
        var toInsert = null,
            invalidConfig = ERROR_INVALID_ELEMENT_CONFIG,
            is = isDom;
        var tagName;

        if (!isDom(element, 1, 11)) {
            throw new Error(ERROR_INVALID_DOM);
        }

        if (is(config)) {
            toInsert = config;
        }
        else if (object(config)) {
            tagName = getTagNameFromConfig(config);
            if (!tagName) {
                throw new Error(invalidConfig);
            }
            toInsert = element.ownerDocument.createElement(tagName);
            applyConfigToElement(toInsert, config);
        }

        if (!is(toInsert, 1, 3, 4, 7, 8, 11)) {
            throw new Error(invalidConfig);
        }

        element.insertBefore(toInsert, findChild(element, before));

        return toInsert;

    }

function remove(node, destroy) {
        var parentNode;
        if (!isDom(node, 1, 3, 4, 7, 8)) {
            throw new Error(ERROR_INVALID_DOM_NODE);
        }

        // unset child events by default
        if (node.nodeType === 1 && destroy !== false) {
            postOrderTraverse(node, purgeEventsFrom);
        }

        parentNode = node.parentNode;
        if (parentNode) {
            parentNode.removeChild(node);
        }
        parentNode = null;
        return node;
    }

function move(nodes, element) {
        var is = isDom,
            invalidDom = ERROR_INVALID_DOM_NODE,
            created = false;
        var c, l, fragment, newChild;

        if (!is(element, 1)) {
            throw new Error(ERROR_INVALID_DOM);
        }

        if (is(nodes, 1, 3, 4, 7, 8)) {
            nodes = [nodes];
            created = true;
        }

        if (!isArray(nodes)) {
            throw new Error(invalidDom);
        }

        fragment = element.ownerDocument.createDocumentFragment();
        for (c = -1, l = nodes.length; l--;) {
            newChild = nodes[++c];
            if (is(newChild, 1, 3, 4, 7, 8)) {
                fragment.appendChild(newChild);
            }
        }
        element.appendChild(fragment);

        newChild = null;

        if (created) {
            nodes.splice(0, nodes.length);
        }

        fragment = null;

        return element;
    }

function replace(node, config, destroy) {
        var toInsert = null,
            invalidConfig = ERROR_INVALID_ELEMENT_CONFIG,
            is = isDom;
        var tagName;

        if (!is(node, 1, 3, 4, 7, 8) || !node.parentNode) {
            throw new Error(ERROR_INVALID_DOM_NODE);
        }

        if (is(config)) {
            toInsert = config;
        }
        else if (object(config)) {
            tagName = getTagNameFromConfig(config);
            if (!tagName) {
                throw new Error(invalidConfig);
            }
            toInsert = node.ownerDocument.createElement(tagName);
            applyConfigToElement(toInsert, config);
        }

        if (!is(toInsert, 1, 3, 4, 7, 8)) {
            throw new Error(invalidConfig);
        }

        // remove events before replacing it only if mandated
        if (destroy === true && node.nodeType === 1) {
            postOrderTraverse(node, purgeEventsFrom);
        }

        node.parentNode.replaceChild(toInsert, node);

        return toInsert;
    }

function find(element, node) {
        if (!isDom(element, 1, 11)) {
            throw new Error(ERROR_INVALID_DOM);
        }
        return findChild(element, node, 1);
    }

/**
 * DOM Tree walk
 */
function eachPreorder(element, callback, context, includeRoot) {

        return orderTraverse(element,
                            callback,
                            context,
                            ORDER_TYPE_PREORDER,
                            includeRoot !== false);
    }

function eachPostorder(element, callback, context, includeRoot) {

        return orderTraverse(element,
                            callback,
                            context,
                            ORDER_TYPE_POSTORDER,
                            includeRoot !== false);
    }

function eachLevel(element, callback, context, includeRoot) {

        return orderTraverse(element,
                            callback,
                            context,
                            ORDER_TYPE_LEVELORDER,
                            includeRoot !== false);
    }

/**
 * Initialize
 */

DOM_INFO = DETECTED && DETECTED.dom;
if (DOM_INFO) {
    STD_CONTAINS = DOM_INFO.compare ?
                            w3cContains :
                            DOM_INFO.contains ?
                                ieContains :
                                notSupportedContains;

    if (DOM_INFO.querySelectorAll) {
        CSS_SELECT = DOM_INFO.listToArray ?
                            toArrayQuerySelectorAll :
                            noArrayQuerySelectorAll;
    }
}

var DOM = {
            contains: contains$1,
            is: isDom,
            isView: isDefaultView,
            eachPreorder: eachPreorder,
            eachPostorder: eachPostorder,
            eachLevel: eachLevel,
            documentViewAccess: 'defaultView',
            select: CSS_SELECT,

            helper: registerDomHelper,

            add: add,
            replace: replace,
            move: move,
            remove: remove,
            find: find
        };

var NUMBER$1 = 1;
var HEX = 2;
var PERCENT$1 = 3;
var HAS_UNIT_RE = /\%$/;

function format(value, colorFormat) {
    
    switch (colorFormat) {
    case HEX:
        return parseInt(value, 16) || 0;
    
    case NUMBER$1:
        value = 1 * value;
        return value || 0;

    case PERCENT$1:
        value = HAS_UNIT_RE.test(value) ?
                    1 * value.substring(0, value.length -1) :
                    1 * value;

        return Math.round((value || 1) * 100);
    }
    return 0;
}

var format$1 = {
                NUMBER: NUMBER$1,
                HEX: HEX,
                PERCENT: PERCENT$1,
                format: format
            };

var BYTE = 255;
var BYTE_PERCENT = 127;
var BYTE_HUE = 511;
var PERCENT = 100;
var HUE = 360;
var SATURATION = PERCENT;
var LUMINOSITY = PERCENT;

// from: https://gist.github.com/mjackson/5311256
function hue2rgb(p, q, t) {
    t = (t + 1) % 1;
    switch (true) {
    case t < 1/6: return p + (q - p) * 6 * t;
    case t < 1/2: return q;
    case t < 2/3: return p + (q - p) * (2/3 - t) * 6;
    }
    return p;
}

function itemize(value, index, colorFormat) {
        var M = Math,
            F = format$1,
            isFloat = index > 2 && colorFormat !== F.PERCENT,
            min = 0,
            max = index < 3 ?
                    BYTE : PERCENT;
            
        value = F.format(value, colorFormat);
        if (isFloat) {
            value *= 100;
        }
        
        return M.max(min, M.min(max, value));
    
    }

function toArray(integer) {
        var M = Math,
            h2r = hue2rgb,
            size = BYTE,
            psize = BYTE_PERCENT,
            h = integer & BYTE_HUE,
            s = (integer >> 9) & psize,
            l = (integer >> 16) & psize,
            a = (integer >> 23) & psize;
    
        var q, p;
        
        l /= LUMINOSITY;
       
        if (s === 0) {
            return [l, l, l];
        }
        
        h /= HUE;
        s /= SATURATION;
        
        q = l < 0.5 ?
                l * (1 + s) :
                l + s - l * s;
                
        p = 2 * l - q;
        
        return [M.round(h2r(p, q, h + 1/3) * size),
                    M.round(h2r(p, q, h) * size),
                    M.round(h2r(p, q, h - 1/3) * size),
                    (a).toFixed(2)];
    }

function toInteger(r, g, b, a) {
        var M = Math,
            size = BYTE,
            psize = BYTE_PERCENT;
    
        var max, min, h, s, l, d;
        
        r /= size;
        g /= size;
        b /= size;
        max = M.max(r, g, b);
        min = M.min(r, g, b);
        
        l = (max + min) / 2;
    
        if (max === min) {
            h = s = 0; // achromatic
        }
        else {
            d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
        
            h /= 6;
        }
        
        if (!isNumber(a)) {
            a = PERCENT;
        }
        
        return ((a & psize) << 23) |
                (((l * LUMINOSITY) & psize) << 16) |
                (((s * SATURATION) & psize) << 9) |
                ((h * HUE) & BYTE_HUE);
    }

function toString$2(integer) {
        var values = toArray(integer),
            alpha = (values[3] / PERCENT);
        values[3] = parseFloat(alpha.toFixed(2));
        return 'rgba(' + values.join(',') + ')';
    }





var rgbaColor = Object.freeze({
	itemize: itemize,
	toArray: toArray,
	toInteger: toInteger,
	toString: toString$2
});

function toHex(integer) {
        var M = Math;
        integer = M.max(0, M.min(integer, 255));
        return (integer < 16 ? '0' : '') + integer.toString(16);
    }

function toString$1(integer) {
        var convert = toHex,
            values = toArray(integer).slice(0, 3);
        
        values[0] = convert(values[0]);
        values[1] = convert(values[1]);
        values[2] = convert(values[2]);
        
        return '#' + values.join('');
    }





var hexColor = Object.freeze({
	toHex: toHex,
	toString: toString$1,
	itemize: itemize,
	toArray: toArray,
	toInteger: toInteger
});

function toString$3(integer) {
        return 'rgb(' + toArray(integer).slice(0, 3).join(',') + ')';
    }

function toInteger$1(r, g, b) {
        return toInteger(r, g, b, 100);
    }




var rgbColor = Object.freeze({
	toString: toString$3,
	toInteger: toInteger$1,
	itemize: itemize,
	toArray: toArray
});

var BYTE$1 = 255;
var BYTE_PERCENT$1 = 127;
var BYTE_HUE$1 = 511;
var HUE$1 = 360;
var PERCENT$2 = 100;

function itemize$1(value, index, colorFormat) {
        var F = format$1,
            M = Math,
            percent = PERCENT$2,
            min = 0,
            max = index < 1 ?
                    HUE$1 : percent;
        
        switch (colorFormat) {
        case F.HEX:
            value = (parseInt(value, 16) / BYTE$1) * max;
            break;
        
        case F.NUMBER:
            value = (1 * value) || 0;
            if (index > 2) {
                value *= percent;
            }
            break;
        
        case F.PERCENT:
            value = (1 * value.substring(0, value.length - 1)) || 0;
            break;
        }
        
        return M.max(min, M.min(max, value || 0));
    }

function toInteger$2(h, s, l, a) {
        var psize = BYTE_PERCENT$1;
        
        if (!isNumber(a)) {
            a = PERCENT$2;
        }
        
        return ((a & psize) << 23) |
                ((l & psize) << 16) |
                ((s & psize) << 9) |
                (h & BYTE_HUE$1);
    }

function toArray$1(integer) {
        var psize = BYTE_PERCENT$1;
        return [
            integer & BYTE_HUE$1,
            (integer >> 9) & psize,
            (integer >> 16) & psize,
            (integer >> 23) & psize];
    }

function toString$5(integer) {
        var values = toArray$1(integer);
        values[1] += '%';
        values[2] += '%';
        values[3] = (values[3] / PERCENT$2);
        return 'hsla(' + values.join(',') + ')';
    }




var hslaColor = Object.freeze({
	itemize: itemize$1,
	toInteger: toInteger$2,
	toArray: toArray$1,
	toString: toString$5
});

function toString$4(integer) {
        var values = toArray$1(integer).slice(0, 3);
        values[1] += '%';
        values[2] += '%';
        return 'hsl(' + values.join(',') + ')';
    }





var hslColor = Object.freeze({
	toString: toString$4,
	itemize: itemize$1,
	toArray: toArray$1,
	toInteger: toInteger$2
});

var ERROR_SUBJECT = 'Invalid [subject] parameter.';
var COLOR_RE$1 = /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/;
var NUMBER_RE$1 = /^[0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*$/;
var REMOVE_SPACES = /[ \r\n\t\s]+/g;
var TO_COLOR = {
        rgb: rgbColor,
        rgba: rgbaColor,
        hsl: hslColor,
        hsla: hslaColor,
        hex: hexColor
    };

function preParseValue(str) {
    if (typeof str === 'string') {
        str = str.replace(REMOVE_SPACES, '');
        if (COLOR_RE$1.test(str)) {
            return str;
        }
    }
    return null;
}

function parseColorStringType(str) {
    var list = TO_COLOR,
        m = str.match(COLOR_RE$1),
        type = m[1];

    var items, isHex, item;

    if (!contains(list, type)) {
        type = 'hex';
    }

    items = m[3];
    isHex = !items;

    // breakdown hex
    if (isHex) {
        items = m[2];

        // three digit
        if (items.length < 6) {
            item = items.charAt(2);
            items = ([items.charAt(0),
                        items.substring(0, 2),
                        items.charAt(1),
                        item,
                        item]).join('');
        }
    }
    else {
        items = items.split(',');
    }

    return [type, isHex, items];

}

function parseType(subject) {

        if (!isString(subject, true)) {
            throw new Error(ERROR_SUBJECT);
        }

        subject = preParseValue(subject);
        if (subject) {
            return parseColorStringType(subject) || null;
        }
        return null;
    }

function parse(subject) {
        var F = format$1,
            formatPercent = F.PERCENT,
            formatNumber = F.NUMBER,
            formatHex = F.HEX,
            numberRe = NUMBER_RE$1;

        var parsed, c, l, item, items, itemizer,
            processor, type, isHex, toProcess;

        if (!isString(subject, true)) {
            throw new Error(ERROR_SUBJECT);
        }

        subject = preParseValue(subject);
        parsed = subject && parseColorStringType(subject);

        if (parsed) {
            type = parsed[0];
            processor = TO_COLOR[type];
            itemizer = processor.itemize;

            toProcess = [];
            isHex = parsed[1];
            items = parsed[2];

            c = -1;
            if (isHex) {
                toProcess[3] = 100;
                l = 3;
            }
            else {
                l = items.length;
            }

            for (; l--;) {
                item = items[++c];
                if (isHex) {
                    item = items.substring(c * 2, c * 2 + 2);
                }
                else if (!numberRe.test(item)) {
                    return null;
                }

                toProcess[c] = itemizer(item,
                                        c,
                                        isHex ?
                                            formatHex :
                                            item.
                                                charAt(item.length -1) === '%' ?
                                                    formatPercent :
                                                    formatNumber);
            }

            // add type
            return processor.toInteger.apply(processor, toProcess);
        }

        return null;
    }

function stringify(colorValue, type) {
        var list = TO_COLOR;

        if (!isNumber(colorValue) || colorValue < 0) {
            throw new Error("Invalid [colorValue] parameter.");
        }

        if (arguments.length < 2) {
            type = 'hex';
        }
        else if (!isString(type)) {
            throw new Error("Invalid [type] parameter.");
        }

        if (!contains(list, type)) {
            return null;
        }

        colorValue = Math.round(colorValue);

        return list[type].toString(colorValue);
    }




var color$1 = Object.freeze({
	parseType: parseType,
	parse: parse,
	stringify: stringify,
	default: TO_COLOR
});

var PADDING_BOTTOM = 'paddingBottom';
var PADDING_TOP = 'paddingTop';
var PADDING_LEFT = 'paddingLeft';
var PADDING_RIGHT = 'paddingRight';
var OFFSET_LEFT = 'offsetLeft';
var OFFSET_TOP = 'offsetTop';
var OFFSET_WIDTH = 'offsetWidth';
var OFFSET_HEIGHT = 'offsetHeight';
var CLIENT_WIDTH = 'clientWidth';
var CLIENT_HEIGHT = 'clientHeight';
var COLOR_RE = /[Cc]olor$/;
var EM_OR_PERCENT_RE = /%|em/;
var CSS_MEASUREMENT_RE =
/^([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)(em|px|\%|pt|vh|vw|cm|ex|in|mm|pc|vmin)$/;
var WIDTH_RE = /width/i;
var NUMBER_RE = /\d/;
var BOX_RE = /(top|bottom|left|right|width|height)$/;
var DIMENSION_RE =
        /([Tt]op|[Bb]ottom|[Ll]eft|[Rr]ight|[wW]idth|[hH]eight|Size|Radius)$/;
var IE_ALPHA_OPACITY_RE = /\(opacity\=([0-9]+)\)/i;
var IE_ALPHA_OPACITY_TEMPLATE = 'alpha(opacity=$opacity)';
var IE_ALPHA_OPACITY_TEMPLATE_RE = /\$opacity/;
var GET_OPACITY = opacityNotSupported;
var SET_OPACITY = opacityNotSupported;
var SET_STYLE = styleManipulationNotSupported;
var GET_STYLE = styleManipulationNotSupported;
var ERROR_INVALID_DOM$1 = exported$9[1101];
var exported$11 = {
        add: addClass,
        remove: removeClass,
        computedStyle: computedStyleNotSupported,
        style: setStyle,
        currentStyle: getStyle,
        unitValue: getCSSUnitValue,
        styleOpacity: opacityNotSupported,
        colorUnit: 'hex',
        boxRe: BOX_RE,
        dimensionRe: DIMENSION_RE,

        colorRe: COLOR_RE
    };
var SLICE = Array.prototype.slice;

var CSS_INFO;



function addClass(element, classNames) {
    var isString$$1 = isString;

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    if (isString$$1(classNames)) {
        classNames = [classNames];
    }

    if (isArray(classNames)) {
        element.className = exported$9.addWord(element.className || '',
                                           classNames);
    }

    return get$1();
}

function removeClass(element, classNames) {
    var isString$$1 = isString;

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    if (isString$$1(classNames)) {
        classNames = [classNames];
    }

    if (isArray(classNames)) {
        element.className = exported$9.removeWord(element.className,
                                              classNames);
    }

    return get$1();
}

function applyStyle() {
    /* jshint validthis: true */
    return arguments.length > 1 ?
                // setter
                setStyle.apply(this, arguments) :

                // getter
                getStyle.apply(this, arguments);



}

function setStyle(element, rules, value) {
    var context;

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    if (isString(rules)) {
        if (arguments.length > 2) {
            context = {};
            context[rules] = value;
            rules = context;
        }
        else {
            rules = parseCSSText(rules);
        }
    }

    if (!object(rules)) {
        throw new Error(exported$9[1141]);
    }

    context = [element.style];

    EACH(rules, onStyleElement, context, true);

    context = context[0] = null;

    return get$1();
}

function getStyle(element) {
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    return parseCSSText(element.style.cssText);
}

function onStyleElement(value, name) {
    var isNumber$$1 = isNumber(value),
        isScalar$$1 = isNumber$$1 || isString(value),
        /* jshint validthis: true */
        elementStyle = this[0],
        set$$1 = SET_STYLE,
        applied = false;

    name = exported$9.stylize(name);

    // opacity
    if (name === 'opacity') {
        if (!isScalar$$1) {
            // remove IE style opacity
            set$$1(elementStyle, 'filter', null);
        }
        else {
            SET_OPACITY(elementStyle, value);
            applied = true;
        }

    }
    // dimension
    else if (isNumber$$1 && DIMENSION_RE.test(name)) {
        value = '' + value + 'px';

    }
    // color
    else if (isNumber$$1 && COLOR_RE.test(name)) {
        value = stringify(value, exported$11.colorUnit);
    }

    // non-scalar value is "unset"
    if (!isScalar$$1) {
        value = null;
    }

    set$$1(elementStyle, name, value);

    elementStyle = null;

}

function parseCSSText(str) {
    var STATE_NAME = 1,
        STATE_VALUE = 2,
        state = STATE_NAME,
        c = -1,
        l = str.length,
        il = 0,
        name = [],
        result = {};
    var chr, value;

    for (; l--;) {
        chr = str.charAt(++c);

        switch (state) {
        case STATE_NAME:
            if (chr === ':') {
                name = name.join('');
                value = [];
                il = 0;
            }
            else {
                name[il++] = chr;
            }
            break;

        case STATE_VALUE:
            if (chr === ';' || !l) {
                result[name] = value.join('');
                name = [];
                il = 0;
            }
            else {
                value[il++] = chr;
            }
        }
    }

    return result;
}

function getCSSUnitValue(value) {
    var is = isFinite;
    var len;

    switch (typeof value) {
    case 'number':
        if (is(value)) {
            return value;
        }
        break;
    case 'string':
        len = value.length;
        if (CSS_MEASUREMENT_RE.test(value) &&
            value.substring(len - 2, len) !== 'px') {
            return value;
        }
        else if (value === 'auto' || value === 'inherit') {
            return value;
        }
        value = parseFloat(value);
        if (is(value)) {
            return value;
        }
    }

    if (value === null) {
        return value;
    }

    return false;

}

function styleManipulationNotSupported() {
    throw new Error(exported$9[2001]);
}

/**
 * Style info
 */

function computedStyleNotSupported() {
    throw new Error(exported$9[2002]);
}

function w3cGetCurrentStyle(element, ruleNames) {
    var camel = exported$9.stylize,
        isString$$1 = isString;
    var style, c, l, name, value, values, access;

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    style = global$1.getComputedStyle(element);

    values = {};
    if (!isArray(ruleNames)) {
        ruleNames = SLICE.call(arguments, 1);
    }
    for (c = -1, l = ruleNames.length; l--;) {
        name = ruleNames[++c];
        if (isString$$1(name)) {
            access = camel(name);
            switch (access) {
            case 'opacity':
                value = GET_OPACITY(style);
                break;
            default:
                value = style[access];
            }
            values[name] = value;
        }
    }

    style = null;

    return values;
}

function ieGetCurrentStyle(element, ruleNames) {
    var dimensionRe = DIMENSION_RE,
        boxRe = BOX_RE,
        isString$$1 = isString,
        camel = exported$9.stylize,
        getOpacity = GET_OPACITY,
        pixelSize = ieGetPixelSize;

    var style, c, l, name, value, access, fontSize, values, dimension;

    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM$1);
    }

    style = element.currentStyle;
    fontSize = false;
    dimension = false;
    values = {};

    if (!isArray(ruleNames)) {
        ruleNames = SLICE.call(arguments, 1);
    }

    for (c = -1, l = ruleNames.length; l--;) {
        name = ruleNames[++c];
        if (isString$$1(name)) {
            access = camel(name);

            switch (true) {
            case access === 'opacity':
                value = getOpacity(style);
                break;

            case boxRe.test(access):
                if (!dimension) {
                    dimension = ieGetPositionStyle(element, style);
                }
                value = dimension[access] + 'px';
                break;

            case dimensionRe.test(access) && style[access] !== 'auto':
                if (fontSize === false) {
                    fontSize = pixelSize(element, style, 'fontSize', null);
                }
                value = pixelSize(element, style, access, fontSize) + 'px';
                break;

            case access === 'float':
                value = style.styleFloat;
                break;

            default:
                value = style[access];
            }

            values[name] = value;
        }
    }

    style = value = null;
    return values;
}


function ieGetPixelSize(element, style, property, fontSize) {
    var sizeWithSuffix = style[property],
        size = parseFloat(sizeWithSuffix),
        suffix = sizeWithSuffix.split(NUMBER_RE)[0];
    var parent;

    switch (suffix) {
    case 'in': return size * 96;
    case 'pt': return size * 96 / 72;
    case 'em':
    case '%':
        if (!fontSize) {
            parent = element.parentElement;
            fontSize = EM_OR_PERCENT_RE.test(suffix) && parent ?
                            ieGetPixelSize(parent,
                                        parent.currentStyle,
                                        'fontSize',
                                        null) :
                            16;
            parent = null;
        }
        return suffix === 'em' ?
                    size * fontSize :
                    size / 100 * (property === 'fontSize' ?
                                    fontSize :
                                    WIDTH_RE.test(property) ?
                                        element[CLIENT_WIDTH] :
                                        element[CLIENT_HEIGHT]);

    default: return size;
    }
}


function ieGetPositionStyle(element, style) {
    var parent = element.offsetParent,
        parentStyle = parent.currentStyle,
        ieAdjust = DETECTED.browser.ieVersion < 9,
        parse$$1 = parseFloat,

        ptop = PADDING_TOP,
        pleft = PADDING_LEFT,
        pbottom = PADDING_BOTTOM,
        pright = PADDING_RIGHT,

        cwidth = CLIENT_WIDTH,
        cheight = CLIENT_HEIGHT,

        left = element[OFFSET_LEFT],
        top = element[OFFSET_TOP],
        right = parent[cwidth] - element[OFFSET_WIDTH],
        bottom = parent[cheight] - element[OFFSET_HEIGHT],
        width = element[cwidth],
        height = element[cheight];
    var node, nodeStyle;

    switch (style.position) {
    case 'relative':
        left -= (parse$$1(parentStyle[pleft]) || 0);
        top -= (parse$$1(parentStyle[ptop]) || 0);

        if (ieAdjust) {
            node = element.parentNode;

            for (; node !== parent; node = node.parentNode) {
                nodeStyle = node.currentStyle;
                if (nodeStyle.position === 'static') {
                    left -= (parse$$1(nodeStyle.paddingLeft) || 0) +
                            (parse$$1(nodeStyle.borderLeftWidth) || 0);
                    top -= (parse$$1(nodeStyle.paddingTop) || 0) +
                            (parse$$1(nodeStyle.borderTopWidth) || 0);
                }
            }

            if (parent === element.ownerDocument.body) {
                left -= parse$$1(parentStyle.marginLeft) || 0;
                top -= parse$$1(parentStyle.marginTop) || 0;
            }
        }

    /* falls through */
    case 'absolute':
    case 'fixed':
        left -= (parse$$1(parentStyle.borderLeftWidth) || 0);
        top -= (parse$$1(parentStyle.borderTopWidth) || 0);
    }


    right -= left;
    bottom -= top;
    width -= (parse$$1(style[pleft]) || 0) +
                (parse$$1(style[pright]) || 0);
    height -= (parse$$1(style[ptop]) || 0) +
                (parse$$1(style[pbottom]) || 0);

    parent = parentStyle = null;

    return {
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        width: width,
        height: height
    };
}

/**
 * opacity
 */
function opacityNotSupported() {
    throw new Error(exported$9[2006]);
}

function ieGetOpacity(style) {
    var M = Math,
        opacityRe = IE_ALPHA_OPACITY_RE,
        filter = style.filter;
    var m;

    if (isString(filter) && opacityRe.test(filter)) {
        m = filter.match(opacityRe);
        m = parseFloat(m[1]);

        return M.max(1,
                    M.min(100,
                        isNumber(m) ? m : 100)) / 100;
    }

    return 1;
}

function ieSetOpacity(style, opacity) {
    var M = Math;

    if (isString(opacity)) {
        opacity = parseFloat(opacity);
    }
    if (isNumber(opacity)) {
        style.filter = IE_ALPHA_OPACITY_TEMPLATE.
                                replace(IE_ALPHA_OPACITY_TEMPLATE_RE,
                                    M.min(100,
                                        M.max(0,
                                            M.round(opacity * 100)
                                        )).toString(10));
    }
}

function w3cGetOpacity(style) {
    var opacity = parseFloat(style.opacity);

    return isNumber(opacity) ? opacity : 1;
}

function w3cSetOpacity(style, opacity) {
    var M = Math;

    if (isString(opacity)) {
        opacity = parseFloat(opacity);
    }

    if (isNumber(opacity)) {
        style.opacity = M.min(1,
                            M.max(0, opacity)).toFixed(2);
    }
}

/**
 * Style manipulation
 */
function w3cSetStyleValue(style, name, value) {
    if (value === null) {
        style.removeProperty(name);
    }
    else {
        style[name] = value;
    }
}

function w3cGetStyleValue(style, name) {
    return style.getPropertyValue(name);
}

function ieSetStyleValue(style, name, value) {
    if (value === null) {
        style.removeAttribute(name);
    }
    else {
        style[name] = value;
    }
}
function ieGetStyleValue(style, name) {
    return style.getAttribute(name);
}



/**
 * DOM Helpers
 */


// register DOM Helpers
DOM.helper('className', addClass);
DOM.helper('style', applyStyle);


CSS_INFO = DETECTED && DETECTED.css;
if (CSS_INFO) {

    exported$11.computedStyle = CSS_INFO.w3cStyle ?
                                w3cGetCurrentStyle :
                                CSS_INFO.ieStyle ?
                                    ieGetCurrentStyle :
                                    computedStyleNotSupported;

    if (CSS_INFO.setattribute) {
        SET_STYLE = ieSetStyleValue;
        GET_STYLE = ieGetStyleValue;
    }
    else if (CSS_INFO.setproperty) {
        SET_STYLE = w3cSetStyleValue;
        GET_STYLE = w3cGetStyleValue;
    }

    if (CSS_INFO.opacity) {
        GET_OPACITY = w3cGetOpacity;
        SET_OPACITY = w3cSetOpacity;
    }
    else if (CSS_INFO.filterOpacity) {
        GET_OPACITY = ieGetOpacity;
        SET_OPACITY = ieSetOpacity;
    }

    if (CSS_INFO.alphaColor) {
        exported$11.colorUnit = 'rgba';
    }
}

var ERROR_INVALID_ELEMENT = exported$9[1101];
var ERROR_INVALID_DOM$2 = exported$9[1102];
var OFFSET_TOP$1 = 'offsetTop';
var OFFSET_LEFT$1 = 'offsetLeft';
var OFFSET_WIDTH$1 = 'offsetWidth';
var OFFSET_HEIGHT$1 = 'offsetHeight';
var MARGIN_TOP = 'marginTop';
var MARGIN_LEFT = 'marginLeft';
var SCROLL_TOP = 'scrollTop';
var SCROLL_LEFT = 'scrollLeft';
var BOUNDING_RECT = 'getBoundingClientRect';
var DEFAULTVIEW = null;
var ELEMENT_VIEW = 1;
var PAGE_VIEW = 2;
var USE_ZOOM_FACTOR = false;
var IE_PAGE_STAT_ACCESS = 'documentElement';
var boundingRect = false;
var getPageScroll = null;
var getOffset = null;
var getSize = null;
var getScreenSize = null;
var exported$12 = {
        offset: offset,
        size: size,
        box: box,
        scroll: scroll,
        screen: screen,
        visible: visible,
        translate: translateBox
    };

var DIMENSION_INFO;
var IEVERSION;

function pageBox(dom) {
    var M = Math,
        help = DOM,
        subject = dom,
        box = screen();
    
    // page size
    if (help.isView(subject)) {
        subject = subject.document;
    }
    
    if (subject.nodeType === 9) {
        subject = subject[IE_PAGE_STAT_ACCESS];
        box[2] = M.max(subject.scrollWidth, box[2]);
        box[3] = M.max(subject.scrollHeight, box[3]);
    }
    subject = null;
    
    return box;
}


function w3cScreenSize(window) {
    return [window.innerWidth, window.innerHeight];
}


function ieScreenSize(window) {
    var factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1,
        subject = window.document[IE_PAGE_STAT_ACCESS],
        size = [subject.clientWidth * factor,
                subject.clientHeight * factor];
        
    subject = null;
    return size;
}

/**
 * Element Size
 */
function rectSize(element, boundingRect) {
    var M = Math,
        rect = boundingRect || element[BOUNDING_RECT](),
        size = [
            M.max(0, rect.width || 0),
            M.max(0, rect.height || 0)];
    rect = null;
    return size;
}

function manualSize(element) {
    var M = Math;
    return [
        M.max(0, element[OFFSET_WIDTH$1] || 0),
        M.max(0, element[OFFSET_HEIGHT$1] || 0)];
}

/**
 * Element Offset
 */
function rectOffset(element, boundingRect) {
    var //scrolled = getPageScroll(element.ownerDocument[DEFAULTVIEW]),
        page = screen(element),
        rect = boundingRect || element[BOUNDING_RECT](),
        factor = DIMENSION_INFO.zoomfactor ?
                    getZoomFactor(global$1.window.document[IE_PAGE_STAT_ACCESS]) :
                    1,
        scrollX = page[0],
        scrollY = page[1],
        x = rect.left * factor + scrollX,
        y = rect.top * factor + scrollY,
        
        offset = [
            x,
            y,
            rect.right * factor - page[2],
            rect.bottom * factor - page[3]];
    rect = null;
    return offset;
}

function manualOffset(element) {
    var root = global$1.document[IE_PAGE_STAT_ACCESS],
        body = root.body,
        css = exported$11,
        
        top = OFFSET_TOP$1,
        left = OFFSET_LEFT$1,
        mtop = MARGIN_TOP,
        mleft = MARGIN_LEFT,
        
        stop = SCROLL_TOP,
        sleft = SCROLL_LEFT,

        findStyles = [mleft, mtop],
        parent = element.offsetParent,
        style = css.computedStyle(element,
                        [findStyles]),
        page = screen(element),
        x = element[left],
        y = element[top];
    
    x += parseFloat(style[mleft]) || 0;
    y += parseFloat(style[mtop]) || 0;
    
    for (; parent; parent = parent.offsetParent) {
        
        if (parent.nodeType === 1) {
            
            style = css.computedStyle(parent, findStyles);
            
            x += (parent[left] || 0) +
                            (parent.clientLeft || 0) +
                            (parseFloat(style[mleft]) || 0);
                            
            y += (parent[top] || 0) +
                            (parent.clientTop || 0) +
                            (parseFloat(style[mtop]) || 0);
                            
        }
    }
    
    parent = element.parentNode;
    
    for (; parent && parent !== body; parent = parent.parentNode) {
        if (parent.nodeType === 1 && parent !== root) {
            x += parent[sleft] || 0;
            y += parent[stop] || 0;
        }
    }
    
    root = parent = body = null;
    return [
        x,
        y,
        x + element[OFFSET_WIDTH$1] - page[2],
        y + element[OFFSET_HEIGHT$1] - page[3]];
}


/**
 * Page Scroll
 */
function setPageScroll(window, x, y) {
    var factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1;
    window.scrollTo(x * factor, y * factor);
}

function w3cPageScrollOffset(window) {
    var offset = [(window.pageXOffset || 0), (window.pageYOffset || 0)];
    return offset;
}

function iePageScrollOffset(window) {
    var M = Math,
        subject = window.document[IE_PAGE_STAT_ACCESS],
        factor = USE_ZOOM_FACTOR ? getZoomFactor(window) : 1,
        offset = [M.round(subject[SCROLL_LEFT] / factor),
                    M.round(subject[SCROLL_TOP] / factor)];
    
    subject = null;
    
    return offset;
}

function getZoomFactor() {
    var factor = 1;
    //var rect, body;
    //
    //if (boundingRect) {
    //    body = window.document.body;
    //    
    //    // rect is only in physical pixel size in IE before version 8 
    //    rect = body[BOUNDING_RECT]();
    //
    //    // the zoom level is always an integer percent value
    //    factor = Math.round(
    //                (rect.right - rect.left / body[OFFSET_WIDTH]) * 100) / 100;
    //}
    //
    //body = null;
    
    return factor;
}


/**
 * checking
 */
function isViewable(dom) {
    var help = DOM;
    var body, viewable;
    
    if (help.is(dom, 1, 9)) {
        
        if (dom.nodeType === 9) {
            return PAGE_VIEW;
        }
        
        body = dom.ownerDocument.body;
        viewable = (dom === body || help.contains(body, dom)) && ELEMENT_VIEW;
        body = null;
        return viewable;
        
    }
    
    return help.isView(dom) ? PAGE_VIEW : false;
}


/**
 * Accessors
 */
function offset(element, x, y) {
        
        // setter
        if (arguments.length > 1) {
            return box(element, x, y);
        }
        
        // getter
        switch (isViewable(element)) {
        case PAGE_VIEW:
            return pageBox(element).slice(0, 2);
        case ELEMENT_VIEW:
            return getOffset(element).slice(0, 2);
        }
        
        throw new Error(ERROR_INVALID_ELEMENT);
        
    }

function size(element, width, height) {
        
        // setter
        if (arguments.length > 1) {
            return box(element, null, null, width, height);
        }
        
        // getter
        return isViewable(element) === PAGE_VIEW ?
                    pageBox(element).slice(2, 4) : getSize(element);
    }

function box(element, x, y, width, height) {
        var applyStyle, viewmode, dimension;
        
        // setter
        if (arguments.length > 1) {
            
            applyStyle = translateBox(element, x, y, null, null, width, height);
            
            if (applyStyle) {
                exported$11.style(element, applyStyle);
            }
            return get$1();
        }
        
        // getter
        viewmode = isViewable(element);
        if (viewmode === PAGE_VIEW) {
            dimension = pageBox(element);
            x = dimension[0];
            y = dimension[1];
            width = dimension[2];
            height = dimension[3];
            dimension = screen(element);
            return [
                x,
                y,
                width - x - dimension[2],
                height - y - dimension[3],
                width,
                height];
        }
        
        if (viewmode !== ELEMENT_VIEW) {
            throw new Error(ERROR_INVALID_ELEMENT);
        }
        dimension = getSize(element);
        width = dimension[0];
        height = dimension[1];
        dimension = getOffset(element);
        dimension[4] = width;
        dimension[5] = height;
        
        return dimension;
    }

function translateBox(element, x, y, right, bottom, width, height, target) {
        var css = exported$11,
            cssValue = css.unitValue,
            parse = parseFloat,
            NUMBER = 'number',
            hasLeft = false,
            hasTop = hasLeft,
            hasRight = hasLeft,
            hasBottom = hasLeft;
            
        var hasWidth, hasHeight, diff, currentDimension;
            
        if (isViewable(element) !== ELEMENT_VIEW) {
            throw new Error(ERROR_INVALID_ELEMENT);
        }
        
        // resolve parameters
        if (isArray(x)) {
            target = y;
            if (x.length > 4) {
                height = 5 in x ? x[5] : null;
                width = 4 in x ? x[4] : null;
                bottom = 3 in x ? x[3] : null;
                right = 2 in x ? x[2] : null;
            }
            else {
                height = 3 in x ? x[3] : null;
                width = 2 in x ? x[2] : null;
                bottom = null;
                right = null;
            }
            y = 1 in y ? x[1] : null;
            x = x[0];
        }
        
        if (!object(target)) {
            target = {};
        }
        
        currentDimension = css.computedStyle(element,
                                        'position',
                                        'top',
                                        'left',
                                        'right',
                                        'bottom',
                                        'width',
                                        'height');
        
        // resolve position
        switch (currentDimension.position) {
        case 'relative':
        /* falls through */
        case 'absolute':
        case 'fixed':
            
            // create position
            x = cssValue(x);
            y = cssValue(y);
            right = cssValue(right);
            bottom = cssValue(bottom);
            
            hasLeft = x !== false;
            hasTop = y !== false;
            hasRight = !hasLeft && right !== false;
            hasBottom = !hasBottom && bottom !== false;
            
            if (hasLeft || hasRight || hasTop || hasBottom) {
                
                diff = getOffset(element);
                
                if (hasLeft) {
                    target.left = typeof x === NUMBER ? (
                                        (parse(currentDimension.left) || 0) +
                                        (x - diff[0])
                                    ) + 'px' :
                                    x;
                    
                }
                else if (hasRight) {
                    target.right = typeof right === NUMBER ? (
                                        (parse(currentDimension.right) || 0) +
                                        (right - diff[2])
                                    ) + 'px' :
                                    right;
                }
                
                if (hasTop) {
                    target.top = typeof y === NUMBER ? (
                                        (parse(currentDimension.top) || 0) +
                                        (y - diff[1])
                                    ) + 'px' :
                                    y;
                }
                else if (hasBottom) {
                    target.bottom = typeof right === NUMBER ? (
                                        (parse(currentDimension.bottom) || 0) +
                                        (bottom - diff[3])
                                    ) + 'px' :
                                    bottom;
                }
            }
            
        }
        
        
        
        // resolve size
        width = cssValue(width);
        hasWidth = width !== false;
        if (hasWidth) {
            target.width = typeof width === NUMBER ? (
                                parse(currentDimension.width || 0) +
                                (width - element[OFFSET_WIDTH$1])
                            ) + 'px' :
                            width;
        }
        
        height = cssValue(height);
        hasHeight = height !== false;
        if (hasHeight) {
            target.height = typeof height === NUMBER ? (
                                parse(currentDimension.height || 0) +
                                (height - element[OFFSET_HEIGHT$1])
                            ) + 'px' :
                            height;
        }
    
        return hasLeft || hasRight || hasTop || hasBottom ||
                hasWidth || hasHeight ? target : null;
    }

function scroll(dom, x, y) {
        var setter = arguments.length > 1,
            isNumber$$1 = isNumber,
            stop = SCROLL_TOP,
            sleft = SCROLL_LEFT;
        var current, window;
        
        // validate x and y
        if (setter) {
            if (!isNumber$$1(x)) {
                x = false;
            }
            if (!isNumber$$1(y)) {
                y = false;
            }
        }
        
        switch (isViewable(dom)) {
        case PAGE_VIEW:
            window = DOM.is(dom) ?
                            dom[DEFAULTVIEW] : dom;
            current = getPageScroll(window);
            
            if (setter) {
                setPageScroll(window,
                                x === false ?
                                    current[0] : x,
                                y === false ?
                                    current[1] : y);
            }
            else {
                return current;
            }
            break;
        
        case ELEMENT_VIEW:
            if (setter) {
                dom[sleft] = x === false ? dom[sleft] : x;
                dom[stop] = y === false ? dom[stop] : y;
            }
            else {
                return [dom[sleft], dom[stop]];
            }
            break;
        
        default:
            throw new Error(ERROR_INVALID_DOM$2);
        }
    }
    
/**
 * Visibility
 */
function visible(element, visibility, displayed) {
        var style = null,
            css = exported$11,
            isString$$1 = isString,
            len = arguments.length,
            attached = isViewable(element) === ELEMENT_VIEW;
        
        // setter
        if (len > 1) {
            style = {};
            
            if (isString$$1(visibility)) {
                style.visibility = visibility;
            }
            else if (typeof visiblity === 'boolean') {
                style.visibility = visibility ? 'visible' : 'hidden';
            }
            
            
            if (displayed === false) {
                displayed = 'none';
            }
            
            if (isString$$1(displayed)) {
                style.display = displayed;
            }
            
            css.style(element, style);
            
            return get$1();
            
        }
        
        // getter
        if (attached) {
            style = exported$11.computedStyle(element,
                            'display',
                            'visibility');
            return style.display !== 'none' && style.visibility !== 'hidden';
        }
        
        return false;
    }

/**
 * Screen offset and size
 */
function screen(dom) {
        var help = DOM,
            subject = dom;
        var box, size;
        if (help.is(subject, 1, 9)) {
            subject = (subject.nodeType === 1 ?
                            subject.ownerDocument : subject)[
                                help.documentViewAccess];
        }
        if (!help.isView(subject)) {
            subject = global$1.window;
        }
        box = getPageScroll(subject);
        size = getScreenSize(subject);
        
        box[2] = size[0];
        box[3] = size[1];
        subject = null;
        return box;
        
    }

/**
 * initialize
 */
DIMENSION_INFO = DETECTED && DETECTED.dimension;
if (DIMENSION_INFO) {
    
    // strict mode
    if (!DETECTED.browser.strict) {
        IE_PAGE_STAT_ACCESS = 'body';
    }
    
    USE_ZOOM_FACTOR = DIMENSION_INFO.zoomfactor;
    DEFAULTVIEW = DETECTED.dom.defaultView;
    IEVERSION = DETECTED.browser.ieVersion;
    
    getPageScroll = DIMENSION_INFO.pagescroll ?
                        w3cPageScrollOffset :
                        iePageScrollOffset;
    
    getScreenSize = DIMENSION_INFO.screensize ?
                        w3cScreenSize :
                        ieScreenSize;

    boundingRect = DIMENSION_INFO.rectmethod && BOUNDING_RECT;
    
    getOffset = boundingRect ? rectOffset : manualOffset;
    
                        
    getSize = boundingRect ? rectSize : manualSize;
}

var ERROR_DOM = exported$9[1102];
var SELECT_ELEMENT = null;
var CLEAR_SELECTION = null;
var UNSELECTABLE = attributeUnselectable;
var DETECTED_SELECTION = null;
var DETECTED_DOM = null;
var CSS_UNSELECT = null;
var exported$13 = {
        select: select,
        clear: clear$1,
        unselectable: unselectable
    };
    


function webkitUnselectable(element, selectable) {
    element.style.webkitUserSelect = selectable ? 'text' : 'none';
}

function geckoUnselectable(element, selectable) {
    element.style.MozUserSelect = selectable ? 'text' : 'none';
}

function attributeUnselectable(element, selectable) {
    element.unselectable = selectable ? 'off' : 'on';
    
}


function selectionNotSupported() {
    throw new Error(exported$9[2005]);
}

/**
 * Select
 */
function ieSelectElement(startElement, endElement) {
    var body = startElement.ownerDocument.body,
        startRange = body.createTextRange();
    var endRange;
    
    startRange.moveToElementText(startElement);
    if (endElement) {
        endRange = body.createTextRange();
        endRange.moveToElementText(endElement);
        startRange.setEndPoint("EndToEnd", endRange);
    }
    startRange.select();

    body = endRange = startRange = null;
}


function ieClearSelection(document) {
    document.selection.empty();
}



function w3cSelectElement(startElement, endElement) {
    var document = startElement.ownerDocument,
        startRange = document.createRange(),
        endRange = document.createRange(),
        selection = document[DETECTED_DOM.defaultView].getSelection();
    
    startRange.selectNodeContents(startElement);
    if (endElement) {
        endRange.selectNodeContents(endElement);
    }
    
    selection.addRange(startRange);
    if (endElement) {
        selection.addRange(endRange);
    }
    
    document = selection = startRange = endRange = null;
}

function w3cClearSelection(document) {
    document[DETECTED_DOM.defaultView].getSelection().removeAllRanges();
}

function select(from, to) {
        var dimension = exported$12;
        
        if (DOM.is(from, 9)) {
            from = from.body;
        }
        
        if (!dimension.visible(from)) {
            throw new Error(exported$9[1101]);
        }
        
        if (arguments.length < 2) {
            to = null;
        }
        
        if (to !== null && !dimension.visible(to)) {
            throw new Error(ERROR_DOM);
        }
        
        SELECT_ELEMENT(from, to);
        
        return get$1();
        
    }

function clear$1(documentNode) {
        if (!DOM.is(documentNode, 9)) {
            if (arguments.length > 0) {
                throw new Error(exported$9[1104]);
            }
            else {
                documentNode = global$1.document;
            }
        }
        
        CLEAR_SELECTION(documentNode);
        
        return get$1();
    }

function unselectable(element, disableSelect) {
        if (!DOM.is(element, 1)) {
            throw new Error(ERROR_DOM);
        }
        
        UNSELECTABLE(element,
                     disableSelect === false);
        
        return get$1();
    }

if (DETECTED) {
    DETECTED_DOM = DETECTED.dom;
    DETECTED_SELECTION = DETECTED.selection;
    CSS_UNSELECT = DETECTED_SELECTION.cssUnselectable;
    
    if (DETECTED_SELECTION.range) {
        SELECT_ELEMENT = w3cSelectElement;
        CLEAR_SELECTION = w3cClearSelection;
    }
    else if (DETECTED_SELECTION.textrange) {
        SELECT_ELEMENT = ieSelectElement;
        CLEAR_SELECTION = ieClearSelection;
    }
    else {
        SELECT_ELEMENT = CLEAR_SELECTION = selectionNotSupported;
    }
    
    if (CSS_UNSELECT) {
        UNSELECTABLE = CSS_UNSELECT === 'MozUserSelect' ?
                            geckoUnselectable : webkitUnselectable;
    }

}

/**
 *  Easing Formula taken from: http://gizma.com/easing
 *
 *  currentFrame = current frame
 *  startValue = start value
 *  endValue = end value
 *  totalFrames = total frame
 *  
 */
    

var linear = linearTween;
var easeIn = easeInQuad;
var easeOut = easeOutQuad;
var easeInOut = easeInOutQuad;

    
// simple linear tweening - no easing, no acceleration
function linearTween(currentFrame, startValue, endValue, totalFrames) {
        return endValue *
                    currentFrame / totalFrames + startValue;
    }

//  quadratic easing in - accelerating from zero velocity
function easeInQuad(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames;
        return endValue * currentFrame * currentFrame + startValue;
    }

// quadratic easing out - decelerating to zero velocity
function easeOutQuad(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames;
        return -endValue * currentFrame * (currentFrame-2) + startValue;
    }

		

// quadratic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuad(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames / 2;
        
        if (currentFrame < 1) {
            return endValue / 2 * currentFrame * currentFrame + startValue;
        }
        
        currentFrame--;
        return -endValue / 2 *
                    (currentFrame * (currentFrame - 2) - 1) + startValue;
    }

// cubic easing in - accelerating from zero velocity
function easeInCubic(currentFrame, startValue, endValue, totalFrames) {
        
        currentFrame /= totalFrames;
        
        return endValue * currentFrame * currentFrame * currentFrame + startValue;
    }
		

// cubic easing out - decelerating to zero velocity
function easeOutCubic(currentFrame, startValue, endValue, totalFrames) {
        
        currentFrame /= totalFrames;
        currentFrame--;
        return endValue *
                    (currentFrame * currentFrame * currentFrame + 1) +
                    startValue;
    }

		

// cubic easing in/out - acceleration until halfway, then deceleration
function easeInOutCubic(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames / 2;
        
        if (currentFrame < 1) {
            return endValue / 2 *
                    currentFrame * currentFrame * currentFrame + startValue;
        }
        
        currentFrame -= 2;
        return endValue / 2 *
                (currentFrame * currentFrame * currentFrame + 2) + startValue;
    }
	

// quartic easing in - accelerating from zero velocity
function easeInQuart(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames;
        
        return endValue *
                currentFrame * currentFrame * currentFrame * currentFrame +
                startValue;
    }

// quartic easing out - decelerating to zero velocity
function easeOutQuart(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames;
        currentFrame--;
        
        return -endValue *
                (currentFrame *
                    currentFrame *
                    currentFrame *
                    currentFrame - 1) +
                startValue;
    }

// quartic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuart(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames / 2;
        
        if (currentFrame < 1) {
            return endValue / 2 *
                        currentFrame *
                        currentFrame *
                        currentFrame *
                        currentFrame +
                            startValue;
        }
        
        currentFrame -= 2;
        return -endValue / 2 *
                (currentFrame * currentFrame * currentFrame * currentFrame - 2) +
                startValue;
    }

// quintic easing in - accelerating from zero velocity
function easeInQuint(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames;
        
        return endValue *
                currentFrame * currentFrame * currentFrame *
                currentFrame * currentFrame + startValue;
    }

// quintic easing out - decelerating to zero velocity
function easeOutQuint(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames;
        currentFrame--;
        
        return endValue *
                    (currentFrame * currentFrame * currentFrame *
                     currentFrame * currentFrame + 1) + startValue;
    }

// quintic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuint(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames / 2;
        
        if (currentFrame < 1) {
            
            return endValue / 2 *
                    currentFrame * currentFrame * currentFrame *
                    currentFrame * currentFrame + startValue;
        }
        
        currentFrame -= 2;
        return endValue / 2 *
                (currentFrame * currentFrame * currentFrame *
                    currentFrame * currentFrame + 2) + startValue;
    }
		
// sinusoidal easing in - accelerating from zero velocity
function easeInSine(currentFrame, startValue, endValue, totalFrames) {
        var M = Math;
        
        return -endValue *
                M.cos(currentFrame / totalFrames * (M.PI / 2)) +
                endValue + startValue;
    }

// sinusoidal easing out - decelerating to zero velocity
function easeOutSine(currentFrame, startValue, endValue, totalFrames) {
        var M = Math;
        
        return endValue *
                M.sin(currentFrame / totalFrames * (M.PI / 2)) + startValue;
    }

// sinusoidal easing in/out - accelerating until halfway, then decelerating
function easeInOutSine(currentFrame, startValue, endValue, totalFrames) {
        var M = Math;
        
        return -endValue / 2 *
                (M.cos(M.PI * currentFrame / totalFrames) - 1) + startValue;
    }

// exponential easing in - accelerating from zero velocity
function easeInExpo(currentFrame, startValue, endValue, totalFrames) {
        return endValue *
                Math.pow(2, 10 * (currentFrame / totalFrames - 1)) + startValue;
    }

// exponential easing out - decelerating to zero velocity
function easeOutExpo(currentFrame, startValue, endValue, totalFrames) {
        return endValue *
            (-Math.pow(2, -10 * currentFrame / totalFrames ) + 1) + startValue;
    }

// exponential easing in/out - accelerating until halfway, then decelerating
function easeInOutExpo(currentFrame, startValue, endValue, totalFrames) {
        var M = Math;
        
        currentFrame /= totalFrames / 2;
        
        if (currentFrame < 1) {
            return endValue / 2 *
                        M.pow(2, 10 * (currentFrame - 1)) + startValue;
        }
        
        currentFrame--;
        
        return endValue / 2 * (-M.pow(2, -10 * currentFrame) + 2) + startValue;
    }

// circular easing in - accelerating from zero velocity
function easeInCirc(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames;
        
        return -endValue *
                (Math.sqrt(1 - currentFrame * currentFrame) - 1) + startValue;
    }

// circular easing out - decelerating to zero velocity
function easeOutCirc(currentFrame, startValue, endValue, totalFrames) {
        currentFrame /= totalFrames;
        currentFrame--;
        
        return endValue * Math.sqrt(1 - currentFrame * currentFrame) +
                startValue;
    }

// circular easing in/out - acceleration until halfway, then deceleration
function easeInOutCirc(currentFrame, startValue, endValue, totalFrames) {
        var M = Math;
        
        currentFrame /= totalFrames / 2;
        if (currentFrame < 1) {
            return -endValue / 2 *
                    (M.sqrt(1 - currentFrame * currentFrame) - 1) + startValue;
        }
        currentFrame -= 2;
        return endValue / 2 *
                    (M.sqrt(1 - currentFrame * currentFrame) + 1) + startValue;
    }


var EASING = Object.freeze({
	linear: linear,
	easeIn: easeIn,
	easeOut: easeOut,
	easeInOut: easeInOut,
	linearTween: linearTween,
	easeInQuad: easeInQuad,
	easeOutQuad: easeOutQuad,
	easeInOutQuad: easeInOutQuad,
	easeInCubic: easeInCubic,
	easeOutCubic: easeOutCubic,
	easeInOutCubic: easeInOutCubic,
	easeInQuart: easeInQuart,
	easeOutQuart: easeOutQuart,
	easeInOutQuart: easeInOutQuart,
	easeInQuint: easeInQuint,
	easeOutQuint: easeOutQuint,
	easeInOutQuint: easeInOutQuint,
	easeInSine: easeInSine,
	easeOutSine: easeOutSine,
	easeInOutSine: easeInOutSine,
	easeInExpo: easeInExpo,
	easeOutExpo: easeOutExpo,
	easeInOutExpo: easeInOutExpo,
	easeInCirc: easeInCirc,
	easeOutCirc: easeOutCirc,
	easeInOutCirc: easeInOutCirc
});

var SESSION_ACCESS = '__animate_session';
var BOX_POSITION = {
        left: 0,
        top: 1,
        right: 2,
        bottom: 3,
        width: 4,
        height: 5
    };
var BOX_RE$1 = exported$11.boxRe;
var DIMENSION_RE$1 = exported$11.dimensionRe;
var COLOR_RE$2 = exported$11.colorRe;
var SESSIONS = {};
var exported$14 = {
        easing: EASING,
        defaultEasing: 'easeOut',
        duration: 0.5,
        interval: 10,
        each: animate,
        has: hasAnimationType,
        style: animateStyle
    };

/**
 * Stuff to try:
 *  transition-timing-function (emulate):
 *      linear|ease|ease-in|ease-out|ease-in-out|
 *      step-start|step-end|steps(int,start|end)|
 *      cubic-bezier(n,n,n,n)|initial|inherit
 */

function animate(callback, from, to, type, duration) {
    var M = Math,
        string = exported$9,
        easing = EASING,
        isObject = object,
        list = SESSIONS,
        defaultInterval = exported$14.interval,
        clear$$1 = clearInterval,
        set$$1 = setInterval,
        interval = null,
        alen = arguments.length,
        frame = 0;
        
    var frames, displacements;
    
    function stop() {
        var fn = stop;
        
        if (interval) {
            clear$$1(interval);
            delete list[interval];
            delete fn.session;
            delete fn.update;
            delete fn.running;
            interval = null;
        }
        fn = null;
    }
    
    function update(updates, initialValues, animationType) {
        var specs = displacements,
            typeObject = isObject;
        
        if (interval) {
            if (!typeObject(updates)) {
                throw new Error(string[1152]);
            }
            
            if (!typeObject(initialValues)) {
                initialValues = specs[3];
            }
            applyDisplacements(specs, initialValues, updates, animationType);
            // reset frame
            frame = 0;
            
        }
    }
    
    function run$$1() {
        var specs = displacements,
            names = specs[0],
            from = specs[1],
            to = specs[2],
            total = frames,
            current = ++frame,
            len = names.length,
            result = {},
            eased = type(current, 0, 1, total),
            last = current === total;
            
        var start;
        
        // normal animation
        for (; len--;) {
            start = from[len];
            result[names[len]] = (to[len] - start) * eased + start;
        }
        
        
        specs[3] = result;
        callback(result, current, total);
        
        if (last) {
            stop();
        }
        
    }
    
    if (!isFunction(callback)) {
        throw new Error(string[1151]);
    }
    
    if (!isObject(from) || !isObject(to)) {
        throw new Error(string[1152]);
    }
    
    // validate type
    if (alen < 4) {
        type = exported$14.defaultEasing;
    }
    else if (!hasAnimationType(type)) {
        throw new Error(string[1153]);
    }
    
    // validate duration
    if (alen < 5) {
        duration = exported$14.duration;
    }
    else if (!isNumber(duration) || duration < 1) {
        throw new Error(string[1154]);
    }
    
    // prepare displacements
    type = easing[type];
    duration *= 1000;
    frames = M.max(10, M.round(duration / defaultInterval));
    
    displacements = [[], [], [], from, stop];
    interval = set$$1(run$$1, defaultInterval);
    stop.session = interval;
    stop.update = update;
    stop.running = true;
    list[interval] = displacements;
    displacements = applyDisplacements(displacements, from, to);
    return stop;
    
}

function validValue(value) {
    if (isString(value)) {
        value = parseFloat(value);
    }
    return isNumber(value) && value;
}

function applyDisplacements(session, from, to) {
    
    EACH(to, onApplyDisplacement, [from, session], true);
    
    return session;
}

function onApplyDisplacement(value, name, to) {
    /* jshint validthis:true */
    var context = this,
        format = validValue,
        from = context[0],
        session = context[1],
        names = session[0],
        sourceValues = session[1];
        
    var index, source, target, sourceEnded;
        
    target = format(to[name]);
    
    if (target !== false) {
        index = names.indexOf(name);
        source = contains(from, name) &&
                    format(from[name]);
                    
        sourceEnded = source === false;
        
        // create from source if did not exist
        if (index === -1) {
            if (sourceEnded) {
                return true;
            }
            index = names.length;
            names[index] = name;
            
        }
        else if (sourceEnded) {
            
            source = sourceValues[index];
        }
        
        // update
        sourceValues[index] = source;
        session[2][index] = target;
        
    }

    
    return true;
}

function hasAnimationType(type) {
    return isString(type) && contains(EASING, type);
}

/**
 * CSS animation
 */
function animateStyle(element, styles, type) {
    var access = SESSION_ACCESS,
        stat = [[], {}, [], {}];
    //var values = createElementValues(styles);
    
    var session, sessionId, animateObject,
        names, defaults, animateValues, staticValues;
        
    EACH(styles, eachElementValues, stat);
    
    names = stat[0];
    animateValues = stat[1];
    staticValues = stat[3];
        
    // has animation
    if (names.length) {
        sessionId = element.getAttribute(access);
        defaults = createStyleDefaults(element, names);
        
        if (!hasAnimationType(type)) {
            type = exported$14.defaultEasing;
        }
        
        // create
        if (!sessionId) {
            animateObject = {
                node: element
            };
            
            session = animate(createElementHandler(animateObject),
                                            defaults,
                                            animateValues,
                                            type);
            
            animateObject.id = sessionId = session.session;
            
            element.setAttribute(access, sessionId);
            
        }
        // update
        else {
            
            session = SESSIONS[sessionId][4];
            session.update(animateValues, defaults, type);
            
        }
    }
    
    if (stat[2].length) {
        exported$11.style(element, staticValues);
    }
    
}

function createElementHandler(animate) {
    function onAnimate(values, current, total) {
        var session = animate,
            node = session.node;
        
        // transform dimension
        exported$12.translate(node,
                            'left' in values ? values.left : null,
                            'top' in values ? values.top : null,
                            'right' in values ? values.right : null,
                            'bottom' in values ? values.bottom : null,
                            'width' in values ? values.width : null,
                            'height' in values ? values.height : null,
                            values);
        
        exported$11.style(node, values);
        
        if (current === total) {
            node.removeAttribute(SESSION_ACCESS);
            session.node = null;
            delete session.node;
        }
        
        session = node = null;
    }
    return onAnimate;
}

function createStyleDefaults(element, names) {
    var css = exported$11,
        values = css.computedStyle(element, names),
        dimension = exported$12,
        c = -1,
        l = names.length,
        cssValue = css.unitValue,
        dimensionRe = DIMENSION_RE$1,
        colorRe = COLOR_RE$2,
        parse$$1 = parse,
        boxRe = BOX_RE$1,
        boxPosition = BOX_POSITION,
        box$$1 = null;
    var name, value;
    
    for (; l--;) {
        name = names[++c];
        value = values[name];
        if (boxRe.test(name)) {
            if (!box$$1) {
                box$$1 = dimension.box(element);
            }
            value = box$$1[boxPosition[name]];
        }
        else if (dimensionRe.test(name)) {
            value = cssValue(value);
        }
        else if (colorRe.test(name)) {
            value = parse$$1(value);
        }
        values[name] = parseFloat(value) || 0;
    }
    
    return values;
}


function eachElementValues(value, name) {
    /*jshint validthis:true */
    var stat = this,
        names = stat[0],
        values = stat[1],
        snames = stat[2],
        statics = stat[3],
        raw = value;
    
    // opacity
    if (name === 'opacity') {
        value = parseFloat(raw);
        
    }
    // box and dimension
    else if (BOX_RE$1.test(name) || DIMENSION_RE$1.test(name)) {
        value = exported$11.unitValue(raw);
        
    }
    // color
    else if (COLOR_RE$2.test(name)) {
        value = parse(raw);
        if (value === null) {
            value = false;
        }
    }
    
    if (isNumber(value)) {
        names[names.length] = name;
        values[name] = value;
    }
    else if (value !== false) {
        snames[snames.length] = name;
        statics[name] = value;
    }
}

var exported = {
        env: env,
        info: DETECTED
    };

if (DETECTED) {

    rehash(exported,
           exported$9,
           {
                "xmlEncode": "xmlEncode",
                "xmlDecode": "xmlDecode"
            });

    // dom structure
    rehash(exported,
            DOM,
            {
                'is': 'is',
                'isView': 'isView',
                'contains': 'contains',

                'select': 'select',

                'eachNodePreorder': 'eachPreorder',
                'eachNodePostorder': 'eachPostorder',
                'eachNodeLevelorder': 'eachLevel',

                'add': 'add',
                'move': 'move',
                'replace': 'replace',
                'remove': 'remove'
            });

    rehash(exported,
           exported$11,
            {
                'addClass': 'add',
                'removeClass': 'remove',
                'computedStyle': 'computedStyle',
                'stylize': 'style',
                'stylify': 'currentStyle'
            });


    rehash(exported,
            exported$10,
            {
                'on': 'on',
                'un': 'un',
                'purge': 'purge',
                'dispatch': 'fire',
                "destructor": "ondestroy"
            });

    rehash(exported,
            exported$12,
            {
                'offset': 'offset',
                'size': 'size',
                'box': 'box',
                'scroll': 'scroll',
                'screen': 'screen'
            });

    rehash(exported,
            exported$13,
            {
                'highlight': 'select',
                'unhighlightable': 'unselectable',
                'clearHighlight': 'clear'
            });

    rehash(exported,
            color$1,
            {
                'parseColor': 'parse',
                'parseColorType': 'parseType',
                'formatColor': 'stringify'
            });

    rehash(exported,
            exported$14,
            {
                'transition': 'each',
                'animateStyle': 'style'
            });

    //css.chain =
    //    eventModule.chain =
    //    dimension.chain =
    //    selection.chain = exported;

}


global$1.libdom = exported;

use(exported);



//module.exports =
//    exported['default'] =        // attach "default" for ES6 import
//    //CORE.dom =                  // attach libdom to libcore from "dom"
//    //global.gago = EXPORTS;
//    global.libdom = exported;    // attach as global "libdom" variable

export default exported;
//# sourceMappingURL=libdom.es.js.map
