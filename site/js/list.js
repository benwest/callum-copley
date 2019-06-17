var html = require('nanohtml');
var morph = require('nanomorph');

var tween = require('./utils/tween');

var { pageMargins } = require('./metrics');

var findProject = ( projects, i ) => {
    var count = 0;
    for ( var p of projects ) {
        count += p.pages.length;
        if ( count > i ) return p;
    }
}

var startIndex = ( projects, project ) => {
    var count = 0;
    for ( var p of projects ) {
        if ( p === project ) return count;
        count += p.pages.length;
    }
}

module.exports = ( state, i, scrollTop ) => {
    
    var project = findProject( state.data.projects, i );
    var idx = i - startIndex( state.data.projects, project );
    
    document.querySelector('.footer__title').innerText = project.title;
    var index = document.querySelector('.footer__index');
    
    var exit = () => {
        var h = state.dom.getBoundingClientRect().height;
        var toIdx = Math.round( article.scrollTop / h );
        var toScroll = toIdx * h;
        tween({
            from: article.scrollTop,
            to: toScroll,
            duration: Math.abs( article.scrollTop - toScroll ),
            onProgress: st => article.scrollTop = st
        }).then( () => {
            state.go( 'transition', {
                toRoute: 'grid',
                targetIndex: startIndex( state.data.projects, project ) + toIdx,
                dir: -1,
                toArgs: []
            });
        })
    };
    
    var update = () => {
        var top = header.offsetHeight;
        var bottom = 0//footer.offsetHeight;
        var h = article.getBoundingClientRect().height;
        var visible = Math.floor( article.scrollTop / h );
        index.innerText = `${ visible + 1 } / ${ project.pages.length }`;
        imgs.forEach( ( img, i ) => {
            var page = project.pages[ i ];
            var margins = pageMargins( page.size );
            Object.assign( img.style, {
                left: margins[ 0 ][ 0 ] + 'px',
                top: margins[ 0 ][ 1 ] + 'px',
                width: window.innerWidth - ( margins[ 0 ][ 0 ] + margins[ 1 ][ 0 ] ) + 'px',
                height: window.innerHeight - ( margins[ 0 ][ 1 ] + margins[ 1 ][ 1 ] ) + 'px',
            })
        })
        // pages.forEach( page => page.style.height = h + 'px' )
        // imgs.forEach( img => Object.assign( img.style, {
        //     height: h - top - bottom + 'px',
        //     top: top + 'px'
        // }));
        imgs
            .slice( visible, visible + 2 )
            .filter( img => !img.dataset.loaded )
            .forEach( img => {
                img.src = img.dataset.src;
                img.dataset.loaded = true;
            })
    }
    morph( state.dom, html`
        <main>
            <article onscroll="${ update }">
                ${ project.pages.map( ( page, i ) => html`
                    <div id="list_${ i }" class="page">
                        <img src="${ page.small }" data-src="${ page.large }">
                    </div>
                `) }
            </article>
        </main>
    `);
    var header = document.querySelector('header');
    var pages = [ ...state.dom.querySelectorAll('.page') ];
    var imgs = pages.map( p => p.querySelector('img') );
    var article = state.dom.querySelector('article');
    update();
    article.scrollTop = article.clientHeight * idx;
    
    return { update };
    
}