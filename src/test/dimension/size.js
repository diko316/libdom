'use strict';

describe(`Set or get the document element's size (width|height) using
        size(element:DOM, width:Number|String, height:Number|String) method.`,
    () => {
        var libcore = global.libcore,
            libdom = global.libdom,
            size = libdom.size;

        var mockElement,
            width = 300,
            height = 400;

        beforeEach(() => {
            var doc = global.document;

            mockElement = doc.createElement('div');
            mockElement.id = "mock1";
            doc.body.appendChild(mockElement);

            libdom.stylize(mockElement, {
                width: width,
                height: height
            });

        });

        it(`1. Should not accept non dom [element] as first parameter
            and throws error instead.`,
            () => {
                expect(() => size(99)).toThrow();
                expect(() => size("Dom")).toThrow();
                expect(() => size(true)).toThrow();
                expect(() => size({ nodeName: "Div" })).toThrow();
            });

        it(`2. Should not throw if first parameter passed is a valid
            dom [element].`,
            () => {
                expect(() => size(mockElement)).not.toThrow();
            });

        it(`3. Should not accept non Number or String for second
            parameter [x] and throws error instead.`,
            () => {
                expect(() => size(mockElement, { x: 400 })).toThrow();
            });

        it(`4. Should throw an error if second parameter [width] is supplied
            but the third parameter [height] is not.`,
            () => {
                expect(() => size(mockElement, 200)).toThrow();
                expect(() => size(mockElement, "300px")).toThrow();
            });

        it(`5. Should not accept non Number or String for third
            parameter [height] and throws error instead.`,
            () => {
                expect(() => size(mockElement, 600, { y: 400 })).toThrow();
            });

        it(`6. Should throw an error if third parameter [height] is supplied
            but the second parameter [width] is not a valid parameter.`,
            () => {
                expect(() => size(mockElement, undefined, 300)).
                                toThrow();
                expect(() => size(mockElement, new Date(), "600px")).
                                toThrow();
                expect(() => size(mockElement, { x: 300 }, 400)).
                                toThrow();
            });

        it(`7. Should return an object type if both second and third is a
            valid parameter.`,
            () => {
                expect(libcore.object(size(mockElement, 500, 400)))
                    .toBe(true);
                expect(libcore.object(size(mockElement, "300px", "700px")))
                    .toBe(true);
                expect(libcore.object(size(mockElement, "300px", 600)))
                    .toBe(true);
            });

        it(`8. Should return an array of offset [x, y] if both second and third
            parameter are not provided.`,
            () => {
                expect(libcore.array(size(mockElement))).toBe(true);
                expect(size(mockElement)[0]).toBe(width);
                expect(size(mockElement)[1]).toBe(height);
            });
    });
