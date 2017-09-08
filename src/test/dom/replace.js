'use strict';


describe(`Replaces child [node] with [config] DOM Node or Object Element 
        configuration using replace(node:Node,
                                    config:Node|Object
                                    [, destroy:Boolean]) method`,
    () => {
        var replace = global.libdom.replace,
            doc = global.document;
        var fragment;
        
        beforeEach(() => {
            var element = doc.createElement('div');
            
            doc.body.innerHTML = `<div id="container">
                <span id="title">Title here</span>
                <ul id="list">
                    <li id="item1">Item 1</li>
                    <li id="item2">Item 2</li>
                </ul>
            </div>`;
            element.id = 'attach1';
            element.innerHTML = `<span id="attach-inside1">Inside</span>`;
            
            fragment = doc.createDocumentFragment();
            fragment.appendChild(element);
        });


        it(`1. Should replace [node] DOM Node with [config] DOM Node and
            returns the inserted DOM Node`,
            () => {
                var insert = fragment.firstChild,
                    target = doc.getElementById('container'),
                    container = target.parentNode;

                expect(() => replace(target, insert)).not.toThrow();

                insert = doc.createElement('div');
                target = doc.getElementById('attach1');

                expect(replace(target, insert)).toBe(insert);

                // check if really appended
                expect(container.lastChild).toBe(insert);
                expect(insert.parentNode).toBe(container);
            });

        it(`2. Should replace [node] DOM Node with [config] Dom Document
            Fragment childNodes and returns the Array list of inserted 
            DOM Nodes`,
            () => {
                var target = doc.getElementById('item1').firstChild,
                    item1 = doc.createElement('div'),
                    item2 = doc.createElement('span');
                var container, before;

                expect(() => replace(target, fragment)).not.toThrow();

                fragment = doc.createDocumentFragment();
                fragment.appendChild(item1);
                fragment.appendChild(item2);
                target = doc.getElementById('list');
                container = target.parentNode;
                before = target.previousSibling;

                expect(replace(target, fragment)).toEqual([item1, item2]);
                
                // check if really appended
                expect(before.nextSibling).toBe(item1);
                expect(item2.parentNode).toBe(container);
            });

        it(`3. Should replace [node] DOM Node with [config] Object 
            Element configuration Object and returns the inserted DOM Node`,
            () => {
                var target = doc.getElementById('title');
                var element, container;
                    
                expect(() => replace(target, {
                                        tagName: "div"
                                    })).not.toThrow();
                

                target = doc.getElementById('item1').firstChild;
                container = target.parentNode;

                expect(() => element = replace(target, {
                                                tagName: "div",
                                                className: "lib-inserted"
                                        })).not.toThrow();

                expect(element.tagName.toLowerCase()).toBe('div');
                expect(element.className).toBe('lib-inserted');
                
                // check if really appended
                expect(container.lastChild).toBe(element);
                expect(element.parentNode).toBe(container);
            });

        it(`4. Should accept Boolean true [destroy] optional parameter and 
            purge registered libdom Element event handlers of 
            replaced [node] Element including its descendant Elements.`,
            () => {
                var target = doc.getElementById('item1').firstChild,
                    container = target.parentNode,
                    insert = fragment.firstChild;
                var child;

                expect(() => replace(target, insert, true)).not.toThrow();
                expect(insert.parentNode).toBe(container);


                target = doc.getElementById('list'),
                container = target.parentNode,
                insert = doc.createElement('span');

                expect(() => replace(target, insert, true)).not.toThrow();
                expect(insert.parentNode).toBe(container);


            });

        it(`5. Should not accept DOM Document, DOM Document Fragment, or 
            non-DOM Node [node] parameter and throws an exception.`,
            () => {
                expect(() => replace(null, fragment)).toThrow();
                expect(() => replace(1, fragment)).toThrow();
                expect(() => replace(doc, fragment)).toThrow();
                expect(() => replace(doc.createDocumentFragment(),
                                    fragment)).
                    toThrow();
                expect(() => replace({}, fragment)).toThrow();
                expect(() => replace([], fragment)).toThrow();
            });

        it(`6. Should not accept DOM document or non-Object 
            Element configuration [config] parameter and 
            throws an exception.`,
            () => {
                var target = doc.getElementById('list');

                expect(() => replace(target, null)).toThrow();
                expect(() => replace(target, 1)).toThrow();
                expect(() => replace(target, doc)).toThrow();
                expect(() => replace(target, [])).toThrow();
            });

        it(`7. Should not accept DOM Node [config] that is an ancestor of 
            [node] DOM Element parameter.`,
            () => {
                var target = doc.getElementById('list'),
                    replacement = target.parentNode;

                expect(() => replace(target, replacement)).toThrow();

                target = doc.getElementById('item2');
                replacement = target.parentNode.parentNode;

                expect(() => replace(target, replacement)).toThrow();
            });

            it(`4. Should not accept non-Boolean [destroy] parameter and 
            throws an exception.`,
            () => {
                var item = doc.getElementById('list');

                expect(() => replace(item, fragment, [])).toThrow();
                expect(() => replace(item, fragment, /test/)).toThrow();
                expect(() => replace(item, fragment, 1)).toThrow();
                expect(() => replace(item, fragment, doc)).toThrow();
                expect(() => replace(item, fragment, doc.createDocumentFragment())).
                    toThrow();
            });
    });