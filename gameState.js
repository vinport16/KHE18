//gameState.js

function GameState() {
	this.world = []; //list of every game object
	this.position = {x:0,y:0};
	this.money = 1000;
	this.level = 1;
  this.highestLevel = 1;
	this.shipsKilled = 0;
	this.currentStep = 0;
  this.selectedStructure = null;
}; 

GameState.prototype.getEnergyCapacity = function() {
  energy = 0;
  for(i in this.world){
    gobj = this.world[i];
    if(gobj.energyMax){
      energy += gobj.energyMax;
    }
  }
  return energy;
}

GameState.prototype.getEnergyTotal = function() {
  energy = 0;
  for(i in this.world){
    gobj = this.world[i];
    if(gobj.energyMax){
      energy += gobj.energy;
    }
  }
  return energy;
}