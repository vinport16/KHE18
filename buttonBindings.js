// BUILDINGS

fakestate = new GameState();

document.getElementById("defaultBuilding").onclick = function () {
  placeStructure(new Building({ x: null, y: null }, state), state);
}
describeObject(document.getElementById("defaultBuilding"), new Building({ x: 0, y: 0 }, fakestate));

document.getElementById("solarPanel").onclick = function () {
  placeStructure(new SolarPanel({ x: 0, y: 0 }, state), state);
}
describeObject(document.getElementById("solarPanel"), new SolarPanel({ x: 0, y: 0 }, fakestate));

// document.getElementById("sheildBuilding").onclick = function(){
//   placeStructure(new SheildBuilding({x:0,y:0},state), state);
// }
// describeObject(document.getElementById("sheildBuilding"),new SheildBuilding({x:0,y:0},fakestate));

// document.getElementById("battery").onclick = function(){
//   placeStructure(new Battery({x:0,y:0},state), state);
// }
// describeObject(document.getElementById("battery"),new Battery({x:0,y:0},fakestate));

//document.getElementById("powerPlant").onclick = function(){
//  placeStructure(new PowerPlant({x:0,y:0},state), state);
//}
//describeObject(document.getElementById("powerPlant"),new PowerPlant({x:0,y:0},fakestate));

document.getElementById("repairBuilding").onclick = function () {
  placeStructure(new RepairBuilding({ x: 0, y: 0 }, state), state);
}
describeObject(document.getElementById("repairBuilding"), new RepairBuilding({ x: 0, y: 0 }, fakestate));

// document.getElementById("megaBuilding").onclick = function(){
//   placeStructure(new MegaBuilding({x:0,y:0},state), state);
// }
// describeObject(document.getElementById("megaBuilding"),new MegaBuilding({x:0,y:0},fakestate));


// TOWERS

document.getElementById("defaultTower").onclick = function () {
  placeStructure(new Tower({ x: 0, y: 0 }, state), state);
}
describeObject(document.getElementById("defaultTower"), new Tower({ x: 0, y: 0 }, fakestate));

// document.getElementById("laserTower").onclick = function(){
//   placeStructure(new LaserTower({x:0, y:0}, state), state);
// }
// describeObject(document.getElementById("laserTower"),new LaserTower({x:0,y:0},fakestate));

document.getElementById("seekingTower").onclick = function () {
  placeStructure(new SeekingTower({ x: 0, y: 0 }, state), state);
}
describeObject(document.getElementById("seekingTower"), new SeekingTower({ x: 0, y: 0 }, fakestate));

// document.getElementById("multiShotTower").onclick = function(){
//   placeStructure(new MultiShotTower({x:0, y:0}, state), state);
// }
// describeObject(document.getElementById("multiShotTower"),new MultiShotTower({x:0,y:0},fakestate));

// document.getElementById("shipTower").onclick = function(){
//   placeStructure(new ShipTower({x:0, y:0}, state), state);
// }
// describeObject(document.getElementById("shipTower"),new ShipTower({x:0,y:0},fakestate));

document.getElementById("bomb").onclick = function () {
  placeStructure(new BombTower({ x: 0, y: 0 }, state), state);
}
describeObject(document.getElementById("bomb"), new BombTower({ x: 0, y: 0 }, fakestate));

document.getElementById("golaith").onclick = function () {
  placeStructure(new Golaith({ x: 0, y: 0 }, state), state);
}
describeObject(document.getElementById("golaith"), new Golaith({ x: 0, y: 0 }, fakestate));

document.getElementById("collectorTower").onclick = function () {
  placeStructure(new CollectorTower({ x: 0, y: 0 }, state), state);
}
describeObject(document.getElementById("collectorTower"), new CollectorTower({ x: 0, y: 0 }, fakestate));

document.getElementById("fourShotTower").onclick = function () {
  placeStructure(new fourShotTower({ x: 0, y: 0 }, state), state);
}
describeObject(document.getElementById("fourShotTower"), new fourShotTower({ x: 0, y: 0 }, fakestate));

// document.getElementById("bombLauncher").onclick = function(){
//   placeStructure(new bombLauncher({x:0, y:0}, state), state);
// }
// describeObject(document.getElementById("bombLauncher"),new bombLauncher({x:0,y:0},fakestate));

// SHIPS

document.getElementById("ships").onclick = function () {
  makeShips(zeroVector, 800, 2850, 50, state);
  drawEverything(state);
}