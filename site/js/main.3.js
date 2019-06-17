var flyd = require('flyd');
var html = require('bel');
var nanomorph = require('nanomorph');

var v2 = require('./utils/vec2');
var { map } = require('./utils/math');

var MARGIN = 20;
var FULLSCREEN_SIZE = .9;

var updateStyle = ( element, style ) => {
    element.style.cssText = null;
    for ( var key in style ) {
        if ( element.style[ key ] !== style[ key ] )
            element.style[ key ] = style[ key ];
        // element.style[ key ] = style[ key ];
    }
}

var pages = [ ...document.querySelectorAll('.page') ];
var imgs = [ ...document.querySelectorAll('.page img') ];

var data = imgs.map( el => ({
    size: JSON.parse( el.dataset.size ),
    srcs: { small: el.src, large: el.dataset.src }
}));

// var Page = el => {
//     // var size = v2( ...JSON.parse( el.querySelector('img').dataset.size ) );
//     var img = el.querySelector('img');
//     var srcs = { small: img.src, large: img.dataset.src };
//     var src = flyd.stream('small');
//     var style = flyd.stream({});
//     flyd.on( src => img.src = srcs[ src ], src );
//     flyd.on( style => updateStyle( el, style ), style );
//     return { style, src }
// }

var main = document.querySelector('main');
// var pages = [ ...document.querySelectorAll('.page') ].map( Page );

var state = flyd.stream('grid');
var viewport = flyd.stream( v2.elementSize( main ) );
window.addEventListener('resize', () => viewport( v2.elementSize( main ) ) );

var scrollTop = flyd.stream( 0 );
main.addEventListener( 'scroll', () => scrollTop( main.scrollTop ) )

// var Page = el => ({
//     el,
//     img: el.querySelector('img'),
//     size: v2( ...JSON.parse( el.querySelector('img').dataset.size ) ),
// });

var gridViewModel = flyd.combine( viewport => {
    console.log( 'gridviewmodel updated' );
    var vp = viewport();
    var scale = map( vp[ 0 ], 300, 1000, .07, .09 );
    var max = v2.scale( vp, .9 );
    var blocks = data.map( ({ size }) => {
        var maxScale = v2.contain( size, max );
        var maxSize = v2.scale( size, maxScale );
        var margin = v2.scale( v2.sub( vp, maxSize ), 1 / maxScale / 2 * scale );
        margin[ 0 ] = Math.max( margin[ 0 ], MARGIN );
        margin[ 1 ] = Math.max( margin[ 1 ], MARGIN );
        return { size: v2.scale( size, scale ), margin };
    })
    var x = 0;
    var marginX = MARGIN;
    var rows = [];
    var row = [];
    blocks.forEach( ( block, i ) => {
        var right = x + Math.max( block.margin[ 0 ], marginX ) + block.size[ 0 ] + MARGIN;
        if ( right > vp[ 0 ] ) {
            rows.push( row );
            row = [];
            x = 0;
            marginX = MARGIN;
        }
        var margin = row.length === 0 ? marginX : Math.max( block.margin[ 0 ], marginX );
        block.position = v2( x + margin, 0 );
        marginX = block.margin[ 0 ];
        x += margin + block.size[ 0 ];
        row.push( block );
    })
    rows.push( row );
    var y = 0;
    var marginY = MARGIN;
    rows.forEach( row => {
        var maxHeight = Math.max( ...row.map( block => block.size[ 1 ] ) );
        var maxMargin = Math.max( ...row.map( block => block.margin[ 1 ] ) );
        var rowTop = y + Math.max( marginY, maxMargin );
        var rowCenter = rowTop + maxHeight / 2;
        row.forEach( block => block.position[ 1 ] = rowCenter - block.size[ 1 ] / 2 );
        y = rowTop + maxHeight;
        marginY = maxMargin;
    });
    return {
        main: { class: 'grid', style: { height: y + marginY + 'px' } },
        pages: blocks.map( ({ position, size }, i ) => ({
            src: data[ i ].srcs.small,
            style: {
                left: position[ 0 ] + 'px',
                top: position[ 1 ] + 'px',
                width: size[ 0 ] + 'px',
                height: size[ 1 ] + 'px'
            }
        }))
    }
}, [ viewport ] );

// var gridView = ({ size, blocks }) => {
//     return html`
//         <main class="grid" style="height: ${ size[ 1 ] }px">
//             ${ blocks.map( ({ size, position }, i ) => {
//                 return html`
//                     <div
//                         class="page"
//                         id="${ i }"
//                         style="
//                             width: ${ size[ 0 ] }px;
//                             height: ${ size[ 1 ] }px;
//                             left: ${ position[ 0 ] }px;
//                             top: ${ position[ 1 ] }px;
//                         "
//                     >
//                         <img src="${ pages[ i ].small }">
//                     </div>
//                 ` 
//             }) }
//         </main>
//     `
// }

var listViewModel = flyd.combine( ( viewport, scrollTop ) => {
    console.log( 'listviewmodel updated' );
    var itemHeight = viewport()[ 1 ];
    var idx = Math.floor( scrollTop() / itemHeight );
    var srcs = data.map( ( { srcs }, i ) => i === idx || i === idx + 1 ? srcs.large : srcs.small );
    // return { itemHeight, srcs };
    return {
        main: { class: 'list', style: {} },
        pages: srcs.map( src => ({ src, style: { height: itemHeight + 'px' } }))
    }
}, [ viewport, scrollTop ] );

var viewModel = flyd.immediate( flyd.combine( ( viewport, state, gridViewModel, listViewModel ) => {
    console.log( 'viewmodel updated' );
    switch ( state() ) {
        case 'grid':
            return gridViewModel();
        case 'list':
            return listViewModel();
    }
}, [ viewport, state, gridViewModel, listViewModel ]))

var render = vm => {
    main.className = vm.main.class;
    updateStyle( main, vm.main.style );
    vm.pages.forEach( ( page, i ) => {
        if ( imgs[ i ].src !== page.src ) imgs[ i ].src !== page.src;
        updateStyle( pages[ i ], page.style );
    })
}

flyd.on( render, viewModel );

// var dom = flyd.combine( ( view, self ) => {
//     console.log( 'dom updated' );
//     if ( self() === undefined ) return view();
//     nanomorph( self(), view() )
//     return self();
// }, [ view ] )

// var updateViewport = () => {
//     var size = v2.elementSize( dom() );
//     var vp = viewport();
//     if ( !vp || !v2.equal( size, vp ) ) {
//         console.log( 'vp update' );
//         viewport( size );
//     }
// }

// document.body.appendChild( dom() );
// updateViewport();
document.body.addEventListener( 'click', () => state( state() === 'grid' ? 'list' : 'grid' ) )