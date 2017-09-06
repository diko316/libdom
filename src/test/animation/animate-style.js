'use strict';


describe('Animate DOM CSS rules having number, and color values using ' +
        'animateStyle(element:Node,' +
                    'styles:Object, ' +
                    '[type:String, ' +
                    'duration:Number]) method',
    () => {
        var libcore = global.libcore,
            libdom = global.libdom,
            animateStyle = libdom.animateStyle;
            
        var mockElement, mockStyle;
        
        beforeEach(() => {
            var doc = global.document;
            
            mockElement = doc.createElement('div');
            mockElement.id = "mock1";
            doc.body.appendChild(mockElement);
            
            libdom.stylize(mockElement, {
                'position': 'absolute',
                top: 0,
                left: 0,
                borderWidth: '0',
                padding: '0',
                margin: '0'
            });
            
            
            mockStyle = {
                top: 100,
                left: 100,
                width: 200,
                height: 200
            };
            
        });
        
        it('1. Should accept [element] DOM Node and [styles] ' +
           'transition Object leaving out [type] and [duration] parameters.',
           (done) => {
                expect(() => animateStyle(mockElement,
                                          mockStyle)).
                       not.toThrow();
                
                setTimeout(() => {
                    expect(mockElement.style.top).toBe('100px');
                    expect(mockElement.style.left).toBe('100px');
                    expect(mockElement.style.width).toBe('200px');
                    expect(mockElement.style.height).toBe('200px');
                    done();
                    
                }, 2000);
                
                
           });
        
        it('2. Should accept [element] DOM Node and [styles] ' +
           'transition Object with optional Easing String [type] parameters ' +
           'and leaving out [duration] parameters.',
           (done) => {
                expect(() => animateStyle(mockElement,
                                          mockStyle,
                                          'easeIn')).
                       not.toThrow();
                
                setTimeout(() => {
                    expect(mockElement.style.top).toBe('100px');
                    expect(mockElement.style.left).toBe('100px');
                    expect(mockElement.style.width).toBe('200px');
                    expect(mockElement.style.height).toBe('200px');
                    done();
                    
                }, 2000);
                
           });
        
        it('3. Should accept [element] DOM Node and [styles] ' +
           'transition Object with optional Easing String [type] and ' +
           'Seconds Number [duration] parameter.',
           (done) => {
                expect(() => animateStyle(mockElement,
                                          mockStyle,
                                          'easeIn',
                                          0.5)).
                       not.toThrow();
                
                setTimeout(() => {
                    expect(mockElement.style.top).toBe('100px');
                    expect(mockElement.style.left).toBe('100px');
                    expect(mockElement.style.width).toBe('200px');
                    expect(mockElement.style.height).toBe('200px');
                    done();
                    
                }, 2000);
                
           });
        
        it('4. Should return stop() Function when all parameters are valid.',
           () => {
                expect(libcore.method(animateStyle(mockElement,
                                                    mockStyle,
                                                    'easeIn',
                                                    0.5))).
                    toBe(true);
           });
        
        it('5. Should not accept non-DOM Node [element] parameter and ' +
           'throws an exception.',
           () => {
                expect(() => animateStyle(null,
                                            mockStyle,
                                            'easeIn',
                                            0.5)).
                    toThrow();
                expect(() => animateStyle(1,
                                            mockStyle,
                                            'easeIn',
                                            0.5)).
                    toThrow();
                expect(() => animateStyle({},
                                            mockStyle,
                                            'easeIn',
                                            0.5)).
                    toThrow();
                expect(() => animateStyle(new Date(),
                                            mockStyle,
                                            'easeIn',
                                            0.5)).
                    toThrow();
                expect(() => animateStyle([],
                                            mockStyle,
                                            'easeIn',
                                            0.5)).
                    toThrow();
           });
        
        it('6. Should not accept non Object [style] parameter and ' +
           'throws an exception.',
           () => {
                expect(() => animateStyle(mockElement,
                                            null,
                                            'easeIn',
                                            0.5)).
                    toThrow();
                expect(() => animateStyle(mockElement,
                                            1,
                                            'easeIn',
                                            0.5)).
                    toThrow();
                expect(() => animateStyle(mockElement,
                                            /test/,
                                            'easeIn',
                                            0.5)).
                    toThrow();
                expect(() => animateStyle(mockElement,
                                            new Date(),
                                            'easeIn',
                                            0.5)).
                    toThrow();
                    
                expect(() => animateStyle(mockElement,
                                            [],
                                            'easeIn',
                                            0.5)).
                    toThrow();
           });
        
        it('6. Should not accept non-String [easing] parameter and ' +
           'throws an exception.',
           () => {
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            null,
                                            0.5)).
                    toThrow();
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            1,
                                            0.5)).
                    toThrow();
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            /test/,
                                            0.5)).
                    toThrow();
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            new Date(),
                                            0.5)).
                    toThrow();
                    
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            [],
                                            0.5)).
                    toThrow();
           });
        
        it('7. Should not accept non-Number [duration] or less than or equal ' +
           'to zero parameter and throws an exception.',
           () => {
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            'easeIn',
                                            null)).
                    toThrow();
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            'easeIn',
                                            /test/)).
                    toThrow();
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            'easeIn',
                                            -100)).
                    toThrow();
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            'easeIn',
                                            {})).
                    toThrow();
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            'easeIn',
                                            new Date())).
                    toThrow();
                    
                expect(() => animateStyle(mockElement,
                                            mockStyle,
                                            'easeIn',
                                            [])).
                    toThrow();
           });
    });