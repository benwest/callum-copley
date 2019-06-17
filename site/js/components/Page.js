var m = require('mithril');

module.exports = {
    view: ({ attrs: { position, size, src, ...rest }}) => {
        var style = {
            width: size[ 0 ] + 'px',
            height: size[ 1 ] + 'px',
            left: position[ 0 ] + 'px',
            top: position[ 1 ] + 'px',
        }
        return m( 'img.page', {
            style,
            src,
            ...rest
        })
    }
}