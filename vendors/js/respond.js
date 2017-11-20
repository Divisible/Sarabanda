(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.respondable = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';var _respondable=require('./respondable');module.exports=_respondable.respondable;// Export to browserify standalone bundler with module.export

},{"./respondable":2}],2:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&'function'==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};exports.findMatches=findMatches;exports.createQueryChangeHandler=createQueryChangeHandler;exports.mapMediaQueryLists=mapMediaQueryLists;exports.validateInput=validateInput;exports.destroy=destroy;exports.respondable=respondable;function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}/**
* Returns an object a list of all values associated with the instance's matching queries as well
  as the highest priority value
* @param {Object} instance
* @param {Object[]} priority
* @return {Object} matches
*/function findMatches(a,b){var c=[],_iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=a.queries[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var e=_step.value;e.matches&&c.push(e.value)}// If there are no matches, return -1, otherwise the smallest index.
}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator.return&&_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}var d=c.length?Math.min.apply(Math,_toConsumableArray(c.map(function(e){return b.indexOf(e)}))):-1;return a.onChangeCb(c,b[d]),{matches:c,priority:b[d]}}/**
 * Creates an onChange handler for resizes that change the active state of a media query.
 * Returns a function that is bound to the instance
 * @param {Function} findMatches - Same as findMatches in upper scope. Passed in for testing ease.
 * @param {Object} instance
 * @param {Object[]} priority
 * @return {Function} handler
 */// eslint-disable-next-line no-shadow
function createQueryChangeHandler(a,b,c){return function(){if(b&&Object.keys(b).length)return a(b,c)}}/**
 * Creates a MediaQueryList instance for each query passed in by the user.
 * registers listeners for each mediaquery one and associates the provided values
 * returns an array of MediaQueryLists.
 * @param {Object} values
 * @param {Function} listenerCallback - result of createQueryChangeHandler
 * @param {Object} matchMedia - Optional, easy way to mock matchMedia for testing
 * @return {Array} queries
 */function mapMediaQueryLists(a,b,c){var d=Object.keys(a);return d.map(function(e){// list is a MediaQueryList instance
var f=c(e);// Add the listener so we will be notified of future changes.
return f.addListener(b),f.value=a[e],f})}/**
 * Checks arguments for invalid input. Throw errors if needed.
 * @param {Object} queries and values
 * @param {Function} callback
 * @param {Object[]} priority - Values from first parameter in order of descending precedance
 */function validateInput(a,b,c){if(!a||'object'!=('undefined'==typeof a?'undefined':_typeof(a)))throw new Error('Respondable requires an object as its first argument.');if('function'!=typeof b)throw new Error('Respondable requires a callback function as its second argument');if('object'!=('undefined'==typeof window?'undefined':_typeof(window))||'function'!=typeof window.matchMedia)throw new Error('Respondable is dependent on window.matchMedia. Please use a polyfill if matchMedia is not supported in this browser.');if(!Array.isArray(c))throw new Error('Respondable\'s third argument must be an array, if used.');c.length&&function(){var d=Object.keys(a).map(function(f){return a[f]}),e=c.some(function(f){return(// Invalid if a priority item isn't present in breakpoints provided, or if it is repeated.
!d.includes(f)||c.indexOf(f)!==c.lastIndexOf(f))});if(e)throw new Error('The priority array\'s values didn\'t correspond to the values of the breakpoint map.')}()}/**
 * Takes in an instance object that was created inside of respondable.
 * @param {Object} instance
 */function destroy(a){if(a&&Object.keys(a).length){// Remove the listener for each MediaQueryList tied to this instance
var _iteratorNormalCompletion2=!0,_didIteratorError2=!1,_iteratorError2=void 0;try{for(var _step2,_iterator2=a.queries[Symbol.iterator]();!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=!0){var b=_step2.value;b.removeListener(a.listenerCb)}}catch(err){_didIteratorError2=!0,_iteratorError2=err}finally{try{!_iteratorNormalCompletion2&&_iterator2.return&&_iterator2.return()}finally{if(_didIteratorError2)throw _iteratorError2}}var _iteratorNormalCompletion3=!0,_didIteratorError3=!1,_iteratorError3=void 0;try{for(var _step3,_iterator3=Object.keys(a)[Symbol.iterator]();!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=!0){var _b=_step3.value;delete a[_b]}}catch(err){_didIteratorError3=!0,_iteratorError3=err}finally{try{!_iteratorNormalCompletion3&&_iterator3.return&&_iterator3.return()}finally{if(_didIteratorError3)throw _iteratorError3}}return!0}// eslint-disable-next-line no-console
return console.warn('This instance has already been destroyed.'),!1}/**
 * Entry point for respondable. Takes the map of queries/values
 * and the callback function and registers them via MapValuesToState.
 * @param {Object} queries and values
 * @param {Function} callback
 * @param {Object[]} priority - Values from first parameter in order of descending precedance
 * @return {String} instanceID
 */function respondable(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:[];validateInput(a,b,c);// Create instance
var d={};// Create a handler for matchMedia when a query's 'active' state changes
return d.listenerCb=createQueryChangeHandler(findMatches,d,c),d.onChangeCb=b,d.queries=mapMediaQueryLists(a,d.listenerCb,window.matchMedia),findMatches(d,c),function(){return destroy(d)}}

},{}]},{},[1])(1)
});
