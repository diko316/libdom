'use strict';

var CORE = require('libcore'),
    detect = require("./lib/detect.js"),
    rehash = CORE.rehash,
    EXPORTS = {
        env: CORE.env,
        info: detect
    };
var css, eventModule, dimension, selection;

if (detect) {
    
    rehash(EXPORTS,
            require("./lib/string.js"),
            {
                "xmlEncode": "xmlEncode",
                "xmlDecode": "xmlDecode"
            });

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
                'move': 'move',
                'replace': 'replace',
                'remove': 'remove'
            });
    
    rehash(EXPORTS,
            css = require("./lib/css.js"),
            {
                'addClass': 'add',
                'removeClass': 'remove',
                'computedStyle': 'computedStyle',
                'stylize': 'style',
                'stylify': 'currentStyle'
            });
    
    
    rehash(EXPORTS,
            eventModule = require("./lib/event.js"),
            {
                'on': 'on',
                'un': 'un',
                'purge': 'purge',
                'dispatch': 'fire',
                "destructor": "ondestroy"
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
                'unhighlightable': 'unselectable',
                'clearHighlight': 'clear'
            });
    
    rehash(EXPORTS,
            require("./lib/color.js"),
            {
                'parseColor': 'parse',
                'parseColorType': 'parseType',
                'formatColor': 'stringify'
            });
    
    rehash(EXPORTS,
            require("./lib/animation.js"),
            {
                'transition': 'each',
                'animateStyle': 'style'
            });
    
    css.chain =
        eventModule.chain = 
        dimension.chain =
        selection.chain = EXPORTS;
    
}


module.exports =
    EXPORTS['default'] =        // attach "default" for ES6 import
    CORE.dom =                  // attach libdom to libcore from "dom"
    //global.gago = EXPORTS;
    global.libdom = EXPORTS;    // attach as global "libdom" variable


