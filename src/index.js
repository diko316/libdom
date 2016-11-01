'use strict';

var CORE = require('libcore'),
    detect = require("./lib/detect.js"),
    EXPORTS = {
        env: CORE.env,
        info: detect
    };
var css, event, dimension, selection;


function applyIf(api, moduleObject, access) {
    var hasOwn = CORE.contains;
    var name;
    
    for (name in access) {
        if (hasOwn(access, name)) {
            api[name] = moduleObject[access[name]];
        }
    }
}


if (detect) {

    // dom structure
    applyIf(EXPORTS,
            require("./lib/dom.js"),
            {
                'is': 'is',
                'isView': 'isView',
                'contains': 'contains',
                
                'select': 'select',
                
                'eachNodePreorder': 'eachPreorder',
                'eachNodePostorder': 'eachPostorder',
                'eachNodeLevelorder': 'eachLevel',
                
                'add': 'add',
                'remove': 'remove'
            });
    
    applyIf(EXPORTS,
            css = require("./lib/css.js"),
            {
                'addClass': 'add',
                'removeClass': 'remove',
                'computedStyle': 'computedStyle',
                'stylize': 'style'
            });
    
    
    applyIf(EXPORTS,
            event = require("./lib/event.js"),
            {
                'on': 'on',
                'un': 'un',
                'purge': 'purge',
                'dispatch': 'fire'
            });
    
    applyIf(EXPORTS,
            dimension = require("./lib/dimension.js"),
            {
                'offset': 'offset',
                'size': 'size',
                'box': 'box',
                'scroll': 'scroll',
                'screen': 'screen'
            });
    
    applyIf(EXPORTS,
            selection = require("./lib/selection.js"),
            {
                'highlight': 'select',
                'noHighlight': 'unselectable',
                'clearHighlight': 'clear'
            });
    
    applyIf(EXPORTS,
            require("./lib/color.js"),
            {
                'parseColor': 'parse',
                'formatColor': 'stringify'
            });
    
    applyIf(EXPORTS,
            require("./lib/animation.js"),
            {
                'eachDisplacement': 'each',
                'animateStyle': 'style'
            });
    
    css.chain =
        event.chain = 
        dimension.chain =
        selection.chain = EXPORTS;
}
else {
    //throw new Error("Unable to proceed, not running in a browser.");
}

module.exports = global.libdom = EXPORTS['default'] = EXPORTS;

