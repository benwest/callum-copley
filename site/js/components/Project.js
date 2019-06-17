var m = require('mithril');
var v2 = require('../utils/vec2');
var tween = require('../utils/tween');

var Page = require('./Page');

var transition = require('../transition');
var throttle = require('lodash/throttle');
var { fullscreen, flow, scrollTo } = require('../utils/layout');

var findParent = ( el, cls ) => {
    while ( el !== document && !el.classList.contains( cls ) ) {
        el = el.parentNode;
    }
    return el;
}

var layout = ( pages, viewport ) => {
    var { rects } = flow( pages.map( page => fullscreen( page.size, viewport ) ) );
    var marginX = ( viewport.size[ 0 ] - rects[ 0 ].size[ 0 ] ) / 2;
    rects.forEach( ({ position }) => {
        position[ 0 ] += marginX;
        position[ 1 ] += viewport.margins[ 0 ][ 1 ];
    });
    var last = rects[ rects.length - 1 ];
    var width = last.position[ 0 ] + last.size[ 0 ] + marginX;
    return { rects, width };
}

var cursor = document.querySelector('.cursor');

var setCursor = e => {
    if ( e ) e.redraw = false;
    cursor.classList.add( 'cursor--close' );
}

var unsetCursor = e => {
    if ( e ) e.redraw = false;
    cursor.classList.remove( 'cursor--close' );
}

var cancelRedraw = fn => e => {
    e.redraw = false;
    fn( e );
}

module.exports = {
    scrollLeft: 0,
    onscroll: ( state, e ) => {
        state.scrollLeft = e.target.scrollLeft;
        m.redraw();
    },
    close: e => {
        unsetCursor();
        var page = [ ...findParent( e.target, 'project' ).querySelectorAll('.page') ].find( p => p.getBoundingClientRect().right > 0 );
        transition.show()
            .then(() => {
                var p = transition.toGrid( page );
                m.route.set( '/' );
                return p;
            }).then( transition.hide );
    },
    oninit: ({ state, attrs: { project: { pages }, viewport } }) => {
        state.onscroll = cancelRedraw( throttle( state.onscroll.bind( null, state ), 1000, { leading: true, trailing: true } ) );
        var { rects, width } = layout( pages, viewport );
        state.rects = rects;
        state.width = width;
        state.viewport = v2.copy( viewport );
        state.onclick = e => {
            var el = e.currentTarget;
            var cx = viewport.size[ 0 ] / 2;
            var rect = state.rects.find(
                e.clientX < viewport.size[ 0 ] / 2
                    ? rect => state.scrollLeft + rect.position[ 0 ] + rect.size[ 0 ] < cx
                    : rect => state.scrollLeft + rect.position[ 0 ] > cx
            );
            if ( !rect ) return;
            el.scrollTo( scrollTo( rect, viewport ), 0 )
        }
    },
    oncreate: ({ state, dom, attrs: { params, viewport } }) => {
        if ( params.page ) {
            state.scrollLeft = scrollTo( state.rects[ params.page ], viewport );
            dom.querySelector('.project__scroll').scrollLeft = state.scrollLeft;
        }
    },
    onbeforeupdate: ({ state, attrs: { project: { pages }, viewport } }) => {
        if ( !v2.equal( state.viewport, viewport ) ) {
            var { rects, width } = layout( pages, viewport );
            state.rects = rects;
            state.width = width;
            state.viewport = v2.copy( viewport );
        }
    },
    view: ({
        attrs: { project: { title, pages, slug }, viewport },
        state: { rects, width, scrollLeft, onscroll, onclick, close }
    }) => {
        var minX = viewport.size[ 0 ] * -2;
        var maxX = viewport.size[ 0 ] * 3;
        return m('.project', { onscroll },
            m('.project__scroll', { onscroll, onclick },
                m('.project__pages', { style: { width: width + 'px' } },
                    rects.map( ({ size, position }, i ) => {
                        var left = position[ 0 ] - scrollLeft;
                        var visible = left < maxX && left + size[ 0 ] > minX;
                        if ( !visible ) return undefined;
                        var page = pages[ i ];
                        return m( Page, { size, position, src: page.large, key: i, id: `${ slug }_${ i }` })
                    }),
                ),
            ),
            m('.footer',
                m('.footer__title', title ),
                m('a', { onclick: close, onmouseenter: setCursor, onmouseleave: unsetCursor }, 'RETURN' )
            )
        )
    }
}