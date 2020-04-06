/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/index */ \"./src/js/index.js\");\n\n\nconst keyboard = new _js_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nkeyboard.init();\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _templateHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templateHelper */ \"./src/js/templateHelper.js\");\n/* harmony import */ var _language__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language */ \"./src/js/language.js\");\n\n\n\nclass Keyboard {\n  constructor() {\n    this.elements = {\n      keyContainer: null,\n      keys: [],\n      textarea: null,\n    };\n    this.props = {\n      capsLock: false,\n      language: localStorage.getItem('lang') || 'en',\n      isShiftPressed: true,\n    };\n    this.keyLayout = _language__WEBPACK_IMPORTED_MODULE_1__[\"default\"][this.props.language];\n  }\n\n  init() {\n    this.elements.textarea = Object(_templateHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      tagName: 'textarea',\n      classList: ['keyboard__textarea'],\n      attrs: {\n        rows: '10',\n      },\n    });\n    this.elements.keyContainer = Object(_templateHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      tagName: 'section',\n      classList: ['keyboard__keys'],\n    });\n\n    this.elements.keyContainer.appendChild(this.createKeys());\n    this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');\n\n    document.body.appendChild(this.elements.textarea);\n    document.body.appendChild(this.elements.keyContainer);\n\n    document.addEventListener('keydown', (e) => { this.pressKey(e); });\n    document.addEventListener('keyup', (e) => { this.keyUp(e); });\n  }\n\n  createKeys() {\n    const fragment = document.createDocumentFragment();\n    // const keyLayout = (this.props.language === 'en') ? lang.en : lang.ru;\n\n    Object.entries(this.keyLayout).forEach(([code, key]) => {\n      const keyElement = Object(_templateHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        tagName: 'button',\n        classList: ['keyboard__key'],\n        attrs: {\n          type: 'button',\n        },\n      });\n      const lineBreaks = ['Backspace', '\\\\', 'Enter', 'arrowUp'].includes(key);\n\n      switch (code) {\n        case 'Backspace':\n          keyElement.innerHTML = '<span>Backspace</span>';\n          keyElement.classList.add('keyboard__key_wide');\n          keyElement.addEventListener('mousedown', () => {\n            this.elements.textarea.value = this.elements.textarea.value\n              .substring(0, this.elements.textarea.value.length - 1);\n          });\n          break;\n        case 'Tab':\n          keyElement.innerHTML = '<span>Tab</span>';\n          keyElement.classList.add('keyboard__key_wide');\n          keyElement.addEventListener('mousedown', () => {\n            this.elements.textarea.value += '\\t';\n          });\n          break;\n        case 'CapsLock':\n          keyElement.innerHTML = '<div class=\"capsLight\"></div><span>CapsLock</span>';\n          keyElement.classList.add('keyboard__key_wide', 'keyboard__key_capsLock');\n          keyElement.addEventListener('mousedown', () => {\n            this.toggleCapsLock();\n          });\n          break;\n        case 'ShiftLeft':\n        case 'ShiftRight':\n          keyElement.innerHTML = '<span>Shift</span>';\n          keyElement.classList.add('keyboard__key_wide');\n          keyElement.addEventListener('mousedown', () => {\n            this.toggleCapsLock();\n          });\n          keyElement.addEventListener('mouseup', () => {\n            this.toggleCapsLock();\n          });\n          break;\n        case 'Enter':\n          keyElement.innerHTML = '<span>Enter</span>';\n          keyElement.classList.add('keyboard__key_wide');\n          keyElement.addEventListener('mousedown', () => {\n            this.elements.textarea.value += '\\n';\n          });\n          break;\n        case 'Space':\n          keyElement.innerHTML = '<span>#&32</span>';\n          keyElement.classList.add('keyboard__key_extra-wide');\n          keyElement.addEventListener('mousedown', () => {\n            this.elements.textarea.value += ' ';\n          });\n          break;\n        case 'ControlLeft':\n        case 'ControlRight':\n          keyElement.innerHTML = '<span>Ctrl</span>';\n          break;\n        case 'AltLeft':\n        case 'AltRight':\n          keyElement.innerHTML = '<span>Alt</span>';\n          break;\n        case 'LangSwitch':\n          keyElement.innerHTML = `<span>${key}</span>`;\n          keyElement.classList.add('keyboard__key_wide');\n          keyElement.addEventListener('mousedown', () => {\n            this.toggleLanguage();\n          });\n          break;\n        case 'ArrowUp':\n          keyElement.innerHTML = '<span class=\"arrow arrow__up\">ArrowUp</span>';\n          break;\n        case 'ArrowDown':\n          keyElement.innerHTML = '<span class=\"arrow arrow__down\">ArrowDown</span>';\n          break;\n        case 'ArrowLeft':\n          keyElement.innerHTML = '<span class=\"arrow arrow__left\">ArrowLeft</span>';\n          break;\n        case 'ArrowRight':\n          keyElement.innerHTML = '<span class=\"arrow arrow__right\">ArrowRight</span>';\n          break;\n\n        default:\n          keyElement.textContent = key.toLowerCase();\n          keyElement.addEventListener('click', () => {\n            this.elements.textarea.value += this.props.capsLock\n              ? key.toUpperCase()\n              : key.toLowerCase();\n          });\n          break;\n      }\n\n      fragment.appendChild(keyElement);\n      if (lineBreaks) {\n        fragment.appendChild(document.createElement('br'));\n      }\n    });\n    return fragment;\n  }\n\n  pressKey(event) {\n    this.elements.textarea.blur();\n    if (event.shiftKey && event.altKey) {\n      this.toggleLanguage();\n    }\n    if (event.code === 'ShiftLeft' && this.props.isShiftPressed) {\n      this.toggleCapsLock();\n      this.props.isShiftPressed = false;\n    }\n\n    Object.entries(this.keyLayout).forEach(([key, value]) => {\n      if (event.code === key) {\n        this.elements.keys.forEach((item) => {\n          if (item.textContent.toLowerCase() === value.toLowerCase()) {\n            item.classList.add('keyboard__key_active');\n          }\n        });\n        switch (key) {\n          case 'Backspace':\n            this.elements.textarea.value = this.elements.textarea.value\n              .substring(0, this.elements.textarea.value.length - 1);\n            break;\n          case 'Tab':\n            event.preventDefault();\n            this.elements.textarea.value += '\\t';\n            break;\n          case 'CapsLock':\n            this.toggleCapsLock();\n            break;\n          case 'Enter':\n            this.elements.textarea.value += '\\n';\n            break;\n          case 'Space':\n            event.preventDefault();\n            this.elements.textarea.value += ' ';\n            break;\n          case 'ShiftRight':\n          case 'ShiftLeft':\n          case 'ControlLeft':\n          case 'ControlRight':\n          case 'AltLeft':\n          case 'AltRight':\n          case 'ArrowUp':\n          case 'ArrowDown':\n          case 'ArrowLeft':\n          case 'ArrowRight':\n            event.preventDefault();\n            break;\n\n          default:\n            this.elements.textarea.value += this.props.capsLock\n              ? value.toUpperCase()\n              : value.toLowerCase();\n            break;\n        }\n      }\n    });\n  }\n\n  keyUp(event) {\n    if (event.code === 'ShiftLeft') {\n      this.toggleCapsLock();\n      this.props.isShiftPressed = true;\n    }\n    this.elements.keys.forEach((item) => {\n      if (item.textContent !== 'CapsLock') {\n        item.classList.remove('keyboard__key_active');\n      }\n    });\n  }\n\n  toggleCapsLock() {\n    this.props.capsLock = !this.props.capsLock;\n\n    for (let i = 0; i < this.elements.keys.length; i += 1) {\n      if (this.elements.keys[i].childElementCount === 0) {\n        this.elements.keys[i].textContent = this.props.capsLock\n          ? this.elements.keys[i].textContent.toUpperCase()\n          : this.elements.keys[i].textContent.toLowerCase();\n      } else if (this.elements.keys[i].textContent === 'CapsLock') {\n        this.elements.keys[i].classList.toggle('keyboard__key_active', this.props.capsLock);\n      }\n    }\n  }\n\n  toggleLanguage() {\n    this.props.language = this.props.language === 'en' ? 'ru' : 'en';\n    this.keyLayout = _language__WEBPACK_IMPORTED_MODULE_1__[\"default\"][this.props.language];\n    this.elements.keyContainer.innerHTML = '';\n    this.elements.keyContainer.appendChild(this.createKeys());\n    this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');\n    localStorage.setItem('lang', this.props.language);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Keyboard);\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/language.js":
/*!****************************!*\
  !*** ./src/js/language.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst lang = {\n  en: {\n    Backquote: '`',\n    Digit1: '1',\n    Digit2: '2',\n    Digit3: '3',\n    Digit4: '4',\n    Digit5: '5',\n    Digit6: '6',\n    Digit7: '7',\n    Digit8: '8',\n    Digit9: '9',\n    Digit0: '0',\n    Minus: '-',\n    Equal: '=',\n    Backspace: 'Backspace',\n    Tab: 'Tab',\n    KeyQ: 'q',\n    KeyW: 'w',\n    KeyE: 'e',\n    KeyR: 'r',\n    KeyT: 't',\n    KeyY: 'y',\n    KeyU: 'u',\n    KeyI: 'i',\n    KeyO: 'o',\n    KeyP: 'p',\n    BracketLeft: '[',\n    BracketRight: ']',\n    Backslash: '\\\\',\n    CapsLock: 'CapsLock',\n    KeyA: 'a',\n    KeyS: 's',\n    KeyD: 'd',\n    KeyF: 'f',\n    KeyG: 'g',\n    KeyH: 'h',\n    KeyJ: 'j',\n    KeyK: 'k',\n    KeyL: 'l',\n    Semicolon: ';',\n    Quote: '\\'',\n    Enter: 'Enter',\n    ShiftLeft: 'Shift',\n    KeyZ: 'z',\n    KeyX: 'x',\n    KeyC: 'c',\n    KeyV: 'v',\n    KeyB: 'b',\n    KeyN: 'n',\n    KeyM: 'm',\n    Comma: ',',\n    Period: '.',\n    Slash: '/',\n    ShiftRight: 'Shift',\n    ArrowUp: 'arrowUp',\n    ControlLeft: 'Ctrl',\n    LangSwitch: 'Lang',\n    AltLeft: 'Alt',\n    Space: '#&32',\n    AltRight: 'Alt',\n    ControlRight: '',\n    ArrowLeft: 'arrowLeft',\n    ArrowDown: 'arrowDown',\n    ArrowRight: 'arrowRight',\n  },\n\n  ru: {\n    Backquote: 'ё',\n    Digit1: '1',\n    Digit2: '2',\n    Digit3: '3',\n    Digit4: '4',\n    Digit5: '5',\n    Digit6: '6',\n    Digit7: '7',\n    Digit8: '8',\n    Digit9: '9',\n    Digit0: '0',\n    Minus: '-',\n    Equal: '=',\n    Backspace: 'Backspace',\n    Tab: 'Tab',\n    KeyQ: 'й',\n    KeyW: 'ц',\n    KeyE: 'у',\n    KeyR: 'к',\n    KeyT: 'е',\n    KeyY: 'н',\n    KeyU: 'г',\n    KeyI: 'ш',\n    KeyO: 'щ',\n    KeyP: 'з',\n    BracketLeft: 'х',\n    BracketRight: 'ъ',\n    Backslash: '\\\\',\n    CapsLock: 'CapsLock',\n    KeyA: 'ф',\n    KeyS: 'ы',\n    KeyD: 'в',\n    KeyF: 'а',\n    KeyG: 'п',\n    KeyH: 'р',\n    KeyJ: 'о',\n    KeyK: 'л',\n    KeyL: 'д',\n    Semicolon: 'ж',\n    Quote: 'э',\n    Enter: 'Enter',\n    ShiftLeft: 'Shift',\n    KeyZ: 'я',\n    KeyX: 'ч',\n    KeyC: 'с',\n    KeyV: 'м',\n    KeyB: 'и',\n    KeyN: 'т',\n    KeyM: 'ь',\n    Comma: 'б',\n    Period: 'ю',\n    Slash: '.',\n    ShiftRight: 'Shift',\n    ArrowUp: 'arrowUp',\n    ControlLeft: 'Ctrl',\n    LangSwitch: 'Язык',\n    AltLeft: 'Alt',\n    Space: '#&32',\n    AltRight: 'Alt',\n    ControlRight: '',\n    ArrowLeft: 'arrowLeft',\n    ArrowDown: 'arrowDown',\n    ArrowRight: 'arrowRight',\n  },\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (lang);\n\n//# sourceURL=webpack:///./src/js/language.js?");

/***/ }),

/***/ "./src/js/templateHelper.js":
/*!**********************************!*\
  !*** ./src/js/templateHelper.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst builtHtmlElement = ({ tagName, classList = [''], attrs = {} }) => {\n  const newElement = document.createElement(tagName);\n  newElement.classList.add(...classList);\n  Object.keys(attrs).forEach((key) => newElement.setAttribute(key, attrs[key]));\n  return newElement;\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (builtHtmlElement);\n\n\n//# sourceURL=webpack:///./src/js/templateHelper.js?");

/***/ })

/******/ });