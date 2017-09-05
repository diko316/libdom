'use strict';


export { env } from "libcore";

export { default as info } from "./lib/detect.js";

export {
            xmlEncode,
            xmlDecode
            
        } from "./lib/string.js";

export {
            is,
            isView,
            contains,
            select,
            add,
            move,
            replace,
            remove,
            eachNodePreorder,
            eachNodePostorder,
            eachNodeLevelorder
            
        } from "./lib/dom.js";
        
export {
            addClass,
            removeClass,
            computedStyle,
            stylize,
            stylify
            
        } from "./lib/css.js";

export {
            on,
            un,
            purge,
            dispatch,
            destructor
            
        } from "./lib/event.js";

export {
            offset,
            size,
            box,
            scroll,
            screen
            
        } from "./lib/dimension.js";

export {
            highlight,
            unhighlightable,
            clearHighlight
            
        } from "./lib/selection.js";

export {
            parseColor,
            parseColorType,
            formatColor
            
        } from "./lib/color.js";

export {
            transition,
            animateStyle
            
        } from "./lib/animation.js";


