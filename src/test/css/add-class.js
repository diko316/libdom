'use strict';

describe(`Adds classNames (or Array of classNames) into element
        using addClass(element:Node, classNames:String|Array).`,
        () => {
            var libcore = global.libcore,
                addClass = global.libdom.addClass;

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
                    expect(() => addClass(99)).toThrow();
                    expect(() => addClass("Dom")).toThrow();
                    expect(() => addClass(true)).toThrow();
                    expect(() => addClass({ nodeName: "Div" })).toThrow();
                });

            it(`2. Should not throw if first parameter passed is a valid
                dom [element].`,
                () => {
                    expect(() => addClass(mockElement, 'black')).not.toThrow();
                    expect(() => addClass(mockElement, ['red'])).not.toThrow();
                });

            it(`3. Should not accept non String or Array as second parameter
                [classNames] and throws error instead.`,
                () => {
                    expect(() => addClass(mockElement, 99)).toThrow();
                    expect(() => addClass(mockElement, { name: 'black' })).
                        toThrow();
                    expect(() => addClass(mockElement, false)).toThrow();
                    expect(() => addClass(mockElement, null)).toThrow();
                    expect(() => addClass(mockElement, undefined)).toThrow();
                });

            it(`4. Should add a class name to an element if second parameter
                    passed is a valid String or Array of class names.`,
                () => {
                    addClass(mockElement, 'blue');
                    expect(mockElement.getAttribute('class')).
                        toEqual('blue');

                    addClass(mockElement, ['red', 'black']);
                    expect(mockElement.getAttribute('class')).
                        toEqual('blue red black');
                });

            it(`5. Should return an object type if the call to addClass method
                    is successful.`,
                () => {
                    expect(libcore.object(addClass(mockElement, 'red'))).
                        toBe(true);
                });
        });
