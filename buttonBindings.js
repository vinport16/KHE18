document.getElementById("defaultBuilding").onclick = function(){
  placeStructure(new Building({x:0,y:0},state), state);
}

document.getElementById("defaultTower").onclick = function(){
  placeStructure(new Tower({x:0, y:0}, state), state);
}