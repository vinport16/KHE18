
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
