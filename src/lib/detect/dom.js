'use strict';


function comparisonMethod() {
    var root = global.document.documentElement;
    var found = ('compareDocumentPosition' in root &&
                    'compareDocumentPosition') ||
                    ('contains' in root && 'contains') || null;
    
    root = null;
    return found;
}

module.exports = {
    comparison: comparisonMethod()
};