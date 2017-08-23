'use strict';


describe('Traverse displacement of Object [from] until it reaches ' +
         'Object [to] running [callback] on each transition using ' +
         'transition(callback:Function, ' +
                    'from:Object,' +
                    'to:Object,' +
                    'type:String,' +
                    'duration:Number) method',
    () => {
        var transition = global.libdom.transition,
            from = {
                x: 0,
                y: 0
            },
            to = {
                x: 100,
                y: -20
            };
            
        function empty() {
            
        }
        
        it('1. Should not accept non-Function [callback] parameter and ' +
           'throw an error',
           () => {
                expect(() => transition(null, from, to, 'easeOut', 1)).
                    toThrow();
                expect(() => transition({}, from, to, 'easeOut', 1)).
                    toThrow();
                expect(() => transition(false, from, to, 'easeOut', 1)).
                    toThrow();
                expect(() => transition(new Date(), from, to, 'easeOut', 1)).
                    toThrow();
                expect(() => transition(1, from, to, 'easeOut', 1)).
                    toThrow();
            });
        
        it('2. Should not accept non-Object [from] parameter and ' +
           'throw an error',
           () => {
                expect(() => transition(empty, null, to, 'easeOut', 1)).
                    toThrow();
                expect(() => transition(empty, /test/, to, 'easeOut', 1)).
                    toThrow();
                expect(() => transition(empty, false, to, 'easeOut', 1)).
                    toThrow();
                expect(() => transition(empty, new Date(), to, 'easeOut', 1)).
                    toThrow();
                expect(() => transition(empty, 1, to, 'easeOut', 1)).
                    toThrow();
            });
        
        it('3. Should not accept non-Object [to] parameter and ' +
           'throw an error',
           () => {
                expect(() => transition(empty, from, null, 'easeOut', 1)).
                    toThrow();
                expect(() => transition(empty, from, /test/, 'easeOut', 1)).
                    toThrow();
                expect(() => transition(empty, from, false, 'easeOut', 1)).
                    toThrow();
                expect(() => transition(empty, from, new Date(), 'easeOut', 1)).
                    toThrow();
                expect(() => transition(empty, from, 1, 'easeOut', 1)).
                    toThrow();
            });
        
        it('4. Should not accept non-String or non-existent [type] parameter ' +
           'and throw an error',
           () => {
                expect(() => transition(empty, from, to, null, 1)).
                    toThrow();
                expect(() => transition(empty, from, to, /test/, 1)).
                    toThrow();
                expect(() => transition(empty, from, to, false, 1)).
                    toThrow();
                expect(() => transition(empty, from, to, new Date(), 1)).
                    toThrow();
                expect(() => transition(empty, from, to, 'buang', 1)).
                    toThrow();
                expect(() => transition(empty, from, to, '', 1)).
                    toThrow();
            });
        
        it('5. Should not accept non-Number [duration] parameter ' +
           'and throw an error',
           () => {
                expect(() => transition(empty, from, to, 'easeOut', null)).
                    toThrow();
                expect(() => transition(empty, from, to, 'easeOut', /test/)).
                    toThrow();
                expect(() => transition(empty, from, to, 'easeOut', false)).
                    toThrow();
                expect(() => transition(empty, from, to, 'easeOut', new Date())).
                    toThrow();
                expect(() => transition(empty, from, to, 'easeOut', 'buang')).
                    toThrow();
                expect(() => transition(empty, from, to, 'easeOut', NaN)).
                    toThrow();
            });
    });