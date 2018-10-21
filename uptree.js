
//TOWER TREES
BTL2a = [
	{price:300, name:"Extremely Long Range Tower", range: 800, color:"#0000c3", tree: false}, 
	{price:300, name:"High Efficency Long Range Tower", projectileEnergy: 25, color:"#0000c3", tree: false}];
BTL2b = [
	{price:300, name:"High Frequency Healthy Tower", maxHealth: 300, health:300, color:"#0000c3", tree: false}, 
	{price:300, name:"High Frequency and Damage Tower", projectileDamage: 60, color:"#0000c3", tree: false}];
basicTowerTree = [
	{price:150, name:"Long Range Tower", range: 350, color:"#4e4eff", tree: BTL2a}, 
	{price:150, name:"High Frequency Tower", bufferTime: 15, color:"#4e4eff", tree: BTL2b}];

HTL2a = [
	{price:600, name:"High Health and Damage Heavy Tower", maxHealth: 300, health:300, color:"#874400", tree: false}, 
	{price:600, name:"HUGE Bullet and High Damage Heavy Tower", projectileSize: 20, color:"#874400", tree: false}];
HTL2b = [
	{price:600, name:"High Frequency Efficent Heavy Tower", bufferTime: 20, color:"#874400", tree: false}, 
	{price:600, name:"Long Range Efficent Heavy Tower", range: 400, color:"#874400", tree: false}];
heavyTowerTree = [
	{price:400, name:"High Damage Heavy Tower", projectileDamage: 200, color:"#f37a00", tree: HTL2a}, 
	{price:400, name:"High Efficency Heavy Tower", projectileEnergy: 20, color:"#f37a00", tree: HTL2b}];

STL2a = [
	{price:700, name:"Bigger Range ", range: 500, color:"#565656", tree: false},
	{price:700, name:"Higher Efficency", projectileEnergy: 50, color:"#565656", tree: false}];
STL2b = [
	{price:700, name:"High Health", maxHealth: 300, health: 300, color:"#565656", tree: false},
	{price:700, name:"High Frequency", bufferTime: 50, color:"#565656", tree: false}];
seekingTowerTree = [
	{price:450, name:"Larger Bullets", projectileSize: 12, color:"#929292", tree: STL2a},
	{price:450, name:"Higher Damage", projectileDamage: 200, color:"#929292", tree: STL2b}];


MTL4a = [{price:1500, name:"20 Shot Tower", numberOfShots: 20, color:"#4b4b00", tree: false}];
MTL3a = [{price:1000, name:"10 Shot Tower", numberOfShots: 10, color:"#878700", tree: MTL4a}];
MTL2a = [{price:700, name:"5 Shot Tower", numberOfShots: 5, color:"#dbdb00", tree: MTL3a}];
multishotTowerTree = [{price:500, name:"3 Shot Tower", numberOfShots: 3, color:"#ffff0d", tree: MTL2a}];

//BUILDING TREES
BBL2a = [{price:450, name:"Huge Battery", energyMax: 500, energyRate: 2, color:"orange", tree: false}];
BBL2b = [{price:350, name:"Thicc Gaurd", maxHealth: 700, health:700, color:"gold", tree: false}];
basicBuildingTree = [{price:150, name:"Battery", energyMax: 300, color:"yellow", tree: BBL2a},
					 {price:150, name:"Wall of Security", maxHealth: 500, health: 500, color:"silver", tree: BBL2b}];

SPL2a = [{price:600, name:"Super Efficent Solar Panel", energyMax: 600, energyRate: 5, color:"orange", tree: false}];
solarPanelTree = [{price:300, name:"Efficent Solar Panel", energyMax: 300, energyRate: 2, color:"yellow", tree: SPL2a}];

SFL2a = [{price:1500, name:"Solar for a Country", energyMax: 1500, energyRate: 20, color:"orange", tree: false}];
solarFarmTree = [{price:900, name:"Solar for a City", energyMax: 900, energyRate: 15, color:"yellow", tree: SFL2a}];

PPL2a = [{price:500, name:"Martian Space Energy", energyMax: 500, energyRate: 1, color:"orange", tree: false}];
powerPlantTree = [{price:250, name:"Nuclear Power Plant", energyMax: 200, energyRate: 0.75, color:"yellow", tree: PPL2a}];

