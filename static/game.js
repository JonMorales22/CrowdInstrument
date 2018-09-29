var myScript = document.querySelector('script');
var pre = document.querySelector('pre');

var play_b4 = document.querySelector('.play_b4');
var play_c4 = document.querySelector('.play_c4');
var play_d4 = document.querySelector('.play_d4');
var play_e4 = document.querySelector('.play_e4');
var play_g4 = document.querySelector('.play_g4');

var stop = document.querySelector('.stop');

var socket = io();
var audioCtx = new window.AudioContext;

play_b4.onclick = function() {
	console.log("client button");
	socket.emit("Press play", {sound: "sin", freq: 246.94, duration: .25});
}

play_c4.onclick = function() {
	console.log("client button");
	socket.emit("Press play", {sound: "sin", freq: 261.63, duration: .25});
}

play_d4.onclick = function() {
	console.log("client button");
	socket.emit("Press play", {sound: "sin", freq: 293.66, duration: .25});
}

play_e4.onclick = function() {
	console.log("client button");
	socket.emit("Press play", {sound: "sin", freq: 329.63, duration: .25});
}

play_g4.onclick = function() {
	console.log("client button");
	socket.emit("Press play", {sound: "sin", freq: 392.00, duration: .25});
}

socket.on("play sound", function(sound) {
	var wave = createWave(sound.wave, sound.freq);	
	wave.start();
	wave.stop(audioCtx.currentTime + sound.duration);
})


function createWave(type, value) {
	var oscillator = audioCtx.createOscillator();
	oscillator.type = type;
	oscillator.frequency.setValueAtTime(value, audioCtx.currentTime);
	oscillator.connect(audioCtx.destination);
	return oscillator;
}

pre.innerHTML = myScript.innerHTML