'use strict';

import { number } from "libcore";
        
import format from "./format.js";

var BYTE = 255,
    BYTE_PERCENT = 127,
    BYTE_HUE = 511,
    
    PERCENT = 100,
    HUE = 360,
    SATURATION = PERCENT,
    LUMINOSITY = PERCENT;

// from: https://gist.github.com/mjackson/5311256
function hue2rgb(p, q, t) {
    t = (t + 1) % 1;
    switch (true) {
    case t < 1/6: return p + (q - p) * 6 * t;
    case t < 1/2: return q;
    case t < 2/3: return p + (q - p) * (2/3 - t) * 6;
    }
    return p;
}

export
    function itemize(value, index, colorFormat) {
        var M = Math,
            F = format,
            isFloat = index > 2 && colorFormat !== F.PERCENT,
            min = 0,
            max = index < 3 ?
                    BYTE : PERCENT;
            
        value = F.format(value, colorFormat);
        if (isFloat) {
            value *= 100;
        }
        
        return M.max(min, M.min(max, value));
    
    }

export
    function toArray(integer) {
        var M = Math,
            h2r = hue2rgb,
            size = BYTE,
            psize = BYTE_PERCENT,
            h = integer & BYTE_HUE,
            s = (integer >> 9) & psize,
            l = (integer >> 16) & psize,
            a = (integer >> 23) & psize;
    
        var q, p;
        
        l /= LUMINOSITY;
       
        if (s === 0) {
            return [l, l, l];
        }
        
        h /= HUE;
        s /= SATURATION;
        
        q = l < 0.5 ?
                l * (1 + s) :
                l + s - l * s;
                
        p = 2 * l - q;
        
        return [M.round(h2r(p, q, h + 1/3) * size),
                    M.round(h2r(p, q, h) * size),
                    M.round(h2r(p, q, h - 1/3) * size),
                    (a).toFixed(2)];
    }

export
    function toInteger(r, g, b, a) {
        var M = Math,
            size = BYTE,
            psize = BYTE_PERCENT;
    
        var max, min, h, s, l, d;
        
        r /= size;
        g /= size;
        b /= size;
        max = M.max(r, g, b);
        min = M.min(r, g, b);
        
        l = (max + min) / 2;
    
        if (max == min) {
            h = s = 0; // achromatic
        }
        else {
            d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
        
            h /= 6;
        }
        
        if (!number(a)) {
            a = PERCENT;
        }
        
        return ((a & psize) << 23) |
                (((l * LUMINOSITY) & psize) << 16) |
                (((s * SATURATION) & psize) << 9) |
                ((h * HUE) & BYTE_HUE);
    }

export
    function toString(integer) {
        var values = toArray(integer),
            alpha = (values[3] / PERCENT);
        values[3] = parseFloat(alpha.toFixed(2));
        return 'rgba(' + values.join(',') + ')';
    }



