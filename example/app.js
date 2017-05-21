require('../src/scss/input-moment.less');
require('./app.less');

var moment = require('moment');
var React = require('react');
var ReactDOM = require('react-dom');
var InputMoment = require('../src/input-moment');
var packageJson = require('../package.json');

var skus = [
        {
          "max": 5,
          "min": 1,
          "price": {
            "amount": 4779,
            "currency": "USD"
          },
          "quantity": 9999,
          "attributes": {
            "session": "50b414b0-aa30-11e6-9214-f56bc21aa57c",
            "priceType": "e5d30e32-aa2d-11e6-ac42-0242ff1c506a",
            "openDateRange": {
              "dayHash": ".mtwtf.",
              "endDate": "2017-02-21",
              "startDate": "2017-02-17"
            }
          },
          "lvmamaPrice": {
            "amount": 32500,
            "currency": "CNY"
          },
          "retailPrice": {
            "amount": 5441,
            "currency": "USD"
          }
        },
        {
          "max": 5,
          "min": 1,
          "price": {
            "amount": 6838,
            "currency": "USD"
          },
          "quantity": 9999,
          "attributes": {
            "session": "50b414b0-aa30-11e6-9214-f56bc21aa57c",
            "priceType": "e5d30e32-aa2d-11e6-ac42-0242ff1c506a",
            "openDateRange": {
              "dayHash": "smtwtfs",
              "endDate": "2017-02-19",
              "startDate": "2017-02-18"
            }
          },
          "lvmamaPrice": {
            "amount": 46500,
            "currency": "CNY"
          },
          "retailPrice": {
            "amount": 7338,
            "currency": "USD"
          }
        },
        {
          "max": 5,
          "min": 1,
          "price": {
            "amount": 4853,
            "currency": "USD"
          },
          "quantity": 9999,
          "attributes": {
            "session": "50b414b0-aa30-11e6-9214-f56bc21aa57c",
            "priceType": "e5d30e32-aa2d-11e6-ac42-0242ff1c506a",
            "openDateRange": {
              "dayHash": ".mtwtf.",
              "endDate": "2017-04-02",
              "startDate": "2017-02-22"
            }
          },
          "lvmamaPrice": {
            "amount": 33000,
            "currency": "CNY"
          },
          "retailPrice": {
            "amount": 5441,
            "currency": "USD"
          }
        },
        {
          "max": 5,
          "min": 1,
          "price": {
            "amount": 6912,
            "currency": "USD"
          },
          "quantity": 9999,
          "attributes": {
            "session": "50b414b0-aa30-11e6-9214-f56bc21aa57c",
            "priceType": "e5d30e32-aa2d-11e6-ac42-0242ff1c506a",
            "openDateRange": {
              "dayHash": "s.....s",
              "endDate": "2017-04-01",
              "startDate": "2017-02-25"
            }
          },
          "lvmamaPrice": {
            "amount": 47000,
            "currency": "CNY"
          },
          "retailPrice": {
            "amount": 7338,
            "currency": "USD"
          }
        },
        {
          "max": 5,
          "min": 1,
          "price": {
            "amount": 7059,
            "currency": "USD"
          },
          "quantity": 9999,
          "attributes": {
            "session": "50b414b0-aa30-11e6-9214-f56bc21aa57c",
            "priceType": "e5d30e32-aa2d-11e6-ac42-0242ff1c506a",
            "openDateRange": {
              "dayHash": "smtwtfs",
              "endDate": "2017-04-04",
              "startDate": "2017-04-02"
            }
          },
          "lvmamaPrice": {
            "amount": 48000,
            "currency": "CNY"
          },
          "retailPrice": {
            "amount": 7338,
            "currency": "USD"
          }
        },
        {
          "max": 5,
          "min": 1,
          "price": {
            "amount": 6912,
            "currency": "USD"
          },
          "quantity": 9999,
          "attributes": {
            "session": "50b414b0-aa30-11e6-9214-f56bc21aa57c",
            "priceType": "e5d30e32-aa2d-11e6-ac42-0242ff1c506a",
            "openDateRange": {
              "dayHash": "s.....s",
              "endDate": "2017-04-23",
              "startDate": "2017-04-03"
            }
          },
          "lvmamaPrice": {
            "amount": 47000,
            "currency": "CNY"
          },
          "retailPrice": {
            "amount": 7338,
            "currency": "USD"
          }
        },
        {
          "max": 5,
          "min": 1,
          "price": {
            "amount": 4853,
            "currency": "USD"
          },
          "quantity": 9999,
          "attributes": {
            "session": "50b414b0-aa30-11e6-9214-f56bc21aa57c",
            "priceType": "e5d30e32-aa2d-11e6-ac42-0242ff1c506a",
            "openDateRange": {
              "dayHash": ".mtwtf.",
              "endDate": "2017-04-28",
              "startDate": "2017-04-05"
            }
          },
          "lvmamaPrice": {
            "amount": 33000,
            "currency": "CNY"
          },
          "retailPrice": {
            "amount": 5441,
            "currency": "USD"
          }
        },
        {
          "max": 5,
          "min": 1,
          "price": {
            "amount": 7059,
            "currency": "USD"
          },
          "quantity": 9999,
          "attributes": {
            "session": "50b414b0-aa30-11e6-9214-f56bc21aa57c",
            "priceType": "e5d30e32-aa2d-11e6-ac42-0242ff1c506a",
            "openDateRange": {
              "dayHash": "smtwtfs",
              "endDate": "2017-04-30",
              "startDate": "2017-04-29"
            }
          },
          "lvmamaPrice": {
            "amount": 48000,
            "currency": "CNY"
          },
          "retailPrice": {
            "amount": 7338,
            "currency": "USD"
          }
        }
      ];

var App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      m: moment()
    };
  },

  render() {
    return (
      <div className="app">
        <h1>{packageJson.name}</h1>
        <h2>{packageJson.description}</h2>
        <form>
        <div className="input">
          <input
            type="text"
            value={this.state.m.format('llll')}
            readOnly
          />
        </div>
        <InputMoment
          moment={this.state.m}
          onChange={this.handleChange}
          onSave={this.handleSave}
          skus={skus}
        />
        </form>
      </div>
    );
  },

  handleChange(m) {
    this.setState({ m });
  },

  handleSave() {
    console.log('saved', this.state.m.format('llll'));
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
