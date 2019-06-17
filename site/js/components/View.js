var m = require('mithril');
var fastdom = require('fastdom');
var v2 = require('../utils/vec2');
var { BREAKPOINT } = require('../config');

var Header = require('./Header');
var Projects = require('./Projects');
var Project = require('./Project');

var getHeight = el => el.getBoundingClientRect().height;

var update = ({ dom, state }) => fastdom.measure(() => {
    var size = v2( window.innerWidth, window.innerHeight );
    var marginX = size[ 0 ] < BREAKPOINT ? 20 : 40;
    var headerHeight = getHeight( dom.querySelector('.header') );
    var footerHeight = getHeight( dom.querySelector('.footer') );
    var margins = [
        v2( marginX, headerHeight ),
        v2( marginX, footerHeight )
    ];
    if (
        state.viewport === null ||
        !v2.equal( size, state.viewport.size ) ||
        !v2.equal( margins[ 0 ], state.viewport.margins[ 0 ] ) ||
        !v2.equal( margins[ 1 ], state.viewport.margins[ 1 ] )
    ) {
        state.viewport = { size, margins };
        m.redraw();
    }
})

module.exports = {
    viewport: null,
    oncreate: update,
    onbeforeupdate: vnode => {
        console.time('render');
    },
    onupdate: vnode => {
        update( vnode );
        console.timeEnd('render');
    },
    view: ({ attrs: { content, params }, state: { viewport } }) => {
        var slug = m.route.param('slug');
        return m('div',
            m( Header, content ),
            viewport !== null && [
                m( Projects, { projects: content.projects, viewport }),
                slug && m( Project, {
                    project: content.projects.find( p => p.slug === slug ),
                    viewport,
                    params
                })
            ],
            m( '.footer.footer--sizer', m.trust('&nbsp;') )
        )
    }
}