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
sT12 = new t1Upgrade("Bullets Explode", 300, 0, 0, 0, 0, { bulletExplode: true }, sT13);
sT11 = new t1Upgrade("Higher Damage", 50, 0, 0, 0, 0, { projectileDamage: 300 }, sT12);

sT23 = new t1Upgrade("Ships can shoot unlimited", 500, 0, 0, 0, 20, { shipShotsLimit: 100 });
sT22 = new t1Upgrade("Ships Can Shoot x3", 500, 0, 0, 0, 20, { shipShoots: true }, sT23);
sT21 = new t2Upgrade("Ship Tower", 500, 0, 0, 0, 20, "shipTower", sT22);

seekingTowerUpgrades = [sT11, sT21]

gT13 = new t1Upgrade("Giant Range", 500, 0, 0, 0, 0, { range: 700 });
gT12 = new t1Upgrade("More Efficient", 300, 0, 0, 0, 0, { projectileEnergy: 300 }, gT13);
gT11 = new t1Upgrade("Faster Reload", 50, 0, 0, 0, 0, { bufferTime: 200 }, gT12);

gT23 = new t1Upgrade("Seeking Bullets", 500, 0, 0, 0, 20, { seeking: true });
gT22 = new t1Upgrade("MultiShot x5", 500, 0, 0, 0, 20, { numberOfShots: 5 }, gT23);
gT21 = new t2Upgrade("MultiShot tower x2", 5000, 0, 0, 0, 20, "multiShotTower", gT22);

golaithTowerUpgrades = [gT11, gT21]


//Building upgrades
bB12 = new t1Upgrade("Bigger Battery", 300, 0, 0, 0, 0, { energyMax: 300 });
bB11 = new t1Upgrade("More Health", 50, 0, 0, 0, 0, { maxHealth: 200 }, bB12);

bB22 = new t1Upgrade("Healing Power", 500, 0, 0, 0, 20, { heal: 10, healEnergy: 10 });
bB21 = new t1Upgrade("Faster Energy Production", 5000, 0, 0, 0, 20, { energyRate: 0.5 }, bB22);

basicBuildingUpgrades = [bB11, bB21]

batB12 = new t1Upgrade("Giant Battery", 300, 0, 0, 0, 0, { energyMax: 5000 });
batB11 = new t1Upgrade("Bigger Battery", 50, 0, 0, 0, 0, { energyMax: 3000 }, batB12);

batB22 = new t1Upgrade("Faster Energy Production", 500, 0, 0, 0, 20, { energyRate: 0.4 });
batB21 = new t1Upgrade("More Health", 5000, 0, 0, 0, 20, { maxHealth: 200 }, batB22);

batteryBuildingUpgrades = [batB11, batB21]

sB12 = new t1Upgrade("Even Faster Energy Production", 300, 0, 0, 0, 0, { energyRate: 1.5 });
sB11 = new t1Upgrade("Faster Energy Production", 50, 0, 0, 0, 0, { energyRate: 1.0 }, sB12);

sB22 = new t1Upgrade("Store more energy", 500, 0, 0, 0, 20, { energyMax: 300 });
sB21 = new t1Upgrade("More Health", 5000, 0, 0, 0, 20, { maxHealth: 150 }, sB22);

solarBuildingUpgrades = [sB11, sB21]

shB12 = new t1Upgrade("Indestructable", 300, 0, 0, 0, 0, { maxHealth: 100000 });
shB11 = new t1Upgrade("More health", 50, 0, 0, 0, 0, { maxHealth: 3000 }, shB12);

shB22 = new t1Upgrade("Store more energy", 500, 0, 0, 0, 20, { energyMax: 300 });
shB21 = new t1Upgrade("Healing Power", 5000, 0, 0, 0, 20, { heal: 10, healEnergy: 10 }, shB22);

sheildBuildingUpgrades = [shB11, shB21]

rB12 = new t1Upgrade("Hospital", 300, 0, 0, 0, 0, { heal: 100, healEnergy: 65 });
rB11 = new t1Upgrade("Heal Even More", 50, 0, 0, 0, 0, { heal: 50, healEnergy: 35 }, rB12);

rB22 = new t1Upgrade("Store more energy", 500, 0, 0, 0, 20, { energyMax: 300 });
rB21 = new t1Upgrade("More Health", 5000, 0, 0, 0, 20, { maxHealth: 350 }, rB22);

repairBuildingUpgrades = [rB11, rB21]



this.height = 70;
this.width = 150;
this.maxHealth = 150;
this.energyMax = 200;
this.energyRate = 0;
this.energy = 0;
this.enemy = false;
this.name = "Repair Building";
this.tree = false;
this.price = 300;
this.icePrice = 10;
this.orePrice = 0;
this.ironPrice = 5;
this.uraniumPrice = 0;
this.heal = 30;
this.bufferTime = 30;
this.currentBuffer = 0;
this.healEnergy = 25;