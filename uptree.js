
//TOWER TREES
BTL2a = [
	{cost:250, range: 800, color:"orange", tree: false}, 
	{cost:400, projectileEnergy: 25, color:"maroon", tree: false}];
BTL2b = [
	{cost:300, maxHealth: 300, color:"gold", tree: false}, 
	{cost:350, projectileDamage: 60, color:"lime", tree: false}];

basicTowerTree = [
	{cost:150, range: 350, color:"yellow", tree: BTL2a}, 
	{cost:100, bufferTime: 15, color:"silver", tree: BTL2b}];

HTL2a = [
	{cost:250, maxHealth: 300, color:"orange", tree: false}, 
	{cost:400, projectileSize: 10, color:"maroon", tree: false}];
HTL2b = [
	{cost:300, bufferTime: 20, color:"gold", tree: false}, 
	{cost:350, range: 400, color:"lime", tree: false}];

heavyTowerTree = [
	{cost:150, projectileDamage: 200, color:"yellow", tree: HTL2a}, 
	{cost:100, projectileEnergy: 20, color:"silver", tree: HTL2b}];


seekingTowerTree = [];
multishotTowerTree = [];

//BUILDING TREES
BBL2a = [
	{cost:400, energyMax: 500, energyRate: 2, color:"orange", tree: false}];
BBL2b = [
	{cost:300, maxHealth: 700, color:"gold", tree: false}];
basicBuildingTree = [
	{cost:150, energyMax: 300, color:"yellow", tree: BBL2a}, 
	{cost:100, maxHealth: 500, color:"silver", tree: BBL2b}];

SPL2a = [{cost:400, energyMax: 400, energyRate: 5, color:"orange", tree: false}];
solarPanelTree = [{cost:150, energyMax: 300, energyRate: 2, color:"yellow", tree: SPL2a}];

SFL2a = [{cost:400, energyMax: 800, energyRate: 20, color:"orange", tree: false}];
solarFarmTree = [{cost:150, energyMax: 600, energyRate: 15, color:"yellow", tree: SFL2a}];

PPL2a = [{cost:400, energyMax: 500, energyRate: 1, color:"orange", tree: false}];
powerPlantTree = [{cost:150, energyMax: 200, energyRate: 0.75, color:"yellow", tree: PPL2a}];

/*
	cost
	health
	buffertime
	projectileDamage
	projectileradius
	energy per shot 
	range
*/

