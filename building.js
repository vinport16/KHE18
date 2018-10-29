//Building

function Building(pos, state){
  this.height = 50;
  this.width = 30;
  this.maxHealth = 300;
  this.health = 300;
  this.energyMax = 150;
  this.energyRate = 0.5;
  this.energy = 0;
  this.enemy = false;
  this.name = "Basic Tower";
  this.tree = basicBuildingTree;
  this.price = 100;
  Structure.call(this, pos, this.price, this.maxHealth, 100, state);

}

Building.prototype = Object.create(Structure.prototype);
Building.prototype.constructor = Building;

Building.prototype.findConnectedEnergyStoragePath = function(){
  var q = [[this]];
  var visited = [this];
  while(q.length != 0){
    var b = q[0][q[0].length-1];
    if(b.energyMax && b.energy < b.energyMax){
      return(q[0]);
    }else{
      for(var i = 0; i < b.connected.length; i++){
        if(!visited.includes(b.connected[i])){
          var path = copyArray(q[0]);
          path.push(b.connected[i]);
          visited.push(b.connected[i]);
          q.push(path);
        }
      }
    }
    q.splice(0,1);
  }
  return false;
}

Building.prototype.doConnectedEnergyStorage = function(){
  var path = this.findConnectedEnergyStoragePath();
  if(path){
    //active connect them
    for(var i = 0; i < path.length-1; i++){
      path[i].activeConnections.push(path[i+1]);
    }
    //transfer energy
    var transferAmount = this.energy - this.energyMax;
    var openAmount = path[path.length-1].energyMax - path[path.length-1].energy;
    if(transferAmount > openAmount){
      path[path.length-1].energy += openAmount;
      this.energy -= openAmount;
    }else{
      path[path.length-1].energy += transferAmount;
      this.energy -= transferAmount;
    }
    return true;
  }
  return false;
}

Building.prototype.charge = function(){
  this.energy += this.energyRate;
  if(this.energy > this.energyMax){
    var sent = this.doConnectedEnergyStorage();
    while(sent && this.energy > this.energyMax){
      sent = this.doConnectedEnergyStorage();
    }
  }
  if(this.energy > this.energyMax){
    this.energy = this.energyMax;
  }
}

Building.prototype.step = function(state){
  this.charge();
}

//OTHER BUILDING TYPES 
function SolarPanel(pos, state){
  this.height = 150;
  this.width = 100;
  this.maxHealth = 75;
  this.energyMax = 200;
  this.energyRate = 0.7;
  this.energy = 0;
  this.enemy = false;
  this.name = "Solar Panel";
  this.tree = solarPanelTree;
  this.price = 200;
  Structure.call(this, pos, this.price, this.maxHealth, 200, state);

}
SolarPanel.prototype = Object.create(Building.prototype);
SolarPanel.prototype.constructor = SolarPanel;

function SolarFarm(pos, state){
  this.height = 300;
  this.width = 400;
  this.maxHealth = 80;
  this.health = 80;
  this.energyMax = 500;
  this.energyRate = 0.9;
  this.energy = 0;
  this.enemy = false;
  this.name = "Solar Farm";
  this.tree = solarFarmTree;
   this.price = 400;
  Structure.call(this, pos, this.price, this.maxHealth, 500, state);

}
SolarFarm.prototype = Object.create(Building.prototype);
SolarFarm.prototype.constructor = SolarFarm;

function PowerPlant(pos, state){
  this.height = 60;
  this.width = 90;  
  this.maxHealth = 5
  this.energyMax = 100;
  this.energyRate = 0.6;
  this.energy = 0;
  this.enemy = false;
  this.name = "Power Plant";
  this.tree = powerPlantTree;
   this.price = 150;
  Structure.call(this, pos, this.price, this.maxHealth, 100, state);

}
PowerPlant.prototype = Object.create(Building.prototype);
PowerPlant.prototype.constructor = PowerPlant;

function RepairBuilding(pos, state){
  this.height = 70;
  this.width = 150;
  this.maxHealth = 150;
  this.energyMax = 200;
  this.energyRate = 0;
  this.energy = 0;
  this.enemy = false;
  this.name = "Repair Building";
  this.tree = repairBuildingTree;

  this.heal = 15;
  this.bufferTime = 30;
  this.currentBuffer = 0;
  this.healEnergy = 25;
  Structure.call(this, pos, 200, this.maxHealth, 20, state);

}
RepairBuilding.prototype = Object.create(Building.prototype);
RepairBuilding.prototype.constructor = RepairBuilding;

RepairBuilding.prototype.findConnectedHealPath = function(){
  var q = [[this]];
  var visited = [this];
  while(q.length != 0){
    var b = q[0][q[0].length-1];
    if(b.health < b.maxHealth){
      return(q[0]);
    }else{
      for(var i = 0; i < b.connected.length; i++){
        if(!visited.includes(b.connected[i])){
          var path = copyArray(q[0]);
          path.push(b.connected[i]);
          visited.push(b.connected[i]);
          q.push(path);
        }
      }
    }
    q.splice(0,1);
  }
  return false;
}

RepairBuilding.prototype.doConnectedHeal = function(transferAmount){
  var path = this.findConnectedHealPath();
  if(path){
    //active connect them [SAME AS ENERGY RN]
    for(var i = 0; i < path.length-1; i++){
      path[i].activeConnections.push(path[i+1]);
    }
    //send repairs
    var openAmount = path[path.length-1].maxHealth - path[path.length-1].health;
    if(transferAmount > openAmount){
      path[path.length-1].health += openAmount;
      return transferAmount - openAmount;
    }else{
      path[path.length-1].health += transferAmount;
    }
  }
  return false;
}

RepairBuilding.prototype.step = function(state){
  Building.prototype.step.call(this,state);
  this.currentBuffer--;
  if(heal && this.currentBuffer <= 0 && this.findConnectedHealPath() && this.getEnergyFor(this.healEnergy)){
    amountLeft = this.heal;
    while(amountLeft){
      amountLeft = this.doConnectedHeal(amountLeft);
    }
    this.currentBuffer = this.bufferTime;
  }
}
