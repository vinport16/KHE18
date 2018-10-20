//gameObjects
//projectiles 
//explosions

var GameObject = function(pos){
	this.position = pos;
}

GameObject.prototype.delete = function(state) {
    var index = state.world.indexOf(this);
	if (index !== -1) state.world.splice(index, 1);
};


var Projectile = function(tar, speed, damage, state){
	this.target = tar; 
	this.position = null;
	this.radius = 3;
	this.speed = 10;
	this.damage = 
	this.color = "orange";
}

var Explosion = function(size){
	
}
