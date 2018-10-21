//tower.js
//wires 

function Tower(pos, state){
	this.radius = 10;
  this.maxHealth = 100;
	this.health = this.maxHealth;
	this.color = "blue";
	this.range = 200;
	this.bufferTime = 25; //frames
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
  this.name = "Basic Tower";

  Structure.call(this, pos, 100, this.health, 20, state);
} 
Tower.prototype = Object.create(Structure.prototype);
Tower.prototype.constructor = Tower;

Tower.prototype.upgrade = function(upgrade){
  for (var k in upgrade) {
    if (this.hasOwnProperty(k)) {
       this[k] = upgrade[k];
    }
  }
}

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
      if(gobj.enemy && gobj.maxHealth && (gobj.maxHealth > strongest[1]) && distanceBetween(gobj,this) <= this.range){
        strongest = [gobj, gobj.maxHealth];
      }
    }
    target = strongest;
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
  this.health = 200; 
  this.color = "lime";
  this.range = 150;
  this.bufferTime = 37; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 5;
  this.projectileDamage = 100;
  this.projectileEnergy = 50;
  this.projectileSize = 5;
  this.destroyed = false;
  this.enemy = false;
  this.tree = heavyTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.name = "Big Tower";

  Structure.call(this, pos, 150, this.health, 40, state);
} 
HeavyTower.prototype = Object.create(Tower.prototype);
HeavyTower.prototype.constructor = HeavyTower;

function SeekingTower(pos, state){
  this.radius = 14;
  this.health = 200; 
  this.color = "purple";
  this.range = 300;
  this.bufferTime = 5; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 15;
  this.projectileDamage = 10;
  this.projectileEnergy = 40;
  this.projectileSize = 2;
  this.destroyed = false;
  this.enemy = false;
  this.tree = seekingTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.name = "Simple Seeking Tower";

  Structure.call(this, pos, 10, this.health, 30, state);
} 
SeekingTower.prototype = Object.create(Tower.prototype);
SeekingTower.prototype.constructor = SeekingTower;

function MultiShotTower(pos, state){
  this.radius = 15;
  this.health = 200; 
  this.color = "lime";
  this.range = 150;
  this.bufferTime = 37; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 5;
  this.projectileDamage = 100;
  this.projectileEnergy = 50;
  this.projectileSize = 5;
  this.destroyed = false;
  this.enemy = false;
  this.tree = multishotTowerTree;
  this.kills = 0;
  this.targetType = "closest";
  this.name = "Double Shot Tower";

  Structure.call(this, pos, 150, this.health, 40, state);
} 
MultiShotTower.prototype = Object.create(Tower.prototype);
MultiShotTower.prototype.constructor = MultiShotTower;


//NOT USING THE BELOW, WILL USE IN UPGRADES

// function GoliathTower(pos, state){
//   this.radius = 20;
//   this.health = 400; 
//   this.color = "orange";
//   this.range = 50;
//   this.bufferTime = 150; //frames
//   this.currentBuffer = this.bufferTime;
//   this.projectileSpeed = 8;
//   this.projectileDamage = 500;
//   this.projectileEnergy = 300;
//   this.projectileSize = 15;
//   this.destroyed = false;
//   this.enemy = false;

//   Structure.call(this, pos, 10, this.health, 50, state);
// } 
// GoliathTower.prototype = Object.create(Tower.prototype);
// GoliathTower.prototype.constructor = GoliathTower;