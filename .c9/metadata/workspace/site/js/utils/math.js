{"changed":false,"filter":false,"title":"math.js","tooltip":"/site/js/utils/math.js","value":"var clamp = ( x, min, max ) => Math.min( Math.max( x, min ), max );\nvar lerp = ( a, b, t ) => a + ( b - a ) * t;\nvar map = ( x, oldMin, oldMax, newMin, newMax ) =>\n    newMin + ( newMax - newMin ) * ( x - oldMin ) / ( oldMax - oldMin );\nvar cmap = ( x, oldMin, oldMax, newMin, newMax ) =>\n    map( clamp( x, oldMin, oldMax ), oldMin, oldMax, newMin, newMax )\nvar invPow = ( x, p, max = 1 ) => max - Math.pow( max - x, p )\n\nmodule.exports = { clamp, map, cmap, lerp, invPow };","undoManager":{"mark":-1,"position":-1,"stack":[]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":0,"column":0},"end":{"row":8,"column":52},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1530832361328}