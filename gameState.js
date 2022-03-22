//gameState.js

function GameState() {
  this.world = []; //list of every game object
  this.position = { x: 0, y: 0 };
  this.money = 2000;
  this.ore = 10;
  this.ice = 10;
  this.iron = 10;
  this.uranium = 10;
  this.level = 1;
  this.highestLevel = 1;
  this.currentStep = 0;
  this.selectedStructure = null;
  this.proto = null; // preview this prototype building when not null
  this.givelevelBonus = true;
  this.shipsKilled = {};
}

GameState.prototype.getEnergyCapacity = function () {
  energy = 0;
  for (i in this.world) {
    gobj = this.world[i];
    if (gobj.energyMax) {
      energy += gobj.energyMax;
    }
  }
  return energy;
}

GameState.prototype.getEnergyTotal = function () {
  energy = 0;
  for (i in this.world) {
    gobj = this.world[i];
    if (gobj.energyMax) {
      energy += gobj.energy;
    }
  }
  return energy;
}