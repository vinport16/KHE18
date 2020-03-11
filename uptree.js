//Trees aren't currently used. See the lists at the bottom of this file. 
//BUILDING TREES
BBL2a = [{price:450, name:"Huge Battery", energyMax: 500, energyRate: 2, color:"orange", tree: false}];
BBL2b = [{price:350, name:"Thicc Gaurd", maxHealth: 700, health:700, color:"gold", tree: false}];
basicBuildingTree = [{price:150, name:"Battery", energyMax: 300, color:"yellow", tree: BBL2a},
					 {price:150, name:"Wall of Security", maxHealth: 500, health: 500, color:"silver", tree: BBL2b}];

SPL2a = [{price:1000, name:"Super Efficent Solar Panel", energyMax: 600, energyRate: 5, color:"orange", tree: false}];
solarPanelTree = [{price:600, name:"Efficent Solar Panel", energyMax: 300, energyRate: 2, color:"yellow", tree: SPL2a}];

SFL2a = [{price:5000, name:"Enough Solar for a Country", energyMax: 3000, energyRate: 20, color:"orange", tree: false}];
solarFarmTree = [{price:2000, name:"Enough Solar for a City", energyMax: 900, energyRate: 15, color:"yellow", tree: SFL2a}];

RBL3a = [{price:2000, name:"Hospital", energyMax: 500, healEnergy: 10, bufferTime: 20, healEnergy: 10, energyRate: 1, color:"orange", tree: false}];
RBL2a = [{price:1000, name:"Doctor's Office", healEnergy: 15, energyMax: 300, bufferTime: 25, color:"orange", tree: RBL3a}];
repairBuildingTree = [{price:500, name:"WebMD", maxHealth: 300, heal: 20, healEnergy: 20, color:"yellow", tree: RBL2a}];


// //TOWER TREES
// BTL2a = [
// 	{price:500, name:"Extremely Long Range Tower", range: 900, color:"#0000c3", tree: false}, 
// 	{price:500, name:"High Efficency Long Range Tower", projectileEnergy: 25, color:"#0000c3", tree: false}];
// BTL2b = [
// 	{price:500, name:"High Health and Damage Heavy Tower", maxHealth: 300, health:300, color:"#874400", tree: false}, 
// 	{price:500, name:"HUGE Bullet and High Damage Heavy Tower", projectileSize: 15, color:"#874400", tree: false}];
// basicTowerTree = [
// 	{price:150, name:"Long Range Tower", range: 350, color:"#4e4eff", tree: BTL2a}, 
// 	{price:150, name:"Heavy Tower", maxHealth: 260, health: 260, bufferTime: 35, projectileDamage: 110, projectileSpeed:5, bufferTime: 15, color:"#4e4eff", tree: BTL2b}];


// MTL2a = [{price:700, name:"5 Shot Tower", numberOfShots: 5, color:"#dbdb00", tree: false}];
// multishotTowerTree = [{price:500, name:"3 Shot Tower", numberOfShots: 3, color:"#ffff0d", tree: MTL2a}];

STL2a = [
	{price:700, name:"Bigger Range ", range: 500, color:"#565656", tree: false},
	{price:700, name:"Higher Efficency", projectileEnergy: 50, color:"#565656", tree: false}];
STL2b = [
	{price:700, name:"High Health", maxHealth: 300, health: 300, color:"#565656", tree: false},
	{price:700, name:"High Frequency", bufferTime: 50, color:"#565656", tree: false}];
seekingTowerTree = [
	{price:450, name:"Larger Bullets", projectileSize: 12, color:"#929292", tree: STL2a},
	{price:450, name:"Higher Damage", projectileDamage: 200, color:"#929292", tree: STL2b}];



shipTowerTree = [
	{price:1000, name:"Ships can Shoot", shipShoots: true, color:"#929292", tree: false}];


//Putting new upgrade trees below: 
//So we will have 9 structures the player can buy: 
/*
  Type            | Small       | Medium  | Large 
  Tower           | Default     | 4 shot  | Goliath
  Building        | Default     | Repair  | Nuclear Reactor
  Speical Tower   | Collection  | Freeze  | Bomb

  Each of these structures have upgrades to both stats and to gain other featuers. The trees are below. 
  TODO: Small items are unlocked on level 1, medium items are unlocked on level 7, large items are unlocked on level 15
*/

//TODO: make upgrades have one of two types. 
//  Type 0 is upgrade - just upgrade the field * the new value (some exceptions like color or tree.)
//  Type 1 is a replace. Replace the current structure with another structure. ie, the default tower to multishot tower. 

//Lets make some trees. 
//SMALL TOWER: 
defaultUpgrades1 = [
  {price:500, upgradeName:"Fast Bullets", type: 0, projectileSpeed: 1.5, color:"#0000c3", tree: false}, 
	{price:500, upgradeName:"More Health", type: 0, maxHealth: 2, health: 2, color:"#0000c3", tree: false}
];

defaultTowerTree = [
  {price:150, upgradeName:"More range", type: 0, range: 2, color:"#4e4eff", tree: defaultUpgrades1},
	{price:150, upgradeName:"Multi-shot ", type: 1, newS: "multiShotTower", tree: false}
];

multishotUpgrades3 = [
  {price:500, upgradeName:"5 bullets", type: 0, numberOfShots: 2.5, color:"#0000c3", tree: false}, 
]

multishotUpgrades2 = [
  {price:500, upgradeName:"4 bullets", type: 0, numberOfShots: 2, color:"#0000c3", tree: false}, 
]

multishotUpgrades1 = [
  {price:500, upgradeName:"Bigger Range", type: 0, range: 2, color:"#0000c3", tree: multishotUpgrades2}, 
	{price:500, upgradeName:"More Efficient", type: 0, projectileEnergy: 0.5, color:"#0000c3", tree: multishotUpgrades3}
]

multiShotTowerTree = [
  {price:150, upgradeName:"More damage", type: 0, projectileDamage: 2, color:"#4e4eff", tree: multishotUpgrades1},
	{price:150, upgradeName:"Laser tower ", type: 1, newS: "laserTower", tree: false}
]

laserUpgrades1 = [
  {price:150, upgradeName:"Bigger Range", type: 0, range: 2, color:"#f37a00", tree: false},
]

laserUpgrades2 = [
  {price:150, upgradeName: "more damage", type: 0, projectileDamage: 2, tree: false}
]

laserTowerTree = [
  {price:150, upgradeName:"Longer Laser", type: 0, bufferTime: 40, color:"#f37a00", tree: laserUpgrades1},
	{price:150, upgradeName:"More Efficient", type: 1, projectileEnergy: 0.5, tree: laserUpgrades2}
]

//Medium Tower


//Large Tower





//Small Building


//Medium building


//Large Building





//Small Special tower 


//Medium Special tower


//Large Special Tower