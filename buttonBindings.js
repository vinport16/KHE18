// BUILDINGS
document.getElementById("defaultBuilding").onclick = function () {
  placeStructure(new Building({ x: null, y: null }, state), state);
}

document.getElementById("solarPanel").onclick = function () {
  placeStructure(new SolarPanel({ x: 0, y: 0 }, state), state);
}

document.getElementById("sheildBuilding").onclick = function () {
  placeStructure(new SheildBuilding({ x: 0, y: 0 }, state), state);
}

document.getElementById("battery").onclick = function () {
  placeStructure(new Battery({ x: 0, y: 0 }, state), state);
}

document.getElementById("repairBuilding").onclick = function () {
  placeStructure(new RepairBuilding({ x: 0, y: 0 }, state), state);
}

// TOWERS
document.getElementById("defaultTower").onclick = function () {
  placeStructure(new Tower({ x: 0, y: 0 }, state), state);
}

document.getElementById("seekingTower").onclick = function () {
  placeStructure(new SeekingTower({ x: 0, y: 0 }, state), state);
}

document.getElementById("golaith").onclick = function () {
  placeStructure(new Golaith({ x: 0, y: 0 }, state), state);
}

document.getElementById("bomb").onclick = function () {
  placeStructure(new BombTower({ x: 0, y: 0 }, state), state);
}

document.getElementById("collectorTower").onclick = function () {
  placeStructure(new CollectorTower({ x: 0, y: 0 }, state), state);
}

// Empty state for updating the tool tips
fakeState = new GameState();

// Update the tool tip for each structure (this should be called whenever the state's money or resesources are updated)
function updateToolTips(state) {
  describeObject(document.getElementById("defaultBuilding"), new Building({ x: 0, y: 0 }, fakeState), state);
  describeObject(document.getElementById("solarPanel"), new SolarPanel({ x: 0, y: 0 }, fakeState), state);
  describeObject(document.getElementById("sheildBuilding"), new SheildBuilding({ x: 0, y: 0 }, fakeState), state);
  describeObject(document.getElementById("battery"), new Battery({ x: 0, y: 0 }, fakeState), state);
  describeObject(document.getElementById("repairBuilding"), new RepairBuilding({ x: 0, y: 0 }, fakeState), state);
  describeObject(document.getElementById("defaultTower"), new Tower({ x: 0, y: 0 }, fakeState), state);
  describeObject(document.getElementById("seekingTower"), new SeekingTower({ x: 0, y: 0 }, fakeState), state);
  describeObject(document.getElementById("golaith"), new Golaith({ x: 0, y: 0 }, fakeState), state);
  describeObject(document.getElementById("bomb"), new BombTower({ x: 0, y: 0 }, fakeState), state);
  describeObject(document.getElementById("collectorTower"), new CollectorTower({ x: 0, y: 0 }, fakeState), state);
}