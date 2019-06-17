var eases = require('eases');
var rAF = require('./rAF');

module.exports = ({
    name,
    from = 0,
    to = 1,
    duration = 1000,
    easing = 'quadInOut',
    onProgress = () => {}
}) => {
    
    var easeFn = eases[ easing ];

    var d = to - from;

    var startTime = Date.now();

    var endTime = startTime + duration;

    if ( name ) rAF.stop( name );

    return new Promise( resolve => {

        var tick = now => {

            if ( now < endTime ) {

                var progress = ( now - startTime ) / duration;

                var eased = easeFn( progress );

                var value = from + d * eased;

                onProgress( value );

            } else {

                rAF.stop( name );

                onProgress( to );

                resolve();

            }

        }

        if ( name ) {
            rAF.start( name, tick );
        } else {
            name = rAF.start( tick );
        }

    })

};