'use strict';

describe(`Extracts CSS computed styles of element listed in ruleNames
        using computedStyle(element:Node, ruleNames:String|Array).`,
    () => {
        var libcore = global.libcore,
            libdom = global.libdom,
            computedStyle = libdom.computedStyle;

            var mockElement;

            beforeEach(() => {
                var doc = global.document;

                mockElement = doc.createElement('div');
                mockElement.id = "mock1";
                doc.body.appendChild(mockElement);

                libdom.stylize(mockElement, {
                    width: 300,
                    height: 400,
                    opacity: 0.7,
                    float: 'left'
                });
            });

            it(`1. Should not accept non dom [element] as first parameter
                and throws error instead.`,
                () => {
                    expect(() => computedStyle(99)).toThrow();
                    expect(() => computedStyle("Dom")).toThrow();
                    expect(() => computedStyle(true)).toThrow();
                    expect(() => computedStyle({ nodeName: "Div" })).toThrow();
                });

            it(`2. Should not throw if first parameter passed is a valid
                dom [element].`,
                () => {
                    expect(() => computedStyle(mockElement)).not.toThrow();
                    expect(() => computedStyle(mockElement)).not.toThrow();
                });

            it(`3. Should accept non String or Array as second parameter
                [ruleNames] but ignores it.`,
                () => {
                    expect(() => computedStyle(mockElement,
                        { width: 600 })).not.toThrow();
                    expect(() => computedStyle(mockElement,
                        { background: 'black' })).
                        not.toThrow();
                    expect(() => computedStyle(mockElement, false)).
                        not.toThrow();
                    expect(() => computedStyle(mockElement, null)).
                        not.toThrow();
                    expect(() => computedStyle(mockElement, undefined)).
                        not.toThrow();

                    expect(computedStyle(mockElement, 'width').width).
                        toEqual('300px');

                    expect(computedStyle(mockElement,
                        'height').height).toEqual('400px');
                });

            it(`4. Should return the rule name with a value of "undefined"
                if it's not found from the provided second
                parameter [ruleNames].`,
                () => {
                    expect(computedStyle(mockElement, 'deep').deep).
                        toBe(undefined);
                    expect(computedStyle(mockElement, 'contrast').contrast).
                        toBe(undefined);

                    expect(computedStyle(mockElement, ['up', 'down']).up).
                        toBe(undefined);
                    expect(computedStyle(mockElement, ['up', 'down']).down).
                        toBe(undefined);
                });

            it(`5. Should return an object type if computedStyle method is
                successfully called.`,
                () => {
                    expect(libcore.object(computedStyle(mockElement)));
                    expect(libcore.object(
                        computedStyle(mockElement, 'opacity')));
                    expect(libcore.object(
                        computedStyle(mockElement, ['width', 'height'])));
                });

            it(`6. Should return the rule name(s) based on the matching
                second parameter [ruleNames] provided.`,
                () => {
                    expect('background' in
                        computedStyle(mockElement, 'background')).
                        toBe(true);
                    expect('width' in
                        computedStyle(mockElement, ['width', 'height'])).
                        toBe(true);
                    expect('height' in
                        computedStyle(mockElement, ['width', 'height'])).
                        toBe(true);
                });
    });
