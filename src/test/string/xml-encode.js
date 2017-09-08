'use strict';

describe(`Encode HTML special characters in String subject into HTML
        entity returning an HTML safe String for HTMLElement.innerHTML
        operations using xmlEncode(subject:String).`,
    () => {
        var xmlEncode = global.libdom.xmlEncode;

        it(`1. Should not accept non String as first parameter [subject]
            and throws an error instead.`,
            () => {
                expect(() => xmlEncode(99)).toThrow();
                expect(() => xmlEncode([99])).toThrow();
                expect(() => xmlEncode({ tag: "<h1></h1>" })).toThrow();
                expect(() => xmlEncode(undefined)).toThrow();
                expect(() => xmlEncode(false)).toThrow();
            });

        it(`2. Should accept String as first parameter [subject] and returns
            the encoded value.`,
            () => {
                expect(xmlEncode('<h1>Title</h1>')).
                    toBe('&lt;h1&gt;Title&lt;/h1&gt;');
                expect(xmlEncode('<a href="/home" title="Home">Home</a>')).
                    toBe('&lt;a&#x20;href=&quot;/home&quot;&#x20;title='+
                            '&quot;Home&quot;&gt;Home&lt;/a&gt;');
                expect(xmlEncode('Just a string!')).
                    toBe(`Just&#x20;a&#x20;string!`);
            });
    });
