'use strict';

var main = global.libdom;

console.log('testing: ', main);




function clicked(event) {
    alert('click! ', event.type);
    console.log('removing!');
    main.un(document, 'click', clicked);
    
}

function noEnd(event, element) {
    //console.log('clicked !!!' + (event.target || event.srcElement).tagName);
    main.dispatch((event.target || event.srcElement), 'no-end', {
        name: 'no-end',
        bubbles: true
    });
}

function onNoEnd(event) {
    console.log('no-end ', (event.target || event.srcElement).tagName);
}

function onKey(event) {
    console.log(event.type, ' ', main.normalizeEvent(event).charCode);
}

main.on(document, 'click', noEnd);
//main.on(document.body, 'mousedown', noEnd);
//main.on(document.body, 'mouseup', noEnd);
//main.on(document.body, 'click', noEnd);


main.on(document.body, 'contextmenu', function (event) {
    console.log('purge! ', event.type);
    main.purge(document.body);
});

main.on(document, 'no-end', onNoEnd);
main.on(document.documentElement, 'no-end', onNoEnd);
main.on(document.body, 'no-end', onNoEnd);
main.on(document.getElementById('buang'), 'no-end', onNoEnd);

main.on(document, 'keydown', onKey);
main.on(document, 'keypress', onKey);
main.on(document, 'keyup', onKey);