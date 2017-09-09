'use strict';

import * as exported from "./all.js";

import { use as registerModule } from "./lib/chain.js";

const mainModule = registerModule(exported);

global.libdom = mainModule;

export * from "./all.js";

export default mainModule;


