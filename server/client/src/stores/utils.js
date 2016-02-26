
var genRandomPosition = function () {
  var positionChoice = ['left', 'up', 'right', 'down'];
  var num = Math.floor((Math.random()*3));
  console.log('get position', positionChoice[num]);
  return positionChoice[num];
};

var genRandomCoords = function (size) {
  var row = Math.floor((Math.random()*size))+1;
  var col = Math.floor((Math.random()*size))+1;
  return [row, col];
};

var addShips = function (row, col, copiedBoard, boatLength, boatLeft, position, size) {
  console.log('add ships function', row, col, boatLength);
  //generate position to place the boat in 
  console.log('pos', position);
  //lay the current piece
  // debugger;
  copiedBoard[row][col] = {
    isBoat: true
  };
  boatLeft = boatLeft-1;

  //BASE IS THERE IS NO MORE BOAT TO LAY
  if (boatLeft === 0) {
    console.log('copiedBoard to return', copiedBoard);
    return copiedBoard;
  }

  //if statements to work out which way to place the boat so the direction to recurse in
  //logic here so the boats are placed on the copiedBoard and that they dont overlap
  if (position === 'left' && copiedBoard[row][col-1] !== 1 && col-1 >= 0) {
    addShips(row, col-1, copiedBoard, boatLength, boatLeft, position);

  } else if (position === 'up' && copiedBoard[row-1][col] !== 1 && row-1 >= 0) {
    addShips(row-1, col, copiedBoard, boatLength, boatLeft, position);

  } else if (position === 'right' && copiedBoard[row][col+1] !== 1 && col+1 <= size) {
    addShips(row, col+1, copiedBoard, boatLength, boatLeft, position);

  } else if (position === 'down' && copiedBoard[row+1][col] !== 1 && row+1 <= size) {
    addShips(row+1, col, copiedBoard, boatLength, boatLeft, position);

  } else {
    return false;

  }

};


var utils = {

  makeBoard: function (size) { // does this want to put something at each cell?? TO BE THOUGHT ABOUT AND MAYBE CHANGED
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
      //addShips()
        //if false returned then have to generate new coords and try again 
        //else go to the next ship
    size = 5;
    boats = [2];

    for (var i = 0; i < boats.length; i++) {
      var coords = genRandomCoords(size);

      if (board[coords[0]][coords[1]] === undefined) {

        var position = genRandomPosition();

        var newBoard = board.slice(0);

        var updatedBoard = addShips(coords[0], coords[1], newBoard, boats[i], boats[i], position, size);//should evaluate to a board and its not :(!
        console.log('newBoard', updatedBoard, board);

        if (updatedBoard !== false) {
          //set board to this new board
          console.log('update board', updatedBoard);
          board = updatedBoard;

        } else {
          console.log('boat overlap tray again');
          i--;
        }

      }

    }

    // return board;
    console.log('board final', board);

  }

};

module.exports = utils;


