var m = require('mithril');
var fastdom = require('fastdom');
var rAF = require('./utils/rAF');

var content = JSON.parse( document.getElementById('content').innerText );
// content.projects = [ content.projects[ 0 ] ];
// content.projects[ 0 ].pages = [ content.projects[ 0 ].pages[ 0 ] ];
// console.log( content );

var View = require('./components/View');

document.body.classList.toggle( 'touch', 'ontouchstart' in window );

var cursor = document.querySelector( '.cursor' );
var mouse = [ 0, 0 ];
window.addEventListener( 'mousemove', e => {
    mouse[ 0 ] = e.clientX;
    mouse[ 1 ] = e.clientY;
});
rAF.start( 'cursor', () => cursor.style.transform = `translate( ${ mouse[ 0 ] }px, ${ mouse[ 1 ] }px )`)

m.route.prefix('');
m.route( document.querySelector('main'), '/', {
    '/': { render: vnode => m( View, { content, params: vnode.attrs } ) },
    '/:slug': { render: vnode => m( View, { content, params: vnode.attrs } ) }
});
window.addEventListener( 'resize', m.redraw );
setTimeout( m.redraw, 0 );