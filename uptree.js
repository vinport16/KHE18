
//TOWER TREES
BTL2a = [
	{cost:250, name:"Extremely Long Range Tower", range: 800, color:"orange", tree: false}, 
	{cost:400, name:"High Efficency Tower", projectileEnergy: 25, color:"maroon", tree: false}];
BTL2b = [
	{cost:300, name:"High Health Tower", maxHealth: 300, color:"gold", tree: false}, 
	{cost:350, name:"High Damage  Tower", projectileDamage: 60, color:"lime", tree: false}];

basicTowerTree = [
	{cost:150, name:"Long Range Tower", range: 350, color:"yellow", tree: BTL2a}, 
	{cost:100, name:"No Waiting Tower", bufferTime: 15, color:"silver", tree: BTL2b}];

HTL2a = [
	{cost:250, name:"High Health Heavy Tower", maxHealth: 300, color:"orange", tree: false}, 
	{cost:400, name:"HUGE Bullet Heavy Tower", projectileSize: 10, color:"maroon", tree: false}];
HTL2b = [
	{cost:300, name:"No Waiting Heavy Tower", bufferTime: 20, color:"gold", tree: false}, 
	{cost:350, name:"Long Range Heavy Tower", range: 400, color:"lime", tree: false}];

heavyTowerTree = [
	{cost:150, name:"High Damage Heavy Tower", projectileDamage: 200, color:"yellow", tree: HTL2a}, 
	{cost:100, name:"High Efficency Heavy Tower", projectileEnergy: 20, color:"silver", tree: HTL2b}];


seekingTowerTree = [];
multishotTowerTree = [];

//BUILDING TREES
BBL2a = [
	{cost:400, name:"Huge Battery", energyMax: 500, energyRate: 2, color:"orange", tree: false}];
BBL2b = [
	{cost:300, name:"Thicc Gaurd", maxHealth: 700, color:"gold", tree: false}];
basicBuildingTree = [
	{cost:150, name:"Battery", energyMax: 300, color:"yellow", tree: BBL2a}, 
	{cost:100, name:"Wall of Security", maxHealth: 500, color:"silver", tree: BBL2b}];

SPL2a = [{cost:400, name:"Huge Solar Panel", energyMax: 400, energyRate: 5, color:"orange", tree: false}];
solarPanelTree = [{cost:150, name:"Big Solar Panel", energyMax: 300, energyRate: 2, color:"yellow", tree: SPL2a}];

SFL2a = [{cost:400, name:"Solar Country", energyMax: 800, energyRate: 20, color:"orange", tree: false}];
solarFarmTree = [{cost:150, name:"Solar City", energyMax: 600, energyRate: 15, color:"yellow", tree: SFL2a}];

PPL2a = [{cost:400, name:"Martian Space Energy", energyMax: 500, energyRate: 1, color:"orange", tree: false}];
powerPlantTree = [{cost:150, name:"Nuclear Power Plant", energyMax: 200, energyRate: 0.75, color:"yellow", tree: PPL2a}];

/*
	cost
	health
	buffertime
	projectileDamage
	projectileradius
	energy per shot 
	range
*/

