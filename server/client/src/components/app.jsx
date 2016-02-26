
var React = require('react');
var Board = require('./board.jsx');
var Boats = require('./boats.jsx');

var appStore = require('./../stores/appStore.js');
var appActions = require('./../actions/appActions.js');


var App = React.createClass({

  getInitialState: function () {
      return {
        levelChosen: false
      };
  },

  // handleLevelChange: function (event) {
  //   console.log('levelpicked:', event.target.value);
  //   //this sent to stores to know how many ships to place
  //   appActions.setLevel(event.target.value);
  // },

  handleBoardSizeChange: function (event) {
    //this is go to the store to make the correct board size in the store
    appActions.setBoardSize(event.target.value);
    this.setState({
      levelChosen: true
    })
  },

  render: function render () {

    var boats;

    if (this.state.levelChosen) {
      boats = (<Boats />);
    }

    return (
      <div className="container">

        <div className="flexHeader">

          <h1 className="titleCase header spaceRight">Battleships</h1>

        </div>

        <div className="row">
          <div className="col-xs-7 col-md-7">
            <select className="form-control" onChange={this.handleBoardSizeChange}>
              <option>Chose your board size</option>
              <option>8 x 8</option>
              <option>10 x 10</option>
              <option>12 X 12</option>
            </select>
          </div>

          <div className="col-xs-5 col-md-5">

          </div>
        </div>

        <div className="row">

          <div className="col-xs-7 col-md-7">
            <Board/>
          </div>

          <div className="col-xs-5 col-md-5">
            {boats}
          </div>

        </div>

      </div>
    )
  }

});

module.exports = App;