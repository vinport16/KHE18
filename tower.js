//tower.js
//wires 

function Tower(pos, state){
	this.radius = 10;
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
  this.tree = basicTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.price = 100;
  this.name = "Basic Tower";

  Structure.call(this, pos, this.price, this.health, 20, state);
} 
Tower.prototype = Object.create(Structure.prototype);
Tower.prototype.constructor = Tower;

Tower.prototype.shoot = function(state){
	var target = this.selectTarget(state);
	var bullet = new Projectile(target, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
	state.world.push(bullet);
}

Tower.prototype.waitToShoot = function(state){
	if(this.currentBuffer <= 0 && this.shipInRange(state) && this.getEnergyFor(this.projectileEnergy)){
		this.shoot(state);
		this.currentBuffer = this.bufferTime;
	}else{
		this.currentBuffer--;
	}
}

Tower.prototype.step = function(state) {
	this.waitToShoot(state);
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


//OTHER TOWER TYPES BELOW
function HeavyTower(pos, state){
  this.radius = 20;
  this.maxHealth = 260;
  this.health = 260; 
  this.color = "#ffcf9c";
  this.range = 150;
  this.bufferTime = 37; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 5;
  this.projectileDamage = 150;
  this.projectileEnergy = 110;
  this.projectileSize = 5;
  this.destroyed = false;
  this.enemy = false;
  //this.tree = heavyTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.name = "Heavy Tower";
  this.price = 200;

  Structure.call(this, pos, this.price, this.health, 40, state);
} 
HeavyTower.prototype = Object.create(Tower.prototype);
HeavyTower.prototype.constructor = HeavyTower;

function SeekingTower(pos, state){
  this.radius = 14;
  this.maxHealth = 150;
  this.health = 150; 
  this.color = "#e0e0e0";
  this.range = 300;
  this.bufferTime = 100; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 5;
  this.projectileDamage = 200;
  this.projectileEnergy = 100;
  this.projectileSize = 7;
  this.destroyed = false;
  this.enemy = false;
  this.tree = seekingTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.name = "Simple Seeking Tower";
  this.price = 300; 

  Structure.call(this, pos, this.price, this.health, 30, state);
} 
SeekingTower.prototype = Object.create(Tower.prototype);
SeekingTower.prototype.constructor = SeekingTower;

SeekingTower.prototype.shoot = function(state){
  var target = this.selectTarget(state);
  var bullet = new SeekingProjectile(target, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
  state.world.push(bullet);
}

function MultiShotTower(pos, state){
  this.radius = 15;
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
  this.tree = multishotTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.name = "Double Shot Tower";
  this.price = 300;
  this.inProgress = false;
  this.eachShotDelay = 5;
  this.currentShotDelay = 0;
  this.shotsShot = 0;
  
  Structure.call(this, pos, this.price, this.health, 40, state);
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

Tower.prototype.step = function(state) {
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
  this.radius = 9;
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
  this.tree = [];
  this.kills = 0;
  this.targetType = "closest";
  this.price = 150;
  this.name = "Basic Tower";

  Structure.call(this, pos, this.price, this.health, 20, state);
} 
LaserTower.prototype = Object.create(Tower.prototype);
LaserTower.prototype.constructor = LaserTower;

LaserTower.prototype.shoot = function(state){
  var target = this.selectTarget(state);
  laser = new Laser(this, target, this.projectileDamage, this.bufferTime/2, /*healRate,*/ this.projectileSize, "rgba(150,215,200,0.8)", state);
  state.world.push(laser);
}

function ShipTower(pos, state){
  this.radius = 15;
  this.maxHealth = 110;
  this.health = this.maxHealth;
  this.color = "white";
  this.range = 400;
  this.bufferTime = 150; //frames
  this.currentBuffer = this.bufferTime;
  this.destroyed = false;
  this.enemy = false;
  this.tree = basicTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.price = 400;
  this.name = "Ship Tower";

  Structure.call(this, pos, this.price, this.health, 20, state);
}

ShipTower.prototype = Object.create(Tower.prototype);
ShipTower.prototype.constructor = ShipTower;


ShipTower.prototype.shoot = function(state){
  var target = this.selectTarget(state);
  var FShip = new FriendlyShip(duplicate(this.position), this, state);
  state.world.push(FShip);
}






