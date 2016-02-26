//generate a random position
var genRandomPosition = function () {
  var positionChoice = ['left', 'up', 'right', 'down'];
  var num = Math.floor((Math.random()*3));
  return positionChoice[num];
};

//generate a random number to be used as a coordinate
var genCoord = function (size) {
  return Math.floor((Math.random()*size));
};

//get the coords that the boat can be placed at
var getAllCoordsForBoat = function (board, boat, position, row, col, size) {

  var coords = [];

  var boatLength = boat.length;

  while (boatLength > 0) {
    // debugger;
    if (position === 'left' && board[row][col-1]) {
      if (board[row][col-1].isShip === false && col-1 >= 0) {
        col -= 1;
        boatLength -= 1;
        board[row][col-1].shipType = boat.type;
        coords.push([row,col]);
      } else {
        boatLength = 0;
      }
    } else if (position === 'up' && board[row-1]) {
      if (board[row-1][col].isShip === false && row-1 >= 0) {
        row -= 1;
        boatLength -= 1;
        board[row-1][col].shipType = boat.type;
        coords.push([row, col]);
      } else {
        boatLength = 0;
      }
    } else if (position === 'right' && board[row][col+1]) {
      if (board[row][col+1].isShip === false && col+1 < size) {
        col += 1;
        boatLength -= 1;
        board[row][col+1].shipType = boat.type;
        coords.push([row, col]);
      } else {
        boatLength = 0;
      }
    } else if (position === 'down' && board[row+1]) {
      if (board[row+1][col].isShip === false && row+1 < size) {
        row += 1;
        boatLength -= 1;
        board[row+1][col].shipType = boat.type;
        coords.push([row, col]);
      } else {
        boatLength = 0;
      }
    } else {
      boatLength = 0;
    }

  }

  return coords;

};

//take the validated coords and plot to the board
var plotBoats = function (board, coords) {

  //take the board and loop throught the given coords and plot on the board
  for (var i = 0; i < coords.length; i++) {
    //take the coord and plot to the board
    board[coords[i][0]][coords[i][1]].isShip = true;
  }

  return board;

};


var utils = {
  //lay out the board for the store
  makeBoard: function (size) {
    //take the size and return a matrix of arrays to be the board
    //number staring passed in so make it a number
    size = parseInt(size, 10);

    var board = [];

    for (var k = 0; k < size; k++) {
      var row = [];
      for (var i = 0; i < size; i++) {
         row.push({
          isClicked:false,
          isHit: false,
          isShip: false,
          shipType: null
        });
      }
      board.push(row);
      row = [];
    }

    return board;

  },

  //main function to place the boats
  layShips: function (board, size, boats) {
    //boats is an array of objects containing information on the boats
    for (var i = 0; i < boats.length; i++) {

      var pos = genRandomPosition();
      var row = genCoord(size-1);
      var col = genCoord(size-1);

      if (board[row][col].isShip === false) {

        var coords = getAllCoordsForBoat(board, boats[i], pos, row, col, size);
        console.log('coords', coords, 'boat length', boats[i].length);

        if (coords.length === boatLength) {
          board = plotBoats(board, coords);
        } else {
          i--;
        }

      } else {
        i--;
      }

    }

    return board;

  }

};

module.exports = utils;


