'use strict';


function indexOf(array, item) {
    var l = array.length;
    for (; l--;) {
        if (array[l] === item) {
            return l;
        }
    }
    return -1;
}

module.exports = {
    indexOf: indexOf
};
