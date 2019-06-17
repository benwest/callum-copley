var done = {};

var loadImage = src => new Promise( resolve => {
    if ( src in done ) {
        resolve( done[ src ] );
    } else {
        var img = new Image();
        img.onload = () => {
            done[ src ] = img;
            resolve( img );
        }
        img.src = src;
    }
})

loadImage.done = done;

module.exports = loadImage;