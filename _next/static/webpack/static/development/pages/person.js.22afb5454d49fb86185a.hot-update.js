webpackHotUpdate("static/development/pages/person.js",{

/***/ "./pages/person.js":
/*!*************************!*\
  !*** ./pages/person.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/reflect/construct */ "./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-markdown */ "./node_modules/react-markdown/lib/react-markdown.js");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _content_output_people_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../content/output/people.json */ "./content/output/people.json");
var _content_output_people_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../content/output/people.json */ "./content/output/people.json", 1);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./header */ "./pages/header.js");
/* harmony import */ var _publications__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./publications */ "./pages/publications.js");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./footer */ "./pages/footer.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(this).constructor; result = _babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default()(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default.a) return false; if (_babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default.a.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default()(Date, [], function () {})); return true; } catch (e) { return false; } }








var Person = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(Person, _React$Component);

  var _super = _createSuper(Person);

  function Person() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Person);

    return _super.apply(this, arguments);
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Person, [{
    key: "renderLink",
    value: function renderLink(person, key) {
      if (!person[key]) {
        return '';
      }

      var title = key;

      if (key === 'scholar') {
        title = 'Google Scholar';
      } else {
        title = person[key].split('/')[3];
      }

      var href;
      var icon;

      switch (key) {
        case 'scholar':
          icon = 'fas fa-graduation-cap fa-fw';
          break;

        case 'twitter':
          icon = 'fab fa-twitter fa-fw';
          break;

        case 'facebook':
          icon = 'fab fa-facebook-square fa-fw';
          break;

        case 'cv':
          icon = 'far fa-file fa-fw';
          break;

        case 'github':
          icon = 'fab fa-github-alt fa-fw';
          break;

        case 'email':
          icon = 'far fa-envelope fa-fw';
          break;

        case 'linkedin':
          icon = 'fab fa-linkedin-in fa-fw';
          break;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "item"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: person[key],
        target: "_blank",
        style: {
          fontSize: '1.2em'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("i", {
        className: icon
      }), title));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var person = _content_output_people_json__WEBPACK_IMPORTED_MODULE_10__.filter(function (person) {
        return person.name.replace(' ', '-').toLowerCase() === _this.props.id;
      })[0];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("title", null, "".concat(person.name, " - Interactions Lab | University of Calgary")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_header__WEBPACK_IMPORTED_MODULE_11__["default"], {
        current: "People"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "ui stackable grid"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "one wide column"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "eleven wide column centered"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        id: "person",
        className: "category",
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("img", {
        className: "ui small circular image",
        src: "/static/images/people/".concat(this.props.id, ".jpg"),
        style: {
          margin: 'auto'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("h1", null, person.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", null, person.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: person.url,
        target: "_blank"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("i", {
        className: "fas fa-link fa-fw"
      }), person.url)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        class: "ui horizontal small divided link list"
      }, ['scholar', 'cv', 'email', 'facebook', 'twitter', 'github', 'linkedin'].map(function (key) {
        return _this.renderLink(person, key);
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_publications__WEBPACK_IMPORTED_MODULE_12__["default"], {
        author: person.name
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "one wide column"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_footer__WEBPACK_IMPORTED_MODULE_13__["default"], null));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(req) {
        var id;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.query.id;
                return _context.abrupt("return", {
                  id: id
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return Person;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Person);

/***/ })

})
//# sourceMappingURL=person.js.22afb5454d49fb86185a.hot-update.js.map