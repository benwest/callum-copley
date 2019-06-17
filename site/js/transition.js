var v2 = require('./utils/vec2');
var mat3 = require('gl-matrix-mat3');

var { fullscreen } = require('./utils/layout');
var { lerp } = require('./utils/math');
var { wait } = require('./utils/time');

var animate = require('./animate');
var renderer = require('./gl/renderer')();

var drawTexture = require('./gl/texture');

var main = document.querySelector('main');

var show = () => {
    main.classList.add('transition');
    return wait( 250 ).then( () => renderer.canvas.style.display = 'block' );
}

var hide = () => {
    renderer.canvas.style.display = ''
    main.classList.remove('transition');
    return wait( 250 );
}

var readElement = el => {
    var rect = el.getBoundingClientRect();
    return {
        size: v2( rect.width, rect.height ),
        position: v2( rect.left, rect.top )
    }
}

var keyframes = ( thumbnail, full, dir ) => {
    var viewportCenter = v2( window.innerWidth / 2, window.innerHeight / 2 );
    var scale = full.size[ 0 ] / thumbnail.size[ 0 ];
    var fullscreenCenterOffset = v2.sub( viewportCenter, full.position );
    var thumbFullscreenCenter = v2.add( thumbnail.position, v2.scale( fullscreenCenterOffset, 1 / scale ) );
    var offset = v2.sub( viewportCenter, thumbFullscreenCenter );
    var identity = { offset: v2(), scale: 1 };
    var transformed = { offset, scale };
    return dir === 1
        ? { from: identity, to: transformed }
        : { from: transformed, to: identity };
}

var transition = ({ from, to }) => {
    var offset = v2();
    var scale = v2();
    var transform = mat3.create();
    var prevTransform = mat3.create();
    var resolution = v2( window.innerWidth, window.innerHeight );
    var center = v2( .5, .5 );
    var centerInv = v2.negate( center );
    renderer.setSize( resolution[ 0 ], resolution[ 1 ] );
    renderer.uploadTexture( drawTexture([ ...document.querySelectorAll('.projects .page') ]) );
    var update = state => {
        offset[ 0 ] = lerp( from.offset[ 0 ], to.offset[ 0 ], state.x ) / -resolution[ 0 ];
        offset[ 1 ] = lerp( from.offset[ 1 ], to.offset[ 1 ], state.y ) / -resolution[ 1 ];
        scale[ 0 ] = scale[ 1 ] = 1 / lerp( from.scale, to.scale, state.scale );
        mat3.identity( transform );
        mat3.translate( transform, transform, center );
        mat3.translate( transform, transform, offset );
        mat3.scale( transform, transform, scale );
        mat3.translate( transform, transform, centerInv );
        renderer.draw({ resolution, transform, prevTransform });
        mat3.copy( prevTransform, transform );
    };
    return animate( { x: 0.003, y: 0.003, scale: 0.002 }, update );
}

// var transform = ( { offset, scale }, origin ) => rect => ({
//     position: v2.add( scaleAround( rect.position, origin, scale ), v2.scale( offset, scale ) ),
//     size: v2.scale( rect.size, scale )
// });

var toFullscreen = ( id, viewport ) => {
    var thumbs = [ ...document.querySelectorAll('.projects .page') ];
    var idx = thumbs.findIndex( el => el.id === id );
    var thumbRects = thumbs.map( readElement );
    var fullSize = fullscreen( thumbRects[ idx ].size, viewport ).size;
    var fullRect = {
        size: fullSize,
        position: v2(
            ( viewport.size[ 0 ] - fullSize[ 0 ] ) / 2,
            viewport.margins[ 0 ][ 1 ]
        )
    }
    return transition( keyframes( thumbRects[ idx ], fullRect, 1 ) )
}

var toGrid = fullElement => {
    var thumbs = [ ...document.querySelectorAll('.projects .page') ];
    var idx = thumbs.findIndex( el => el.id === fullElement.id );
    var thumbRects = thumbs.map( readElement );
    var fullRect = readElement( fullElement );
    return transition( keyframes( thumbRects[ idx ], fullRect, -1 ) );
}

if ( renderer === null ) {
    var asyncNoop = () => Promise.resolve();
    module.exports = {
        hide: asyncNoop,
        show: asyncNoop,
        toGrid: asyncNoop,
        toFullscreen: asyncNoop
    }
} else {
    renderer.canvas.classList.add( 'transition-renderer' );
    renderer.canvas.style.display = 'none';
    document.body.appendChild( renderer.canvas );
    module.exports = { hide, show, toGrid, toFullscreen };
}

// var canvas = document.createElement('canvas');
// canvas.classList.add('transition-renderer');
// document.body.appendChild( canvas );
// var resize = () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }
// resize();
// window.addEventListener( 'resize', resize )
// var draw = renderer( canvas );

// var tween = ( thumbnail, full, dir ) => {
//     var scale = full.size[ 0 ] / thumbnail.size[ 0 ];
//     var fullscreenCenterOffset = v2.sub( viewportCenter(), full.position );
//     var thumbFullscreenCenter = v2.add( thumbnail.position, v2.scale( fullscreenCenterOffset, 1 / scale ) );
//     var offset = v2.sub( viewportCenter(), thumbFullscreenCenter );
//     var identity = { offset: v2(), scale: 1 };
//     var transformed = { offset, scale };
//     return dir === 1
//         ? { from: identity, to: transformed }
//         : { from: transformed, to: identity };
// }

// var anim = ( { from, to }, onProgress ) => {
//     var offset = v2();
//     var update = state => {
//         offset[ 0 ] = lerp( from.offset[ 0 ], to.offset[ 0 ], state.x );
//         offset[ 1 ] = lerp( from.offset[ 1 ], to.offset[ 1 ], state.y );
//         onProgress({ offset, scale: lerp( from.scale, to.scale, state.scale ) })
//     };
//     return animate( { x: .003, y: .003, scale: .002 }, update );
// }

// var viewportCenter = () => v2( window.innerWidth / 2, window.innerHeight / 2 );
// var center = ({ position, size }) => v2.add( position, v2.scale( size, .5 ) );

// var scaleAround = ( point, origin, scale ) => {
//     return v2.add( v2.scale( v2.subtract( point, origin ), scale ), origin )
// }

// var transform = ( { offset, scale }, origin ) => rect => ({
//     position: v2.add( scaleAround( rect.position, origin, scale ), v2.scale( offset, scale ) ),
//     size: v2.scale( rect.size, scale )
// });

// // var draw = rects => {
// //     ctx.clearRect( 0, 0, canvas.width, canvas.height );
// //     ctx.fillStyle = 'black';
// //     ctx.fillRect( 0, 0, canvas.width, canvas.height );
// //     ctx.fillStyle = 'white';
// //     rects.forEach( ({ position, size }) => {
// //         if (
// //             position[ 0 ] > window.innerWidth ||
// //             position[ 1 ] > window.innerHeight ||
// //             position[ 0 ] + size[ 0 ] < 0 ||
// //             position[ 1 ] + size[ 1 ] < 0
// //         ) return;
// //         ctx.fillRect( position[ 0 ], position[ 1 ], size[ 0 ], size[ 1 ] );
// //     })
// // }

// var render = rects => {
//     var c = viewportCenter();
//     return state => draw( rects.map( transform( state, c ) ) )
// }

// var readElement = el => {
//     var rect = el.getBoundingClientRect();
//     return {
//         size: v2( rect.width, rect.height ),
//         position: v2( rect.left, rect.top )
//     }
// }

// var show = () => new Promise( resolve => {
//     console.log( 'show' )
//     canvas.style.display = 'block';
//     resolve();
// })

// var hide = () => new Promise( resolve => {
//     console.log( 'hide' )
//     canvas.style.display = '';
//     resolve();
// })


// var toFullscreen = ( id, viewport ) => {
//     var thumbs = [ ...document.querySelectorAll('.projects .page') ];
//     var idx = thumbs.findIndex( el => el.id === id );
//     var thumbRects = thumbs.map( readElement );
//     var fullSize = fullscreen( thumbRects[ idx ].size, viewport ).size;
//     var fullRect = {
//         size: fullSize,
//         position: v2(
//             ( viewport.size[ 0 ] - fullSize[ 0 ] ) / 2,
//             viewport.margins[ 0 ][ 1 ]
//         )
//     }
//     return anim( tween( thumbRects[ idx ], fullRect, 1 ), render( thumbRects ) )
// }

// var npo2 = x => {
//     var r = 1;
//     while ( r < x ) r *= 2;
//     return r;
// }
// var drawTexture = imgs => {
//     var canvas = document.createElement( 'canvas' );
//     var ctx = canvas.getContext( '2d' );
//     canvas.width = Math.min( npo2( window.innerWidth ), 2048 );
//     canvas.height = Math.min( npo2( window.innerHeight ), 2048 );
//     ctx.scale( canvas.width / window.innerWidth, canvas.height / window.innerHeight );
//     imgs.forEach( img => {
//         var rect = img.getBoundingClientRect();
//         // if ( rect.bottom > 0 && rect.top < window.innerHeight ) {
//             ctx.drawImage( img, rect.left, rect.top, rect.width, rect.height );
//         // }
//     });
//     return canvas;
// }

// var toGrid = fullElement => {
//     var thumbs = [ ...document.querySelectorAll('.projects .page') ];
//     var idx = thumbs.findIndex( el => el.id === fullElement.id );
//     var thumbRects = thumbs.map( readElement );
//     var fullRect = readElement( fullElement );
//     return anim( tween( thumbRects[ idx ], fullRect, -1 ), render( thumbRects ) )
// }

// module.exports = { show, hide, toFullscreen, toGrid }