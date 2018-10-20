//tower.js
//wires 

function Tower(pos, state){
	this.radius = 10;
	this.health = 100; 
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
  //this.tree = basicTowerTree;

  Structure.call(this, pos, 100, this.health, 100, state);
} 
Tower.prototype = Object.create(Structure.prototype);
Tower.prototype.constructor = Tower;

Tower.prototype.upgrade = function(state){

}

Tower.prototype.shoot = function(state){
	var target = this.selectTarget(state);
	var bullet = new Projectile(target, this.projectileSize, this.position, this.projectileSpeed, this.projectileDamage, false, state);
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
    if(gobj.enemy && distanceBetween(gobj,this) <= this.range && (gobj instanceof Ship)){
      return gobj;
    }
  }
  return false;
}

Tower.prototype.selectTarget = function(state){
  closest = [false, this.range];
  for(i in state.world){
    gobj = state.world[i];
    if(gobj.enemy && gobj.maxHealth && distanceBetween(gobj,this) <= closest[1]){
      closest = [gobj, distanceBetween(gobj,this)];
    }
  }
  return closest[0];
}


//OTHER TOWER TYPES BELOW
function HeavyTower(pos, state){
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

  Structure.call(this, pos, 150, this.health, 100, state);
} 
HeavyTower.prototype = Object.create(Tower.prototype);
HeavyTower.prototype.constructor = HeavyTower;

function LongRangeTower(pos, state){
  this.radius = 12;
  this.health = 100; 
  this.color = "green";
  this.range = 400;
  this.bufferTime = 25; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 12;
  this.projectileDamage = 20;
  this.projectileEnergy = 30;
  this.projectileSize = 3;
  this.destroyed = false;
  this.enemy = false;

  Structure.call(this, pos, 10, this.health, 100, state);
} 
LongRangeTower.prototype = Object.create(Tower.prototype);
LongRangeTower.prototype.constructor = LongRangeTower;

function MachineGunTower(pos, state){
  this.radius = 14;
  this.health = 200; 
  this.color = "purple";
  this.range = 300;
  this.bufferTime = 5; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 15;
  this.projectileDamage = 10;
  this.projectileEnergy = 15;
  this.projectileSize = 2;
  this.destroyed = false;
  this.enemy = false;

  Structure.call(this, pos, 10, this.health, 100, state);
} 
MachineGunTower.prototype = Object.create(Tower.prototype);
MachineGunTower.prototype.constructor = MachineGunTower;

function GoliathTower(pos, state){
  this.radius = 20;
  this.health = 400; 
  this.color = "orange";
  this.range = 50;
  this.bufferTime = 150; //frames
  this.currentBuffer = this.bufferTime;
  this.projectileSpeed = 8;
  this.projectileDamage = 500;
  this.projectileEnergy = 300;
  this.projectileSize = 15;
  this.destroyed = false;
  this.enemy = false;

  Structure.call(this, pos, 10, this.health, 100, state);
} 
GoliathTower.prototype = Object.create(Tower.prototype);
GoliathTower.prototype.constructor = GoliathTower;