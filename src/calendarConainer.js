import React from 'react';
import cx from 'classnames';
import Calendar from './calendar';

import calendarStyles from './scss/input-moment.scss'

export default class calendarConainer extends React.Component {
  static defaultProps = {
    prevMonthIcon: 'fa fa-angle-left',
    nextMonthIcon: 'fa fa-angle-right'
  }
  static contextTypes = {
    prevMonthIcon: React.PropTypes.string,
    nextMonthIcon: React.PropTypes.string,
    skus: React.PropTypes.array,
    mapDate2Price: React.PropTypes.object,
    priceSymbol: React.PropTypes.string
  }
  constructor(props) {
    super(props);
    this.momentInstance = moment();
  }
  render() {
    var props = _.omit(this.props, 'className', 'moment', 'prevMonthIcon', 'nextMonthIcon', 'onSave', 'skus', 'mapDate2Price', 'priceSymbol');
    props.className = cx(calendarStyles['m-input-moment'], this.props.className);
    return (
      <div {...props}>

        <div className={calendarStyles.tabs}>
          <Calendar
            className={cx(calendarStyles['tab'], calendarStyles['is-active'])}
            momentInstance={this.momentInstance}
            onChange={this.props.onChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
            skus={this.props.skus}
            styleNamespace={calendarStyles}
            mapDate2Price={this.props.mapDate2Price}
            priceSymbol={this.props.priceSymbol}
          />

        </div>

      </div>
    );
  }
}
