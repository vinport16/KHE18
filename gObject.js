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


var Projectile = function(tar, pos, speed, damage, state){
	this.target = tar; 
	this.position = pos;
	this.radius = 3;
	this.speed = 10;
	this.acceleration = {x:2,y:2};
	this.damage = 20;
	this.color = "orange";
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
