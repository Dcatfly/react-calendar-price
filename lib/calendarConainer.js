'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _inputMoment = require('./scss/input-moment');

var _inputMoment2 = _interopRequireDefault(_inputMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var calendarConainer = function (_React$Component) {
  _inherits(calendarConainer, _React$Component);

  function calendarConainer(props) {
    _classCallCheck(this, calendarConainer);

    var _this = _possibleConstructorReturn(this, (calendarConainer.__proto__ || Object.getPrototypeOf(calendarConainer)).call(this, props));

    _this.momentInstance = (0, _moment2.default)();
    return _this;
  }

  _createClass(calendarConainer, [{
    key: 'render',
    value: function render() {
      var props = (0, _omit3.default)(this.props, 'className', 'moment', 'prevMonthIcon', 'nextMonthIcon', 'onSave', 'skus', 'mapDate2Price', 'priceSymbol');
      props.className = (0, _classnames2.default)(_inputMoment2.default['m-input-moment'], this.props.className);
      return _react2.default.createElement(
        'div',
        props,
        _react2.default.createElement(
          'div',
          { className: _inputMoment2.default.tabs },
          _react2.default.createElement(_calendar2.default, {
            className: (0, _classnames2.default)(_inputMoment2.default['tab'], _inputMoment2.default['is-active']),
            momentInstance: this.momentInstance,
            onChange: this.props.onChange,
            prevMonthIcon: this.props.prevMonthIcon,
            nextMonthIcon: this.props.nextMonthIcon,
            skus: this.props.skus,
            styleNamespace: _inputMoment2.default,
            mapDate2Price: this.props.mapDate2Price,
            priceSymbol: this.props.priceSymbol
          })
        )
      );
    }
  }]);

  return calendarConainer;
}(_react2.default.Component);

calendarConainer.defaultProps = {
  prevMonthIcon: 'fa fa-angle-left',
  nextMonthIcon: 'fa fa-angle-right'
};
calendarConainer.contextTypes = {
  prevMonthIcon: _react2.default.PropTypes.string,
  nextMonthIcon: _react2.default.PropTypes.string,
  skus: _react2.default.PropTypes.array,
  mapDate2Price: _react2.default.PropTypes.object,
  priceSymbol: _react2.default.PropTypes.string
};
exports.default = calendarConainer;