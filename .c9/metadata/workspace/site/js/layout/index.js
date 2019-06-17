{"changed":true,"filter":false,"title":"index.js","tooltip":"/site/js/layout/index.js","value":"var A4 = [ 210, 297 ];\nvar MARGIN = [ 40, 40 ];\nvar PADDING = [ 28, 28 ];\n\nvar add = ( v1, v2 ) => [ v1[ 0 ] + v2[ 0 ], v1[ 1 ] + v2[ 1 ] ];\nvar sub = ( v1, v2 ) => [ v1[ 0 ] - v2[ 0 ], v1[ 1 ] - v2[ 1 ] ];\nvar divide = ( v1, v2 ) => [ v1[ 0 ] / v2[ 0 ], v1[ 1 ] / v2[ 1 ] ];\nvar mult = ( v1, v2 ) => [ v1[ 0 ] * v2[ 0 ], v1[ 1 ] * v2[ 1 ] ];\nvar scaleVector = ( [ x, y ], s ) => [ x * s, y * s ];\nvar cover = ( src, dest ) => scaleVector( src, Math.max( dest[ 0 ] / src[ 0 ], dest[ 1 ] / src[ 1 ] ) );\nvar contain = ( src, dest ) => scaleVector( src, Math.min( dest[ 0 ] / src[ 0 ], dest[ 1 ] / src[ 1 ] ) );\n\nvar text = [ ...document.querySelectorAll('.text') ].map( el => [ ...el.children ] );\n\nvar measure = ( style = {} ) => {\n    var sample = 200;\n    var div = document.createElement('div');\n    div.style.display = 'inline-block';\n    div.innerHTML = Array( sample ).fill().map( _ => 'O'.repeat( sample ) ).join('<br>');\n    document.body.appendChild( div );\n    var rect = div.getBoundingClientRect();\n    document.body.removeChild( div );\n    return [ rect.width / sample, rect.height / sample ];\n}\n\nvar flow = ( charSize, pageSize, text ) => {\n    var pages = [];\n    var html = '';\n    var y = 0;\n    var nextPage = () => {\n        pages.push( html );\n        html = '';\n        y = 0;\n    }\n    var nextLine = () => {\n        if ( y + charSize[ 1 ] > pageSize[ 1 ] ) {\n            nextPage();\n            return true;\n        } else {\n            y += charSize[ 1 ];\n            return false;\n        }\n    }\n    text.forEach( project => {\n        project.slice( 0, 5 ).forEach( element => {\n            var x = 0;\n            html += '<' + element.tagName.toLowerCase() + '>';\n            var words = element.innerText.split(' ');\n            words.forEach( ( word, i ) => {\n                var end = x + charSize[ 0 ] * word.length;\n                if ( end > pageSize[ 0 ] ) {\n                    html += '<br>'\n                    nextLine();\n                    x = 0;\n                }\n                // html += `<div style=\"position: absolute; top: ${ y }px; left: ${ x }px\">${ word }</div>` + ( i === words.length - 1 ? '' : ' ' );\n                html += word + ( i === words.length - 1 ? '' : ' ' )\n                x += charSize[ 0 ] * ( word.length + 1 ) ;\n            })\n            html += '</' + element.tagName.toLowerCase() + '>';\n            x = 0;\n            nextLine();\n        });\n        nextPage();\n    });\n    return pages;\n}\n\nvar grid = ( containerSize, pageSize, minGutter, num ) => {\n    var containerRatio = containerSize[ 1 ] / containerSize[ 0 ];\n    var cells = null;\n    var diff = Infinity;\n    for ( var w = 0; w <= num; w++ ) {\n        var h = Math.ceil( num / w );\n        var ratio = ( h * pageSize[ 1 ] ) / ( w * pageSize[ 0 ] );\n        var d = Math.abs( containerRatio - ratio );\n        if ( d < diff ) {\n            diff = d;\n            cells = [ w, h ];\n        }\n    }\n    var gutters = sub( cells, [ 1, 1 ] );\n    var contentSize = mult( pageSize, cells );\n    var size = cover( containerSize, add( contentSize, mult( minGutter, gutters ) ) );\n    var free = sub( size, contentSize );\n    var gutter = [\n        gutters[ 0 ] === 0 ? 0 : free[ 0 ] / gutters[ 0 ],\n        gutters[ 1 ] === 0 ? 0 : free[ 1 ] / gutters[ 1 ],\n    ];\n    var offsets = [], row, column;\n    for ( row = 0; row < cells[ 1 ]; row++ ) {\n        for ( column = 0; column < cells[ 0 ]; column++ ) {\n            offsets.push([\n                column * ( pageSize[ 0 ] + gutter[ 0 ] ),\n                row * ( pageSize[ 1 ] + gutter[ 1 ] )\n            ]);\n        }\n    }\n    return { size, offsets };\n}\n\nvar layout = containerSize  => {\n    containerSize = sub( containerSize, scaleVector( MARGIN, 2 ) );\n    var pageSize = contain( A4, containerSize );\n    var pages = flow( measure(), sub( pageSize, scaleVector( PADDING, 2 ) ), text );\n    if ( pages.length === 0 ) pages = [ '' ];\n    var { size, offsets } = grid( containerSize, pageSize, MARGIN, pages.length );\n    offsets = offsets.map( o => add( o, MARGIN ) );\n    return {\n        size,\n        pageSize,\n        pages: pages.map( ( html, i ) => ({ html, offset: offsets[ i ] })),\n    };\n}\n\n\nmodule.exports = ( state, emitter ) => {\n    \n    state.grid = {\n        containerSize: [ 0, 0 ],\n        pageSize: [ 0, 0 ],\n        pages: []\n    }\n    \n    \n    \n}","undoManager":{"mark":92,"position":100,"stack":[[{"start":{"row":93,"column":22},"end":{"row":93,"column":23},"action":"insert","lines":["["],"id":138}],[{"start":{"row":93,"column":23},"end":{"row":93,"column":24},"action":"insert","lines":[" "],"id":139}],[{"start":{"row":93,"column":24},"end":{"row":93,"column":25},"action":"insert","lines":["0"],"id":140}],[{"start":{"row":93,"column":25},"end":{"row":93,"column":26},"action":"insert","lines":[" "],"id":141}],[{"start":{"row":93,"column":26},"end":{"row":93,"column":27},"action":"insert","lines":["]"],"id":142}],[{"start":{"row":93,"column":27},"end":{"row":93,"column":28},"action":"insert","lines":[" "],"id":143}],[{"start":{"row":93,"column":28},"end":{"row":93,"column":29},"action":"insert","lines":["+"],"id":144}],[{"start":{"row":93,"column":29},"end":{"row":93,"column":30},"action":"insert","lines":[" "],"id":145}],[{"start":{"row":94,"column":16},"end":{"row":94,"column":17},"action":"insert","lines":["M"],"id":146}],[{"start":{"row":94,"column":16},"end":{"row":94,"column":17},"action":"remove","lines":["M"],"id":147},{"start":{"row":94,"column":16},"end":{"row":94,"column":22},"action":"insert","lines":["MARGIN"]}],[{"start":{"row":94,"column":22},"end":{"row":94,"column":23},"action":"insert","lines":["["],"id":148}],[{"start":{"row":94,"column":23},"end":{"row":94,"column":24},"action":"insert","lines":[" "],"id":149}],[{"start":{"row":94,"column":24},"end":{"row":94,"column":25},"action":"insert","lines":["1"],"id":150}],[{"start":{"row":94,"column":25},"end":{"row":94,"column":26},"action":"insert","lines":[" "],"id":151}],[{"start":{"row":94,"column":26},"end":{"row":94,"column":27},"action":"insert","lines":["]"],"id":152}],[{"start":{"row":94,"column":27},"end":{"row":94,"column":28},"action":"insert","lines":[" "],"id":153}],[{"start":{"row":94,"column":28},"end":{"row":94,"column":29},"action":"insert","lines":["+"],"id":154}],[{"start":{"row":94,"column":29},"end":{"row":94,"column":30},"action":"insert","lines":[" "],"id":155}],[{"start":{"row":94,"column":16},"end":{"row":94,"column":30},"action":"remove","lines":["MARGIN[ 1 ] + "],"id":156}],[{"start":{"row":93,"column":16},"end":{"row":93,"column":30},"action":"remove","lines":["MARGIN[ 0 ] + "],"id":157}],[{"start":{"row":106,"column":82},"end":{"row":107,"column":0},"action":"insert","lines":["",""],"id":158},{"start":{"row":107,"column":0},"end":{"row":107,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":107,"column":4},"end":{"row":107,"column":5},"action":"insert","lines":["o"],"id":159}],[{"start":{"row":107,"column":5},"end":{"row":107,"column":6},"action":"insert","lines":["f"],"id":160}],[{"start":{"row":107,"column":6},"end":{"row":107,"column":7},"action":"insert","lines":["f"],"id":161}],[{"start":{"row":107,"column":7},"end":{"row":107,"column":8},"action":"insert","lines":["s"],"id":162}],[{"start":{"row":107,"column":8},"end":{"row":107,"column":9},"action":"insert","lines":["e"],"id":163}],[{"start":{"row":107,"column":9},"end":{"row":107,"column":10},"action":"insert","lines":["t"],"id":164}],[{"start":{"row":107,"column":10},"end":{"row":107,"column":11},"action":"insert","lines":["s"],"id":165}],[{"start":{"row":107,"column":11},"end":{"row":107,"column":12},"action":"insert","lines":["="],"id":166}],[{"start":{"row":107,"column":12},"end":{"row":107,"column":13},"action":"insert","lines":[" "],"id":167}],[{"start":{"row":107,"column":12},"end":{"row":107,"column":13},"action":"remove","lines":[" "],"id":168}],[{"start":{"row":107,"column":11},"end":{"row":107,"column":12},"action":"remove","lines":["="],"id":169}],[{"start":{"row":107,"column":11},"end":{"row":107,"column":12},"action":"insert","lines":[" "],"id":170}],[{"start":{"row":107,"column":12},"end":{"row":107,"column":13},"action":"insert","lines":["="],"id":171}],[{"start":{"row":107,"column":13},"end":{"row":107,"column":14},"action":"insert","lines":[" "],"id":172}],[{"start":{"row":107,"column":14},"end":{"row":107,"column":15},"action":"insert","lines":["o"],"id":173}],[{"start":{"row":107,"column":15},"end":{"row":107,"column":16},"action":"insert","lines":["f"],"id":174}],[{"start":{"row":107,"column":16},"end":{"row":107,"column":17},"action":"insert","lines":["f"],"id":175}],[{"start":{"row":107,"column":17},"end":{"row":107,"column":18},"action":"insert","lines":["s"],"id":176}],[{"start":{"row":107,"column":18},"end":{"row":107,"column":19},"action":"insert","lines":["e"],"id":177}],[{"start":{"row":107,"column":19},"end":{"row":107,"column":20},"action":"insert","lines":["t"],"id":178}],[{"start":{"row":107,"column":20},"end":{"row":107,"column":21},"action":"insert","lines":["s"],"id":179}],[{"start":{"row":107,"column":21},"end":{"row":107,"column":22},"action":"insert","lines":["."],"id":180}],[{"start":{"row":107,"column":22},"end":{"row":107,"column":23},"action":"insert","lines":["m"],"id":181}],[{"start":{"row":107,"column":23},"end":{"row":107,"column":24},"action":"insert","lines":["a"],"id":182}],[{"start":{"row":107,"column":24},"end":{"row":107,"column":25},"action":"insert","lines":["p"],"id":183}],[{"start":{"row":107,"column":25},"end":{"row":107,"column":27},"action":"insert","lines":["()"],"id":184}],[{"start":{"row":107,"column":26},"end":{"row":107,"column":27},"action":"insert","lines":[" "],"id":185}],[{"start":{"row":107,"column":27},"end":{"row":107,"column":28},"action":"insert","lines":[" "],"id":186}],[{"start":{"row":107,"column":27},"end":{"row":107,"column":28},"action":"insert","lines":["o"],"id":187}],[{"start":{"row":107,"column":28},"end":{"row":107,"column":29},"action":"insert","lines":[" "],"id":188}],[{"start":{"row":107,"column":29},"end":{"row":107,"column":30},"action":"insert","lines":["="],"id":189}],[{"start":{"row":107,"column":30},"end":{"row":107,"column":31},"action":"insert","lines":[">"],"id":190}],[{"start":{"row":107,"column":31},"end":{"row":107,"column":32},"action":"insert","lines":[" "],"id":191}],[{"start":{"row":107,"column":32},"end":{"row":107,"column":33},"action":"insert","lines":["a"],"id":192}],[{"start":{"row":107,"column":33},"end":{"row":107,"column":34},"action":"insert","lines":["d"],"id":193}],[{"start":{"row":107,"column":34},"end":{"row":107,"column":35},"action":"insert","lines":["d"],"id":194}],[{"start":{"row":107,"column":35},"end":{"row":107,"column":37},"action":"insert","lines":["()"],"id":195}],[{"start":{"row":107,"column":36},"end":{"row":107,"column":37},"action":"insert","lines":[" "],"id":196}],[{"start":{"row":107,"column":37},"end":{"row":107,"column":38},"action":"insert","lines":["o"],"id":197}],[{"start":{"row":107,"column":38},"end":{"row":107,"column":39},"action":"insert","lines":[","],"id":198}],[{"start":{"row":107,"column":39},"end":{"row":107,"column":40},"action":"insert","lines":[" "],"id":199}],[{"start":{"row":107,"column":40},"end":{"row":107,"column":41},"action":"insert","lines":["M"],"id":200}],[{"start":{"row":107,"column":40},"end":{"row":107,"column":41},"action":"remove","lines":["M"],"id":201},{"start":{"row":107,"column":40},"end":{"row":107,"column":46},"action":"insert","lines":["MARGIN"]}],[{"start":{"row":107,"column":46},"end":{"row":107,"column":47},"action":"insert","lines":[" "],"id":202}],[{"start":{"row":107,"column":50},"end":{"row":107,"column":51},"action":"insert","lines":[";"],"id":203}],[{"start":{"row":120,"column":8},"end":{"row":120,"column":9},"action":"insert","lines":["p"],"id":204}],[{"start":{"row":120,"column":9},"end":{"row":120,"column":10},"action":"insert","lines":["a"],"id":205}],[{"start":{"row":120,"column":10},"end":{"row":120,"column":11},"action":"insert","lines":["g"],"id":206}],[{"start":{"row":120,"column":11},"end":{"row":120,"column":12},"action":"insert","lines":["e"],"id":207}],[{"start":{"row":120,"column":12},"end":{"row":120,"column":13},"action":"insert","lines":["S"],"id":208}],[{"start":{"row":120,"column":8},"end":{"row":120,"column":13},"action":"remove","lines":["pageS"],"id":209},{"start":{"row":120,"column":8},"end":{"row":120,"column":16},"action":"insert","lines":["pageSize"]}],[{"start":{"row":120,"column":16},"end":{"row":120,"column":17},"action":"insert","lines":[":"],"id":210}],[{"start":{"row":120,"column":17},"end":{"row":120,"column":18},"action":"insert","lines":[" "],"id":211}],[{"start":{"row":120,"column":18},"end":{"row":120,"column":20},"action":"insert","lines":["[]"],"id":212}],[{"start":{"row":120,"column":19},"end":{"row":120,"column":20},"action":"insert","lines":[" "],"id":213}],[{"start":{"row":120,"column":20},"end":{"row":120,"column":21},"action":"insert","lines":["0"],"id":214}],[{"start":{"row":120,"column":21},"end":{"row":120,"column":22},"action":"insert","lines":[","],"id":215}],[{"start":{"row":120,"column":22},"end":{"row":120,"column":23},"action":"insert","lines":[" "],"id":216}],[{"start":{"row":120,"column":23},"end":{"row":120,"column":24},"action":"insert","lines":["0"],"id":217}],[{"start":{"row":120,"column":24},"end":{"row":120,"column":25},"action":"insert","lines":[" "],"id":218}],[{"start":{"row":120,"column":26},"end":{"row":120,"column":27},"action":"insert","lines":[","],"id":219}],[{"start":{"row":120,"column":27},"end":{"row":121,"column":0},"action":"insert","lines":["",""],"id":220},{"start":{"row":121,"column":0},"end":{"row":121,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":121,"column":8},"end":{"row":121,"column":9},"action":"insert","lines":["p"],"id":221}],[{"start":{"row":121,"column":9},"end":{"row":121,"column":10},"action":"insert","lines":["a"],"id":222}],[{"start":{"row":121,"column":10},"end":{"row":121,"column":11},"action":"insert","lines":["g"],"id":223}],[{"start":{"row":121,"column":11},"end":{"row":121,"column":12},"action":"insert","lines":["e"],"id":224}],[{"start":{"row":121,"column":12},"end":{"row":121,"column":13},"action":"insert","lines":["s"],"id":225}],[{"start":{"row":121,"column":13},"end":{"row":121,"column":14},"action":"insert","lines":[":"],"id":226}],[{"start":{"row":121,"column":14},"end":{"row":121,"column":15},"action":"insert","lines":[" "],"id":227}],[{"start":{"row":121,"column":15},"end":{"row":121,"column":17},"action":"insert","lines":["[]"],"id":228}],[{"start":{"row":122,"column":5},"end":{"row":123,"column":0},"action":"insert","lines":["",""],"id":229},{"start":{"row":123,"column":0},"end":{"row":123,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":123,"column":4},"end":{"row":124,"column":0},"action":"insert","lines":["",""],"id":230},{"start":{"row":124,"column":0},"end":{"row":124,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":119,"column":8},"end":{"row":119,"column":12},"action":"remove","lines":["size"],"id":231},{"start":{"row":119,"column":8},"end":{"row":119,"column":9},"action":"insert","lines":["c"]}],[{"start":{"row":119,"column":9},"end":{"row":119,"column":10},"action":"insert","lines":["o"],"id":232}],[{"start":{"row":119,"column":10},"end":{"row":119,"column":11},"action":"insert","lines":["n"],"id":233}],[{"start":{"row":119,"column":8},"end":{"row":119,"column":11},"action":"remove","lines":["con"],"id":234},{"start":{"row":119,"column":8},"end":{"row":119,"column":21},"action":"insert","lines":["containerSize"]}],[{"start":{"row":118,"column":10},"end":{"row":118,"column":16},"action":"remove","lines":["layout"],"id":235},{"start":{"row":118,"column":10},"end":{"row":118,"column":11},"action":"insert","lines":["g"]}],[{"start":{"row":118,"column":11},"end":{"row":118,"column":12},"action":"insert","lines":["r"],"id":236}],[{"start":{"row":118,"column":12},"end":{"row":118,"column":13},"action":"insert","lines":["i"],"id":237}],[{"start":{"row":118,"column":13},"end":{"row":118,"column":14},"action":"insert","lines":["d"],"id":238}]]},"ace":{"folds":[],"scrolltop":1751.5,"scrollleft":0,"selection":{"start":{"row":118,"column":14},"end":{"row":118,"column":14},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":102,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1521766235961}