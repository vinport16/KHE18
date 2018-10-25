//gameObjects
//projectiles 
//explosions

var GameObject = function(pos){
	this.position = pos;
}

GameObject.prototype.delete = function(state) {
  var index = state.world.indexOf(this);
	if (index !== -1) state.world.splice(index, 1);
  	this.destroyed = true;
};

var Projectile = function(tar, radius, pos, speed, damage, enemy, parent, state){
	this.target = tar; 
	this.position = pos;
	GameObject.call(this, pos);
	this.radius = radius;
	this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target,this)[0],this.position)), this.speed);
	this.acceleration = 0.1;
	this.speed = speed;
	this.damage = damage;
  	this.enemy = enemy;
  	this.parent = parent;
  	var pColor = function(enemy){
  		if(enemy){
  			return "red";
  		}else{
  			return "yellow";
  		}
  	}
  	this.color = pColor(this.enemy);

  	
}
Projectile.prototype = Object.create(GameObject.prototype);
Projectile.prototype.constructor = Projectile;

var SeekingProjectile = function(tar, radius, pos, speed, damage, enemy, parent, state){
	this.target = tar; 
	this.position = pos;
	GameObject.call(this, pos);
	this.radius = radius;
	//this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target,this)[0], this.position)), speed);
	this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target,this)[0],this.position)), this.speed);
	this.acceleration = 0.1;
	this.speed = speed;
	this.damage = damage;
  	this.enemy = enemy;
  	this.parent = parent;
  	this.range = 2000;
  	this.color = "yellow";
}
SeekingProjectile.prototype = Object.create(Projectile.prototype);
SeekingProjectile.prototype.constructor = SeekingProjectile;

SeekingProjectile.prototype.getNewTarget = function(state){
	closest = [false, this.range];
	for(i in state.world){
	  gobj = state.world[i];
	  if(gobj.enemy && gobj.maxHealth && distanceBetween(gobj,this) <= closest[1]){
	    closest = [gobj, distanceBetween(gobj,this)];
	  }
	}
	this.target = closest[0];
	return closest[0];
}


Projectile.prototype.move = function(state){
	if(this instanceof SeekingProjectile){
		if(this.target.destroyed || this.target == false){
			var newtarget = this.getNewTarget(state);
			if(!(newtarget == false)){
				this.velocity = multiply(unitVector(subtract(getClosestPoints(newtarget,this)[0],this.position)), this.speed);
			}
		}else{
			if(!(this.target == false)){
				this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target,this)[0],this.position)), this.speed);
			}
		}
	}else if(!this.target.destroyed){
		this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target,this)[0],this.position)), this.speed);
  	}
  	this.position = add(this.position, this.velocity);
  	if(this.position.x > 2000 || this.position.x < -2000 || this.position.y > 2000 || this.position.y < -2000){
  		this.delete(state);
  	}
  	
}

Projectile.prototype.collisionCheck = function(state){
	for(var i in state.world){
		gobj = state.world[i];
		if(gobj instanceof Projectile || gobj instanceof Laser || gobj instanceof Explosion){
		}else{
			if(checkOverlap(this,gobj) && !(sameTeam(this, gobj))){
				if(this.damage > gobj.health){
					this.damage -= gobj.health;
					if(this.parent instanceof FriendlyShip){
						this.parent.parent.kills++;
					}else{
						this.parent.kills++;
					}
					gobj.delete(state);
				}else{
					gobj.health -= this.damage;
					this.delete(state);
				}
			}
		}
	}
}

Projectile.prototype.step = function(state){
  this.move(state);
  this.collisionCheck(state);
}

var Laser = function(parent, target, damage, duration, /*healRate,*/ width, color, state){
  this.target = target;
  this.position = parent.position;
  GameObject.call(this, this.position);
  this.duration = duration;
  this.clock = duration;
  this.width = width;
  this.damage = damage;
  //this.healRate = healRate;
  this.enemy = parent.enemy;
  this.parent = parent;
  this.color = color;
}
Laser.prototype = Object.create(GameObject.prototype);
Laser.prototype.constructor = Laser;

Laser.prototype.step = function(state){
  if(this.parent.destoryed || this.target.destroyed){
    this.delete(state);
  }else{
    this.position = parent.position; // in case parent moved
    this.target.health -= this.damage/this.duration;
    //this.parent.heal(this.damage*this.healRate);
    if(this.clock <= 0){
      this.delete(state);
    }else{
      this.clock -= 1;
    }
    if(this.target.health <= 0){
      this.target.delete(state);
    }
  }
}

var pColor = function(radius, maxRadius){
	var colorStr = "";
	if(radius < 5){
		colorStr = "rgba(255,255,255,0.3)";
	}else{
		var redValue = Math.floor(255-(radius*(255/maxRadius)));
		var greenValue = Math.floor(255-(radius*255/maxRadius));
		var blueValue = Math.floor(255-(radius*255/maxRadius));
		colorStr = "rgba(" + redValue + ","+greenValue+"," + blueValue+",0.3)";
	}
	return colorStr;
}

var Explosion = function(pos, maxRadius){
	this.maxRadius = maxRadius;
	this.position = pos;
	GameObject.call(this, pos);
	this.radius = 1;
	this.inProgress = true;
  	this.color = "red";
  	this.damage = 1;
}
Explosion.prototype = Object.create(GameObject.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.step = function(state){
	this.collisionCheck(state);
	if(this.inProgress){
		if(this.radius < this.maxRadius){
			this.color = pColor(this.radius, this.maxRadius);
			this.radius++;
		}else{
			this.radius = 0;
			this.inProgress = false;
			this.delete(state);
		}
	}
}

Explosion.prototype.collisionCheck = function(state){
	for(var i in state.world){
		gobj = state.world[i];
		if(gobj instanceof Projectile || gobj instanceof Laser || gobj instanceof Explosion){
		}else{
			if(checkOverlap(this,gobj)){
				gobj.health -= this.damage;
				if(gobj.health < 0){
					gobj.delete(state);
				}
			}
		}
	}
}

