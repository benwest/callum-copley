var html = require('nanohtml');
var morph = require('nanomorph');

var layout = require('./elements/layout');
var { map } = require('./utils/math');
var v2 = require('./utils/vec2');
var css = require('./utils/css');

var { inset, viewport, pageMargins, margin, gutter } = require('./metrics');

var {
    BREAKPOINT,
    FULLSCREEN_SIZE
} = require('./config');

var layout = state => {
    var vp = viewport();
    var scale = map( vp[ 0 ], 300, 1000, .07, .09 );
    var blocks = [];
    state.data.projects.forEach( project => project.pages.forEach( ( page, idx ) => {
        var margins = pageMargins( page.size );
        var fullSize = inset( vp, margins );
        var fullScale = fullSize[ 0 ] / page.size[ 0 ];
        var scaledMargins = margins
            .map( v => v2.scale( v, ( 1 / fullScale ) * scale ) )
            .map( v => v2( 0, v[ 1 ] ) )
            .map( v => v2( Math.max( 20, v[ 0 ] ), Math.max( 20, v[ 1 ] ) ) );
        blocks.push({
            size: v2.scale( page.size, scale ),
            margins: scaledMargins,
            src: page.small,
            project,
            idx
        })
    }))
    var x = 0;
    var marginX = margin();
    var rows = [];
    var row = [];
    var project = blocks[ 0 ].project.title;
    var maxX = vp[ 0 ] - margin();
    blocks.forEach( ( block, i ) => {
        var right = x + Math.max( block.margins[ 1 ][ 0 ], marginX ) + block.size[ 0 ];
        if ( right > maxX || blocks[ i ].project.title !== project ) {
            rows.push( row );
            row = [];
            x = 0;
            marginX = margin();
            project = blocks[ i ].project.title;
        }
        var mx = row.length === 0 ? marginX : Math.max( block.margins[ 0 ][ 0 ], marginX );
        block.position = v2( x + mx, 0 );
        x += mx + block.size[ 0 ];
        marginX = block.margins[ 1 ][ 0 ];
        row.push( block );
    })
    rows.push( row );
    var y = document.querySelector('header').offsetHeight;
    var marginY = 0;
    rows.forEach( ( row, i ) => {
        var maxHeight = Math.max( ...row.map( block => block.size[ 1 ] ) );
        var maxTopMargin = Math.max( ...row.map( block => block.margins[ 0 ][ 1 ] ) );
        var maxBottomMargin = Math.max( ...row.map( block => block.margins[ 1 ][ 1 ] ) );
        var rowTop = i === 0 ? y : y + Math.max( marginY, maxTopMargin );
        // var rowCenter = rowTop + maxHeight / 2;
        // row.forEach( block => block.position[ 1 ] = rowCenter - block.size[ 1 ] / 2 );
        row.forEach( block => block.position[ 1 ] = rowTop );
        y = rowTop + maxHeight;
        marginY = maxBottomMargin;
    })
    // return blocks;
    return { height: y + marginY, blocks }
}

var grid = state => {
    
    var index = document.querySelector('.footer__index');
    var title = document.querySelector('.footer__title');
    
    var onmouseenter = block => e => {
        title.innerHTML = block.project.title;
        index.innerHTML = `${ block.idx + 1 } / ${ block.project.pages.length }`;
    }
    
    var render = () => {
        var { blocks, height } = layout( state );
        return morph( state.dom, html`
            <main>
                <article>
                    <div class="grid" style="height: ${ height }px">
                        ${ blocks.map( ( block, i ) => {
                            var className = 'thumbnail';
                            var id = `grid_${ i }`;
                            var onclick = () => state.go( 'transition', {
                                toRoute: 'list',
                                targetIndex: i,
                                scrollTop: state.dom.querySelector('article').scrollTop,
                                dir: 1,
                                toArgs: [ i ]
                            });
                            var style = css({
                                width: block.size[ 0 ] + 'px',
                                height: block.size[ 1 ] + 'px',
                                left: block.position[ 0 ] + 'px',
                                top: block.position[ 1 ] + 'px'
                            });
                            return html`
                                <img ${ {
                                    className,
                                    id,
                                    src: block.src,
                                    onclick,
                                    style,
                                    onmouseenter: onmouseenter( block )
                                }}>
                            `
                        })}
                    </div>
                </article>
            </main>
        `)
    }
    
    var dom = render( state );
    
    render( state );
    return { update: render }
}

grid.layout = layout;
// grid.maxPageSize = maxPageSize;

module.exports = grid;