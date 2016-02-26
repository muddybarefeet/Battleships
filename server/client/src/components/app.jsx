
var React = require('react');
var Board = require('./board.jsx');

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
      <div>
        {/*here we have the main page which containtains a title, level-picker, board-size and board*/}
        <h1>Battleships</h1>

        {/*<select className="form-control" onChange={this.handleLevelChange}>
          <option>Pick th' level t' play at</option>
          <option>Learning</option>
          <option>Improver</option>
          <option>Ninja</option>
        </select>*/}

        <select className="form-control" onChange={this.handleBoardSizeChange}>
          <option>Pick wha' size o' board ye wants</option>
          <option>10 x 10</option>
          <option>15 x 15</option>
          <option>20 x 20</option>
        </select>

        <Board />

      </div>
    )
  }

});

module.exports = App;