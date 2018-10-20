//Building

function Building(pos, state){
  
  this.height = 30;
  this.width = 30;

  Structure.call(this, pos, 100, 300, 100, state);

  this.energyMax = 100;
  this.energyRate = 20/25.0;
  this.energy = 0;
  this.enemy = false;

}

Building.prototype = Object.create(Structure.prototype);
Building.prototype.constructor = Building;

Building.prototype.findConnectedEnergyStoragePath = function(){
  var q = [[this]];
  var visited = [this];
  while(q.length != 0){
    var b = q[0][q[0].length-1];
    if(b.energyMax && b.energy < b.energyMax){
      return(q[0]);
    }else{
      for(var i = 0; i < b.connected.length; i++){
        if(!visited.includes(b.connected[i])){
          var path = copyArray(q[0]);
          path.push(b.connected[i]);
          visited.push(b.connected[i]);
          q.push(path);
        }
      }
    }
    q.splice(0,1);
  }
  return false;
}

Building.prototype.doConnectedEnergyStorage = function(){
  var path = this.findConnectedEnergyStoragePath();
  if(path){
    //active connect them
    for(var i = 0; i < path.length-1; i++){
      path[i].activeConnections.push(path[i+1]);
    }
    //transfer energy
    var transferAmount = this.energy - this.energyMax;
    var openAmount = path[path.length-1].energyMax - path[path.length-1].energy;
    if(transferAmount > openAmount){
      path[path.length-1].energy += openAmount;
      this.energy -= openAmount;
    }else{
      path[path.length-1].energy += transferAmount;
      this.energy -= transferAmount;
    }
    return true;
  }
  return false;
}

Building.prototype.charge = function(){
  this.energy += this.energyRate;
  if(this.energy > this.energyMax){
    var sent = this.doConnectedEnergyStorage();
    while(sent && this.energy > this.energyMax){
      sent = this.doConnectedEnergyStorage();
    }
  }
  if(this.energy > this.energyMax){
    this.energy = this.energyMax;
  }
}

Building.prototype.step = function(state){
  this.charge();
}

function placeBuilding(b, state){
  canvas.addEventListener("mousemove",function(event){
    b.position = getAbsolute(event,state);
    drawProtoBuilding(b, state);
  });
}
