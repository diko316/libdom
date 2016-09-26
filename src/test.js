'use strict';


var main = require("./index.js");


console.log('testing: ', main);


function clicked() {
    main.un(document, 'click', clicked);
    alert('click!');
}

function noEnd(event) {
    console.log('no end!!! ' + event.type);
}


main.on(document, 'click', clicked);
main.on(document.body, 'mousedown', noEnd);
main.on(document.body, 'mouseup', noEnd);
main.on(document.body, 'click', noEnd);


main.on(document, 'contextmenu', function (event) {
    console.log('purge! ', event.type);
    main.purge(document.body);
});



