'use strict';


describe(`Dispatches custom event [type] to browser [observable] using
        dispatch(observable:Observable,
                type:String,
                properties:Object) method`,
    () => {
        var on = global.libdom.on,
            dispatch = global.libdom.dispatch,
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

        it(`1. Should accept DOM Element [observable] object, and 
            event [type] parameters and returns a browser specific
            Event Object.`,
            () => {
            
                var q = deregisters,
                    ql = q.length,
                    counter = 0;

                // focus
                expect(() => q[ql++] = on(target,
                                        'custom-focus',
                                        () => {
                                                counter++;
                                        })).
                        not.toThrow();

                expect(() => q[ql++] = on(target,
                                        'custom-blur',
                                        () => {
                                                counter++;
                                        })).
                        not.toThrow();
                
                expect(() => {
                        dispatch(target, 'custom-focus');
                        dispatch(target, 'custom-blur');
                    }).
                        not.toThrow();
                
                
                expect(method(q[0])).toBe(true);
                expect(method(q[1])).toBe(true);

                expect(counter).toBe(2);
                

            });

        it(`2. Should accept DOM Element [observable] object, custom event[type]
            and optional [properties] event Object override parameters and
            returns a browser specific Event Object.`,
            () => {
            
                var q = deregisters,
                    ql = q.length,
                    counter = 0,
                    descendant = doc.getElementById('observable');
                var noBubble, bubble;

                // focus
                expect(() => q[ql++] = on(target,
                                        'custom-focus',
                                        (eventObject) => {
                                            eventObject.customFocused = true;
                                            counter++;
                                        })).
                        not.toThrow();

                expect(() => q[ql++] = on(target,
                                        'custom-blur',
                                        (eventObject) => {
                                            eventObject.customBlurred = true;
                                            counter++;
                                        })).
                        not.toThrow();
                
                expect(() => noBubble = dispatch(target,
                                                'custom-focus',
                                                {
                                                    customFocused: false,
                                                    customBlurred: false
                                                })).
                    not.toThrow();

                expect(() => bubble = dispatch(descendant,
                                                'custom-blur',
                                                {
                                                    customFocused: false,
                                                    customBlurred: false,
                                                    bubbles: true
                                                })).
                    not.toThrow();

                expect(noBubble.customFocused).toBe(true);
                expect(noBubble.customBlurred).toBe(false);

                expect(bubble.customFocused).toBe(false);
                expect(bubble.customBlurred).toBe(true);

                expect(method(q[0])).toBe(true);
                expect(method(q[1])).toBe(true);

                expect(counter).toBe(2);


            });

        it(`3. Should not accept non-Observable [observable] object and
            throws an exception.`,
            () => {
                expect(() => dispatch(null, 'custom')).toThrow();
                expect(() => dispatch(1, 'custom')).toThrow();
                expect(() => dispatch(/test/, 'custom')).toThrow();
                expect(() => dispatch(void(0), 'custom')).toThrow();
                expect(() => dispatch({}, 'custom')).toThrow();
                expect(() => dispatch([], 'custom')).toThrow();
            });

        it(`4.Should not accept empty String or non-String event [type] and
            throws an exception.`,
            () => {
                expect(() => dispatch(target, null)).toThrow();
                expect(() => dispatch(target, 1)).toThrow();
                expect(() => dispatch(target, /test/)).toThrow();
                expect(() => dispatch(target, void(0))).toThrow();
                expect(() => dispatch(target, {})).toThrow();
                expect(() => dispatch(target, [])).toThrow();
            });

        it(`5.Should not accept non-Object optional [properties] parameter and
            throws an exception.`,
            () => {
                expect(() => dispatch(target, 'custom', null)).toThrow();
                expect(() => dispatch(target, 'custom', 1)).toThrow();
                expect(() => dispatch(target, 'custom', /test/)).toThrow();
                expect(() => dispatch(target, 'custom', void(0))).toThrow();
                expect(() => dispatch(target, 'custom', 'test')).toThrow();
                expect(() => dispatch(target, 'custom', [])).toThrow();
            });

    });