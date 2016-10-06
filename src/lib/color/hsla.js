'use strict';

var FORMAT = require("./format.js"),
    RGBA = require("./rgba.js");
var EXPORTS;

function hue2rgb(p, q, t) {
    t = (t + 1) % 1;
    switch (true) {
    case t < 1/6: return p + (q - p) * 6 * t;
    case t < 1/2: return q;
    case t < 2/3: return p + (q - p) * (2/3 - t) * 6;
    }
    return p;
}

module.exports = EXPORTS = {
    itemize: function (value, index, format) {
        var F = FORMAT,
            M = Math,
            parse = parseFloat,
            min = 0,
            max = index < 1 ?
                    360 : 100;
        
        switch (format) {
        case F.HEX:
            value = (parseInt(value, 16) / 255) * max;
            break;
        
        case F.NUMBER:
            value = parse(value);
            if (index > 2) {
                value *= 100;
            }
            break;
        
        case F.PERCENT:
            value = parse(value);
            break;
        }
        
        return M.max(min, M.min(max, value || 0));
    },
    
    toInteger: function (h, s, l, a) {
        var M = Math,
            h2r = hue2rgb,
            rgba = RGBA,
            size = 255;
        var q, p;
        
        l /= 100;
       
        if (s === 0) {
            return rgba.toInteger(l, l, l, a);
        }
        
        h /= 360;
        s /= 100;
        
        q = l < 0.5 ?
                l * (1 + s) :
                l + s - l * s;
                
        p = 2 * l - q;
        
        return rgba.toInteger(
                    M.round(h2r(p, q, h + 1/3) * size),
                    M.round(h2r(p, q, h) * size),
                    M.round(h2r(p, q, h - 1/3) * size),
                    a);
        
    },
    
    toArray: function (integer) {
        var M = Math,
            rgba = RGBA.toArray(integer),
            size = 255,
            r = rgba[0] / size,
            g = rgba[1] / size,
            b = rgba[2] / size,
            a = rgba[3],
            max = M.max(r, g, b),
            min = M.min(r, g, b),
            l = (max + min) / 2;
            
        var d, h, s;
        
        if (max === min) {
            h = s = 0;
        
        }
        else {
            d = max - min;
            s = l > 0.5 ?
                    d / (2 - max - min) :
                    d / (max + min);
            
            switch (max) {
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
            }
          
            h /= 6;
        }
        
        
        return [M.round(h * 360),
                M.round(s * 100),
                M.round(l * 100), a];
    },
    
    toString: function (integer) {
        var values = EXPORTS.toArray(integer);
        values[1] += '%';
        values[2] += '%';
        values[3] = (values[3] / 100).toFixed(2);
        return 'hsla(' + values.join(',') + ')';
    }
    
};

// from: https://gist.github.com/mjackson/5311256
