'use strict';


describe(`Removes DOM [node] child from its parent Node using
        remove(node:Node[, destroy:Boolean]) method.`,
    () => {
        var remove = global.libdom.remove,
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

        it(`1. Should accept DOM [node] of type Element, CDATA, text, 
            Comment, and Processing instruction parameter and detach it
            from their parent node then returns the DOM node removed.`,
            () => {
                var item = doc.getElementById('item1');
                var child;

                expect(() => remove(item)).not.toThrow();
                expect(item.parentNode).toBe(null);

                item = doc.getElementById('item2');
                expect(remove(item)).toBe(item);

                child = item.firstChild; // text node
                expect(remove(child)).toBe(child);
                expect(child.parentNode).toBe(null);
                expect(item.firstChild).toBe(null);

            });

        it(`2. Should accept Boolean true [destroy] optional parameter and 
            purge registered libdom Element event handlers of 
            [node] Element including its descendant Elements.`,
            () => {
                var item = doc.getElementById('item1');
                var child;

                expect(() => remove(item, true)).not.toThrow();
                expect(item.parentNode).toBe(null);

                item = doc.getElementById('item2');
                expect(remove(item, true)).toBe(item);

                child = item.firstChild; // text node
                expect(remove(child, true)).toBe(child);
                expect(child.parentNode).toBe(null);
                expect(item.firstChild).toBe(null);

            });

        it(`3. Should not accept non-DOM or DOM Document or DOM Document 
            Fragment [node] parameter and throws an exception.`,
            () => {

                expect(() => remove(true)).toThrow();
                expect(() => remove(/test/)).toThrow();
                expect(() => remove(1)).toThrow();
                expect(() => remove(doc)).toThrow();
                expect(() => remove(doc.createDocumentFragment())).toThrow();
            });

        it(`4. Should not accept non-Boolean [destroy] parameter and 
            throws an exception.`,
            () => {
                var item = doc.getElementById('item2');

                expect(() => remove(item, [])).toThrow();
                expect(() => remove(item, /test/)).toThrow();
                expect(() => remove(item, 1)).toThrow();
                expect(() => remove(item, doc)).toThrow();
                expect(() => remove(item, doc.createDocumentFragment())).
                    toThrow();
            });
    });