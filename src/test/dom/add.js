'use strict';


describe('Inserts [config] DOM Element or Object Element configuration into ' +
        '[element] DOM Element or DOM Document Fragment using ' +
        'add(element:Node, config:Node|Object[, before:Node|Number|null])',
    () => {

        var add = global.libdom.add,
            doc = global.document;
        var fragment;
        
        beforeEach(() => {
            var element = doc.createElement('div');
            
            doc.body.innerHTML = element.innerHTML = `<div id="container">
                <span id="title">Title here</span>
                <ul id="list">
                    <li id="item1">Item 1</li>
                    <li id="item2">Item 2</li>
                </ul>
            </div>`;
            
            fragment = doc.createDocumentFragment();
            fragment.appendChild(element);
        });


        it('1. Should append [config] DOM Node in [element] DOM Element and ' +
            'returns the inserted DOM Node',
            () => {
                var insert = fragment.firstChild;

                expect(() => add(doc.body, insert)).not.toThrow();

                insert = doc.createElement('div');
                expect(add(doc.body, insert)).toBe(insert);

                // check if really appended
                expect(doc.body.lastChild).toBe(insert);
                expect(insert.parentNode).toBe(doc.body);
            });

        it('2. Should append [config] Dom Node in [element] DOM Document ' +
            'Fragment and returns the inserted DOM Node',
            () => {
                var insert = doc.createElement('div');

                expect(() => add(fragment, insert)).not.toThrow();

                insert = doc.createElement('span');
                expect(add(fragment, insert)).toBe(insert);

                // check if really appended
                expect(fragment.lastChild).toBe(insert);
                expect(insert.parentNode).toBe(fragment);
            });

        it('3. Should append [config] Dom Document Fragment childNodes in ' +
            '[element] DOM Element and returns the Array list of inserted ' +
            'DOM Nodes',
            () => {
                var container = doc.body,
                    item1 = doc.createElement('div'),
                    item2 = doc.createElement('span');

                expect(() => add(container, fragment)).not.toThrow();

                fragment = doc.createDocumentFragment();
                fragment.appendChild(item1);
                fragment.appendChild(item2);

                expect(add(container, fragment)).toEqual([item1, item2]);
                
                // check if really appended
                expect(container.lastChild).toBe(item2);
                expect(item2.parentNode).toBe(container);
            });

        it('4. Should append [config] Dom Document Fragment childNodes in ' +
            '[element] DOM Document Fragment and returns the Array list of ' +
            'inserted DOM Nodes',
            () => {
                var container = fragment,
                    insert = doc.createDocumentFragment(),
                    item1 = doc.createElement('div'),
                    item2 = doc.createElement('span');

                    
                expect(() => add(container, insert)).not.toThrow();

                insert = doc.createDocumentFragment();
                insert.appendChild(item1);
                insert.appendChild(item2);

                expect(add(container, insert)).toEqual([item1, item2]);
                
                // check if really appended
                expect(container.lastChild).toBe(item2);
                expect(item2.parentNode).toBe(container);
            });

        it('5. Should append [config] Element configuration Object in ' +
            '[element] DOM Element and returns the inserted DOM Node',
            () => {
                var container = doc.body;
                var element;
                    
                expect(() => add(container, {
                                        tagName: "div"
                            })).not.toThrow();
                
                element = add(container, {
                        tagName: "div",
                        className: "lib-inserted"
                });

                expect(element.tagName.toLowerCase()).toBe('div');
                expect(element.className).toBe('lib-inserted');
                
                // check if really appended
                expect(container.lastChild).toBe(element);
                expect(element.parentNode).toBe(container);
            });

        it('6. Should append [config] Element configuration Object in ' +
            '[element] DOM Document Fragment and returns the inserted DOM Node',
            () => {
                var container = fragment;
                var element;
                    
                expect(() => add(container, {
                                        tagName: "div"
                            })).not.toThrow();
                
                element = add(container, {
                        tagName: "div",
                        className: "lib-inserted"
                });

                expect(element.tagName.toLowerCase()).toBe('div');
                expect(element.className).toBe('lib-inserted');
                
                // check if really appended
                expect(container.lastChild).toBe(element);
                expect(element.parentNode).toBe(container);
            });

        it('7. Should insert resolved [config] DOM Node in ' +
            '[element] DOM Document Fragment or DOM element before ' +
            'the given [before] childNode and returns the inserted DOM Node/s',
            () => {
                var container = fragment,
                    insertTargetNode = container.firstChild,
                    insert = doc.createElement('div'),
                    item1 = insert,
                    item2 = doc.createElement('span');

                    
                expect(() => add(container,
                                insert,
                                insertTargetNode)).
                    not.toThrow();
                
                expect(insert.nextSibling).toBe(insertTargetNode);

                container = doc.body;
                insert = doc.createDocumentFragment();
                insert.appendChild(item1);
                insert.appendChild(item2);
                insertTargetNode = container.lastChild;
                

                expect(add(container,
                        insert,
                        insertTargetNode)).
                    toEqual([item1, item2]);
                
                // check if really appended
                expect(container.lastChild).toBe(insertTargetNode);
                expect(item1.nextSibling).toBe(item2);
                expect(item2.nextSibling).toBe(insertTargetNode);
                expect(item2.parentNode).toBe(container);

            });

        it('8. Should insert resolved [config] DOM Node in ' +
            '[element] DOM Document Fragment or DOM element positioning ' +
            'the inserted [element] with the given zero-indexed [before] ' +
            ' Number within the given childnodes collection list.',
            () => {
                var container = fragment,
                    position = 0,
                    insert = doc.createElement('div'),
                    item1 = insert,
                    item2 = doc.createElement('span');

                    
                expect(() => add(container,
                                insert,
                                position)).
                    not.toThrow();
                
                expect(container.childNodes[position]).
                    toBe(insert);

                container = doc.body;
                insert = doc.createDocumentFragment();
                insert.appendChild(item1);
                insert.appendChild(item2);
                position = 1;
                

                expect(add(container,
                        insert,
                        position)).
                    toEqual([item1, item2]);
                
                // check if really appended
                expect(container.childNodes[position]).
                    toBe(item1);
                expect(item1.nextSibling).toBe(item2);

            });

        it('10. Should append resolved [config] DOM Node in ' +
            '[element] DOM Document Fragment or DOM element when [before] ' +
            'parameter is null.',
            () => {
                var container = fragment,
                    insert = doc.createElement('div'),
                    item1 = insert,
                    item2 = doc.createElement('span');

                    
                expect(() => add(container,
                                insert,
                                null)).
                    not.toThrow();
                
                expect(container.lastChild).toBe(insert);

                container = doc.body;
                insert = doc.createDocumentFragment();
                insert.appendChild(item1);
                insert.appendChild(item2);
                

                expect(add(container,
                        insert,
                        null)).
                    toEqual([item1, item2]);
                
                // check if really appended
                expect(container.lastChild).toBe(item2);
                expect(item1.nextSibling).toBe(item2);
                expect(item2.parentNode).toBe(container);
            });

        it('11. Should not accept non-DOM Element or Document Fragment ' +
            '[element] parameter and throws an exception.',
            () => {
                expect(() => add(null, fragment)).toThrow();
                expect(() => add(1, fragment)).toThrow();
                expect(() => add(doc, fragment)).toThrow();
                expect(() => add(doc.createTextNode('test'),
                                fragment)).
                    toThrow();
                expect(() => add({}, fragment)).toThrow();
                expect(() => add([], fragment)).toThrow();
            });

        it('12. Should not accept DOM document or non-Object ' +
            'Element configuration [config] parameter and ' +
            'throws an exception.',
            () => {
                expect(() => add(fragment, null)).toThrow();
                expect(() => add(fragment, 1)).toThrow();
                expect(() => add(fragment, doc)).toThrow();
                expect(() => add(fragment, [])).toThrow();
            });

        it('13. Should not accept DOM Node [config] that is not a child of ' +
            '[before] parameter or not a number or not null and ' +
            'throws an exception.',
            () => {
                var item = doc.createElement('div'),
                    body = doc.body;

                expect(() => add(fragment, item, /test/)).toThrow();
                expect(() => add(fragment, item, new Date())).toThrow();
                expect(() => add(fragment, item, doc)).toThrow();
                expect(() => add(fragment, item, doc.createTextNode('test'))).
                    toThrow();
                expect(() => add(fragment, item, [])).toThrow();
            });
    });