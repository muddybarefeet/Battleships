
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = "change";
var utils = require('./utils.js');


var _board;

var _totals = {
  totalHits: 0,
  leftToHit: 17
};

var _boats = [
              {type: "Aircraft carrier", length: 5, hits: 0, opacity: 0.1},
              {type: "Battleship", length: 4, hits: 0, opacity: 0.1},
              {type: "Submarine", length: 3, hits: 0, opacity: 0.1},
              {type: "Cruiser", length: 3, hits: 0, opacity: 0.1},
              {type: "Destroyer", length: 2, hits: 0, opacity: 0.1}
              ];

var appStore = Object.assign(new EventEmitter (), {
  
  getBoardData: function(){
    return _board;
  },

  getBoatData: function () {
    return _boats;
  },

  getTotalsData: function () {
    return _totals;
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
      for (var i = 0; i < _boats.length; i++) {
        if (_boats[i].type === cell.shipType) {
          _boats[i].hits += 1;

          if (_boats[i].hits === _boats[i].length) {
            _boats[i].opacity = 1;
          } else {
            _boats[i].opacity = _boats[i].hits/_boats[i].length;
          }
        }
        break;
      }
      _totals.totalHits += 1;
      _totals.leftToHit -= 1;

    } else {
      cell.isClicked = true;
    }
    appStore.emitChange();
  }

});


module.exports = appStore;

