'use strict';

let MODULE = null;

export 
    function use(chain) {
        MODULE = chain;
        return get();
    }
    
export
    function get() {
        return MODULE;
    }
