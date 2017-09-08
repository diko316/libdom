'use strict';


describe('Inserts [config] DOM Element or Object Element configuration into ' +
        '[element] DOM Element or DOM Document Fragment using ' +
        'add(element:Node, config:Node|Object[, before:Node|Number|null])',
    () => {

        var add = global.libdom.add,
            libcore = global.libcore,
            doc = global.document;
        var fragment;
        
        beforeEach(() => {
            var element = doc.createElement('div');
            
            doc.body.innerHTML = element.innerHTML = `
            <div id="container">
                <span id="title">Title here</span>
                <ul id="list">
                    <li id="item1">Item 1</li>
                    <li id="item2">Item 2</li>
                </ul>
            </div>
            `;
            
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
            '[element] DOM Document Element and returns the inserted DOM Nodes',
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
    });