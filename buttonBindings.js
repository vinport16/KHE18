// BUILDINGS

document.getElementById("defaultBuilding").onclick = function(){
  placeStructure(new Building({x:0,y:0},state), state);
}

document.getElementById("solarPanel").onclick = function(){
  placeStructure(new SolarPanel({x:0,y:0},state), state);
}

document.getElementById("solarFarm").onclick = function(){
  placeStructure(new SolarFarm({x:0,y:0},state), state);
}

document.getElementById("powerPlant").onclick = function(){
  placeStructure(new PowerPlant({x:0,y:0},state), state);
}


// TOWERS

document.getElementById("defaultTower").onclick = function(){
  placeStructure(new Tower({x:0, y:0}, state), state);
}

document.getElementById("heavyTower").onclick = function(){
  placeStructure(new HeavyTower({x:0, y:0}, state), state);
}

document.getElementById("seekingTower").onclick = function(){
  placeStructure(new SeekingTower({x:0, y:0}, state), state);
}

document.getElementById("multiShotTower").onclick = function(){
  placeStructure(new MultiShotTower({x:0, y:0}, state), state);
}