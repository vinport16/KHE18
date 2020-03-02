//Resource

function Resource(pos, initialAmt, state){
  this.color = "#FFA500";
  this.name = "space resource";
  this.amount = initialAmt;
  this.density = 10;
  this.radius = this.amount/this.density;
  this.position = pos;
}
Resource.prototype = Object.create(GameObject.prototype);
Resource.prototype.constructor = Resource;

Resource.prototype.step = function(state){
}

Resource.prototype.extract = function(amt){
  this.amount -= amt;
  if(this.amount <= 0){
    this.delete(state);
  }else{
    this.radius = this.amount/this.density;
  }
}


function Ore(pos, initialAmt, state){
  this.color = "#545e60";
  this.name = "Ore";
  this.amount = initialAmt;
  this.density = 10;
  this.radius = this.amount/this.density;
  this.position = pos;
}
Ore.prototype = Object.create(Resource.prototype);
Ore.prototype.constructor = Ore;

function Ice(pos, initialAmt, state){
  this.color = "#add8e6";
  this.name = "Ice";
  this.amount = initialAmt;
  this.density = 10;
  this.radius = this.amount/this.density;
  this.position = pos;
}
Ice.prototype = Object.create(Resource.prototype);
Ice.prototype.constructor = Ice;

function Iron(pos, initialAmt, state){
  this.color = "#804000";
  this.name = "Iron";
  this.amount = initialAmt;
  this.density = 10;
  this.radius = this.amount/this.density;
  this.position = pos;
}
Iron.prototype = Object.create(Resource.prototype);
Iron.prototype.constructor = Iron;

function Uranium(pos, initialAmt, state){
  this.color = "#a5a500";
  this.name = "Uranium";
  this.amount = initialAmt;
  this.density = 10;
  this.radius = this.amount/this.density;
  this.position = pos;
}
Uranium.prototype = Object.create(Resource.prototype);
Uranium.prototype.constructor = Uranium;