'use strict';

import { env } from "libcore";

var ROOT = global,
    browser = env.browser,
    strict = false,
    ieVersion = 0,
    ie8 = false,
    exported = false;

var match, ieVersion;

if (browser) {
  match = env.userAgent.match(/msie ([0-9]+\.[0-9]+)/i);

  exported = {
    strict: ROOT.document.compatMode === 'CSS1Compat',
    ieVersion: match && parseInt(match[1], 10) || 0,
    ie8: ieVersion === 8
  };

}

ROOT = null;

export default exported;
