var m = require('mithril');

module.exports = {
    view: ({ attrs: { firstName, lastName, byline, email } }) => {
        return m('header',
            {
                className: m.route.get() === '/'
                    ? 'header header--invert'
                    : 'header'
            },
            m('.header__title',
                m('span', `©${ new Date().getFullYear() }`),
                m('span', lastName ),
                m('span', firstName ),
                m( 'a', { href: `mailto:${ email }` }, email )
            ),
            m('.header__info',
                m( 'span.byline', byline ),
                m( 'a', { href: `mailto:${ email }` }, email )
            )
        )
    }
}