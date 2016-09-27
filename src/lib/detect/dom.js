'use strict';

var ROOT = global.document.documentElement;

/**
 * TODO:
 *  querySelectorAll detect
 */

module.exports = {
    comparison: ('compareDocumentPosition' in ROOT &&
                    'compareDocumentPosition') ||
                    ('contains' in ROOT && 'contains') || null
};

ROOT = null;