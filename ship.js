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
}
Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;

function shoot(ship){
	var target = null;
	var bullet = new Projectile(target, ship.position, ship.projectileSpeed, ship.projectileDamage, state);
	drawEnemyProjectile(bullet);
}