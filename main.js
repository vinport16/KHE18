function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

state = new GameState();
state.position = {x:-canvas.width/2,y:-canvas.height/2};

paused = false;
pause(); //immediately pause the game

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeShips(point, r1, r2, level, state){
  n = level*5;
  if (level % 5 == 0){
    for(i = 0; i < n; i++){
      var s1 = new Ship(makePointIn(point,r1,r2,state));
        s1.bounty = 20;
        state.world.push(s1);
    }
  }else{
    for(i = 0; i < n; i++){
      var type = getRandomInt(0,level);
      if(type <= 4){
        var s1 = new Ship(makePointIn(point,r1,r2,state));
        s1.bounty = 51-level;
        if(s1.bounty < 5){
          s1.bounty = 5;
        }
        state.world.push(s1);
      }else if(type <= 8){
        var s1 = new BigShip(makePointIn(point,r1,r2,state));
        s1.bounty = 101-level;
        if(s1.bounty < 10){
          s1.bounty = 10;
        }
        state.world.push(s1);
      }else if(type <= 12){
        var s1 = new SpeedyShip(makePointIn(point,r1,r2,state));
        s1.bounty = 21-level;
        if(s1.bounty < 2){
          s1.bounty = 2;
        }
        state.world.push(s1);
      }else if(type <= 16){
        var s1 = new MotherShip(makePointIn(point,r1,r2,state));
        s1.bounty = 301-level;
        if(s1.bounty < 30){
          s1.bounty = 30;
        }
        state.world.push(s1);
      }else if(type <= 20){
        var s1 = new GrandmotherShip(makePointIn(point,r1,r2,state));
        s1.bounty = 501-level*2;
        if(s1.bounty < 50){
          s1.bounty = 50;
        }
        state.world.push(s1);
      }
    }
  }
  return state;
}

//Add Resources to the map, have one every 800 px 
function addResources(){
  var resources = []
  var totalAmountLeft = 10000;
  var oreAmountLeft = totalAmountLeft;
  var iceAmountLeft = totalAmountLeft;
  var ironAmountLeft = totalAmountLeft;
  var uraniumAmountLeft = totalAmountLeft;
  for(var i = 0; i < 40; i++){
    var location = {x:0,y:0};
    var amount = 0;
    if(i < 10){
      var location = makePointIn(zeroVector, 200, 600, state)
      var amount = getRandomInt(50, Math.max(Math.abs(location.x) + Math.abs(location.y), 100));
    }else if (i < 30){
      var location = makePointIn(zeroVector, 500, 1500, state)
      var amount = getRandomInt(100, Math.abs(location.x) + Math.abs(location.y)/1.5);
    }else{
      var location = makePointIn(zeroVector, 1200, 2000, state)
      var amount = getRandomInt(150, (Math.abs(location.x) + Math.abs(location.y)) /2);
    }
    
    
    type = getRandomInt(1, 4);
    switch(type){
      case 1:
        if(oreAmountLeft == 0){
          i--; //don't add an item to this index this turn
          console.log("Out of ore");
          break;
        }else if(amount <= oreAmountLeft){
          resources[i] = new Ore(location, amount, state);
          oreAmountLeft -= amount;
          console.log(oreAmountLeft + " ore left");
        }else{
          amount = oreAmountLeft;
          resources[i] = new Ore(location, amount, state);
          oreAmountLeft -= amount;
        }
        break;
      case 2:
        if(iceAmountLeft == 0){
          i--; //don't add an item to this index this turn
          console.log("Out of ice");
          break;
        }else if(amount <= iceAmountLeft){
          resources[i] = new Ice(location, amount, state);
          iceAmountLeft -= amount;
          console.log(iceAmountLeft + " ice left");
        }else{
          amount = iceAmountLeft;
          resources[i] = new Ice(location, amount, state);
          iceAmountLeft -= amount;
        }
        break;
      case 3:
        if(ironAmountLeft == 0){
          i--; //don't add an item to this index this turn
          console.log("Out of iron");
          break;
        }else if(amount <= ironAmountLeft){
          resources[i] = new Iron(location, amount, state);
          ironAmountLeft -= amount;
          console.log(ironAmountLeft + " iron left");
        }else{
          amount = ironAmountLeft;
          resources[i] = new Iron(location, amount, state);
          ironAmountLeft -= amount;
        }        
        break;
      case 4:
        if(uraniumAmountLeft == 0){
          i--; //don't add an item to this index this turn
          console.log("Out of uranium");
          break;
        }else if(amount <= uraniumAmountLeft){
          resources[i] = new Uranium(location, amount, state);
          uraniumAmountLeft -= amount;
          console.log(uraniumAmountLeft + " iron uranium");
        }else{
          amount = uraniumAmountLeft;
          resources[i] = new Uranium(location, amount, state);
          uraniumAmountLeft -= amount;
        }        
        break;
    }  
    if(oreAmountLeft == 0 && iceAmountLeft == 0 && ironAmountLeft == 0 && uraniumAmountLeft == 0){
      i = 50;
    }  
  }

  for(var i = 0; i < resources.length; i++){
    state.world.push(resources[i]);
  }
}


//make the master tower
var masterBuilding = new MasterBuilding({x:0,y:0}, state);
state.world.push(masterBuilding);

addResources();

//start the first level. 
makeShips(zeroVector,1000,2000,state.level,state);
var delay = 0;

function allKilled(state){
  for(i in state.world){
    if(state.world[i] instanceof Ship && !(state.world[i] instanceof FriendlyShip)){
      return state;
    }
  }
  if(delay == 250){
    state.level++;
    updateLevelDisplay("Level " + state.level);
    if(state.level > state.highestLevel){
      state.highestLevel = state.level;
      updateHighestLevelDisplay("Highest Level: " + state.highestLevel);
    }
    writeMessage("Level " + state.level + " in progress.");
    delay = 0;
    return makeShips(zeroVector,1000,1200,state.level,state);
  }else{
    delay ++;
    var nextLevel = state.level + 1
    writeMessage("Level " + state.level + " complete. Level " + nextLevel + " starting soon.");
    return state;
  }
}

//var NT = new ShipTower({x:0,y:0}, state);
//state.world.push(NT);

async function main(state){
  while("Vincent" > "Michael"){
    while(!paused){
      step(state);
      await sleep(25);
      scaleCanvasses();

      state = allKilled(state);
    }
    await sleep(25);
    scaleCanvasses();
  }
}
  
function step(state){
  state.world.forEach(function(gobject){
    if(gobject.activeConnections){
      gobject.activeConnections = [];
    }
  });
  var masterBuildingAlive = false;
  state.world.forEach(function(gobject){
    if(gobject instanceof MasterBuilding){
      masterBuildingAlive = true;
    }
    gobject.step(state);
  });
  if(!masterBuildingAlive){
    paused = true;
    alert("Game over, you lost on level " + state.level + "! Would you like to restart?");
    //Restart the game
    state.level = 1;
    state.world = []; //list of every game object
    state.position = {x:0,y:0};
    state.money = 2000;
    state.iron = 0;
    state.ore = 0;
    state.ice = 0;
    state.uranium = 0;
    state.level = 1;
    state.shipsKilled = 0;
    state.currentStep = 0;
    state.selectedStructure = null;
    writeMessage("Game Restarted. Level " + state.level + " starting soon.");
    updateLevelDisplay("Level " + state.level);
    state.position = {x:-canvas.width/2,y:-canvas.height/2};
    paused = false;
    pause();

    //make the master tower
    var masterBuilding = new MasterBuilding({x:0,y:0}, state);
    state.world.push(masterBuilding);
    addResources();
    //start the first level. 
    makeShips(zeroVector,1000,2000,state.level,state);
    var delay = 0;

  }
  drawEverything(state);
}

clearListeners(state);
updateSelectedDetails(state.selectedStructure);
resetSelect();

drawEverything(state);

main(state);