// Dependencies
var express = require('express');
var subdomain = require('express-subdomain');

var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var fs = require('fs');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port',80);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  //response.send('Hello World!');
  response.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/music', (req,res) => {
	var fileId = req.query.id;
})

//app.use(subdomain('api', server));

// Starts the server.
server.listen(3000, function() {
  console.log('Starting server on port 3000');
});



io.on('connection', function(socket) {
	console.log("connection established");

	socket.on("Press play", (sound) => {
		console.log("play");
		io.emit("play sound", sound);
	})

	socket.on("Press stop", () => {
		socket.emit("stop")
	})

	socket.on("white noise button pressed", () => {
		console.log("white noise button pressed");
		socket.broadcast.emit("play white noise");
	})

	socket.on("sine wave button pressed", () => {
		console.log("sine wave button pressed");
		socket.broadcast.emit("play sine wave");
	})

	socket.on("stop_button", function() {
		socket.broadcast.emit("stop_sound");
	})

	console.log("Number of connected clients: " + io.engine.clientsCount);

})



	// var file = __dirname + '/music/test.mp3';
	// fs.exists(file,(exists) => {
	// 	if(exists){
	// 		var rstream = fs.createReadStream(file,
	// 										  {'flags': 'r',
	// 										   'bufferSize': 64*1024});


	// 		rstream.on('data', function(data) {
	// 			console.log(typeof data);
	// 			console.log("sending a chunk of data");
	// 			socket.send(data);

	// 			socket.on('disconnect', function() {
	// 				console.log("connection dropped!");
	// 			})
	// 		})
	// 		rstream.on('end', () => { socket.emit("end_event"); })
	// 	}
	// 	else {
	// 		res.send("404");
	// 		res.end();
	// 	}
	// })