//ship.js

function Ship(pos, state) {
	this.radius = 10;
	this.maxHealth = 130;
	this.health = this.maxHealth;
	this.color = "red";
  	this.speed = 2;
  	this.stopDistance = 20;
	this.target = null;
	this.bufferTime = 25;
	this.currentBuffer = this.bufferTime;
  	this.range = 60;
	this.projectileSpeed = 10; 
	this.projectileDamage = 20;
  	this.enemy = true;
  	this.destroyed = false;
  	GameObject.call(this, pos);
  	this.bounty = 50;
}
Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.delete = function(state){
	state.money += this.bounty;
	GameObject.prototype.delete.call(this, state);
}

Ship.prototype.shoot = function(state){
	var target = this.selectTarget(state);
	var bullet = new Projectile(target, 3, this.position, this.projectileSpeed, this.projectileDamage, true, this, state);
	state.world.push(bullet);
}

Ship.prototype.move = function(state){
  if(this.target && distanceBetween(this,this.target) >= this.stopDistance){
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
  if(!this.target || this.target.destroyed || Math.random() < 0.05){
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

function BigShip(pos, state) {
	this.radius = 15;
	this.maxHealth = 200;
	this.health = this.maxHealth;
	this.color = "red";
  	this.speed = 1.5;
  	this.stopDistance = 50;
  	this.target;
	this.bufferTime = 25;
	this.currentBuffer = this.bufferTime;
  	this.range = 150;
	this.projectileSpeed = 10; 
	this.projectileDamage = 50;
  	this.enemy = true;
  	this.destroyed = false;
  	GameObject.call(this, pos);
  	this.bounty = 100;
}
BigShip.prototype = Object.create(Ship.prototype);
BigShip.prototype.constructor = BigShip;

function MotherShip(pos, state) {
	this.radius = 25;
	this.maxHealth = 500;
	this.health = this.maxHealth;
	this.color = "red";
  	this.speed = 0.8;
  	this.stopDistance = 100;
  	this.target;
	this.bufferTime = 300;
	this.currentBuffer = this.bufferTime;
  	this.range = 650;
	this.projectileSpeed = 1.5; 
	this.projectileDamage = 20;
  	this.enemy = true;
  	this.destroyed = false;
  	GameObject.call(this, pos);
  	this.bounty = 300;
}
MotherShip.prototype = Object.create(Ship.prototype);
MotherShip.prototype.constructor = MotherShip;

MotherShip.prototype.shoot = function(state){
	var target = this.selectTarget(state);
	var babyShip = new Ship(duplicate(this.position), state);
	state.world.push(babyShip);
}

MotherShip.prototype.move = function(state){
  if(this.target && distanceBetween(this,this.target) >= this.stopDistance){
    if(distanceBetween(this,this.target) > this.range){
      this.position = add(this.position, multiply(unitVector(subtract(getClosestPoints(this.target,this)[0], this.position)), this.speed) );
    }else{
      this.position = add(this.position, rotateVector(multiply(unitVector(subtract(getClosestPoints(this.target,this)[0], this.position)), this.speed), 70) );
    }
  }
}

function GrandmotherShip(pos, state) {
	this.radius = 50;
	this.maxHealth = 1000;
	this.health = this.maxHealth;
	this.color = "red";
  	this.speed = 0.2;
  	this.stopDistance = 100;
  	this.target;
	this.bufferTime = 400;
	this.currentBuffer = this.bufferTime;
  	this.range = 800;
	this.projectileSpeed = 0.8; 
	this.projectileDamage = 20;
  	this.enemy = true;
  	this.destroyed = false;
  	GameObject.call(this, pos);
  	this.bounty = 500;
}
GrandmotherShip.prototype = Object.create(Ship.prototype);
GrandmotherShip.prototype.constructor = GrandmotherShip;

GrandmotherShip.prototype.shoot = function(state){
	var target = this.selectTarget(state);
	var randInt = getRandomInt(0,10);
	var babyShip;
	if(randInt > 7){
		var babyShip = new MotherShip(duplicate(this.position), state);
		state.world.push(babyShip);
	}else{
		var babyShip = new BigShip(duplicate(this.position), state);
		state.world.push(babyShip);
	}
}

GrandmotherShip.prototype.move = function(state){
  if(this.target && distanceBetween(this,this.target) >= this.stopDistance){
    if(distanceBetween(this,this.target) > this.range){
      this.position = add(this.position, multiply(unitVector(subtract(getClosestPoints(this.target,this)[0], this.position)), this.speed) );
    }else{
      this.position = add(this.position, rotateVector(multiply(unitVector(subtract(getClosestPoints(this.target,this)[0], this.position)), this.speed), 75) );
    }
  }
}

function SpeedyShip(pos, state) {
	this.radius = 5;
	this.maxHealth = 50;
	this.health = this.maxHealth;
	this.color = "red";
  	this.speed = 20;
  	this.stopDistance = 10;
  	this.target;
	this.bufferTime = 2;
	this.currentBuffer = this.bufferTime;
  	this.range = 20;
	this.projectileSpeed = 10; 
	this.projectileDamage = 10;
  	this.enemy = true;
  	this.destroyed = false;
  	GameObject.call(this, pos);
  	this.bounty = 20;
}
SpeedyShip.prototype = Object.create(Ship.prototype);
SpeedyShip.prototype.constructor = SpeedyShip;
















