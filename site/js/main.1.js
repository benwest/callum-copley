// var A4 = [ 210, 297 ];
var MARGIN = [ 40, 40 ];
var v2 = require('./utils/vec2');
var { vec2, mat2d } = require('gl-matrix');
var { clamp } = require('./utils/math');
var tween = require('./utils/tween');
var { grid, distribute } = require('./grid');

var data = JSON.parse( document.querySelector('#data').innerText );

var header = document.querySelector('header');
var main = document.querySelector('main');

var createElement = () => {
    var el = document.createElement('img');
    el.classList.add('page');
    return el;
}

var pages = data.projects
    .reduce( ( acc, project ) => acc.concat( project.pages ), [] )
    .map( page => ({ element: createElement(), ...page }))

var viewport = () => v2.elementSize( main )

var state = {
    scale: 1,
    center: v2(),
    blur: 0,
    animating: false
}

var minScale = 1;
var maxScale = 1;
var bounds = [ v2(), v2() ]

var layout = () => {
    var vp = viewport();
    var containerInnerSize = v2.sub( vp, v2.scale( MARGIN, 2 ) );
    var containerRatio = v2.ratio( containerInnerSize );
    var maxPageSize = v2(
        Math.max( ...pages.map( p => p.size[ 0 ] ) ),
        Math.max( ...pages.map( p => p.size[ 1 ] ) )
    )
    var cells = grid( containerRatio, v2.ratio( maxPageSize ), pages.length );
    var minGridSize = v2.add( v2.mult( maxPageSize, cells ), v2.mult( MARGIN, v2.sub( cells, [ 1, 1 ] )));
    var gridSize = v2.scale( containerInnerSize, v2.cover( containerInnerSize, minGridSize ) );
    var centers = distribute( cells, maxPageSize, gridSize );
    pages.forEach( ( page, i ) => page.center = centers[ i ] );
    minScale = v2.contain( gridSize, containerInnerSize );
    maxScale = v2.contain( maxPageSize, containerInnerSize );
    state.scale = clamp( state.scale, minScale, maxScale );
}

var transformMatrix = () => {
    var m = mat2d.create();
    mat2d.translate( m, m, v2.scale( state.center, -1 ) );
    mat2d.multiplyScalar( m, m, state.scale );
    mat2d.translate( m, m, v2.scale( v2.scale( viewport(), .5 ), 1 / state.scale ) );
    return m;
}

var visible = ( [ cx, cy ], [ w, h ] ) => (
    cx - w / 2 < window.innerWidth &&
    cy - h / 2 < window.innerHeight &&
    cx + w / 2 > 0 &&
    cy + h / 2 > 0
)

var render = () => {
    var m = transformMatrix();
    var rects = pages.map( page => ({
        position: vec2.transformMat2d( vec2.create(), page.center, m ),
        size: v2.scale( page.size, state.scale ),
        element: page.element
    }))
    
    pages.forEach( page => {
        var p = vec2.transformMat2d( vec2.create(), page.center, m );
        var size = v2.scale( page.size, state.scale );
        Object.assign( page.element.style, {
            left: p[ 0 ] + 'px',
            top: p[ 1 ] + 'px',
            width: size[ 0 ] + 'px',
            height: size[ 1 ] + 'px',
            display: visible( p, size ) ? 'block' : 'none'
        })
    })
}

var lerp = ( a, b, t ) => a + ( b - a ) * t;

var rand = ( min, max ) => min + Math.floor( Math.random() * ( max - min + 1 ) )
var sample = a => a[ rand( 0, a.length - 1 ) ];
var intermix = arrays => {
    arrays = arrays.map( a => a.slice() );
    var ret = [];
    var len = arrays.reduce( ( sum, a ) => sum + a.length, 0 );
    for ( var i = 0; i < len; i++ ) {
        ret.push( sample( arrays.filter( a => a.length > 0 ) ).shift() );
    }
    return ret;
}


var animator = onProgress => ( from, to, duration ) => () => tween({ from, to, duration, onProgress: x => {
    onProgress( x );
    render();
}});
var xAnimator = animator( x => state.center[ 0 ] = x );
var yAnimator = animator( x => state.center[ 1 ] = x );
var scaleAnimator = animator( x => state.scale = x );


var fumble = ( from, to, numSteps = Math.random() > .5 ? 3 : 2 ) => {
    if ( to === minScale ) debugger
    var steps = [ from ];
    var p = from;
    for ( var i = 1; i < numSteps - 1; i++ ) {
        var d = to - p;
        p += d * ( Math.random() * .2 + .9 );
        steps.push( p );
    }
    steps.push( to );
    return steps;
}
var pairwise = arr => {
    var pairs = [];
    for ( var i = 0; i < arr.length - 1; i++ ) {
        pairs.push( [ arr[ i ], arr[ i + 1 ] ] );
    }
    return pairs;
}
var animation = ( animator, from, to, duration ) => {
    return pairwise( fumble( from, to ) ).map( ([ from, to ]) => {
        return animator( from, to, duration )
    })
}

var sequence = fns => fns.reduce( ( p, fn ) => p.then( fn ), Promise.resolve() )

var moveTo = ( toScale, toCenter, duration ) => {
    if ( state.animating ) return;
    state.animating = true;
    return sequence( intermix([
        animation( xAnimator, state.center[ 0 ], toCenter[ 0 ], duration ),
        animation( yAnimator, state.center[ 1 ], toCenter[ 1 ], duration ),
        animation( scaleAnimator, state.scale, toScale, 500 ),
        Array( 4 ).fill( 0 ).map( () => () => new Promise( resolve => setTimeout( resolve, 100 )))
    ])).then( () => state.animating = false );
    // return tween({ duration, onProgress: t => {
    //     state.center[ 0 ] = lerp( fromCenter[ 0 ], toCenter[ 0 ], t );
    //     state.center[ 1 ] = lerp( fromCenter[ 1 ], toCenter[ 1 ], t );
    //     state.scale = lerp( fromScale, toScale, t );
    //     render();
    // }})
}

var setSize = size => pages.forEach( page => page.element.src = page[ size ] );
var zoomTo = ( page, duration = 200 ) => moveTo( maxScale, page.center, duration ).then( () => setSize( 'large' ) );
var zoomOut = ( duration = 200 ) => {
    setSize( 'small' );
    moveTo( minScale, v2(), duration );
}

pages.forEach( page => {
    page.element.addEventListener( 'click', () => zoomTo( page ) )
    main.appendChild( page.element )
});

document.querySelector('.controls__exit' ).addEventListener( 'click', () => zoomOut() )

window.addEventListener( 'resize', () => {
    layout();
    render();
});
layout();
zoomOut( 0 );