var m = require('mithril');

var Pages = require('./Pages');

var transition = require('../transition');

var touch = 'ontouchstart' in window;

var Project = {
    onclick: ( viewport, e ) => {
        if ( e.target.tagName === 'A' ) return;
        var slug = e.currentTarget.id;
        var page = e.target.classList.contains( 'page' )
            ? Number( e.target.dataset.index )
            : null
        transition.show()
            .then(() => {
                m.route.set( slug, null, { state: { page } } );
                return transition.toFullscreen( `${ slug }_${ page || 0 }`, viewport )
            }).then( transition.hide )
    },
    page: null,
    setPage: ( state, e ) => state.page = Number( e.target.dataset.index ),
    unsetPage: state => state.page = null,
    oninit: ({ state }) => {
        state.setPage = state.setPage.bind( null, state );
        state.unsetPage = state.unsetPage.bind( null, state );
    },
    onbeforeupdate: () => m.route.get() === '/',
    view: ({
        attrs: { project: { title, format, year, description, pages, slug }, viewport },
        state: { onclick, page, setPage, unsetPage }
    }) => {
        return m( '.project-thumbnail', { id: slug, onclick: e => onclick( viewport, e ), onmouseleave: touch ? undefined : unsetPage },
            m('.project-info',
                m( 'span', title + ',' ),
                format && m( 'span', format + ',' ),
                year && m( 'span', year + '.' ),
                page !== null && m( 'span', `${ page + 1 }/${ pages.length }` )
            ),
            description && m('.project-description', m.trust( description ) ),
            m( Pages, { pages, onmouseenter: touch ? undefined : setPage, viewport, slug })
        )
    }
}

module.exports = {
    transition: e => {
        // ??
    },
    view: ({ attrs: { projects, viewport }}) => {
        return m( '.projects', { style: { paddingTop: viewport.margins[ 0 ][ 1 ] + 'px' } },
            projects.map( project => {
                return m( Project, { project, viewport })
            }),
            m('p.credit',
                'Website by ',
                m('a', { href: 'http://bewe.me', target: '_blank' }, 'Ben West' )
            )
        )
    }
}