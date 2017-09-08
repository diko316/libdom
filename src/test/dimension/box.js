'use strict';

describe(`Set or get the document element's offset (x|y) or size (width|height) using
        box(element:DOM, x:Number|String, y:Number|String, width:Number|String,
        height:Number|String) method.`,
    () => {
        var box = global.libdom.box,
            libcore = global.libcore;

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

        it(`3. Should not set non Number or String as second up to the
            fifth parameter.`,
            () => {
                expect(() => box(mockElement,
                                { x: 10 }, { y: 10 },
                                { width: 100 }, { height: 200 })).
                                not.toThrow();

                expect(box(mockElement)[0]).toBe(top);
                expect(box(mockElement)[1]).toBe(left);
                expect(box(mockElement)[4]).toBe(width);
                expect(box(mockElement)[5]).toBe(height);
            });

        it(`4. Should return an Object type if at least a second up to fifth
            parameter is set.`,
            () => {
                expect(libcore.object(
                    box(mockElement, "30px", "50px"))).
                    toBe(true);
                expect(libcore.object(
                    box(mockElement, "30px", "50px", 600, 600))).
                    toBe(true);
            });

        it(`5. Should get offset (x and y) and size (width and height) of an
            element and return as an Array type if at least a second up to fifth
            parameter is not set.`,
            () => {
                expect(libcore.array(box(mockElement))).toBe(true);
                expect(box(mockElement)[0]).toBe(top);
                expect(box(mockElement)[1]).toBe(left);
                expect(box(mockElement)[4]).toBe(width);
                expect(box(mockElement)[5]).toBe(height);
            });

    });
