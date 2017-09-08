'use strict';



describe('Selects all DOM Elements matching CSS [selector] within the given ' +
        '[dom] Document or Element Node using select(dom:Node,' +
                                                    'selector:String) method',
    () => {
        var select = global.libdom.select,
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

        it('1. Should accept [dom] Document Node and String [selector] ' +
            'parameter and returns an Array of DOM Elements result.',
            () => {

                expect(() => select(doc, 'div ul li')).
                    not.toThrow();

                expect(select(doc, 'div ul li')).
                    toEqual([
                        doc.getElementById("item1"),
                        doc.getElementById("item2")
                    ]);

            });

        it('2. Should accept [dom] Element Node and String [selector] ' +
            'parameter and returns an Array of DOM Elements result.',
            () => {
                var element = doc.getElementById('container');

                expect(() => select(element, 'ul li')).
                    not.toThrow();

                expect(select(element, 'ul li')).
                    toEqual([
                        doc.getElementById("item1"),
                        doc.getElementById("item2")
                    ]);

            });

        it('3. Should not accept non-Element or non-Document Node [dom] ' +
            'parameter and throws an exception.',
            () => {

                // document fragment
                expect(() => select(fragment, 'ul li')).toThrow();

                // text node
                expect(() => select(doc.createTextNode("test"),
                                     'ul li')).toThrow();

            });


        it('4. Should not accept non-DOM Node [dom] ' +
            'parameter and throws an exception.',
            () => {

                expect(() => select(null, 'ul li')).toThrow();
                expect(() => select(1, 'ul li')).toThrow();
                expect(() => select(/test/, 'ul li')).toThrow();
                expect(() => select(new Date(), 'ul li')).toThrow();
                expect(() => select([], 'ul li')).toThrow();
                expect(() => select({}, 'ul li')).toThrow();

            });

        it('5. Should not accept non-String or empty String [selector] ' +
            'parameter and throws an exception.',
            () => {
                var element = doc.getElementById('container');
                
                expect(() => select(element, null)).toThrow();
                expect(() => select(element, 1)).toThrow();
                expect(() => select(element, /test/)).toThrow();
                expect(() => select(element, new Date())).toThrow();
                expect(() => select(element, [])).toThrow();
                expect(() => select(element, {})).toThrow();

            });

    });