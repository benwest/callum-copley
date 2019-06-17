{"changed":false,"filter":false,"title":"transition.js","tooltip":"/site/js/transition.js","value":"var v2 = require('./utils/vec2');\nvar mat3 = require('gl-matrix-mat3');\n\nvar { fullscreen } = require('./utils/layout');\nvar { lerp } = require('./utils/math');\nvar { wait } = require('./utils/time');\n\nvar animate = require('./animate');\nvar renderer = require('./gl/renderer')();\n\nvar drawTexture = require('./gl/texture');\n\nvar main = document.querySelector('main');\n\nvar show = () => {\n    main.classList.add('transition');\n    return wait( 250 ).then( () => renderer.canvas.style.display = 'block' );\n}\n\nvar hide = () => {\n    renderer.canvas.style.display = ''\n    main.classList.remove('transition');\n    return wait( 250 );\n}\n\nvar readElement = el => {\n    var rect = el.getBoundingClientRect();\n    return {\n        size: v2( rect.width, rect.height ),\n        position: v2( rect.left, rect.top )\n    }\n}\n\nvar keyframes = ( thumbnail, full, dir ) => {\n    var viewportCenter = v2( window.innerWidth / 2, window.innerHeight / 2 );\n    var scale = full.size[ 0 ] / thumbnail.size[ 0 ];\n    var fullscreenCenterOffset = v2.sub( viewportCenter, full.position );\n    var thumbFullscreenCenter = v2.add( thumbnail.position, v2.scale( fullscreenCenterOffset, 1 / scale ) );\n    var offset = v2.sub( viewportCenter, thumbFullscreenCenter );\n    var identity = { offset: v2(), scale: 1 };\n    var transformed = { offset, scale };\n    return dir === 1\n        ? { from: identity, to: transformed }\n        : { from: transformed, to: identity };\n}\n\nvar transition = ({ from, to }) => {\n    var offset = v2();\n    var scale = v2();\n    var transform = mat3.create();\n    var prevTransform = mat3.create();\n    var resolution = v2( window.innerWidth, window.innerHeight );\n    var center = v2( .5, .5 );\n    var centerInv = v2.negate( center );\n    renderer.setSize( resolution[ 0 ], resolution[ 1 ] );\n    renderer.uploadTexture( drawTexture([ ...document.querySelectorAll('.projects .page') ]) );\n    var update = state => {\n        offset[ 0 ] = lerp( from.offset[ 0 ], to.offset[ 0 ], state.x ) / -resolution[ 0 ];\n        offset[ 1 ] = lerp( from.offset[ 1 ], to.offset[ 1 ], state.y ) / -resolution[ 1 ];\n        scale[ 0 ] = scale[ 1 ] = 1 / lerp( from.scale, to.scale, state.scale );\n        mat3.identity( transform );\n        mat3.translate( transform, transform, center );\n        mat3.translate( transform, transform, offset );\n        mat3.scale( transform, transform, scale );\n        mat3.translate( transform, transform, centerInv );\n        renderer.draw({ resolution, transform, prevTransform });\n        mat3.copy( prevTransform, transform );\n    };\n    return animate( { x: 0.003, y: 0.003, scale: 0.002 }, update );\n}\n\n// var transform = ( { offset, scale }, origin ) => rect => ({\n//     position: v2.add( scaleAround( rect.position, origin, scale ), v2.scale( offset, scale ) ),\n//     size: v2.scale( rect.size, scale )\n// });\n\nvar toFullscreen = ( id, viewport ) => {\n    var thumbs = [ ...document.querySelectorAll('.projects .page') ];\n    var idx = thumbs.findIndex( el => el.id === id );\n    var thumbRects = thumbs.map( readElement );\n    var fullSize = fullscreen( thumbRects[ idx ].size, viewport ).size;\n    var fullRect = {\n        size: fullSize,\n        position: v2(\n            ( viewport.size[ 0 ] - fullSize[ 0 ] ) / 2,\n            viewport.margins[ 0 ][ 1 ]\n        )\n    }\n    return transition( keyframes( thumbRects[ idx ], fullRect, 1 ) )\n}\n\nvar toGrid = fullElement => {\n    var thumbs = [ ...document.querySelectorAll('.projects .page') ];\n    var idx = thumbs.findIndex( el => el.id === fullElement.id );\n    var thumbRects = thumbs.map( readElement );\n    var fullRect = readElement( fullElement );\n    return transition( keyframes( thumbRects[ idx ], fullRect, -1 ) );\n}\n\nif ( renderer === null ) {\n    var asyncNoop = () => Promise.resolve();\n    module.exports = {\n        hide: asyncNoop,\n        show: asyncNoop,\n        toGrid: asyncNoop,\n        toFullscreen: asyncNoop\n    }\n} else {\n    renderer.canvas.classList.add( 'transition-renderer' );\n    renderer.canvas.style.display = 'none';\n    document.body.appendChild( renderer.canvas );\n    module.exports = { hide, show, toGrid, toFullscreen };\n}\n\n// var canvas = document.createElement('canvas');\n// canvas.classList.add('transition-renderer');\n// document.body.appendChild( canvas );\n// var resize = () => {\n//     canvas.width = window.innerWidth;\n//     canvas.height = window.innerHeight;\n// }\n// resize();\n// window.addEventListener( 'resize', resize )\n// var draw = renderer( canvas );\n\n// var tween = ( thumbnail, full, dir ) => {\n//     var scale = full.size[ 0 ] / thumbnail.size[ 0 ];\n//     var fullscreenCenterOffset = v2.sub( viewportCenter(), full.position );\n//     var thumbFullscreenCenter = v2.add( thumbnail.position, v2.scale( fullscreenCenterOffset, 1 / scale ) );\n//     var offset = v2.sub( viewportCenter(), thumbFullscreenCenter );\n//     var identity = { offset: v2(), scale: 1 };\n//     var transformed = { offset, scale };\n//     return dir === 1\n//         ? { from: identity, to: transformed }\n//         : { from: transformed, to: identity };\n// }\n\n// var anim = ( { from, to }, onProgress ) => {\n//     var offset = v2();\n//     var update = state => {\n//         offset[ 0 ] = lerp( from.offset[ 0 ], to.offset[ 0 ], state.x );\n//         offset[ 1 ] = lerp( from.offset[ 1 ], to.offset[ 1 ], state.y );\n//         onProgress({ offset, scale: lerp( from.scale, to.scale, state.scale ) })\n//     };\n//     return animate( { x: .003, y: .003, scale: .002 }, update );\n// }\n\n// var viewportCenter = () => v2( window.innerWidth / 2, window.innerHeight / 2 );\n// var center = ({ position, size }) => v2.add( position, v2.scale( size, .5 ) );\n\n// var scaleAround = ( point, origin, scale ) => {\n//     return v2.add( v2.scale( v2.subtract( point, origin ), scale ), origin )\n// }\n\n// var transform = ( { offset, scale }, origin ) => rect => ({\n//     position: v2.add( scaleAround( rect.position, origin, scale ), v2.scale( offset, scale ) ),\n//     size: v2.scale( rect.size, scale )\n// });\n\n// // var draw = rects => {\n// //     ctx.clearRect( 0, 0, canvas.width, canvas.height );\n// //     ctx.fillStyle = 'black';\n// //     ctx.fillRect( 0, 0, canvas.width, canvas.height );\n// //     ctx.fillStyle = 'white';\n// //     rects.forEach( ({ position, size }) => {\n// //         if (\n// //             position[ 0 ] > window.innerWidth ||\n// //             position[ 1 ] > window.innerHeight ||\n// //             position[ 0 ] + size[ 0 ] < 0 ||\n// //             position[ 1 ] + size[ 1 ] < 0\n// //         ) return;\n// //         ctx.fillRect( position[ 0 ], position[ 1 ], size[ 0 ], size[ 1 ] );\n// //     })\n// // }\n\n// var render = rects => {\n//     var c = viewportCenter();\n//     return state => draw( rects.map( transform( state, c ) ) )\n// }\n\n// var readElement = el => {\n//     var rect = el.getBoundingClientRect();\n//     return {\n//         size: v2( rect.width, rect.height ),\n//         position: v2( rect.left, rect.top )\n//     }\n// }\n\n// var show = () => new Promise( resolve => {\n//     console.log( 'show' )\n//     canvas.style.display = 'block';\n//     resolve();\n// })\n\n// var hide = () => new Promise( resolve => {\n//     console.log( 'hide' )\n//     canvas.style.display = '';\n//     resolve();\n// })\n\n\n// var toFullscreen = ( id, viewport ) => {\n//     var thumbs = [ ...document.querySelectorAll('.projects .page') ];\n//     var idx = thumbs.findIndex( el => el.id === id );\n//     var thumbRects = thumbs.map( readElement );\n//     var fullSize = fullscreen( thumbRects[ idx ].size, viewport ).size;\n//     var fullRect = {\n//         size: fullSize,\n//         position: v2(\n//             ( viewport.size[ 0 ] - fullSize[ 0 ] ) / 2,\n//             viewport.margins[ 0 ][ 1 ]\n//         )\n//     }\n//     return anim( tween( thumbRects[ idx ], fullRect, 1 ), render( thumbRects ) )\n// }\n\n// var npo2 = x => {\n//     var r = 1;\n//     while ( r < x ) r *= 2;\n//     return r;\n// }\n// var drawTexture = imgs => {\n//     var canvas = document.createElement( 'canvas' );\n//     var ctx = canvas.getContext( '2d' );\n//     canvas.width = Math.min( npo2( window.innerWidth ), 2048 );\n//     canvas.height = Math.min( npo2( window.innerHeight ), 2048 );\n//     ctx.scale( canvas.width / window.innerWidth, canvas.height / window.innerHeight );\n//     imgs.forEach( img => {\n//         var rect = img.getBoundingClientRect();\n//         // if ( rect.bottom > 0 && rect.top < window.innerHeight ) {\n//             ctx.drawImage( img, rect.left, rect.top, rect.width, rect.height );\n//         // }\n//     });\n//     return canvas;\n// }\n\n// var toGrid = fullElement => {\n//     var thumbs = [ ...document.querySelectorAll('.projects .page') ];\n//     var idx = thumbs.findIndex( el => el.id === fullElement.id );\n//     var thumbRects = thumbs.map( readElement );\n//     var fullRect = readElement( fullElement );\n//     return anim( tween( thumbRects[ idx ], fullRect, -1 ), render( thumbRects ) )\n// }\n\n// module.exports = { show, hide, toFullscreen, toGrid }","undoManager":{"mark":-1,"position":-1,"stack":[]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":5,"column":23},"end":{"row":5,"column":23},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1536148830000}