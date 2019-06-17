(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict"

function dupe_array(count, value, i) {
  var c = count[i]|0
  if(c <= 0) {
    return []
  }
  var result = new Array(c), j
  if(i === count.length-1) {
    for(j=0; j<c; ++j) {
      result[j] = value
    }
  } else {
    for(j=0; j<c; ++j) {
      result[j] = dupe_array(count, value, i+1)
    }
  }
  return result
}

function dupe_number(count, value) {
  var result, i
  result = new Array(count)
  for(i=0; i<count; ++i) {
    result[i] = value
  }
  return result
}

function dupe(count, value) {
  if(typeof value === "undefined") {
    value = 0
  }
  switch(typeof count) {
    case "number":
      if(count > 0) {
        return dupe_number(count|0, value)
      }
    break
    case "object":
      if(typeof (count.length) === "number") {
        return dupe_array(count, value, 0)
      }
    break
  }
  return []
}

module.exports = dupe
},{}],2:[function(require,module,exports){
function backInOut(t) {
  var s = 1.70158 * 1.525
  if ((t *= 2) < 1)
    return 0.5 * (t * t * ((s + 1) * t - s))
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
}

module.exports = backInOut
},{}],3:[function(require,module,exports){
function backIn(t) {
  var s = 1.70158
  return t * t * ((s + 1) * t - s)
}

module.exports = backIn
},{}],4:[function(require,module,exports){
function backOut(t) {
  var s = 1.70158
  return --t * t * ((s + 1) * t + s) + 1
}

module.exports = backOut
},{}],5:[function(require,module,exports){
var bounceOut = require('./bounce-out')

function bounceInOut(t) {
  return t < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5
}

module.exports = bounceInOut
},{"./bounce-out":7}],6:[function(require,module,exports){
var bounceOut = require('./bounce-out')

function bounceIn(t) {
  return 1.0 - bounceOut(1.0 - t)
}

module.exports = bounceIn
},{"./bounce-out":7}],7:[function(require,module,exports){
function bounceOut(t) {
  var a = 4.0 / 11.0
  var b = 8.0 / 11.0
  var c = 9.0 / 10.0

  var ca = 4356.0 / 361.0
  var cb = 35442.0 / 1805.0
  var cc = 16061.0 / 1805.0

  var t2 = t * t

  return t < a
    ? 7.5625 * t2
    : t < b
      ? 9.075 * t2 - 9.9 * t + 3.4
      : t < c
        ? ca * t2 - cb * t + cc
        : 10.8 * t * t - 20.52 * t + 10.72
}

module.exports = bounceOut
},{}],8:[function(require,module,exports){
function circInOut(t) {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1)
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
}

module.exports = circInOut
},{}],9:[function(require,module,exports){
function circIn(t) {
  return 1.0 - Math.sqrt(1.0 - t * t)
}

module.exports = circIn
},{}],10:[function(require,module,exports){
function circOut(t) {
  return Math.sqrt(1 - ( --t * t ))
}

module.exports = circOut
},{}],11:[function(require,module,exports){
function cubicInOut(t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0
}

module.exports = cubicInOut
},{}],12:[function(require,module,exports){
function cubicIn(t) {
  return t * t * t
}

module.exports = cubicIn
},{}],13:[function(require,module,exports){
function cubicOut(t) {
  var f = t - 1.0
  return f * f * f + 1.0
}

module.exports = cubicOut
},{}],14:[function(require,module,exports){
function elasticInOut(t) {
  return t < 0.5
    ? 0.5 * Math.sin(+13.0 * Math.PI/2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
    : 0.5 * Math.sin(-13.0 * Math.PI/2 * ((2.0 * t - 1.0) + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0
}

module.exports = elasticInOut
},{}],15:[function(require,module,exports){
function elasticIn(t) {
  return Math.sin(13.0 * t * Math.PI/2) * Math.pow(2.0, 10.0 * (t - 1.0))
}

module.exports = elasticIn
},{}],16:[function(require,module,exports){
function elasticOut(t) {
  return Math.sin(-13.0 * (t + 1.0) * Math.PI/2) * Math.pow(2.0, -10.0 * t) + 1.0
}

module.exports = elasticOut
},{}],17:[function(require,module,exports){
function expoInOut(t) {
  return (t === 0.0 || t === 1.0)
    ? t
    : t < 0.5
      ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0
}

module.exports = expoInOut
},{}],18:[function(require,module,exports){
function expoIn(t) {
  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0))
}

module.exports = expoIn
},{}],19:[function(require,module,exports){
function expoOut(t) {
  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t)
}

module.exports = expoOut
},{}],20:[function(require,module,exports){
module.exports = {
	'backInOut': require('./back-in-out'),
	'backIn': require('./back-in'),
	'backOut': require('./back-out'),
	'bounceInOut': require('./bounce-in-out'),
	'bounceIn': require('./bounce-in'),
	'bounceOut': require('./bounce-out'),
	'circInOut': require('./circ-in-out'),
	'circIn': require('./circ-in'),
	'circOut': require('./circ-out'),
	'cubicInOut': require('./cubic-in-out'),
	'cubicIn': require('./cubic-in'),
	'cubicOut': require('./cubic-out'),
	'elasticInOut': require('./elastic-in-out'),
	'elasticIn': require('./elastic-in'),
	'elasticOut': require('./elastic-out'),
	'expoInOut': require('./expo-in-out'),
	'expoIn': require('./expo-in'),
	'expoOut': require('./expo-out'),
	'linear': require('./linear'),
	'quadInOut': require('./quad-in-out'),
	'quadIn': require('./quad-in'),
	'quadOut': require('./quad-out'),
	'quartInOut': require('./quart-in-out'),
	'quartIn': require('./quart-in'),
	'quartOut': require('./quart-out'),
	'quintInOut': require('./quint-in-out'),
	'quintIn': require('./quint-in'),
	'quintOut': require('./quint-out'),
	'sineInOut': require('./sine-in-out'),
	'sineIn': require('./sine-in'),
	'sineOut': require('./sine-out')
}
},{"./back-in":3,"./back-in-out":2,"./back-out":4,"./bounce-in":6,"./bounce-in-out":5,"./bounce-out":7,"./circ-in":9,"./circ-in-out":8,"./circ-out":10,"./cubic-in":12,"./cubic-in-out":11,"./cubic-out":13,"./elastic-in":15,"./elastic-in-out":14,"./elastic-out":16,"./expo-in":18,"./expo-in-out":17,"./expo-out":19,"./linear":21,"./quad-in":23,"./quad-in-out":22,"./quad-out":24,"./quart-in":26,"./quart-in-out":25,"./quart-out":27,"./quint-in":29,"./quint-in-out":28,"./quint-out":30,"./sine-in":32,"./sine-in-out":31,"./sine-out":33}],21:[function(require,module,exports){
function linear(t) {
  return t
}

module.exports = linear
},{}],22:[function(require,module,exports){
function quadInOut(t) {
    t /= 0.5
    if (t < 1) return 0.5*t*t
    t--
    return -0.5 * (t*(t-2) - 1)
}

module.exports = quadInOut
},{}],23:[function(require,module,exports){
function quadIn(t) {
  return t * t
}

module.exports = quadIn
},{}],24:[function(require,module,exports){
function quadOut(t) {
  return -t * (t - 2.0)
}

module.exports = quadOut
},{}],25:[function(require,module,exports){
function quarticInOut(t) {
  return t < 0.5
    ? +8.0 * Math.pow(t, 4.0)
    : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0
}

module.exports = quarticInOut
},{}],26:[function(require,module,exports){
function quarticIn(t) {
  return Math.pow(t, 4.0)
}

module.exports = quarticIn
},{}],27:[function(require,module,exports){
function quarticOut(t) {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0
}

module.exports = quarticOut
},{}],28:[function(require,module,exports){
function qinticInOut(t) {
    if ( ( t *= 2 ) < 1 ) return 0.5 * t * t * t * t * t
    return 0.5 * ( ( t -= 2 ) * t * t * t * t + 2 )
}

module.exports = qinticInOut
},{}],29:[function(require,module,exports){
function qinticIn(t) {
  return t * t * t * t * t
}

module.exports = qinticIn
},{}],30:[function(require,module,exports){
function qinticOut(t) {
  return --t * t * t * t * t + 1
}

module.exports = qinticOut
},{}],31:[function(require,module,exports){
function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI*t) - 1)
}

module.exports = sineInOut
},{}],32:[function(require,module,exports){
function sineIn (t) {
  var v = Math.cos(t * Math.PI * 0.5)
  if (Math.abs(v) < 1e-14) return 1
  else return 1 - v
}

module.exports = sineIn

},{}],33:[function(require,module,exports){
function sineOut(t) {
  return Math.sin(t * Math.PI/2)
}

module.exports = sineOut
},{}],34:[function(require,module,exports){
!(function(win) {

/**
 * FastDom
 *
 * Eliminates layout thrashing
 * by batching DOM read/write
 * interactions.
 *
 * @author Wilson Page <wilsonpage@me.com>
 * @author Kornel Lesinski <kornel.lesinski@ft.com>
 */

'use strict';

/**
 * Mini logger
 *
 * @return {Function}
 */
var debug = 0 ? console.log.bind(console, '[fastdom]') : function() {};

/**
 * Normalized rAF
 *
 * @type {Function}
 */
var raf = win.requestAnimationFrame
  || win.webkitRequestAnimationFrame
  || win.mozRequestAnimationFrame
  || win.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16); };

/**
 * Initialize a `FastDom`.
 *
 * @constructor
 */
function FastDom() {
  var self = this;
  self.reads = [];
  self.writes = [];
  self.raf = raf.bind(win); // test hook
  debug('initialized', self);
}

FastDom.prototype = {
  constructor: FastDom,

  /**
   * Adds a job to the read batch and
   * schedules a new frame if need be.
   *
   * @param  {Function} fn
   * @param  {Object} ctx the context to be bound to `fn` (optional).
   * @public
   */
  measure: function(fn, ctx) {
    debug('measure');
    var task = !ctx ? fn : fn.bind(ctx);
    this.reads.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Adds a job to the
   * write batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @param  {Object} ctx the context to be bound to `fn` (optional).
   * @public
   */
  mutate: function(fn, ctx) {
    debug('mutate');
    var task = !ctx ? fn : fn.bind(ctx);
    this.writes.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Clears a scheduled 'read' or 'write' task.
   *
   * @param {Object} task
   * @return {Boolean} success
   * @public
   */
  clear: function(task) {
    debug('clear', task);
    return remove(this.reads, task) || remove(this.writes, task);
  },

  /**
   * Extend this FastDom with some
   * custom functionality.
   *
   * Because fastdom must *always* be a
   * singleton, we're actually extending
   * the fastdom instance. This means tasks
   * scheduled by an extension still enter
   * fastdom's global task queue.
   *
   * The 'super' instance can be accessed
   * from `this.fastdom`.
   *
   * @example
   *
   * var myFastdom = fastdom.extend({
   *   initialize: function() {
   *     // runs on creation
   *   },
   *
   *   // override a method
   *   measure: function(fn) {
   *     // do extra stuff ...
   *
   *     // then call the original
   *     return this.fastdom.measure(fn);
   *   },
   *
   *   ...
   * });
   *
   * @param  {Object} props  properties to mixin
   * @return {FastDom}
   */
  extend: function(props) {
    debug('extend', props);
    if (typeof props != 'object') throw new Error('expected object');

    var child = Object.create(this);
    mixin(child, props);
    child.fastdom = this;

    // run optional creation hook
    if (child.initialize) child.initialize();

    return child;
  },

  // override this with a function
  // to prevent Errors in console
  // when tasks throw
  catch: null
};

/**
 * Schedules a new read/write
 * batch if one isn't pending.
 *
 * @private
 */
function scheduleFlush(fastdom) {
  if (!fastdom.scheduled) {
    fastdom.scheduled = true;
    fastdom.raf(flush.bind(null, fastdom));
    debug('flush scheduled');
  }
}

/**
 * Runs queued `read` and `write` tasks.
 *
 * Errors are caught and thrown by default.
 * If a `.catch` function has been defined
 * it is called instead.
 *
 * @private
 */
function flush(fastdom) {
  debug('flush');

  var writes = fastdom.writes;
  var reads = fastdom.reads;
  var error;

  try {
    debug('flushing reads', reads.length);
    runTasks(reads);
    debug('flushing writes', writes.length);
    runTasks(writes);
  } catch (e) { error = e; }

  fastdom.scheduled = false;

  // If the batch errored we may still have tasks queued
  if (reads.length || writes.length) scheduleFlush(fastdom);

  if (error) {
    debug('task errored', error.message);
    if (fastdom.catch) fastdom.catch(error);
    else throw error;
  }
}

/**
 * We run this inside a try catch
 * so that if any jobs error, we
 * are able to recover and continue
 * to flush the batch until it's empty.
 *
 * @private
 */
function runTasks(tasks) {
  debug('run tasks');
  var task; while (task = tasks.shift()) task();
}

/**
 * Remove an item from an Array.
 *
 * @param  {Array} array
 * @param  {*} item
 * @return {Boolean}
 */
function remove(array, item) {
  var index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1);
}

/**
 * Mixin own properties of source
 * object into the target.
 *
 * @param  {Object} target
 * @param  {Object} source
 */
function mixin(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) target[key] = source[key];
  }
}

// There should never be more than
// one instance of `FastDom` in an app
var exports = win.fastdom = (win.fastdom || new FastDom()); // jshint ignore:line

// Expose to CJS & AMD
if ((typeof define) == 'function') define(function() { return exports; });
else if ((typeof module) == 'object') module.exports = exports;

})( typeof window !== 'undefined' ? window : this);

},{}],35:[function(require,module,exports){
var extract = require('gl-shader-extract')
var dup = require('dup')

module.exports = MagicUniforms

function MagicUniforms (gl, program, uniforms, opts) {
  opts = opts || {}
  uniforms = uniforms || extract(gl, program).uniforms
  uniforms.sort(compareString)

  var magic = {}

  for (var i = 0; i < uniforms.length; i++) {
    var name = uniforms[i].name
    var type = uniforms[i].type

    var chain = []
    var base = name.replace(/\[\d+\]|\.[^\.\[]+/g, function (key) {
      var isArray = !key.indexOf('[')
      if (isArray) {
        key = key.slice(1, -1)
      } else {
        key = key.slice(1)
      }

      chain.push({
        key: key,
        isArray: isArray
      })

      return ''
    })

    chain.unshift({
      key: base,
      isArray: false
    })

    if (chain.length <= 1) {
      define(gl, program, magic, name, name, type, opts)
    } else {
      var parent = magic
      for (var t = 0; t < chain.length - 1; t++) {
        var info = chain[t]
        parent[info.key] = parent[info.key] || (chain[t + 1].isArray ? [] : {})
        parent = parent[info.key]
      }

      define(gl, program, parent, chain[chain.length - 1].key, name, type, opts)
    }
  }

  // Ensure parent nodes can also set their children's uniforms
  walk(magic)
  function walk (node) {
    var keys = Object.keys(node)

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var desc = Object.getOwnPropertyDescriptor(node, key)
      if (!desc.configurable) continue
      walk(node[key])
      parentSetter(node, key)
    }
  }

  return magic
}

function parentSetter (parent, key) {
  var orig = parent[key]

  Object.defineProperty(parent, key, {
    get: function () { return orig },
    set: function (value) {
      for (var key in value) {
        orig[key] = value[key]
      }
    },
    enumerable: true,
    configurable: false
  })
}

function define (gl, program, parent, key, name, type, opts) {
  var cacheScalars = 'cacheScalars' in opts ? opts.cacheScalars : true
  var cacheVectors = !!opts.cacheVectors
  var location = gl.getUniformLocation(program, name)
  var uploader = getUploadFunctionName(type, name)
  var isMatrix = type.indexOf('mat') === 0
  var value = defaultValue(type, name)
  var isScalar = !Array.isArray(value)

  // Matrix uniforms have their own function signature that needs
  // to be used. Scalar values, i.e. floats/bools/ints/samplers,
  // get cached if their values don't change to minimise GPU bandwidth.
  // Vectors/matrices are uploaded directly: unsure how it impacts
  // performance with vectors, but it generally works out slower to
  // cache/check matrices.
  var setter
  if (isMatrix) {
    setter = matrix
  } else
  if (isScalar) {
    setter = cacheScalars ? cachedScalar : basic
  } else {
    setter = cacheVectors ? cachedVector(value.length) : basic
  }

  Object.defineProperty(parent, key, {
    get: function () { return value },
    set: setter,
    enumerable: true,
    configurable: false
  })

  function matrix (_value) {
    value = _value
    return gl[uploader](location, false, value)
  }

  function cachedScalar (_value) {
    if (value === _value) return
    value = _value
    return gl[uploader](location, value)
  }

  function cachedVector (size) {
    switch (size) {
      case 1: return cachedVector1
      case 2: return cachedVector2
      case 3: return cachedVector3
      case 4: return cachedVector4
      default: return basic
    }
  }

  function basic (_value) {
    value = _value
    return gl[uploader](location, value)
  }

  function cachedVector1 (_value) {
    if (value[0] === _value[0]) return
    value = _value
    return gl[uploader](location, value)
  }

  function cachedVector2 (_value) {
    if (
      value[0] === _value[0] &&
      value[1] === _value[1]
    ) return
    value = _value
    return gl[uploader](location, value)
  }

  function cachedVector3 (_value) {
    if (
      value[0] === _value[0] &&
      value[1] === _value[1] &&
      value[2] === _value[2]
    ) return
    value = _value
    return gl[uploader](location, value)
  }

  function cachedVector4 (_value) {
    if (
      value[0] === _value[0] &&
      value[1] === _value[1] &&
      value[2] === _value[2] &&
      value[3] === _value[3]
    ) return
    value = _value
    return gl[uploader](location, value)
  }
}

// TODO: merge with getUploadFunctionName
function defaultValue (type, name) {
  switch (type) {
    case 'bool':
      return false
    case 'int':
    case 'float':
    case 'sampler':
    case 'sampler2D':
    case 'samplerCube':
      return 0
  }

  // vec2, vec3, vec4, bvec2, bvec3, bvec4, ivec2, ivec3, ivec4...
  var vidx = type.indexOf('vec')
  if (vidx >= 0 && vidx <= 1 && type.length === 4 + vidx) {
    var vecDimensions = parseInt(type.charAt(type.length - 1), 10)
    if (vecDimensions < 2 || vecDimensions > 4) {
      throw new Error('Invalid data type (' + type + ') for uniform "' + name + '"')
    }
    if (type.charAt(0) === 'b') {
      return dup(vecDimensions, false)
    }
    return dup(vecDimensions, 0)
  }

  // mat2, mat3, mat4
  if (type.indexOf('mat') === 0 && type.length === 4) {
    var matDimensions = parseInt(type.charAt(type.length - 1), 10)
    if (matDimensions < 2 || matDimensions > 4) {
      throw new Error('Invalid data type (' + type + ') for uniform "' + name + '"')
    }
    return dup(matDimensions * matDimensions, 0)
  }

  throw new Error('Invalid data type (' + type + ') for uniform "' + name + '"')
}

function getUploadFunctionName (type, name) {
  switch (type) {
    case 'float':
      return 'uniform1f'
    case 'bool':
    case 'int':
    case 'sampler':
    case 'sampler2D':
    case 'samplerCube':
      return 'uniform1i'
  }

  var vidx = type.indexOf('vec')
  var dimensions = parseInt(type.charAt(type.length - 1), 10)
  if (dimensions < 2 || dimensions > 4) {
    throw new Error('Invalid data type (' + type + ') for uniform "' + name + '"')
  }

  if (vidx >= 0 && vidx <= 1 && type.length === 4 + vidx) {
    switch (type.charAt(0)) {
      case 'b':
      case 'i':
        return 'uniform' + dimensions + 'iv'
      case 'v':
        return 'uniform' + dimensions + 'fv'
    }

    throw new Error('Invalid data type (' + type + ') for uniform "' + name + '"')
  }

  if (type.indexOf('mat') === 0 && type.length === 4) {
    return 'uniformMatrix' + dimensions + 'fv'
  }

  throw new Error('Invalid data type (' + type + ') for uniform "' + name + '"')
}

function compareString (a, b) {
  return a.name.localeCompare(b.name)
}

},{"dup":1,"gl-shader-extract":38}],36:[function(require,module,exports){
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}


var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}

module.exports = {
  GLMAT_EPSILON : GLMAT_EPSILON,
  GLMAT_ARRAY_TYPE : GLMAT_ARRAY_TYPE,
  GLMAT_RANDOM : GLMAT_RANDOM,
  glMatrix : glMatrix
};

},{}],37:[function(require,module,exports){
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */
var mat3 = {};

var GLMAT_ARRAY_TYPE = require('common').GLMAT_ARRAY_TYPE;

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};

module.exports = mat3;
},{"common":36}],38:[function(require,module,exports){
'use strict'

var GL_TO_GLSL_TYPES = require('./lib/glsl-types')

module.exports = function extract (gl, program) {
  return {
    uniforms: runtimeUniforms(gl, program),
    attributes: runtimeAttributes(gl, program)
  }
}

module.exports.uniforms = runtimeUniforms
module.exports.attributes = runtimeAttributes

var GL_TABLE = null

function getType (gl, type) {
  if (!GL_TABLE) {
    var typeNames = Object.keys(GL_TO_GLSL_TYPES)
    GL_TABLE = {}
    for (var i = 0; i < typeNames.length; ++i) {
      var tn = typeNames[i]
      var constant = gl[tn]
      if (typeof constant !== 'undefined') {
        GL_TABLE[constant] = GL_TO_GLSL_TYPES[tn]
      }
    }
  }
  return GL_TABLE[type]
}

function runtimeUniforms (gl, program) {
  var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
  var result = []
  for (var i = 0; i < numUniforms; ++i) {
    var info = gl.getActiveUniform(program, i)
    var type = getType(gl, info.type)
    if (info.size > 1) {
      for (var j = 0; j < info.size; ++j) {
        result.push({
          name: info.name.replace('[0]', '[' + j + ']'),
          type: type
        })
      }
    } else {
      result.push({
        name: info.name,
        type: type
      })
    }
  }
  return result
}

function runtimeAttributes (gl, program) {
  var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)
  var result = []
  for (var i = 0; i < numAttributes; ++i) {
    var info = gl.getActiveAttrib(program, i)
    if (info) {
      result.push({
        name: info.name,
        type: getType(gl, info.type)
      })
    }
  }
  return result
}

},{"./lib/glsl-types":39}],39:[function(require,module,exports){
module.exports = {
  'FLOAT': 'float',
  'FLOAT_VEC2': 'vec2',
  'FLOAT_VEC3': 'vec3',
  'FLOAT_VEC4': 'vec4',
  'INT': 'int',
  'INT_VEC2': 'ivec2',
  'INT_VEC3': 'ivec3',
  'INT_VEC4': 'ivec4',
  'BOOL': 'bool',
  'BOOL_VEC2': 'bvec2',
  'BOOL_VEC3': 'bvec3',
  'BOOL_VEC4': 'bvec4',
  'FLOAT_MAT2': 'mat2',
  'FLOAT_MAT3': 'mat3',
  'FLOAT_MAT4': 'mat4',
  'SAMPLER_2D': 'sampler2D',
  'SAMPLER_CUBE': 'samplerCube',

  // WebGL2 constants
  'FLOAT_MAT2x3': 'mat2x3',
  'FLOAT_MAT2x4': 'mat2x4',
  'FLOAT_MAT3x2': 'mat3x2',
  'FLOAT_MAT3x4': 'mat3x4',
  'FLOAT_MAT4x2': 'mat4x2',
  'FLOAT_MAT4x3': 'mat4x3',
  'UNSIGNED_INT': 'uint',
  'UNSIGNED_INT_VEC2': 'uvec2',
  'UNSIGNED_INT_VEC3': 'uvec3',
  'UNSIGNED_INT_VEC4': 'uvec4',
  'UNSIGNED_INT_SAMPLER_2D': 'usampler2D',
  'UNSIGNED_INT_SAMPLER_3D': 'usampler3D',
  'UNSIGNED_INT_SAMPLER_2D_ARRAY': 'usampler2DArray',
  'UNSIGNED_INT_SAMPLER_CUBE': 'usamplerCube',
  'INT_SAMPLER_2D': 'isampler2D',
  'INT_SAMPLER_3D': 'isampler3D',
  'INT_SAMPLER_2D_ARRAY': 'isampler2DArray',
  'INT_SAMPLER_CUBE': 'isamplerCube',
}
},{}],40:[function(require,module,exports){
module.exports = function(strings) {
  if (typeof strings === 'string') strings = [strings]
  var exprs = [].slice.call(arguments,1)
  var parts = []
  for (var i = 0; i < strings.length-1; i++) {
    parts.push(strings[i], exprs[i] || '')
  }
  parts.push(strings[i])
  return parts.join('')
}

},{}],41:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":46}],42:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":41,"./_getRawTag":44,"./_objectToString":45}],43:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],44:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":41}],45:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],46:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":43}],47:[function(require,module,exports){
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":48,"./now":51,"./toNumber":53}],48:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],49:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],50:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":42,"./isObjectLike":49}],51:[function(require,module,exports){
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":46}],52:[function(require,module,exports){
var debounce = require('./debounce'),
    isObject = require('./isObject');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;

},{"./debounce":47,"./isObject":48}],53:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":48,"./isSymbol":50}],54:[function(require,module,exports){
(function (global){
;(function() {
"use strict"
function Vnode(tag, key, attrs0, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined)
	return node
}
Vnode.normalizeChildren = function normalizeChildren(children) {
	for (var i = 0; i < children.length; i++) {
		children[i] = Vnode.normalize(children[i])
	}
	return children
}
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
var hasOwn = {}.hasOwnProperty
function isEmpty(object) {
	for (var key in object) if (hasOwn.call(object, key)) return false
	return true
}
function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}
function execSelector(state, attrs, children) {
	var hasAttrs = false, childList, text
	var className = attrs.className || attrs.class
	if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
		var newAttrs = {}
		for(var key in attrs) {
			if (hasOwn.call(attrs, key)) {
				newAttrs[key] = attrs[key]
			}
		}
		attrs = newAttrs
	}
	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key)) {
			attrs[key] = state.attrs[key]
		}
	}
	if (className !== undefined) {
		if (attrs.class !== undefined) {
			attrs.class = undefined
			attrs.className = className
		}
		if (state.attrs.className != null) {
			attrs.className = state.attrs.className + " " + className
		}
	}
	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			hasAttrs = true
			break
		}
	}
	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		text = children[0].children
	} else {
		childList = children
	}
	return Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text)
}
function hyperscript(selector) {
	// Because sloppy mode sucks
	var attrs = arguments[1], start = 2, children
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}
	if (typeof selector === "string") {
		var cached = selectorCache[selector] || compileSelector(selector)
	}
	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = 1
	}
	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}
	var normalized = Vnode.normalizeChildren(children)
	if (typeof selector === "string") {
		return execSelector(cached, attrs, normalized)
	} else {
		return Vnode(selector, attrs.key, attrs, normalized)
	}
}
hyperscript.trust = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}
hyperscript.fragment = function(attrs1, children) {
	return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)
}
var m = hyperscript
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")
	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}
	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}
if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
	var PromisePolyfill = window.Promise
} else if (typeof global !== "undefined") {
	if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
	var PromisePolyfill = global.Promise
} else {
}
var buildQueryString = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	var args = []
	for (var key0 in object) {
		destructure(key0, object[key0])
	}
	return args.join("&")
	function destructure(key0, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}
var FILE_PROTOCOL_REGEX = new RegExp("^file://", "i")
var _8 = function($window, Promise) {
	var callbackCount = 0
	var oncompletion
	function setCompletionCallback(callback) {oncompletion = callback}
	function finalizer() {
		var count = 0
		function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
		return function finalize(promise0) {
			var then0 = promise0.then
			promise0.then = function() {
				count++
				var next = then0.apply(promise0, arguments)
				next.then(complete, function(e) {
					complete()
					if (count === 0) throw e
				})
				return finalize(next)
			}
			return promise0
		}
	}
	function normalize(args, extra) {
		if (typeof args === "string") {
			var url = args
			args = extra || {}
			if (args.url == null) args.url = url
		}
		return args
	}
	function request(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			if (args.method == null) args.method = "GET"
			args.method = args.method.toUpperCase()
			var useBody = (args.method === "GET" || args.method === "TRACE") ? false : (typeof args.useBody === "boolean" ? args.useBody : true)
			if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
			if (typeof args.deserialize !== "function") args.deserialize = deserialize
			if (typeof args.extract !== "function") args.extract = extract
			args.url = interpolate(args.url, args.data)
			if (useBody) args.data = args.serialize(args.data)
			else args.url = assemble(args.url, args.data)
			var xhr = new $window.XMLHttpRequest(),
				aborted = false,
				_abort = xhr.abort
			xhr.abort = function abort() {
				aborted = true
				_abort.call(xhr)
			}
			xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
			if (args.serialize === JSON.stringify && useBody && !(args.headers && args.headers.hasOwnProperty("Content-Type"))) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (args.deserialize === deserialize && !(args.headers && args.headers.hasOwnProperty("Accept"))) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
				xhr.setRequestHeader(key, args.headers[key])
			}
			if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
			xhr.onreadystatechange = function() {
				// Don't throw errors on xhr.abort().
				if(aborted) return
				if (xhr.readyState === 4) {
					try {
						var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
							resolve(cast(args.type, response))
						}
						else {
							var error = new Error(xhr.responseText)
							for (var key in response) error[key] = response[key]
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}
			if (useBody && (args.data != null)) xhr.send(args.data)
			else xhr.send()
		})
		return args.background === true ? promise0 : finalize(promise0)
	}
	function jsonp(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script)
				resolve(cast(args.type, data))
				delete $window[callbackName]
			}
			script.onerror = function() {
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
				delete $window[callbackName]
			}
			if (args.data == null) args.data = {}
			args.url = interpolate(args.url, args.data)
			args.data[args.callbackKey || "callback"] = callbackName
			script.src = assemble(args.url, args.data)
			$window.document.documentElement.appendChild(script)
		})
		return args.background === true? promise0 : finalize(promise0)
	}
	function interpolate(url, data) {
		if (data == null) return url
		var tokens = url.match(/:[^\/]+/gi) || []
		for (var i = 0; i < tokens.length; i++) {
			var key = tokens[i].slice(1)
			if (data[key] != null) {
				url = url.replace(tokens[i], data[key])
			}
		}
		return url
	}
	function assemble(url, data) {
		var querystring = buildQueryString(data)
		if (querystring !== "") {
			var prefix = url.indexOf("?") < 0 ? "?" : "&"
			url += prefix + querystring
		}
		return url
	}
	function deserialize(data) {
		try {return data !== "" ? JSON.parse(data) : null}
		catch (e) {throw new Error(data)}
	}
	function extract(xhr) {return xhr.responseText}
	function cast(type0, data) {
		if (typeof type0 === "function") {
			if (Array.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					data[i] = new type0(data[i])
				}
			}
			else return new type0(data)
		}
		return data
	}
	return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
}
var requestService = _8(window, PromisePolyfill)
var coreRenderer = function($window) {
	var $doc = $window.document
	var $emptyFragment = $doc.createDocumentFragment()
	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}
	var onevent
	function setEventCallback(callback) {return onevent = callback}
	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (typeof tag === "string") {
			vnode.state = {}
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			switch (tag) {
				case "#": return createText(parent, vnode, nextSibling)
				case "<": return createHTML(parent, vnode, nextSibling)
				case "[": return createFragment(parent, vnode, hooks, ns, nextSibling)
				default: return createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else return createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
		return vnode.dom
	}
	function createHTML(parent, vnode, nextSibling) {
		var match1 = vnode.children.match(/^\s*?<(\w+)/im) || []
		var parent1 = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match1[1]] || "div"
		var temp = $doc.createElement(parent1)
		temp.innerHTML = vnode.children
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs2 = vnode.attrs
		var is = attrs2 && attrs2.is
		ns = getNameSpace(vnode) || ns
		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element
		if (attrs2 != null) {
			setAttrs(vnode, attrs2, ns)
		}
		insertNode(parent, element, nextSibling)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				setLateAttrs(vnode)
			}
		}
		return element
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		vnode._state = vnode.state
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		initLifecycle(vnode._state, vnode, hooks)
		vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			var element = createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
			insertNode(parent, element, nextSibling)
			return element
		}
		else {
			vnode.domSize = 0
			return $emptyFragment
		}
	}
	//update
	function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
		else {
			if (old.length === vnodes.length) {
				var isUnkeyed = false
				for (var i = 0; i < vnodes.length; i++) {
					if (vnodes[i] != null && old[i] != null) {
						isUnkeyed = vnodes[i].key == null && old[i].key == null
						break
					}
				}
				if (isUnkeyed) {
					for (var i = 0; i < old.length; i++) {
						if (old[i] === vnodes[i]) continue
						else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))
						else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
						else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns)
					}
					return
				}
			}
			recycling = recycling || isRecyclable(old, vnodes)
			if (recycling) {
				var pool = old.pool
				old = old.concat(old.pool)
			}
			var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldStart], v = vnodes[start]
				if (o === v && !recycling) oldStart++, start++
				else if (o == null) oldStart++
				else if (v == null) start++
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldStart >= old.length - pool.length) || ((pool == null) && recycling)
					oldStart++, start++
					updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
				}
				else {
					var o = old[oldEnd]
					if (o === v && !recycling) oldEnd--, start++
					else if (o == null) oldEnd--
					else if (v == null) start++
					else if (o.key === v.key) {
						var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
						if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
						oldEnd--, start++
					}
					else break
				}
			}
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldEnd], v = vnodes[end]
				if (o === v && !recycling) oldEnd--, end--
				else if (o == null) oldEnd--
				else if (v == null) end--
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
					updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					if (o.dom != null) nextSibling = o.dom
					oldEnd--, end--
				}
				else {
					if (!map) map = getKeyMap(old, oldEnd)
					if (v != null) {
						var oldIndex = map[v.key]
						if (oldIndex != null) {
							var movable = old[oldIndex]
							var shouldRecycle = (pool != null && oldIndex >= old.length - pool.length) || ((pool == null) && recycling)
							updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							insertNode(parent, toFragment(movable), nextSibling)
							old[oldIndex].skip = true
							if (movable.dom != null) nextSibling = movable.dom
						}
						else {
							var dom = createNode(parent, v, hooks, ns, nextSibling)
							nextSibling = dom
						}
					}
					end--
				}
				if (end < start) break
			}
			createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
			removeNodes(old, oldStart, oldEnd + 1, vnodes)
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode._state = old._state
			vnode.events = old.events
			if (!recycling && shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					if (recycling) {
						vnode.state = {}
						initLifecycle(vnode.attrs, vnode, hooks)
					}
					else updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, nextSibling); break
					case "[": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, recycling, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
		}
		else {
			removeNode(old, null)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, nextSibling) {
		if (old.children !== vnode.children) {
			toFragment(old)
			createHTML(parent, vnode, nextSibling)
		}
		else vnode.dom = old.dom, vnode.domSize = old.domSize
	}
	function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, recycling, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns
		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle0 multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else if (old.text != null && vnode.text != null && vnode.text !== "") {
			if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
		}
		else {
			if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
			if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		if (recycling) {
			initComponent(vnode, hooks)
		} else {
			vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
			if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
			if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
			updateLifecycle(vnode._state, vnode, hooks)
		}
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(old.instance, null)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function isRecyclable(old, vnodes) {
		if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
			var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
			var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
			var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
			if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
				return true
			}
		}
		return false
	}
	function getKeyMap(vnodes, end) {
		var map = {}, i = 0
		for (var i = 0; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				var key2 = vnode.key
				if (key2 != null) map[key2] = i
			}
		}
		return map
	}
	function toFragment(vnode) {
		var count0 = vnode.domSize
		if (count0 != null || vnode.dom == null) {
			var fragment = $doc.createDocumentFragment()
			if (count0 > 0) {
				var dom = vnode.dom
				while (--count0) fragment.appendChild(dom.nextSibling)
				fragment.insertBefore(dom, fragment.firstChild)
			}
			return fragment
		}
		else return vnode.dom
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}
	function insertNode(parent, dom, nextSibling) {
		if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}
	function setContentEditable(vnode) {
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
	}
	//remove
	function removeNodes(vnodes, start, end, context) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				if (vnode.skip) vnode.skip = false
				else removeNode(vnode, context)
			}
		}
	}
	function removeNode(vnode, context) {
		var expected = 1, called = 0
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeremove === "function") {
			var result = vnode._state.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		continuation()
		function continuation() {
			if (++called === expected) {
				onremove(vnode)
				if (vnode.dom) {
					var count0 = vnode.domSize || 1
					if (count0 > 1) {
						var dom = vnode.dom
						while (--count0) {
							removeNodeFromDOM(dom.nextSibling)
						}
					}
					removeNodeFromDOM(vnode.dom)
					if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
						if (!context.pool) context.pool = [vnode]
						else context.pool.push(vnode)
					}
				}
			}
		}
	}
	function removeNodeFromDOM(node) {
		var parent = node.parentNode
		if (parent != null) parent.removeChild(node)
	}
	function onremove(vnode) {
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") vnode.attrs.onremove.call(vnode.state, vnode)
		if (typeof vnode.tag !== "string") {
			if (typeof vnode._state.onremove === "function") vnode._state.onremove.call(vnode.state, vnode)
			if (vnode.instance != null) onremove(vnode.instance)
		} else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}
	//attrs2
	function setAttrs(vnode, attrs2, ns) {
		for (var key2 in attrs2) {
			setAttr(vnode, key2, null, attrs2[key2], ns)
		}
	}
	function setAttr(vnode, key2, old, value, ns) {
		var element = vnode.dom
		if (key2 === "key" || key2 === "is" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return
		var nsLastIndex = key2.indexOf(":")
		if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
			element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value)
		}
		else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value)
		else if (key2 === "style") updateStyle(element, old, value)
		else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
			if (key2 === "value") {
				var normalized0 = "" + value // eslint-disable-line no-implicit-coercion
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select") {
					if (value === null) {
						if (vnode.dom.selectedIndex === -1 && vnode.dom === $doc.activeElement) return
					} else {
						if (old !== null && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
					}
				}
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old != null && vnode.dom.value === normalized0) return
			}
			// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
			if (vnode.tag === "input" && key2 === "type") {
				element.setAttribute(key2, value)
				return
			}
			element[key2] = value
		}
		else {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key2, "")
				else element.removeAttribute(key2)
			}
			else element.setAttribute(key2 === "className" ? "class" : key2, value)
		}
	}
	function setLateAttrs(vnode) {
		var attrs2 = vnode.attrs
		if (vnode.tag === "select" && attrs2 != null) {
			if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined)
			if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined)
		}
	}
	function updateAttrs(vnode, old, attrs2, ns) {
		if (attrs2 != null) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, old && old[key2], attrs2[key2], ns)
			}
		}
		if (old != null) {
			for (var key2 in old) {
				if (attrs2 == null || !(key2 in attrs2)) {
					if (key2 === "className") key2 = "class"
					if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)
					else if (key2 !== "key") vnode.dom.removeAttribute(key2)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function isAttribute(attr) {
		return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
	}
	function isCustomElement(vnode){
		return vnode.attrs.is || vnode.tag.indexOf("-") > -1
	}
	function hasIntegrationMethods(source) {
		return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
	}
	//style
	function updateStyle(element, old, style) {
		if (old === style) element.style.cssText = "", old = null
		if (style == null) element.style.cssText = ""
		else if (typeof style === "string") element.style.cssText = style
		else {
			if (typeof old === "string") element.style.cssText = ""
			for (var key2 in style) {
				element.style[key2] = style[key2]
			}
			if (old != null && typeof old !== "string") {
				for (var key2 in old) {
					if (!(key2 in style)) element.style[key2] = ""
				}
			}
		}
	}
	//event
	function updateEvent(vnode, key2, value) {
		var element = vnode.dom
		var callback = typeof onevent !== "function" ? value : function(e) {
			var result = value.call(element, e)
			onevent.call(element, e)
			return result
		}
		if (key2 in element) element[key2] = typeof value === "function" ? callback : null
		else {
			var eventName = key2.slice(2)
			if (vnode.events === undefined) vnode.events = {}
			if (vnode.events[key2] === callback) return
			if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)
			if (typeof value === "function") {
				vnode.events[key2] = callback
				element.addEventListener(eventName, vnode.events[key2], false)
			}
		}
	}
	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
		if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		var forceVnodeUpdate, forceComponentUpdate
		if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeupdate === "function") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old)
		if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
			return true
		}
		return false
	}
	function render(dom, vnodes) {
		if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = $doc.activeElement
		var namespace = dom.namespaceURI
		// First time0 rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""
		if (!Array.isArray(vnodes)) vnodes = [vnodes]
		updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		dom.vnodes = vnodes
		// document.activeElement can return null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
		if (active != null && $doc.activeElement !== active) active.focus()
		for (var i = 0; i < hooks.length; i++) hooks[i]()
	}
	return {render: render, setEventCallback: setEventCallback}
}
function throttle(callback) {
	//60fps translates to 16.6ms, round it down since setTimeout requires int
	var time = 16
	var last = 0, pending = null
	var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
	return function() {
		var now = Date.now()
		if (last === 0 || now - last >= time) {
			last = now
			callback()
		}
		else if (pending === null) {
			pending = timeout(function() {
				pending = null
				callback()
				last = Date.now()
			}, time - (now - last))
		}
	}
}
var _11 = function($window) {
	var renderService = coreRenderer($window)
	renderService.setEventCallback(function(e) {
		if (e.redraw === false) e.redraw = undefined
		else redraw()
	})
	var callbacks = []
	function subscribe(key1, callback) {
		unsubscribe(key1)
		callbacks.push(key1, throttle(callback))
	}
	function unsubscribe(key1) {
		var index = callbacks.indexOf(key1)
		if (index > -1) callbacks.splice(index, 2)
	}
	function redraw() {
		for (var i = 1; i < callbacks.length; i += 2) {
			callbacks[i]()
		}
	}
	return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
}
var redrawService = _11(window)
requestService.setCompletionCallback(redrawService.redraw)
var _16 = function(redrawService0) {
	return function(root, component) {
		if (component === null) {
			redrawService0.render(root, [])
			redrawService0.unsubscribe(root)
			return
		}
		
		if (component.view == null && typeof component !== "function") throw new Error("m.mount(element, component) expects a component, not a vnode")
		
		var run0 = function() {
			redrawService0.render(root, Vnode(component))
		}
		redrawService0.subscribe(root, run0)
		redrawService0.redraw()
	}
}
m.mount = _16(redrawService)
var Promise = PromisePolyfill
var parseQueryString = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)
	var entries = string.split("&"), data0 = {}, counters = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key5 = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
		if (value === "true") value = true
		else if (value === "false") value = false
		var levels = key5.split(/\]\[?|\[/)
		var cursor = data0
		if (key5.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			var isValue = j === levels.length - 1
			if (level === "") {
				var key5 = levels.slice(0, j).join()
				if (counters[key5] == null) counters[key5] = 0
				level = counters[key5]++
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {}
			}
			cursor = cursor[level]
		}
	}
	return data0
}
var coreRouter = function($window) {
	var supportsPushState = typeof $window.history.pushState === "function"
	var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
	function normalize1(fragment0) {
		var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
		if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data
		return data
	}
	var asyncId
	function debounceAsync(callback0) {
		return function() {
			if (asyncId != null) return
			asyncId = callAsync0(function() {
				asyncId = null
				callback0()
			})
		}
	}
	function parsePath(path, queryData, hashData) {
		var queryIndex = path.indexOf("?")
		var hashIndex = path.indexOf("#")
		var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
		if (queryIndex > -1) {
			var queryEnd = hashIndex > -1 ? hashIndex : path.length
			var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
			for (var key4 in queryParams) queryData[key4] = queryParams[key4]
		}
		if (hashIndex > -1) {
			var hashParams = parseQueryString(path.slice(hashIndex + 1))
			for (var key4 in hashParams) hashData[key4] = hashParams[key4]
		}
		return path.slice(0, pathEnd)
	}
	var router = {prefix: "#!"}
	router.getPath = function() {
		var type2 = router.prefix.charAt(0)
		switch (type2) {
			case "#": return normalize1("hash").slice(router.prefix.length)
			case "?": return normalize1("search").slice(router.prefix.length) + normalize1("hash")
			default: return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash")
		}
	}
	router.setPath = function(path, data, options) {
		var queryData = {}, hashData = {}
		path = parsePath(path, queryData, hashData)
		if (data != null) {
			for (var key4 in data) queryData[key4] = data[key4]
			path = path.replace(/:([^\/]+)/g, function(match2, token) {
				delete queryData[token]
				return data[token]
			})
		}
		var query = buildQueryString(queryData)
		if (query) path += "?" + query
		var hash = buildQueryString(hashData)
		if (hash) path += "#" + hash
		if (supportsPushState) {
			var state = options ? options.state : null
			var title = options ? options.title : null
			$window.onpopstate()
			if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
			else $window.history.pushState(state, title, router.prefix + path)
		}
		else $window.location.href = router.prefix + path
	}
	router.defineRoutes = function(routes, resolve, reject) {
		function resolveRoute() {
			var path = router.getPath()
			var params = {}
			var pathname = parsePath(path, params, params)
			var state = $window.history.state
			if (state != null) {
				for (var k in state) params[k] = state[k]
			}
			for (var route0 in routes) {
				var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
				if (matcher.test(pathname)) {
					pathname.replace(matcher, function() {
						var keys = route0.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						for (var i = 0; i < keys.length; i++) {
							params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						}
						resolve(routes[route0], params, path, route0)
					})
					return
				}
			}
			reject(path, params)
		}
		if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
		else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
		resolveRoute()
	}
	return router
}
var _20 = function($window, redrawService0) {
	var routeService = coreRouter($window)
	var identity = function(v) {return v}
	var render1, component, attrs3, currentPath, lastUpdate
	var route = function(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		var run1 = function() {
			if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))
		}
		var bail = function(path) {
			if (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})
			else throw new Error("Could not resolve default route " + defaultRoute)
		}
		routeService.defineRoutes(routes, function(payload, params, path) {
			var update = lastUpdate = function(routeResolver, comp) {
				if (update !== lastUpdate) return
				component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
				attrs3 = params, currentPath = path, lastUpdate = null
				render1 = (routeResolver.render || identity).bind(routeResolver)
				run1()
			}
			if (payload.view || typeof payload === "function") update({}, payload)
			else {
				if (payload.onmatch) {
					Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
						update(payload, resolved)
					}, bail)
				}
				else update(payload, "div")
			}
		}, bail)
		redrawService0.subscribe(root, run1)
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		routeService.setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = function(prefix0) {routeService.prefix = prefix0}
	route.link = function(vnode1) {
		vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href)
		vnode1.dom.onclick = function(e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
			e.preventDefault()
			e.redraw = false
			var href = this.getAttribute("href")
			if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
			route.set(href, undefined, undefined)
		}
	}
	route.param = function(key3) {
		if(typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3]
		return attrs3
	}
	return route
}
m.route = _20(window, redrawService)
m.withAttr = function(attrName, callback1, context) {
	return function(e) {
		callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
	}
}
var _28 = coreRenderer(window)
m.render = _28.render
m.redraw = redrawService.redraw
m.request = requestService.request
m.jsonp = requestService.jsonp
m.parseQueryString = parseQueryString
m.buildQueryString = buildQueryString
m.version = "1.1.6"
m.vnode = Vnode
if (typeof module !== "undefined") module["exports"] = m
else window.m = m
}());
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],55:[function(require,module,exports){
var { lerp, map } = require('./utils/math');
// var { wait, sequence } = require('./utils/time');
var tween = require('./utils/tween');
var { quadInOut } = require('eases');

var rand = (min, max) => lerp(min, max, Math.random());
var randInt = (min, max) => Math.floor(rand(min, max));
var sample = a => a[randInt(0, a.length)];

var intermix = arrays => {
    arrays = arrays.map(a => a.slice());
    var ret = [];
    var len = arrays.reduce((sum, a) => sum + a.length, 0);
    for (var i = 0; i < len; i++) {
        ret.push(sample(arrays.filter(a => a.length > 0)).shift());
    }
    return ret;
};
var pairwise = arr => {
    var pairs = [];
    for (var i = 0; i < arr.length - 1; i++) {
        pairs.push([arr[i], arr[i + 1]]);
    }
    return pairs;
};
var fumble = steps => {
    if (steps === 1) return [[0, 1]];
    var positions = [];
    var p = 0;
    for (var i = 0; i < steps - 2; i++) {
        p += (1 - p) * rand(.1, 1);
        positions.push(p);
    }
    return pairwise([0, ...positions, 1]);
};

var interleave = (a1, a2) => [...a1.slice(0, -1).reduce((acc, x, i) => [...acc, x, a2[i]], []), a1[a1.length - 1]];

var animation = (steps, speed) => {
    var tweens = fumble(steps);
    return tweens.map(([from, to]) => {
        var d = Math.abs(from - to);
        var duration = d / speed;
        return { from, to, duration };
    });
};

var pause = () => ({ prop: null, duration: randInt(250, 500) });

var ease = (t, startTime, endTime, from, to) => {
    return map(quadInOut(map(t, startTime, endTime, 0, 1)), 0, 1, from, to);
};

module.exports = (props, onProgress) => {
    var state = {};
    for (var key in props) state[key] = 0;
    var steps = Array(Object.keys(props).length).fill(2);
    steps[randInt(0, steps.length)] = 3;
    var animations = intermix(Object.keys(props).map((prop, i) => {
        var anims = animation(steps[i], props[prop]);
        anims.forEach(a => a.prop = prop);
        return anims;
    }));
    var pauses = Array(animations.length - 1).fill(0).map(pause);
    var sequence = interleave(animations, pauses);
    var duration = 0;
    sequence.forEach(step => {
        step.startTime = duration;
        step.endTime = step.startTime + step.duration;
        duration += step.duration;
    });
    console.log(sequence);
    return tween({ from: 0, to: duration, easing: 'linear', duration, onProgress: t => {
            for (var i = 0; i < sequence.length; i++) {
                var { prop, from, to, startTime, endTime } = sequence[i];
                if (t < startTime) {
                    break;
                } else if (prop === null) {
                    continue;
                } else if (t > endTime) {
                    state[prop] = to;
                } else {
                    state[prop] = ease(t, startTime, endTime, from, to);
                }
            }
            onProgress(state);
        } });
};

},{"./utils/math":69,"./utils/tween":72,"eases":20}],56:[function(require,module,exports){
var m = require('mithril');

module.exports = {
    view: ({ attrs: { firstName, lastName, byline, email } }) => {
        return m('header', {
            className: m.route.get() === '/' ? 'header header--invert' : 'header'
        }, m('.header__title', m('span', `©${new Date().getFullYear()}`), m('span', lastName), m('span', firstName), m('a', { href: `mailto:${email}` }, email)), m('.header__info', m('span.byline', byline), m('a', { href: `mailto:${email}` }, email)));
    }
};

},{"mithril":54}],57:[function(require,module,exports){
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var m = require('mithril');

module.exports = {
    view: (_ref) => {
        let { attrs: { position, size, src } } = _ref,
            rest = _objectWithoutProperties(_ref.attrs, ['position', 'size', 'src']);

        var style = {
            width: size[0] + 'px',
            height: size[1] + 'px',
            left: position[0] + 'px',
            top: position[1] + 'px'
        };
        return m('img.page', _extends({
            style,
            src
        }, rest));
    }
};

},{"mithril":54}],58:[function(require,module,exports){
var m = require('mithril');

var v2 = require('../utils/vec2');
var marginUtils = require('../utils/margins');
var { thumbnail, flow } = require('../utils/layout');

var Page = require('./Page');

var layout = (pages, viewport) => {
    var thumbnails = pages.map(page => thumbnail(page.size, viewport));
    var maxWidth = marginUtils.innerSize(viewport)[0];
    return flow(thumbnails, maxWidth);
};

module.exports = {
    height: 0,
    oninit: ({ state, attrs: { viewport } }) => {
        state.width = marginUtils.innerSize(viewport)[0];
    },
    onbeforeupdate: ({ state, attrs: { viewport } }) => {
        var width = marginUtils.innerSize(viewport)[0];
        if (width !== state.width) {
            state.width = width;
            return true;
        } else {
            return false;
        }
    },
    view: ({
        attrs: { pages, onmouseenter, viewport, slug },
        state: { width }
    }) => {
        if (width === null) return m('.pages');
        var { rects, height } = layout(pages, viewport);
        return m('.pages', { style: { height: height + 'px' } }, rects.map(({ position, size }, i) => {
            var page = pages[i];
            return m(Page, {
                position, size,
                src: page.small,
                onmouseenter,
                'data-index': i,
                id: `${slug}_${i}`
            });
        }));
    }
};

},{"../utils/layout":67,"../utils/margins":68,"../utils/vec2":73,"./Page":57,"mithril":54}],59:[function(require,module,exports){
var m = require('mithril');
var v2 = require('../utils/vec2');
var tween = require('../utils/tween');

var Page = require('./Page');

var transition = require('../transition');
var throttle = require('lodash/throttle');
var { fullscreen, flow, scrollTo } = require('../utils/layout');

var findParent = (el, cls) => {
    while (el !== document && !el.classList.contains(cls)) {
        el = el.parentNode;
    }
    return el;
};

var layout = (pages, viewport) => {
    var { rects } = flow(pages.map(page => fullscreen(page.size, viewport)));
    var marginX = (viewport.size[0] - rects[0].size[0]) / 2;
    rects.forEach(({ position }) => {
        position[0] += marginX;
        position[1] += viewport.margins[0][1];
    });
    var last = rects[rects.length - 1];
    var width = last.position[0] + last.size[0] + marginX;
    return { rects, width };
};

var cursor = document.querySelector('.cursor');

var setCursor = e => {
    if (e) e.redraw = false;
    cursor.classList.add('cursor--close');
};

var unsetCursor = e => {
    if (e) e.redraw = false;
    cursor.classList.remove('cursor--close');
};

var cancelRedraw = fn => e => {
    e.redraw = false;
    fn(e);
};

module.exports = {
    scrollLeft: 0,
    onscroll: (state, e) => {
        state.scrollLeft = e.target.scrollLeft;
        m.redraw();
    },
    close: e => {
        unsetCursor();
        var page = [...findParent(e.target, 'project').querySelectorAll('.page')].find(p => p.getBoundingClientRect().right > 0);
        transition.show().then(() => {
            var p = transition.toGrid(page);
            m.route.set('/');
            return p;
        }).then(transition.hide);
    },
    oninit: ({ state, attrs: { project: { pages }, viewport } }) => {
        state.onscroll = cancelRedraw(throttle(state.onscroll.bind(null, state), 1000, { leading: true, trailing: true }));
        var { rects, width } = layout(pages, viewport);
        state.rects = rects;
        state.width = width;
        state.viewport = v2.copy(viewport);
        state.onclick = e => {
            var el = e.currentTarget;
            var cx = viewport.size[0] / 2;
            var rect = state.rects.find(e.clientX < viewport.size[0] / 2 ? rect => state.scrollLeft + rect.position[0] + rect.size[0] < cx : rect => state.scrollLeft + rect.position[0] > cx);
            if (!rect) return;
            el.scrollTo(scrollTo(rect, viewport), 0);
        };
    },
    oncreate: ({ state, dom, attrs: { params, viewport } }) => {
        if (params.page) {
            state.scrollLeft = scrollTo(state.rects[params.page], viewport);
            dom.querySelector('.project__scroll').scrollLeft = state.scrollLeft;
        }
    },
    onbeforeupdate: ({ state, attrs: { project: { pages }, viewport } }) => {
        if (!v2.equal(state.viewport, viewport)) {
            var { rects, width } = layout(pages, viewport);
            state.rects = rects;
            state.width = width;
            state.viewport = v2.copy(viewport);
        }
    },
    view: ({
        attrs: { project: { title, pages, slug }, viewport },
        state: { rects, width, scrollLeft, onscroll, onclick, close }
    }) => {
        var minX = viewport.size[0] * -2;
        var maxX = viewport.size[0] * 3;
        return m('.project', { onscroll }, m('.project__scroll', { onscroll, onclick }, m('.project__pages', { style: { width: width + 'px' } }, rects.map(({ size, position }, i) => {
            var left = position[0] - scrollLeft;
            var visible = left < maxX && left + size[0] > minX;
            if (!visible) return undefined;
            var page = pages[i];
            return m(Page, { size, position, src: page.large, key: i, id: `${slug}_${i}` });
        }))), m('.footer', m('.footer__title', title), m('a', { onclick: close, onmouseenter: setCursor, onmouseleave: unsetCursor }, 'RETURN')));
    }
};

},{"../transition":66,"../utils/layout":67,"../utils/tween":72,"../utils/vec2":73,"./Page":57,"lodash/throttle":52,"mithril":54}],60:[function(require,module,exports){
var m = require('mithril');

var Pages = require('./Pages');

var transition = require('../transition');

var touch = 'ontouchstart' in window;

var Project = {
    onclick: (viewport, e) => {
        if (e.target.tagName === 'A') return;
        var slug = e.currentTarget.id;
        var page = e.target.classList.contains('page') ? Number(e.target.dataset.index) : null;
        transition.show().then(() => {
            m.route.set(slug, null, { state: { page } });
            return transition.toFullscreen(`${slug}_${page || 0}`, viewport);
        }).then(transition.hide);
    },
    page: null,
    setPage: (state, e) => state.page = Number(e.target.dataset.index),
    unsetPage: state => state.page = null,
    oninit: ({ state }) => {
        state.setPage = state.setPage.bind(null, state);
        state.unsetPage = state.unsetPage.bind(null, state);
    },
    onbeforeupdate: () => m.route.get() === '/',
    view: ({
        attrs: { project: { title, format, year, description, pages, slug }, viewport },
        state: { onclick, page, setPage, unsetPage }
    }) => {
        return m('.project-thumbnail', { id: slug, onclick: e => onclick(viewport, e), onmouseleave: touch ? undefined : unsetPage }, m('.project-info', m('span', title + ','), format && m('span', format + ','), year && m('span', year + '.'), page !== null && m('span', `${page + 1}/${pages.length}`)), description && m('.project-description', m.trust(description)), m(Pages, { pages, onmouseenter: touch ? undefined : setPage, viewport, slug }));
    }
};

module.exports = {
    transition: e => {
        // ??
    },
    view: ({ attrs: { projects, viewport } }) => {
        return m('.projects', { style: { paddingTop: viewport.margins[0][1] + 'px' } }, projects.map(project => {
            return m(Project, { project, viewport });
        }), m('p.credit', 'Website by ', m('a', { href: 'http://bewe.me', target: '_blank' }, 'Ben West')));
    }
};

},{"../transition":66,"./Pages":58,"mithril":54}],61:[function(require,module,exports){
var m = require('mithril');
var fastdom = require('fastdom');
var v2 = require('../utils/vec2');
var { BREAKPOINT } = require('../config');

var Header = require('./Header');
var Projects = require('./Projects');
var Project = require('./Project');

var getHeight = el => el.getBoundingClientRect().height;

var update = ({ dom, state }) => fastdom.measure(() => {
    var size = v2(window.innerWidth, window.innerHeight);
    var marginX = size[0] < BREAKPOINT ? 20 : 40;
    var headerHeight = getHeight(dom.querySelector('.header'));
    var footerHeight = getHeight(dom.querySelector('.footer'));
    var margins = [v2(marginX, headerHeight), v2(marginX, footerHeight)];
    if (state.viewport === null || !v2.equal(size, state.viewport.size) || !v2.equal(margins[0], state.viewport.margins[0]) || !v2.equal(margins[1], state.viewport.margins[1])) {
        state.viewport = { size, margins };
        m.redraw();
    }
});

module.exports = {
    viewport: null,
    oncreate: update,
    onbeforeupdate: vnode => {
        console.time('render');
    },
    onupdate: vnode => {
        update(vnode);
        console.timeEnd('render');
    },
    view: ({ attrs: { content, params }, state: { viewport } }) => {
        var slug = m.route.param('slug');
        return m('div', m(Header, content), viewport !== null && [m(Projects, { projects: content.projects, viewport }), slug && m(Project, {
            project: content.projects.find(p => p.slug === slug),
            viewport,
            params
        })], m('.footer.footer--sizer', m.trust('&nbsp;')));
    }
};

},{"../config":62,"../utils/vec2":73,"./Header":56,"./Project":59,"./Projects":60,"fastdom":34,"mithril":54}],62:[function(require,module,exports){
var v2 = require('./utils/vec2');

module.exports = {
    BREAKPOINT: 768
};

},{"./utils/vec2":73}],63:[function(require,module,exports){
var glslify = require('glslify');
var MagicUniforms = require('gl-magic-uniforms');
var frag = glslify(["// Author:\n// Title:\n\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\n#define TAU 6.28318530718\n\nuniform vec2 resolution;\nuniform mat3 transform;\nuniform mat3 prevTransform;\nuniform sampler2D texture;\n\nconst int iterations = 20;\n\nfloat random ( vec2 co ) {\n    const float a = 12.9898;\n    const float b = 78.233;\n    const float c = 43758.5453;\n    float dt = dot( co.xy, vec2( a, b ) );\n    float sn = mod( dt, 3.14 );\n    return fract( sin( sn ) * c );\n}\n\nvec2 mult ( inout vec2 r ) {\n    r = fract(r * vec2(12.9898,78.233));\n    return sqrt( r.x + .001 ) * vec2( sin( r.y * TAU ), cos( r.y * TAU ) );\n}\n\nvec4 sample ( vec2 p ) {\n    vec4 color = texture2D( texture, p );\n    vec4 grey = vec4( vec3( ( color.r + color.g + color.b ) / 3. ), color.a );\n    vec2 mask = step( vec2( 0. ), p ) * step( p, vec2( 1. ) );\n    return grey * mask.x * mask.y;\n}\n\nvec2 rotate( vec2 v, float a ) {\n\tfloat s = sin( a );\n\tfloat c = cos( a );\n\tmat2 m = mat2( c, -s, s, c );\n\treturn m * v;\n}\n\nvec4 hashBlur ( vec2 p, vec2 size ) {\n    vec2 rnd = vec2( random( vec2( p ) ) );\n    vec4 acc = vec4( 0. );\n    for ( int i = 0; i < iterations; i++ ) {\n        acc += sample( p + size * mult( rnd ) );\n    }\n    return acc / float( iterations );\n}\n\n// vec4 invPow ( vec4 x, float e ) {\n//     return vec4( 1. ) - pow( vec4( 1. ) - x, e );\n// }\n\nvoid main() {\n    vec2 p = gl_FragCoord.xy / resolution;\n    p.y = 1. - p.y;\n    vec2 uv = ( transform * vec3( p, 1. ) ).xy;\n    vec2 pUv = ( prevTransform * vec3( p, 1. ) ).xy;\n    vec2 d = uv - pUv;\n    gl_FragColor = hashBlur( uv, max( vec2( .001 ), d ) );\n    \n    \n    // gl_FragColor = texture2D( texture, uv );\n    // gl_FragColor = vec4( fract( uv * 20. ), 0., 1. );\n    //vec2 st = gl_FragCoord.xy;\n    //st.y = uResolution.y - st.y;\n    // vec3 color = invPow( hashBlur( st, vec2( 0.000,0.100 ), 0.624 ), 2. );\n    // gl_FragColor = sample( st );\n}"]);

module.exports = (canvas = document.createElement('canvas')) => {

    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (gl === null) return null;

    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);

    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, `
        attribute vec2 aPosition;
        void main () {
            gl_Position = vec4( aPosition, 0., 1. );
        }
    `);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(vs));
    }

    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, frag);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(fs));
    }

    var shader = gl.createProgram();
    gl.attachShader(shader, vs);
    gl.attachShader(shader, fs);
    gl.linkProgram(shader);
    gl.useProgram(shader);

    var shaderUniforms = MagicUniforms(gl, shader);

    var buffer = new Float32Array([-1, 3, -1, -1, 3, -1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW);
    var aPosition = gl.getAttribLocation(shader, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // var uPosition = gl.getUniformLocation( shader, "uPosition" );
    // var uSize = gl.getUniformLocation( shader, "uSize" );
    // var uResolution = gl.getUniformLocation( shader, "uResolution" );

    gl.activeTexture(gl.TEXTURE0);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    shaderUniforms.texture = 0;

    var uploadTexture = img => {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };

    var setSize = (width, height) => {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
    };

    var draw = uniforms => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        for (var handle in uniforms) {
            shaderUniforms[handle] = uniforms[handle];
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    return {
        canvas,
        uploadTexture,
        setSize,
        draw
    };
};

},{"gl-magic-uniforms":35,"glslify":40}],64:[function(require,module,exports){
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var npo2 = x => {
    var r = 1;
    while (r < x) r *= 2;
    return r;
};

module.exports = imgs => {
    canvas.width = Math.min(npo2(window.innerWidth), 2048);
    canvas.height = Math.min(npo2(window.innerHeight), 2048);
    ctx.scale(canvas.width / window.innerWidth, canvas.height / window.innerHeight);
    imgs.forEach(img => {
        var rect = img.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
            ctx.drawImage(img, rect.left, rect.top, rect.width, rect.height);
        }
    });
    return canvas;
};

},{}],65:[function(require,module,exports){
var m = require('mithril');
var fastdom = require('fastdom');
var rAF = require('./utils/rAF');

var content = JSON.parse(document.getElementById('content').innerText);
// content.projects = [ content.projects[ 0 ] ];
// content.projects[ 0 ].pages = [ content.projects[ 0 ].pages[ 0 ] ];
// console.log( content );

var View = require('./components/View');

document.body.classList.toggle('touch', 'ontouchstart' in window);

var cursor = document.querySelector('.cursor');
var mouse = [0, 0];
window.addEventListener('mousemove', e => {
    mouse[0] = e.clientX;
    mouse[1] = e.clientY;
});
rAF.start('cursor', () => cursor.style.transform = `translate( ${mouse[0]}px, ${mouse[1]}px )`);

m.route.prefix('');
m.route(document.querySelector('main'), '/', {
    '/': { render: vnode => m(View, { content, params: vnode.attrs }) },
    '/:slug': { render: vnode => m(View, { content, params: vnode.attrs }) }
});
window.addEventListener('resize', m.redraw);
setTimeout(m.redraw, 0);

},{"./components/View":61,"./utils/rAF":70,"fastdom":34,"mithril":54}],66:[function(require,module,exports){
var v2 = require('./utils/vec2');
var mat3 = require('gl-matrix-mat3');

var { fullscreen } = require('./utils/layout');
var { lerp } = require('./utils/math');
var { wait } = require('./utils/time');

var animate = require('./animate');
var renderer = require('./gl/renderer')();

var drawTexture = require('./gl/texture');

var main = document.querySelector('main');

var show = () => {
    main.classList.add('transition');
    return wait(250).then(() => renderer.canvas.style.display = 'block');
};

var hide = () => {
    renderer.canvas.style.display = '';
    main.classList.remove('transition');
    return wait(250);
};

var readElement = el => {
    var rect = el.getBoundingClientRect();
    return {
        size: v2(rect.width, rect.height),
        position: v2(rect.left, rect.top)
    };
};

var keyframes = (thumbnail, full, dir) => {
    var viewportCenter = v2(window.innerWidth / 2, window.innerHeight / 2);
    var scale = full.size[0] / thumbnail.size[0];
    var fullscreenCenterOffset = v2.sub(viewportCenter, full.position);
    var thumbFullscreenCenter = v2.add(thumbnail.position, v2.scale(fullscreenCenterOffset, 1 / scale));
    var offset = v2.sub(viewportCenter, thumbFullscreenCenter);
    var identity = { offset: v2(), scale: 1 };
    var transformed = { offset, scale };
    return dir === 1 ? { from: identity, to: transformed } : { from: transformed, to: identity };
};

var transition = ({ from, to }) => {
    var offset = v2();
    var scale = v2();
    var transform = mat3.create();
    var prevTransform = mat3.create();
    var resolution = v2(window.innerWidth, window.innerHeight);
    var center = v2(.5, .5);
    var centerInv = v2.negate(center);
    renderer.setSize(resolution[0], resolution[1]);
    renderer.uploadTexture(drawTexture([...document.querySelectorAll('.projects .page')]));
    var update = state => {
        offset[0] = lerp(from.offset[0], to.offset[0], state.x) / -resolution[0];
        offset[1] = lerp(from.offset[1], to.offset[1], state.y) / -resolution[1];
        scale[0] = scale[1] = 1 / lerp(from.scale, to.scale, state.scale);
        mat3.identity(transform);
        mat3.translate(transform, transform, center);
        mat3.translate(transform, transform, offset);
        mat3.scale(transform, transform, scale);
        mat3.translate(transform, transform, centerInv);
        renderer.draw({ resolution, transform, prevTransform });
        mat3.copy(prevTransform, transform);
    };
    return animate({ x: 0.003, y: 0.003, scale: 0.002 }, update);
};

// var transform = ( { offset, scale }, origin ) => rect => ({
//     position: v2.add( scaleAround( rect.position, origin, scale ), v2.scale( offset, scale ) ),
//     size: v2.scale( rect.size, scale )
// });

var toFullscreen = (id, viewport) => {
    var thumbs = [...document.querySelectorAll('.projects .page')];
    var idx = thumbs.findIndex(el => el.id === id);
    var thumbRects = thumbs.map(readElement);
    var fullSize = fullscreen(thumbRects[idx].size, viewport).size;
    var fullRect = {
        size: fullSize,
        position: v2((viewport.size[0] - fullSize[0]) / 2, viewport.margins[0][1])
    };
    return transition(keyframes(thumbRects[idx], fullRect, 1));
};

var toGrid = fullElement => {
    var thumbs = [...document.querySelectorAll('.projects .page')];
    var idx = thumbs.findIndex(el => el.id === fullElement.id);
    var thumbRects = thumbs.map(readElement);
    var fullRect = readElement(fullElement);
    return transition(keyframes(thumbRects[idx], fullRect, -1));
};

if (renderer === null) {
    var asyncNoop = () => Promise.resolve();
    module.exports = {
        hide: asyncNoop,
        show: asyncNoop,
        toGrid: asyncNoop,
        toFullscreen: asyncNoop
    };
} else {
    renderer.canvas.classList.add('transition-renderer');
    renderer.canvas.style.display = 'none';
    document.body.appendChild(renderer.canvas);
    module.exports = { hide, show, toGrid, toFullscreen };
}

// var canvas = document.createElement('canvas');
// canvas.classList.add('transition-renderer');
// document.body.appendChild( canvas );
// var resize = () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }
// resize();
// window.addEventListener( 'resize', resize )
// var draw = renderer( canvas );

// var tween = ( thumbnail, full, dir ) => {
//     var scale = full.size[ 0 ] / thumbnail.size[ 0 ];
//     var fullscreenCenterOffset = v2.sub( viewportCenter(), full.position );
//     var thumbFullscreenCenter = v2.add( thumbnail.position, v2.scale( fullscreenCenterOffset, 1 / scale ) );
//     var offset = v2.sub( viewportCenter(), thumbFullscreenCenter );
//     var identity = { offset: v2(), scale: 1 };
//     var transformed = { offset, scale };
//     return dir === 1
//         ? { from: identity, to: transformed }
//         : { from: transformed, to: identity };
// }

// var anim = ( { from, to }, onProgress ) => {
//     var offset = v2();
//     var update = state => {
//         offset[ 0 ] = lerp( from.offset[ 0 ], to.offset[ 0 ], state.x );
//         offset[ 1 ] = lerp( from.offset[ 1 ], to.offset[ 1 ], state.y );
//         onProgress({ offset, scale: lerp( from.scale, to.scale, state.scale ) })
//     };
//     return animate( { x: .003, y: .003, scale: .002 }, update );
// }

// var viewportCenter = () => v2( window.innerWidth / 2, window.innerHeight / 2 );
// var center = ({ position, size }) => v2.add( position, v2.scale( size, .5 ) );

// var scaleAround = ( point, origin, scale ) => {
//     return v2.add( v2.scale( v2.subtract( point, origin ), scale ), origin )
// }

// var transform = ( { offset, scale }, origin ) => rect => ({
//     position: v2.add( scaleAround( rect.position, origin, scale ), v2.scale( offset, scale ) ),
//     size: v2.scale( rect.size, scale )
// });

// // var draw = rects => {
// //     ctx.clearRect( 0, 0, canvas.width, canvas.height );
// //     ctx.fillStyle = 'black';
// //     ctx.fillRect( 0, 0, canvas.width, canvas.height );
// //     ctx.fillStyle = 'white';
// //     rects.forEach( ({ position, size }) => {
// //         if (
// //             position[ 0 ] > window.innerWidth ||
// //             position[ 1 ] > window.innerHeight ||
// //             position[ 0 ] + size[ 0 ] < 0 ||
// //             position[ 1 ] + size[ 1 ] < 0
// //         ) return;
// //         ctx.fillRect( position[ 0 ], position[ 1 ], size[ 0 ], size[ 1 ] );
// //     })
// // }

// var render = rects => {
//     var c = viewportCenter();
//     return state => draw( rects.map( transform( state, c ) ) )
// }

// var readElement = el => {
//     var rect = el.getBoundingClientRect();
//     return {
//         size: v2( rect.width, rect.height ),
//         position: v2( rect.left, rect.top )
//     }
// }

// var show = () => new Promise( resolve => {
//     console.log( 'show' )
//     canvas.style.display = 'block';
//     resolve();
// })

// var hide = () => new Promise( resolve => {
//     console.log( 'hide' )
//     canvas.style.display = '';
//     resolve();
// })


// var toFullscreen = ( id, viewport ) => {
//     var thumbs = [ ...document.querySelectorAll('.projects .page') ];
//     var idx = thumbs.findIndex( el => el.id === id );
//     var thumbRects = thumbs.map( readElement );
//     var fullSize = fullscreen( thumbRects[ idx ].size, viewport ).size;
//     var fullRect = {
//         size: fullSize,
//         position: v2(
//             ( viewport.size[ 0 ] - fullSize[ 0 ] ) / 2,
//             viewport.margins[ 0 ][ 1 ]
//         )
//     }
//     return anim( tween( thumbRects[ idx ], fullRect, 1 ), render( thumbRects ) )
// }

// var npo2 = x => {
//     var r = 1;
//     while ( r < x ) r *= 2;
//     return r;
// }
// var drawTexture = imgs => {
//     var canvas = document.createElement( 'canvas' );
//     var ctx = canvas.getContext( '2d' );
//     canvas.width = Math.min( npo2( window.innerWidth ), 2048 );
//     canvas.height = Math.min( npo2( window.innerHeight ), 2048 );
//     ctx.scale( canvas.width / window.innerWidth, canvas.height / window.innerHeight );
//     imgs.forEach( img => {
//         var rect = img.getBoundingClientRect();
//         // if ( rect.bottom > 0 && rect.top < window.innerHeight ) {
//             ctx.drawImage( img, rect.left, rect.top, rect.width, rect.height );
//         // }
//     });
//     return canvas;
// }

// var toGrid = fullElement => {
//     var thumbs = [ ...document.querySelectorAll('.projects .page') ];
//     var idx = thumbs.findIndex( el => el.id === fullElement.id );
//     var thumbRects = thumbs.map( readElement );
//     var fullRect = readElement( fullElement );
//     return anim( tween( thumbRects[ idx ], fullRect, -1 ), render( thumbRects ) )
// }

// module.exports = { show, hide, toFullscreen, toGrid }

},{"./animate":55,"./gl/renderer":63,"./gl/texture":64,"./utils/layout":67,"./utils/math":69,"./utils/time":71,"./utils/vec2":73,"gl-matrix-mat3":37}],67:[function(require,module,exports){
var v2 = require('./vec2');
var { map } = require('./math');
var marginUtils = require('./margins');

var MIN = 20;

var thumbnailScale = viewport => map(viewport.size[0], 300, 1000, .07, .09);

var fullscreen = (pageSize, viewport) => {
    var maxSize = marginUtils.innerSize(viewport);
    var scale = v2.contain(pageSize, maxSize);
    var size = v2.scale(pageSize, scale);
    var innerMargins = Array(2).fill(v2.scale(v2.sub(maxSize, size), .5));
    var marginX = MIN / thumbnailScale(viewport);
    var margins = marginUtils.add(innerMargins, viewport.margins);
    margins[0][0] = margins[1][0] = Math.max(marginX, MIN);
    margins[0][1] = Math.max(MIN, margins[0][1]);
    margins[1][1] = Math.max(MIN, margins[0][1]);
    return { size, margins };
};

var thumbnail = (pageSize, viewport) => {
    var scale = thumbnailScale(viewport);
    var size = v2.scale(pageSize, scale);
    var fs = fullscreen(pageSize, viewport);
    var fullscreenScale = fs.size[0] / pageSize[0];
    var margins = fs.margins.map(v => v2.scale(v, 1 / fullscreenScale * scale)).map(v => v2(Math.max(MIN, v[0]), Math.max(MIN, v[1])));
    return { size, margins };
};

var flow = (pages, maxWidth = Infinity) => {
    var x = 0;
    var marginX = 0;
    var rows = [];
    var row = [];
    var rects = pages.map(page => {
        var marginLeft = row.length > 0 ? Math.max(page.margins[0][0], marginX) : 0;
        var right = x + marginLeft + page.size[0];
        if (right > maxWidth) {
            rows.push(row);
            row = [];
            x = marginX = marginLeft = 0;
        }
        var rect = {
            position: v2(x + marginLeft, 0),
            size: page.size,
            margins: page.margins
        };
        row.push(rect);
        x += marginLeft + page.size[0];
        marginX = page.margins[1][0];
        return rect;
    });
    rows.push(row);
    var y = 0;
    var marginY = 0;
    rows.forEach((row, i) => {
        var maxHeight = Math.max(...row.map(rect => rect.size[1]));
        var maxTopMargin = Math.max(...row.map(rect => rect.margins[0][1]));
        var maxBottomMargin = Math.max(...row.map(rect => rect.margins[1][1]));
        var rowTop = i === 0 ? 0 : y + Math.max(marginY, maxTopMargin);
        row.forEach(({ position }) => position[1] = rowTop);
        y = rowTop + maxHeight;
        marginY = maxBottomMargin;
    });
    return { rects, height: y };
};

var strip = (pages, viewport) => {
    var { rects } = flow(pages.map(page => fullscreen(page.size, viewport)));
    var marginX = (viewport.size[0] - rects[0].size[0]) / 2;
    rects.forEach(({ position }) => {
        position[0] += marginX;
        position[1] += viewport.margins[0][1];
    });
    var last = rects[rects.length - 1];
    var width = last.position[0] + last.size[0] + marginX;
    return { rects, width };
};

var scrollTo = (rect, viewport) => {
    return rect.position[0] - viewport.size[0] / 2 + rect.size[0] / 2;
};

module.exports = { fullscreen, thumbnail, flow, strip, scrollTo };

},{"./margins":68,"./math":69,"./vec2":73}],68:[function(require,module,exports){
var v2 = require('./vec2');

var innerSize = ({ size, margins }) => v2(size[0] - (margins[0][0] + margins[1][0]), size[1] - (margins[0][1] + margins[1][1]));

var add = (m1, m2) => [v2.add(m1[0], m2[0]), v2.add(m1[1], m2[1])];

module.exports = { innerSize, add };

},{"./vec2":73}],69:[function(require,module,exports){
var clamp = (x, min, max) => Math.min(Math.max(x, min), max);
var lerp = (a, b, t) => a + (b - a) * t;
var map = (x, oldMin, oldMax, newMin, newMax) => newMin + (newMax - newMin) * (x - oldMin) / (oldMax - oldMin);
var cmap = (x, oldMin, oldMax, newMin, newMax) => map(clamp(x, oldMin, oldMax), oldMin, oldMax, newMin, newMax);
var invPow = (x, p, max = 1) => max - Math.pow(max - x, p);

module.exports = { clamp, map, cmap, lerp, invPow };

},{}],70:[function(require,module,exports){
var funcs = {};

var funcCount = 0;

var frame = false;

var then;

function tick() {

	var now = Date.now();

	var dT = now - then;

	for (var name in funcs) {

		if (funcs[name](now, dT) === false) {

			stop(name);
		};
	}

	then = now;

	frame = requestAnimationFrame(tick);
}

function start(name, fn) {

	if (!fn) {

		fn = name;

		name = Math.random().toString();
	}

	if (name in funcs) return name;

	funcs[name] = fn;

	funcCount++;

	if (!frame) {

		then = Date.now();

		frame = window.requestAnimationFrame(tick);
	}

	return name;
}

function stop(name) {

	if (name === undefined) {

		funcs = {};

		funcCount = 0;
	} else if (name in funcs) {

		delete funcs[name];

		funcCount--;
	}

	if (funcCount === 0) {

		window.cancelAnimationFrame(frame);

		frame = false;
	}
}

var once = fn => {

	return start((now, dT) => {

		fn(now, dT);

		return false;
	});
};

module.exports = { start, once, stop };

},{}],71:[function(require,module,exports){
var wait = delay => new Promise(resolve => setTimeout(resolve, delay));
var sequence = fns => fns.reduce((p, fn) => p.then(fn), Promise.resolve());

module.exports = { wait, sequence };

},{}],72:[function(require,module,exports){
var eases = require('eases');
var rAF = require('./rAF');

module.exports = ({
    name,
    from = 0,
    to = 1,
    duration = 1000,
    easing = 'quadInOut',
    onProgress = () => {}
}) => {

    var easeFn = eases[easing];

    var d = to - from;

    var startTime = Date.now();

    var endTime = startTime + duration;

    if (name) rAF.stop(name);

    return new Promise(resolve => {

        var tick = now => {

            if (now < endTime) {

                var progress = (now - startTime) / duration;

                var eased = easeFn(progress);

                var value = from + d * eased;

                onProgress(value);
            } else {

                rAF.stop(name);

                onProgress(to);

                resolve();
            }
        };

        if (name) {
            rAF.start(name, tick);
        } else {
            name = rAF.start(tick);
        }
    });
};

},{"./rAF":70,"eases":20}],73:[function(require,module,exports){
var { clamp, lerp } = require('./math');

var vec2 = (x = 0, y = 0) => {
    var v = new Float32Array(2);
    v[0] = x;
    v[1] = y;
    return v;
};

vec2.add = (v1, v2) => vec2(v1[0] + v2[0], v1[1] + v2[1]);
vec2.sub = vec2.subtract = (v1, v2) => vec2(v1[0] - v2[0], v1[1] - v2[1]);
vec2.divide = (v1, v2) => vec2(v1[0] / v2[0], v1[1] / v2[1]);
vec2.mult = vec2.multiply = (v1, v2) => vec2(v1[0] * v2[0], v1[1] * v2[1]);
vec2.scale = ([x, y], s) => vec2(x * s, y * s);
vec2.cover = (src, dest) => Math.max(dest[0] / src[0], dest[1] / src[1]);
vec2.contain = (src, dest) => Math.min(dest[0] / src[0], dest[1] / src[1]);
vec2.ratio = v => v[1] / v[0];
vec2.clamp = (v, min, max) => vec2(clamp(v[0], min[0], max[0]), clamp(v[1], min[1], max[1]));
vec2.elementSize = el => {
    var { width, height } = el.getBoundingClientRect();
    return vec2(width, height);
};
vec2.equal = (v1, v2) => v1[0] === v2[0] && v1[1] === v2[1];
vec2.lerp = (v1, v2, t) => vec2(lerp(v1[0], v2[0], t), lerp(v1[1], v2[1], t));
vec2.copy = v => vec2(v[0], v[1]);
vec2.negate = v => vec2.scale(v, -1);

module.exports = vec2;

},{"./math":69}]},{},[65]);
