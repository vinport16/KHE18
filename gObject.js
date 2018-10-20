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

GameObject.prototype.step = function(state) {
};

var Projectile = function(tar, pos, speed, damage, bad, state){
	this.target = tar; 
	this.position = pos;
	GameObject.call(this, pos);
	this.radius = 3;
	this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target,this)[0], this.position)), speed);
	this.acceleration = 0.1;
	this.damage = damage;
  	this.enemy = bad;
  	var pColor = function(enemy){
  		if(enemy){
  			return "red";
  		}else{
  			return "purple";
  		}
  	}
  	this.color = pColor(this.enemy);

  	
}
Projectile.prototype = Object.create(GameObject.prototype);
Projectile.prototype.constructor = Projectile;

Projectile.prototype.move = function(){
  this.velocity = add(this.velocity, multiply(unitVector(subtract(getClosestPoints(this.target,this)[0],this.position)), this.acceleration));
	this.position = add(this.position, this.velocity);
}

Projectile.prototype.collisionCheck = function(state){
	for(var i in state.world){
		gobj = state.world[i];
		if(gobj instanceof Projectile){
		}else if(gobj.width != null){
			if(this.checkRect(this,gobj)){
				gobj.health -= this.damage;
				this.delete(state);
			}
		}else{
			if(this.checkCircle(this,gobj)){
				gobj.health -= this.damage;
				this.delete(state);
			}
		}
		if(gobj.health <= 0){
			gobj.delete(state);
		}
	}
}

Projectile.prototype.projCollision = function(p, state){
	
}

Projectile.prototype.checkRect = function(p,o){
	if(!p.enemy){
		return false;
	}
	var topLeft = subtract(o.position,{x:o.width/2,y:o.height/2});
  	var bottomRight = add(o.position,{x:o.width/2,y:o.height/2});

  	// var width = Math.abs(topLeft.x - bottomRight.x);
  	// var height = Math.abs(topLeft.y - bottomRight.y);

  	var x = Math.abs(p.position.x - (topLeft.x+bottomRight.x)/2);
  	var y = Math.abs(p.position.y - (topLeft.y+bottomRight.y)/2);

  	if (x > (o.width/2 + p.radius)) { return false; }
  	if (y > (o.height/2 + p.radius)) { return false; }

  	if (x <= (o.width/2)) { return true; }
  	if (y <= (o.height/2)) { return true; }

  	var cornerDistance_sq = (x - o.width/2)*(x - o.width/2) +  (y - o.height/2)*(y - o.height/2);

	return cornerDistance_sq <= (p.radius*p.radius);
}

Projectile.prototype.checkCircle = function(p,o){
	if((p.enemy && o instanceof Ship) || (!p.enemy && o instanceof Tower)){
		return false;
	}
	var distance = Math.sqrt( (p.position.x-o.position.x)*(p.position.x-o.position.x) + (p.position.y-o.position.y)*(p.position.y-o.position.y) );
      	if(distance < o.radius){
        	return true;
		}else{
			return false;
		}
}

Projectile.prototype.step = function(state){
  this.move();
  this.collisionCheck(state);
}

var Explosion = function(pos, size){

	// for (var i = 5; i < size; i++) {
	// 	drawCircle(pos, i, "rgba(255,0,0,1", "rgba(255,255,100,1)");
	// }
	// for(var i = size; i > size/2; i--){
	// 	drawCircle(pos, i, "rgba(255,255,255,1", "rgba(255,255,100,1)");
	// }
	// for(var i = size/2; i > 0; i--){
	// 	drawCircle(pos, i, "rgba(0,0,0,1", "rgba(255,255,100,1)");
	// }
}
