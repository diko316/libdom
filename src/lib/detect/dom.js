'use strict';

var ROOT = global.document.documentElement;

/**
 * TODO:
 *  querySelectorAll detect
 */

module.exports = {
    compare: !!ROOT.compareDocumentPosition,
    contains: !!ROOT.contains
};

ROOT = null;