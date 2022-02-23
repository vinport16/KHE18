//tower.js

var SMALL_RADIUS = 10;
var MEDIUM_RADIUS = 20;
var LARGE_RADIUS = 40;

function Tower(pos, state){
	this.radius = SMALL_RADIUS;
  this.maxHealth = 110;
	this.health = this.maxHealth;
	this.color = "#9c9cff";
	this.range = 200;
	this.bufferTime = 15; //frames
	this.currentBuffer = this.bufferTime;
	this.projectileSpeed = 10;
	this.projectileDamage = 30;
	this.projectileEnergy = 20;
  this.projectileSize = 3;
  this.destroyed = false;
  this.enemy = false;
  this.tree = copyArray(defaultTowerTree);
  this.kills = 0;
  this.targetType = "closest";
  this.price = 100;
  this.orePrice = 0;
  this.icePrice = 0;
  this.ironPrice = 0;
  this.uraniumPrice = 0;
  this.name = "Basic Tower";
  this.extractRate = 0;

  Structure.call(this, pos, this.price, this.health, 20, this.name, state);
} 
Tower.prototype = Object.create(Structure.prototype);
Tower.prototype.constructor = Tower;

Tower.prototype.shoot = function(state){
	var target = this.selectTarget(state);
	var bullet = new Projectile(target, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
	state.world.push(bullet);
}

Tower.prototype.waitToShoot = function(state){
	if(this.currentBuffer <= 0 && this.shipInRange(state) && this.getEnergyFor(this.projectileEnergy, state)){
		this.shoot(state);
		this.currentBuffer = this.bufferTime;
	}else{
		this.currentBuffer--;
	}
}

Tower.prototype.step = function(state) {
  if(this instanceof CollectorTower){
    if(this.currentBuffer <= 0){
      currentResource = this.onAResource(state);
      if(currentResource != -1){
        this.extractResource(currentResource, state);
      }
    this.currentBuffer = this.bufferTime;
    }else{
      this.currentBuffer--;
    }
  }else{
    this.waitToShoot(state);
  }
}

Tower.prototype.shipInRange = function(state){
  for(i in state.world){
    gobj = state.world[i];
    if(gobj.enemy && distanceBetween(gobj, this) <= this.range && (gobj instanceof Ship)){
      return gobj;
    }
  }
  return false;
}

Tower.prototype.selectTarget = function(state){
  var target = [false, this.range];
  if(this.targetType == "closest"){
    closest = [false, this.range];
    for(i in state.world){
      gobj = state.world[i];
      if(gobj.enemy && gobj.maxHealth && distanceBetween(gobj,this) <= closest[1]){
        closest = [gobj, distanceBetween(gobj,this)];
      }
    }
    target = closest;
  }else if(this.targetType == "strongest"){
    strongest = [false, 0];
    for(i in state.world){
      gobj = state.world[i];
      if(gobj.enemy && gobj.maxHealth && (gobj.health > strongest[1]) && distanceBetween(gobj,this) <= this.range){
        strongest = [gobj, gobj.health];
      }
    }
    target = strongest;
  }else if(this.targetType == "weakest"){
    weakest = [false, 0];
    for(i in state.world){
      gobj = state.world[i];
      if(gobj.enemy && gobj.maxHealth && (gobj.health < weakest[1]) && distanceBetween(gobj,this) <= this.range){
        weakest = [gobj, gobj.health];
      }
    }
    target = weakest;
  }else if(this.targetType == "farthest"){
    farthest = [false, 0];
    for(i in state.world){
      gobj = state.world[i];
      if(gobj.enemy && gobj.maxHealth && distanceBetween(gobj,this) > farthest[1] && distanceBetween(gobj,this) <= this.range){
        farthest = [gobj, distanceBetween(gobj,this)];
      }
    }
    target = farthest;
  }
  return target[0];
}

function SeekingTower(pos, state){
  this.radius = MEDIUM_RADIUS;
  this.maxHealth = 150;
  this.health = 150; 
  this.color = "#e0e0e0";
  this.range = 300;
  this.bufferTime = 100; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 5;
  this.projectileDamage = 200;
  this.projectileEnergy = 150;
  this.projectileSize = 7;
  this.destroyed = false;
  this.enemy = false;
  this.tree = seekingTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.name = "Simple Seeking Tower";
  this.price = 500; 
  this.orePrice = 5;
  this.icePrice = 0;
  this.ironPrice = 0;
  this.uraniumPrice = 10;

  Structure.call(this, pos, this.price, this.health, 30, this.name, state);
} 
SeekingTower.prototype = Object.create(Tower.prototype);
SeekingTower.prototype.constructor = SeekingTower;

SeekingTower.prototype.shoot = function(state){
  var target = this.selectTarget(state);
  var bullet = new SeekingProjectile(target, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
  state.world.push(bullet);
}

function MultiShotTower(pos, state){
  this.radius = SMALL_RADIUS;
  this.health = 150; 
  this.color = "#ffff9c";
  this.range = 150;
  this.bufferTime = 60; //frames
  this.currentBuffer = this.bufferTime;
  this.numberOfShots = 2;
  this.projectileSpeed = 6;
  this.projectileDamage = 50;
  var pEnergy = function(numberOfShots){
    var sum = 0;
    for(var i = 0; i < numberOfShots; i++){
      sum += 40+(i*20);
    }
    return sum;
  }
  this.projectileEnergy = pEnergy(this.numberOfShots);
  this.projectileSize = 3;
  this.destroyed = false;
  this.enemy = false;
  this.tree = multiShotTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.name = "Double Shot Tower";
  this.price = 300;
  this.orePrice = 0;
  this.icePrice = 0;
  this.ironPrice = 5;
  this.uraniumPrice = 0;
  this.inProgress = false;
  this.eachShotDelay = 5;
  this.currentShotDelay = 0;
  this.shotsShot = 0;

  Structure.call(this, pos, this.price, this.health, 40, this.name, state);
} 
MultiShotTower.prototype = Object.create(Tower.prototype);
MultiShotTower.prototype.constructor = MultiShotTower;

MultiShotTower.prototype.shoot = function(state){
  this.inProgress = true;
  var target = this.selectTarget(state);
  var bullet = new Projectile(target, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
  state.world.push(bullet);
  this.shotsShot++;
  if(this.shotsShot == this.numberOfShots){
    this.shotsShot = 0;
    this.inProgress = false;
  }
}

MultiShotTower.prototype.step = function(state) {
  if(this.inProgress == true){
    if(this.currentShotDelay < this.eachShotDelay){
      this.currentShotDelay++;
    }else if(this.shipInRange(state)){
      this.currentShotDelay = 0;
      this.shoot(state);
    }
  }
  this.waitToShoot(state);
}

function LaserTower(pos, state){
  this.radius = SMALL_RADIUS;
  this.maxHealth = 130;
  this.health = this.maxHealth;
  this.color = "#AABB99";
  this.range = 200;
  this.bufferTime = 20; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 2;
  this.projectileDamage = 40;
  this.projectileEnergy = 20;
  this.projectileSize = 3;
  this.destroyed = false;
  this.enemy = false;
  this.tree = laserTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.price = 300;
  this.orePrice = 0;
  this.icePrice = 0;
  this.ironPrice = 0;
  this.uraniumPrice = 10;
  this.name = "Laser Tower";

  Structure.call(this, pos, this.price, this.health, 20, this.name, state);
} 
LaserTower.prototype = Object.create(Tower.prototype);
LaserTower.prototype.constructor = LaserTower;

LaserTower.prototype.shoot = function(state){
  var target = this.selectTarget(state);
  laser = new Laser(this, target, this.projectileDamage, this.bufferTime/2, /*healRate,*/ this.projectileSize, "rgba(150,215,200,0.8)", state);
  state.world.push(laser);
}

function ShipTower(pos, state){
  this.radius = MEDIUM_RADIUS;
  this.maxHealth = 110;
  this.health = this.maxHealth;
  this.color = "white";
  this.range = 400;
  this.bufferTime = 150; //frames
  this.currentBuffer = this.bufferTime;
  this.destroyed = false;
  this.projectileEnergy = 40;
  this.enemy = false;
  this.tree = false;
  this.kills = 0;
  this.targetType = "farthest";
  this.price = 1000;
  this.orePrice = 10;
  this.icePrice = 0;
  this.ironPrice = 10;
  this.uraniumPrice = 0;
  this.name = "Ship Tower";
  this.shipShoots = false;
  this.tree = shipTowerTree;

  Structure.call(this, pos, this.price, this.health, 20, this.name, state);
}

ShipTower.prototype = Object.create(Tower.prototype);
ShipTower.prototype.constructor = ShipTower;


ShipTower.prototype.shoot = function(state){
  var target = this.selectTarget(state);
  var FShip = new FriendlyShip(duplicate(this.position), this, this.shipShoots, state);
  state.world.push(FShip);
}

function BombTower(pos, state){
  this.radius = 10;
  this.maxHealth = 1;
  this.health = this.maxHealth;
  this.color = "#AABB99";
  this.range = 2;
  this.destroyed = false;
  this.enemy = false;
  this.tree = [];
  this.kills = 0;
  this.targetType = "closest";
  this.price = 800;
  this.orePrice = 0;
  this.icePrice = 0;
  this.ironPrice = 0;
  this.uraniumPrice = 0;
  this.name = "Bomb Tower";


  Structure.call(this, pos, this.price, this.health, 20, this.name, state);
}

BombTower.prototype = Object.create(Tower.prototype);
BombTower.prototype.constructor = BombTower;

BombTower.prototype.step = function(state){
  //The bomb tower doesn't shoot, it just dies on the first step. 
  var E1 = new Explosion(duplicate(this.position), 300, true);
  state.world.push(E1);
  this.delete(state);
}

function Golaith(pos, state){
  this.radius = LARGE_RADIUS;
  this.maxHealth = 200;
  this.health = this.maxHealth;
  this.color = "#BBBB99";
  this.range = 500;
  this.destroyed = false;
  this.enemy = false;
  this.tree = false;
  this.kills = 0;
  this.targetType = "closest";
  this.price = 20000;
  this.orePrice = 100;
  this.icePrice = 100;
  this.ironPrice = 100;
  this.uraniumPrice = 100;
  this.name = "Golaith";
  this.bufferTime = 300; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 8;
  this.projectileDamage = 1000;
  this.projectileEnergy = 150;
  this.projectileSize = 60;

  Structure.call(this, pos, this.price, this.health, 20, this.name, state);
}

Golaith.prototype = Object.create(Tower.prototype);
Golaith.prototype.constructor = Golaith;

// Golaith.prototype.shoot = function(state){
//   var target = this.selectTarget(state);
//   var bullet = new SeekingProjectile(target, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
//   state.world.push(bullet);
// }

function fourShotTower(pos, state){
	this.radius = MEDIUM_RADIUS;
  this.maxHealth = 110;
	this.health = this.maxHealth;
	this.color = "#9c9cff";
	this.range = 200;
	this.bufferTime = 15; //frames
	this.currentBuffer = this.bufferTime;
	this.projectileSpeed = 10;
	this.projectileDamage = 30;
	this.projectileEnergy = 5;
  this.projectileSize = 3;
  this.destroyed = false;
  this.enemy = false;
  this.tree = false;
  this.kills = 0;
  this.targetType = "closest";
  this.price = 100;
  this.orePrice = 0;
  this.icePrice = 0;
  this.ironPrice = 0;
  this.uraniumPrice = 0;
  this.name = "four shot";
  this.extractRate = 0;

  Structure.call(this, pos, this.price, this.health, 20, this.name, state);
} 
fourShotTower.prototype = Object.create(Tower.prototype);
fourShotTower.prototype.constructor = fourShotTower;

fourShotTower.prototype.shoot = function(state){
	var target1 = {radius: 10, position: {x: (this.position.x + 3000), y: (this.position.y)}};
	var bullet1 = new Projectile(target1, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
  state.world.push(bullet1);
  
  var target2 = {radius: 10, position: {x: (this.position.x - 3000), y: (this.position.y)}};
	var bullet2 = new Projectile(target2, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
  state.world.push(bullet2);
  
  var target3 = {radius: 10, position: {x: (this.position.x), y: (this.position.y + 3000)}};
	var bullet3 = new Projectile(target3, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
  state.world.push(bullet3);
  
  var target4 = {radius: 10, position: {x: (this.position.x), y: (this.position.y - 3000)}};
	var bullet4 = new Projectile(target4, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
	state.world.push(bullet4);
}

function bombLauncher(pos, state){
	this.radius = LARGE_RADIUS;
  this.maxHealth = 110;
	this.health = this.maxHealth;
	this.color = "#9c9cff";
	this.range = 200;
	this.bufferTime = 15; //frames
	this.currentBuffer = this.bufferTime;
	this.projectileSpeed = 10;
	this.projectileDamage = 30;
	this.projectileEnergy = 5;
  this.projectileSize = 3;
  this.destroyed = false;
  this.enemy = false;
  this.tree = false;
  this.kills = 0;
  this.targetType = "closest";
  this.price = 100;
  this.orePrice = 0;
  this.icePrice = 0;
  this.ironPrice = 0;
  this.uraniumPrice = 0;
  this.name = "four shot";
  this.extractRate = 0;

  Structure.call(this, pos, this.price, this.health, 20, this.name, state);
} 
bombLauncher.prototype = Object.create(Tower.prototype);
bombLauncher.prototype.constructor = bombLauncher;

bombLauncher.prototype.shoot = function(state){
  var target = this.selectTarget(state);
	var bullet = new ActionProjectile(target, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, "explode", state);
	state.world.push(bullet);
}


//Collector Towers: 
function CollectorTower(pos, state){
  this.radius = 10;
  this.range = 30;
  this.color = "#551A8B";
  this.destroyed = false;
  this.maxHealth = 300;
  this.health = this.maxHealth;
  this.enemy = false;
  this.tree = false;
  this.enemy = false;
  this.name = "Resource Collector";
  this.tree = false;
  this.price = 200;
  this.orePrice = 0;
  this.icePrice = 0;
  this.ironPrice = 0;
  this.uraniumPrice = 0;
  this.bufferTime = 30;
  this.currentBuffer = 0;
  this.extractRate = 1;
  Structure.call(this, pos, this.price, this.health, 20, this.name, state);
}

CollectorTower.prototype = Object.create(Tower.prototype);
CollectorTower.prototype.constructor = CollectorTower;

CollectorTower.prototype.onAResource = function(state){
  for(var i in state.world){
    if(state.world[i] instanceof Resource){
      rangeCircle = {position: this.position, radius: this.range}
      if(checkOverlap(state.world[i], rangeCircle)){
        return state.world[i]
      }
    }
  }
  return -1;
}

CollectorTower.prototype.extractResource = function(resource, state){
  if(resource instanceof Ore){
    state.ore += this.extractRate;
  }else if(resource instanceof Ice){
    state.ice += this.extractRate;
  }else if(resource instanceof Iron){
    state.iron += this.extractRate;
  }else if(resource instanceof Uranium){
    state.uranium += this.extractRate;
  }
  resource.extract(this.extractRate);
}


function getNewTower(type, pos, state){
  switch(type){
    case "defaultTower":
      return new Tower(pos, state);
    case "multiShotTower":
      return new MultiShotTower(pos, state);
    case "laserTower":
      return new LaserTower(pos, state);
    case "fourShotTower":
      return new fourShotTower(pos, state);
    case "seekingTower":
      return new SeekingTower(pos, state);
    case "shipTower":
      return new ShipTower(pos, state);
    case "golaithTower":
      return new Golaith(pos, state);
    case "bombTower":
      return new bombLauncher(pos, state);
    case "networkTower":
      console.log("Tower not made yet");
      return new Tower(pos, state);
    default: 
      return getNewBuilding(type, pos, state);
  }
}