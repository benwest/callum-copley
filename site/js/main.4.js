var data = JSON.parse( document.getElementById('data').innerText );

// data.projects = [ data.projects[ 4 ] ]

var state = {
    data,
    dom: document.querySelector('main'),
    routes: {
        grid: require('./grid'),
        list: require('./list'),
        transition: require('./transition')
    },
    route: null,
    go: ( route, ...args ) => {
        if ( state.route !== null && state.route.exit ) state.route.exit( state );
        state.route = state.routes[ route ]( state, ...args ) || {};
        if ( state.route.enter ) state.route.enter( state, ...args );
    },
    update: () => { if ( state.route.update ) state.route.update( state ) }
}

window.addEventListener( 'resize', state.update );

var cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${ e.clientX }px, ${ e.clientY }px)`;
})

state.go( 'grid' );