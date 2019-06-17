var { lerp } = require('./utils/math');
var { wait, sequence } = require('./utils/time');
var tween = require('./utils/tween');

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
        p += ( 1 - p ) * rand( .1, 1.1 );
        positions.push( p );
    }
    return pairwise( [ 0, ...positions, 1 ] );
}


var interleave = ( a1, a2 ) => a1.reduce( ( acc, x, i ) => [ ...acc, x, a2[ i ] ], [] );

var animation = ( steps, speed, onProgress ) => {
    var tweens = fumble( steps );
    return tweens.map( ([ from, to ]) => {
        var d = Math.abs( from - to );
        var duration = d / speed;
        return () => tween({ from, to, duration, onProgress })
    })
}

module.exports = ( props, onProgress ) => {
    var state = {};
    for ( var key in props ) state[ key ] = 0;
    var update = key => t => {
        state[ key ] = t;
        onProgress( state );
    }
    var steps = Array( Object.keys( props ).length ).fill( 2 );
    steps[ randInt( 0, steps.length ) ] = 3;
    var animations = Object.keys( props ).map( ( key, i ) => {
        return animation( steps[ i ], props[ key ], update( key ) )
    });
    var pauses = animations.map( _ => () => wait( randInt( 100, 250 ) ) );
    return sequence( interleave( intermix( animations ), pauses ) );
}