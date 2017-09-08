'use strict';

describe(`Applies CSS rules Object to element style attribute
        using stylize(element:Node, rules:String|Object, value:Mixed).`,
    () => {
        var libcore = global.libcore,
            libdom = global.libdom,
            stylize = libdom.stylize,
            computedStyle = libdom.computedStyle;

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
                    expect(() => stylize(99)).toThrow();
                    expect(() => stylize("Dom")).toThrow();
                    expect(() => stylize(true)).toThrow();
                    expect(() => stylize({ nodeName: "Div" })).toThrow();
                });

            it(`2. Should not throw if first parameter passed is a valid
                dom [element].`,
                () => {
                    expect(() => stylize(mockElement,
                        { color: 'red' })).not.toThrow();
                    expect(() => stylize(mockElement,
                        'width:100px')).not.toThrow();
                });

            it(`3. Should not accept non String or Object as second parameter
                [rules].`,
                () => {
                    expect(() => stylize(mockElement, 99)).toThrow();
                    expect(() => stylize(mockElement, ['background','red'])).
                        toThrow();
                    expect(() => stylize(mockElement, false)).toThrow();
                    expect(() => stylize(mockElement, null)).toThrow();
                    expect(() => stylize(mockElement, undefined)).toThrow();
                });

            it(`4. Should return an object type if stylize method is
                successfully called.`,
                () => {
                    expect(libcore.object(stylize(mockElement,
                            { width: '300px' }))).toBe(true);
                    expect(libcore.object(stylize(mockElement,
                            'height:300px'))).toBe(true);
                });

            it(`5. Should apply the styles from the provided second parameter
                [rules] for the element.`,
                () => {
                    stylize(mockElement, {
                        width: 400,
                        height: 500
                    });

                    expect(computedStyle(mockElement, 'width').width).
                        toEqual('400px');
                    expect(computedStyle(mockElement, 'height').height).
                        toEqual('500px');
                });
    });
