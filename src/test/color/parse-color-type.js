'use strict';


describe(`Retrieves String color format info [type:String,
                                            hexadecimal:Boolean,
                                            items:String|Array(String)]
        from String [subject] using parseType(subject:String) method.`,
    () => {
        var lib = global.libdom,
            type = lib.parseColorType;
        
        it(`1. Should not accept non String [subject] parameter and
           throws error instead.`,
           () => {
                expect(() => type(null)).toThrow();
                expect(() => type(1)).toThrow();
                expect(() => type(new Date())).toThrow();
                expect(() => type({})).toThrow();
           });
        
        it(`2. Should accept invalid color String [subject] parameter and
           returns null.`,
           () => {
                expect(type('buang')).toBe(null);
                expect(type('#098-x-l')).toBe(null);
                expect(type('hsl()')).toBe(null);
                expect(type('rgb(x2)')).toBe(null);
           });
        
        it(`3. Should accept valid color String [subject] parameter and
           returns Array color information.`,
           () => {
                expect(type('rgba(255, 0,1, .5)')).
                    toEqual(['rgba', false, ['255', '0', '1', '.5']]);
                expect(type('hsl(120, 50%, 20%)')).
                    toEqual(['hsl', false, ['120', '50%', '20%']]);
                    
                expect(type('#f00')).
                    toEqual(['hex', true, 'ff0000']);
                    
                expect(type('#00ff00')).
                    toEqual(['hex', true, '00ff00']);
           });
    });