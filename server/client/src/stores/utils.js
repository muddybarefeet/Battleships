
var genRandomPosition = function () {
  var positionChoice = ['left', 'up', 'right', 'down'];
  var num = Math.floor((Math.random()*3));
  return positionChoice[num];
};

var genCoord = function (size) {
  return Math.floor((Math.random()*size))+1;
};

var getAllCoordsForBoat = function (board, boatLength, position, row, col, size) {

  var coords = [];

  while (boatLength > 0) {

    if (position === 'left' && board[row][col-1].isShip === false && col-1 >= 0) {
      col -= 1;
      boatLength -= 1;
      coords.push([row,col]);
    } else if (position === 'up' && board[row-1][col].isShip === false && row-1 >= 0) {
      row -= 1;
      boatLength -= 1;
      coords.push([row, col]);
    } else if (position === 'right' && board[row][col+1].isShip === false && col+1 <= size) {
      col += 1;
      boatLength -= 1;
      coords.push([row, col]);
    } else if (position === 'down' && board[row+1][col].isShip === false && row+1 <= size) {
      row += 1;
      boatLength -= 1;
      coords.push([row, col]);
    }

  }

  return coords;

};

var plotBoats = function (board, coords) {

  //take the board and loop throught the given coords and plot on the board
  for (var i = 0; i < coords.length; i++) {
    //take the coord and plot to the board
    board[coords[i][0]][coords[i][1]].isShip = true;
  }

  return board;

};


var utils = {

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
          isShip: false
        });
      }
      board.push(row);
      row = [];
    }

    return board;

  },


  layShips: function (board, size, boats) {
   //loop through the boats lengths
    //on each generate random coords and position
    //go to that coord on the board
      //addShip()
      //if false returned then have to generate new coords and try again 
      //else go to the next ship
    boats = [2];

    for (var i = 0; i < boats.length; i++) {

      var boatLength = boats[i];
      var pos = genRandomPosition();
      var row = genCoord(size-1);
      var col = genCoord(size-1);

      if (board[row][col].isShip === false) {

        var coords = getAllCoordsForBoat(board, boatLength, pos, row, col, size-1);
        console.log('coords', coords);

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


