'use strict';


describe('Inspect Mixed [defaultView] if it is a "Window" Object using ' +
         'isView(defaultView:Mixed) method',
    () => {
        var isView = global.libdom.isView;
        
        it('1. Should accept any [defaultView] parameter and returns true ' +
           'if it is an instance of a "Window" Object.',
           () => {
                expect(() => isView(global)).not.toThrow();
                expect(isView(global)).toBe(true);
            
                expect(() => isView(global.window)).not.toThrow();
                expect(isView(global.window)).toBe(true);
            
           });
        
        it('2. Should accept any [defaultView] parameter and returns false ' +
           'if it is not an instance of a "Window" Object.',
           () => {
                
                expect(() => isView(null)).not.toThrow();
                expect(isView(null)).toBe(false);
                
                expect(() => isView(/test/)).not.toThrow();
                expect(isView(/test/)).toBe(false);
                
                expect(() => isView(new Date())).not.toThrow();
                expect(isView(new Date())).toBe(false);
                
                expect(() => isView(1)).not.toThrow();
                expect(isView(1)).toBe(false);
                
                expect(() => isView(undefined)).not.toThrow();
                expect(isView(undefined)).toBe(false);
            
           });
        
    });