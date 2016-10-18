'use strict';

var FORMAT = require("./format.js"),
    PIGMENT_SIZE = 0xff;
    
function rgb2hsl(r, g, b) {
    var M = Math,
        size = PIGMENT_SIZE;
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
    
    return [h, s, l];
}

function hsl2rgb(h, s, l) {
    var M = Math,
        h2r = hue2rgb,
        size = 255;
    var q, p;
    
    l /= 100;
   
    if (s === 0) {
        return [l, l, l];
    }
    
    h /= 360;
    s /= 100;
    
    q = l < 0.5 ?
            l * (1 + s) :
            l + s - l * s;
            
    p = 2 * l - q;
    
    return [M.round(h2r(p, q, h + 1/3) * size),
                M.round(h2r(p, q, h) * size),
                M.round(h2r(p, q, h - 1/3) * size)];
    
}

function hue2rgb(p, q, t) {
    t = (t + 1) % 1;
    switch (true) {
    case t < 1/6: return p + (q - p) * 6 * t;
    case t < 1/2: return q;
    case t < 2/3: return p + (q - p) * (2/3 - t) * 6;
    }
    return p;
}

function toArray(integer) {
    var size = PIGMENT_SIZE;
    
    return [integer & size,
            (integer >> 8) & size,
            (integer >> 16) & size,
            (integer >> 24) & size];
}

function itemize(value, index, format) {
    var F = FORMAT,
        M = Math,
        min = 0,
        max = index > 2 ? 100 : PIGMENT_SIZE;
    
    value = F.format(value, format);

    return M.max(min, M.min(max, value));

}

function toInteger(r, g, b, a) {
    var size = PIGMENT_SIZE;
    
    return ((a & size) << 24) |
            ((b & size) << 16) |
            ((g & size) << 8) |
            (r & size);
}

function toString(integer) {
    var values = toArray(integer),
        alpha = (values[3] / 100);
    values[3] = parseFloat(alpha.toFixed(2));
    return 'rgba(' + values.join(',') + ')';
}

function toPointInteger(r, g, b, a) {
    var M = Math,
        size = PIGMENT_SIZE,
        hsl = rgb2hsl(r, g, b);
    return ((a & size) << 24) |
            ((M.round(hsl[2] * 100) & size) << 16) |
            ((M.round(hsl[1] * 100) & size) << 8) |
            (M.round(hsl[0] * 100) & size);
}

function toPointString(integer) {
    
}

module.exports = {
    itemize: itemize,
    toArray: toArray,
    toInteger: toInteger,
    toString: toString
};
