var { lerp, map } = require('./utils/math');
// var { wait, sequence } = require('./utils/time');
var tween = require('./utils/tween');
var { quadInOut } = require('eases');

var rand = ( min, max ) => lerp( min, max, Math.random() );
var randInt = ( min, max ) => Math.floor( rand( min, max ) );
var sample = a => a[ randInt( 0, a.length ) ];

var intermix = arrays => {
    arrays = arrays.map( a => a.slice() );
    var ret = [];
    var len = arrays.reduce( ( sum, a ) => sum + a.length, 0 );
    for ( var i = 0; i < len; i++ ) {
        ret.push( sample( arrays.filter( a => a.length > 0 ) ).shift() );
    }
    return ret;
}
var pairwise = arr => {
    var pairs = [];
    for ( var i = 0; i < arr.length - 1; i++ ) {
        pairs.push( [ arr[ i ], arr[ i + 1 ] ] );
    }
    return pairs;
}
var fumble = steps => {
    if ( steps === 1 ) return [ [ 0, 1 ] ];
    var positions = [];
    var p = 0;
    for ( var i = 0; i < steps - 2; i++ ) {
        p += ( 1 - p ) * rand( .1, 1 );
        positions.push( p );
    }
    return pairwise( [ 0, ...positions, 1 ] );
}


var interleave = ( a1, a2 ) => [
    ...a1.slice( 0, -1 ).reduce( ( acc, x, i ) => [ ...acc, x, a2[ i ] ], [] ),
    a1[ a1.length - 1 ]
]

var animation = ( steps, speed ) => {
    var tweens = fumble( steps );
    return tweens.map( ([ from, to ]) => {
        var d = Math.abs( from - to );
        var duration = d / speed;
        return { from, to, duration }
    })
}

var pause = () => ({ prop: null, duration: randInt( 250, 500 ) });

var ease = ( t, startTime, endTime, from, to ) => {
    return map( quadInOut( map( t, startTime, endTime, 0, 1 ) ), 0, 1, from, to );
}

module.exports = ( props, onProgress ) => {
    var state = {};
    for ( var key in props ) state[ key ] = 0;
    var steps = Array( Object.keys( props ).length ).fill( 2 );
    steps[ randInt( 0, steps.length ) ] = 3;
    var animations = intermix( Object.keys( props ).map( ( prop, i ) => {
        var anims = animation( steps[ i ], props[ prop ] );
        anims.forEach( a => a.prop = prop );
        return anims;
    }));
    var pauses = Array( animations.length - 1 ).fill( 0 ).map( pause );
    var sequence = interleave( animations, pauses );
    var duration = 0;
    sequence.forEach( step => {
        step.startTime = duration;
        step.endTime = step.startTime + step.duration;
        duration += step.duration;
    })
    console.log( sequence );
    return tween({ from: 0, to: duration, easing: 'linear', duration, onProgress: t => {
        for ( var i = 0; i < sequence.length; i++ ) {
            var { prop, from, to, startTime, endTime } = sequence[ i ];
            if ( t < startTime ) {
                break;
            } else if ( prop === null ) {
                continue;
            } else if ( t > endTime ) {
                state[ prop ] = to;
            } else {
                state[ prop ] = ease( t, startTime, endTime, from, to );
            }
        }
        onProgress( state );
    }})
}