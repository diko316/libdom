'use strict';

describe(`Set or get the document element's offset (x|y) using
        offset(element:DOM, x:Number|String, y:Number|String) method.`,
    () => {
        var libcore = global.libcore,
            libdom = global.libdom,
            offset = libdom.offset;

        var mockElement,
            top = 100,
            left = 100;

        beforeEach(() => {
            var doc = global.document;

            mockElement = doc.createElement('div');
            mockElement.id = "mock1";
            doc.body.appendChild(mockElement);

            libdom.stylize(mockElement, {
                'position': 'absolute',
                top: top,
                left: left,
            });

        });

        it(`1. Should not accept non dom [element] as first parameter
            and throws error instead.`,
            () => {
                expect(() => offset(99)).toThrow();
                expect(() => offset("Dom")).toThrow();
                expect(() => offset(true)).toThrow();
                expect(() => offset({ nodeName: "Div" })).toThrow();
            });

        it(`2. Should not throw if first parameter passed is a valid
            dom [element].`,
            () => {
                expect(() => offset(mockElement)).not.toThrow();
            });

        it(`3. Should not accept non Number or String for second
            parameter [x] and throws error instead.`,
            () => {
                expect(() => offset(mockElement, { x: 100 })).toThrow();
            });

        it(`4. Should throw an error if second parameter [x] is supplied
            but the third parameter [y] is not.`,
            () => {
                expect(() => offset(mockElement, 10)).toThrow();
                expect(() => offset(mockElement, "30px")).toThrow();
            });

        it(`5. Should not accept non Number or String for third
            parameter [y] and throws error instead.`,
            () => {
                expect(() => offset(mockElement, 100, { y: 100 })).toThrow();
            });

        it(`6. Should throw an error if third parameter [y] is supplied
            but the second parameter [x] is not a valid parameter.`,
            () => {
                expect(() => offset(mockElement, undefined, 10)).
                                toThrow();
                expect(() => offset(mockElement, new Date(), "60px")).
                                toThrow();
                expect(() => offset(mockElement, { x: 100 }, 100)).
                                toThrow();
            });

        it(`7. Should return an object type if both second and third is a
            valid parameter.`,
            () => {
                expect(libcore.object(offset(mockElement, 10, 10)))
                    .toBe(true);
                expect(libcore.object(offset(mockElement, "30px", "70px")))
                    .toBe(true);
                expect(libcore.object(offset(mockElement, "30px", 100)))
                    .toBe(true);
            });

        it(`8. Should return an array of offset [x, y] if both second and third
            parameter are not provided.`,
            () => {
                expect(libcore.array(offset(mockElement))).toBe(true);
                expect(offset(mockElement)[0]).toBe(top);
                expect(offset(mockElement)[1]).toBe(left);
            });
    });
