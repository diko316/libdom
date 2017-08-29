'use strict';


export { env } from "libcore";

export { default as info } from "./lib/detect.js";

export {
            xmlEncode,
            xmlDecode
            
        } from "./lib/string.js";

export {
            isDom as is,
            isDefaultView as isView,
            contains,
            select,
            add,
            move,
            replace,
            remove,
            eachPreorder as eachNodePreorder,
            eachPostorder as eachNodePostorder,
            eachLevel as eachNodeLevelorder
            
        } from "./lib/dom.js";
        
export {
            add as addClass,
            remove as removeClass,
            computedStyle,
            style as stylize,
            currentStyle as stylify
            
        } from "./lib/css.js";

export {
            on,
            un,
            purge,
            dispatch,
            ondestroy as destructor
            
        } from "./lib/event.js";

export {
            offset,
            size,
            box,
            scroll,
            screen
            
        } from "./lib/dimension.js";

export {
            select as highlight,
            unselectable as unhighlightable,
            clear as clearHighlight
            
        } from "./lib/selection.js";

export {
            parse as parseColor,
            parseType as parseColorType,
            stringify as formatColor
            
        } from "./lib/color.js";

export {
            each as transition,
            style as animateStyle
            
        } from "./lib/animation.js";


