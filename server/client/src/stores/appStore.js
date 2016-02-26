
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = "change";
var utils = require('./utils.js');


var _board;

//to be implemented when need to use levels
// var _data = {
//   level: null
// };

var _boats = [5,4,3,3,2];

var appStore = Object.assign(new EventEmitter (), {
  
  getBoardData: function(){
    return _board;
  },

  emitChange: function (){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.addListener(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register( function (payload){ //'subscribes' to the dispatcher. Store wants to know if it does anything. Payload 
  var action = payload.action;//payload is the object of data coming from dispactcher //action is the object passed from the actions file

  //not suitable for this game use for minesweeper
  // if(action.actionType === "SET_LEVEL") {
  //   console.log('level chosen and sent to the store', action.data);
  //   if (action.data === 'Learning') {
  //     _data.level = 1;
  //   } else if (action.data === 'Improver') {
  //     _data.level = 2;
  //   } else if (action.data === 'Ninja') {
  //     _data.level = 3;
  //   }

  // }

  if (action.actionType === "SET_BOARD_SIZE") {
    //make the correct board size
    _board = utils.makeBoard(action.data.split(' ')[0]);
    //fill the board with boats of the sizes above
    _board = utils.layShips(_board, action.data.split(' ')[0], _boats);
    appStore.emitChange();
  }

  if (action.actionType ==="CLICKED_CELL") {
    //check out its position in the board and render the correct image/colour to the user
    var cell = _board[action.data.row][action.data.col];
    if (cell.isShip) {
      cell.isClicked = true;
      cell.isHit = true;
    } else {
      cell.isClicked = true;
    }
    appStore.emitChange();
  }

});


module.exports = appStore;

