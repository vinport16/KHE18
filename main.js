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
      state.world.push(new Ship(makePointIn(point,r1,r2,state)));
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
  state.world.forEach(function(gobject){
    gobject.step(state);
  });
  drawEverything(state);
}

clearListeners(state);
updateSelectedDetails(state.selectedStructure);
resetSelect();

drawEverything(state);

main(state);