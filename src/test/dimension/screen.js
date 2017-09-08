'use strict';

describe(`Returns Array containing x, y scroll offsets and width and height
        of the dom viewport using screen(element:DOM).`,
    () => {
        var libcore = global.libcore,
            screenInfo = global.libdom.screen;

        var mockElement;

        beforeEach(() => {
            var doc = global.document;

            mockElement = doc.createElement('div');
            mockElement.id = "mock1";
            doc.body.appendChild(mockElement);
        });

        it(`1. Should return an array type if first parameter is a valid
            dom [element] or without a parameter passed.`,
            () => {
                expect(libcore.array(screenInfo(mockElement))).toBe(true);
                expect(libcore.array(screenInfo())).toBe(true);
            });
    });
