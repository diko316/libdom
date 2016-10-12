'use strict';


var WIN = global,
    DOC = WIN.document,
    main = WIN.libdom,
    subject = DOC.getElementById('buang1'),
    animating = false;
    
main.eachDisplacement(
    function (o) {
        main.offset(subject, o.x, o.y);
    },
    { x: 10, y: 50 },
    { x: 1000, y: 300 },
    'easeOut');


main.on(DOC, 'click',
    function (event) {
        var screen = main.screen(),
            current = main.offset(subject),
            updates = {
                        x: screen[0] + event.clientX,
                        y: screen[1] + event.clientY
                    };
        
        if (animating) {
            animating.update(updates);
            return;
        }
        
        
        
        animating = main.eachDisplacement(
                        function (o, last) {
                            main.offset(subject, o.x, o.y);
                            if (last) {
                                animating = false;
                            }
                        },
                        {
                            x: current[0],
                            y: current[1]
                        },
                        updates,
                        'easeOut');

    });