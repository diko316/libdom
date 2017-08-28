'use strict';


var MAIN = null;

export 
    function use(chain) {
        MAIN = chain;
    }
    
export
    function get() {
        return MAIN;
    }