'use strict';


describe(`Moves DOM Document Fragment [nodes] or DOM Element, Text, Comment,
        CDATA and Processing Instructions or an Array List of those Nodes
        into [element] DOM Element or DOM Document Fragment using
        move(nodes:Array(Node)|Node,
            element:Node
            [, before:Node|Number|null]) method`,
    () => {

        var move = global.libdom.move,
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


        it(`1. Should move DOM [nodes] DOM Node into [element] DOM Element 
            and returns the inserted DOM Node`,
            () => {
                var container = doc.body,
                    insert = doc.createElement('div');

                expect(() => move(insert, container)).not.toThrow();

                insert = doc.createElement('div');
                expect(move(insert, container)).toBe(insert);

                // check if really appended
                expect(container.lastChild).toBe(insert);
                expect(insert.parentNode).toBe(container);
            });

        it(`2. Should move [nodes] Array containing DOM Nodes into
            [element] DOM Element and returns the inserted DOM Nodes`,
            () => {
                var container = doc.body,
                    insert = [fragment.firstChild,
                                doc.createElement('span')];

                expect(() => move(insert, container)).not.toThrow();

                insert = [doc.createElement('div'),
                            doc.getElementById('list')];

                expect(move(insert, container)).toEqual(insert);

                // check if really appended
                expect(container.lastChild).toBe(insert[1]);
                expect(insert[1].parentNode).toBe(container);
            });

        it(`3. Should move [nodes] Dom Document Fragment into [element]
            DOM Element and returns the inserted DOM Node`,
            () => {
                var container = doc.body,
                item1 = doc.createElement('div'),
                item2 = doc.createElement('span');

                expect(() => move(fragment, container)).not.toThrow();

                fragment = doc.createDocumentFragment();
                fragment.appendChild(item1);
                fragment.appendChild(item2);

                
                expect(move(fragment, container)).toEqual([item1, item2]);

                // check if really appended
                expect(container.lastChild).toBe(item2);
                expect(item2.parentNode).toBe(container);
            });

        it(`4. Should move [nodes] into [element] DOM Document Fragment and
            returns the Array list of inserted DOM Nodes`,
            () => {
                var container = fragment,
                    insert = doc.createDocumentFragment(),
                    item1 = doc.createElement('div'),
                    item2 = doc.createElement('span');

                    
                expect(() => move(insert, container)).not.toThrow();

                insert = doc.createDocumentFragment();
                insert.appendChild(item1);
                insert.appendChild(item2);

                expect(move(insert, container)).toEqual([item1, item2]);
            
                // check if really appended
                expect(container.lastChild).toBe(item2);
                expect(item2.parentNode).toBe(container);
            });

        it(`5. Should move [nodes] into [element] DOM Element and
            returns the inserted DOM Node`,
            () => {
                var container = doc.body,
                    insert = doc.getElementById('item1');
                var element;
                    
                expect(() => element = move(insert, container)).not.toThrow();

                expect(element).toBe(insert);
                
                // check if really appended
                expect(container.lastChild).toBe(element);
                expect(element.parentNode).toBe(container);
            });

        it(`6. Should insert resolved [nodes] DOM Node/s in
            [element] DOM Document Fragment or DOM element before
            the given [before] childNode and returns the inserted DOM Node/s`,
            () => {
                var container = fragment,
                    insertTargetNode = container.firstChild,
                    insert = doc.createElement('div'),
                    item1 = insert,
                    item2 = doc.createElement('span');

                    
                expect(() => move(insert,
                                container,
                                insertTargetNode)).
                    not.toThrow();
                
                expect(insert.nextSibling).toBe(insertTargetNode);

                container = doc.body;
                insert = doc.createDocumentFragment();
                insert.appendChild(item1);
                insert.appendChild(item2);
                insertTargetNode = container.lastChild;
                

                expect(move(insert,
                        container,
                        insertTargetNode)).
                    toEqual([item1, item2]);
                
                // check if really appended
                expect(container.lastChild).toBe(insertTargetNode);
                expect(item1.nextSibling).toBe(item2);
                expect(item2.nextSibling).toBe(insertTargetNode);
                expect(item2.parentNode).toBe(container);

            });

        it(`7. Should insert resolved [config] DOM Node in
            [element] DOM Document Fragment or DOM element positioning
            the inserted [element] with the given zero-indexed [before] 
            Number within the given childnodes collection list.`,
            () => {
                var container = fragment,
                    position = 0,
                    insert = doc.createElement('div'),
                    item1 = insert,
                    item2 = doc.createElement('span');

                    
                expect(() => move(insert,
                                container,
                                position)).
                    not.toThrow();
                
                expect(container.childNodes[position]).
                    toBe(insert);

                container = doc.body;
                insert = doc.createDocumentFragment();
                insert.appendChild(item1);
                insert.appendChild(item2);
                position = 1;
                

                expect(move(insert,
                        container,
                        position)).
                    toEqual([item1, item2]);
                
                // check if really appended
                expect(container.childNodes[position]).
                    toBe(item1);
                expect(item1.nextSibling).toBe(item2);

            });

        it(`8. Should append resolved [config] DOM Node in 
            [element] DOM Document Fragment or DOM element when [before] 
            parameter is null.`,
            () => {
                var container = fragment,
                    insert = doc.createElement('div'),
                    item1 = insert,
                    item2 = doc.createElement('span');

                    
                expect(() => move(insert,
                                container,
                                null)).
                    not.toThrow();
                
                expect(container.lastChild).toBe(insert);

                container = doc.body;
                insert = doc.createDocumentFragment();
                insert.appendChild(item1);
                insert.appendChild(item2);
                

                expect(move(insert,
                        container,
                        null)).
                    toEqual([item1, item2]);
                
                // check if really appended
                expect(container.lastChild).toBe(item2);
                expect(item1.nextSibling).toBe(item2);
                expect(item2.parentNode).toBe(container);
            });

        it(`9. Should not accept non-DOM Element or DOM document or
            non-Array [nodes] parameter and throws an exception.`,
            () => {
                expect(() => move(null, fragment)).toThrow();
                expect(() => move(1, fragment)).toThrow();
                expect(() => move(doc, fragment)).toThrow();
                expect(() => move(/test/, fragment)).toThrow();
                expect(() => move({}, fragment)).toThrow();
                
            });

        it(`10. Should not accept DOM document or non-DOM Element or 
            non-Document Fragment [element] parameter and 
            throws an exception.`,
            () => {
                expect(() => move(fragment, null)).toThrow();
                expect(() => move(fragment, 1)).toThrow();
                expect(() => move(fragment, doc)).toThrow();
                expect(() => move(fragment, [])).toThrow();
            });

        it(`11. Should not accept DOM Node [before] that is not a child of
            [element] parameter or not a number or not null and 
            throws an exception.`,
            () => {
                var item = doc.createElement('div');

                expect(() => move(fragment, item, /test/)).toThrow();
                expect(() => move(fragment, item, new Date())).toThrow();
                expect(() => move(fragment, item, doc)).toThrow();
                expect(() => move(fragment, item, doc.createTextNode('test'))).
                    toThrow();
                expect(() => move(fragment, item, [])).toThrow();
            });
    });