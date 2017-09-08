'use strict';

describe(`Removes classNames (or Array of classNames) attached to element.
        classNames (or Array of classNames) will not be removed if it doesn’t
        exist in “class” attribute of element using
        removeClass(element: Node, classNames: String|Array).`,
        () => {
            var libcore = global.libcore,
                libdom = global.libdom,
                addClass = libdom.addClass,
                removeClass = libdom.removeClass;

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
                    expect(() => removeClass(99)).toThrow();
                    expect(() => removeClass("Dom")).toThrow();
                    expect(() => removeClass(true)).toThrow();
                    expect(() => removeClass({ nodeName: "Div" })).toThrow();
                });

            it(`2. Should not throw if first parameter passed is a valid
                dom [element].`,
                () => {
                    expect(() => removeClass(mockElement, 'black')).not.toThrow();
                    expect(() => removeClass(mockElement, ['red'])).not.toThrow();
                });

            it(`3. Should not accept non String or Array as second parameter
                [classNames] and throws error instead.`,
                () => {
                    expect(() => removeClass(mockElement, 99)).toThrow();
                    expect(() => removeClass(mockElement, { name: 'black' })).
                        toThrow();
                    expect(() => removeClass(mockElement, false)).toThrow();
                    expect(() => removeClass(mockElement, null)).toThrow();
                    expect(() => removeClass(mockElement, undefined)).
                        toThrow();
                });

            it(`4. Should remove class(s) name(s) to an element if second parameter
                    passed is a valid String or Array of class names.`,
                () => {
                    addClass(mockElement, 'blue red black gray');

                    removeClass(mockElement, 'blue');
                    expect(mockElement.getAttribute('class')).toEqual('red black gray');

                    removeClass(mockElement, ['red', 'gray']);
                    expect(mockElement.getAttribute('class')).toEqual('black');
                });

            it(`5. Should return an object type if the call to addClass method
                    is successful.`,
                () => {
                    addClass(mockElement, 'black');
                    expect(libcore.object(removeClass(mockElement, 'black'))).
                        toBe(true);
                });
        });
