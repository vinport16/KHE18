
function writeMessage(message){
  document.getElementById("message").innerHTML = message;
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


var map = document.getElementById("map");
map.width = (document.body.clientWidth-10) * 0.28 ;
map.height = map.width/1.3 ;
var maptx = map.getContext("2d");
var mapscale = 10;

function toggleHeal(){
  heal = !heal;
  if(heal){
    document.getElementById("heal").innerHTML = "pause healing";
  }else{
    document.getElementById("heal").innerHTML = "resume healing";
  }
}

document.getElementById("heal").addEventListener("click",toggleHeal);

var controlButtons = [
  document.getElementById("pause"),
  document.getElementById("cancel"),
  document.getElementById("ships"),
  document.getElementById("heal")
]

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

function updateSelectedDetails(struct){
  document.getElementById("selectName").innerHTML = "";
  document.getElementById("selectKills").innerHTML = "";
  document.getElementById("selectTarget");

  //remove listeners
  document.getElementById("up1").innerHTML = "";
  var clone = document.getElementById("up1").cloneNode(true);
  document.getElementById("up1").parentNode.replaceChild(clone, document.getElementById("up1"));
  document.getElementById("up1").disabled = true;

  document.getElementById("up2").innerHTML = "";
  var clone = document.getElementById("up2").cloneNode(true);
  document.getElementById("up2").parentNode.replaceChild(clone, document.getElementById("up2"));
  document.getElementById("up2").disabled = true;

  if(struct){
    document.getElementById("selectName").innerHTML = struct.name;
    if(struct.kills){
      document.getElementById("selectKills").innerHTML = "kills: "+ struct.kills;
    }
    if(struct.targetType){
      document.getElementById("selectTarget").value = struct.targetType;
    }
    
    if(struct.tree[0]){
      document.getElementById("up1").innerHTML = struct.tree[0].name;
      document.getElementById("up1").addEventListener("click", function(){
        struct.upgrade(struct.tree[0], state);
        updateSelectedDetails(state.selectedStructure);
        drawEverything(state);
      });
      document.getElementById("up1").disabled = false;
    }

    if(struct.tree[1]){
      document.getElementById("up2").innerHTML = struct.tree[1].name;
      document.getElementById("up2").addEventListener("click", function(){
        struct.upgrade(struct.tree[1]);
        updateSelectedDetails(state.selectedStructure);
        drawEverything(state);
      });
      document.getElementById("up2").disabled = false;
    }
  }
}

document.getElementById("selectTarget").addEventListener("change", function(){
  if(state.selectedStructure){
    state.selectedStructure.targetType = this.value;
  }
})

var paused = false;
function pause(){
  paused = !paused;
  if(!paused){
    disableAllButtons();
    for(var i = 0; i < controlButtons.length; i++){
      controlButtons[i].disabled = false;
    } 
    document.getElementById("pause").innerHTML = "pause";
  }else{
    enableAllButtons();
    document.getElementById("pause").innerHTML = "resume";
  }
}

document.getElementById("pause").addEventListener("click",pause);

document.getElementById("cancel").addEventListener("click",function(){
  clearListeners(state);
  state.selectedStructure = null;
  updateSelectedDetails();
});

function resetMapDrag(){
  
  map.addEventListener("mousedown", function(event){
    originalpos = state.position;
    clickpos = getVector(event);
    map.addEventListener("mousemove", function(event){
      dragpos = getVector(event);

      state.position = add(originalpos,multiply(subtract(clickpos,dragpos),mapscale));
      drawEverything(state);

    });

    map.addEventListener("mouseup", function(event){
      clearMapListeners(state);
      resetMapDrag();
    });
  });
}

resetMapDrag();

function resetSelect(){
  canvas.addEventListener("click", function(event){
    clickpos = absolute(getVector(event),state);
    state.selectedStructure = findStructureAtPoint(clickpos,state);
    console.log(state.selectedStructure);
    updateSelectedDetails(state.selectedStructure);
    drawEverything(state);
  });
}

resetSelect();

var movemode = true;



var hiddenControls = null;

document.getElementById("selectMove").addEventListener("click",function(){
  state.selectedStructure = null;
  movemode = !movemode;
  clearListeners(state);
});


















// ok
