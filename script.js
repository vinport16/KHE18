// drawing functions

function clearCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function clearListeners(){
  var clone = canvas.cloneNode(true);
  canvas.parentNode.replaceChild(clone, canvas);
  canvas = clone;
  ctx = canvas.getContext("2d");

  drawEverything();
}

function drawCircle(position, r, fill, stroke){
	ctx.beginPath();
  ctx.arc(position.x, position.y, r, 0, 2 * Math.PI, false);
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.fill();
  ctx.stroke();
}

function drawRectangle(tl, h, w, fill, stroke){
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.rect(tl.x, tl.y, w, h);
  ctx.fill();
  ctx.stroke();
}

function drawLine(v1, v2, stroke){
	ctx.beginPath();
	ctx.moveTo(v1.x,v1.y);
	ctx.lineTo(v2.x,v2.y);
	ctx.lineWidth = 2;
	ctx.strokeStyle = stroke;
	ctx.stroke();
}

function drawTower(o){
  drawCircle(o.position,o.radius,o.color,"rgba(255,255,100,1)");
  //draw health level
  var p1 = subtract(o.position,{x:10,y:(4+o.radius)});
  var p2 = {x:(p1.x+20),y:(p1.y)};
  drawLine(p1,p2,"rgba(200,50,50,1)");
  p2.x = p1.x + 20*(o.health/o.maxHealth);
  drawLine(p1,p2,"rgba(150,200,150,1)");
}

function drawRange(o){
  //draw range
  drawCircle(o.position, o.range, "rgba(0,255,0,0.06)", "rgba(255,255,255,0.0)");
}

function drawProtoTower(proto){
  if(checkCollisions(proto) || proto.price > gems){
    drawCircle(proto.position,proto.radius,"rgba(0,0,0,0)","rgba(255,100,100,100)");
  }else{
    drawCircle(proto.position,proto.radius,"rgba(0,0,0,0)","rgba(100,255,100,100)");
  }

  //draw connections
  proto.connected = [];
  protoConnect(proto);

  for(var j = 0; j < proto.connected.length; j++){
    var o = proto.connected[j];
    drawLine(getCenter(proto),getCenter(o),"rgba(20,80,200,1)");
  }

  //draw firing radius
  drawCircle(proto.position, proto.range, "rgba(0,0,0,0)", "rgba(255,255,255,0.6)");
}

function drawBuilding(o){
  var topLeft = subtract(o.position,{x:o.width/2,y:o.height/2});
  var bottomRight = add(o.position,{x:o.width/2,y:o.height/2});
  drawRectangle(topLeft, o.height, o.width,"rgba(0,255,0,0.1)","rgba(100,255,255,1)");
  //draw energy level
  var p1 = subtract(topLeft,{x:0,y:3});
  var p2 = {x:bottomRight.x,y:p1.y};
  drawLine(p1,p2,"rgba(100,100,100,1)");
  p2.x = p1.x + (o.energy/o.energyMax)*(p2.x-p1.x);
  drawLine(p1,p2,"rgba(100,150,200,1)");
  //draw health level
  p1 = subtract(topLeft,{x:0,y:6});
  p2 = {x:bottomRight.x,y:p1.y};
  drawLine(p1,p2,"rgba(200,50,50,1)");
  p2.x = p1.x + (o.health/o.maxHealth)*(p2.x-p1.x);
  drawLine(p1,p2,"rgba(150,200,150,1)");
}

function drawProtoBuilding(proto){
  if(checkCollisions(proto) || proto.price > gems){
    drawRectangle(proto.topLeft,subtract(proto.bottomRight,proto.topLeft),"rgba(0,0,0,0)","rgba(255,100,100,100)");
  }else{
    drawRectangle(proto.topLeft,subtract(proto.bottomRight,proto.topLeft),"rgba(0,0,0,0)","rgba(100,255,100,100)");
  }

  //draw connections
  proto.connected = [];
  protoConnect(proto);

  for(var j = 0; j < proto.connected.length; j++){
    var o = proto.connected[j];
    drawLine(getCenter(proto),getCenter(o),"rgba(20,80,200,1)");
  }
}

function drawShip(o){
  drawCircle(o.position,o.radius,"rgba(255,0,0,0.6)","rgba(255,255,255,0.3)");
  //draw health level
  var p1 = subtract(o.position,{x:10,y:(4+o.radius)});
  var p2 = {x:(p1.x+20),y:(p1.y)};
  drawLine(p1,p2,"rgba(200,50,50,1)");
  p2.x = p1.x + 20*(o.health/o.maxHealth);
  drawLine(p1,p2,"rgba(150,200,150,1)");
}

function drawProjectile(p){
  drawCircle(p.position,p.radius,p.color,"rgba(0,0,0,0)");
}

function drawEnemyProjectile(p){
  drawCircle(p.position,p.radius,p.color,"rgba(255,0,0,0.5)");
}

function displayEnergy(){
  if(getEnergyCapacity()>0){
    document.getElementById("amount").style.width = ""+(100*getEnergyTotal()/getEnergyCapacity())+"%";
  }else{
    document.getElementById("amount").style.width = "0%";
  }
  document.getElementById("amount").innerHTML ="&nbsp" + Math.round(getEnergyTotal()) + "e";
}

function writeMessage(message){
  document.getElementById("message").innerHTML = message;
}

function displayGems(){
  document.getElementById("gems").innerHTML = gems + "G";
}

function showPrices(){
  document.getElementById("text").innerHTML =
    "<strong>Prices:</strong><br><table class=\"prices\">"+
    "<tr><td>default building:</td><td>"+prices.defaultBuilding+"G</td></tr>"+
    "<tr><td>battery:</td><td>"+prices.battery+"G</td></tr>"+
    "<tr><td>solar farm:</td><td>"+prices.solarFarm+"G</td></tr>"+
    "<tr><td>default tower:</td><td>"+prices.defaultTower+"G</td></tr>"+
    "<tr><td>ranged tower:</td><td>"+prices.rangedTower+"G</td></tr>"+
    "<tr><td>heavy tower:</td><td>"+prices.heavyTower+"G</td></tr>"+
    "<tr><td>chaingun tower:</td><td>"+prices.chaingunTower+"G</td></tr>"+
    "<tr><td>seeking tower:</td><td>"+prices.seekingTower+"G</td></tr>"+
    "<tr><td>connection tower:</td><td>"+prices.connectionTower+"G</td></tr>"+
    "<tr><td>repair building:</td><td>"+prices.repairBuilding+"G</td></tr>"+
    "<tr><td>fusion generator:</td><td>"+prices.fusionGenerator+"G</td></tr>"+
    "</table>";
}

function describeBuilding(element,building){
  var tip = "<span class=\"tooltip\">"+
  "price: "+building.price+"G<br>"+
  "health: "+building.maxHealth+"<br>"+
  "energy capacity: "+building.energyMax+"e<br>"+
  "energy production: "+(building.energyRate*20)+"e/s<br>";
  if(building.heal){
    tip +=
    "heal: "+building.heal.healAmount+"<br>"+
    "energy/heal: "+building.heal.energyReqired+"e<br>"+
    "heals/sec: "+20/building.heal.cooldown+"/s<br>";
  }
  if(building.activationEnergy){
    tip +=
    "activation energy: "+building.activationEnergy+"e<br>";
  }
  tip += "</span>";

  element.innerHTML = element.innerHTML + tip;
}

function describeTower(element,tower){
  var tip = "<span class=\"tooltip\">"+
  "price: "+tower.price+"G<br>"+
  "health: "+tower.maxHealth+"<br>"+
  "range: "+tower.range+"<br>"+
  "damage: "+tower.projectile.damage+"<br>"+
  "fire rate: "+(20/tower.fireCooldown)+"/s<br>"+
  "energy/fire: "+tower.fireEnergy+"e<br>";
  if(tower.projectile.target){
    tip += "seeking<br>";
  }
  if(tower.projectile.persist){
    tip += "projectiles persist<br>";
  }
  tip += "</span>";

  element.innerHTML = element.innerHTML + tip;
}



// setup

var canvas = document.getElementById("canvas");

canvas.width = (document.body.clientWidth-10) * 0.70 ;
canvas.height = document.body.clientHeight - 10 ;

var ctx = canvas.getContext("2d");

function toggleHeal(){
  heal = !heal;
  if(heal){
    document.getElementById("heal").innerHTML = "pause healing";
  }else{
    document.getElementById("heal").innerHTML = "resume healing";
  }
}

document.getElementById("heal").addEventListener("click",toggleHeal);

function disableAllButtons(){
  var buttons = document.getElementsByTagName("button");
  for(var i = 0; i < buttons.length; i++){
    buttons[i].disabled = true;
  }
}

function enableAllButtons(){
  var buttons = document.getElementsByTagName("button");
  for(var i = 0; i < buttons.length; i++){
    buttons[i].disabled = false;
  }
}

var paused = false;
function pause(){
  paused = !paused;
  if(!paused){
    document.getElementById("defaultBuilding").disabled = true;
    document.getElementById("defaultTower").disabled = true;
    document.getElementById("battery").disabled = true;
    document.getElementById("rangedTower").disabled = true;
    document.getElementById("solarFarm").disabled = true;
    document.getElementById("heavyTower").disabled = true;
    document.getElementById("chaingunTower").disabled = true;
    document.getElementById("seekingTower").disabled = true;
    document.getElementById("repairBuilding").disabled = true;
    document.getElementById("fusionGenerator").disabled = true;
    document.getElementById("missileTower").disabled = true;
    document.getElementById("goliathTower").disabled = true;
    document.getElementById("relay").disabled = true;
    document.getElementById("selectObject").disabled = true;
    document.getElementById("pause").innerHTML = "pause";
  }else{
    document.getElementById("defaultBuilding").disabled = false;
    document.getElementById("defaultTower").disabled = false;
    document.getElementById("battery").disabled = false;
    document.getElementById("rangedTower").disabled = false;
    document.getElementById("solarFarm").disabled = false;
    document.getElementById("heavyTower").disabled = false;
    document.getElementById("chaingunTower").disabled = false;
    document.getElementById("seekingTower").disabled = false;
    document.getElementById("repairBuilding").disabled = false;
    document.getElementById("fusionGenerator").disabled = false;
    document.getElementById("missileTower").disabled = false;
    document.getElementById("goliathTower").disabled = false;
    document.getElementById("relay").disabled = false;
    document.getElementById("selectObject").disabled = false;
    document.getElementById("pause").innerHTML = "resume";
  }
}

document.getElementById("pause").addEventListener("click",pause);





state = new GameState();
a = new Tower({x:40,y:20},state);
b = new Building({x:200,y:80}, state);
drawTower(a);
drawBuilding(b);
cp = getClosestPoints(a,b);
drawLine(cp[0],cp[1]);

b2 = new Building({x:345,y:74}, state);
drawBuilding(b2);
cp = getClosestPoints(b,b2);
drawLine(cp[0],cp[1]);

b3 = new Building({x:35,y:114}, state);
drawBuilding(b3);
cp = getClosestPoints(b3,b);
drawLine(cp[0],cp[1]);

cp = getClosestPoints(b3,a);
drawLine(cp[0],cp[1]);



// ok
