{"changed":true,"filter":false,"title":"Thumbnails.js","tooltip":"/site/js/components/Thumbnails.js","value":"var m = require('mithril');\n\nvar Pages = require('./Pages');\n\nmodule.exports = {\n    page: null,\n    setPage: ( state, e ) => state.page = e.target.dataset.index,\n    unsetPage: state => state.page = null,\n    oninit: ({ state }) => {\n        state.setPage = state.setPage.bind( null, state );\n        state.unsetPage = state.unsetPage.bind( state );\n    },\n    view: ({\n        attrs: { project: { title, description, pages }, viewport },\n        state: { page, setPage, unsetPage }\n    }) => {\n        return m('.project', { onmouseleave: unsetPage },\n            m('.project-description',\n                m( 'span', title ),\n                description && m( 'span', description ),\n                page !== null && m( 'span', `${ page }/${ pages.length }` )\n            ),\n            m( Pages, { pages, onmouseenter: setPage, viewport })\n        )\n    }\n}","undoManager":{"mark":16,"position":15,"stack":[[{"start":{"row":15,"column":56},"end":{"row":15,"column":64},"action":"remove","lines":["viewport"],"id":145}],[{"start":{"row":15,"column":55},"end":{"row":15,"column":56},"action":"remove","lines":[" "],"id":146}],[{"start":{"row":15,"column":54},"end":{"row":15,"column":55},"action":"remove","lines":[","],"id":147}],[{"start":{"row":9,"column":52},"end":{"row":10,"column":0},"action":"insert","lines":["",""],"id":148},{"start":{"row":10,"column":0},"end":{"row":10,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":10,"column":8},"end":{"row":10,"column":52},"action":"insert","lines":["state.setPage = state.setPage.bind( state );"],"id":149}],[{"start":{"row":10,"column":14},"end":{"row":10,"column":15},"action":"remove","lines":["s"],"id":150},{"start":{"row":10,"column":14},"end":{"row":10,"column":15},"action":"insert","lines":["u"]}],[{"start":{"row":10,"column":15},"end":{"row":10,"column":16},"action":"insert","lines":["n"],"id":151}],[{"start":{"row":10,"column":16},"end":{"row":10,"column":17},"action":"insert","lines":["s"],"id":152}],[{"start":{"row":10,"column":32},"end":{"row":10,"column":33},"action":"insert","lines":["u"],"id":153}],[{"start":{"row":10,"column":33},"end":{"row":10,"column":34},"action":"insert","lines":["n"],"id":154}],[{"start":{"row":9,"column":44},"end":{"row":9,"column":45},"action":"insert","lines":["n"],"id":155}],[{"start":{"row":9,"column":45},"end":{"row":9,"column":46},"action":"insert","lines":["u"],"id":156}],[{"start":{"row":9,"column":46},"end":{"row":9,"column":47},"action":"insert","lines":["l"],"id":157}],[{"start":{"row":9,"column":47},"end":{"row":9,"column":48},"action":"insert","lines":["l"],"id":158}],[{"start":{"row":9,"column":48},"end":{"row":9,"column":49},"action":"insert","lines":[","],"id":159}],[{"start":{"row":9,"column":49},"end":{"row":9,"column":50},"action":"insert","lines":[" "],"id":160}],[{"start":{"row":10,"column":53},"end":{"row":10,"column":54},"action":"insert","lines":[" "],"id":166}],[{"start":{"row":10,"column":52},"end":{"row":10,"column":53},"action":"insert","lines":[","],"id":165}],[{"start":{"row":10,"column":51},"end":{"row":10,"column":52},"action":"insert","lines":["l"],"id":164}],[{"start":{"row":10,"column":50},"end":{"row":10,"column":51},"action":"insert","lines":["l"],"id":163}],[{"start":{"row":10,"column":49},"end":{"row":10,"column":50},"action":"insert","lines":["u"],"id":162}],[{"start":{"row":10,"column":48},"end":{"row":10,"column":49},"action":"insert","lines":["n"],"id":161}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":2,"column":0},"end":{"row":25,"column":1},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1534280075388}