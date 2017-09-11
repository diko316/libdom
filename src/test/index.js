'use strict';

// at this point, "libdom" global variable is now present
import "./prepare.js";

//global.libcore = require("libcore");


import "./dom/is.js";
import "./dom/is-view.js";
import "./dom/contains.js";
import "./dom/select.js";
import "./dom/add.js";
import "./dom/remove.js";
import "./dom/move.js";
import "./dom/replace.js";

import "./color/parse-color.js";
import "./color/parse-color-type.js";
import "./color/format-color.js";

import "./event/on.js";
import "./event/un.js";
import "./event/dispatch.js";

import "./animation/transition.js";
import "./animation/animate-style.js";

import "./dimension/offset.js";
import "./dimension/size.js";
import "./dimension/box.js";
import "./dimension/scroll.js";
import "./dimension/screen.js";

import "./string/xml-encode.js";
import "./string/xml-decode.js";

import "./css/add-class.js";
import "./css/remove-class.js";
import "./css/computed-style.js";
import "./css/stylize.js";
import "./css/stylify.js";
