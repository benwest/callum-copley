var loadImage = require("./utils/loadImage");

var canvas = document.createElement( 'canvas' );
document.body.appendChild( canvas );

var onResize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
}
window.addEventListener( 'resize', onResize );
onResize();

var gl = canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' );

var vs = gl.createShader( gl.VERTEX_SHADER );
gl.shaderSource( vs, `
    attribute vec2 aPosition;
    uniform vec2 uPosition;
    uniform vec2 uSize;
    uniform vec2 uResolution;
    void main () {
        gl_Position = vec4( aPosition, 0., 1. );
    }
`);
gl.compileShader( vs );

var fs = gl.createShader( gl.FRAGMENT_SHADER );
gl.shaderSource( fs, `
    precision highp float;
    uniform vec2 uSize;
    uniform vec2 uPosition;
    uniform sampler2D uTex;
    uniform vec2 uResolution;
    void main () {
        vec2 p = ( uSize / gl_FragCoord.xy );
        p.y = uResolution.y - p.y;
        float alpha = step( p.x, 1. );
        gl_FragColor = vec4( p, 0., alpha );
    }
`);
gl.compileShader( fs );
console.log( gl.getShaderInfoLog( vs ) );
console.log( gl.getShaderInfoLog( fs ) );

var shader = gl.createProgram();
gl.attachShader( shader, vs );
gl.attachShader( shader, fs );
gl.linkProgram( shader );
gl.useProgram( shader );

var buffer = new Float32Array([
    -1, -1,
    -1, 3,
    3, -1,
]);
gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
gl.bufferData( gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW );
var aPosition = gl.getAttribLocation( shader, "aPosition" );
gl.enableVertexAttribArray( aPosition );
gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );

var uPosition = gl.getUniformLocation( shader, "uPosition" );
var uSize = gl.getUniformLocation( shader, "uSize" );
var uResolution = gl.getUniformLocation( shader, "uResolution" );
var uTex = gl.getUniformLocation( shader, "uTex" );

gl.activeTexture( gl.TEXTURE0 );
gl.uniform1i( uTex, 0 );
gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
gl.disable( gl.DEPTH_TEST );

var textures = new WeakMap();
var getTexture = img => {
    if ( !textures.has( img ) ) {
        var texture = gl.createTexture();
        gl.bindTexture( gl.TEXTURE_2D, texture );
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
        textures.set( img, texture );
    }
    return textures.get( img );
}

module.exports = pages => {
    var { width, height } = canvas;
    gl.viewport( 0, 0, width, height );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT );
    gl.uniform2fv( uResolution, [ width, height ] );
    pages.slice(0, 1)
    .filter( ({ small }) => small in loadImage.done )
    .forEach( ({ position, size, small, large }) => {
        gl.uniform2fv( uPosition, position );
        gl.uniform2fv( uSize, size );
        gl.bindTexture( gl.TEXTURE_2D, getTexture( loadImage.done[ small ] ) );
        gl.drawArrays( gl.TRIANGLES, 0, 3 );
    });
}