'use strict';


function indexOf(array, item) {
    var c = -1,
        l = array.length;
    for (; l--;) {
        if (array[++c] === item) {
            return c;
        }
    }
    return -1;
}

function lastIndexOf(array, item) {
    var l = array.length;
    for (; l--;) {
        if (array[l] === item) {
            return l;
        }
    }
    return -1;
}

module.exports = {
    indexOf: indexOf,
    lastIndexOf: lastIndexOf
};
