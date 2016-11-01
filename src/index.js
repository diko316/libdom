'use strict';

var CORE = require('libcore'),
    detect = require("./lib/detect.js"),
    rehash = CORE.rehash,
    EXPORTS = {
        env: CORE.env,
        info: detect
    };
var css, event, dimension, selection;

if (detect) {

    // dom structure
    rehash(EXPORTS,
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
    
    rehash(EXPORTS,
            css = require("./lib/css.js"),
            {
                'addClass': 'add',
                'removeClass': 'remove',
                'computedStyle': 'computedStyle',
                'stylize': 'style'
            });
    
    
    rehash(EXPORTS,
            event = require("./lib/event.js"),
            {
                'on': 'on',
                'un': 'un',
                'purge': 'purge',
                'dispatch': 'fire'
            });
    
    rehash(EXPORTS,
            dimension = require("./lib/dimension.js"),
            {
                'offset': 'offset',
                'size': 'size',
                'box': 'box',
                'scroll': 'scroll',
                'screen': 'screen'
            });
    
    rehash(EXPORTS,
            selection = require("./lib/selection.js"),
            {
                'highlight': 'select',
                'noHighlight': 'unselectable',
                'clearHighlight': 'clear'
            });
    
    rehash(EXPORTS,
            require("./lib/color.js"),
            {
                'parseColor': 'parse',
                'formatColor': 'stringify'
            });
    
    rehash(EXPORTS,
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

module.exports = global.libdom = EXPORTS['default'] = EXPORTS;

