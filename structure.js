function Structure(pos, price, maxHealth, ER, state){

  GameObject.call(this,pos);

  this.maxHealth = maxHealth;
  this.health = this.maxHealth;
  this.price = price;
  this.energyRange = ER;

  this.connected = [];
  this.activeConnections = [];

  for(var i = 0; i < state.world.length; i++){
    var o2 = state.world[i];
    if(distanceBetween(this,o2) < this.energyRange + o2.energyRange){
      this.connect(o2);
    }
  }
}

Structure.prototype = Object.create(GameObject.prototype);
Structure.prototype.constructor = Structure;

Structure.prototype.connect = function(struct){
  this.connected.push(struct);
  struct.connected.push(this);
}

Structure.prototype.findConnectedEnergyPath = function() {
  var q = [[this]];
  var visited = [this];
  while(q.length != 0){
    var b = q[0][q[0].length-1];
    if(b.maxEnergy && b.energy > 0){
      return(q[0]);
    }else{
      for(var i = 0; i < b.connected.length; i++){
        if(!visited.includes(b.connected[i]) && b.connected[i].destroyed == undefined){
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

Structure.prototype.getEnergyFor = function(n){
  var available = 0;
  var paths = [];
  var amounts = [];
  var path = this.findConnectedEnergyPath();
  while(path && available < n){

    var source = path[path.length-1];
    if(source.energy < n-available){
      amounts.push(source.energy);
      available += source.energy;
      source.energy = 0;
    }else{
      amounts.push(n-available);
      source.energy = source.energy - (n-available);
      available = n;
    }

    paths.push(path);
    path = this.findConnectedEnergyPath();
  }
  if(available < n){
    //return energy
    for(var i = 0; i < paths.length; i++){
      var path = paths[i];
      var source = path[path.length-1];
      source.energy += amounts[i];
    }
    return false;
  }else{
    for(var i = 0; i < paths.length; i++){
      var path = paths[i];
      //connect path
      for(var j = 0; j < path.length-1; j++){
        path[j].activeConnections.push(path[j+1]);
      }

    }
    return true;
  }
}