'use strict';


describe(`Attaches event handler on supported browser [observable] using
        on(observable:Observable,
            type:String,
            handler:Function
            [, context:Mixed]) method.`,
    () => {
        var on = global.libdom.on,
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
            event [handler] callback Function parameters and returns
            an event handler deregistration Function.`,
            (done) => {
                
                var observable = doc.getElementById('observable'),
                    q = deregisters,
                    ql = q.length,
                    counter = 0;

                observable.blur();

                // focus
                expect(() => q[ql++] = on(observable,
                                        'focus',
                                        () => {
                                            counter++;
                                        })).
                    not.toThrow();

                expect(() => q[ql++] = on(observable,
                                        'blur',
                                        () => {
                                            counter++;
                                        })).
                    not.toThrow();
                
                expect(() => {
                        observable.focus();
                        observable.blur();
                    }).
                    not.toThrow();
                
                setTimeout(() => {
                    expect(method(q[0])).toBe(true);
                    expect(method(q[1])).toBe(true);

                    expect(counter).toBe(2);
                    done();
                }, 500);

            });


        it(`2. Should accept Window [observable] object, event [type], and
            event [handler] callback Function parameters and returns
            an event handler deregistration Function.`,
            () => {
                
                var observable = global.window,
                    q = deregisters,
                    ql = q.length,
                    counter = 0;

                // load
                expect(() => q[ql++] = on(observable,
                                        'load',
                                        () => {
                                            counter++;
                                        })).
                    not.toThrow();

                expect(method(q[0])).toBe(true);

            });

        it(`3. Should accept DOM Element [observable] object, event [type],
            event [handler] callback Function, and optional [scope] Object
            parameters where [scope] becomes "this" object inside 
            the [handler] Function parameters and returns
            an event handler deregistration Function.`,
            (done) => {
                
                var observable = doc.getElementById('observable'),
                    q = deregisters,
                    ql = q.length,
                    scope = {
                        name: 'phony',
                        counter: 0
                    },
                    counter = 0;

                observable.blur();

                // focus
                expect(() => q[ql++] = on(observable,
                                        'focus',
                                        function () {
                                            this.counter++;
                                            counter++;
                                        },
                                        scope)).
                    not.toThrow();

                expect(() => q[ql++] = on(observable,
                                        'blur',
                                        function () {
                                            this.counter++;
                                            counter++;
                                        },
                                        scope)).
                    not.toThrow();
                
                expect(() => {
                        observable.focus();
                        observable.blur();
                    }).
                    not.toThrow();
                
                setTimeout(() => {
                    expect(method(q[0])).toBe(true);
                    expect(method(q[1])).toBe(true);

                    expect(counter).toBe(2);
                    expect(scope.counter).toBe(2);
                    done();
                }, 500);

            });

        it(`4. Should not accept non-Observable [observable] object and
            throws an exception.`,
            () => {
                var q = deregisters,
                    ql = q.length;

                expect(() => q[ql++] = on(null,
                                        'focus',
                                        function () {
                                            this.counter++;
                                            counter++;
                                        })).
                    toThrow();

                expect(() => q[ql++] = on(1,
                        'focus',
                        function () {
                            this.counter++;
                            counter++;
                        })).
                    toThrow();

                expect(() => q[ql++] = on([],
                        'focus',
                        function () {
                            this.counter++;
                            counter++;
                        })).
                    toThrow();

                expect(() => q[ql++] = on(/test/,
                        'focus',
                        function () {
                            this.counter++;
                            counter++;
                        })).
                    toThrow();
            });

        it(`5. Should not accept empty String or non-String event [type] and
            throws an exception.`,
            () => {
                var observable = doc.getElementById('observable'),
                    q = deregisters,
                    ql = q.length;

                expect(() => q[ql++] = on(observable,
                                        null,
                                        function () {
                                            this.counter++;
                                            counter++;
                                        })).
                    toThrow();

                expect(() => q[ql++] = on(observable,
                        1,
                        function () {
                            this.counter++;
                            counter++;
                        })).
                    toThrow();

                expect(() => q[ql++] = on(observable,
                        [],
                        function () {
                            this.counter++;
                            counter++;
                        })).
                    toThrow();

                expect(() => q[ql++] = on(observable,
                        /test/,
                        function () {
                            this.counter++;
                            counter++;
                        })).
                    toThrow();
            });

        it(`6. Should not accept non-Function [handler] event callback and
            throws an exception.`,
            () => {
                var observable = doc.getElementById('observable'),
                    q = deregisters,
                    ql = q.length;

                expect(() => q[ql++] = on(observable,
                                        'focus',
                                        null)).
                    toThrow();

                expect(() => q[ql++] = on(observable,
                        'focus',
                        1)).
                    toThrow();

                expect(() => q[ql++] = on(observable,
                        'focus',
                        [])).
                    toThrow();

                expect(() => q[ql++] = on(observable,
                        'focus',
                        /test/)).
                    toThrow();
            });
    });
