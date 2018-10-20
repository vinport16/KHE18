//ship.js

function Ship(pos, state) {
	this.radius = 20;
	this.maxHealth = 130;
	this.health = this.maxHealth;
	this.color = "red";
  	this.speed = 2;
  	this.stopDistance = 20;
  	this.target;
	this.bufferTime = 25;
	this.currentBuffer = this.bufferTime;
  	this.range = 60;
	this.projectileSpeed = 10; 
	this.projectileDamage = 20;
  	this.enemy = true;
  	this.destroyed = false;
  	GameObject.call(this, pos);
}
Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.shoot = function(state){
	var target = this.selectTarget(state);
	var bullet = new Projectile(target, this.position, this.projectileSpeed, this.projectileDamage, true, state);
	state.world.push(bullet);
}

Ship.prototype.move = function(state){
  if(distanceBetween(this,this.target) >= this.stopDistance){
    this.position = add(this.position, multiply(unitVector(subtract(getClosestPoints(this.target,this)[0], this.position)), this.speed));
  }
}

Ship.prototype.waitToShoot = function(state){
	if(this.currentBuffer <= 0 && this.selectTarget(state)){
		this.shoot(state);
		this.currentBuffer = this.bufferTime;
	}else{
		this.currentBuffer--;
	}
}

Ship.prototype.step = function(state) {
  if(!this.target || this.target.destroyed){
    this.target = this.selectMoveTarget(state);
  }
	this.move(state);
	this.waitToShoot(state);
};

Ship.prototype.selectTarget = function(state){
  closest = [false, this.range];
  for(i in state.world){
    gobj = state.world[i];
    if(!gobj.enemy && gobj.maxHealth && distanceBetween(gobj,this) <= closest[1]){
      closest = [gobj, distanceBetween(gobj,this)];
    }
  }
  return closest[0];
}

Ship.prototype.selectMoveTarget = function(state){
  closest = [false, Number.MAX_VALUE];
  for(i in state.world){
    gobj = state.world[i];
    if(!gobj.enemy && gobj.maxHealth && distanceBetween(gobj,this) <= closest[1]){
      closest = [gobj, distanceBetween(gobj,this)];
    }
  }
  return closest[0];
}












