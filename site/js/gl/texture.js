var canvas = document.createElement( 'canvas' )
var ctx = canvas.getContext( '2d' );

var npo2 = x => {
    var r = 1;
    while ( r < x ) r *= 2;
    return r;
}

module.exports = imgs => {
    canvas.width = Math.min( npo2( window.innerWidth ), 2048 );
    canvas.height = Math.min( npo2( window.innerHeight ), 2048 );
    ctx.scale( canvas.width / window.innerWidth, canvas.height / window.innerHeight );
    imgs.forEach( img => {
        var rect = img.getBoundingClientRect();
        if ( rect.bottom > 0 && rect.top < window.innerHeight ) {
            ctx.drawImage( img, rect.left, rect.top, rect.width, rect.height );
        }
    });
    return canvas;
}