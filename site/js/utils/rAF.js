var funcs = {};

var funcCount = 0;

var frame = false;

var then;

function tick(){

	var now = Date.now();

	var dT = now - then;

	for( var name in funcs ) {

		if( funcs[ name ]( now, dT ) === false ){

			stop( name );

		};

	}

	then = now;

	frame = requestAnimationFrame( tick );

}

function start( name, fn ) {

	if ( !fn ) {

		fn = name;

		name = Math.random().toString();

	}

	if ( name in funcs ) return name;

	funcs[ name ] = fn;

	funcCount++;

	if ( !frame ) {

		then = Date.now();

		frame = window.requestAnimationFrame( tick );

	}

	return name;

}

function stop ( name ) {

	if ( name === undefined ) {

	    funcs = {};

	    funcCount = 0;

	} else if ( name in funcs ) {

	    delete funcs[ name ];

		funcCount--;

	}

	if ( funcCount === 0 ) {

	    window.cancelAnimationFrame(frame);

		frame = false;

	}

}

var once = fn => {

	return start(( now, dT ) => {

		fn( now, dT );

		return false;

	});

}

module.exports = { start, once, stop };