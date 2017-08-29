'use strict';

import { use as registerModule } from "./lib/chain.js";

import * as exported from "./all.js";

global.libdom = exported;

registerModule(exported);

export * from "./all.js";

export default exported;


