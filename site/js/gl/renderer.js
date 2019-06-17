var glslify = require('glslify');
var MagicUniforms = require('gl-magic-uniforms');
var frag = glslify.file('./hashblur.frag');

module.exports = ( canvas = document.createElement( 'canvas' ) ) => {
    
    var gl = canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' );
    
    if ( gl === null ) return null;
    
    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
    gl.disable( gl.DEPTH_TEST );
    
    var vs = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource( vs, `
        attribute vec2 aPosition;
        void main () {
            gl_Position = vec4( aPosition, 0., 1. );
        }
    `);
    gl.compileShader( vs );
    if ( !gl.getShaderParameter( vs, gl.COMPILE_STATUS ) ) {
        console.log( gl.getShaderInfoLog( vs ) );
    }
    
    var fs = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource( fs, frag );
    gl.compileShader( fs );
    if ( !gl.getShaderParameter( fs, gl.COMPILE_STATUS ) ) {
        console.log( gl.getShaderInfoLog( fs ) );
    }
    
    var shader = gl.createProgram();
    gl.attachShader( shader, vs );
    gl.attachShader( shader, fs );
    gl.linkProgram( shader );
    gl.useProgram( shader );
    
    var shaderUniforms = MagicUniforms( gl, shader );
    
    var buffer = new Float32Array([
        -1, 3,
        -1, -1,
        3, -1
    ]);
    gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW );
    var aPosition = gl.getAttribLocation( shader, "aPosition" );
    gl.enableVertexAttribArray( aPosition );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    
    // var uPosition = gl.getUniformLocation( shader, "uPosition" );
    // var uSize = gl.getUniformLocation( shader, "uSize" );
    // var uResolution = gl.getUniformLocation( shader, "uResolution" );
    
    gl.activeTexture( gl.TEXTURE0 );
    var texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    shaderUniforms.texture = 0;
    
    var uploadTexture = img => {
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img );
    }
    
    var setSize = ( width, height ) => {
        canvas.width = width;
        canvas.height = height;
        gl.viewport( 0, 0, width, height );
    }
    
    var draw = uniforms => {
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT );
        for ( var handle in uniforms ) {
            shaderUniforms[ handle ] = uniforms[ handle ];
        }
        gl.drawArrays( gl.TRIANGLES, 0, 3 );
    }
    
    return {
        canvas,
        uploadTexture,
        setSize,
        draw
    };
    
};