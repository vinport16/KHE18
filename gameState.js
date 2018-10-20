//gameState.js

function GameState() {
	this.world = []; //list of every game object
	this.position = {x:0,y:0};
	this.money = 1000;
	this.level = 0;
	this.shipsKilled = 0;
	this.currentStep = 0;
}; 

// GameState.prototype.step = function() {
//     this.step++;
// };