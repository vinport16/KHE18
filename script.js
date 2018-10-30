
function writeMessage(message){
  document.getElementById("message").innerHTML = message;
}

function updateLevelDisplay(levelMessage){
  document.getElementById("levels").innerHTML = levelMessage;
}

function describeObject(element,object){

  tip = "<span class=\"tooltip\">";
  
  tip += "name: "+object.name;
  tip += "<br>price: "+object.price;

  if(object instanceof Tower){
    if(object instanceof MultiShotTower){
      tip += "<br>damage/sec: "+((object.projectileDamage*object.numberOfShots)/(object.bufferTime/25)).toFixed(2);
      tip += "<br>energy/damage: "+(object.projectileEnergy/(object.projectileDamage*object.numberOfShots)).toFixed(2);
    }else{
      tip += "<br>damage/sec: "+(object.projectileDamage/(object.bufferTime/25)).toFixed(2);
      tip += "<br>energy/damage: "+(object.projectileEnergy/object.projectileDamage).toFixed(2);
    }
    tip += "<br>health: "+object.maxHealth;
  }else if(object instanceof Building){
    tip += "<br>energy/sec: "+(object.energyRate*25);
    tip += "<br>energy storage: "+(object.energyMax);
    tip += "<br>health: "+object.maxHealth;
    if(object instanceof RepairBuilding){
      tip += "<br>heal/sec: "+(object.heal/(object.bufferTime/25)).toFixed(2);
      tip += "<br>energy/heal: "+(object.heal/object.healEnergy).toFixed(2);
    }
  }else{
    for (var key in object) {
      if (object.hasOwnProperty(key) && key != "name" && key != "price" && key != "tree") {
       tip += "<br>"+key+": "+object[key];
      }
    }
  }

  tip += "</script>"
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

function scaleCanvasses(){
  if(canvas.width < ((document.body.clientWidth-10) * 0.70) - 2 || canvas.width > ((document.body.clientWidth-10) * 0.70) + 2 || canvas.height < document.body.clientHeight - 12 || canvas.height > document.body.clientHeight - 8){
    canvas.width = (document.body.clientWidth-10) * 0.70 ;
    canvas.height = document.body.clientHeight - 10 ;
    map.width = (document.body.clientWidth-10) * 0.28 ;
    map.height = map.width/1.3 ;
    drawEverything(state);
  }
}

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
  document.getElementById("up1").innerHTML = "upgrade";
  var clone = document.getElementById("up1").cloneNode(true);
  document.getElementById("up1").parentNode.replaceChild(clone, document.getElementById("up1"));
  document.getElementById("up1").disabled = true;

  document.getElementById("up2").innerHTML = "upgrade";
  var clone = document.getElementById("up2").cloneNode(true);
  document.getElementById("up2").parentNode.replaceChild(clone, document.getElementById("up2"));
  document.getElementById("up2").disabled = true;

  var clone = document.getElementById("selectSell").cloneNode(true);
  document.getElementById("selectSell").parentNode.replaceChild(clone, document.getElementById("selectSell"));
  document.getElementById("selectSell").disabled = true;

  document.getElementById("selectTarget").disabled = true;

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
      describeObject(document.getElementById("up1"),struct.tree[0]);
      document.getElementById("up1").disabled = false;
    }

    if(struct.tree[1]){
      document.getElementById("up2").innerHTML = struct.tree[1].name;
      document.getElementById("up2").addEventListener("click", function(){
        struct.upgrade(struct.tree[1], state);
        updateSelectedDetails(state.selectedStructure);
        drawEverything(state);
      });
      describeObject(document.getElementById("up2"),struct.tree[1]);
      document.getElementById("up2").disabled = false;
    }

    document.getElementById("selectSell").addEventListener("click", function(){
      struct.sell(state);
      state.selectedStructure = null;
      drawEverything(state);
      resetSelect();
    });
    document.getElementById("selectSell").disabled = false;
    document.getElementById("selectSell").innerHTML += "<span class='tooltip'>"+(struct.price/(struct.maxHealth/struct.health))+"$</span>";

    document.getElementById("selectTarget").disabled = false;
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

function resetCancel(){
  cancel = document.getElementById("cancel");

  clone = cancel.cloneNode(true);
  cancel.parentNode.replaceChild(clone, cancel);

  cancel.addEventListener("click",function(){
    clearListeners(state);
    state.selectedStructure = null;
    enableAllButtons();
    updateSelectedDetails();
  });
}
resetCancel();

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

    map.addEventListener("mouseleave", function(event){
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
    updateSelectedDetails(state.selectedStructure);
    drawEverything(state);
  });
}


function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
}

toggle_visibility(testTutorial);



// ok
