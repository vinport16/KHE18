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
    // uncomment below for no avoidance
    //this.position = add(this.position, multiply(unitVector(subtract(getClosestPoints(this.target,this)[0], this.position)), this.speed));
    let to_target = unitVector(subtract(getClosestPoints(this.target,this)[0], this.position));
    let away_from_neighbors = {x:0,y:0};
    for(i in state.world){
      gobj = state.world[i];
      if(gobj.enemy == this.enemy && distanceBetween(this, gobj) < 50 && gobj == this){
        away_from_neighbors = add(away_from_neighbors, unitVector(multiply(subtract(this.position, gobj.position), 10/distanceBetween(this, gobj))));
      }
    }
    this.position = add(this.position, multiply(unitVector(add(to_target, away_from_neighbors)), this.speed));
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
    if(gobj.enemy != this.enemy && gobj.maxHealth && distanceBetween(gobj,this) <= closest[1]){
      closest = [gobj, distanceBetween(gobj,this)];
    }
  }
  return closest[0];
}

Ship.prototype.selectMoveTarget = function(state){
  closest = [false, Number.MAX_VALUE];
  for(i in state.world){
    gobj = state.world[i];
    if(gobj.enemy != this.enemy && gobj.maxHealth && distanceBetween(gobj,this) <= closest[1]){
      closest = [gobj, distanceBetween(gobj,this)];
    }
  }
  if(this instanceof FriendlyShip){
    if(closest[0] == false){
      return this.parent;
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

function LaserShip(pos, state) {
  this.radius = 15;
  this.maxHealth = 200;
  this.health = this.maxHealth;
  this.color = "red";
  this.speed = 1;
  this.stopDistance = 50;
  this.target;
  this.bufferTime = 25;
  this.currentBuffer = this.bufferTime;
  this.range = 150;
  this.projectileSpeed = 10; 
  this.projectileDamage = 50;
  this.projectileSize = 3;
  this.enemy = true;
  this.destroyed = false;
  GameObject.call(this, pos);
  this.bounty = 150;
}
LaserShip.prototype = Object.create(Ship.prototype);
LaserShip.prototype.constructor = LaserShip;

LaserShip.prototype.shoot = function(state){
  var target = this.selectTarget(state);
  laser = new Laser(this, target, this.projectileDamage, this.bufferTime/2, /*healRate,*/ this.projectileSize, "rgba(150,215,200,0.8)", state);
  state.world.push(laser);
}

function FriendlyShip(pos, parent, shoots, state) {
  this.radius = 10;
  
  this.color = "yellow";
  
  this.stopDistance = 10;
  this.target;
  this.bufferTime = 25;
  this.currentBuffer = this.bufferTime;
  this.range = 150;
  this.projectileSpeed = 10; 
  this.projectileDamage = 30;
  this.enemy = false;
  this.destroyed = false;
  this.targetType = "closest";
  GameObject.call(this, pos);
  this.bounty = 0;
  this.parent = parent;
  this.shotsLimit = 20;
  this.shots = 0;
  this.shoots = shoots;

  var eSize = function(shoots){
    if(shoots){
      return 20;
    }else{
      return 100;
    }
  }
  this.explosionSize = eSize(this.shoots);

  var sSpeed = function(shoots){
    if(shoots){
      return 1.5;
    }else{
      return 6;
    }
  }
  this.speed = sSpeed(this.shoots);

  var sMaxHealth = function(shoots){
    if(shoots){
      return 150;
    }else{
      return 1;
    }
  }

  this.maxHealth = sMaxHealth(this.shoots);
  this.health = this.maxHealth;

}
FriendlyShip.prototype = Object.create(Ship.prototype);
FriendlyShip.prototype.constructor = FriendlyShip;



FriendlyShip.prototype.shoot = function(state){
  if(this.shoots){
    var target = this.selectTarget(state);
    var bullet = new Projectile(target, 3, this.position, this.projectileSpeed, this.projectileDamage, false, this, state);
    state.world.push(bullet);
    this.shots++;
    if(this.shots >= this.shotsLimit){
      this.delete(state);
    }
  }
}

FriendlyShip.prototype.delete = function(state){
  //var E1 = new Explosion(duplicate(this.position), this.explosionSize);
  //state.world.push(E1);
  GameObject.prototype.delete.call(this, state);
}













