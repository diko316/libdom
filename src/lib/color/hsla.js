'use strict';

var FORMAT = require("./format.js"),
    RGBA = require("./rgba.js");

function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    else if (t > 1) {
        t -= 1;
    }
    switch (true) {
    case t < 1/6: return p + (q - p) * 6 * t;
    case t < 1/2: return q;
    case t < 2/3: return p + (q - p) * (2/3 - t) * 6;
    }
    return p;
}

module.exports = {
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
            rgba = RGBA;
        var q, p;
        
        console.log('hue', h);
        
        // format
        h /= 360;
        s /= 100;
        l /= 100;
        
        console.log([h, s, l, a]);
        
        if (s === 0) {
            return rgba.toInteger(l, l, l, a);
        }
        
        q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        p = 2 * l - q;
        return rgba.toInteger(
                    M.round(h2r(p, q, h + 1/3) * 255),
                    M.round(h2r(p, q, h) * 255),
                    M.round(h2r(p, q, h - 1/3) * 255),
                    a);
        
    }
};

// from: https://gist.github.com/mjackson/5311256

//function hslToRgb(h, s, l){
//    var r, g, b;
//
//    if(s == 0){
//        r = g = b = l; // achromatic
//    }else{
//        var hue2rgb = function hue2rgb(p, q, t){
//            if(t < 0) t += 1;
//            if(t > 1) t -= 1;
//            if(t < 1/6) return p + (q - p) * 6 * t;
//            if(t < 1/2) return q;
//            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
//            return p;
//        }
//
//        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//        var p = 2 * l - q;
//        r = hue2rgb(p, q, h + 1/3);
//        g = hue2rgb(p, q, h);
//        b = hue2rgb(p, q, h - 1/3);
//    }
//
//    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
//}



//function rgbToHsl(r, g, b) {
//  r /= 255, g /= 255, b /= 255;
//
//  var max = Math.max(r, g, b), min = Math.min(r, g, b);
//  var h, s, l = (max + min) / 2;
//
//  if (max == min) {
//    h = s = 0; // achromatic
//  } else {
//    var d = max - min;
//    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//
//    switch (max) {
//      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//      case g: h = (b - r) / d + 2; break;
//      case b: h = (r - g) / d + 4; break;
//    }
//
//    h /= 6;
//  }
//
//  return [ h, s, l ];
//}
