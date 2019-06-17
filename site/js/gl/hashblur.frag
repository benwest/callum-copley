// Author:
// Title:

#ifdef GL_ES
precision highp float;
#endif

#define TAU 6.28318530718

uniform vec2 resolution;
uniform mat3 transform;
uniform mat3 prevTransform;
uniform sampler2D texture;

const int iterations = 20;

float random ( vec2 co ) {
    const float a = 12.9898;
    const float b = 78.233;
    const float c = 43758.5453;
    float dt = dot( co.xy, vec2( a, b ) );
    float sn = mod( dt, 3.14 );
    return fract( sin( sn ) * c );
}

vec2 mult ( inout vec2 r ) {
    r = fract(r * vec2(12.9898,78.233));
    return sqrt( r.x + .001 ) * vec2( sin( r.y * TAU ), cos( r.y * TAU ) );
}

vec4 sample ( vec2 p ) {
    vec4 color = texture2D( texture, p );
    vec4 grey = vec4( vec3( ( color.r + color.g + color.b ) / 3. ), color.a );
    vec2 mask = step( vec2( 0. ), p ) * step( p, vec2( 1. ) );
    return grey * mask.x * mask.y;
}

vec2 rotate( vec2 v, float a ) {
	float s = sin( a );
	float c = cos( a );
	mat2 m = mat2( c, -s, s, c );
	return m * v;
}

vec4 hashBlur ( vec2 p, vec2 size ) {
    vec2 rnd = vec2( random( vec2( p ) ) );
    vec4 acc = vec4( 0. );
    for ( int i = 0; i < iterations; i++ ) {
        acc += sample( p + size * mult( rnd ) );
    }
    return acc / float( iterations );
}

// vec4 invPow ( vec4 x, float e ) {
//     return vec4( 1. ) - pow( vec4( 1. ) - x, e );
// }

void main() {
    vec2 p = gl_FragCoord.xy / resolution;
    p.y = 1. - p.y;
    vec2 uv = ( transform * vec3( p, 1. ) ).xy;
    vec2 pUv = ( prevTransform * vec3( p, 1. ) ).xy;
    vec2 d = uv - pUv;
    gl_FragColor = hashBlur( uv, max( vec2( .001 ), d ) );
    
    
    // gl_FragColor = texture2D( texture, uv );
    // gl_FragColor = vec4( fract( uv * 20. ), 0., 1. );
    //vec2 st = gl_FragCoord.xy;
    //st.y = uResolution.y - st.y;
    // vec3 color = invPow( hashBlur( st, vec2( 0.000,0.100 ), 0.624 ), 2. );
    // gl_FragColor = sample( st );
}