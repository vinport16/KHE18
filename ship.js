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
}
Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;