
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


//TOWER TREES
BTL2a = [
	{price:500, name:"Extremely Long Range Tower", range: 900, color:"#0000c3", tree: false}, 
	{price:500, name:"High Efficency Long Range Tower", projectileEnergy: 25, color:"#0000c3", tree: false}];
BTL2b = [
	{price:500, name:"High Health and Damage Heavy Tower", maxHealth: 300, health:300, color:"#874400", tree: false}, 
	{price:500, name:"HUGE Bullet and High Damage Heavy Tower", projectileSize: 15, color:"#874400", tree: false}];
basicTowerTree = [
	{price:150, name:"Long Range Tower", range: 350, color:"#4e4eff", tree: BTL2a}, 
	{price:150, name:"Heavy Tower", maxHealth: 260, health: 260, bufferTime: 35, projectileDamage: 110, projectileSpeed:5, bufferTime: 15, color:"#4e4eff", tree: BTL2b}];

LTL2a = [//longer laser
	{price:600, name:"More Efficent Laser", projectileEnergy: 15, color:"#874400", tree: false}, 
	{price:600, name:"Really Long Laser Time", bufferTime: 80, color:"#874400", tree: false}];
LTL2b = [//higher damage 
	{price:600, name:"Longer Range", range: 400, color:"#874400", tree: false}, 
	{price:600, name:"Super High Damage", projectileDamage: 100, color:"#874400", tree: false}];
laserTowerTree = [
	{price:400, name:"Longer Laser Time", bufferTime: 40, color:"#f37a00", tree: LTL2a}, 
 	{price:400, name:"Higher Damage", projectileDamage: 60, color:"#f37a00", tree: LTL2b}];

MTL2a = [{price:700, name:"5 Shot Tower", numberOfShots: 5, color:"#dbdb00", tree: false}];
multishotTowerTree = [{price:500, name:"3 Shot Tower", numberOfShots: 3, color:"#ffff0d", tree: MTL2a}];

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

//Upgrade lists: 
defaultBuildingList = [
  {price: 50, name: "Bigger Range", range: 400},
  {price: 70, name: "More Damage",  projectileDamage: 110},
  {price: 100, name: "More Health", maxHealth: 260},
  {price: 150, name: "High Efficency", projectileEnergy: 10},
  {price: 200, name: "Huge Range", range: 800},
  {price: 300, name: "Fast bullets", projectileSpeed: 15},
  {price: 350, name: "More Frequent Bullets", bufferTime: 8}
];

shipTowerList = [
  {price: 800, name: "Ships can shoot", shipShoots: true}
]