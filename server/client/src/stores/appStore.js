
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = "change";
var utils = require('./utils.js');


var _board;

var _hits = {
  "Aircraft carrier": 5,
  "Battleship": 4,
  "Submarine": 3,
  "Cruiser": 3,
  "Destroyer": 2
};

var _boats = [
              {type: "Aircraft carrier", length: 5},
              {type: "Battleship", length: 4},
              {type: "Submarine", length: 3},
              {type: "Cruiser", length: 3},
              {type: "Destroyer", length: 2}
              ];

var appStore = Object.assign(new EventEmitter (), {
  
  getBoardData: function(){
    return _board;
  },

  getBoatData: function () {
    return _hits;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.addListener(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function (payload) { //'subscribes' to the dispatcher. Store wants to know if it does anything. Payload 
  var action = payload.action;//payload is the object of data coming from dispactcher //action is the object passed from the actions file

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
      _hits[cell.shipType] -= 1;
    } else {
      cell.isClicked = true;
    }
    appStore.emitChange();
  }

});


module.exports = appStore;

