'use strict';


describe(`Inspect Mixed [node] if it is a DOM node using
         is(node:Mixed) method`,
    () => {
        var isDom = global.libdom.is;
        
        var sampleElement, sampleTextNode;
        
        beforeEach(() => {
            var doc = global.document;
            
            sampleElement = doc.createElement('div');
            sampleTextNode = doc.createTextNode('Test');
            
        });
        
        it(`1. Should accept any [node] parameter and returns true
           if it is an instance of a DOM Node.`,
           () => {
                expect(() => isDom(sampleElement)).not.toThrow();
                expect(isDom(sampleElement)).toBe(true);
            
                expect(() => isDom(sampleTextNode)).not.toThrow();
                expect(isDom(sampleTextNode)).toBe(true);
            
           });
        
        it(`2. Should accept any [node] parameter and returns false
           if it is not an instance of a DOM Node.`,
           () => {
                expect(() => isDom(sampleElement.tagName)).not.toThrow();
                expect(isDom(sampleElement.nodeName)).toBe(false);
            
                expect(() => isDom(sampleTextNode.nodeName)).not.toThrow();
                expect(isDom(sampleTextNode.nodeValue)).toBe(false);
                
                
                expect(() => isDom(null)).not.toThrow();
                expect(isDom(null)).toBe(false);
                
                expect(() => isDom(/test/)).not.toThrow();
                expect(isDom(/test/)).toBe(false);
                
                expect(() => isDom(new Date())).not.toThrow();
                expect(isDom(new Date())).toBe(false);
                
                expect(() => isDom(1)).not.toThrow();
                expect(isDom(1)).toBe(false);
                
                expect(() => isDom(undefined)).not.toThrow();
                expect(isDom(undefined)).toBe(false);
            
           });
        
    });