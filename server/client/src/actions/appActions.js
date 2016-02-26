
var appDispatcher = require('./../dispatchers/appDispatcher.js');

var appActions = {

  setBoardSize: function (boardSize) {
    appDispatcher.handleClientAction({
      actionType: "SET_BOARD_SIZE",
      data: boardSize
    });
  },

  handleClickedCell: function (row, col) {
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


 



