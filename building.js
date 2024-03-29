//Building

function Building(pos, state) {
  this.height = 50;
  this.width = 30;
  this.maxHealth = 200;
  this.health = 200;
  this.energyMax = 100;
  this.energyRate = 0.25;
  this.energy = 0;
  this.enemy = false;
  this.name = "Basic Building";
  this.tree = copyArray(basicBuildingUpgrades);
  this.price = 100;
  this.orePrice = 0;
  this.icePrice = 0;
  this.ironPrice = 0;
  this.uraniumPrice = 0;
  this.heal = 0;
  this.bufferTime = 30;
  this.currentBuffer = 0;
  this.healEnergy = 0;
  this.energyRange = 20;
  Structure.call(this, pos, this.price, this.maxHealth, this.energyRange, this.name, state);

}

Building.prototype = Object.create(Structure.prototype);
Building.prototype.constructor = Building;

Building.prototype.findConnectedEnergyStoragePath = function () {
  var q = [[this]];
  var visited = [this];
  while (q.length != 0) {
    var b = q[0][q[0].length - 1];
    if (b.energyMax && b.energy < b.energyMax) {
      return (q[0]);
    } else {
      for (var i = 0; i < b.connected.length; i++) {
        if (!visited.includes(b.connected[i])) {
          var path = copyArray(q[0]);
          path.push(b.connected[i]);
          visited.push(b.connected[i]);
          q.push(path);
        }
      }
    }
    q.splice(0, 1);
  }
  return false;
}

Building.prototype.doConnectedEnergyStorage = function () {
  var path = this.findConnectedEnergyStoragePath();
  if (path) {
    //active connect them
    for (var i = 0; i < path.length - 1; i++) {
      path[i].activeConnections.push(path[i + 1]);
    }
    //transfer energy
    var transferAmount = this.energy - this.energyMax;
    var openAmount = path[path.length - 1].energyMax - path[path.length - 1].energy;
    if (transferAmount > openAmount) {
      path[path.length - 1].energy += openAmount;
      this.energy -= openAmount;
    } else {
      path[path.length - 1].energy += transferAmount;
      this.energy -= transferAmount;
    }
    return true;
  }
  return false;
}

Building.prototype.charge = function () {
  this.energy += this.energyRate;
  if (this.energy > this.energyMax) {
    var sent = this.doConnectedEnergyStorage();
    while (sent && this.energy > this.energyMax) {
      sent = this.doConnectedEnergyStorage();
    }
  }
  if (this.energy > this.energyMax) {
    this.energy = this.energyMax;
  }
}

Building.prototype.step = function (state) {
  this.charge();
  this.currentBuffer--;
  if (heal && this.currentBuffer <= 0 && this.findConnectedHealPath() && this.getEnergyFor(this.healEnergy, state)) {
    amountLeft = this.heal;
    while (amountLeft) {
      amountLeft = this.doConnectedHeal(amountLeft);
    }
    this.currentBuffer = this.bufferTime;
  }
}

Building.prototype.findConnectedHealPath = function () {
  var q = [[this]];
  var visited = [this];
  while (q.length != 0) {
    var b = q[0][q[0].length - 1];
    if (b.health < b.maxHealth) {
      return (q[0]);
    } else {
      for (var i = 0; i < b.connected.length; i++) {
        if (!visited.includes(b.connected[i])) {
          var path = copyArray(q[0]);
          path.push(b.connected[i]);
          visited.push(b.connected[i]);
          q.push(path);
        }
      }
    }
    q.splice(0, 1);
  }
  return false;
}

Building.prototype.doConnectedHeal = function (transferAmount) {
  var path = this.findConnectedHealPath();
  if (path) {
    //active connect them [SAME AS ENERGY RN]
    for (var i = 0; i < path.length - 1; i++) {
      path[i].activeConnections.push(path[i + 1]);
    }
    //send repairs
    var openAmount = path[path.length - 1].maxHealth - path[path.length - 1].health;
    if (transferAmount > openAmount) {
      path[path.length - 1].health += openAmount;
      return transferAmount - openAmount;
    } else {
      path[path.length - 1].health += transferAmount;
    }
  }
  return false;
}

//OTHER BUILDING TYPES 
function SolarPanel(pos, state) {
  this.height = 150;
  this.width = 100;
  this.maxHealth = 75;
  this.energyMax = 100;
  this.energyRate = 0.6;
  this.energy = 0;
  this.enemy = false;
  this.name = "Solar Panel";
  this.tree = copyArray(solarBuildingUpgrades);
  this.price = 500;
  this.uraniumPrice = 10;
  this.orePrice = 0;
  this.icePrice = 0;
  this.ironPrice = 0;
  this.energyRange = 20;
  Structure.call(this, pos, this.price, this.maxHealth, this.energyRange, this.name, state);

}
SolarPanel.prototype = Object.create(Building.prototype);
SolarPanel.prototype.constructor = SolarPanel;

function Battery(pos, state) {
  this.height = 60;
  this.width = 80;
  this.maxHealth = 100;
  this.health = 0;
  this.energyMax = 2000;
  this.energyRate = 0.1;
  this.energy = 0;
  this.enemy = false;
  this.name = "Battery";
  this.tree = copyArray(batteryBuildingUpgrades);
  this.price = 400;
  this.orePrice = 10;
  this.icePrice = 0;
  this.ironPrice = 2;
  this.uraniumPrice = 0;
  this.energyRange = 20;
  Structure.call(this, pos, this.price, this.maxHealth, this.energyRange, this.name, state);

}
Battery.prototype = Object.create(Building.prototype);
Battery.prototype.constructor = Battery;

function RepairBuilding(pos, state) {
  this.height = 70;
  this.width = 150;
  this.maxHealth = 150;
  this.energyMax = 200;
  this.energyRate = 0;
  this.energy = 0;
  this.enemy = false;
  this.name = "Repair Building";
  this.tree = copyArray(repairBuildingUpgrades);
  this.price = 300;
  this.icePrice = 10;
  this.orePrice = 0;
  this.ironPrice = 5;
  this.uraniumPrice = 0;
  this.heal = 30;
  this.bufferTime = 30;
  this.currentBuffer = 0;
  this.healEnergy = 25;
  this.energyRange = 20;
  Structure.call(this, pos, this.price, this.maxHealth, this.energyRange, this.name, state);

}
RepairBuilding.prototype = Object.create(Building.prototype);
RepairBuilding.prototype.constructor = RepairBuilding;

function SheildBuilding(pos, state) {
  this.height = 30;
  this.width = 40;
  this.maxHealth = 1000;
  this.health = 1000;
  this.energyMax = 20;
  this.energyRate = 0;
  this.energy = 0;
  this.enemy = false;
  this.name = "Sheild Building";
  this.tree = copyArray(sheildBuildingUpgrades);
  this.price = 500;
  this.ironPrice = 10;
  this.orePrice = 5;
  this.icePrice = 0;
  this.uraniumPrice = 0;
  this.heal = 1;
  this.bufferTime = 30;
  this.currentBuffer = 0;
  this.healEnergy = 1;
  this.energyRange = 20;
  Structure.call(this, pos, this.price, this.maxHealth, this.energyRange, this.name, state);

}
SheildBuilding.prototype = Object.create(Building.prototype);
SheildBuilding.prototype.constructor = SheildBuilding;

function MegaBuilding(pos, state) {
  this.height = 400;
  this.width = 500;
  this.maxHealth = 3000;
  this.energyMax = 10000;
  this.energyRate = 2;
  this.energy = 0;
  this.enemy = false;
  this.name = "Mega Building";
  this.tree = false;
  this.price = 50000;
  this.orePrice = 500;
  this.icePrice = 500;
  this.ironPrice = 500;
  this.uraniumPrice = 500;
  this.heal = 60;
  this.bufferTime = 30;
  this.currentBuffer = 0;
  this.healEnergy = 40;
  this.energyRange = 20;
  Structure.call(this, pos, this.price, this.maxHealth, this.energyRange, this.name, state);
}

MegaBuilding.prototype = Object.create(Building.prototype);
MegaBuilding.prototype.constructor = MegaBuilding;

function MainBuilding(pos, state) {
  this.height = 100;
  this.width = 100;
  this.maxHealth = 500;
  this.energyMax = 150;
  this.energyRate = 0.1;
  this.energy = 0;
  this.enemy = false;
  this.name = "Main Building";
  this.tree = false;
  this.price = 0;
  this.heal = 15;
  this.bufferTime = 50;
  this.currentBuffer = 0;
  this.healEnergy = 30;
  this.energyRange = 20;
  Structure.call(this, pos, this.price, this.maxHealth, this.energyRange, this.name, state);

}
MainBuilding.prototype = Object.create(Building.prototype);
MainBuilding.prototype.constructor = MainBuilding;

function ConnectionBuilding(pos, state) {
  this.height = 20;
  this.width = 20;
  this.maxHealth = 20;
  this.health = 20;
  this.energyMax = 20;
  this.energyRate = 0;
  this.energy = 0;
  this.enemy = false;
  this.name = "Connection Building";
  this.tree = false;
  this.price = 50;
  this.orePrice = 5;
  this.icePrice = 5;
  this.ironPrice = 5;
  this.uraniumPrice = 5;
  this.heal = 0;
  this.bufferTime = 30;
  this.currentBuffer = 0;
  this.healEnergy = 0;
  this.energyRange = 200;
  Structure.call(this, pos, this.price, this.maxHealth, this.energyRange, this.name, state);

}

ConnectionBuilding.prototype = Object.create(Building.prototype);
ConnectionBuilding.prototype.constructor = ConnectionBuilding;

function getNewBuilding(type, pos, state) {
  console.log("getting new building");
}