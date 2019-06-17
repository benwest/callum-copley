var clamp = ( x, min, max ) => Math.min( Math.max( x, min ), max );
var lerp = ( a, b, t ) => a + ( b - a ) * t;
var map = ( x, oldMin, oldMax, newMin, newMax ) =>
    newMin + ( newMax - newMin ) * ( x - oldMin ) / ( oldMax - oldMin );
var cmap = ( x, oldMin, oldMax, newMin, newMax ) =>
    map( clamp( x, oldMin, oldMax ), oldMin, oldMax, newMin, newMax )
var invPow = ( x, p, max = 1 ) => max - Math.pow( max - x, p )

module.exports = { clamp, map, cmap, lerp, invPow };