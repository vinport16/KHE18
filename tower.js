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
  this.destroyed = false;

  Structure.call(this, pos, 10, this.health, 100, state);
} 
Tower.prototype = Object.create(Structure.prototype);
Tower.prototype.constructor = Tower;

Tower.prototype.shoot = function(state){
	var target = this.selectTarget(state);
	var bullet = new Projectile(target, this.position, this.projectileSpeed, this.projectileDamage, false, state);
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
  this.health = 100; 
  this.color = "blue";
  this.range = 5000;
  this.bufferTime = 40; //frames
  this.currentBuffer = 10;
  this.projectileSpeed = 10;
  this.projectileDamage = 20;
  this.projectileEnergy = 100;
  this.destroyed = false;

  Structure.call(this, pos, 10, this.health, 100, state);
} 
HeavyTower.prototype = Object.create(Tower.prototype);
HeavyTower.prototype.constructor = HeavyTower;