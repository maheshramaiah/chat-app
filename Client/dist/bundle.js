/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/Avatar/style.scss":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/components/Avatar/style.scss ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".avatar {\n  border: 1px solid #8ff442;\n  border-radius: 50%;\n  font-size: 12px;\n  display: inline-block;\n  padding: 5px;\n  color: #8ff442; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/Button/style.scss":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/components/Button/style.scss ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn {\n  width: 100%;\n  text-transform: uppercase;\n  background-color: #049fd9;\n  color: #fff;\n  height: 32px;\n  font-size: 14px;\n  box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.4);\n  border-radius: 4px;\n  cursor: pointer; }\n  .btn:focus {\n    outline: none; }\n  .btn:disabled {\n    opacity: 0.5; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/ChatWindow/style.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/components/ChatWindow/style.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".chatWindow {\n  position: relative;\n  height: 100%; }\n  .chatWindow .chatsContainer {\n    margin: 10px;\n    height: calc(100% - 75px);\n    overflow: auto; }\n    .chatWindow .chatsContainer .chatList {\n      list-style-type: none;\n      padding: 0;\n      margin: 0; }\n      .chatWindow .chatsContainer .chatList .chat {\n        margin-bottom: 20px;\n        padding: 15px;\n        background: #fff;\n        border-radius: 4px; }\n        .chatWindow .chatsContainer .chatList .chat > div {\n          margin-bottom: 10px; }\n        .chatWindow .chatsContainer .chatList .chat p {\n          margin: 0; }\n        .chatWindow .chatsContainer .chatList .chat .name {\n          color: #635956;\n          font-size: 14px;\n          padding-bottom: 5px;\n          text-transform: capitalize; }\n        .chatWindow .chatsContainer .chatList .chat .timeStamp {\n          display: inline-block;\n          font-size: 12px;\n          margin-left: 15px; }\n  .chatWindow .inputContainer {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    height: 75px;\n    background: #fff;\n    padding: 15px;\n    box-sizing: border-box; }\n    .chatWindow .inputContainer input {\n      display: inline-block;\n      width: 100%;\n      height: 40px;\n      padding: 10px;\n      box-sizing: border-box;\n      border: 0;\n      font-size: 14px; }\n      .chatWindow .inputContainer input:focus {\n        outline: none; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/Input/style.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/components/Input/style.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".form-field {\n  margin-bottom: 20px; }\n  .form-field .field {\n    border: 1px solid #c6c7ca;\n    display: flex; }\n  .form-field .label {\n    text-transform: uppercase;\n    margin-bottom: 5px;\n    display: inline-block;\n    color: #7f7f86;\n    font-size: 12px; }\n  .form-field input {\n    width: 100%;\n    height: 30px;\n    padding: 5px 10px;\n    border: 0;\n    border-radius: 4px;\n    font-size: 14px; }\n    .form-field input:focus {\n      outline: none; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/LeftPanel/style.scss":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/components/LeftPanel/style.scss ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".leftPanel {\n  background-color: #024259; }\n  .leftPanel .list {\n    list-style: none;\n    padding: 0px;\n    margin: 0; }\n    .leftPanel .list > li {\n      padding: 10px;\n      color: #fff;\n      border-bottom: 1px solid #fff;\n      cursor: pointer; }\n      .leftPanel .list > li.selected {\n        background-color: #bb8; }\n      .leftPanel .list > li:hover {\n        opacity: 0.5; }\n      .leftPanel .list > li div {\n        display: inline-block; }\n      .leftPanel .list > li .name {\n        display: inline-block;\n        margin-left: 10px; }\n      .leftPanel .list > li .status {\n        width: 10px;\n        height: 10px;\n        border-radius: 100%;\n        background-color: #fff;\n        margin-left: 20px; }\n  .leftPanel .notifyChat {\n    animation: notifyChat 1s infinite; }\n\n@keyframes notifyChat {\n  0% {\n    background-color: none; }\n  100% {\n    background-color: #ea2525; } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/Loader/style.scss":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/components/Loader/style.scss ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".loader-body {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  background: rgba(255, 255, 255, 0.5); }\n  .loader-body .loader {\n    background: url(" + escape(__webpack_require__(/*! ../../assets/loader.svg */ "./src/assets/loader.svg")) + ");\n    width: 75px;\n    height: 75px;\n    background-size: 100%;\n    position: absolute;\n    top: calc(50% - 37.5px);\n    left: calc(50% - 37.5px); }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/redux/auth/app.scss":
/*!****************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/redux/auth/app.scss ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".auth-container {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: linear-gradient(135.18deg, rgba(4, 159, 217, 0.9) 0%, rgba(13, 142, 201, 0.9) 22.9%, rgba(43, 85, 146, 0.9) 100%); }\n  .auth-container .section-body {\n    width: 480px;\n    background: #fff;\n    border-radius: 4px;\n    margin: 0 auto;\n    margin-top: 100px;\n    padding: 30px;\n    box-sizing: border-box;\n    position: relative; }\n    .auth-container .section-body .error {\n      font-size: 12px;\n      text-align: center;\n      color: #ef0909;\n      margin-bottom: 10px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/style.scss":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/style.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Lato';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Lato Regular\"), local(\"Lato-Regular\"), url(" + escape(__webpack_require__(/*! ./assets/fonts/Lato-Regular.woff */ "./src/assets/fonts/Lato-Regular.woff")) + ") format(\"woff\"); }\n\nbody {\n  font-family: 'Lato';\n  margin: 0; }\n\n.clearfix:after {\n  content: \" \";\n  visibility: hidden;\n  display: block;\n  height: 0;\n  clear: both; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _app = __webpack_require__(/*! ./redux/auth/app */ "./src/redux/auth/app.js");

var _app2 = _interopRequireDefault(_app);

var _storage = __webpack_require__(/*! ./utils/storage */ "./src/utils/storage.js");

var _storage2 = _interopRequireDefault(_storage);

__webpack_require__(/*! ./style.scss */ "./src/style.scss");

var _loadAsyncComp = __webpack_require__(/*! ./loadAsyncComp */ "./src/loadAsyncComp.js");

var _loadAsyncComp2 = _interopRequireDefault(_loadAsyncComp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isLoggedIn() {
	return _storage2.default.get('userInfo') != null;
}

var Dashboard = (0, _loadAsyncComp2.default)(function () {
	return Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e(0)]).then(__webpack_require__.t.bind(null, /*! ./redux/dashboard/app */ "./src/redux/dashboard/app.js", 7)).then(function (module) {
		return module.default;
	});
});

var ProtectedRoutes = function ProtectedRoutes(_ref) {
	var path = _ref.path,
	    Component = _ref.component;

	return _react2.default.createElement(_reactRouterDom.Route, { path: path, render: function render() {
			return isLoggedIn() ? _react2.default.createElement(Component, null) : _react2.default.createElement(_reactRouterDom.Redirect, { to: '/auth' });
		} });
};

var App = function App(_ref2) {
	var store = _ref2.store;

	return _react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(
			_reactRouterDom.BrowserRouter,
			null,
			_react2.default.createElement(
				_reactRouterDom.Switch,
				null,
				_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', render: function render() {
						return _react2.default.createElement(_reactRouterDom.Redirect, { to: { pathname: '/auth' } });
					} }),
				_react2.default.createElement(_reactRouterDom.Route, { path: '/auth', component: _app2.default }),
				_react2.default.createElement(ProtectedRoutes, { path: '/dashboard', component: Dashboard })
			)
		)
	);
};

exports.default = App;

/***/ }),

/***/ "./src/assets/fonts/Lato-Regular.woff":
/*!********************************************!*\
  !*** ./src/assets/fonts/Lato-Regular.woff ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f137ee4862785a1518fb3056eccdc99b.woff";

/***/ }),

/***/ "./src/assets/loader.svg":
/*!*******************************!*\
  !*** ./src/assets/loader.svg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fa4590160c59959f9ccf14ecf22aca81.svg";

/***/ }),

/***/ "./src/components/Avatar/index.js":
/*!****************************************!*\
  !*** ./src/components/Avatar/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./style.scss */ "./src/components/Avatar/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = function Avatar(props) {
    var name = props.name;


    return _react2.default.createElement(
        'span',
        { className: 'avatar' },
        name.split(' ').map(function (a) {
            return a.charAt(0);
        }).join('').toUpperCase()
    );
};

exports.default = Avatar;

/***/ }),

/***/ "./src/components/Avatar/style.scss":
/*!******************************************!*\
  !*** ./src/components/Avatar/style.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/Avatar/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Button/index.js":
/*!****************************************!*\
  !*** ./src/components/Button/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./style.scss */ "./src/components/Button/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(props) {
    var text = props.text,
        onClick = props.onClick,
        disabled = props.disabled;


    function onBtnClick(e) {
        e.preventDefault();
        onClick();
    }

    return _react2.default.createElement(
        'button',
        { className: 'btn', onClick: onBtnClick, disabled: disabled },
        text
    );
};

exports.default = Button;

/***/ }),

/***/ "./src/components/Button/style.scss":
/*!******************************************!*\
  !*** ./src/components/Button/style.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/Button/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/ChatWindow/index.js":
/*!********************************************!*\
  !*** ./src/components/ChatWindow/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

__webpack_require__(/*! ./style.scss */ "./src/components/ChatWindow/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatWindow = function ChatWindow(props) {
    var chats = props.chats,
        user = props.user,
        onMessageChange = props.onMessageChange,
        _props$message = props.message,
        message = _props$message === undefined ? '' : _props$message,
        sendMessage = props.sendMessage;

    var placeholder = 'Write a message to ' + user.userName;

    function onKeyDown(e) {
        if (e.keyCode === 13) {
            sendMessage();
        }
    }

    return _react2.default.createElement(
        'div',
        { className: 'chatWindow' },
        _react2.default.createElement(
            'div',
            { className: 'chatsContainer' },
            _react2.default.createElement(
                'ul',
                { className: 'chatList' },
                chats.map(function (chat, index) {
                    var fromUserId = chat.fromUserId,
                        msg = chat.msg,
                        date = chat.date;

                    var formattedDate = (0, _moment2.default)(date).format('lll');

                    return _react2.default.createElement(
                        'li',
                        { key: index, className: 'chat' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'name' },
                                fromUserId !== user.id ? 'You' : user.userName
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'timeStamp' },
                                formattedDate
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'msg' },
                            msg
                        )
                    );
                })
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'inputContainer' },
            _react2.default.createElement('input', {
                type: 'text',
                placeholder: placeholder,
                value: message,
                autoFocus: true,
                onChange: function onChange(e) {
                    return onMessageChange(e.target.value);
                },
                onKeyDown: onKeyDown })
        )
    );
};

exports.default = ChatWindow;

/***/ }),

/***/ "./src/components/ChatWindow/style.scss":
/*!**********************************************!*\
  !*** ./src/components/ChatWindow/style.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/ChatWindow/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Input/index.js":
/*!***************************************!*\
  !*** ./src/components/Input/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./style.scss */ "./src/components/Input/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = function Input(props) {
    var type = props.type,
        value = props.value,
        label = props.label,
        _onChange = props.onChange;

    return _react2.default.createElement(
        'div',
        { className: 'form-field' },
        _react2.default.createElement(
            'label',
            { className: 'label' },
            label
        ),
        _react2.default.createElement(
            'div',
            { className: 'field' },
            _react2.default.createElement('input', { type: type, onChange: function onChange(e) {
                    return _onChange(e.target.value);
                }, value: value })
        )
    );
};

exports.default = Input;

/***/ }),

/***/ "./src/components/Input/style.scss":
/*!*****************************************!*\
  !*** ./src/components/Input/style.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/Input/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/LeftPanel/index.js":
/*!*******************************************!*\
  !*** ./src/components/LeftPanel/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./style.scss */ "./src/components/LeftPanel/style.scss");

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _Avatar = __webpack_require__(/*! ../Avatar */ "./src/components/Avatar/index.js");

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftPanel = function LeftPanel(props) {
    var users = props.users,
        selectedUser = props.selectedUser,
        chatUserSelectionChange = props.chatUserSelectionChange,
        notifyIncomingChatUserId = props.notifyIncomingChatUserId;


    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'ul',
            { className: 'list' },
            users.map(function (user, index) {
                var color = user.active ? 'yellow' : 'red';
                var cssClassNames = (0, _classnames2.default)('item', {
                    selected: selectedUser && selectedUser.id === user.id,
                    notifyChat: user.id === notifyIncomingChatUserId
                });

                return _react2.default.createElement(
                    'li',
                    { key: index, className: cssClassNames, onClick: function onClick() {
                            return chatUserSelectionChange(user);
                        } },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_Avatar2.default, { name: user.userName }),
                        _react2.default.createElement(
                            'span',
                            { className: 'name' },
                            user.userName
                        )
                    ),
                    _react2.default.createElement('div', { className: 'status', style: { backgroundColor: color } })
                );
            })
        )
    );
};

exports.default = LeftPanel;

/***/ }),

/***/ "./src/components/LeftPanel/style.scss":
/*!*********************************************!*\
  !*** ./src/components/LeftPanel/style.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/LeftPanel/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Loader/index.js":
/*!****************************************!*\
  !*** ./src/components/Loader/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./style.scss */ "./src/components/Loader/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function Loader(props) {
    return _react2.default.createElement(
        'div',
        { className: 'loader-body' },
        _react2.default.createElement('div', { className: 'loader' })
    );
};

exports.default = Loader;

/***/ }),

/***/ "./src/components/Loader/style.scss":
/*!******************************************!*\
  !*** ./src/components/Loader/style.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/components/Loader/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/all.js":
/*!*******************************!*\
  !*** ./src/components/all.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Loader = exports.ChatWindow = exports.LeftPanel = exports.Button = exports.Input = undefined;

var _Input = __webpack_require__(/*! ./Input */ "./src/components/Input/index.js");

var _Input2 = _interopRequireDefault(_Input);

var _Button = __webpack_require__(/*! ./Button */ "./src/components/Button/index.js");

var _Button2 = _interopRequireDefault(_Button);

var _LeftPanel = __webpack_require__(/*! ./LeftPanel */ "./src/components/LeftPanel/index.js");

var _LeftPanel2 = _interopRequireDefault(_LeftPanel);

var _ChatWindow = __webpack_require__(/*! ./ChatWindow */ "./src/components/ChatWindow/index.js");

var _ChatWindow2 = _interopRequireDefault(_ChatWindow);

var _Loader = __webpack_require__(/*! ./Loader */ "./src/components/Loader/index.js");

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Input = _Input2.default;
exports.Button = _Button2.default;
exports.LeftPanel = _LeftPanel2.default;
exports.ChatWindow = _ChatWindow2.default;
exports.Loader = _Loader2.default;

/***/ }),

/***/ "./src/configureStore.js":
/*!*******************************!*\
  !*** ./src/configureStore.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureStore;

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _reduxThunk = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _rootReducer = __webpack_require__(/*! ./redux/rootReducer */ "./src/redux/rootReducer.js");

var _rootReducer2 = _interopRequireDefault(_rootReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore() {
    return (0, _redux.createStore)(_rootReducer2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default, _reduxLogger2.default));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(/*! ./App */ "./src/App.js");

var _App2 = _interopRequireDefault(_App);

var _configureStore = __webpack_require__(/*! ./configureStore */ "./src/configureStore.js");

var _configureStore2 = _interopRequireDefault(_configureStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _configureStore2.default)();

_reactDom2.default.render(_react2.default.createElement(_App2.default, { store: store }), document.getElementById('app'));

/***/ }),

/***/ "./src/loadAsyncComp.js":
/*!******************************!*\
  !*** ./src/loadAsyncComp.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = loadAsyncComponent;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadAsyncComponent(getComp) {
	return function (_React$Component) {
		(0, _inherits3.default)(_class, _React$Component);

		function _class(props) {
			(0, _classCallCheck3.default)(this, _class);

			var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

			_this.state = {
				Component: null
			};
			return _this;
		}

		(0, _createClass3.default)(_class, [{
			key: 'componentWillMount',
			value: function () {
				var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
					var module;
					return _regenerator2.default.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.prev = 0;
									_context.next = 3;
									return getComp();

								case 3:
									module = _context.sent;


									this.setState({
										Component: module
									});
									_context.next = 10;
									break;

								case 7:
									_context.prev = 7;
									_context.t0 = _context['catch'](0);

									console.log('Error loading component: ' + _context.t0);

								case 10:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this, [[0, 7]]);
				}));

				function componentWillMount() {
					return _ref.apply(this, arguments);
				}

				return componentWillMount;
			}()
		}, {
			key: 'render',
			value: function render() {
				var Component = this.state.Component;


				if (Component) {
					return _react2.default.createElement(Component, this.props);
				}

				return null;
			}
		}]);
		return _class;
	}(_react2.default.Component);
}

/***/ }),

/***/ "./src/redux/auth/app.js":
/*!*******************************!*\
  !*** ./src/redux/auth/app.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

__webpack_require__(/*! ./app.scss */ "./src/redux/auth/app.scss");

var _app = __webpack_require__(/*! ./login/app */ "./src/redux/auth/login/app.js");

var _app2 = _interopRequireDefault(_app);

var _app3 = __webpack_require__(/*! ./register/app */ "./src/redux/auth/register/app.js");

var _app4 = _interopRequireDefault(_app3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auth = function Auth(_ref) {
    var match = _ref.match;

    return _react2.default.createElement(
        'div',
        { className: 'auth-container' },
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: match.path + '/', render: function render() {
                return _react2.default.createElement(_reactRouterDom.Redirect, { to: { pathname: match.path + '/login' } });
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: match.path + '/login', component: _app2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: match.path + '/register', component: _app4.default })
    );
};

exports.default = Auth;

/***/ }),

/***/ "./src/redux/auth/app.scss":
/*!*********************************!*\
  !*** ./src/redux/auth/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./app.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/redux/auth/app.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/redux/auth/login/actionCreator.js":
/*!***********************************************!*\
  !*** ./src/redux/auth/login/actionCreator.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actionTypes = __webpack_require__(/*! ./actionTypes */ "./src/redux/auth/login/actionTypes.js");

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    onFieldTextChange: function onFieldTextChange(key, val) {
        return {
            type: types.ON_LOGIN_FIELD_TEXT_CHANGE,
            key: key,
            val: val
        };
    },
    onLogin: function onLogin() {
        return {
            type: types.ON_LOGIN
        };
    },
    setLoginApiStatus: function setLoginApiStatus(res) {
        return {
            type: types.SET_LOGIN_API_STATUS,
            res: res
        };
    }
};

/***/ }),

/***/ "./src/redux/auth/login/actionTypes.js":
/*!*********************************************!*\
  !*** ./src/redux/auth/login/actionTypes.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ON_LOGIN_FIELD_TEXT_CHANGE = exports.ON_LOGIN_FIELD_TEXT_CHANGE = 'ON_LOGIN_FIELD_TEXT_CHANGE';
var ON_LOGIN = exports.ON_LOGIN = 'ON_LOGIN';
var SET_LOGIN_API_STATUS = exports.SET_LOGIN_API_STATUS = 'SET_LOGIN_API_STATUS';

/***/ }),

/***/ "./src/redux/auth/login/apiActions.js":
/*!********************************************!*\
  !*** ./src/redux/auth/login/apiActions.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.login = login;

var _actionCreator = __webpack_require__(/*! ./actionCreator */ "./src/redux/auth/login/actionCreator.js");

var _actionCreator2 = _interopRequireDefault(_actionCreator);

var _ajaxUtils = __webpack_require__(/*! ../../../utils/ajaxUtils */ "./src/utils/ajaxUtils.js");

var _ajaxUtils2 = _interopRequireDefault(_ajaxUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function login(data) {
    var _this = this;

    return function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
            var res;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch(_actionCreator2.default.onLogin());
                            _context.next = 3;
                            return _ajaxUtils2.default.fetch('/api/login', 'POST', data);

                        case 3:
                            res = _context.sent;

                            dispatch(_actionCreator2.default.setLoginApiStatus(res));

                            return _context.abrupt('return', res);

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
}

/***/ }),

/***/ "./src/redux/auth/login/app.js":
/*!*************************************!*\
  !*** ./src/redux/auth/login/app.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _actionCreator = __webpack_require__(/*! ./actionCreator */ "./src/redux/auth/login/actionCreator.js");

var _actionCreator2 = _interopRequireDefault(_actionCreator);

var _apiActions = __webpack_require__(/*! ./apiActions */ "./src/redux/auth/login/apiActions.js");

var apiActions = _interopRequireWildcard(_apiActions);

var _selector = __webpack_require__(/*! ./selector */ "./src/redux/auth/login/selector.js");

var selectors = _interopRequireWildcard(_selector);

var _all = __webpack_require__(/*! ../../../components/all */ "./src/components/all.js");

var _storage = __webpack_require__(/*! ../../../utils/storage */ "./src/utils/storage.js");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_React$Component) {
    (0, _inherits3.default)(App, _React$Component);

    function App(props) {
        (0, _classCallCheck3.default)(this, App);

        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.onLoginBtnClick = _this.onLoginBtnClick.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(App, [{
        key: 'onFieldInputChange',
        value: function onFieldInputChange(key, val) {
            this.props.actions.onFieldTextChange(key, val);
        }
    }, {
        key: 'onLoginBtnClick',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var props, res;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                props = this.props;
                                _context.next = 3;
                                return props.apiActions.login(props.formFields);

                            case 3:
                                res = _context.sent;


                                if (res.success) {
                                    _storage2.default.save('userInfo', res.user);
                                    this.navigate();
                                }

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onLoginBtnClick() {
                return _ref.apply(this, arguments);
            }

            return onLoginBtnClick;
        }()
    }, {
        key: 'navigate',
        value: function navigate() {
            var props = this.props;

            props.history.push('/dashboard');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                _props$formFields = _props.formFields,
                email = _props$formFields.email,
                password = _props$formFields.password,
                showLoader = _props.showLoader,
                loginStatus = _props.loginStatus;

            var disableBtn = email === '' || password === '';
            var _loginStatus$err = loginStatus.err,
                err = _loginStatus$err === undefined ? '' : _loginStatus$err;


            return _react2.default.createElement(
                'div',
                { className: 'section-body' },
                _react2.default.createElement(
                    'form',
                    null,
                    _react2.default.createElement(_all.Input, { type: 'text', label: 'email', value: email, onChange: function onChange(val) {
                            return _this2.onFieldInputChange('email', val);
                        } }),
                    _react2.default.createElement(_all.Input, { type: 'password', label: 'password', value: password, onChange: function onChange(val) {
                            return _this2.onFieldInputChange('password', val);
                        } }),
                    err && _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        err
                    ),
                    _react2.default.createElement(_all.Button, { text: 'login', onClick: this.onLoginBtnClick, disabled: disableBtn })
                ),
                showLoader && _react2.default.createElement(_all.Loader, null)
            );
        }
    }]);
    return App;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        formFields: selectors.getFormFields(state),
        showLoader: selectors.getLoaderFlag(state),
        loginStatus: selectors.getLoginStatus(state)
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_actionCreator2.default, dispatch),
        apiActions: (0, _redux.bindActionCreators)(apiActions, dispatch)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

/***/ }),

/***/ "./src/redux/auth/login/reducer.js":
/*!*****************************************!*\
  !*** ./src/redux/auth/login/reducer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends4 = _interopRequireDefault(_extends3);

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case types.ON_LOGIN_FIELD_TEXT_CHANGE:
            {
                var key = action.key,
                    val = action.val;


                return (0, _extends4.default)({}, state, {
                    form: (0, _extends4.default)({}, state.form, (0, _defineProperty3.default)({}, key, val))
                });
            }

        case types.ON_LOGIN:
            {
                return (0, _extends4.default)({}, state, { showLoader: true, loginStatus: {} });
            }

        case types.SET_LOGIN_API_STATUS:
            {
                return (0, _extends4.default)({}, state, { showLoader: false, loginStatus: action.res });
            }

        default:
            return state;
    }
};

var _actionTypes = __webpack_require__(/*! ./actionTypes */ "./src/redux/auth/login/actionTypes.js");

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    form: {
        email: '',
        password: ''
    },
    showLoader: false,
    loginStatus: {}
};

/***/ }),

/***/ "./src/redux/auth/login/selector.js":
/*!******************************************!*\
  !*** ./src/redux/auth/login/selector.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLoginStatus = exports.getLoaderFlag = exports.getFormFields = undefined;

var _reselect = __webpack_require__(/*! reselect */ "./node_modules/reselect/lib/index.js");

var loginFields = function loginFields(state) {
    return state.auth.login.form;
};
var showLoaderFlag = function showLoaderFlag(state) {
    return state.auth.login.showLoader;
};
var loginStatus = function loginStatus(state) {
    return state.auth.login.loginStatus;
};

var getFormFields = exports.getFormFields = (0, _reselect.createSelector)([loginFields], function (fields) {
    return fields;
});

var getLoaderFlag = exports.getLoaderFlag = (0, _reselect.createSelector)([showLoaderFlag], function (showLoaderFlag) {
    return showLoaderFlag;
});

var getLoginStatus = exports.getLoginStatus = (0, _reselect.createSelector)([loginStatus], function (loginStatus) {
    return loginStatus;
});

/***/ }),

/***/ "./src/redux/auth/reducer.js":
/*!***********************************!*\
  !*** ./src/redux/auth/reducer.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _reducer = __webpack_require__(/*! ./login/reducer */ "./src/redux/auth/login/reducer.js");

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = __webpack_require__(/*! ./register/reducer */ "./src/redux/auth/register/reducer.js");

var _reducer4 = _interopRequireDefault(_reducer3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    login: _reducer2.default,
    register: _reducer4.default
});

exports.default = rootReducer;

/***/ }),

/***/ "./src/redux/auth/register/actionCreator.js":
/*!**************************************************!*\
  !*** ./src/redux/auth/register/actionCreator.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actionTypes = __webpack_require__(/*! ./actionTypes */ "./src/redux/auth/register/actionTypes.js");

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    onFieldTextChange: function onFieldTextChange(key, val) {
        return {
            type: types.ON_REGISTER_FIELD_TEXT_CHANGE,
            key: key,
            val: val
        };
    },
    onRegister: function onRegister() {
        return {
            type: types.ON_REGISTER
        };
    },
    setRegisterApiStatus: function setRegisterApiStatus(res) {
        return {
            type: types.SET_REGISTER_API_STATUS,
            res: res
        };
    }
};

/***/ }),

/***/ "./src/redux/auth/register/actionTypes.js":
/*!************************************************!*\
  !*** ./src/redux/auth/register/actionTypes.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ON_REGISTER_FIELD_TEXT_CHANGE = exports.ON_REGISTER_FIELD_TEXT_CHANGE = 'ON_REGISTER_FIELD_TEXT_CHANGE';
var ON_REGISTER = exports.ON_REGISTER = 'ON_REGISTER';
var SET_REGISTER_API_STATUS = exports.SET_REGISTER_API_STATUS = 'SET_REGISTER_API_STATUS';

/***/ }),

/***/ "./src/redux/auth/register/apiActions.js":
/*!***********************************************!*\
  !*** ./src/redux/auth/register/apiActions.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.register = register;

var _actionCreator = __webpack_require__(/*! ./actionCreator */ "./src/redux/auth/register/actionCreator.js");

var _actionCreator2 = _interopRequireDefault(_actionCreator);

var _ajaxUtils = __webpack_require__(/*! ../../../utils/ajaxUtils */ "./src/utils/ajaxUtils.js");

var _ajaxUtils2 = _interopRequireDefault(_ajaxUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function register(data) {
    var _this = this;

    return function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
            var res;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch(_actionCreator2.default.onRegister());
                            _context.next = 3;
                            return _ajaxUtils2.default.fetch('/api/register', 'POST', data);

                        case 3:
                            res = _context.sent;

                            dispatch(_actionCreator2.default.setRegisterApiStatus(res));

                            return _context.abrupt('return', res);

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
}

/***/ }),

/***/ "./src/redux/auth/register/app.js":
/*!****************************************!*\
  !*** ./src/redux/auth/register/app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _actionCreator = __webpack_require__(/*! ./actionCreator */ "./src/redux/auth/register/actionCreator.js");

var _actionCreator2 = _interopRequireDefault(_actionCreator);

var _apiActions = __webpack_require__(/*! ./apiActions */ "./src/redux/auth/register/apiActions.js");

var apiActions = _interopRequireWildcard(_apiActions);

var _selector = __webpack_require__(/*! ./selector */ "./src/redux/auth/register/selector.js");

var selectors = _interopRequireWildcard(_selector);

var _all = __webpack_require__(/*! ../../../components/all.js */ "./src/components/all.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_React$Component) {
    (0, _inherits3.default)(App, _React$Component);

    function App(props) {
        (0, _classCallCheck3.default)(this, App);

        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.onRegisterBtnClick = _this.onRegisterBtnClick.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(App, [{
        key: 'onFieldInputChange',
        value: function onFieldInputChange(key, val) {
            this.props.actions.onFieldTextChange(key, val);
        }
    }, {
        key: 'onRegisterBtnClick',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var props, res;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                props = this.props;
                                _context.next = 3;
                                return props.apiActions.register(props.formFields);

                            case 3:
                                res = _context.sent;


                                if (res.success) {
                                    this.navigate();
                                }

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onRegisterBtnClick() {
                return _ref.apply(this, arguments);
            }

            return onRegisterBtnClick;
        }()
    }, {
        key: 'navigate',
        value: function navigate() {
            var props = this.props;

            props.history.push('/auth/login');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                _props$formFields = _props.formFields,
                email = _props$formFields.email,
                firstName = _props$formFields.firstName,
                lastName = _props$formFields.lastName,
                password = _props$formFields.password,
                showLoader = _props.showLoader,
                registerStatus = _props.registerStatus;

            var disableBtn = email === '' || firstName === '' || lastName === '' || password === '';
            var _registerStatus$err = registerStatus.err,
                err = _registerStatus$err === undefined ? '' : _registerStatus$err;


            return _react2.default.createElement(
                'div',
                { className: 'section-body' },
                _react2.default.createElement(
                    'form',
                    null,
                    _react2.default.createElement(_all.Input, { type: 'text', label: 'email', value: email, onChange: function onChange(val) {
                            return _this2.onFieldInputChange('email', val);
                        } }),
                    _react2.default.createElement(_all.Input, { type: 'text', label: 'first name', value: firstName, onChange: function onChange(val) {
                            return _this2.onFieldInputChange('firstName', val);
                        } }),
                    _react2.default.createElement(_all.Input, { type: 'text', label: 'last name', value: lastName, onChange: function onChange(val) {
                            return _this2.onFieldInputChange('lastName', val);
                        } }),
                    _react2.default.createElement(_all.Input, { type: 'password', label: 'password', value: password, onChange: function onChange(val) {
                            return _this2.onFieldInputChange('password', val);
                        } }),
                    err && _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        err
                    ),
                    _react2.default.createElement(_all.Button, { text: 'register', onClick: this.onRegisterBtnClick, disabled: disableBtn })
                ),
                showLoader && _react2.default.createElement(_all.Loader, null)
            );
        }
    }]);
    return App;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        formFields: selectors.getFormFields(state),
        showLoader: selectors.getLoaderFlag(state),
        registerStatus: selectors.getRegisterStatus(state)
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_actionCreator2.default, dispatch),
        apiActions: (0, _redux.bindActionCreators)(apiActions, dispatch)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

/***/ }),

/***/ "./src/redux/auth/register/reducer.js":
/*!********************************************!*\
  !*** ./src/redux/auth/register/reducer.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends4 = _interopRequireDefault(_extends3);

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case types.ON_REGISTER_FIELD_TEXT_CHANGE:
            {
                var key = action.key,
                    val = action.val;


                return (0, _extends4.default)({}, state, {
                    form: (0, _extends4.default)({}, state.form, (0, _defineProperty3.default)({}, key, val))
                });
            }

        case types.ON_REGISTER:
            {
                return (0, _extends4.default)({}, state, { showLoader: true, registerStatus: {} });
            }

        case types.SET_REGISTER_API_STATUS:
            {
                return (0, _extends4.default)({}, state, { showLoader: false, registerStatus: action.res });
            }

        default:
            return state;
    }
};

var _actionTypes = __webpack_require__(/*! ./actionTypes */ "./src/redux/auth/register/actionTypes.js");

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    form: {
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    },
    showLoader: false,
    registerStatus: {}
};

/***/ }),

/***/ "./src/redux/auth/register/selector.js":
/*!*********************************************!*\
  !*** ./src/redux/auth/register/selector.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRegisterStatus = exports.getLoaderFlag = exports.getFormFields = undefined;

var _reselect = __webpack_require__(/*! reselect */ "./node_modules/reselect/lib/index.js");

var registerFields = function registerFields(state) {
    return state.auth.register.form;
};
var showLoaderFlag = function showLoaderFlag(state) {
    return state.auth.register.showLoader;
};
var registerStatus = function registerStatus(state) {
    return state.auth.register.registerStatus;
};

var getFormFields = exports.getFormFields = (0, _reselect.createSelector)([registerFields], function (fields) {
    return fields;
});

var getLoaderFlag = exports.getLoaderFlag = (0, _reselect.createSelector)([showLoaderFlag], function (showLoaderFlag) {
    return showLoaderFlag;
});

var getRegisterStatus = exports.getRegisterStatus = (0, _reselect.createSelector)([registerStatus], function (registerStatus) {
    return registerStatus;
});

/***/ }),

/***/ "./src/redux/dashboard/actionTypes.js":
/*!********************************************!*\
  !*** ./src/redux/dashboard/actionTypes.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var UPDATE_USERS_LIST = exports.UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';
var CHAT_USER_SELECTION_CHANGE = exports.CHAT_USER_SELECTION_CHANGE = 'CHAT_USER_SELECTION_CHANGE';
var ON_MESSAGE_CHANGE = exports.ON_MESSAGE_CHANGE = 'ON_MESSAGE_CHANGE';
var SAVE_MESSAGE = exports.SAVE_MESSAGE = 'SAVE_MESSAGE';
var NOTIFY_INCOMING_CHAT = exports.NOTIFY_INCOMING_CHAT = 'NOTIFY_INCOMING_CHAT';

/***/ }),

/***/ "./src/redux/dashboard/reducer.js":
/*!****************************************!*\
  !*** ./src/redux/dashboard/reducer.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends4 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends5 = _interopRequireDefault(_extends4);

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case types.UPDATE_USERS_LIST:
            {
                return (0, _extends5.default)({}, state, {
                    users: action.users,
                    loading: false
                });
            }
        case types.CHAT_USER_SELECTION_CHANGE:
            {
                var user = action.user;


                return (0, _extends5.default)({}, state, {
                    selectedUser: user,
                    message: ''
                }, state.notifyIncomingChatUserId && state.notifyIncomingChatUserId === user.id ? { notifyIncomingChatUserId: null } : {});
            }
        case types.ON_MESSAGE_CHANGE:
            {
                var message = action.message;


                return (0, _extends5.default)({}, state, {
                    message: message
                });
            }
        case types.SAVE_MESSAGE:
            {
                var id = action.id,
                    chatParams = action.chatParams;
                var chatId = chatParams.chatId,
                    msg = chatParams.msg;
                var chats = state.chats,
                    chatIds = state.chatIds;

                var userChat = chats[chatId] || {};

                return (0, _extends5.default)({}, state, {
                    chats: (0, _extends5.default)({}, chats, (0, _defineProperty3.default)({}, chatId, (0, _extends5.default)({}, userChat, {
                        chats: [].concat((0, _toConsumableArray3.default)(userChat.chats || []), [chatParams])
                    }))),
                    chatIds: (0, _extends5.default)({}, chatIds, (0, _defineProperty3.default)({}, id, chatId)),
                    message: ''
                });
            }
        case types.NOTIFY_INCOMING_CHAT:
            {
                return (0, _extends5.default)({}, state, {
                    notifyIncomingChatUserId: action.userId
                });
            }
        default:
            return state;
    }
};

var _actionTypes = __webpack_require__(/*! ./actionTypes */ "./src/redux/dashboard/actionTypes.js");

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    users: [],
    selectedUser: null,
    message: '',
    chats: {},
    chatIds: {},
    notifyIncomingChatUserId: null,
    loading: true
};

function generateChatUniqueId(fromId, toId) {
    return fromId + '-' + toId;
}

/***/ }),

/***/ "./src/redux/rootReducer.js":
/*!**********************************!*\
  !*** ./src/redux/rootReducer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _reducer = __webpack_require__(/*! ./auth/reducer */ "./src/redux/auth/reducer.js");

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = __webpack_require__(/*! ./dashboard/reducer */ "./src/redux/dashboard/reducer.js");

var _reducer4 = _interopRequireDefault(_reducer3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    auth: _reducer2.default,
    dashboard: _reducer4.default
});

exports.default = rootReducer;

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/utils/ajaxUtils.js":
/*!********************************!*\
  !*** ./src/utils/ajaxUtils.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AjaxUtils = function () {
    function AjaxUtils() {
        (0, _classCallCheck3.default)(this, AjaxUtils);
    }

    (0, _createClass3.default)(AjaxUtils, [{
        key: 'fetch',
        value: function (_fetch) {
            function fetch(_x, _x2, _x3) {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, method, data) {
                var config, response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                config = {
                                    method: method,
                                    body: JSON.stringify(data),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                };
                                _context.next = 3;
                                return fetch(url, config);

                            case 3:
                                response = _context.sent;
                                _context.next = 6;
                                return response.json();

                            case 6:
                                return _context.abrupt('return', _context.sent);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            return function (_x4, _x5, _x6) {
                return _ref.apply(this, arguments);
            };
        }())
    }]);
    return AjaxUtils;
}();

exports.default = new AjaxUtils();

/***/ }),

/***/ "./src/utils/storage.js":
/*!******************************!*\
  !*** ./src/utils/storage.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Storage = function () {
    function Storage() {
        (0, _classCallCheck3.default)(this, Storage);
    }

    (0, _createClass3.default)(Storage, [{
        key: "save",
        value: function save(key, value) {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        }
    }, {
        key: "get",
        value: function get(key) {
            var value = window.sessionStorage.getItem(key);

            return JSON.parse(value);
        }
    }]);
    return Storage;
}();

exports.default = new Storage();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXZhdGFyL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2hhdFdpbmRvdy9zdHlsZS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0lucHV0L3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTGVmdFBhbmVsL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTG9hZGVyL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4L2F1dGgvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9MYXRvLVJlZ3VsYXIud29mZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2xvYWRlci5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXZhdGFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0F2YXRhci9zdHlsZS5zY3NzP2FlOWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbi9zdHlsZS5zY3NzPzQzODAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2hhdFdpbmRvdy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DaGF0V2luZG93L3N0eWxlLnNjc3M/NTVjZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbnB1dC9zdHlsZS5zY3NzP2MzMTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTGVmdFBhbmVsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xlZnRQYW5lbC9zdHlsZS5zY3NzP2E4NmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTG9hZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xvYWRlci9zdHlsZS5zY3NzPzYyZDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYWxsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWd1cmVTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvYWRBc3luY0NvbXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4L2F1dGgvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eC9hdXRoL2FwcC5zY3NzP2FhODQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4L2F1dGgvbG9naW4vYWN0aW9uQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXgvYXV0aC9sb2dpbi9hY3Rpb25UeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXgvYXV0aC9sb2dpbi9hcGlBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eC9hdXRoL2xvZ2luL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXgvYXV0aC9sb2dpbi9yZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eC9hdXRoL2xvZ2luL3NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eC9hdXRoL3JlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4L2F1dGgvcmVnaXN0ZXIvYWN0aW9uQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXgvYXV0aC9yZWdpc3Rlci9hY3Rpb25UeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXgvYXV0aC9yZWdpc3Rlci9hcGlBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eC9hdXRoL3JlZ2lzdGVyL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXgvYXV0aC9yZWdpc3Rlci9yZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eC9hdXRoL3JlZ2lzdGVyL3NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eC9kYXNoYm9hcmQvYWN0aW9uVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4L2Rhc2hib2FyZC9yZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eC9yb290UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuc2Nzcz9jMWMzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9hamF4VXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3N0b3JhZ2UuanMiXSwibmFtZXMiOlsiaXNMb2dnZWRJbiIsIlN0b3JhZ2UiLCJnZXQiLCJEYXNoYm9hcmQiLCJ0aGVuIiwibW9kdWxlIiwiZGVmYXVsdCIsIlByb3RlY3RlZFJvdXRlcyIsInBhdGgiLCJDb21wb25lbnQiLCJjb21wb25lbnQiLCJBcHAiLCJzdG9yZSIsInBhdGhuYW1lIiwiQXV0aCIsIkF2YXRhciIsInByb3BzIiwibmFtZSIsInNwbGl0IiwibWFwIiwiYSIsImNoYXJBdCIsImpvaW4iLCJ0b1VwcGVyQ2FzZSIsIkJ1dHRvbiIsInRleHQiLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJvbkJ0bkNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwiQ2hhdFdpbmRvdyIsImNoYXRzIiwidXNlciIsIm9uTWVzc2FnZUNoYW5nZSIsIm1lc3NhZ2UiLCJzZW5kTWVzc2FnZSIsInBsYWNlaG9sZGVyIiwidXNlck5hbWUiLCJvbktleURvd24iLCJrZXlDb2RlIiwiY2hhdCIsImluZGV4IiwiZnJvbVVzZXJJZCIsIm1zZyIsImRhdGUiLCJmb3JtYXR0ZWREYXRlIiwiZm9ybWF0IiwiaWQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIklucHV0IiwidHlwZSIsImxhYmVsIiwib25DaGFuZ2UiLCJMZWZ0UGFuZWwiLCJ1c2VycyIsInNlbGVjdGVkVXNlciIsImNoYXRVc2VyU2VsZWN0aW9uQ2hhbmdlIiwibm90aWZ5SW5jb21pbmdDaGF0VXNlcklkIiwiY29sb3IiLCJhY3RpdmUiLCJjc3NDbGFzc05hbWVzIiwic2VsZWN0ZWQiLCJub3RpZnlDaGF0IiwiYmFja2dyb3VuZENvbG9yIiwiTG9hZGVyIiwiY29uZmlndXJlU3RvcmUiLCJyZWR1Y2VycyIsInRodW5rIiwibG9nZ2VyIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibG9hZEFzeW5jQ29tcG9uZW50IiwiZ2V0Q29tcCIsInN0YXRlIiwic2V0U3RhdGUiLCJjb25zb2xlIiwibG9nIiwiUmVhY3QiLCJtYXRjaCIsIkxvZ2luIiwiUmVnaXN0ZXIiLCJ0eXBlcyIsIm9uRmllbGRUZXh0Q2hhbmdlIiwia2V5IiwidmFsIiwiT05fTE9HSU5fRklFTERfVEVYVF9DSEFOR0UiLCJvbkxvZ2luIiwiT05fTE9HSU4iLCJzZXRMb2dpbkFwaVN0YXR1cyIsInJlcyIsIlNFVF9MT0dJTl9BUElfU1RBVFVTIiwibG9naW4iLCJkYXRhIiwiZGlzcGF0Y2giLCJhY3Rpb25DcmVhdG9yIiwiQWpheFV0aWxzIiwiZmV0Y2giLCJhcGlBY3Rpb25zIiwic2VsZWN0b3JzIiwib25Mb2dpbkJ0bkNsaWNrIiwiYmluZCIsImFjdGlvbnMiLCJmb3JtRmllbGRzIiwic3VjY2VzcyIsInNhdmUiLCJuYXZpZ2F0ZSIsImhpc3RvcnkiLCJwdXNoIiwiZW1haWwiLCJwYXNzd29yZCIsInNob3dMb2FkZXIiLCJsb2dpblN0YXR1cyIsImRpc2FibGVCdG4iLCJlcnIiLCJvbkZpZWxkSW5wdXRDaGFuZ2UiLCJtYXBTdGF0ZVRvUHJvcHMiLCJnZXRGb3JtRmllbGRzIiwiZ2V0TG9hZGVyRmxhZyIsImdldExvZ2luU3RhdHVzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiYWN0aW9uQ3JlYXRvcnMiLCJpbml0aWFsU3RhdGUiLCJhY3Rpb24iLCJmb3JtIiwibG9naW5GaWVsZHMiLCJhdXRoIiwic2hvd0xvYWRlckZsYWciLCJmaWVsZHMiLCJyb290UmVkdWNlciIsInJlZ2lzdGVyIiwiT05fUkVHSVNURVJfRklFTERfVEVYVF9DSEFOR0UiLCJvblJlZ2lzdGVyIiwiT05fUkVHSVNURVIiLCJzZXRSZWdpc3RlckFwaVN0YXR1cyIsIlNFVF9SRUdJU1RFUl9BUElfU1RBVFVTIiwib25SZWdpc3RlckJ0bkNsaWNrIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJyZWdpc3RlclN0YXR1cyIsImdldFJlZ2lzdGVyU3RhdHVzIiwicmVnaXN0ZXJGaWVsZHMiLCJVUERBVEVfVVNFUlNfTElTVCIsIkNIQVRfVVNFUl9TRUxFQ1RJT05fQ0hBTkdFIiwiT05fTUVTU0FHRV9DSEFOR0UiLCJTQVZFX01FU1NBR0UiLCJOT1RJRllfSU5DT01JTkdfQ0hBVCIsImxvYWRpbmciLCJjaGF0UGFyYW1zIiwiY2hhdElkIiwiY2hhdElkcyIsInVzZXJDaGF0IiwidXNlcklkIiwiZ2VuZXJhdGVDaGF0VW5pcXVlSWQiLCJmcm9tSWQiLCJ0b0lkIiwiZGFzaGJvYXJkIiwidXJsIiwibWV0aG9kIiwiY29uZmlnIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwicmVzcG9uc2UiLCJqc29uIiwid2luZG93Iiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInBhcnNlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBRFg7QUFIRSxpQzs7dUNBUVFsRSxNQUFNNEQsR0FBTixFQUFXRSxNQUFYLEM7OztBQUFqQkssd0M7O3VDQUVPQSxTQUFTQyxJQUFULEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFJTixJQUFJckUsU0FBSixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDaEJUbEcsTzs7Ozs7Ozs2QkFDR3NGLEcsRUFBS3JDLEssRUFBTztBQUNidUgsbUJBQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLENBQThCcEYsR0FBOUIsRUFBbUM2RSxLQUFLQyxTQUFMLENBQWVuSCxLQUFmLENBQW5DO0FBQ0g7Ozs0QkFFR3FDLEcsRUFBSztBQUNMLGdCQUFNckMsUUFBUXVILE9BQU9DLGNBQVAsQ0FBc0JFLE9BQXRCLENBQThCckYsR0FBOUIsQ0FBZDs7QUFFQSxtQkFBTzZFLEtBQUtTLEtBQUwsQ0FBVzNILEtBQVgsQ0FBUDtBQUNIOzs7OztrQkFHVSxJQUFJakQsT0FBSixFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFpblwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLmJ1bmRsZS5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcignTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKScpO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9pbmRleC5qc1wiLFwiY29tbW9uXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuYXZhdGFyIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM4ZmY0NDI7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBjb2xvcjogIzhmZjQ0MjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmJ0biB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDQ5ZmQ5O1xcbiAgY29sb3I6ICNmZmY7XFxuICBoZWlnaHQ6IDMycHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIC0ycHggMCAwIHJnYmEoMCwgMCwgMCwgMC40KTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgLmJ0bjpmb2N1cyB7XFxuICAgIG91dGxpbmU6IG5vbmU7IH1cXG4gIC5idG46ZGlzYWJsZWQge1xcbiAgICBvcGFjaXR5OiAwLjU7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jaGF0V2luZG93IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMTAwJTsgfVxcbiAgLmNoYXRXaW5kb3cgLmNoYXRzQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDc1cHgpO1xcbiAgICBvdmVyZmxvdzogYXV0bzsgfVxcbiAgICAuY2hhdFdpbmRvdyAuY2hhdHNDb250YWluZXIgLmNoYXRMaXN0IHtcXG4gICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxuICAgICAgcGFkZGluZzogMDtcXG4gICAgICBtYXJnaW46IDA7IH1cXG4gICAgICAuY2hhdFdpbmRvdyAuY2hhdHNDb250YWluZXIgLmNoYXRMaXN0IC5jaGF0IHtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICAgICAgICBwYWRkaW5nOiAxNXB4O1xcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDsgfVxcbiAgICAgICAgLmNoYXRXaW5kb3cgLmNoYXRzQ29udGFpbmVyIC5jaGF0TGlzdCAuY2hhdCA+IGRpdiB7XFxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7IH1cXG4gICAgICAgIC5jaGF0V2luZG93IC5jaGF0c0NvbnRhaW5lciAuY2hhdExpc3QgLmNoYXQgcCB7XFxuICAgICAgICAgIG1hcmdpbjogMDsgfVxcbiAgICAgICAgLmNoYXRXaW5kb3cgLmNoYXRzQ29udGFpbmVyIC5jaGF0TGlzdCAuY2hhdCAubmFtZSB7XFxuICAgICAgICAgIGNvbG9yOiAjNjM1OTU2O1xcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XFxuICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplOyB9XFxuICAgICAgICAuY2hhdFdpbmRvdyAuY2hhdHNDb250YWluZXIgLmNoYXRMaXN0IC5jaGF0IC50aW1lU3RhbXAge1xcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDE1cHg7IH1cXG4gIC5jaGF0V2luZG93IC5pbnB1dENvbnRhaW5lciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm90dG9tOiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiA3NXB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBwYWRkaW5nOiAxNXB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICAgIC5jaGF0V2luZG93IC5pbnB1dENvbnRhaW5lciBpbnB1dCB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIGhlaWdodDogNDBweDtcXG4gICAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgYm9yZGVyOiAwO1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgICAgIC5jaGF0V2luZG93IC5pbnB1dENvbnRhaW5lciBpbnB1dDpmb2N1cyB7XFxuICAgICAgICBvdXRsaW5lOiBub25lOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZm9ybS1maWVsZCB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4OyB9XFxuICAuZm9ybS1maWVsZCAuZmllbGQge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYzZjN2NhO1xcbiAgICBkaXNwbGF5OiBmbGV4OyB9XFxuICAuZm9ybS1maWVsZCAubGFiZWwge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgY29sb3I6ICM3ZjdmODY7XFxuICAgIGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgLmZvcm0tZmllbGQgaW5wdXQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgICAuZm9ybS1maWVsZCBpbnB1dDpmb2N1cyB7XFxuICAgICAgb3V0bGluZTogbm9uZTsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmxlZnRQYW5lbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDI0MjU5OyB9XFxuICAubGVmdFBhbmVsIC5saXN0IHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICBtYXJnaW46IDA7IH1cXG4gICAgLmxlZnRQYW5lbCAubGlzdCA+IGxpIHtcXG4gICAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICAgIGNvbG9yOiAjZmZmO1xcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZmO1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAgIC5sZWZ0UGFuZWwgLmxpc3QgPiBsaS5zZWxlY3RlZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmI4OyB9XFxuICAgICAgLmxlZnRQYW5lbCAubGlzdCA+IGxpOmhvdmVyIHtcXG4gICAgICAgIG9wYWNpdHk6IDAuNTsgfVxcbiAgICAgIC5sZWZ0UGFuZWwgLmxpc3QgPiBsaSBkaXYge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICAgICAgLmxlZnRQYW5lbCAubGlzdCA+IGxpIC5uYW1lIHtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4OyB9XFxuICAgICAgLmxlZnRQYW5lbCAubGlzdCA+IGxpIC5zdGF0dXMge1xcbiAgICAgICAgd2lkdGg6IDEwcHg7XFxuICAgICAgICBoZWlnaHQ6IDEwcHg7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4OyB9XFxuICAubGVmdFBhbmVsIC5ub3RpZnlDaGF0IHtcXG4gICAgYW5pbWF0aW9uOiBub3RpZnlDaGF0IDFzIGluZmluaXRlOyB9XFxuXFxuQGtleWZyYW1lcyBub3RpZnlDaGF0IHtcXG4gIDAlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbm9uZTsgfVxcbiAgMTAwJSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlYTI1MjU7IH0gfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciBlc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcIik7XG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5sb2FkZXItYm9keSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICByaWdodDogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7IH1cXG4gIC5sb2FkZXItYm9keSAubG9hZGVyIHtcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9hc3NldHMvbG9hZGVyLnN2Z1wiKSkgKyBcIik7XFxuICAgIHdpZHRoOiA3NXB4O1xcbiAgICBoZWlnaHQ6IDc1cHg7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IGNhbGMoNTAlIC0gMzcuNXB4KTtcXG4gICAgbGVmdDogY2FsYyg1MCUgLSAzNy41cHgpOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuYXV0aC1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNS4xOGRlZywgcmdiYSg0LCAxNTksIDIxNywgMC45KSAwJSwgcmdiYSgxMywgMTQyLCAyMDEsIDAuOSkgMjIuOSUsIHJnYmEoNDMsIDg1LCAxNDYsIDAuOSkgMTAwJSk7IH1cXG4gIC5hdXRoLWNvbnRhaW5lciAuc2VjdGlvbi1ib2R5IHtcXG4gICAgd2lkdGg6IDQ4MHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBtYXJnaW4tdG9wOiAxMDBweDtcXG4gICAgcGFkZGluZzogMzBweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgIC5hdXRoLWNvbnRhaW5lciAuc2VjdGlvbi1ib2R5IC5lcnJvciB7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBjb2xvcjogI2VmMDkwOTtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzogbG9jYWwoXFxcIkxhdG8gUmVndWxhclxcXCIpLCBsb2NhbChcXFwiTGF0by1SZWd1bGFyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9hc3NldHMvZm9udHMvTGF0by1SZWd1bGFyLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogJ0xhdG8nO1xcbiAgbWFyZ2luOiAwOyB9XFxuXFxuLmNsZWFyZml4OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgaGVpZ2h0OiAwO1xcbiAgY2xlYXI6IGJvdGg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nb20tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2dvbS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9ndS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2hlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9oci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2h1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9oeS1hbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2h5LWFtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyLCBSb3V0ZSwgU3dpdGNoLCBSZWRpcmVjdCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEF1dGggZnJvbSAnLi9yZWR1eC9hdXRoL2FwcCc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL3V0aWxzL3N0b3JhZ2UnO1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IGxvYWRBc3luY0NvbXBvbmVudCBmcm9tICcuL2xvYWRBc3luY0NvbXAnO1xuXG5mdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuXHRyZXR1cm4gU3RvcmFnZS5nZXQoJ3VzZXJJbmZvJykgIT0gbnVsbDtcbn1cblxuY29uc3QgRGFzaGJvYXJkID0gbG9hZEFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgnLi9yZWR1eC9kYXNoYm9hcmQvYXBwJykudGhlbihtb2R1bGUgPT4gbW9kdWxlLmRlZmF1bHQpKTtcblxuY29uc3QgUHJvdGVjdGVkUm91dGVzID0gKHsgcGF0aCwgY29tcG9uZW50OiBDb21wb25lbnQgfSkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxSb3V0ZSBwYXRoPXtwYXRofSByZW5kZXI9eygpID0+IChcblx0XHRcdGlzTG9nZ2VkSW4oKSA/IDxDb21wb25lbnQgLz4gOiA8UmVkaXJlY3QgdG89Jy9hdXRoJyAvPlxuXHRcdCl9IC8+XG5cdCk7XG59XG5cbmNvbnN0IEFwcCA9ICh7IHN0b3JlIH0pID0+IHtcblx0cmV0dXJuIChcblx0XHQ8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cblx0XHRcdDxSb3V0ZXI+XG5cdFx0XHRcdDxTd2l0Y2g+XG5cdFx0XHRcdFx0PFJvdXRlIGV4YWN0IHBhdGg9XCIvXCIgcmVuZGVyPXsoKSA9PiA8UmVkaXJlY3QgdG89e3sgcGF0aG5hbWU6ICcvYXV0aCcgfX0gLz59IC8+XG5cdFx0XHRcdFx0PFJvdXRlIHBhdGg9XCIvYXV0aFwiIGNvbXBvbmVudD17QXV0aH0gLz5cblx0XHRcdFx0XHQ8UHJvdGVjdGVkUm91dGVzIHBhdGg9XCIvZGFzaGJvYXJkXCIgY29tcG9uZW50PXtEYXNoYm9hcmR9IC8+XG5cdFx0XHRcdDwvU3dpdGNoPlxuXHRcdFx0PC9Sb3V0ZXI+XG5cdFx0PC9Qcm92aWRlcj5cblx0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZjEzN2VlNDg2Mjc4NWExNTE4ZmIzMDU2ZWNjZGM5OWIud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZhNDU5MDE2MGM1OTk1OWY5Y2NmMTRlY2YyMmFjYTgxLnN2Z1wiOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5cbmNvbnN0IEF2YXRhciA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhdmF0YXJcIj5cbiAgICAgICAgICAgIHtuYW1lLnNwbGl0KCcgJykubWFwKGEgPT4gYS5jaGFyQXQoMCkpLmpvaW4oJycpLnRvVXBwZXJDYXNlKCl9XG4gICAgICAgIDwvc3Bhbj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBdmF0YXI7IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcblxuY29uc3QgQnV0dG9uID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyB0ZXh0LCBvbkNsaWNrLCBkaXNhYmxlZCB9ID0gcHJvcHM7XG5cbiAgICBmdW5jdGlvbiBvbkJ0bkNsaWNrKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvbkNsaWNrKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG5cIiBvbkNsaWNrPXtvbkJ0bkNsaWNrfSBkaXNhYmxlZD17ZGlzYWJsZWR9Pnt0ZXh0fTwvYnV0dG9uPlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjsiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuXG5jb25zdCBDaGF0V2luZG93ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBjaGF0cywgdXNlciwgb25NZXNzYWdlQ2hhbmdlLCBtZXNzYWdlID0gJycsIHNlbmRNZXNzYWdlIH0gPSBwcm9wcztcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IGBXcml0ZSBhIG1lc3NhZ2UgdG8gJHt1c2VyLnVzZXJOYW1lfWA7XG5cbiAgICBmdW5jdGlvbiBvbktleURvd24oZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgc2VuZE1lc3NhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdFdpbmRvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0c0NvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjaGF0TGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGF0cy5tYXAoKGNoYXQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBmcm9tVXNlcklkLCBtc2csIGRhdGUgfSA9IGNoYXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IG1vbWVudChkYXRlKS5mb3JtYXQoJ2xsbCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImNoYXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmFtZVwiPntmcm9tVXNlcklkICE9PSB1c2VyLmlkID8gJ1lvdScgOiB1c2VyLnVzZXJOYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0aW1lU3RhbXBcIj57Zm9ybWF0dGVkRGF0ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXNnXCI+e21zZ308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0Q29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uTWVzc2FnZUNoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17b25LZXlEb3dufT5cbiAgICAgICAgICAgICAgICA8L2lucHV0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0V2luZG93OyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5cbmNvbnN0IElucHV0ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyB0eXBlLCB2YWx1ZSwgbGFiZWwsIG9uQ2hhbmdlIH0gPSBwcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZmllbGRcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsYWJlbFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPXt0eXBlfSBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX0gdmFsdWU9e3ZhbHVlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0OyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBBdmF0YXIgZnJvbSAnLi4vQXZhdGFyJztcblxuY29uc3QgTGVmdFBhbmVsID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyB1c2Vycywgc2VsZWN0ZWRVc2VyLCBjaGF0VXNlclNlbGVjdGlvbkNoYW5nZSwgbm90aWZ5SW5jb21pbmdDaGF0VXNlcklkIH0gPSBwcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdFwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcnMubWFwKCh1c2VyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB1c2VyLmFjdGl2ZSA/ICd5ZWxsb3cnIDogJ3JlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjc3NDbGFzc05hbWVzID0gY2xhc3NOYW1lcygnaXRlbScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogc2VsZWN0ZWRVc2VyICYmIHNlbGVjdGVkVXNlci5pZCA9PT0gdXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RpZnlDaGF0OiB1c2VyLmlkID09PSBub3RpZnlJbmNvbWluZ0NoYXRVc2VySWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2luZGV4fSBjbGFzc05hbWU9e2Nzc0NsYXNzTmFtZXN9IG9uQ2xpY2s9eygpID0+IGNoYXRVc2VyU2VsZWN0aW9uQ2hhbmdlKHVzZXIpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBdmF0YXIgbmFtZT17dXNlci51c2VyTmFtZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hbWVcIj57dXNlci51c2VyTmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXR1c1wiIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogY29sb3IgfX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICApXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMZWZ0UGFuZWw7IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcblxuY29uc3QgTG9hZGVyID0gKHByb3BzKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkZXItYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkZXJcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2FkZXI7IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL0J1dHRvbic7XG5pbXBvcnQgTGVmdFBhbmVsIGZyb20gJy4vTGVmdFBhbmVsJztcbmltcG9ydCBDaGF0V2luZG93IGZyb20gJy4vQ2hhdFdpbmRvdyc7XG5pbXBvcnQgTG9hZGVyIGZyb20gJy4vTG9hZGVyJztcblxuZXhwb3J0IHtcbiAgICBJbnB1dCxcbiAgICBCdXR0b24sXG4gICAgTGVmdFBhbmVsLFxuICAgIENoYXRXaW5kb3csXG4gICAgTG9hZGVyXG59OyIsImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICdyZWR1eC1sb2dnZXInO1xuaW1wb3J0IHJlZHVjZXJzIGZyb20gJy4vcmVkdXgvcm9vdFJlZHVjZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZSgpIHtcbiAgICByZXR1cm4gY3JlYXRlU3RvcmUoXG4gICAgICAgIHJlZHVjZXJzLFxuICAgICAgICBhcHBseU1pZGRsZXdhcmUodGh1bmssIGxvZ2dlcilcbiAgICApO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vY29uZmlndXJlU3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKCk7XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgICA8QXBwIHN0b3JlPXtzdG9yZX0gLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4pOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRBc3luY0NvbXBvbmVudChnZXRDb21wKSB7XG5cdHJldHVybiBjbGFzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdFx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdFx0Q29tcG9uZW50OiBudWxsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGFzeW5jIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IG1vZHVsZSA9IGF3YWl0IGdldENvbXAoKTtcblxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRDb21wb25lbnQ6IG1vZHVsZVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coYEVycm9yIGxvYWRpbmcgY29tcG9uZW50OiAke2V9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmVuZGVyKCkge1xuXHRcdFx0Y29uc3QgeyBDb21wb25lbnQgfSA9IHRoaXMuc3RhdGU7XG5cblx0XHRcdGlmIChDb21wb25lbnQpIHtcblx0XHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IC8+XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSb3V0ZSwgUmVkaXJlY3QgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCAnLi9hcHAuc2Nzcyc7XG5pbXBvcnQgTG9naW4gZnJvbSAnLi9sb2dpbi9hcHAnO1xuaW1wb3J0IFJlZ2lzdGVyIGZyb20gJy4vcmVnaXN0ZXIvYXBwJztcblxuY29uc3QgQXV0aCA9ICh7IG1hdGNoIH0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF1dGgtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8Um91dGUgZXhhY3QgcGF0aD17YCR7bWF0Y2gucGF0aH1cXC9gfSByZW5kZXI9eygpID0+IDxSZWRpcmVjdCB0bz17eyBwYXRobmFtZTogYCR7bWF0Y2gucGF0aH0vbG9naW5gIH19IC8+fT48L1JvdXRlPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9e2Ake21hdGNoLnBhdGh9L2xvZ2luYH0gY29tcG9uZW50PXtMb2dpbn0+PC9Sb3V0ZT5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPXtgJHttYXRjaC5wYXRofS9yZWdpc3RlcmB9IGNvbXBvbmVudD17UmVnaXN0ZXJ9PjwvUm91dGU+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBdXRoOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2FwcC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2FwcC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9hcHAuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vYWN0aW9uVHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgb25GaWVsZFRleHRDaGFuZ2Uoa2V5LCB2YWwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVzLk9OX0xPR0lOX0ZJRUxEX1RFWFRfQ0hBTkdFLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgdmFsXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBvbkxvZ2luKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogdHlwZXMuT05fTE9HSU5cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHNldExvZ2luQXBpU3RhdHVzKHJlcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogdHlwZXMuU0VUX0xPR0lOX0FQSV9TVEFUVVMsXG4gICAgICAgICAgICByZXNcbiAgICAgICAgfTtcbiAgICB9XG59IiwiZXhwb3J0IGNvbnN0IE9OX0xPR0lOX0ZJRUxEX1RFWFRfQ0hBTkdFID0gJ09OX0xPR0lOX0ZJRUxEX1RFWFRfQ0hBTkdFJztcbmV4cG9ydCBjb25zdCBPTl9MT0dJTiA9ICdPTl9MT0dJTic7XG5leHBvcnQgY29uc3QgU0VUX0xPR0lOX0FQSV9TVEFUVVMgPSAnU0VUX0xPR0lOX0FQSV9TVEFUVVMnOyIsImltcG9ydCBhY3Rpb25DcmVhdG9yIGZyb20gJy4vYWN0aW9uQ3JlYXRvcic7XG5pbXBvcnQgQWpheFV0aWxzIGZyb20gJy4uLy4uLy4uL3V0aWxzL2FqYXhVdGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dpbihkYXRhKSB7XG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCkgPT4ge1xuICAgICAgICBkaXNwYXRjaChhY3Rpb25DcmVhdG9yLm9uTG9naW4oKSk7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IEFqYXhVdGlscy5mZXRjaCgnL2FwaS9sb2dpbicsICdQT1NUJywgZGF0YSk7XG4gICAgICAgIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3Iuc2V0TG9naW5BcGlTdGF0dXMocmVzKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgYWN0aW9uQ3JlYXRvcnMgZnJvbSAnLi9hY3Rpb25DcmVhdG9yJztcbmltcG9ydCAqIGFzIGFwaUFjdGlvbnMgZnJvbSAnLi9hcGlBY3Rpb25zJztcbmltcG9ydCAqIGFzIHNlbGVjdG9ycyBmcm9tICcuL3NlbGVjdG9yJztcbmltcG9ydCB7XG4gICAgSW5wdXQsXG4gICAgQnV0dG9uLFxuICAgIExvYWRlclxufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FsbCc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuLi8uLi8uLi91dGlscy9zdG9yYWdlJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5vbkxvZ2luQnRuQ2xpY2sgPSB0aGlzLm9uTG9naW5CdG5DbGljay5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIG9uRmllbGRJbnB1dENoYW5nZShrZXksIHZhbCkge1xuICAgICAgICB0aGlzLnByb3BzLmFjdGlvbnMub25GaWVsZFRleHRDaGFuZ2Uoa2V5LCB2YWwpO1xuICAgIH1cblxuICAgIGFzeW5jIG9uTG9naW5CdG5DbGljaygpIHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBwcm9wcy5hcGlBY3Rpb25zLmxvZ2luKHByb3BzLmZvcm1GaWVsZHMpO1xuXG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgU3RvcmFnZS5zYXZlKCd1c2VySW5mbycsIHJlcy51c2VyKTtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdmlnYXRlKCkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcHJvcHMuaGlzdG9yeS5wdXNoKCcvZGFzaGJvYXJkJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBmb3JtRmllbGRzOiB7XG4gICAgICAgICAgICAgICAgZW1haWwsIHBhc3N3b3JkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd0xvYWRlcixcbiAgICAgICAgICAgIGxvZ2luU3RhdHVzXG4gICAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCBkaXNhYmxlQnRuID0gZW1haWwgPT09ICcnIHx8IHBhc3N3b3JkID09PSAnJztcbiAgICAgICAgY29uc3Qge2VyciA9ICcnfSA9IGxvZ2luU3RhdHVzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb24tYm9keVwiPlxuICAgICAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICAgICAgICA8SW5wdXQgdHlwZT1cInRleHRcIiBsYWJlbD1cImVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17KHZhbCkgPT4gdGhpcy5vbkZpZWxkSW5wdXRDaGFuZ2UoJ2VtYWlsJywgdmFsKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPElucHV0IHR5cGU9XCJwYXNzd29yZFwiIGxhYmVsPVwicGFzc3dvcmRcIiB2YWx1ZT17cGFzc3dvcmR9IG9uQ2hhbmdlPXsodmFsKSA9PiB0aGlzLm9uRmllbGRJbnB1dENoYW5nZSgncGFzc3dvcmQnLCB2YWwpfSAvPlxuICAgICAgICAgICAgICAgICAgICB7ZXJyICYmIDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JcIj57ZXJyfTwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB0ZXh0PVwibG9naW5cIiBvbkNsaWNrPXt0aGlzLm9uTG9naW5CdG5DbGlja30gZGlzYWJsZWQ9e2Rpc2FibGVCdG59PjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICB7c2hvd0xvYWRlciAmJiA8TG9hZGVyIC8+fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZvcm1GaWVsZHM6IHNlbGVjdG9ycy5nZXRGb3JtRmllbGRzKHN0YXRlKSxcbiAgICAgICAgc2hvd0xvYWRlcjogc2VsZWN0b3JzLmdldExvYWRlckZsYWcoc3RhdGUpLFxuICAgICAgICBsb2dpblN0YXR1czogc2VsZWN0b3JzLmdldExvZ2luU3RhdHVzKHN0YXRlKVxuICAgIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3Rpb25zOiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKSxcbiAgICAgICAgYXBpQWN0aW9uczogYmluZEFjdGlvbkNyZWF0b3JzKGFwaUFjdGlvbnMsIGRpc3BhdGNoKVxuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEFwcCk7IiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBmb3JtOiB7XG4gICAgICAgIGVtYWlsOiAnJyxcbiAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgIH0sXG4gICAgc2hvd0xvYWRlcjogZmFsc2UsXG4gICAgbG9naW5TdGF0dXM6IHt9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSB0eXBlcy5PTl9MT0dJTl9GSUVMRF9URVhUX0NIQU5HRToge1xuICAgICAgICAgICAgY29uc3QgeyBrZXksIHZhbCB9ID0gYWN0aW9uO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGZvcm06IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuZm9ybSxcbiAgICAgICAgICAgICAgICAgICAgW2tleV06IHZhbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIHR5cGVzLk9OX0xPR0lOOiB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgc2hvd0xvYWRlcjogdHJ1ZSwgbG9naW5TdGF0dXM6IHt9IH07XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIHR5cGVzLlNFVF9MT0dJTl9BUElfU1RBVFVTOiB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgc2hvd0xvYWRlcjogZmFsc2UsIGxvZ2luU3RhdHVzOiBhY3Rpb24ucmVzIH07XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGU7XG4gICAgfVxufSIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuXG5jb25zdCBsb2dpbkZpZWxkcyA9IHN0YXRlID0+IHN0YXRlLmF1dGgubG9naW4uZm9ybTtcbmNvbnN0IHNob3dMb2FkZXJGbGFnID0gc3RhdGUgPT4gc3RhdGUuYXV0aC5sb2dpbi5zaG93TG9hZGVyO1xuY29uc3QgbG9naW5TdGF0dXMgPSBzdGF0ZSA9PiBzdGF0ZS5hdXRoLmxvZ2luLmxvZ2luU3RhdHVzO1xuXG5leHBvcnQgY29uc3QgZ2V0Rm9ybUZpZWxkcyA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgIFtsb2dpbkZpZWxkc10sXG4gICAgKGZpZWxkcykgPT4gZmllbGRzXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0TG9hZGVyRmxhZyA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgIFtzaG93TG9hZGVyRmxhZ10sXG4gICAgKHNob3dMb2FkZXJGbGFnKSA9PiBzaG93TG9hZGVyRmxhZ1xuKTtcblxuZXhwb3J0IGNvbnN0IGdldExvZ2luU3RhdHVzID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgW2xvZ2luU3RhdHVzXSxcbiAgICAobG9naW5TdGF0dXMpID0+IGxvZ2luU3RhdHVzXG4pOyIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBsb2dpbiBmcm9tICcuL2xvZ2luL3JlZHVjZXInO1xuaW1wb3J0IHJlZ2lzdGVyIGZyb20gJy4vcmVnaXN0ZXIvcmVkdWNlcic7XG5cbmNvbnN0IHJvb3RSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBsb2dpbixcbiAgICByZWdpc3RlclxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3RSZWR1Y2VyOyIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vYWN0aW9uVHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgb25GaWVsZFRleHRDaGFuZ2Uoa2V5LCB2YWwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVzLk9OX1JFR0lTVEVSX0ZJRUxEX1RFWFRfQ0hBTkdFLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgdmFsXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBvblJlZ2lzdGVyKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogdHlwZXMuT05fUkVHSVNURVJcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHNldFJlZ2lzdGVyQXBpU3RhdHVzKHJlcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogdHlwZXMuU0VUX1JFR0lTVEVSX0FQSV9TVEFUVVMsXG4gICAgICAgICAgICByZXNcbiAgICAgICAgfTtcbiAgICB9XG59IiwiZXhwb3J0IGNvbnN0IE9OX1JFR0lTVEVSX0ZJRUxEX1RFWFRfQ0hBTkdFID0gJ09OX1JFR0lTVEVSX0ZJRUxEX1RFWFRfQ0hBTkdFJztcbmV4cG9ydCBjb25zdCBPTl9SRUdJU1RFUiA9ICdPTl9SRUdJU1RFUic7XG5leHBvcnQgY29uc3QgU0VUX1JFR0lTVEVSX0FQSV9TVEFUVVMgPSAnU0VUX1JFR0lTVEVSX0FQSV9TVEFUVVMnOyIsImltcG9ydCBhY3Rpb25DcmVhdG9yIGZyb20gJy4vYWN0aW9uQ3JlYXRvcic7XG5pbXBvcnQgQWpheFV0aWxzIGZyb20gJy4uLy4uLy4uL3V0aWxzL2FqYXhVdGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlcihkYXRhKSB7XG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCkgPT4ge1xuICAgICAgICBkaXNwYXRjaChhY3Rpb25DcmVhdG9yLm9uUmVnaXN0ZXIoKSk7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IEFqYXhVdGlscy5mZXRjaCgnL2FwaS9yZWdpc3RlcicsICdQT1NUJywgZGF0YSk7XG4gICAgICAgIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3Iuc2V0UmVnaXN0ZXJBcGlTdGF0dXMocmVzKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgYWN0aW9uQ3JlYXRvcnMgZnJvbSAnLi9hY3Rpb25DcmVhdG9yJztcbmltcG9ydCAqIGFzIGFwaUFjdGlvbnMgZnJvbSAnLi9hcGlBY3Rpb25zJztcbmltcG9ydCAqIGFzIHNlbGVjdG9ycyBmcm9tICcuL3NlbGVjdG9yJztcbmltcG9ydCB7XG4gICAgSW5wdXQsXG4gICAgQnV0dG9uLFxuICAgIExvYWRlclxufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FsbC5qcyc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMub25SZWdpc3RlckJ0bkNsaWNrID0gdGhpcy5vblJlZ2lzdGVyQnRuQ2xpY2suYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBvbkZpZWxkSW5wdXRDaGFuZ2Uoa2V5LCB2YWwpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5hY3Rpb25zLm9uRmllbGRUZXh0Q2hhbmdlKGtleSwgdmFsKTtcbiAgICB9XG5cbiAgICBhc3luYyBvblJlZ2lzdGVyQnRuQ2xpY2soKSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgcHJvcHMuYXBpQWN0aW9ucy5yZWdpc3Rlcihwcm9wcy5mb3JtRmllbGRzKTtcblxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdmlnYXRlKCkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcHJvcHMuaGlzdG9yeS5wdXNoKCcvYXV0aC9sb2dpbicpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZm9ybUZpZWxkczoge1xuICAgICAgICAgICAgICAgIGVtYWlsLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwYXNzd29yZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dMb2FkZXIsXG4gICAgICAgICAgICByZWdpc3RlclN0YXR1c1xuICAgICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgZGlzYWJsZUJ0biA9IGVtYWlsID09PSAnJyB8fCBmaXJzdE5hbWUgPT09ICcnIHx8IGxhc3ROYW1lID09PSAnJyB8fCBwYXNzd29yZCA9PT0gJyc7XG4gICAgICAgIGNvbnN0IHsgZXJyID0gJycgfSA9IHJlZ2lzdGVyU3RhdHVzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb24tYm9keVwiPlxuICAgICAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICAgICAgICA8SW5wdXQgdHlwZT1cInRleHRcIiBsYWJlbD1cImVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17KHZhbCkgPT4gdGhpcy5vbkZpZWxkSW5wdXRDaGFuZ2UoJ2VtYWlsJywgdmFsKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPElucHV0IHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJmaXJzdCBuYW1lXCIgdmFsdWU9e2ZpcnN0TmFtZX0gb25DaGFuZ2U9eyh2YWwpID0+IHRoaXMub25GaWVsZElucHV0Q2hhbmdlKCdmaXJzdE5hbWUnLCB2YWwpfSAvPlxuICAgICAgICAgICAgICAgICAgICA8SW5wdXQgdHlwZT1cInRleHRcIiBsYWJlbD1cImxhc3QgbmFtZVwiIHZhbHVlPXtsYXN0TmFtZX0gb25DaGFuZ2U9eyh2YWwpID0+IHRoaXMub25GaWVsZElucHV0Q2hhbmdlKCdsYXN0TmFtZScsIHZhbCl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBsYWJlbD1cInBhc3N3b3JkXCIgdmFsdWU9e3Bhc3N3b3JkfSBvbkNoYW5nZT17KHZhbCkgPT4gdGhpcy5vbkZpZWxkSW5wdXRDaGFuZ2UoJ3Bhc3N3b3JkJywgdmFsKX0gLz5cbiAgICAgICAgICAgICAgICAgICAge2VyciAmJiA8ZGl2IGNsYXNzTmFtZT1cImVycm9yXCI+e2Vycn08L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cInJlZ2lzdGVyXCIgb25DbGljaz17dGhpcy5vblJlZ2lzdGVyQnRuQ2xpY2t9IGRpc2FibGVkPXtkaXNhYmxlQnRufT48L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAge3Nob3dMb2FkZXIgJiYgPExvYWRlciAvPn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZm9ybUZpZWxkczogc2VsZWN0b3JzLmdldEZvcm1GaWVsZHMoc3RhdGUpLFxuICAgICAgICBzaG93TG9hZGVyOiBzZWxlY3RvcnMuZ2V0TG9hZGVyRmxhZyhzdGF0ZSksXG4gICAgICAgIHJlZ2lzdGVyU3RhdHVzOiBzZWxlY3RvcnMuZ2V0UmVnaXN0ZXJTdGF0dXMoc3RhdGUpXG4gICAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjdGlvbnM6IGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpLFxuICAgICAgICBhcGlBY3Rpb25zOiBiaW5kQWN0aW9uQ3JlYXRvcnMoYXBpQWN0aW9ucywgZGlzcGF0Y2gpXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEFwcCk7IiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBmb3JtOiB7XG4gICAgICAgIGVtYWlsOiAnJyxcbiAgICAgICAgZmlyc3ROYW1lOiAnJyxcbiAgICAgICAgbGFzdE5hbWU6ICcnLFxuICAgICAgICBwYXNzd29yZDogJydcbiAgICB9LFxuICAgIHNob3dMb2FkZXI6IGZhbHNlLFxuICAgIHJlZ2lzdGVyU3RhdHVzOiB7fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgdHlwZXMuT05fUkVHSVNURVJfRklFTERfVEVYVF9DSEFOR0U6IHtcbiAgICAgICAgICAgIGNvbnN0IHsga2V5LCB2YWwgfSA9IGFjdGlvbjtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmZvcm0sXG4gICAgICAgICAgICAgICAgICAgIFtrZXldOiB2YWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSB0eXBlcy5PTl9SRUdJU1RFUjoge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHNob3dMb2FkZXI6IHRydWUsIHJlZ2lzdGVyU3RhdHVzOiB7fSB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSB0eXBlcy5TRVRfUkVHSVNURVJfQVBJX1NUQVRVUzoge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHNob3dMb2FkZXI6IGZhbHNlLCByZWdpc3RlclN0YXR1czogYWN0aW9uLnJlcyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcblxuY29uc3QgcmVnaXN0ZXJGaWVsZHMgPSBzdGF0ZSA9PiBzdGF0ZS5hdXRoLnJlZ2lzdGVyLmZvcm07XG5jb25zdCBzaG93TG9hZGVyRmxhZyA9IHN0YXRlID0+IHN0YXRlLmF1dGgucmVnaXN0ZXIuc2hvd0xvYWRlcjtcbmNvbnN0IHJlZ2lzdGVyU3RhdHVzID0gc3RhdGUgPT4gc3RhdGUuYXV0aC5yZWdpc3Rlci5yZWdpc3RlclN0YXR1cztcblxuZXhwb3J0IGNvbnN0IGdldEZvcm1GaWVsZHMgPSBjcmVhdGVTZWxlY3RvcihcbiAgICBbcmVnaXN0ZXJGaWVsZHNdLFxuICAgIChmaWVsZHMpID0+IGZpZWxkc1xuKTtcblxuZXhwb3J0IGNvbnN0IGdldExvYWRlckZsYWcgPSBjcmVhdGVTZWxlY3RvcihcbiAgICBbc2hvd0xvYWRlckZsYWddLFxuICAgIChzaG93TG9hZGVyRmxhZykgPT4gc2hvd0xvYWRlckZsYWdcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRSZWdpc3RlclN0YXR1cyA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgIFtyZWdpc3RlclN0YXR1c10sXG4gICAgKHJlZ2lzdGVyU3RhdHVzKSA9PiByZWdpc3RlclN0YXR1c1xuKTsiLCJleHBvcnQgY29uc3QgVVBEQVRFX1VTRVJTX0xJU1QgPSAnVVBEQVRFX1VTRVJTX0xJU1QnO1xuZXhwb3J0IGNvbnN0IENIQVRfVVNFUl9TRUxFQ1RJT05fQ0hBTkdFID0gJ0NIQVRfVVNFUl9TRUxFQ1RJT05fQ0hBTkdFJztcbmV4cG9ydCBjb25zdCBPTl9NRVNTQUdFX0NIQU5HRSA9J09OX01FU1NBR0VfQ0hBTkdFJztcbmV4cG9ydCBjb25zdCBTQVZFX01FU1NBR0UgPSAnU0FWRV9NRVNTQUdFJztcbmV4cG9ydCBjb25zdCBOT1RJRllfSU5DT01JTkdfQ0hBVCA9ICdOT1RJRllfSU5DT01JTkdfQ0hBVCc7IiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICB1c2VyczogW10sXG4gICAgc2VsZWN0ZWRVc2VyOiBudWxsLFxuICAgIG1lc3NhZ2U6ICcnLFxuICAgIGNoYXRzOiB7fSxcbiAgICBjaGF0SWRzOiB7fSxcbiAgICBub3RpZnlJbmNvbWluZ0NoYXRVc2VySWQ6IG51bGwsXG4gICAgbG9hZGluZzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVDaGF0VW5pcXVlSWQoZnJvbUlkLCB0b0lkKSB7XG4gICAgcmV0dXJuIGAke2Zyb21JZH0tJHt0b0lkfWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIHR5cGVzLlVQREFURV9VU0VSU19MSVNUOiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHVzZXJzOiBhY3Rpb24udXNlcnMsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSB0eXBlcy5DSEFUX1VTRVJfU0VMRUNUSU9OX0NIQU5HRToge1xuICAgICAgICAgICAgY29uc3QgeyB1c2VyIH0gPSBhY3Rpb247XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRVc2VyOiB1c2VyLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICAgICAgICAgIC4uLihzdGF0ZS5ub3RpZnlJbmNvbWluZ0NoYXRVc2VySWQgJiYgc3RhdGUubm90aWZ5SW5jb21pbmdDaGF0VXNlcklkID09PSB1c2VyLmlkID8geyBub3RpZnlJbmNvbWluZ0NoYXRVc2VySWQ6IG51bGwgfSA6IHt9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIHR5cGVzLk9OX01FU1NBR0VfQ0hBTkdFOiB7XG4gICAgICAgICAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IGFjdGlvbjtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgdHlwZXMuU0FWRV9NRVNTQUdFOiB7XG4gICAgICAgICAgICBjb25zdCB7IGlkLCBjaGF0UGFyYW1zIH0gPSBhY3Rpb247XG4gICAgICAgICAgICBjb25zdCB7IGNoYXRJZCwgbXNnIH0gPSBjaGF0UGFyYW1zO1xuICAgICAgICAgICAgY29uc3QgeyBjaGF0cywgY2hhdElkcyB9ID0gc3RhdGU7XG4gICAgICAgICAgICBjb25zdCB1c2VyQ2hhdCA9IGNoYXRzW2NoYXRJZF0gfHwge307XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgY2hhdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uY2hhdHMsXG4gICAgICAgICAgICAgICAgICAgIFtjaGF0SWRdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi51c2VyQ2hhdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXRzOiBbLi4uKHVzZXJDaGF0LmNoYXRzIHx8IFtdKSwgY2hhdFBhcmFtc11cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hhdElkczoge1xuICAgICAgICAgICAgICAgICAgICAuLi5jaGF0SWRzLFxuICAgICAgICAgICAgICAgICAgICBbaWRdOiBjaGF0SWRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgdHlwZXMuTk9USUZZX0lOQ09NSU5HX0NIQVQ6IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgbm90aWZ5SW5jb21pbmdDaGF0VXNlcklkOiBhY3Rpb24udXNlcklkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IGF1dGggZnJvbSAnLi9hdXRoL3JlZHVjZXInO1xuaW1wb3J0IGRhc2hib2FyZCBmcm9tICcuL2Rhc2hib2FyZC9yZWR1Y2VyJztcblxuY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuICAgIGF1dGgsXG4gICAgZGFzaGJvYXJkXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXI7IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiY2xhc3MgQWpheFV0aWxzIHtcbiAgICBhc3luYyBmZXRjaCh1cmwsIG1ldGhvZCwgZGF0YSkge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgY29uZmlnKTtcblxuICAgICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEFqYXhVdGlscygpOyIsImNsYXNzIFN0b3JhZ2Uge1xuICAgIHNhdmUoa2V5LCB2YWx1ZSkge1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG5cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFN0b3JhZ2UoKTsiXSwic291cmNlUm9vdCI6IiJ9