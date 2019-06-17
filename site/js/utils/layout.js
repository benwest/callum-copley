var v2 = require('./vec2');
var { map } = require('./math');
var marginUtils = require('./margins');

var MIN = 20;

var thumbnailScale = viewport => map( viewport.size[ 0 ], 300, 1000, .07, .09 );

var fullscreen = ( pageSize, viewport ) => {
    var maxSize = marginUtils.innerSize( viewport );
    var scale = v2.contain( pageSize, maxSize );
    var size = v2.scale( pageSize, scale );
    var innerMargins = Array( 2 ).fill( v2.scale( v2.sub( maxSize, size ), .5 ) );
    var marginX = MIN / thumbnailScale( viewport );
    var margins = marginUtils.add( innerMargins, viewport.margins )
    margins[ 0 ][ 0 ] = margins[ 1 ][ 0 ] = Math.max( marginX, MIN );
    margins[ 0 ][ 1 ] = Math.max( MIN, margins[ 0 ][ 1 ] );
    margins[ 1 ][ 1 ] = Math.max( MIN, margins[ 0 ][ 1 ] );
    return { size, margins };
}

var thumbnail = ( pageSize, viewport ) => {
    var scale = thumbnailScale( viewport );
    var size = v2.scale( pageSize, scale );
    var fs = fullscreen( pageSize, viewport );
    var fullscreenScale = fs.size[ 0 ] / pageSize[ 0 ];
    var margins = fs.margins
        .map( v => v2.scale( v, ( 1 / fullscreenScale ) * scale ) )
        .map( v => v2( Math.max( MIN, v[ 0 ] ), Math.max( MIN, v[ 1 ] ) ) );
    return { size, margins }
}

var flow = ( pages, maxWidth = Infinity ) => {
    var x = 0;
    var marginX = 0;
    var rows = [];
    var row = [];
    var rects = pages.map( page => {
        var marginLeft = row.length > 0
            ? Math.max( page.margins[ 0 ][ 0 ], marginX )
            : 0; 
        var right = x + marginLeft + page.size[ 0 ];
        if ( right > maxWidth ) {
            rows.push( row );
            row = [];
            x = marginX = marginLeft = 0;
        }
        var rect = {
            position: v2( x + marginLeft, 0 ),
            size: page.size,
            margins: page.margins
        };
        row.push( rect );
        x += marginLeft + page.size[ 0 ];
        marginX = page.margins[ 1 ][ 0 ];
        return rect;
    });
    rows.push( row );
    var y = 0;
    var marginY = 0;
    rows.forEach( ( row, i ) => {
        var maxHeight = Math.max( ...row.map( rect => rect.size[ 1 ] ) );
        var maxTopMargin = Math.max( ...row.map( rect => rect.margins[ 0 ][ 1 ] ) );
        var maxBottomMargin = Math.max( ...row.map( rect => rect.margins[ 1 ][ 1 ] ) );
        var rowTop = i === 0 ? 0 : y + Math.max( marginY, maxTopMargin );
        row.forEach( ({ position }) => position[ 1 ] = rowTop );
        y = rowTop + maxHeight;
        marginY = maxBottomMargin;
    });
    return { rects, height: y };
}

var strip = ( pages, viewport ) => {
    var { rects } = flow( pages.map( page => fullscreen( page.size, viewport ) ) );
    var marginX = ( viewport.size[ 0 ] - rects[ 0 ].size[ 0 ] ) / 2;
    rects.forEach( ({ position }) => {
        position[ 0 ] += marginX;
        position[ 1 ] += viewport.margins[ 0 ][ 1 ];
    });
    var last = rects[ rects.length - 1 ];
    var width = last.position[ 0 ] + last.size[ 0 ] + marginX;
    return { rects, width };
}

var scrollTo = ( rect, viewport ) => {
    return rect.position[ 0 ] - viewport.size[ 0 ] / 2 + rect.size[ 0 ] / 2;
}

module.exports = { fullscreen, thumbnail, flow, strip, scrollTo };