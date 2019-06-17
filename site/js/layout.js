var html = require('nanohtml');

module.exports = ( { data, title, index, exit, content } ) => html`
    <header>
        <div class="title">
            <span>&copy;${ new Date().getFullYear() }</span>
            <span>${ data.firstName }</span>
            <span>${ data.lastName }</span>
            <a href="mailto:${ data.email }">${ data.email }</a>
        </div>
        <div class="info">
            <span>${ data.byline }</span>
        </div>
    </header>
        ${ content }
    <footer>
        
    </footer>
`