import React from 'react';
import cx from 'classnames';
import moment from 'moment'
import _omit from 'lodash/omit'
import _range from 'lodash/range'
import _chunk from 'lodash/chunk'
import _isEqual from 'lodash/isEqual'

class Day extends React.Component {
  static defaultProps = {
    priceSymbol: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    var i = this.props.i;
    var w = this.props.w;
    var prevMonth = (w === 0 && i > 7);
    var nextMonth = (w >= 4 && i <= 14);
    var props = _omit(this.props, 'i', 'w', 'className', 'mapDate2Price', 'momentInstance', 'priceSymbol');
    var momentInstance = this.props.momentInstance.clone();
    var price = '', classNameObj = {};

    prevMonth && momentInstance.subtract(1, 'month');
    nextMonth && momentInstance.add(1, 'month');
    momentInstance.date(i);

    classNameObj[this.props.styleNamespace['prev-month']] = prevMonth;
    classNameObj[this.props.styleNamespace['next-month']] = nextMonth;
    classNameObj[this.props.styleNamespace['current-day']] = momentInstance.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');

    props.className = cx(classNameObj);
    price = this.props.mapDate2Price[momentInstance.format('YYYY-MM-DD')];
    return (
      <td {...props}>
        <span className={this.props.styleNamespace['day_left_top']}>{i}</span>
        <span className={this.props.styleNamespace['price_right_bottom']} >{price && (this.props.priceSymbol + '' + price)}</span>
      </td>
    );
  }
}

export default class Calendar extends React.Component {
  static defaultProps = {
    mapDate2Price: ''
  }

  constructor(props) {
    super(props);
    this.mapDate2Price = this.props.mapDate2Price || this.getMapFromSkus();
    this.nextMonth = this.nextMonth.bind(this)
    this.prevMonth = this.prevMonth.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(_isEqual(this.props, nextProps) && !nextProps.mapDate2Price){
      this.mapDate2Price = this.getMapFromSkus()
    }
  }

  getMapFromSkus() {
    let skus = this.props.skus;
    let startDate, endDate, dayHash, map = {};
    skus && skus.forEach((sku) => {
      sku.attributes.forEach((attr) => {
        if (attr.name == 'openDateRange') {
          dayHash = attr.value.dayHash;
          startDate = moment(attr.value.startDate);
          endDate = moment(attr.value.endDate);

          while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
            if (dayHash[startDate.day()] != '.') {
              map[startDate.format('YYYY-MM-DD')] = sku.lvmamaPrice.amount;
            }
            startDate.add(1, 'day')
          }
        }
      })
    })
    return map;
  }


  prevMonth(e) {
    e.preventDefault();
    this.props.momentInstance.subtract(1, 'month');
    this.forceUpdate()
  }

  nextMonth(e) {
    e.preventDefault();
    this.props.momentInstance.add(1, 'month');
    this.forceUpdate()
  }
  render() {
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
    var days = [].concat(
      _range(allDatesInPrevMonth - weeksOfFristInCurMonth + 1, allDatesInPrevMonth + 1),
      _range(1, allDatesInCurMonth + 1),
      _range(1, 42 - allDatesInCurMonth - weeksOfFristInCurMonth + 1)
    );

    var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className={cx(this.props.styleNamespace['m-calendar'], this.props.className)}>
        <div className={this.props.styleNamespace.toolbar}>
          <button type="button" className={this.props.styleNamespace["prev-month"]} onClick={this.prevMonth}>
            <i className={this.props.prevMonthIcon} />
          </button>
          <span className={this.props.styleNamespace["current-date"]}>{momentInstance.format('MMMM YYYY')}</span>
          <button type="button" className={this.props.styleNamespace["next-month"]} onClick={this.nextMonth}>
            <i className={this.props.nextMonthIcon} />
          </button>
        </div>

        <table>
          <thead>
          <tr>
            {weeks.map((w, i) => <td key={i}>{w}</td>)}
          </tr>
          </thead>

          <tbody>
          {
            _chunk(days, 7).map((row, w) => (
              <tr key={w}>
                {row.map((i) => (
                  <Day key={i}
                       i={i}
                       w={w}
                       mapDate2Price={this.mapDate2Price}
                       momentInstance={this.props.momentInstance}
                       styleNamespace={this.props.styleNamespace}
                       priceSymbol={this.props.priceSymbol}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

}

