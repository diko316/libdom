'use strict';


describe(`Detaches event handler on supported browser [observable] using
        un(observable:Observable,
            type:String,
            handler:Function
            [, context:Mixed]) method.`,
    () => {
        var on = global.libdom.on,
            un = global.libdom.un,
            method = global.libcore.method,
            doc = global.document,
            deregisters = [];
        
        
        beforeEach(() => {
            
            doc.body.innerHTML = `<div id="container">
                <span id="title">Title here</span>
                <ul id="list">
                    <li id="item1">
                        <input type="text" id="observable" tabindex="1" />
                    </li>
                    <li id="item2">Item 2</li>
                </ul>
            </div>`;

        });

        afterEach(() => {
            var items = deregisters,
                l = items.length;

            for (; l--;) {
                items[l]();
                items.splice(l, 1);
            }
        });

        it(`1. Should accept DOM Element [observable] object, event [type], and
            event [handler] callback Function parameters then deregisters
            all matching event handlers and returns the libdom
            "default" module Object.`,
            (done) => {
                
                var observable = doc.getElementById('observable'),
                    q = deregisters,
                    ql = q.length,
                    counter = 0,
                    focusFn = () => {
                        counter++;
                    },
                    blurFn = () => {
                        counter++;
                    };
                var result;

                observable.blur();

                // focus
                expect(() => q[ql++] = on(observable,
                                        'focus',
                                        focusFn)).
                    not.toThrow();

                expect(() => q[ql++] = on(observable,
                                        'blur',
                                        blurFn)).
                    not.toThrow();

                expect(() => result = un(observable,
                                        'focus',
                                        focusFn)).
                    not.toThrow();

                expect(result).toBe(global.libdom);

                expect(() => {
                        observable.focus();
                        observable.blur();
                    }).
                    not.toThrow();
                
                setTimeout(() => {
                    expect(method(q[0])).toBe(true);
                    expect(method(q[1])).toBe(true);

                    expect(counter).toBe(1);
                    done();
                }, 500);

            });

        it(`2. Should accept Window [observable] object, event [type], and
            event [handler] callback Function parameters then deregisters
            all matching event handlers and
            returns the libdom "default" module Object.`,
            () => {
                
                var observable = global.window,
                    counter = 0;
                var result;

                // load
                expect(() => result = un(observable,
                                        'load',
                                        () => {
                                            counter++;
                                        })).
                    not.toThrow();
                expect(result).toBe(global.libdom);
            });

        it(`3. Should accept DOM Element [observable] object, event [type],
            event [handler] callback Function, and optional [scope] Object
            parameters then deregisters the complete matching parameters of
            registered events and returns the libdom "default" module Object.`,
            (done) => {
                
                var observable = doc.getElementById('observable'),
                    q = deregisters,
                    ql = q.length,
                    
                    scope = {
                        name: 'phony',
                        counter: 0
                    },
                    anotherScope = {
                        name: 'another-phony',
                        counter: 0
                    },
                    counter = 0;
                var result;

                function focusFn() {
                    this.counter++;
                    counter++;
                }

                function blurFn() {
                    this.counter++;
                    counter++;
                }

                observable.blur();

                // focus
                expect(() => q[ql++] = on(observable,
                                        'focus',
                                        focusFn,
                                        scope)).
                    not.toThrow();

                expect(() => q[ql++] = on(observable,
                        'focus',
                        focusFn,
                        anotherScope)).
                    not.toThrow();

                expect(() => q[ql++] = on(observable,
                                        'blur',
                                        blurFn,
                                        scope)).
                    not.toThrow();


                // remove first focus handler
                expect(() => result = un(observable,
                                        'focus',
                                        focusFn,
                                        scope)).
                    not.toThrow();

                expect(result).toBe(global.libdom);
                
                expect(() => {
                        observable.focus();
                        observable.blur();
                    }).
                    not.toThrow();
                
                setTimeout(() => {
                    expect(method(q[0])).toBe(true);
                    expect(method(q[1])).toBe(true);
                    expect(method(q[2])).toBe(true);

                    expect(counter).toBe(2);
                    
                    // cannot be 2 since it was removed
                    expect(scope.counter).toBe(1); 

                    expect(anotherScope.counter).toBe(1);
                    done();
                }, 500);

            });

        it(`4. Should not accept non-Observable [observable] object and
            throws an exception.`,
            () => {
                function focusFn() {
                }

                expect(() => un(null,
                                'focus',
                                focusFn)).
                    toThrow();

                expect(() => un(1,
                        'focus',
                        focusFn)).
                    toThrow();

                expect(() => un([],
                        'focus',
                        focusFn)).
                    toThrow();

                expect(() => un(/test/,
                        'focus',
                        focusFn)).
                    toThrow();
            });

        it(`5. Should not accept empty String or non-String event [type] and
            throws an exception.`,
            () => {
                var observable = doc.getElementById('observable');
                
                function focusFn() {
                }

                expect(() => un(observable,
                                null,
                                focusFn)).
                    toThrow();

                expect(() => un(observable,
                        1,
                        focusFn)).
                    toThrow();

                expect(() => un(observable,
                        [],
                        focusFn)).
                    toThrow();

                expect(() => un(observable,
                        /test/,
                        focusFn)).
                    toThrow();
            });

        it(`6. Should not accept non-Function [handler] event callback and
            throws an exception.`,
            () => {
                var observable = doc.getElementById('observable');

                expect(() => un(observable,
                                        'focus',
                                        null)).
                    toThrow();

                expect(() => un(observable,
                        'focus',
                        1)).
                    toThrow();

                expect(() => un(observable,
                        'focus',
                        [])).
                    toThrow();

                expect(() => un(observable,
                        'focus',
                        /test/)).
                    toThrow();
            });
    });