'use strict';


describe(`Removes all registered event listeners that matches the following
        optional parameters using purge([observable
                                        [, type
                                        [, handler
                                        [, context]]]]) method.`,
    
    () => {

        var on = global.libdom.on,
            dispatch = global.libdom.dispatch,
            purge = global.libdom.purge,
            method = global.libcore.method,
            doc = global.document,
            deregisters = [];
        var target;
        
        
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

            target = doc.getElementById('container');

        });

        afterEach(() => {
            var items = deregisters,
            l = items.length;

            for (; l--;) {
                items[l]();
                items.splice(l, 1);
            }

            target = null;
        });

        it(`1. Should remove all registered event listeners when called
            without parameter.`,
            () => {
                var counter = 0;

                // focus
                expect(() => on(target,
                                        'custom-focus',
                                        () => {
                                                counter++;
                                        })).
                        not.toThrow();

                expect(() => on(target,
                                        'custom-blur',
                                        () => {
                                                counter++;
                                        })).
                        not.toThrow();

                // remove!
                expect(() => purge()).not.toThrow();
                
                expect(() => {
                        dispatch(target, 'custom-focus');
                        dispatch(target, 'custom-blur');
                    }).
                        not.toThrow();

                expect(counter).toBe(0);
            });

        it(`2. Should return libdom module.`,
            () => {
                var counter = 0;

                // focus
                expect(() => on(target,
                                        'custom-focus',
                                        () => {
                                                counter++;
                                        })).
                        not.toThrow();

                expect(() => on(target,
                                        'custom-blur',
                                        () => {
                                                counter++;
                                        })).
                        not.toThrow();

                // remove!
                expect(purge()).toBe(global.libdom);
                
                expect(() => {
                        dispatch(target, 'custom-focus');
                        dispatch(target, 'custom-blur');
                    }).
                        not.toThrow();

                expect(counter).toBe(0);
            });

        it(`3. Should accept DOM Element [observable] object then remove all
            of its event listeners.`,
            () => {
                var other = doc.getElementById('observable'),
                    flag = {
                        focused: false,
                        blurred: false
                    };

                function customFocus() {
                    flag.focused = true;
                }

                function customBlur() {
                    flag.blurred = true;
                }

                // focus
                expect(() => on(other,
                                'custom-focus',
                                customFocus)).
                        not.toThrow();

                expect(() => on(target,
                                'custom-blur',
                                customBlur)).
                        not.toThrow();

                // remove!
                expect(() => purge(target)).not.toThrow();
                
                expect(() => {
                        dispatch(other, 'custom-focus');
                        dispatch(target, 'custom-blur');
                    }).
                        not.toThrow();

                expect(flag.focused).toBe(true);
                expect(flag.blurred).toBe(false);
            });

        it(`4. Should accept DOM Element [observable] object and event [type]
            then remove all event listeners matching the parameters.`,
            () => {
                var flag = {
                        focused: false,
                        blurred: false
                    };

                function customFocus() {
                    flag.focused = true;
                }

                function customBlur() {
                    flag.blurred = true;
                }

                // focus
                expect(() => on(target,
                                'custom-focus',
                                customFocus)).
                        not.toThrow();

                expect(() => on(target,
                                'custom-blur',
                                customBlur)).
                        not.toThrow();

                // remove!
                expect(() => purge(target, 'custom-focus')).not.toThrow();
                
                expect(() => {
                        dispatch(target, 'custom-focus');
                        dispatch(target, 'custom-blur');
                    }).
                        not.toThrow();

                expect(flag.focused).toBe(false);
                expect(flag.blurred).toBe(true);
            });

        it(`5. Should accept DOM Element [observable] object, event [type],
            event [handler] callback, and [context] scope of [handler]
            parameter then remove all event listeners matching the parameters.`,
            () => {
                var flag1 = {
                        focused: false,
                        blurred: false
                    },
                    flag2 = {
                        focused: false,
                        blurred: false
                    };

                function handler(eventObject) {
                    /* jshint validthis:true */
                    switch (eventObject.type) {
                    case 'custom-focus':
                        this.focused = true;
                        break;
                    case 'custom-blurred':
                        this.blurred = true;
                        break;
                    }
                    
                }

                // focus
                expect(() => on(target,
                                'custom-focus',
                                handler,
                                flag1)).
                        not.toThrow();

                expect(() => on(target,
                                'custom-blur',
                                handler,
                                flag2)).
                        not.toThrow();

                // remove!
                expect(() => purge(target,
                                    'custom-blur',
                                    handler,
                                    flag2)).not.toThrow();
                
                expect(() => {
                        dispatch(target, 'custom-focus');
                        dispatch(target, 'custom-blur');
                    }).
                        not.toThrow();

                expect(flag1.focused).toBe(true);
                expect(flag1.blurred).toBe(false);

                expect(flag2.focused).toBe(false);
                expect(flag2.blurred).toBe(false);
            });
        
        it(`6. Should not accept non-Observable [observable] object then
            throws an exception.`,
            () => {
                var flag1 = {
                        focused: false,
                        blurred: false
                    };

                function handler(eventObject) {
                    /* jshint validthis:true */
                    switch (eventObject.type) {
                    case 'custom-focus':
                        this.focused = true;
                        break;
                    case 'custom-blurred':
                        this.blurred = true;
                        break;
                    }
                    
                }

                expect(() => purge(null, 'custom-focus', handler, flag1)).
                    toThrow();
                expect(() => purge(1, 'custom-focus', handler, flag1)).
                    toThrow();
                expect(() => purge(/test/, 'custom-focus', handler, flag1)).
                    toThrow();
                expect(() => purge(false, 'custom-focus', handler, flag1)).
                    toThrow();
                expect(() => purge({}, 'custom-focus', handler, flag1)).
                    toThrow();
                expect(() => purge([], 'custom-focus', handler, flag1)).
                    toThrow();
            });

        it(`7. Should not accept non-String or empty String event [type] then
            throws an exception.`,
            () => {
                var flag1 = {
                        focused: false,
                        blurred: false
                    };

                function handler(eventObject) {
                    /* jshint validthis:true */
                    switch (eventObject.type) {
                    case 'custom-focus':
                        this.focused = true;
                        break;
                    case 'custom-blurred':
                        this.blurred = true;
                        break;
                    }
                    
                }

                expect(() => purge(target, null, handler, flag1)).
                    toThrow();
                expect(() => purge(target, 1, handler, flag1)).
                    toThrow();
                expect(() => purge(target, /test/, handler, flag1)).
                    toThrow();
                expect(() => purge(target, false, handler, flag1)).
                    toThrow();
                expect(() => purge(target, {}, handler, flag1)).
                    toThrow();
                expect(() => purge(target, [], handler, flag1)).
                    toThrow();
            });

        it(`8. Should not accept non-Function event [handler] callback then
            throws an exception.`,
            () => {
                var flag1 = {
                        focused: false,
                        blurred: false
                    };

                expect(() => purge(target, 'custom-focus', null, flag1)).
                    toThrow();
                expect(() => purge(target, 'custom-focus', 1, flag1)).
                    toThrow();
                expect(() => purge(target, 'custom-focus', /test/, flag1)).
                    toThrow();
                expect(() => purge(target, 'custom-focus', false, flag1)).
                    toThrow();
                expect(() => purge(target, 'custom-focus', {}, flag1)).
                    toThrow();
                expect(() => purge(target, 'custom-focus', [], flag1)).
                    toThrow();
            });
    });