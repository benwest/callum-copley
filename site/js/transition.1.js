var html = require('nanohtml');
var morph = require('nanomorph');

var animate = require('./animate');
var grid = require('./grid');
var v2 = require('./utils/vec2');
var { clamp, lerp } = require('./utils/math');
var css = require('./utils/css');

var { viewport, pageMargins, inset } = require('./metrics');

var bottom = block => block.position[ 1 ] + block.size[ 1 ] + block.margins[ 1 ][ 1 ];

var targetCenter = block => {
    var tl = v2.sub( block.position, block.margins[ 0 ] );
    var size = v2.add( block.size, v2.add( block.margins[ 0 ], block.margins[ 1 ] ) );
    return v2.add( tl, v2.scale( size, .5 ) );
}

var targetScale = block => {
    var max = v2.sub( viewport(), v2.add( ...pageMargins() ) );
    return v2.contain( block.size, max );
}

module.exports = ( state, { toRoute, toArgs, targetIndex, scrollTop, dir }) => {
    var { blocks } = grid.layout( state );
    var target = blocks[ targetIndex ];
    var vp = viewport();
    var height = Math.max( ...blocks.map( bottom ) );
    if ( scrollTop === undefined ) {
        const center = target.position[ 1 ] + target.size[ 1 ] / 2;
        scrollTop = clamp( center - vp[ 1 ] / 2, 0, height - vp[ 1 ] );
    }
    // var top = state.dom.getBoundingClientRect().top;
    blocks.forEach( block => block.position[ 1 ] += -scrollTop );
    var center = v2.scale( vp, .5 );
    morph( state.dom, html`
        <main>
            <article>
                ${ blocks.map( ({ size, position, src }) => {
                    var offset = v2.sub( center, position );
                    var style = {
                        width: size[ 0 ] + 'px',
                        height: size[ 1 ] + 'px',
                        left: position[ 0 ] + 'px',
                        top: position[ 1 ] + 'px',
                        'transform-origin': `${ offset[ 0 ] }px ${ offset[ 1 ] }px`
                    };
                    return html`<img class="thumbnail" src=${ src } style=${ css( style ) }>`;
                })}
            </article>
        </main>
    `);
    state.dom.querySelector('article').scrollTop = 0;
    var pages = state.dom.querySelectorAll('img');
    var maxSize = inset( vp, pageMargins( target.size ) );
    var scale = maxSize[ 0 ] / target.size[ 0 ];
    var offset = v2.sub( center, targetCenter( target ) );
    var direction = dir === 1
        ? x => x
        : x => 1 - x;
    var render = state => {
        var x = lerp( 0, offset[ 0 ], direction( state.x ) );
        var y = lerp( 0, offset[ 1 ], direction( state.y ) );
        var s = lerp( 1, scale, direction( Math.pow( state.scale, 2 ) ) );
        pages.forEach( page => {
            page.style.transform = `scale( ${ s }, ${ s } ) translate( ${ x }px, ${ y }px )`;
        });
    };
    render({ x: 0, y: 0, scale: 0 });
    animate({
        x: .003,
        y: .003,
        scale: .002
    }, render )
    .then(() => {
        state.go( toRoute, ...toArgs );
        if ( toRoute === 'grid' ) state.dom.querySelector('article').scrollTop = scrollTop;
    });
};