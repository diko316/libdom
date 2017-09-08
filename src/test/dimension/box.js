'use strict';

describe(`Set or get the document element's offset (x|y) or size (width|height) using
        box(element:DOM, x:Number|String, y:Number|String, width:Number|String,
        height:Number|String) method.`,
    () => {
        var libcore = global.libcore,
            libdom = global.libdom,
            box = libdom.box;

        var mockElement,
            top = 100,
            left = 100,
            width = 400,
            height = 300;

        beforeEach(() => {
            var doc = global.document;

            mockElement = doc.createElement('div');
            mockElement.id = "mock1";
            doc.body.appendChild(mockElement);

            libdom.stylize(mockElement, {
                'position': 'absolute',
                top: top,
                left: left,
                width: width,
                height: height
            });

        });

        it(`1. Should not accept non dom [element] as first parameter
            and throws error instead.`,
            () => {
                expect(() => box(99)).toThrow();
                expect(() => box("Dom")).toThrow();
                expect(() => box(true)).toThrow();
                expect(() => box({ nodeName: "Div" })).toThrow();
            });

        it(`2. Should not throw if first parameter passed is a valid
            dom [element].`,
            () => {
                expect(() => box(mockElement)).not.toThrow();
            });

        it(`3. Should not accept non Number or String for the second up to
            fifth parameter and throws an error instead.`,
            () => {
                expect(() => box(mockElement,
                                undefined,
                                new Date(),
                                { width: 400 },
                                { height: 300 })).toThrow();
            });

        it(`4. Should throw an error if second to fifth parameter is not
            provided completely.`,
            () => {
                expect(() => box(mockElement, undefined)).toThrow();
                expect(() => box(mockElement, 100, { y: 100 })).toThrow();
                expect(() => box(mockElement, 100, "100px", 300)).toThrow();
            });

        it(`5. Should return an array of the element's offset (x, y) and size
            (width, height) if only the first parameter is provided.`,
            () => {
                expect(libcore.array(box(mockElement))).toBe(true);
                expect(box(mockElement)[0]).toBe(top);
                expect(box(mockElement)[1]).toBe(left);
                expect(box(mockElement)[4]).toBe(width);
                expect(box(mockElement)[5]).toBe(height);
            });
    });
