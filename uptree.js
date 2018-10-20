
//TOWER TREES
BL2a = [
	{cost:250, range: 800, color:"orange", tree: false}, 
	{cost:400, projectileEnergy: 25, color:"maroon", tree: false}];
BL2b = [
	{cost:300, maxHealth: 300, color:"gold", tree: false}, 
	{cost:350, projectileDamage: 60, color:"lime", tree: false}];

basicTowerTree = [
	{cost:150, range: 350, color:"yellow", tree: BL2a}, 
	{cost:100, bufferTime: 15, color:"silver", tree: BL2b}];

HL2a = [
	{cost:250, maxHealth: 300, color:"orange", tree: false}, 
	{cost:400, projectileSize: 10, color:"maroon", tree: false}];
HL2b = [
	{cost:300, bufferTime: 20, color:"gold", tree: false}, 
	{cost:350, range: 400, color:"lime", tree: false}];

heavyTowerTree = [
	{cost:150, projectileDamage: 200, color:"yellow", tree: HL2a}, 
	{cost:100, projectileEnergy: 20, color:"silver", tree: HL2b}];


seekingTowerTree = [];
multishotTowerTree = [];


//BUILDING TREES


/*
	cost
	health
	buffertime
	projectileDamage
	projectileradius
	energy per shot 
	range
*/

