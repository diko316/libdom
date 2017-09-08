'use strict';

describe(`Set or get the document element's scroll offset using
        scroll(element:DOM, x:Number|String, y:Number|String).`,
    () => {
        var libcore = global.libcore,
            scroll = global.libdom.scroll;

        var mockElement;

        beforeEach(() => {
            var doc = global.document;

            mockElement = doc.createElement('div');
            mockElement.id = "mock1";
            doc.body.appendChild(mockElement);
        });

        it(`1. Should not accept non dom [element] as first parameter
            and throws error instead.`,
            () => {
                expect(() => scroll(99)).toThrow();
                expect(() => scroll("Dom")).toThrow();
                expect(() => scroll(true)).toThrow();
                expect(() => scroll({ nodeName: "Div" })).toThrow();
            });

        it(`2. Should not throw if first parameter passed is a valid
            dom [element].`,
            () => {
                expect(() => scroll(mockElement)).not.toThrow();
            });

        it(`3. Should return an array type if first parameter is a valid
            dom [element].`,
            () => {
                expect(libcore.array(scroll(mockElement))).toBe(true);
            });
    });
