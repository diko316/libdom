'use strict';

import {
            string,
            camelize,
            register
        } from "libcore";
        
import detect from "./detect.js";

var SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/,
    STYLIZE_RE = /^([Mm]oz|[Ww]ebkit|[Mm]s|[oO])[A-Z]/,
    HTML_ESCAPE_CHARS_RE = /[^\u0021-\u007e]|[\u003e\u003c\&\"\']/g,
    TEXTAREA = null;


    
function htmlescapeCallback(chr) {
    var code = chr.charCodeAt(0).toString(16);
    var value;
    switch (code) {
    case '26': value = 'amp';
        break;
    case '22': value = 'quot';
        break;
    case '27': value = 'apos';
        break;
    case '3C':
    case '3c': value = 'lt';
        break;
    case '3E':
    case '3e': value = 'gt';
        break;
    default:
        value = '#x' + code;
    }
    return '&' + value + ';';
}


function initialize() {
    if (detect) {
        TEXTAREA = global.document.createElement('textarea');
        // register destructor
        register("libdom.event.global-destroy", onDestroy);
    }
}

function onDestroy() {
    TEXTAREA = null;
}

initialize();

export let
    ERROR = {
        
        1001: "Invalid String [name] parameter.",
        1011: "Invalid Function [handler] parameter.",
        1021: "Invalid String [subject] parameter.",
        
    
        1101: "Invalid DOM [element] parameter.",
        1102: "Invalid [dom] Object parameter.",
        1103: "Invalid DOM [node] parameter.",
        1104: "Invalid DOM [document] parameter.",
        1105: "Invalid DOM [nodes] parameter.",

        1106: "Invalid DOM [from] parameter.",
        1107: "Invalid DOM [to] parameter.",
        1108: "Invalid DOM [before] parameter.",
        
        1111: "Invalid CSS [selector] parameter.",
        1112: "Invalid tree traverse [callback] parameter.",
        1113: "Invalid [classNames] parameter.",
        
        1121: "Invalid DOM Element [config] parameter.",
        
        1131: "Invalid [observable] parameter.",
        1132: "Invalid Event [type] parameter.",
        1133: "Invalid Event [handler] parameter.",
        
        
        1141: "Invalid Style [rule] parameter.",
        //1142: "Invalid Colorset [type] parameter.",
        //1143: "Invalid [colorValue] integer parameter.",
        
        1151: "Invalid Animation [callback] parameter.",
        1152: "Invalid Animation [displacements] parameter.",
        1153: "Invalid Animation [type] parameter.",
        1154: "Invalid Animation [duration] parameter.",
        
        1210: "Invalid Dimension [x] parameter.",
        1211: "Invalid Dimension [y] parameter.",
        1212: "Invalid Dimension [right] parameter.",
        1213: "Invalid Dimension [bottom] parameter.",
        1214: "Invalid Dimension [width] parameter.",
        1215: "Invalid Dimension [height] parameter.",
        1216: "Invalid Dimension parameters.",
        
        2001: "Style Attribute manipulation is not supported",
        2002: "Computed style is not supported by this browser.",
        2003: "CSS Selector query form DOM is not supported.",
        2004: "DOM position comparison is not supported.",
        2005: "DOM selection not supported.",
        2006: "CSS Opacity is not supported by this browser"

    };

export
    function stylize(subject) {
        if (!string(subject)) {
            throw new Error(ERROR[1021]);
        }

        subject = camelize(subject);
        return STYLIZE_RE.test(subject) ?
                    subject.charAt(0).toUpperCase() +
                        subject.substring(1,
                                        subject.length) :
                    subject;
    }

export
    function addWord(subject, items) {
        var isString = string,
            c = -1,
            l = items.length;
        var cl, name;
        
        if (!string(subject, true)) {
            throw new Error(ERROR[1021]);
        }

        subject = subject ? subject.split(SEPARATE_RE) : [];
        cl = subject.length;
        for (; l--;) {
            name = items[++c];
            if (isString(name) && subject.indexOf(name) === -1) {
                subject[cl++] = name;
            }
        }
        
        return subject.join(' ');
    }

export
    function removeWord(subject, items) {
        var c = -1,
            l = items.length;
        var cl, total, name;

        if (!string(subject, true)) {
            throw new Error(ERROR[1021]);
        }
        
        subject = subject ? [] : subject.split(SEPARATE_RE);
        total = subject.length;
        
        for (; l--;) {
            name = items[++c];
            for (cl = total; cl--;) {
                if (name === subject[cl]) {
                    subject.splice(cl, 1);
                    total--;
                }
            }
        }
        
        return subject.join(' ');    
    }

export
    function xmlDecode(subject) {
        var textarea = TEXTAREA;
        var value = '';

        if (!string(subject)) {
            throw new Error(ERROR[1021]);
        }

        if (textarea) {
            textarea.innerHTML = subject;
            value = textarea.value;
        }

        textarea = null;
        return value;
    }
    
export
    function xmlEncode(subject) {
        
        if (!string(subject)) {
            throw new Error(ERROR[1021]);
        }

        return subject.replace(HTML_ESCAPE_CHARS_RE, htmlescapeCallback);
    }





