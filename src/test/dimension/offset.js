'use strict';

describe(`Set or get the document element's offset (x|y) using
        offset(element:DOM, x:Number|String, y:Number|String) method.`,
    () => {
        var offset = global.libdom.offset,
            libcore = global.libcore;

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

        it(`3. Should not set non Number or String as second or third
            parameter.`,
            () => {
                expect(() => offset(mockElement,
                                { x: 10 }, { y: 10 })).
                                not.toThrow();

                expect(offset(mockElement)[0]).toBe(top);
                expect(offset(mockElement)[1]).toBe(left);
            });

        it(`4. Should return an Object type if second or third parameter
            is set.`,
            () => {
                expect(libcore.object(
                    offset(mockElement, 10, 10))).
                    toBe(true);
                expect(libcore.object(
                    offset(mockElement, "30px", "50px"))).
                    toBe(true);
                expect(libcore.object(
                    offset(mockElement, "100", "120"))).
                    toBe(true);
            });

        it(`5. Should get the x and y offset of an element and return as an
            Array type if second or third parameter is not set.`,
            () => {
                expect(libcore.array(offset(mockElement))).toBe(true);
                expect(offset(mockElement)[0]).toBe(top);
                expect(offset(mockElement)[1]).toBe(left);
            });

    });
