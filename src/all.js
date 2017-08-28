'use strict';

import {
            env,
            rehash
        } from "libcore";

import detect from "./lib/detect.js";

import string from "./lib/string.js";

import dom from "./lib/dom.js";

import css from "./lib/css.js";

import eventModule from "./lib/event.js";

import dimension from "./lib/dimension.js";

import selection from "./lib/selection.js";

import color from "./lib/color.js";

import animation from "./lib/animation.js";

import chain from "./lib/chain.js";

var exported = {
        env: env,
        info: detect
    };

if (detect) {
    
    rehash(exported,
           string,
           {
                "xmlEncode": "xmlEncode",
                "xmlDecode": "xmlDecode"
            });

    // dom structure
    rehash(exported,
            dom,
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
    
    rehash(exported,
           css,
            {
                'addClass': 'add',
                'removeClass': 'remove',
                'computedStyle': 'computedStyle',
                'stylize': 'style',
                'stylify': 'currentStyle'
            });
    
    
    rehash(exported,
            eventModule,
            {
                'on': 'on',
                'un': 'un',
                'purge': 'purge',
                'dispatch': 'fire',
                "destructor": "ondestroy"
            });
    
    rehash(exported,
            dimension,
            {
                'offset': 'offset',
                'size': 'size',
                'box': 'box',
                'scroll': 'scroll',
                'screen': 'screen'
            });
    
    rehash(exported,
            selection,
            {
                'highlight': 'select',
                'unhighlightable': 'unselectable',
                'clearHighlight': 'clear'
            });
    
    rehash(exported,
            color,
            {
                'parseColor': 'parse',
                'parseColorType': 'parseType',
                'formatColor': 'stringify'
            });
    
    rehash(exported,
            animation,
            {
                'transition': 'each',
                'animateStyle': 'style'
            });
    
    //css.chain =
    //    eventModule.chain = 
    //    dimension.chain =
    //    selection.chain = exported;
    
}

chain.use(exported);

export default exported;

//module.exports =
//    exported['default'] =        // attach "default" for ES6 import
//    //CORE.dom =                  // attach libdom to libcore from "dom"
//    //global.gago = EXPORTS;
//    global.libdom = exported;    // attach as global "libdom" variable


