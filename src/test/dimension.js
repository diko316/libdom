'use strict';

var WIN = global,
    DOC = WIN.document,
    main = WIN.libdom,
    subject = DOC.getElementById('buang1');
    

console.log('box: ',
    main.box(subject)
);

//console.log('relocate to 0,0 offset and resize to 150x300');
main.box(subject, 0, 0, 150, 300);






