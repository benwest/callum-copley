var wait = delay => new Promise( resolve => setTimeout( resolve, delay ) );
var sequence = fns => fns.reduce( ( p, fn ) => p.then( fn ), Promise.resolve() )

module.exports = { wait, sequence };