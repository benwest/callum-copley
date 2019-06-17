var v2 = require('./utils/vec2');
var { clamp, map, lerp, invPow } = require('./utils/math');
var v2 = require('./utils/vec2');
var animate = require('./animate');
var tween = require('./utils/tween');
var { wait } = require('./utils/time');

var MARGIN = 20;

var FULLSCREEN_SIZE = .9;
// Page.MAX_IMG_SIZE = 90;

var Page = el => ({
    el,
    project: el.dataset.project,
    img: el.querySelector('img'),
    size: v2( ...JSON.parse( el.querySelector('img').dataset.size ) ),
    idx: Number( el.dataset.idx ),
    pages: Number( el.dataset.pages ),
})

var main = document.querySelector('main');
var header = document.querySelector('header');
var projectDisplay = document.querySelector('.controls__project')
var pageDisplay = document.querySelector('.controls__page')
var scroll = document.querySelector('.scroll');
var pages = [ ...document.querySelectorAll('.page') ].map( Page );

var viewport = () => v2.elementSize( main )
var scrollTop = () => scroll.scrollTop;

var layoutGrid = () => {
    var vp = viewport();
    var scale = map( vp[ 0 ], 300, 1000, .07, .09 );
    var max = v2.scale( vp, FULLSCREEN_SIZE );
    var blocks = pages.map( page => {
        var size = v2.scale( page.size, scale );
        var maxScale = v2.contain( page.size, max );
        var maxSize = v2.scale( page.size, maxScale );
        var margin = v2.scale( v2.sub( vp, maxSize ), 1 / maxScale / 2 * scale );
        var m = Math.max( margin[ 0 ], margin[ 1 ] );
        margin[ 0 ] = Math.max( margin[ 0 ], MARGIN );
        margin[ 1 ] = Math.max( margin[ 1 ], MARGIN );
        return { page, size, margin };
    })
    var x = 0;
    var marginX = MARGIN * 2;
    var rows = [];
    var row = [];
    // var project = pages[ 0 ].project;
    blocks.forEach( ( block, i ) => {
        var right = x + Math.max( block.margin[ 0 ], marginX ) + block.size[ 0 ] + MARGIN;
        if ( right > vp[ 0 ]/* || pages[ i ].project !== project */) {
            rows.push( row );
            row = [];
            x = 0;
            marginX = MARGIN * 2;
            // project = pages[ i ].project;
        }
        var margin = row.length === 0 ? marginX : Math.max( block.margin[ 0 ], marginX );
        block.position = v2( x + margin, 0 );
        marginX = block.margin[ 0 ];
        x += margin + block.size[ 0 ];
        row.push( block );
    })
    rows.push( row );
    var y = 0;
    var marginY = MARGIN * 2;
    rows.forEach( row => {
        var maxHeight = Math.max( ...row.map( block => block.size[ 1 ] ) );
        var maxMargin = Math.max( ...row.map( block => block.margin[ 1 ] ) );
        var rowTop = y + Math.max( marginY, maxMargin );
        var rowCenter = rowTop + maxHeight / 2;
        // row.forEach( block => block.position[ 1 ] = rowCenter - block.size[ 1 ] / 2 );
        row.forEach( block => block.position[ 1 ] = rowTop );
        y = rowTop + maxHeight;
        marginY = maxMargin;
    })
    return { height: y + marginY, blocks }
}

var renderGrid = blocks => pages.forEach( ( page, i ) => {
    var { position, size } = blocks[ i ];
    Object.assign( page.el.style, {
        width: size[ 0 ] + 'px',
        height: size[ 1 ] + 'px',
        left: position[ 0 ] + 'px',
        top: position[ 1 ] + 'px'
    })
})

var updateGrid = () => renderGrid( layoutGrid().blocks );

var showProject = project => pages.forEach( page => {
    if ( project !== page.project ) page.el.style.display = 'none';
})

var renderList = () => {
    var vp = viewport();
    pages.forEach( page => page.el.style.height = vp[ 1 ] + 'px' );
}

var updateList = () => {
    var i = Math.floor( scrollTop() / viewport()[ 1 ] );
    var page = pages[ i ];
    projectDisplay.innerText = page.project;
    pageDisplay.innerText = `${ page.idx + 1 } / ${ page.pages }`
    pages[ i ].img.src = pages[ i ].img.dataset.src;
    if ( i < pages.length - 1 ) pages[ i + 1 ].img.src = pages[ i + 1 ].img.dataset.src;
}

var resetStyles = () => pages.forEach( page => page.el.style.cssText = null )

var states = {
    grid: {
        enter: () => {
            updateGrid();
            main.classList.add( 'grid' );
            window.addEventListener( 'resize', updateGrid )
        },
        exit: () => {
            main.classList.remove( 'grid' );
            window.removeEventListener( 'resize', updateGrid );
            resetStyles();
        }
    },
    list: {
        enter: i => {
            main.classList.add('list');
            header.classList.add('show-detail')
            showProject( pages[ i ].project );
            window.addEventListener( 'resize', renderList );
            scroll.addEventListener( 'scroll', updateList );
            renderList();
            scroll.scrollTop = pages[ i ].idx * viewport()[ 1 ]
        },
        exit: () => {
            main.classList.remove('list');
            header.classList.remove('show-detail')
            window.removeEventListener( 'resize', renderList );
            scroll.removeEventListener( 'scroll', updateList );
            resetStyles();
        }
    },
    transition: {
        enter: ({ toState, toArgs, targetIndex, scrollTop }) => {
            var { blocks, height } = layoutGrid();
            var target = blocks[ targetIndex ];
            var vp = viewport();
            if ( scrollTop === undefined ) {
                const center = target.position[ 1 ] + target.size[ 1 ] / 2;
                scrollTop = clamp( center - vp[ 1 ] / 2, 0, height - vp[ 1 ] );
            }
            var headerHeight = window.innerHeight - vp[ 1 ];
            blocks.forEach( block => block.position[ 1 ] += -scrollTop + headerHeight );
            renderGrid( blocks );
            var center = v2.scale( vp, .5 );
            center[ 1 ] += headerHeight;
            pages.forEach( ( page, i ) => {
                var { position } = blocks[ i ];
                var offset = v2.sub( center, position );
                page.el.style.transformOrigin = `${ offset[ 0 ] }px ${ offset[ 1 ] }px`;
            });
            var max = v2.scale( vp, .9 );
            var scale = v2.contain( target.size, max );
            var zero = v2();
            var offset = v2.sub( center, v2.add( target.position, v2.scale( target.size, .5 ) ) );
            main.classList.add('transition');
            var dir = toState === 'list'
                ? x => x
                : x => 1 - x
            var render = state => {
                var x = lerp( 0, offset[ 0 ], dir( state.x ) );
                var y = lerp( 0, offset[ 1 ], dir( state.y ) );
                var s = lerp( 1, scale, dir( Math.pow( state.scale, 2 ) ) );
                pages.forEach( page => {
                    page.el.style.transform = `scale( ${ s }, ${ s } ) translate( ${ x }px, ${ y }px )`;
                })
            }
            render({ x: 0, y: 0, scale: 0 });
            animate({
                x: .003,
                y: .003,
                scale: .002
            }, render )
            .then(() => {
                setState( toState, ...toArgs )
                if ( toState === 'grid' ) scroll.scrollTop = scrollTop;
            })
            
        },
        exit: () => {
            main.classList.remove('transition');
            resetStyles();
        }
    }
}

var state = null;
var setState = ( toState, ...args ) => {
    if ( state !== null ) states[ state ].exit();
    state = toState;
    states[ state ].enter( ...args );
}

setState('grid');

pages.forEach( ( page, i ) => {
    page.el.addEventListener('click', () => {
        if ( state !== 'grid' ) return;
        setState( 'transition', {
            toState: 'list',
            scrollTop: scrollTop(),
            targetIndex: i,
            toArgs: [ i ]
        });
    })
})

document.querySelector('.controls__exit').addEventListener( 'click', () => {
    var h = viewport()[ 1 ];
    var fromScroll = scrollTop();
    var toIdx = Math.round( fromScroll / h );
    var toScroll = toIdx * h;
    tween({
        from: fromScroll,
        to: toScroll,
        duration: Math.abs( fromScroll - toScroll ),
        onProgress:
        st => scroll.scrollTop = st
    }).then( () => {
        setState( 'transition', { toState: 'grid' })
    })
})

// var indexOfMax = arr => arr.indexOf( Math.max( ...arr ) );
// var widest = pages[ indexOfMax( pages.map( p => p.size[ 0 ] ) ) ];
// pages.forEach( p => p.setMaxSize( widest.size ) );
// window.addEventListener('resize', () => {
//     pages.forEach( p => p.setScale(  );
// })


// var A4 = [ 210, 297 ];
// var MARGIN = [ 40, 40 ];
// var v2 = require('./utils/vec2');
// var { vec2, mat2d } = require('gl-matrix');
// var { clamp } = require('./utils/math');
// var tween = require('./utils/tween');
// var { grid, distribute } = require('./grid');

// var data = JSON.parse( document.querySelector('#data').innerText );

// var header = document.querySelector('header');
// var main = document.querySelector('main');

// var createElement = () => {
//     var el = document.createElement('img');
//     el.classList.add('page');
//     return el;
// }

// var pages = data.projects
//     .reduce( ( acc, project ) => acc.concat( project.pages ), [] )
//     .map( page => ({ element: createElement(), ...page }))

// var viewport = () => v2.elementSize( main )

// var state = {
//     scale: 1,
//     center: v2(),
//     blur: 0,
//     animating: false
// }

// var minScale = 1;
// var maxScale = 1;
// var bounds = [ v2(), v2() ]

// var layout = () => {
//     var vp = viewport();
//     var containerInnerSize = v2.sub( vp, v2.scale( MARGIN, 2 ) );
//     var containerRatio = v2.ratio( containerInnerSize );
//     var maxPageSize = v2(
//         Math.max( ...pages.map( p => p.size[ 0 ] ) ),
//         Math.max( ...pages.map( p => p.size[ 1 ] ) )
//     )
//     var cells = grid( containerRatio, containerRatio, pages.length );
//     var minGridSize = v2.add( v2.mult( maxPageSize, cells ), v2.mult( MARGIN, v2.sub( cells, [ 1, 1 ] )));
//     var gridSize = v2.scale( containerInnerSize, v2.cover( containerInnerSize, minGridSize ) );
//     var centers = distribute( cells, maxPageSize, gridSize );
//     pages.forEach( ( page, i ) => page.center = centers[ i ] );
//     minScale = v2.contain( gridSize, containerInnerSize );
//     maxScale = v2.contain( maxPageSize, containerInnerSize );
//     state.scale = clamp( state.scale, minScale, maxScale );
// }

// var transformMatrix = () => {
//     var m = mat2d.create();
//     mat2d.translate( m, m, v2.scale( state.center, -1 ) );
//     mat2d.multiplyScalar( m, m, state.scale );
//     mat2d.translate( m, m, v2.scale( v2.scale( viewport(), .5 ), 1 / state.scale ) );
//     return m;
// }

// var visible = ( [ cx, cy ], [ w, h ] ) => (
//     cx - w / 2 < window.innerWidth &&
//     cy - h / 2 < window.innerHeight &&
//     cx + w / 2 > 0 &&
//     cy + h / 2 > 0
// )

// var render = () => {
//     var m = transformMatrix();
//     var rects = pages.map( page => ({
//         position: vec2.transformMat2d( vec2.create(), page.center, m ),
//         size: v2.scale( page.size, state.scale ),
//         element: page.element
//     }))
    
//     pages.forEach( page => {
//         var p = vec2.transformMat2d( vec2.create(), page.center, m );
//         var size = v2.scale( page.size, state.scale );
//         Object.assign( page.element.style, {
//             left: p[ 0 ] + 'px',
//             top: p[ 1 ] + 'px',
//             width: size[ 0 ] + 'px',
//             height: size[ 1 ] + 'px',
//             display: visible( p, size ) ? 'block' : 'none'
//         })
//     })
// }

// var lerp = ( a, b, t ) => a + ( b - a ) * t;

// var rand = ( min, max ) => min + Math.floor( Math.random() * ( max - min + 1 ) )
// var sample = a => a[ rand( 0, a.length - 1 ) ];
// var intermix = arrays => {
//     arrays = arrays.map( a => a.slice() );
//     var ret = [];
//     var len = arrays.reduce( ( sum, a ) => sum + a.length, 0 );
//     for ( var i = 0; i < len; i++ ) {
//         ret.push( sample( arrays.filter( a => a.length > 0 ) ).shift() );
//     }
//     return ret;
// }


// var animator = onProgress => ( from, to, duration ) => () => tween({ from, to, duration, onProgress: x => {
//     onProgress( x );
//     render();
// }});
// var xAnimator = animator( x => state.center[ 0 ] = x );
// var yAnimator = animator( x => state.center[ 1 ] = x );
// var scaleAnimator = animator( x => state.scale = x );


// var fumble = ( from, to, numSteps = Math.random() > .5 ? 3 : 2 ) => {
//     var steps = [ from ];
//     var p = from;
//     for ( var i = 1; i < numSteps - 1; i++ ) {
//         var d = to - p;
//         p += d * ( Math.random() * .2 + .9 );
//         steps.push( p );
//     }
//     steps.push( to );
//     return steps;
// }
// var pairwise = arr => {
//     var pairs = [];
//     for ( var i = 0; i < arr.length - 1; i++ ) {
//         pairs.push( [ arr[ i ], arr[ i + 1 ] ] );
//     }
//     return pairs;
// }
// var animation = ( animator, from, to, duration ) => {
//     return pairwise( fumble( from, to ) ).map( ([ from, to ]) => {
//         return animator( from, to, duration )
//     })
// }

// var sequence = fns => fns.reduce( ( p, fn ) => p.then( fn ), Promise.resolve() )

// var moveTo = ( toScale, toCenter, duration ) => {
//     if ( state.animating ) return;
//     state.animating = true;
//     return sequence( intermix([
//         animation( xAnimator, state.center[ 0 ], toCenter[ 0 ], duration ),
//         animation( yAnimator, state.center[ 1 ], toCenter[ 1 ], duration ),
//         animation( scaleAnimator, state.scale, toScale, 500 ),
//         Array( 4 ).fill( 0 ).map( () => () => new Promise( resolve => setTimeout( resolve, 100 )))
//     ])).then( () => state.animating = false );
//     // return tween({ duration, onProgress: t => {
//     //     state.center[ 0 ] = lerp( fromCenter[ 0 ], toCenter[ 0 ], t );
//     //     state.center[ 1 ] = lerp( fromCenter[ 1 ], toCenter[ 1 ], t );
//     //     state.scale = lerp( fromScale, toScale, t );
//     //     render();
//     // }})
// }

// var setSize = size => pages.forEach( page => page.element.src = page[ size ] );
// var zoomTo = ( page, duration = 200 ) => moveTo( maxScale, page.center, duration ).then( () => setSize( 'large' ) );
// var zoomOut = ( duration = 200 ) => {
//     setSize( 'small' );
//     moveTo( minScale, v2(), duration );
// }

// pages.forEach( page => {
//     page.element.addEventListener( 'click', () => zoomTo( page ) )
//     main.appendChild( page.element )
// });

// document.querySelector('.controls__exit' ).addEventListener( 'click', () => zoomOut() )

// window.addEventListener( 'resize', () => {
//     layout();
//     render();
// });
// layout();
// zoomOut( 0 );