var m = require('mithril');

var v2 = require('../utils/vec2');
var marginUtils = require('../utils/margins');
var { thumbnail, flow } = require('../utils/layout');

var Page = require('./Page');

var layout = ( pages, viewport ) => {
    var thumbnails = pages.map( page => thumbnail( page.size, viewport ) );
    var maxWidth = marginUtils.innerSize( viewport )[ 0 ];
    return flow( thumbnails, maxWidth );
}

module.exports = {
    height: 0,
    oninit: ({ state, attrs: { viewport } }) => {
        state.width = marginUtils.innerSize( viewport )[ 0 ];
    },
    onbeforeupdate: ({ state, attrs: { viewport } }) => {
        var width = marginUtils.innerSize( viewport )[ 0 ];
        if ( width !== state.width ) {
            state.width = width;
            return true;
        } else {
            return false;
        }
    },
    view: ({
        attrs: { pages, onmouseenter, viewport, slug },
        state: { width }
    }) => {
        if ( width === null ) return m( '.pages' );
        var { rects, height } = layout( pages, viewport );
        return m('.pages', { style: { height: height + 'px' } },
            rects.map( ({ position, size }, i ) => {
                var page = pages[ i ];
                return m( Page, {
                    position, size,
                    src: page.small,
                    onmouseenter,
                    'data-index': i,
                    id: `${ slug }_${ i }`
                });
            })
        )
    }
}