//Resource

function Resource(pos, initialAmt, state){
  this.color = "#FFA500";
  this.name = "space resource";
  this.amount = initialAmt;
  this.density = 1000;
  this.radius = this.amount/this.density;
  this.position = pos;
}
Resource.prototype = Object.create(GameObject.prototype);
Resource.prototype.constructor = Resource;

Resource.prototype.step = function(state){
}

Resource.prototype.extract = function(amt){
  this.amount -= amt;
  this.radius = this.amount/this.density;
}


function Ore(pos, initialAmt, state){

}
Ore.prototype = Object.create(GameObject.prototype);
Ore.prototype.constructor = Ore;

function Ice(pos, initialAmt, state){

}
Ice.prototype = Object.create(GameObject.prototype);
Ice.prototype.constructor = Ice;

function Iron(pos, initialAmt, state){

}
Iron.prototype = Object.create(GameObject.prototype);
Iron.prototype.constructor = Iron;

function Uranium(pos, initialAmt, state){

}
Uranium.prototype = Object.create(GameObject.prototype);
Uranium.prototype.constructor = Uranium;