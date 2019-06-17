var v2 = require('./utils/vec2');

var grid = ( containerRatio, targetCellRatio, count ) => {
    var cells = [ 0, 0 ];
    var diff = Infinity;
    for ( var w = 1; w <= count; w++ ) {
        var h = Math.ceil( count / w );
        var cellRatio = v2.ratio( v2( 1 / w, containerRatio / h ) );
        var d = Math.abs( cellRatio - targetCellRatio );
        if ( d < diff ) {
            diff = d;
            cells = [ w, h ];
        }
    }
    return cells;
}

var distribute = ( cells, cellSize, gridSize ) => {
    var gutters = v2.sub( cells, [ 1, 1 ] );
    var contentSize = v2.mult( cellSize, cells );
    var free = v2.sub( gridSize, contentSize );
    var gutter = v2(
        gutters[ 0 ] === 0 ? 0 : free[ 0 ] / gutters[ 0 ],
        gutters[ 1 ] === 0 ? 0 : free[ 1 ] / gutters[ 1 ]
    );
    var d = v2.add( cellSize, gutter );
    var offsets = [], row, column;
    for ( row = 0; row < cells[ 1 ]; row++ ) {
        for ( column = 0; column < cells[ 0 ]; column++ ) {
            offsets.push( v2.mult( v2( column, row ), d ));
        }
    }
    var halfCell = v2.scale( cellSize, .5 );
    var halfGrid = v2.scale( gridSize, .5 );
    return offsets.map( o => v2.sub( v2.add( o, halfCell ), halfGrid ) );
    return offsets.map( o => v2.add( o, halfCell ) );
}

module.exports = { grid, distribute };