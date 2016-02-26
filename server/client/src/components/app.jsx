
var React = require('react');
var Board = require('./board.jsx');
var Boats = require('./boats.jsx');

var appStore = require('./../stores/appStore.js');
var appActions = require('./../actions/appActions.js');


var App = React.createClass({

  // handleLevelChange: function (event) {
  //   console.log('levelpicked:', event.target.value);
  //   //this sent to stores to know how many ships to place
  //   appActions.setLevel(event.target.value);
  // },

  handleBoardSizeChange: function (event) {
    //this is go to the store to make the correct board size in the store
    appActions.setBoardSize(event.target.value);
  },

  render: function render () {

    return (
      <div className="container">

        <div className="flexHeader">

          <h1 className="titleCase header spaceRight">Battleships</h1>

        </div>

        <div className="row">
          <div className="col-xs-8 col-md-8">
            <select className="form-control" onChange={this.handleBoardSizeChange}>
              <option>Chose your board size</option>
              <option>8 x 8</option>
              <option>10 x 10</option>
              <option>12 X 12</option>
            </select>
          </div>

          <div className="col-xs-4 col-md-4">

          </div>
        </div>

        <div className="row">
          <div className="col-xs-8 col-md-8">
            <Board />
          </div>

          <div className="col-xs-4 col-md-4">
            <Boats />
          </div>

        </div>

      </div>
    )
  }

});

module.exports = App;