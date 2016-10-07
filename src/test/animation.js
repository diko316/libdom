'use strict';


var WIN = global,
    DOC = WIN.document,
    main = WIN.libdom,
    subject = DOC.getElementById('buang1');
    
main.eachDisplacement(
    function (o) {
        main.offset(subject, o.x, o.y);
    },
    { x: [10, 1000], y: [50, 300] },
    'easeOut');