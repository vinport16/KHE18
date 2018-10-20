//ship.js

function Ship(pos, state) {
	this.radius = 20;
	GameObject.call(this, pos);

	this.health = 100;
	this.color = "red";
	this.bufferTime = 10;
	this.currentBuffer = 10;
	this.projectileSpeed = 10; 
	this.projectileDamage = 30;
	this.maxHealth = 100;
	this.acceleration = {x:-2,y:-2};
}
Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.shoot = function(state){
	var target = {x:100,y:100};
	var bullet = new Projectile(target, this.position, this.projectileSpeed, this.projectileDamage, state);
	state.world.push(bullet);
}

Ship.prototype.move = function(state){
	this.position = add(this.position, this.acceleration);
}

Ship.prototype.waitToShoot = function(state){
	if(this.currentBuffer <= 0){
		this.shoot(state);
		this.currentBuffer = this.bufferTime;
	}else{
		this.currentBuffer--;
	}
}

Ship.prototype.step = function(state) {
	this.move(state);
	this.waitToShoot(state);
};
