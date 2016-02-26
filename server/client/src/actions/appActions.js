
var appDispatcher = require('./../dispatchers/appDispatcher.js');

var appActions = {

  setLevel: function (level) {
    appDispatcher.handleClientAction({
      actionType: "SET_LEVEL",
      data: level
    });
  },

  setBoardSize: function (boardSize) {
    appDispatcher.handleClientAction({
      actionType: "SET_BOARD_SIZE",
      data: boardSize
    });
  },

  handleClickedCell: function (row, col) {
    console.log('got coords', row, col);
    appDispatcher.handleClientAction({
      actionType: "CLICKED_CELL",
      data: {
        row: row,
        col: col
      }
    });
  }

};


module.exports = appActions;


 



