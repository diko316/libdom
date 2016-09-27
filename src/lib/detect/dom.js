'use strict';

var root = global.document.documentElement;


module.exports = {
    comparison: ('compareDocumentPosition' in root &&
                    'compareDocumentPosition') ||
                    ('contains' in root && 'contains') || null
};

root = null;