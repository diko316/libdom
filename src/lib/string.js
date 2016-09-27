'use strict';


var SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/,
    CAMEL_RE = /[^a-z]+[a-z]/ig;


function camelize(str) {
    return str.replace(CAMEL_RE, onCamelizeMatch);
}

function onCamelizeMatch(all) {
    return all[all.length - 1].toUpperCase();
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

module.exports = {
    camelize: camelize,
    addWord: addWord,
    removeWord: removeWord
};
