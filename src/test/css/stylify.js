'use strict';

describe(`Extracts CSS rules in element style attribute
        using stylify(element:DOM).`,
    () => {
        var libcore = global.libcore,
            libdom = global.libdom,
            stylify = libdom.stylify;

            var mockElement;

            beforeEach(() => {
                var doc = global.document;

                mockElement = doc.createElement('div');
                mockElement.id = "mock1";
                doc.body.appendChild(mockElement);

                libdom.stylize(mockElement, {
                    width: 400,
                    height: 400
                });
            });

            it(`1. Should not accept non dom [element] as first parameter
                and throws error instead.`,
                () => {
                    expect(() => stylify(99)).toThrow();
                    expect(() => stylify("Dom")).toThrow();
                    expect(() => stylify(true)).toThrow();
                    expect(() => stylify({ nodeName: "Div" })).toThrow();
                });

            it(`2. Should not throw if first parameter passed is a valid
                dom [element].`,
                () => {
                    expect(() => stylify(mockElement)).not.toThrow();
                    expect(() => stylify(mockElement)).not.toThrow();
                });

            it(`3. Should return an object type if stylify method is
                successfully called.`,
                () => {
                    expect(libcore.object(stylify(mockElement))).toBe(true);
                    expect(libcore.object(stylify(mockElement))).toBe(true);
                });

            it(`4. Should extract the styles from the provided first parameter
                [element].`,
                () => {
                    var styles = stylify(mockElement);

                    expect("width" in styles).toBe(true);
                    expect("height" in styles).toBe(true);
                });
    });
