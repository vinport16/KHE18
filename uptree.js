// How upgrades work: 
// Two types of upgrades: 0 is stat upgrades, 1 is replace upgrades 
// If a structure supports upgrades, it has a list in this file with two upgrade objects. 
function Upgrade(name, price, icePrice, ironPrice, orePrice, uraniumPrice, next = null) {
  this.name = name;
  this.price = price;
  this.icePrice = icePrice;
  this.ironPrice = ironPrice;
  this.orePrice = orePrice;
  this.uraniumPrice = uraniumPrice;
  this.next = next;
}

function t1Upgrade(name, price, icePrice, ironPrice, orePrice, uraniumPrice, updateProperties, next = null) {
  Upgrade.call(this, name, price, icePrice, ironPrice, orePrice, uraniumPrice, next);

  this.updateProperties = updateProperties;
}
t1Upgrade.prototype = Object.create(Upgrade.prototype);
t1Upgrade.prototype.constructor = t1Upgrade;

function t2Upgrade(name, price, icePrice, ironPrice, orePrice, uraniumPrice, newStruct, next = null) {
  Upgrade.call(this, name, price, icePrice, ironPrice, orePrice, uraniumPrice, next);

  this.newStruct = newStruct;
}
t2Upgrade.prototype = Object.create(Upgrade.prototype);
t2Upgrade.prototype.constructor = t2Upgrade;

// BT13 = Basic Tower Option 1, 3rd upgrade 
bT13 = new t1Upgrade("Larger Range", 500, 0, 0, 0, 0, { range: 350 });
bT12 = new t1Upgrade("More Damage", 300, 0, 0, 0, 0, { projectileDamage: 50 }, bT13);
bT11 = new t1Upgrade("Faster Bullets", 50, 0, 0, 0, 0, { projectileSpeed: 20 }, bT12);

bT23 = new t2Upgrade("Laser Tower", 500, 0, 0, 0, 20, "laserTower");
bT22 = new t2Upgrade("MultiShot tower", 500, 0, 0, 0, 20, "multiShotTower", bT23);
bT21 = new t2Upgrade("Four Shot Tower", 500, 0, 0, 0, 20, "fourShotTower", bT22);

basicTowerUpgrades = [bT11, bT21]

sT13 = new t1Upgrade("Larger Range", 500, 0, 0, 0, 0, { range: 500 });
sT12 = new t1Upgrade("Bullets Explode", 300, 0, 0, 0, 0, { bulletExplode: true }, bT13);
sT11 = new t1Upgrade("Higher Damage", 50, 0, 0, 0, 0, { projectileDamage: 300 }, bT12);

sT23 = new t1Upgrade("Ships can shoot unlimited", 500, 0, 0, 0, 20, { shipShotsLimit: 100 });
sT22 = new t1Upgrade("Ships Can Shoot x3", 500, 0, 0, 0, 20, { shipShoots: true }, sT23);
sT21 = new t2Upgrade("Ship Tower", 500, 0, 0, 0, 20, "shipTower", sT22);

seekingTowerUpgrades = [sT11, sT21]

