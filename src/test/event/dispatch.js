'use strict';


describe(`Dispatches custom event [type] to browser [observable] using
        dispatch(observable:Observable,
                type:String,
                properties:Object) method`,
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
    });