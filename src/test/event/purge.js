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

    });