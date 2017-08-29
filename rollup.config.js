'use strict';




let pkg = require('./package.json'),
    configure = require('./config/base.js'),
    hasOwn = Object.prototype.hasOwnProperty,
    optionalObject = pkg.optionalDependencies,
    optionals = [],
    ol = 0,
    config = {},
    globals = {},
    meta = {
        name: pkg.name,
        esTarget: pkg.module,
        target: pkg.main,
        moduleTarget: pkg.moduleName,
        optionals: optionals,
        globals: globals
    };
    
var access;

// fix externals
for (access in optionalObject) {
    if (hasOwn.call(optionalObject, access)) {
        optionals[ol++] =
            globals[access] = access;
    }
}

// base setup
configure(config, meta);

// setup by env
switch (process.env.BUILD_MODE) {
case 'production':
    require("./config/production.js")(config, meta);
    break;

case 'compressed':
    require("./config/compressed.js")(config, meta);
    break;

case 'unit-test':
    require("./config/unit-test.js")(config, meta);
    break;

default:
    require("./config/devel.js")(config, meta);
}


module.exports = config;