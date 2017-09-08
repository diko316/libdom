'use strict';

describe(`Decodes HTML entities in String subject into HTML special
        characters returning the original/raw String value of
        the subject using xmlDecode(subject:String).`,
    () => {
        var xmlDecode = global.libdom.xmlDecode;

        it(`1. Should not accept non String as first parameter [subject]
            and throws an error instead.`,
            () => {
                expect(() => xmlDecode(99)).toThrow();
                expect(() => xmlDecode([99])).toThrow();
                expect(() => xmlDecode({ tag: "<h1></h1>" })).toThrow();
                expect(() => xmlDecode(undefined)).toThrow();
                expect(() => xmlDecode(false)).toThrow();
            });

        it(`2. Should accept String as first parameter [subject] and returns
            the decoded value.`,
            () => {
                expect(xmlDecode('&lt;h1&gt;Title&lt;/h1&gt;')).
                    toBe('<h1>Title</h1>');
                expect(xmlDecode('&lt;a&#x20;href=&quot;/home&quot;&#x20;title='+
                        '&quot;Home&quot;&gt;Home&lt;/a&gt;')).
                    toBe('<a href="/home" title="Home">Home</a>');
                expect(xmlDecode('Just&#x20;a&#x20;string!')).
                    toBe(`Just a string!`);
            });
    });
