var v2 = require('./vec2');

var innerSize = ({ size, margins }) => v2(
    size[ 0 ] - ( margins[ 0 ][ 0 ] + margins[ 1 ][ 0 ] ),
    size[ 1 ] - ( margins[ 0 ][ 1 ] + margins[ 1 ][ 1 ] )
)

var add = ( m1, m2 ) => [ v2.add( m1[ 0 ], m2[ 0 ] ), v2.add( m1[ 1 ], m2[ 1 ] ) ];

module.exports = { innerSize, add };