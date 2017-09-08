'use strict';

describe(`Set or get the document element's size (width|height) using
        size(element:DOM, width:Number|String, height:Number|String) method.`,
    () => {
        var size = global.libdom.size,
            libcore = global.libcore;

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

        it(`3. Should not set non Number or String as second or third
            parameter.`,
            () => {
                expect(() => size(mockElement,
                                { width: 100 }, { height: 200 })).
                                not.toThrow();

                expect(size(mockElement)[0]).toBe(width);
                expect(size(mockElement)[1]).toBe(height);
            });

        it(`4. Should return an Object type if second or third parameter
            is set.`,
            () => {
                expect(libcore.object(
                    size(mockElement, 600, 600))).
                    toBe(true);
                expect(libcore.object(
                    size(mockElement, "400", "450"))).
                    toBe(true);
                expect(libcore.object(
                    size(mockElement, "350px", "200px"))).
                    toBe(true);
            });

        it(`5. Should get the width and height of an element and return as an
            Array type if second or third parameter is not set.`,
            () => {
                expect(libcore.array(size(mockElement))).toBe(true);
                expect(size(mockElement)[0]).toBe(width);
                expect(size(mockElement)[1]).toBe(height);
            });

    });
