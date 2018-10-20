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
	this.acceleration = {x:5,y:2};
}
Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.step = function(state) {
	this.prototype.move(state);
	this.prototype.waitToShoot(state);
};

Ship.prototype.shoot = function(state){
	var target = {x:300,y:300};
	var bullet = new Projectile(target, this.position, this.projectileSpeed, this.projectileDamage, state);
	drawEnemyProjectile(bullet);
}

Ship.prototype.move = function(state){
	this.pos += this.acceleration;
}

Ship.prototype.waitToShoot = function(state){
	if(this.currentBuffer <= 0){
		this.prototype.shoot(state);
		this.currentBuffer = this.bufferTime;
	}else{
		this.currentBuffer--;
	}
}