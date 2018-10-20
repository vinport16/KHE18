//tower.js
//wires 

function Tower(pos, state){
	this.radius = 15;
	Structure.call(this, pos, 10, 50, 100, state);
	
	this.health = 50; 
	this.color = "blue";
	this.range = 50;
	this.bufferTime = 10; //frames
	this.currentBuffer = 10;
	this.projectileSpeed = 10;
	this.projectileDamage = 40;
} 
Tower.prototype = Object.create(Structure.prototype);
Tower.prototype.constructor = Tower;

function BigTower(pos, state){
	this.radius = 25;
	Tower.call(this, pos, state);
	
	this.health = 100; 
	this.price = 100;
	this.color = "blue";
	this.range = 100;
	this.energyRange = 100;
	this.maxHealth = 100;
	this.bufferTime = 24; //frames
	this.currentBuffer = 24;
	this.projectileSpeed = 8;
	this.projectileDamage = 80;
} 
BigTower.prototype = Object.create(Tower.prototype);
BigTower.prototype.constructor = BigTower;

function shoot(tower){
	var target = null;
	var bullet = new Projectile(target, tower.position, tower.projectileSpeed, tower.projectileDamage, state);
	drawProjectile(bullet);
}
