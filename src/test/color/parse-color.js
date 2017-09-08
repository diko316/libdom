'use strict';


describe(`Returns integer representation of color from String [subject]
         using parseColor(subject:String) method.`,
    () => {
        var lib = global.libdom;
        
        it(`1. Should not accept non-String [subject] and throws error
            instead.`,
           () => {
                expect(() => lib.parseColor(null)).toThrow();
                expect(() => lib.parseColor(new Date())).toThrow();
                expect(() => lib.parseColor(1)).toThrow();
                expect(() => lib.parseColor({})).toThrow();
           });
        
        it(`2. Should accept String [subject] containing invalid color format
           and returns null.`,
           () => {
                expect(lib.parseColor('buang')).toBe(null);
                expect(lib.parseColor('YYYY-MM-DD')).toBe(null);
                expect(lib.parseColor('#-0-fa')).toBe(null);
                expect(lib.parseColor('rgba()')).toBe(null);
           });
        
        it(`3. Should accept String [subject] in rgb color format and
           returns an integer presentation of [subject] parameter.`,
           () => {
                // red
                expect(lib.parseColor('rgb(255, 0, 0)')).
                    toBe(842188800);
                // green
                expect(lib.parseColor('rgb(0, 255, 0)')).
                    toBe(842188920);
                // blue
                expect(lib.parseColor('rgb(0, 0, 255)')).
                    toBe(842189040);
           });
        
        it(`4. Should accept String [subject] in rgba color format and 
           returns an integer presentation of [subject] parameter.`,
           () => {
                // red
                expect(lib.parseColor('rgba(255, 0, 0, 1)')).
                    toBe(842188800);
                // green
                expect(lib.parseColor('rgba(0, 255, 0, 100%)')).
                    toBe(842188920);
                // blue
                expect(lib.parseColor('rgba(0, 0, 255, 1)')).
                    toBe(842189040);
           });
        
        it(`5. Should accept String [subject] in hexadecimal color format 
           (in #fff or #ffffff format)
           and returns an integer presentation of [subject] parameter.`,
           () => {
                // red
                expect(lib.parseColor('#f00')).
                    toBe(842188800);
                expect(lib.parseColor('#ff0000')).
                    toBe(842188800);
                    
                // green
                expect(lib.parseColor('#0f0')).
                    toBe(842188920);
                expect(lib.parseColor('#00ff00')).
                    toBe(842188920);
                    
                // blue
                expect(lib.parseColor('#00f')).
                    toBe(842189040);
                expect(lib.parseColor('#0000ff')).
                    toBe(842189040);
           });
        
        it(`6. Should accept String [subject] in hsl color format 
           (in #fff or #ffffff format)
           and returns an integer presentation of [subject] parameter.`,
           () => {
                // red
                expect(lib.parseColor('hsl(0,100%,50%)')).
                    toBe(842188800);
                    
                // green
                expect(lib.parseColor('hsl(120,100%,50%)')).
                    toBe(842188920);
                    
                // blue
                expect(lib.parseColor('hsl(240,100%,50%)')).
                    toBe(842189040);
           });
        
        it(`7. Should accept String [subject] in hsla color format
           (in #fff or #ffffff format)
           and returns an integer presentation of [subject] parameter.`,
           () => {
                // red
                expect(lib.parseColor('hsla(0,100%,50%, 100%)')).
                    toBe(842188800);
                    
                // green
                expect(lib.parseColor('hsla(120,100%,50%, 1)')).
                    toBe(842188920);
                    
                // blue
                expect(lib.parseColor('hsla(240,100%,50%, 1)')).
                    toBe(842189040);
           });
        
    });