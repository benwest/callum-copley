var html = require('nanohtml')

module.exports = ( title, index, children ) => html`
    <main>
        ${ children }
        <footer class="footer">
            <div class="footer__title">${ title || '&nbsp' }</div>
            <div class="footer__index">${ index || '&nbsp' }</div>
        </footer>
    </main>
`