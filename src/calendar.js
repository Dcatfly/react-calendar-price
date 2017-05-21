var cx = require('classnames');
var blacklist = require('blacklist');
var moment = require('moment');
var React = require('react');
var range = require('lodash/range');
var chunk = require('lodash/chunk');

var Day = React.createClass({
  displayName: 'Day',

  render() {
    var i = this.props.i;
    var w = this.props.w;
    var prevMonth = (w === 0 && i > 7);
    var nextMonth = (w >= 4 && i <= 14);
    var props = blacklist(this.props, 'i', 'w', 'd', 'className', 'mapDate2Price', 'm');
    var m = this.props.m.clone();
    m.day(i)
    prevMonth && m.subtract(1, 'month')
    nextMonth && m.add(1, 'month')
    props.className = cx({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': !prevMonth && !nextMonth && (i === this.props.d)
    });

    return <td {...props}><span className='day_left_top'>{i}</span><span className='price_right_bottom' style={{ color: 'red' }}>{this.props.mapDate2Price[m.format('YYYY-MM-DD')]}</span></td>;
  }
});

module.exports = React.createClass({
  displayName: 'Calendar',

  render() {
    // debugger
    var m = this.props.moment;
    //今天是当前月的第几天
    var d = m.date();
    //上个月多少天
    var d1 = m.clone().subtract(1, 'month').endOf('month').date();
    //当前月第一天是周几
    var d2 = m.clone().date(1).day();
    // 当前月共有几天
    var d3 = m.clone().endOf('month').date();
    //
    var days = [].concat(
      range(d1 - d2 + 1, d1 + 1),
      range(1, d3 + 1),
      range(1, 42 - d3 - d2 + 1)
    );

    var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var mapDate2Price = this.getMapFromSkus();
    return (
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button type="button" className="prev-month" onClick={this.prevMonth}>
            <i className={this.props.prevMonthIcon} />
          </button>
          <span className="current-date">{m.format('MMMM YYYY')}</span>
          <button type="button" className="next-month" onClick={this.nextMonth}>
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
              chunk(days, 7).map((row, w) => (
                <tr key={w}>
                  {row.map((i) => (
                    <Day key={i}
                      i={i}
                      d={d}
                      w={w}
                      mapDate2Price={mapDate2Price}
                      m={this.props.moment}

                    />
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  },
  getMapFromSkus() {
    debugger
    let skus = this.props.skus;
    let startDate, endDate, dayHash, map = {};
    skus && skus.forEach((sku) => {
      dayHash = sku.attributes.openDateRange.dayHash;
      startDate = moment(sku.attributes.openDateRange.startDate);
      endDate = moment(sku.attributes.openDateRange.endDate);
      while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
        if (dayHash[startDate.day()] != '.') {
          map[startDate.format('YYYY-MM-DD')] = sku.lvmamaPrice.amount / 100;
        }
        startDate.add(1, 'day')
      }
    })
    return map;
  },


  prevMonth(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  },

  nextMonth(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'month'));
  }
});
