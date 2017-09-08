'use strict';


describe(`Inspect if DOM Node [ancestor] contains DOM Node [descendant]
        contains(ancestor:Node, descendant:Node) method`,
    () => {
        var contains = global.libdom.contains;
        var fragment;
        
        beforeEach(() => {
            var doc = global.document,
                element = doc.createElement('div');
            
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
        
        it(`1. Should accept any DOM Node [ancestor] and [descendant]
           parameters and returns true if [ancestor] 
           contains [descendant] Node`,
            () => {
                var doc = global.document,
                    ancestor = doc,
                    descendant = doc.getElementById('item2');
                
                // document
                expect(() => contains(ancestor, descendant)).not.toThrow();
                expect(contains(ancestor, descendant)).toBe(true);
                
                ancestor = doc.body;
                descendant = doc.getElementById('container');
                    
                expect(() => contains(ancestor, descendant)).not.toThrow();
                expect(contains(ancestor, descendant)).toBe(true);
                
                // document fragment
                ancestor = fragment;
                descendant = fragment.firstChild;
                    
                expect(() => contains(ancestor, descendant)).not.toThrow();
                expect(contains(ancestor, descendant)).toBe(true);
                
                // element
                ancestor = doc.getElementById('container');
                descendant = doc.getElementById('list');
                    
                expect(() => contains(ancestor, descendant)).not.toThrow();
                expect(contains(ancestor, descendant)).toBe(true);
                
            });
        
        it(`2. Should accept any DOM Node [ancestor] and [descendant] 
           parameters and returns false if [ancestor] 
           does not contain [descendant] Node`,
            () => {
                var doc = global.document,
                    ancestor = doc.getElementById('item2'),
                    descendant = doc;
                
                // document
                expect(() => contains(ancestor, descendant)).not.toThrow();
                expect(contains(ancestor, descendant)).toBe(false);
                
                ancestor = doc.getElementById('container');
                descendant = doc.body;
                    
                expect(() => contains(ancestor, descendant)).not.toThrow();
                expect(contains(ancestor, descendant)).toBe(false);
                
                // document fragment
                ancestor = fragment;
                descendant = doc.body;
                    
                expect(() => contains(ancestor, descendant)).not.toThrow();
                expect(contains(ancestor, descendant)).toBe(false);
                
                // element
                ancestor = doc.getElementById('list');
                descendant = doc.getElementById('container');
                
                expect(() => contains(ancestor, descendant)).not.toThrow();
                expect(contains(ancestor, descendant)).toBe(false);
                
            });
        
        it(`3. Should not accept non-DOM Node [ancestor] parameter and 
           throws an exception.`,
           () => {
                var descendant = global.document.getElementById('item2');
                
                expect(() => contains(1, descendant)).toThrow();
                expect(() => contains(/test/, descendant)).toThrow();
                expect(() => contains(new Date(), descendant)).toThrow();
                expect(() => contains([], descendant)).toThrow();
                expect(() => contains({}, descendant)).toThrow();
                expect(() => contains('test', descendant)).toThrow();
                expect(() => contains(global.window, descendant)).toThrow();
           });
        
        
        it(`4. Should not accept non-DOM Node [descendant] parameter and 
           throws an exception.`,
           () => {
                var ancestor = global.document.getElementById('item2');
                
                expect(() => contains(ancestor, 1)).toThrow();
                expect(() => contains(ancestor, /test/)).toThrow();
                expect(() => contains(ancestor, new Date())).toThrow();
                expect(() => contains(ancestor, [])).toThrow();
                expect(() => contains(ancestor, {})).toThrow();
                expect(() => contains(ancestor, 'test')).toThrow();
                expect(() => contains(ancestor, global.window)).toThrow();
           });
    });