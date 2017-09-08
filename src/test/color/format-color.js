'use strict';

describe(`Formats Number presentation [colorValue] into String color 
         formatted with [type] parameter using 
         formatColor(colorValue:Number, type:String) method`,
    () => {
        var format = global.libdom.formatColor;
        
        it(`1. Should not accept non-Number [colorValue] parameter and 
           throws error instead`,
           () => {
                expect(() => format(null, 'hex')).toThrow();
                expect(() => format(/number/, 'hex')).toThrow();
                expect(() => format(new Date(), 'hex')).toThrow();
                expect(() => format('test', 'hex')).toThrow();
           });
        
        it(`2. Should not accept non-String or empty String[type] parameter 
           and throws error instead`,
           () => {
                expect(() => format(12536, null)).toThrow();
                expect(() => format(12536, 1)).toThrow();
                expect(() => format(12536, new Date())).toThrow();
                expect(() => format(12536, /test/)).toThrow();
                expect(() => format(12536, '')).toThrow();
           });
        
        it(`3. Should accept invalid String [type] parameter and
           returns null`,
           () => {
                expect(format(12536, 'unshwa?')).toBe(null);
                expect(format(12536, 'cmyk')).toBe(null);
                expect(format(12536, 'hsb')).toBe(null);
                expect(format(12536, '#hexni')).toBe(null);
           });
        
        it(`4. Should accept Number [colorValue] and "rgb" String [type] 
           parameters and returns String "rgb" presentation of [colorValue].`,
           () => {
                expect(format(842188800, 'rgb')).
                    toBe('rgb(255,0,0)');
                expect(format(842188920, 'rgb')).
                    toBe('rgb(0,255,0)');
                expect(format(842189040, 'rgb')).
                    toBe('rgb(0,0,255)');
           });
        
        it(`5. Should accept Number [colorValue] and "rgba" String [type]
           parameters and returns String "rgba" presentation of [colorValue].`,
           () => {
                expect(format(422758400, 'rgba')).
                    toBe('rgba(255,0,0,0.5)');
                expect(format(842188920, 'rgba')).
                    toBe('rgba(0,255,0,1)');
                expect(format(842189040, 'rgba')).
                    toBe('rgba(0,0,255,1)');
           });
        
        it(`6. Should accept Number [colorValue] and "hsl" String [type] 
           parameters and returns String "hsl" presentation of [colorValue].`,
           () => {
                expect(format(842188800, 'hsl')).
                    toBe('hsl(0,100%,50%)');
                expect(format(842188920, 'hsl')).
                    toBe('hsl(120,100%,50%)');
                expect(format(842189040, 'hsl')).
                    toBe('hsl(240,100%,50%)');
           });
        
        it(`7. Should accept Number [colorValue] and "hsla" String [type] 
           parameters and returns String "hsla" presentation of [colorValue].`,
           () => {
                expect(format(422758400, 'hsla')).
                    toBe('hsla(0,100%,50%,0.5)');
                expect(format(842188920, 'hsla')).
                    toBe('hsla(120,100%,50%,1)');
                expect(format(842189040, 'hsla')).
                    toBe('hsla(240,100%,50%,1)');
           });
        
        it(`8. Should accept Number [colorValue] and "hex" String [type]
           parameters and returns String "hex" presentation of [colorValue].`,
           () => {
                expect(format(842188800, 'hex')).
                    toBe('#ff0000');
                expect(format(842188920, 'hex')).
                    toBe('#00ff00');
                expect(format(842189040, 'hex')).
                    toBe('#0000ff');
           });
    });