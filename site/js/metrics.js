var v2 = require('./utils/vec2');
var { BREAKPOINT } = require('./config');

var header = document.querySelector('header')
var footer = document.querySelector('footer');

var margin = () => window.innerWidth < BREAKPOINT ? 20 : 40;
var gutter = () => margin() / 2;
var viewport = () => v2( window.innerWidth, window.innerHeight );

var margins = () => [ v2( margin(), header.offsetHeight ), v2( margin(), footer.offsetHeight ) ];

var inset = ( size, margins ) => v2(
    size[ 0 ] - ( margins[ 0 ][ 0 ] + margins[ 1 ][ 0 ] ),
    size[ 1 ] - ( margins[ 0 ][ 1 ] + margins[ 1 ][ 1 ] )
)

var pageMargins = pageSize => {
    var ms = margins();
    var maxSize = inset( viewport(), ms );
    var size = v2.scale( pageSize, v2.contain( pageSize, maxSize ) );
    var space = v2.scale( v2.sub( maxSize, size ), .5 );
    return [
        v2.add( ms[ 0 ], space ),
        v2.add( ms[ 1 ], space )
    ];
}

module.exports = { inset, viewport, margin, gutter, pageMargins };