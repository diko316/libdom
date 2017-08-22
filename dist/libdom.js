(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("libdom", [], factory);
	else if(typeof exports === 'object')
		exports["libdom"] = factory();
	else
		root["libdom"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(21);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DETECTED = __webpack_require__(7),
    validSignature = DETECTED.validSignature,
    OBJECT_SIGNATURE = '[object Object]',
    ARRAY_SIGNATURE = '[object Array]',
    NULL_SIGNATURE = '[object Null]',
    UNDEFINED_SIGNATURE = '[object Undefined]',
    NUMBER_SIGNATURE = '[object Number]',
    STRING_SIGNATURE = '[object String]',
    BOOLEAN_SIGNATURE = '[object Boolean]',
    METHOD_SIGNATURE = '[object Function]',
    DATE_SIGNATURE = '[object Date]',
    REGEX_SIGNATURE = '[object RegExp]',
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    OBJECT = Object,
    O = OBJECT.prototype,
    toString = O.toString,
    isSignature = objectSignature;

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
            O.toString.call(subject) === STRING_SIGNATURE) &&

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


module.exports = {
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
    
    object: validSignature ?
                isObject : ieIsObject,
    
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
    
    iterable: isIterable
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {


var CORE = __webpack_require__(0),
    SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/,
    STYLIZE_RE = /^([Mm]oz|[Ww]ebkit|[Mm]s|[oO])[A-Z]/,
    HTML_ESCAPE_CHARS_RE = /[^\u0021-\u007e]|[\u003e\u003c\&\"\']/g,
    TEXTAREA = global.document.createElement('textarea'),
    EXPORTS = {
        camelize: CORE.camelize,
        stylize: stylize,
        addWord: addWord,
        removeWord: removeWord,
        
        xmlEncode: htmlescape,
        xmlDecode: htmlunescape,
        
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
        
        1151: "Invalid Animation [handler] parameter.",
        1152: "Invalid Animation [displacements] parameter.",
        
        2001: "Style Attribute manipulation is not supported",
        2002: "Computed style is not supported by this browser.",
        2003 : "CSS Selector query form DOM is not supported.",
        2004: "DOM position comparison is not supported.",
        2005: "DOM selection not supported.",
        2006: "CSS Opacity is not supported by this browser"
        
        
        
    };

function stylize(str) {
    str = CORE.camelize(str);
    return STYLIZE_RE.test(str) ?
                str.charAt(0).toUpperCase() + str.substring(1, str.length) :
                str;
}

function addWord(str, items) {
    var isString = CORE.string,
        c = -1,
        l = items.length;
    var cl, name;
    
    str = str.split(SEPARATE_RE);
    cl = str.length;
    for (; l--;) {
        name = items[++c];
        if (isString(name) && str.indexOf(name) === -1) {
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

function htmlunescape(str) {
    var textarea = TEXTAREA;
    var value = '';
    if (textarea) {
        textarea.innerHTML = str;
        value = textarea.value;
    }
    textarea = null;
    return value;
}

function htmlescape(str) {
    return str.replace(HTML_ESCAPE_CHARS_RE, htmlescapeCallback);
}

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


// register destructor
function onDestroy() {
    TEXTAREA = null;
}


CORE.register("libdom.event.global-destroy", onDestroy);

module.exports = EXPORTS;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var browser = __webpack_require__(17),
    EXPORTS = false;
    

if (browser) {
    EXPORTS = {
        browser: browser,
        event: __webpack_require__(31),
        dom: __webpack_require__(30),
        css: __webpack_require__(28),
        dimension: __webpack_require__(29),
        selection: __webpack_require__(32)
    };
}

module.exports = EXPORTS;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @external libcore
 */

var Obj = Object,
    O = Obj.prototype,
    EACH = typeof Obj.getOwnPropertyNames === 'function' ?
                es5each : es3each,
    TYPE = __webpack_require__(2),
    STRING = __webpack_require__(15),
    OHasOwn = O.hasOwnProperty,
    NUMERIC_RE = /^[0-9]*$/,
    ARRAY_INDEX_RE = /^[1-9][0-9]*|0$/;
    

function empty() {
    
}

function isValidObject(target) {
    var T = TYPE,
        signature = T.signature(target);
    
    switch (signature) {
    case T.REGEX:
    case T.DATE:
    case T.ARRAY:
    case T.OBJECT:
    case T.METHOD: return signature;
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
function assignProperties(target, source, access) {
    var is = isValidObject,
        context = [target, source];
        
    if (!is(target)) {
        throw new Error("Invalid [target] parameter.");
    }
    
    if (!is(source)) {
        throw new Error("Invalid [source] parameter.");
    }
    
    if (!TYPE.object(access)) {
        throw new Error("Invalid [access] parameter.");
    }
    
    EACH(access, applyProperties, context);
    context = context[0] = context[1] =  null;
    return target;
}

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
function contains(subject, property) {
    var type = TYPE;
    
    if (!type.string(property) && !type.number(property)) {
        throw new Error("Invalid [property] parameter.");
    }
    
    return OHasOwn.call(subject, property);
}



/**
 * Clears Object properties. This method only deletes overridden properties and
 *      will not fill "undefined" to non-owned properties from its prototype.
 * @name libcore.clear
 * @function
 * @param {Object} subject
 * @returns {Object} subject parameter.
 */
function clear(subject) {
    EACH(subject, applyClear, null, true);
    return subject;
}



function applyClear() {
    delete arguments[2][arguments[1]];
}

/**
 * Assign properties of source Object to target Object only if property do not
 *      exist or not overridden from the target Object.
 * @name libcore.fillin
 * @function
 * @param {Object} target - the target object
 * @param {Object} source - the source object containing properties
 *                          to be assigned to target object
 * @param {boolean} [hasown] - performs checking to only include
 *                          source object property that is overridden
 *                          (Object.protototype.hasOwnProperty() returns true)
 *                          when this parameter is set to true.
 * @returns {Object} subject parameter.
 */
function fillin(target, source, hasown) {
    if (!isValidObject(target)) {
        throw new Error("Invalid [target] parameter");
    }
    EACH(source, applyFillin, target, hasown !== false);
    return target;
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
function buildInstance(Class, overrides) {
    empty.prototype = Class.prototype;
    
    if (TYPE.object(overrides)) {
        return assign(new empty(), overrides);
    }
    return new empty();
}

/**
 * Deep compares two scalar, array, object, regex and date objects
 * @name libcore.compare
 * @function
 * @param {*} object1
 * @param {*} object2
 * @returns {boolean} True if scalar, regex, date, object properties, or array
 *                      items of object1 is identical to object2.
 */
function compare(object1, object2) {
    return compareLookback(object1, object2, []);
}

function compareLookback(object1, object2, references) {
    var T = TYPE,
        isObject = T.object,
        isArray = T.array,
        isRegex = T.regex,
        isDate = T.date,
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
    case isArray(object1):
        if (!isArray(object2)) {
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
    case isDate(object1):
        return isDate(object2) && object1.toString() === object2.toString();
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
function clone(data, deep) {
    var T = TYPE,
        isNative = T.nativeObject(data);
    
    deep = deep === true;
    
    if (isNative || T.array(data)) {
        return deep ?
                    
                    (isNative ? cloneObject : cloneArray)(data, [], []) :
                    
                    (isNative ? assignAll({}, data) : data.slice(0));
    }
    
    if (T.regex(data)) {
        return new RegExp(data.source, data.flags);
    }
    else if (T.date(data)) {
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
    var T = TYPE,
        /* jshint validthis:true */
        context = this,
        isNative = T.nativeObject(value),
        parents = context[1],
        cloned = context[2];
    var index;
    
    if (isNative || T.array(value)) {
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

function maxNumericIndex(subject) {
    var context;
    
    if (TYPE.array(subject)) {
        return subject.length - 1;
    }
    
    if (isValidObject(subject)) {
        
        context = [-1];
        EACH(subject, onMaxNumericIndex, context);
        return context[0];
    }
    return false;
}


module.exports = {
    each: EACH,
    assign: assign,
    rehash: assignProperties,
    contains: contains,
    instantiate: buildInstance,
    clone: clone,
    compare: compare,
    fillin: fillin,
    //urlFill: jsonFill,
    clear: clear,
    maxObjectIndex: maxNumericIndex
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CORE = __webpack_require__(0),
    DETECTED = __webpack_require__(4),
    EVENT = __webpack_require__(18),
    STRING = __webpack_require__(3),
    
    ORDER_TYPE_PREORDER = 1,
    ORDER_TYPE_POSTORDER = 2,
    ORDER_TYPE_LEVELORDER = 3,
    
    ERROR_INVALID_DOM = STRING[1101],
    ERROR_INVALID_DOM_NODE = STRING[1103],
    ERROR_INVALID_CSS_SELECTOR = STRING[1111],
    ERROR_INVALID_CALLBACK = STRING[1112],
    ERROR_INVALID_ELEMENT_CONFIG = STRING[1121],
    INVALID_DESCENDANT_NODE_TYPES = { 9:1, 11:1 },
    STD_CONTAINS = notSupportedContains,
    DOM_ATTRIBUTE_RE = /(^\_|[^a-zA-Z\_])/,
    DOM_ATTRIBUTE_LIST = [
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
    ],
    EVENT_ATTRIBUTE_RE = /^on(\-?[a-zA-Z].+)?$/,
    MANIPULATION_HELPERS = CORE.createRegistry(),
    EXPORTS = {
        contains: contains,
        is: isDom,
        isView: isDefaultView,
        eachPreorder: preOrderTraverse,
        eachPostorder: postOrderTraverse,
        eachLevel: levelTraverse,
        documentViewAccess: 'defaultView',
        select: notSupportedQuerySelector,
        
        helper: registerDomHelper,
        
        add: add,
        replace: replace,
        move: move,
        remove: remove,
        find: find
    };
    
var DOM_INFO;



/**
 * node contains...
 */
function contains(ancestor, descendant) {
    var elementErrorString = STRING[1102],
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

function notSupportedContains() {
    throw new Error(STRING[2004]);
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
    var C = CORE;
    if (!C.string(name)) {
        throw new Error(STRING[1001]);
    }
    
    if (!C.method(handler)) {
        throw new Error(STRING[1011]);
    }
    
    MANIPULATION_HELPERS.set(name, handler);
    
    return EXPORTS.chain;
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
    else if (CORE.object(config)) {
        tagName = getTagNameFromConfig(config);
        if (!tagName) {
            throw new Error(invalidConfig);
        }
        toInsert = element.ownerDocument.createElement(tagName);
        applyConfigToElement(toInsert, config);
    }
    
    if (!is(toInsert, 1, 3, 4, 7, 8)) {
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
    
    if (!CORE.array(nodes)) {
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
    else if (CORE.object(config)) {
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

function purgeEventsFrom(element) {
    EVENT.purge(element);
}

function find(element, node) {
    if (!isDom(element, 1, 11)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    return findChild(element, node, 1);
}

function getTagNameFromConfig(config) {
    var C = CORE;
    
    if (C.object(config)) {
        config = 'tagName' in config ?
                    config.tagName :
                    'nodeName' in config ?
                        config.nodeName :
                        'tag' in config ?
                            config.tag : false;
    }
    
    return C.string(config) ? config : false;
}


function applyAttributeToElement(value, name) {
    /* jshint validthis:true */
    var element = this,
        C = CORE,
        helper = MANIPULATION_HELPERS;
    var listen;
    
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
        listen = name.substring(name.charAt(2) === '-' ? 3 : 2, name.length);
        
        if (listen === 'on' && C.object(value)) {
            C.each(value, applyEventAttribute, element);
        }
        else {
            applyEventAttribute.call(element, value, listen);
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
    
    if (CORE.method(handler)) {
        EVENT.on(element, name, handler);
    }
    
    element = null;
}

function applyConfigToElement(element, config, usedFragment) {
    var C = CORE,
        hasOwn = C.contains,
        isObject= C.object,
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
                        C.each(value, applyAttribute, element);
                    }
                    continue;
                }
                
                applyAttribute.call(element, value, name);

            }
        }
        
        // apply childNodes
        if (C.string(childNodes)) {
            
            // convert
            if (htmlEncodeChild) {
                childNodes = STRING.xmlEncode(childNodes);
            }

            element.innerHTML = childNodes;
        }
        
        // fragment
        else if (!htmlEncodeChild) {
            
            if (isObject(childNodes)) {
                childNodes = [childNodes];
            }
            
            if (C.array(childNodes)) {
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
    var isNumber = CORE.number;
    var index, counter, any;
    
    if (isDom(node, 1, 3, 4, 7, 8) && node.parentNode === element) {
        return node;
    }
    else if (isNumber(node) && node > -1) {
        index = node;
        counter = -1;
        any = !isNumber(nodeType);
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
    
    if (!CORE.string(selector)) {
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
    
    if (!CORE.string(selector)) {
        throw new Error(ERROR_INVALID_CSS_SELECTOR);
    }

    return Array.prototype.slice.call(dom.querySelectorAll(selector));
}

function notSupportedQuerySelector() {
    throw new Error(STRING[2003]);
}

function preOrderTraverse(element, callback, context, includeRoot) {
    
    return orderTraverse(element,
                        callback,
                        context,
                        ORDER_TYPE_PREORDER,
                        includeRoot !== false);
}

function postOrderTraverse(element, callback, context, includeRoot) {

    return orderTraverse(element,
                        callback,
                        context,
                        ORDER_TYPE_POSTORDER,
                        includeRoot !== false);
}


function levelTraverse(element, callback, context, includeRoot) {
    
    return orderTraverse(element,
                        callback,
                        context,
                        ORDER_TYPE_LEVELORDER,
                        includeRoot !== false);
}


function orderTraverse(element, callback, context, orderType, includeRoot) {
    var depth = 0,
        isPostOrder = 0;
    var queue, last, node, current;
    
    if (!isDom(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    if (!CORE.method(callback)) {
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
    
    
    return EXPORTS.chain;
}

/**
 * is node
 */
function isDom(node) {
    var isNumber = CORE.number;
    
    var type, c, len, items, match, matched;
    
    if (node && typeof node === 'object') {
        
        type = node.nodeType;
        
        if (isNumber(type)) {
            
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
        EXPORTS.select = DOM_INFO.listToArray ?
                                toArrayQuerySelectorAll :
                                noArrayQuerySelectorAll;
    }
}


module.exports = EXPORTS.chain = EXPORTS;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var ROOT = global,
    doc = ROOT.document,
    win = ROOT.window,
    toString = Object.prototype.toString,
    objectSignature = '[object Object]',
    BROWSER = !!doc && !!win &&
                win.self === (doc.defaultView || doc.parentWindow),
    NODEVERSIONS = BROWSER ? false :
                    (function () {
                        return ('process' in global &&
                                global.process.versions) || false;
                    })(),
    CONSOLE = {},
    CONSOLE_NAMES = [
        'log',
        'info',
        'warn',
        'error',
        'assert'
    ],
    EXPORTS = {
        browser: BROWSER,
        nodejs: NODEVERSIONS && !!NODEVERSIONS.node,
        userAgent: BROWSER ?
                        ROOT.navigator.userAgent :
                        NODEVERSIONS ?
                            nodeUserAgent() : 'Unknown',
                        
        validSignature: toString.call(null) !== objectSignature ||
                        toString.call(void(0)) !== objectSignature,
                        
        ajax: ROOT.XMLHttpRequest,
        indexOfSupport: 'indexOf' in Array.prototype
    };
    
var c, l;

function nodeUserAgent() {
    var PROCESS = 'process' in global ? global.process : null,
        VERSIONS = NODEVERSIONS,
        str = ['Node ',
                VERSIONS.node,
                '(',
                    PROCESS.platform,
                    '; V8 ',
                    VERSIONS.v8 || 'unknown',
                    '; arch ',
                    PROCESS.arch,
                ')'];

    return str.join('');
}

function empty() {
    
}

// console polyfill so that IE 8 will not have fatal errors
//      for not openning dev tool window
if (!ROOT.console) {
    for (c = 0, l = CONSOLE_NAMES.length; l--; c++) {
        CONSOLE[CONSOLE_NAMES[c]] = empty;
    }
}

module.exports = EXPORTS;

ROOT = win = doc = null;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CORE = __webpack_require__(0),
    FORMAT = __webpack_require__(9),
    COLOR_RE =
    /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/,
    NUMBER_RE = /^[0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*$/,
    REMOVE_SPACES = /[ \r\n\t\s]+/g,
    TO_COLOR = {
        rgb: __webpack_require__(27),
        rgba: __webpack_require__(10),
        hsl: __webpack_require__(16),
        hsla: __webpack_require__(26),
        hex: __webpack_require__(25),
    },
    EXPORTS = {
        parse: parseColorString,
        parseType: parseType,
        stringify: toColorString
    };

function parseType(str) {
    str = preParseValue(str);
    if (str) {
        return parseColorStringType(str) || null;
    }
    return null;
}

function preParseValue(str) {
    if (typeof str === 'string') {
        str = str.replace(REMOVE_SPACES, '');
        if (COLOR_RE.test(str)) {
            return str;
        }
    }
    return null;
}


function parseColorStringType(str) {
    var list = TO_COLOR,
        m = str.match(COLOR_RE),
        type = m[1];
        
    var items, isHex, item;
    
    if (!CORE.contains(list, type)) {
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

function parseColorString(str) {
    var F = FORMAT,
        formatPercent = F.PERCENT,
        formatNumber = F.NUMBER,
        formatHex = F.HEX,
        numberRe = NUMBER_RE;
        
    var parsed, c, l, item, items, itemizer, processor, type, isHex, toProcess;
    
    str = preParseValue(str);
    parsed = str && parseColorStringType(str);
        
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
                                        item.charAt(item.length -1) === '%' ?
                                            formatPercent :
                                            formatNumber);
        }
        
        // add type
        return processor.toInteger.apply(processor, toProcess);
    }
    return null;
}


function toColorString(colorValue, type) {
    var list = TO_COLOR,
        C = CORE;
    
    if (arguments.length < 2) {
        type = 'hex';
    }
    
    if (!C.contains(list, type) || !C.number(colorValue)) {
        return null;
    }
    
    colorValue = Math.round(colorValue);
    
    return list[type].toString(colorValue);
}


module.exports = EXPORTS;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EXPORTS = module.exports = {
        NUMBER: 1,
        HEX: 2,
        PERCENT: 3,
        format: convert2Number
    };


function convert2Number(value, format) {
    var parse = parseFloat,
        F = EXPORTS;
    
    switch (format) {
    case F.HEX:
        return parseInt(value, 16) || 0;
    
    case F.NUMBER:
        return parse(value) || 0;

    case F.PERCENT:
        return Math.round((parse(value) || 1) * 100);
    }
    return 0;
}



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CORE = __webpack_require__(0),
    FORMAT = __webpack_require__(9),

    BYTE = 255,
    BYTE_PERCENT = 127,
    BYTE_HUE = 511,
    
    PERCENT = 100,
    HUE = 360,
    SATURATION = PERCENT,
    LUMINOSITY = PERCENT;

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

function itemize(value, index, format) {
    var M = Math,
        min = 0,
        max = index > 2 ? PERCENT : BYTE;
    
    value = FORMAT.format(value, format);

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
                a];
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

    if (max == min) {
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
    
    if (!CORE.number(a)) {
        a = PERCENT;
    }
    
    return ((a & psize) << 23) |
            (((l * LUMINOSITY) & psize) << 16) |
            (((s * SATURATION) & psize) << 9) |
            ((h * HUE) & BYTE_HUE);
}

function toString(integer) {
    var values = toArray(integer),
        alpha = (values[3] / PERCENT);
    values[3] = parseFloat(alpha.toFixed(2));
    return 'rgba(' + values.join(',') + ')';
}


module.exports = {
    itemize: itemize,
    toArray: toArray,
    toInteger: toInteger,
    toString: toString
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var CORE = __webpack_require__(0),
    STRING = __webpack_require__(3),
    DETECTED = __webpack_require__(4),
    DOM = __webpack_require__(6),
    COLOR = __webpack_require__(8),
    
    PADDING_BOTTOM = 'paddingBottom',
    PADDING_TOP = 'paddingTop',
    PADDING_LEFT = 'paddingLeft',
    PADDING_RIGHT = 'paddingRight',
    
    OFFSET_LEFT = 'offsetLeft',
    OFFSET_TOP = 'offsetTop',
    OFFSET_WIDTH = 'offsetWidth',
    OFFSET_HEIGHT = 'offsetHeight',
    
    CLIENT_WIDTH = 'clientWidth',
    CLIENT_HEIGHT = 'clientHeight',
    
    COLOR_RE = /[Cc]olor$/,
    
    //DIMENSION_RE = /width|height|(margin|padding).*|border.+(Width|Radius)/,
    EM_OR_PERCENT_RE = /%|em/,
    CSS_MEASUREMENT_RE =
/^([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)(em|px|\%|pt|vh|vw|cm|ex|in|mm|pc|vmin)$/,
    WIDTH_RE = /width/i,
    NUMBER_RE = /\d/,
    BOX_RE = /(top|bottom|left|right|width|height)$/,
    DIMENSION_RE =
        /([Tt]op|[Bb]ottom|[Ll]eft|[Rr]ight|[wW]idth|[hH]eight|Size|Radius)$/,
    
    IE_ALPHA_OPACITY_RE = /\(opacity\=([0-9]+)\)/i,
    IE_ALPHA_OPACITY_TEMPLATE = 'alpha(opacity=$opacity)',
    IE_ALPHA_OPACITY_TEMPLATE_RE = /\$opacity/,
    
    GET_OPACITY = opacityNotSupported,
    SET_OPACITY = opacityNotSupported,
    
    SET_STYLE = styleManipulationNotSupported,
    GET_STYLE = styleManipulationNotSupported,
    
    ERROR_INVALID_DOM = STRING[1101],
    
    EXPORTS = {
        add: addClass,
        remove: removeClass,
        computedStyle: computedStyleNotSupported,
        style: applyStyle,
        unitValue: getCSSUnitValue,
        styleOpacity: opacityNotSupported,
        colorUnit: 'hex',
        boxRe: BOX_RE,
        dimensionRe: DIMENSION_RE,
            
        colorRe: COLOR_RE
    },
    SLICE = Array.prototype.slice;
    
var CSS_INFO;
    


function addClass(element) {
    var className;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    className = element.className;
    
    element.className = STRING.addWord(className, SLICE.call(arguments, 1));
    
    return EXPORTS.chain;
}

function removeClass(element) {
    var className;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    className = element.className;
    
    element.className = STRING.removeWord(className, SLICE.call(arguments, 1));
    
    return EXPORTS.chain;
}

function applyStyle(element, style, value) {
    var C = CORE,
        string = C.string,
        number = C.number,
        hasOwn = C.contains,
        color = COLOR,
        set = SET_STYLE,
        setOpacity = SET_OPACITY,
        colorRe = COLOR_RE,
        
        parse = parseCSSText,
        dimensionRe = DIMENSION_RE,
        primaryColorUnit = EXPORTS.colorUnit,
        camelize = STRING.stylize,
        len = arguments.length;
        
    var name, elementStyle, isOpacity, isNumber, isScalar;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    // setter
    if (len > 1) {
        
        if (string(style)) {
            if (len > 2) {
                elementStyle = {};
                elementStyle[style] = value;
                style = elementStyle;
            }
            else {
                style = parse(style);
            }
        }
        
        if (!C.object(style)) {
            throw new Error(STRING[1141]);
        }

        elementStyle = element.style;

        main: for (name in style) {
            if (hasOwn(style, name)) {
                value = style[name];
                name = camelize(name);
                isOpacity = name === 'opacity';
                isNumber = number(value);
                isScalar = isNumber || string(value);
                
                switch (true) {

                case name === 'opacity':
                    if (!isScalar) {
                        // remove IE style opacity
                        set(elementStyle, 'filter', value = null);
                    
                    }
                    else {
                        setOpacity(elementStyle, value);
                        continue main;
                    }
                    break;
                
                case isNumber && dimensionRe.test(name):
                    value = '' + value + 'px';
                    break;
                
                case isNumber && colorRe.test(name):
                    value = color.stringify(value, primaryColorUnit);
                    break;
                
                default:
                    if (!isScalar) {
                        value = null;
                    }
                }
                
                set(elementStyle, name, value);

            }
        }
        elementStyle = null;
        
        return EXPORTS.chain;
    }
    
    // getter
    return parse(element.style.cssText);
    
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
    throw new Error(STRING[2001]);
}

/**
 * Style info
 */

function computedStyleNotSupported() {
    throw new Error(STRING[2002]);
}

function w3cGetCurrentStyle(element, list) {
    var camel = STRING.stylize,
        isString = CORE.string;
    var style, c, l, name, value, values, access;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    style = global.getComputedStyle(element);
    
    values = {};
    if (!CORE.array(list)) {
        list = SLICE.call(arguments, 1);
    }
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (isString(name)) {
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

function ieGetCurrentStyle(element, list) {
    var dimensionRe = DIMENSION_RE,
        C = CORE,
        boxRe = BOX_RE,
        isString = C.string,
        camel = STRING.stylize,
        getOpacity = GET_OPACITY,
        pixelSize = ieGetPixelSize;
        
    var style, c, l, name, value, access, fontSize, values, dimension;
    
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_INVALID_DOM);
    }
    
    style = element.currentStyle;
    fontSize = false;
    dimension = false;
    values = {};
    
    if (!C.array(list)) {
        list = SLICE.call(arguments, 1);
    }
    
    for (c = -1, l = list.length; l--;) {
        name = list[++c];
        if (isString(name)) {
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
                    size / 100 * (property == 'fontSize' ?
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
        parse = parseFloat,
        
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
        left -= (parse(parentStyle[pleft]) || 0);
        top -= (parse(parentStyle[ptop]) || 0);
        
        if (ieAdjust) {
            node = element.parentNode;
            
            for (; node !== parent; node = node.parentNode) {
                nodeStyle = node.currentStyle;
                if (nodeStyle.position === 'static') {
                    left -= (parse(nodeStyle.paddingLeft) || 0) +
                            (parse(nodeStyle.borderLeftWidth) || 0);
                    top -= (parse(nodeStyle.paddingTop) || 0) +
                            (parse(nodeStyle.borderTopWidth) || 0);
                }
            }
            
            if (parent === element.ownerDocument.body) {
                left -= parse(parentStyle.marginLeft) || 0;
                top -= parse(parentStyle.marginTop) || 0;
            }
        }
        
    /* falls through */
    case 'absolute':
    case 'fixed':
        left -= (parse(parentStyle.borderLeftWidth) || 0);
        top -= (parse(parentStyle.borderTopWidth) || 0);
    }

    
    right -= left;
    bottom -= top;
    width -= (parse(style[pleft]) || 0) +
                (parse(style[pright]) || 0);
    height -= (parse(style[ptop]) || 0) +
                (parse(style[pbottom]) || 0);
    
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
    throw new Error(STRING[2006]);
}

function ieGetOpacity(style) {
    var M = Math,
        C = CORE,
        opacityRe = IE_ALPHA_OPACITY_RE,
        filter = style.filter;
    var m;
    
    if (C.string(filter) && opacityRe.test(filter)) {
        m = filter.match(opacityRe);
        m = parseFloat(m[1]);
        
        return M.max(1,
                    M.min(100,
                        C.number(m) ? m : 100)) / 100;
    }
    
    return 1;
}

function ieSetOpacity(style, opacity) {
    var M = Math,
        C = CORE;
    
    if (C.string(opacity)) {
        opacity = parseFloat(opacity);
    }
    if (C.number(opacity)) {
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
    
    return CORE.number(opacity) ? opacity : 1;
}

function w3cSetOpacity(style, opacity) {
    var M = Math,
        C = CORE;
    
    if (C.string(opacity)) {
        opacity = parseFloat(opacity);
    }
    
    if (C.number(opacity)) {
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
        //style.setAttribute(name, value);
        //console.log(name, '=', value);
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
    
    EXPORTS.computedStyle = CSS_INFO.w3cStyle ?
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
        EXPORTS.colorUnit = 'rgba';
    }
}


module.exports = EXPORTS.chain = EXPORTS;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var CORE = __webpack_require__(0),
    DETECTED = __webpack_require__(4),
    STRING = __webpack_require__(3),
    DOM = __webpack_require__(6),
    CSS = __webpack_require__(11),
    
    ERROR_INVALID_ELEMENT = STRING[1101],
    ERROR_INVALID_DOM = STRING[1102],
    
    OFFSET_TOP = 'offsetTop',
    OFFSET_LEFT = 'offsetLeft',
    OFFSET_WIDTH = 'offsetWidth',
    OFFSET_HEIGHT = 'offsetHeight',
    
    MARGIN_TOP = 'marginTop',
    MARGIN_LEFT = 'marginLeft',
    
    SCROLL_TOP = 'scrollTop',
    SCROLL_LEFT = 'scrollLeft',
    
    BOUNDING_RECT = 'getBoundingClientRect',
    
    DEFAULTVIEW = null,
    ELEMENT_VIEW = 1,
    PAGE_VIEW = 2,
    USE_ZOOM_FACTOR = false,
    IE_PAGE_STAT_ACCESS = 'documentElement',
    
    boundingRect = false,
    getPageScroll = null,
    getOffset = null,
    getSize = null,
    //getBox = null,
    getScreenSize = null,
    EXPORTS = {
        offset: offset,
        size: size,
        box: box,
        scroll: scroll,
        screen: screen,
        visible: visible,
        translate: translateBox
    };

var DIMENSION_INFO, IEVERSION;

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
            CSS.style(element, applyStyle);
        }
        return EXPORTS.chain;
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
    var css = CSS,
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
    if (CORE.array(x)) {
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
    
    if (!CORE.object(target)) {
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
                            (width - element[OFFSET_WIDTH])
                        ) + 'px' :
                        width;
    }
    
    height = cssValue(height);
    hasHeight = height !== false;
    if (hasHeight) {
        target.height = typeof height === NUMBER ? (
                            parse(currentDimension.height || 0) +
                            (height - element[OFFSET_HEIGHT])
                        ) + 'px' :
                        height;
    }

    return hasLeft || hasRight || hasTop || hasBottom ||
            hasWidth || hasHeight ? target : null;
}


function scroll(dom, x, y) {
    var setter = arguments.length > 1,
        isNumber = CORE.number,
        stop = SCROLL_TOP,
        sleft = SCROLL_LEFT;
    var current, window;
    
    // validate x and y
    if (setter) {
        if (!isNumber(x)) {
            x = false;
        }
        if (!isNumber(y)) {
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
        throw new Error(ERROR_INVALID_DOM);
    }
}

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


/**
 * Visibility
 */
function visible(element, visibility, displayed) {
    var style = null,
        css = CSS,
        isString = CORE.string,
        len = arguments.length,
        attached = isViewable(element) === ELEMENT_VIEW;
    
    // setter
    if (len > 1) {
        style = {};
        
        if (isString(visibility)) {
            style.visibility = visibility;
        }
        else if (typeof visiblity === 'boolean') {
            style.visibility = visibility ? 'visible' : 'hidden';
        }
        
        
        if (displayed === false) {
            displayed = 'none';
        }
        
        if (isString(displayed)) {
            style.display = displayed;
        }
        
        css.style(element, style);
        
        return EXPORTS.chain;
        
    }
    
    // getter
    if (attached) {
        style = CSS.computedStyle(element,
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
        subject = global.window;
    }
    box = getPageScroll(subject);
    size = getScreenSize(subject);
    
    box[2] = size[0];
    box[3] = size[1];
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
        M.max(0, element[OFFSET_WIDTH] || 0),
        M.max(0, element[OFFSET_HEIGHT] || 0)];
}

/**
 * Element Offset
 */
function rectOffset(element, boundingRect) {
    var //scrolled = getPageScroll(element.ownerDocument[DEFAULTVIEW]),
        page = screen(element),
        rect = boundingRect || element[BOUNDING_RECT](),
        factor = DIMENSION_INFO.zoomfactor ?
                    getZoomFactor(global.window.document[IE_PAGE_STAT_ACCESS]) :
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
    var root = global.document[IE_PAGE_STAT_ACCESS],
        body = root.body,
        css = CSS,
        
        top = OFFSET_TOP,
        left = OFFSET_LEFT,
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
        x + element[OFFSET_WIDTH] - page[2],
        y + element[OFFSET_HEIGHT] - page[3]];
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
    
    if (help.is(dom)) {
        switch (dom.nodeType) {
        case 9:
        case 11:
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



module.exports = EXPORTS.chain = EXPORTS;



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TYPE = __webpack_require__(2),
    OBJECT = __webpack_require__(5),
    NUMERIC_RE = /^([1-9][0-9]*|0)$/,
    ARRAY_INDEX_RE = /^([1-9][0-9]*|0|)$/,
    ERROR_NATIVE_OBJECT = "Root [subject] requires native Object to accept " +
                            "non-numeric property name.",
    ERROR_PATH_INVALID = 'Invalid [path] parameter.',
    START = "start",
    START_ESCAPED = "start_escaped",
    QUEUE = "queue",
    END = "end",
    END_EMPTY = "end_empty",
    STATE = {
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
    },
    STATE_ACTION = {
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


function eachPath(path, callback, arg1, arg2, arg3, arg4, arg5) {
    var T = TYPE,
        map = STATE,
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
    
    if (!T.string(path)) {
        throw new Error(ERROR_PATH_INVALID);
    }
    
    if (!T.method(callback)) {
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
                        
                        if (path === 'offset.') {
                            console.log("created empty!", path, " = ", items);
                        }
                    break;
                }
            }
        }
        
        
        state = next;
        stateObject = map[state];
        
        if (pending < len - 1) {
            if (path === 'offset.') {
                console.log(path, ' = ', items, " pending ", pending, " len: ", len);
                console.log("    calling: ", items[pending]);
            }
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
            if (path === 'offset.') {
                console.log(path, ' = ', items, " pending ", pending, " len: ", len);
            }
            l = len - pending;
            for (; l--;) {
                if (path === 'offset.') {
                    console.log("    last calling: ", items[pending]);
                }
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

function onParsePath(property, last, context) {
    context[context.length] = property;
}

function parsePath(path) {
    var items = [];
    
    return eachPath(path, onParsePath, items) && items.length ?
                items : null;
    
}

function isAccessible(subject, item) {
    var T = TYPE,
        signature = T.signature(subject);
    
    switch (signature) {
    case T.NUMBER:
        return isFinite(subject) && item in Number.prototype && signature;
        
    case T.STRING:
        return item in String.prototype && signature;
    
    case T.BOOLEAN:
        return item in Boolean.prototype && signature;
    
    case T.REGEX:
    case T.DATE:
    case T.ARRAY:
    case T.OBJECT:
    case T.METHOD:
        if (item in subject) {
            return signature;
        }
    }
    return false;
}

function isWritable(subject) {
    var T = TYPE,
        signature = T.signature(subject);
    
    switch (signature) {
    case T.REGEX:
    case T.DATE:
    case T.ARRAY:
    case T.OBJECT:
    case T.METHOD:
        return signature;
    }
    return false;
}

function isJSONWritable(subject) {
    var T = TYPE,
        signature = T.signature(subject);
    
    switch (signature) {
    case T.ARRAY:
    case T.OBJECT:
        return signature;
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


function find(path, object) {
    var operation = [void(0), object];
    eachPath(path, findCallback, operation);
    operation[1] = null;
    return operation[0];
}

function clone(path, object, deep) {
    return OBJECT.clone(find(path, object), deep === true);
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

function assign(path, subject, value, overwrite) {
    var T = TYPE,
        typeArray = T.ARRAY,
        apply = OBJECT.assign,
        writable = isWritable;
    var context, name, current, valueSignature, currentSignature,
        arrayOperation, arrayPush, canApply;
    
    if (!T.string(path)) {
        throw new Error(ERROR_PATH_INVALID);
    }
    
    // main subject should be accessible and native object
    context = [void(0), subject, false];
    eachPath(path, onPopulatePath, context);
    name = context[2];
    
    if (name !== false) {
        subject = context[1];
        valueSignature = writable(value);
        arrayOperation = T.array(subject) && NUMERIC_RE.test(name);
        
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

function remove(path, subject) {
    var T = TYPE;
    var context, name, returnValue;
    
    if (!T.string(path)) {
        throw new Error(ERROR_PATH_INVALID);
    }
    
    // main subject should be accessible and native object
    context = [void(0), subject, false, false];
    eachPath(path, onRemovePath, context);
    
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
            if (T.array(subject) && NUMERIC_RE.test(name)) {
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

function compare(path, object1, object2) {
    return OBJECT.compare(find(path, object1), object2);
}


function fill(path, subject, value, overwrite) {
    var T = TYPE,
        O = OBJECT,
        typeArray = T.ARRAY,
        array = T.array,
        object = T.object,
        getMax = O.maxObjectIndex,
        apply = O.assign,
        has = O.contains,
        arrayIndexRe = ARRAY_INDEX_RE,
        iswritable = isJSONWritable,
        isSubjectArray = array(subject);
        
    var parent, c, l, item, parentIndex,
        property, arrayIndex, writable;
        
    
    
    if (!T.string(path)) {
        throw new Error(ERROR_PATH_INVALID);
    }
    
    // root subject should be an object
    if (!object(subject) && !isSubjectArray) {
        return false;
    }
    
    // unable to create items from path
    path = parsePath(path);
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

function exists(path, subject) {
    var operation = [subject, false];
    
    eachPath(path, existsCallback, operation);
    operation[0] = null;
    
    return operation[1];
}




module.exports = {
    jsonParsePath: parsePath,
    jsonFind: find,
    jsonCompare: compare,
    jsonClone: clone,
    jsonEach: eachPath,
    jsonSet: assign,
    jsonUnset: remove,
    jsonFill: fill,
    jsonExists: exists
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var TYPE = __webpack_require__(2),
    //DETECT = require('./detect.js'),
    G = global,
    // 1 = namespace, 4 = position, 5 = item
    NAME_RE = /^(([^\.]+\.)*)((before|after)\:)?([a-zA-Z0-9\_\-\.]+)$/,
    POSITION_BEFORE = 1,
    POSITION_AFTER = 2,
    RUNNERS = {},
    NAMESPACES = {},
    NATIVE_SET_IMMEDIATE = !!G.setImmediate,
    EXPORTS = {
        register: set,
        run: run,
        middleware: middlewareNamespace,
        setAsync: NATIVE_SET_IMMEDIATE ?
                        nativeSetImmediate : timeoutAsync,
        clearAsync: NATIVE_SET_IMMEDIATE ?
                        nativeClearImmediate : clearTimeoutAsync
    };
    

    
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
    
    return EXPORTS.chain;
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
    
    return EXPORTS.chain;
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
    var match = TYPE.string(name) && name.match(NAME_RE);
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
 
    if (TYPE.string(name)) {
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


module.exports = EXPORTS.chain = EXPORTS;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HALF_BYTE = 0x80,
    SIX_BITS = 0x3f,
    ONE_BYTE = 0xff,
    fromCharCode = String.fromCharCode,
    TYPE = __webpack_require__(2),
    BASE64_MAP =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    NOT_BASE64_RE = /[^a-zA-Z0-9\+\/\=]/g,
    BASE64_EXCESS_REMOVE_RE = /[^a-zA-Z0-9\+\/]/,
    CAMEL_RE = /[^a-z]+[a-z]/ig,
    UNCAMEL_RE = /\-*[A-Z]/g,
    INVALID_SUBJECT = 'Invalid [subject] parameter.';

function base64Encode(subject) {
    var map = BASE64_MAP,
        buffer = [],
        bl = 0,
        c = -1,
        excess = false,
        pad = map.charAt(64);
    var l, total, code, flag, end, chr;
    
    if (!TYPE.string(subject, true)) {
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
    
    if (!TYPE.string(subject, true) || NOT_BASE64_RE.test(subject)) {
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
    
    if (!TYPE.string(subject, true)) {
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
    
    if (!TYPE.string(subject, true)) {
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

module.exports = {
    "encode64": base64Encode,
    "decode64": base64Decode,
    "utf2bin": utf16ToUtf8,
    "bin2utf": utf8ToUtf16,
    "camelize": camelize,
    "uncamelize": uncamelize
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var HSLA = __webpack_require__(16),
    CORE = __webpack_require__(0),
    EXPORTS = module.exports = CORE.assign({}, HSLA);

function toString(integer) {
    var values = HSLA.toArray(integer).slice(0, 3);
    values[1] += '%';
    values[2] += '%';
    return 'hsl(' + values.join(',') + ')';
}

EXPORTS.toString = toString;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var ROOT = global,
    CORE = __webpack_require__(0),
    ENV = CORE.env,
    EXPORTS = false;
    
var match, ieVersion;

if (ENV.browser) {
    match = ENV.userAgent.match(/msie ([0-9]+\.[0-9]+)/i);
    ieVersion = match && parseInt(match[1], 10) || 0;
    EXPORTS = {
        strict: ROOT.document.compatMode === 'CSS1Compat',
        ieVersion: ieVersion,
        ie8: ieVersion === 8
    };
}

module.exports = EXPORTS;

ROOT = null;


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var CORE = __webpack_require__(0),
    INFO = __webpack_require__(4),
    STRING = __webpack_require__(3),
    EVENTS = null,
    PAGE_UNLOADED = false,
    MIDDLEWARE = CORE.middleware('libdom.event'),
    IE_CUSTOM_EVENTS = {},
    ERROR_OBSERVABLE_NO_SUPPORT = STRING[1131],
    ERROR_INVALID_TYPE = STRING[1132],
    ERROR_INVALID_HANDLER = STRING[1133],
    IE_ON = 'on',
    IE_BUBBLE_EVENT = 'beforeupdate',
    IE_NO_BUBBLE_EVENT = 'propertychange',
    EXPORTS = module.exports = {
                on: listen,
                un: unlisten,
                fire: dispatch,
                purge: purge,
                ondestroy: addDestructor
            };
var RESOLVE, LISTEN, UNLISTEN, DISPATCH, EVENT_INFO, IS_CAPABLE, SUBJECT;

function listen(observable, type, handler, context) {
    var last = EVENTS,
        C = CORE;
    var current, args;
    
    if (!C.string(type)) {
        throw new Error(ERROR_INVALID_TYPE);
    }
    
    if (!C.method(handler)) {
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
    var C = CORE;
    var found, len, args;
    
    if (!C.string(type)) {
        throw new Error(ERROR_INVALID_TYPE);
    }
    
    if (!C.method(handler)) {
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
    
    return EXPORTS.chain;
}


function dispatch(observable, type, defaults) {
    
    if (!CORE.string(type)) {
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
    
    return EXPORTS.chain;
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
    var hasOwn = CORE.contains,
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
    var isFunction = CORE.method;
    
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
    var hasOwn = CORE.contains,
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
    if (CORE.method(handler)) {
        MIDDLEWARE.register('global-destroy', handler);
    }
}


RESOLVE = LISTEN = UNLISTEN = DISPATCH;

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

EXPORTS.chain = EXPORTS;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var CORE = __webpack_require__(0),
    detect = __webpack_require__(4),
    rehash = CORE.rehash,
    EXPORTS = {
        env: CORE.env,
        info: detect
    };
var css, event, dimension, selection;

if (detect) {
    
    rehash(EXPORTS,
            __webpack_require__(3),
            {
                "xmlEncode": "xmlEncode",
                "xmlDecode": "xmlDecode"
            });

    // dom structure
    rehash(EXPORTS,
            __webpack_require__(6),
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
    
    rehash(EXPORTS,
            css = __webpack_require__(11),
            {
                'addClass': 'add',
                'removeClass': 'remove',
                'computedStyle': 'computedStyle',
                'stylize': 'style'
            });
    
    
    rehash(EXPORTS,
            event = __webpack_require__(18),
            {
                'on': 'on',
                'un': 'un',
                'purge': 'purge',
                'dispatch': 'fire',
                "destructor": "ondestroy"
            });
    
    rehash(EXPORTS,
            dimension = __webpack_require__(12),
            {
                'offset': 'offset',
                'size': 'size',
                'box': 'box',
                'scroll': 'scroll',
                'screen': 'screen'
            });
    
    rehash(EXPORTS,
            selection = __webpack_require__(34),
            {
                'highlight': 'select',
                'noHighlight': 'unselectable',
                'clearHighlight': 'clear'
            });
    
    rehash(EXPORTS,
            __webpack_require__(8),
            {
                'parseColor': 'parse',
                'formatColor': 'stringify'
            });
    
    rehash(EXPORTS,
            __webpack_require__(24),
            {
                'eachDisplacement': 'each',
                'animateStyle': 'style'
            });
    
    css.chain =
        event.chain = 
        dimension.chain =
        selection.chain = EXPORTS;
}

module.exports = global.libdom = EXPORTS['default'] = EXPORTS;


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



// motivation of set operations:
// https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php
var DETECT = __webpack_require__(7),
    OBJECT = __webpack_require__(5),
    TYPE = __webpack_require__(2),
    INVALID_ARRAY1 = 'Invalid [array1] parameter.',
    INVALID_ARRAY2 = 'Invalid [array2] parameter.',
    A = Array.prototype;

function indexOf(subject) {
    /*jshint validthis:true */
    var array = this,
        l = array.length,
        c = -1;
    
    for (; l--;) {
        if (subject === array[++c]) {
            array = null;
            return c;
        }
    }
    
    return -1;
}

function lastIndexOf(subject) {
    /*jshint validthis:true */
    var array = this,
        l = array.length;
        
    for (; l--;) {
        if (subject === array[l]) {
            array = null;
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
function union(array1, array2, clone) {
    var isarray = TYPE.array;
    var subject, l, len, total;
    
    if (!isarray(array1)) {
        throw new Error(INVALID_ARRAY1);
    }
    
    if (!isarray(array2)) {
        throw new Error(INVALID_ARRAY2);
    }
    
    array1 = clone === true ? array1.slice(0) : array1;
    
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
function intersect(array1, array2, clone) {
    var isarray = TYPE.array;
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
    array1 = clone === true ? array1.slice(0) : array1;
    
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
function difference(array1, array2, clone) {
    var isarray = TYPE.array;
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
    array1 = clone === true ? array1.slice(0) : array1;
    
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
if (!DETECT.indexOfSupport) {
    OBJECT.assign(A, {
        indexOf: indexOf,
        lastIndexOf: lastIndexOf
    });
}

module.exports = {
    unionList: union,
    intersectList: intersect,
    differenceList: difference
};



/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DETECT = __webpack_require__(7),
    OBJECT = __webpack_require__(5),
    PROCESSOR = __webpack_require__(14),
    EXPORTS = {
        env: DETECT
    };

OBJECT.assign(EXPORTS, __webpack_require__(2));
OBJECT.assign(EXPORTS, OBJECT);
OBJECT.assign(EXPORTS, __webpack_require__(20));
OBJECT.assign(EXPORTS, __webpack_require__(15));
OBJECT.assign(EXPORTS, PROCESSOR);
OBJECT.assign(EXPORTS, __webpack_require__(23));
OBJECT.assign(EXPORTS, __webpack_require__(13));

PROCESSOR.chain = EXPORTS;

// promise polyfill
EXPORTS.Promise = __webpack_require__(22);
EXPORTS['default'] = EXPORTS;

module.exports = EXPORTS;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var TYPE = __webpack_require__(2),
    OBJECT = __webpack_require__(5),
    PROCESSOR = __webpack_require__(14),
    slice = Array.prototype.slice,
    G = global,
    ERROR_ITERABLE = 'Invalid [iterable] parameter.',
    INDEX_STATUS = 0,
    INDEX_DATA = 1,
    INDEX_PENDING = 2;

function createPromise(instance) {
    var Class = Promise;
    
    if (!(instance instanceof Class)) {
        instance = OBJECT.instantiate(Class);
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
    
    if (TYPE.thenable(data)) {
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
    
    if (!TYPE.method(resolver)) {
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

function all(iterable) {
    var total;
    
    function resolver(resolve, reject) {
        var list = iterable,
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
    
    if (!TYPE.iterable(iterable)) {
        throw new TypeError(ERROR_ITERABLE);
    }
    
    iterable = slice.call(iterable, 0);
    total = iterable.length;
    
    if (!total) {
        return resolve([]);
    }
    
    return new Promise(resolver);
}

function race(iterable) {
    function resolver(resolve, reject) {
        var stopped = false,
            tryResolve = resolveValue,
            list = iterable,
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
    
    if (!TYPE.iterable(iterable)) {
        throw new TypeError(ERROR_ITERABLE);
    }
    
    iterable = slice.call(iterable, 0);
    
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
            
        function run(success, data) {
            var finalize = finalizeValue,
                handle = success ? onFulfill : onReject;
            
            if (TYPE.method(handle)) {
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
            list[list.length] = run;
        }
        else {
            PROCESSOR.setAsync(function () {
                run(success, state[INDEX_DATA]);
            });
        }
        
        return instance;
    },
    
    "catch": function (onReject) {
        return this.then(null, onReject);
    }
};

// static methods
OBJECT.assign(Promise, {
    all: all,
    race: race,
    reject: reject,
    resolve: resolve
});

// Polyfill if promise is not supported
if (!TYPE.method(G.Promise)) {
    G.Promise = Promise;
}

module.exports = Promise;
G = null;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TYPE = __webpack_require__(2),
    OBJECT = __webpack_require__(5),
    JSON_OP = __webpack_require__(13),
    isString = TYPE.string,
    ERROR_NAME = 'Invalid [name] parameter.',
    ERROR_PATH = 'Invalid [path] parameter.';

function create() {
    return new Registry();
}

function isIndex(name) {
    var T = TYPE;
    
    switch (T.signature(name)) {
    case T.STRING:
    case T.NUMBER: return true;
    }
    return false;
}

function Registry() {
    this.data = {};
}

Registry.prototype = {
    constructor: Registry,
    
    onApply: function (value) {
        OBJECT.assign(this.data, value, true);
    },
    
    onSet: function (name, value) {
        this.data[name] = value;
    },
    
    get: function (name) {
        var list = this.data;
        
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        if (OBJECT.contains(list, name)) {
            return list[name];
        }
        
        return void(0);
    },
    
    set: function (name, value) {
        var T = TYPE;
        
        switch (T.signature(name)) {
        case T.OBJECT:
        case T.ARRAY:
            this.onApply(name);
            break;
        
        case T.STRING:
        case T.NUMBER:
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
        
        if (OBJECT.contains(list, name)) {
            delete list[name];
        }
        
        return this;
    },
    
    find: function (path) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return JSON_OP.jsonFind(path, this.data);
    },
    
    insert: function (path, value) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        JSON_OP.jsonFill(path, this.data, value, true);
        
        return this;
    
    },
    
    remove: function (path) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        JSON_OP.jsonUnset(path, this.data);
        
        return this;
    },
    
    exists: function (name) {
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        return OBJECT.contains(this.data, name);
    },
    
    pathExists: function (path) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return JSON_OP.jsonExists(path, this.data);
    },
    
    assign: function(value) {
        var T = TYPE;
        
        switch (T.signature(value)) {
        case T.OBJECT:
        case T.ARRAY:
            this.onApply(value);
            return this;
        
        default:
            throw new Error("Invalid [value] parameter");
        }
        
    },
    
    clear: function () {
        OBJECT.clear(this.data);
        return this;
    },
    
    clone: function () {
        var list = this.data;
        return OBJECT.clone(list, true);
    }
};

module.exports = {
    createRegistry: create
};



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var STRING =  __webpack_require__(3),
    CORE = __webpack_require__(0),
    EASING = __webpack_require__(33),
    COLOR = __webpack_require__(8),
    CSS = __webpack_require__(11),
    DIMENSION = __webpack_require__(12),
    SESSION_ACCESS = '__animate_session',
    DEFAULT_EASING = 'easeOut',
    BOX_POSITION = {
        left: 0,
        top: 1,
        right: 2,
        bottom: 3,
        width: 4,
        height: 5
    },
    BOX_RE = CSS.boxRe,
    DIMENSION_RE = CSS.dimensionRe,
    COLOR_RE = CSS.colorRe,
    SESSIONS = {},
    EXPORTS = {
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

function animate(handler, from, to, type, duration) {
    var M = Math,
        string = STRING,
        easing = EASING,
        C = CORE,
        isObject = C.object,
        list = SESSIONS,
        defaultInterval = EXPORTS.interval,
        clear = clearInterval,
        set = setInterval,
        interval = null,
        frame = 0;
        
    var frames, displacements;
    
    function control() {
        var fn = control;
        
        if (interval) {
            clear(interval);
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
    
    function callback() {
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
        handler(result, last);
        
        if (last) {
            control();
        }
        
    }
    
    if (!C.method(handler)) {
        throw new Error(string[1151]);
    }
    
    if (!isObject(from) || !isObject(to)) {
        throw new Error(string[1152]);
    }
    
    // prepare displacements
    console.log("type ", type);
    type = C.contains(easing, type) ? easing[type] : easing.linear;
    duration = (C.number(duration) && duration > 0 ? duration : 1) * 1000;
    frames = M.max(10, M.round(duration / defaultInterval));
    
    displacements = [[], [], [], from, control];
    interval = set(callback, defaultInterval);
    control.session = interval;
    control.update = update;
    control.running = true;
    list[interval] = displacements;
    displacements = applyDisplacements(displacements, from, to);
    return control;
    
}

function validValue(value) {
    var C = CORE;
    if (C.string(value)) {
        value = parseFloat(value);
    }
    return C.number(value) && value;
}

function applyDisplacements(session, from, to) {
    var hasOwn = CORE.contains,
        format = validValue,
        names = session[0],
        sourceValues = session[1],
        targetValues = session[2],
        len = names.length;
    var name, index, source, target;
    
    // valid target names from source
    for (name in to) {
        if (!hasOwn(to, name)) {
            continue;
        }
        
        target = format(to[name]);
        
        if (target === false) {
            continue;
        }
            
        index = names.indexOf(name);
        source = hasOwn(from, name) && format(from[name]);
        
        // create from source if did not exist
        if (index === -1) {
            if (source === false) {
                continue;
            }
            index = len++;
            names[index] = name;
            
        }
        else if (source === false) {
            source = sourceValues[index];
        }
        
        // update
        sourceValues[index] = source;
        targetValues[index] = target;

    }
    
    return session;
}

function hasAnimationType(type) {
    var C = CORE;
    return C.string(type) && C.contains(EASING, type);
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
        
    CORE.each(styles, eachElementValues, stat);
    
    names = stat[0];
    animateValues = stat[1];
    staticValues = stat[3];
        
    // has animation
    if (names.length) {
        sessionId = element.getAttribute(access);
        defaults = createStyleDefaults(element, names);
        
        if (!hasAnimationType(type)) {
            type = DEFAULT_EASING;
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
        CSS.style(element, staticValues);
    }
    
}

function createElementHandler(animate) {
    function onAnimate(values, last) {
        var session = animate,
            node = session.node;
        
        // transform dimension
        DIMENSION.translate(node,
                            'left' in values ? values.left : null,
                            'top' in values ? values.top : null,
                            'right' in values ? values.right : null,
                            'bottom' in values ? values.bottom : null,
                            'width' in values ? values.width : null,
                            'height' in values ? values.height : null,
                            values);
        
        CSS.style(node, values);
        
        if (last) {
            node.removeAttribute(SESSION_ACCESS);
            session.node = null;
            delete session.node;
        }
        
        session = node = null;
    }
    return onAnimate;
}

function createStyleDefaults(element, names) {
    var css = CSS,
        values = css.computedStyle(element, names),
        dimension = DIMENSION,
        c = -1,
        l = names.length,
        cssValue = css.unitValue,
        dimensionRe = DIMENSION_RE,
        colorRe = COLOR_RE,
        colorParse = COLOR.parse,
        boxRe = BOX_RE,
        boxPosition = BOX_POSITION,
        box = null;
    var name, value;
    
    for (; l--;) {
        name = names[++c];
        value = values[name];
        if (boxRe.test(name)) {
            if (!box) {
                box = dimension.box(element);
            }
            value = box[boxPosition[name]];
        }
        else if (dimensionRe.test(name)) {
            value = cssValue(value);
        }
        else if (colorRe.test(name)) {
            value = colorParse(value);
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
    else if (BOX_RE.test(name) || DIMENSION_RE.test(name)) {
        value = CSS.unitValue(raw);
        
    }
    // color
    else if (COLOR_RE.test(name)) {
        value = COLOR.parse(raw);
        if (value === null) {
            value = false;
        }
    }
    
    if (CORE.number(value)) {
        names[names.length] = name;
        values[name] = value;
    }
    else if (value !== false) {
        snames[snames.length] = name;
        statics[name] = value;
    }
}


module.exports = EXPORTS;




/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RGBA = __webpack_require__(10),
    CORE = __webpack_require__(0),
    EXPORTS = module.exports = CORE.assign({}, RGBA);

function toHex(integer) {
    var M = Math;
    integer = M.max(0, M.min(integer, 255));
    return (integer < 16 ? '0' : '') + integer.toString(16);
}

function toString(integer) {
    var convert = toHex,
        values = RGBA.toArray(integer).slice(0, 3);
    
    values[0] = convert(values[0]);
    values[1] = convert(values[1]);
    values[2] = convert(values[2]);
    
    return '#' + values.join('');
}


EXPORTS.toString = toString;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CORE = __webpack_require__(0),
    FORMAT = __webpack_require__(9),
    
    BYTE = 255,
    BYTE_PERCENT = 127,
    BYTE_HUE = 511,
    
    HUE = 360,
    PERCENT = 100;
    
function itemize(value, index, format) {
    var F = FORMAT,
        M = Math,
        percent = PERCENT,
        parse = parseFloat,
        min = 0,
        max = index < 1 ?
                HUE : percent;
    
    switch (format) {
    case F.HEX:
        value = (parseInt(value, 16) / BYTE) * max;
        break;
    
    case F.NUMBER:
        value = parse(value);
        if (index > 2) {
            value *= percent;
        }
        break;
    
    case F.PERCENT:
        value = parse(value);
        break;
    }
    
    return M.max(min, M.min(max, value || 0));
}

function toInteger(h, s, l, a) {
    var psize = BYTE_PERCENT;
    
    if (!CORE.number(a)) {
        a = PERCENT;
    }
    
    return ((a & psize) << 23) |
            ((l & psize) << 16) |
            ((s & psize) << 9) |
            (h & BYTE_HUE);
}


function toArray(integer) {
    var psize = BYTE_PERCENT;
    return [
        integer & BYTE_HUE,
        (integer >> 9) & psize,
        (integer >> 16) & psize,
        (integer >> 23) & psize];
}

function toString(integer) {
    var values = toArray(integer);
    values[1] += '%';
    values[2] += '%';
    values[3] = (values[3] / PERCENT).toFixed(2);
    return 'hsla(' + values.join(',') + ')';
}

module.exports = {
    itemize: itemize,
    toInteger: toInteger,
    toArray: toArray,
    toString: toString,
};




/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var RGBA = __webpack_require__(10),
    CORE = __webpack_require__(0),
    EXPORTS = module.exports = CORE.assign({}, RGBA);

function toString(integer) {
    return 'rgb(' + RGBA.toArray(integer).slice(0, 3).join(',') + ')';
}

function toInteger(r, g, b) {
    return RGBA.toInteger(r, g, b, 100);
}

EXPORTS.toString = toString;
EXPORTS.toInteger = toInteger;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {


var WINDOW = global,
    CORE = __webpack_require__(0),
    DOC = WINDOW.document,
    DIV = DOC.createElement('div'),
    STYLE = DIV.style,
    RGBA = 'rgba(0,0,0,0.5)',
    TRANSITION_SUPPORT = ['OTransition',
                            'webkitTransition',
                            'MozTransition',
                            'transition'];

var name, l, EXPORTS, color;


module.exports = EXPORTS = {
    w3cStyle: !!WINDOW.getComputedStyle,
    ieStyle: !!DOC.documentElement.currentStyle,
    setattribute: !!STYLE.setAttribute,
    setproperty: !!STYLE.setProperty,
    transition: false,
    opacity: typeof STYLE.opacity !== 'undefined',
    filterOpacity: typeof STYLE.filter !== 'undefined',
    alphaColor: false
};

// try alpha color
try {
    STYLE.color = RGBA;
    color = STYLE.color;
    
    if (CORE.string(color)) {
        color = color.replace(/[ \r\n\t\s]+/g, '').toLowerCase();
    }

    if (RGBA === color) {
        EXPORTS.alphaColor = true;
    }
}
catch (e) {}

// detect transition
for (l = TRANSITION_SUPPORT.length; l--;) {
    name = TRANSITION_SUPPORT[l];
    if (typeof STYLE[name] !== 'undefined') {
        EXPORTS.transition = name;
        break;
    }
}


WINDOW = DOC = DIV = STYLE = null;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var DETECTED = __webpack_require__(17),
    WINDOW = global.window,
    ieVersion = DETECTED.ieVersion;

module.exports = {
        screensize: typeof WINDOW.innerWidth !== 'undefined',
        pagescroll: typeof WINDOW.pageXOffset !== 'undefined',
        rectmethod: !!WINDOW.document.documentElement.getBoundingClientRect,
        zoomfactor: ieVersion > 0 && ieVersion < 8,
        ie8: ieVersion === 8
    };

WINDOW = null;


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var DOCUMENT = global.document,
    ROOT = DOCUMENT.documentElement;

module.exports = {
    compare: !!ROOT.compareDocumentPosition,
    contains: !!ROOT.contains,
    defaultView: DOCUMENT.defaultView ?
                    'defaultView' :
                    DOCUMENT.parentWindow ?
                        'parentWindow' : null,
    querySelectorAll: !!DOCUMENT.querySelectorAll,
    listToArray: ROOT.childNodes instanceof Object
};

DOCUMENT = ROOT = null;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var WINDOW = global;

module.exports = {
    w3c: !!WINDOW.addEventListener,
    ie: !!WINDOW.attachEvent,
    customEvent: !!WINDOW.CustomEvent
};

WINDOW = null;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var DOCUMENT = global.document,
    ROOTSTYLE = DOCUMENT.documentElement.style,
    UNDEFINED = 'undefined';

module.exports = {
    range: !!DOCUMENT.createRange,
    textrange: !!DOCUMENT.createElement('input').createTextRange,
    cssUnselectable: typeof ROOTSTYLE.MozUserSelect !== UNDEFINED ?
                        'MozUserSelect' :
                        typeof ROOTSTYLE.webkitUserSelect !== UNDEFINED ?
                            'webkitUserSelect' : false
};


DOCUMENT = ROOTSTYLE = null;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *  Easing Formula taken from: http://gizma.com/easing
 *
 *  currentFrame = current frame
 *  startValue = start value
 *  endValue = end value
 *  totalFrames = total frame
 *  
 */
    


var EXPORTS = module.exports = {
        // simple linear tweening - no easing, no acceleration
        linear: linearTween,
        
        //  quadratic easing in - accelerating from zero velocity
        easeIn: easeInQuad,
        easeInQuad: easeInQuad,

        // quadratic easing out - decelerating to zero velocity
        easeOut: easeOutQuad,
        easeOutQuad: easeOutQuad,
        
        // quadratic easing in/out - acceleration until halfway,
        //                                  then deceleration
        easeInOut: easeInOutQuad,
        easeInOutQuad: easeInOutQuad,
        
        // cubic easing in - accelerating from zero velocity
        easeInCubic: easeInCubic,
        
        // cubic easing out - decelerating to zero velocity
        easeOutCubic: easeOutCubic,
        
        // cubic easing in/out - acceleration until halfway, then deceleration
        easeInOutCubic: easeInOutCubic,
        
        // quartic easing in - accelerating from zero velocity
        easeInQuart: easeInQuart,
        
        // quartic easing out - decelerating to zero velocity
        easeOutQuart: easeOutQuart,
        
        // quartic easing in/out - acceleration until halfway, then deceleration
        easeInOutQuart: easeInOutQuart,

        // quintic easing in - accelerating from zero velocity
        easeInQuint: easeInQuint,
        
        // quintic easing out - decelerating to zero velocity
        easeOutQuint: easeOutQuint,

        // quintic easing in/out - acceleration until halfway, then deceleration
        easeInOutQuint: easeInOutQuint,

		// sinusoidal easing in - accelerating from zero velocity
        easeInSine: easeInSine,	

        // sinusoidal easing out - decelerating to zero velocity
        easeOutSine: easeOutSine,		

        // sinusoidal easing in/out - accelerating until halfway,
        //          then decelerating
        easeInOutSine: easeInOutSine,
        
        // exponential easing in - accelerating from zero velocity
        easeInExpo: easeInExpo,

        // exponential easing out - decelerating to zero velocity
        easeOutExpo: easeOutExpo,
        

        // exponential easing in/out - accelerating until halfway,
        //                      then decelerating
        easeInOutExpo: easeInOutExpo,
        
        // circular easing in - accelerating from zero velocity
        easeInCirc: easeInCirc,
        
        // circular easing out - decelerating to zero velocity
        easeOutCirc: easeOutCirc,
        
        // circular easing in/out - acceleration until halfway,
        //                      then deceleration
        easeInOutCirc: easeInOutCirc
        
    };
    
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
            (currentFrame * currentFrame * currentFrame * currentFrame - 1) +
            startValue;
}

		

// quartic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuart(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        return endValue / 2 *
                    currentFrame * currentFrame * currentFrame * currentFrame +
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
        return endValue / 2 * M.pow(2, 10 * (currentFrame - 1)) + startValue;
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
    
	return endValue * Math.sqrt(1 - currentFrame * currentFrame) + startValue;
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


module.exports = EXPORTS;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var DETECTED = __webpack_require__(4),
    STRING = __webpack_require__(3),
    DOM = __webpack_require__(6),
    DIMENSION = __webpack_require__(12),
    DETECTED_DOM = DETECTED.dom,
    DETECTED_SELECTION = DETECTED.selection,
    ERROR_DOM = STRING[1102],
    SELECT_ELEMENT = null,
    CLEAR_SELECTION = null,
    UNSELECTABLE = attributeUnselectable,
    CSS_UNSELECT = DETECTED_SELECTION.cssUnselectable,
    EXPORTS = {
        select: select,
        clear: clear,
        unselectable: unselectable
    };

function select(element, endElement) {
    var dimension = DIMENSION;
    
    if (DOM.is(element, 9)) {
        element = element.body;
    }
    
    if (!dimension.visible(element)) {
        throw new Error(STRING[1101]);
    }
    
    if (arguments.length < 2) {
        endElement = null;
    }
    
    if (endElement !== null && !dimension.visible(endElement)) {
        throw new Error(ERROR_DOM);
    }
    
    SELECT_ELEMENT(element, endElement);
    
    return EXPORTS.chain;
    
}

function clear(document) {
    if (!DOM.is(document, 9)) {
        if (arguments.length > 0) {
            throw new Error(STRING[1104]);
        }
        else {
            document = global.document;
        }
    }
    
    CLEAR_SELECTION(document);
    
    return EXPORTS.chain;
}

function unselectable(element, disableSelect) {
    if (!DOM.is(element, 1)) {
        throw new Error(ERROR_DOM);
    }
    
    UNSELECTABLE(element, disableSelect === false);
    return EXPORTS.chain;
}

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
    throw new Error(STRING[2005]);
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
    
    document = selection = startRange = endRange;
}

function w3cClearSelection(document) {
    document[DETECTED_DOM.defaultView].getSelection().removeAllRanges();
}

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


module.exports = EXPORTS.chain = EXPORTS;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ })
/******/ ]);
});