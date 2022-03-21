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
bT13 = new t1Upgrade("Larger Range", 400, 0, 0, 0, 0, { range: 350 });
bT12 = new t1Upgrade("More Damage", 200, 0, 0, 0, 0, { projectileDamage: 50 }, bT13);
bT11 = new t1Upgrade("Faster Bullets", 50, 0, 0, 0, 0, { projectileSpeed: 20 }, bT12);

bT23 = new t2Upgrade("Laser Tower", 800, 0, 0, 0, 30, "laserTower");
bT22 = new t2Upgrade("MultiShot tower", 400, 20, 0, 0, 0, "multiShotTower", bT23);
bT21 = new t2Upgrade("Four Shot Tower", 200, 10, 0, 0, 0, "fourShotTower", bT22);

basicTowerUpgrades = [bT11, bT21]

sT13 = new t1Upgrade("Larger Range", 2000, 0, 0, 0, 0, { range: 600 });
sT12 = new t1Upgrade("Higher Damage", 1000, 0, 0, 0, 0, { projectileDamage: 190 }, sT13);
sT11 = new t1Upgrade("Bullets Explode", 250, 0, 0, 0, 0, { bulletExplode: true }, sT12);

sT23 = new t1Upgrade("Ships can shoot unlimited", 5000, 0, 0, 30, 0, { shipShotsLimit: 100 });
sT22 = new t1Upgrade("Ships Can Shoot x3", 1000, 10, 20, 0, 0, { shipShoots: true, }, sT23);
sT21 = new t2Upgrade("Ship Tower", 300, 10, 0, 10, 0, "shipTower", sT22);

seekingTowerUpgrades = [sT11, sT21]

gT13 = new t1Upgrade("Giant Range", 15000, 0, 0, 0, 0, { range: 700 });
gT12 = new t1Upgrade("More Efficient", 5000, 0, 0, 0, 0, { projectileEnergy: 300 }, gT13);
gT11 = new t1Upgrade("Faster Reload", 1000, 0, 0, 0, 0, { bufferTime: 200 }, gT12);

gT23 = new t1Upgrade("Seeking Bullets", 25000, 0, 50, 0, 80, { seeking: true });
gT22 = new t1Upgrade("MultiShot x5", 10000, 10, 0, 40, 0, { numberOfShots: 5 }, gT23);
gT21 = new t2Upgrade("MultiShot tower x2", 5000, 50, 0, 20, 0, "multiShotTower", gT22);

golaithTowerUpgrades = [gT11, gT21]


//Building upgrades
bB12 = new t1Upgrade("Bigger Battery", 200, 0, 0, 0, 0, { energyMax: 300 });
bB11 = new t1Upgrade("More Health", 80, 0, 0, 0, 0, { maxHealth: 200 }, bB12);

bB22 = new t1Upgrade("Healing Power", 500, 10, 0, 0, 0, { heal: 10, healEnergy: 10 });
bB21 = new t1Upgrade("Faster Energy Production", 200, 0, 0, 0, 10, { energyRate: 0.5 }, bB22);

basicBuildingUpgrades = [bB11, bB21]

batB12 = new t1Upgrade("Giant Battery", 500, 0, 0, 0, 0, { energyMax: 5000 });
batB11 = new t1Upgrade("Bigger Battery", 250, 0, 0, 0, 0, { energyMax: 3000 }, batB12);

batB22 = new t1Upgrade("Faster Energy Production", 500, 0, 0, 0, 15, { energyRate: 0.4 });
batB21 = new t1Upgrade("More Health", 300, 10, 0, 0, 20, { maxHealth: 200 }, batB22);

batteryBuildingUpgrades = [batB11, batB21]

sB12 = new t1Upgrade("Even Faster Energy Production", 300, 0, 0, 0, 30, { energyRate: 1.5 });
sB11 = new t1Upgrade("Faster Energy Production", 50, 0, 0, 0, 15, { energyRate: 1.0 }, sB12);

sB22 = new t1Upgrade("Store more energy", 800, 0, 0, 15, 0, { energyMax: 300 });
sB21 = new t1Upgrade("More Health", 600, 10, 0, 0, 0, { maxHealth: 150 }, sB22);

solarBuildingUpgrades = [sB11, sB21]

shB12 = new t1Upgrade("Indestructable", 2000, 0, 300, 0, 0, { maxHealth: 100000, health: 100000 });
shB11 = new t1Upgrade("More health", 800, 0, 0, 20, 0, { maxHealth: 3000 }, shB12);

shB22 = new t1Upgrade("Store more energy", 1000, 0, 20, 0, 0, { energyMax: 300 });
shB21 = new t1Upgrade("Healing Power", 700, 20, 0, 0, 0, { heal: 10, healEnergy: 10 }, shB22);

sheildBuildingUpgrades = [shB11, shB21]

rB12 = new t1Upgrade("Hospital", 2000, 100, 0, 0, 0, { heal: 100, healEnergy: 65 });
rB11 = new t1Upgrade("Heal Even More", 700, 25, 0, 0, 0, { heal: 50, healEnergy: 35 }, rB12);

rB22 = new t1Upgrade("Store more energy", 700, 0, 20, 0, 0, { energyMax: 300 });
rB21 = new t1Upgrade("More Health", 600, 10, 0, 0, 0, { maxHealth: 350 }, rB22);

repairBuildingUpgrades = [rB11, rB21]


//Collector tower
cT12 = new t1Upgrade("Extract even faster", 2000, 30, 30, 30, 30, { extractRate: 4 });
cT11 = new t1Upgrade("Extract Faster", 500, 10, 10, 10, 10, { extractRate: 2 }, cT12);

cT22 = new t1Upgrade("Efficient Extraction", 1000, 0, 15, 15, 10, { collectionEnergy: 15 });
cT21 = new t1Upgrade("More Health", 400, 10, 0, 0, 0, { maxHealth: 400 }, cT22);

collectionTowerUpgrades = [cT11, cT21]
