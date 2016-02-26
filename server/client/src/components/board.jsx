var React = require('react');

var appStore = require('./../stores/appStore.js');
var appActions = require('./../actions/appActions.js');

var Board = React.createClass({
  
  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
    appStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    appStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
  //set the new state of the component when triggered by the event listener in the store
    //on choosing a board size and changing the level then the board can be rendered to the page
    this.setState({
      board: appStore.getBoardData()
    });

  },

  handleClick: function (rowNum, colNum) {
    appActions.handleClickedCell(rowNum, colNum);
  },
  
  render: function () {

      var board;

      if (this.state.board) {
        var that = this;
        board = this.state.board.map(function (row, index) {
          //make the row a row and the cells cells
          var cells = row.map(function (cell, i) {
            if (cell.isClicked && cell.isHit) {
              return (<td onClick={that.handleClick.bind(null, index, i)} key={i}><img className="tileWidth" src="./../assets/images/bomb.png" /></td>); //currently just put a cell on the page
            } else if (cell.isClicked && !cell.isHit) {
              return (<td onClick={that.handleClick.bind(null, index, i)} key={i}><img className="tileWidth" src="./../assets/images/waveTile.jpg" /></td>);
            } else {
              return (<td onClick={that.handleClick.bind(null, index, i)} key={i}></td>);
            }
          });
          return (<tr key={index}>{cells}</tr>);
        });

      }

      return (
     
      <div>
        {/*here we will have a map function that will map over the contents of the store and render to the page*/}

        <table>
          <tbody>
            {board}
          </tbody>
        </table>

      </div>

      );
  }
});

module.exports = Board;


