//this index is the express server for our app
var express = require('express');

var app = express();

//send html static files
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

//then make all client file assests available to find the file searching for
app.use('/', express.static(__dirname + '/client'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Battleships listening at', host, port);

});