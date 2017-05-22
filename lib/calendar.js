'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _range2 = require('lodash/range');

var _range3 = _interopRequireDefault(_range2);

var _chunk2 = require('lodash/chunk');

var _chunk3 = _interopRequireDefault(_chunk2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_React$Component) {
  _inherits(Day, _React$Component);

  function Day(props) {
    _classCallCheck(this, Day);

    return _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, props));
  }

  _createClass(Day, [{
    key: 'render',
    value: function render() {
      var i = this.props.i;
      var w = this.props.w;
      var prevMonth = w === 0 && i > 7;
      var nextMonth = w >= 4 && i <= 14;
      var props = (0, _omit3.default)(this.props, 'i', 'w', 'className', 'mapDate2Price', 'momentInstance', 'priceSymbol');
      var momentInstance = this.props.momentInstance.clone();
      var price = '',
          classNameObj = {};

      prevMonth && momentInstance.subtract(1, 'month');
      nextMonth && momentInstance.add(1, 'month');
      momentInstance.date(i);

      classNameObj[this.props.styleNamespace['prev-month']] = prevMonth;
      classNameObj[this.props.styleNamespace['next-month']] = nextMonth;
      classNameObj[this.props.styleNamespace['current-day']] = momentInstance.format('YYYY-MM-DD') === (0, _moment2.default)().format('YYYY-MM-DD');

      props.className = (0, _classnames2.default)(classNameObj);
      price = this.props.mapDate2Price[momentInstance.format('YYYY-MM-DD')];
      return _react2.default.createElement(
        'td',
        props,
        _react2.default.createElement(
          'span',
          { className: this.props.styleNamespace['day_left_top'] },
          i
        ),
        _react2.default.createElement(
          'span',
          { className: this.props.styleNamespace['price_right_bottom'] },
          price && this.props.priceSymbol + '' + price
        )
      );
    }
  }]);

  return Day;
}(_react2.default.Component);

Day.defaultProps = {
  priceSymbol: ''
};

var Calendar = function (_React$Component2) {
  _inherits(Calendar, _React$Component2);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this2 = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this2.mapDate2Price = _this2.props.mapDate2Price || _this2.getMapFromSkus();
    _this2.nextMonth = _this2.nextMonth.bind(_this2);
    _this2.prevMonth = _this2.prevMonth.bind(_this2);
    return _this2;
  }

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((0, _isEqual3.default)(this.props, nextProps) && !nextProps.mapDate2Price) {
        this.mapDate2Price = this.getMapFromSkus();
      }
    }
  }, {
    key: 'getMapFromSkus',
    value: function getMapFromSkus() {
      var skus = this.props.skus;
      var startDate = void 0,
          endDate = void 0,
          dayHash = void 0,
          map = {};
      skus && skus.forEach(function (sku) {
        sku.attributes.forEach(function (attr) {
          if (attr.name == 'openDateRange') {
            dayHash = attr.value.dayHash;
            startDate = (0, _moment2.default)(attr.value.startDate);
            endDate = (0, _moment2.default)(attr.value.endDate);

            while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
              if (dayHash[startDate.day()] != '.') {
                map[startDate.format('YYYY-MM-DD')] = sku.lvmamaPrice.amount;
              }
              startDate.add(1, 'day');
            }
          }
        });
      });
      return map;
    }
  }, {
    key: 'prevMonth',
    value: function prevMonth(e) {
      e.preventDefault();
      this.props.momentInstance.subtract(1, 'month');
      this.forceUpdate();
    }
  }, {
    key: 'nextMonth',
    value: function nextMonth(e) {
      e.preventDefault();
      this.props.momentInstance.add(1, 'month');
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var momentInstance = this.props.momentInstance;
      //今天是当前月的第几天
      var dateOfNowInCurMonth = momentInstance.date();
      //上个月多少天
      var allDatesInPrevMonth = momentInstance.clone().subtract(1, 'month').endOf('month').date();
      //当前月第一天是周几
      var weeksOfFristInCurMonth = momentInstance.clone().date(1).day();
      // 当前月共有几天
      var allDatesInCurMonth = momentInstance.clone().endOf('month').date();
      //6 * 7 = 42
      var days = [].concat((0, _range3.default)(allDatesInPrevMonth - weeksOfFristInCurMonth + 1, allDatesInPrevMonth + 1), (0, _range3.default)(1, allDatesInCurMonth + 1), (0, _range3.default)(1, 42 - allDatesInCurMonth - weeksOfFristInCurMonth + 1));

      var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(this.props.styleNamespace['m-calendar'], this.props.className) },
        _react2.default.createElement(
          'div',
          { className: this.props.styleNamespace.toolbar },
          _react2.default.createElement(
            'button',
            { type: 'button', className: this.props.styleNamespace["prev-month"], onClick: this.prevMonth },
            _react2.default.createElement('i', { className: this.props.prevMonthIcon })
          ),
          _react2.default.createElement(
            'span',
            { className: this.props.styleNamespace["current-date"] },
            momentInstance.format('MMMM YYYY')
          ),
          _react2.default.createElement(
            'button',
            { type: 'button', className: this.props.styleNamespace["next-month"], onClick: this.nextMonth },
            _react2.default.createElement('i', { className: this.props.nextMonthIcon })
          )
        ),
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              weeks.map(function (w, i) {
                return _react2.default.createElement(
                  'td',
                  { key: i },
                  w
                );
              })
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            (0, _chunk3.default)(days, 7).map(function (row, w) {
              return _react2.default.createElement(
                'tr',
                { key: w },
                row.map(function (i) {
                  return _react2.default.createElement(Day, { key: i,
                    i: i,
                    w: w,
                    mapDate2Price: _this3.mapDate2Price,
                    momentInstance: _this3.props.momentInstance,
                    styleNamespace: _this3.props.styleNamespace,
                    priceSymbol: _this3.props.priceSymbol
                  });
                })
              );
            })
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react2.default.Component);

Calendar.defaultProps = {
  mapDate2Price: ''
};
exports.default = Calendar;