var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var main = document.querySelector('main');
main.appendChild( canvas );
var { width, height } = main.getBoundingClientRect();

canvas.draw = rects => {
    ctx.fillStyle = 'black';
    ctx.fillRect( 0, 0, canvas.width, canvas.height );
    ctx.fillStyle = 'white';
    rects.forEach( ({ position, size }) => {
        ctx.rect(
            position[ 0 ] - size[ 0 ] / 2,
            position[ 1 ] - size[ 1 ] / 2,
            position[ 0 ] + size[ 0 ] / 2,
            position[ 1 ] + size[ 1 ] / 2
        )
    })
    ctx.fill();
}