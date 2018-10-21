// BUILDINGS

fakestate = new GameState();

document.getElementById("defaultBuilding").onclick = function(){
  placeStructure(new Building({x:0,y:0},state), state);
}
describeObject(document.getElementById("defaultBuilding"),new Building({x:0,y:0},fakestate));

document.getElementById("solarPanel").onclick = function(){
  placeStructure(new SolarPanel({x:0,y:0},state), state);
}
describeObject(document.getElementById("solarPanel"),new SolarPanel({x:0,y:0},fakestate));

document.getElementById("solarFarm").onclick = function(){
  placeStructure(new SolarFarm({x:0,y:0},state), state);
}
describeObject(document.getElementById("solarFarm"),new SolarFarm({x:0,y:0},fakestate));

//document.getElementById("powerPlant").onclick = function(){
//  placeStructure(new PowerPlant({x:0,y:0},state), state);
//}
//describeObject(document.getElementById("powerPlant"),new PowerPlant({x:0,y:0},fakestate));

document.getElementById("repairBuilding").onclick = function(){
  placeStructure(new RepairBuilding({x:0,y:0},state), state);
}
describeObject(document.getElementById("repairBuilding"),new RepairBuilding({x:0,y:0},fakestate));


// TOWERS

document.getElementById("defaultTower").onclick = function(){
  placeStructure(new Tower({x:0, y:0}, state), state);
}
describeObject(document.getElementById("defaultTower"),new Tower({x:0,y:0},fakestate));

document.getElementById("heavyTower").onclick = function(){
  placeStructure(new HeavyTower({x:0, y:0}, state), state);
}
describeObject(document.getElementById("heavyTower"),new HeavyTower({x:0,y:0},fakestate));

document.getElementById("seekingTower").onclick = function(){
  placeStructure(new SeekingTower({x:0, y:0}, state), state);
}
describeObject(document.getElementById("seekingTower"),new SeekingTower({x:0,y:0},fakestate));

document.getElementById("multiShotTower").onclick = function(){
  placeStructure(new MultiShotTower({x:0, y:0}, state), state);
}
describeObject(document.getElementById("multiShotTower"),new MultiShotTower({x:0,y:0},fakestate));


// SHIPS

document.getElementById("ships").onclick = function(){
  makeShips(zeroVector,800,2850,50,state);
  drawEverything(state);
}