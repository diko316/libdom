'use strict';


var main = module.exports = require("./index.js");

global.testlibdom = main;
console.log('testing: ', main);




function clicked(event) {
    alert('click! ', event.type);
    console.log('removing!');
    main.un(document, 'click', clicked);
    
}

function noEnd(event, element) {
    //console.log('fire!!!' + event.type);
    main.dispatch(element, 'no-end', {
        name: 'no-end'
    });
}


main.on(document, 'click', clicked);
main.on(document.body, 'mousedown', noEnd);
main.on(document.body, 'mouseup', noEnd);
main.on(document.body, 'click', noEnd);


main.on(document.body, 'contextmenu', function (event) {
    console.log('purge! ', event.type);
    main.purge(document.body);
});

main.on(document, 'no-end', function (event) {
    console.log('no-end ', event);
});

