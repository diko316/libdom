'use strict';


var main = global.libdom;

console.log('------------------begin dom test');
main.add(global.document.body, {
    tagName: 'form',
    childNodes: [{
        tagName: 'label',
        text: '<label>buang</label>'
    },
    {
        childNodes: [{
            tag: 'label',
            text: 'basta'
        },{
            tag: 'input',
            type: 'text',
            name: 'test-text'
        }]
    },
    {
        childNodes: [{
            tag: 'button',
            type: 'submit',
            text: 'submit',
            onclick: function (event) {
                console.log('---------------------submit?');
                event.preventDefault();
            }
        }]
    }]
});

console.log('------------------end dom test');