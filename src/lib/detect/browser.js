'use strict';

var ROOT = global,
    CORE = require("libcore"),
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

