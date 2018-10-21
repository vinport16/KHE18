function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

state = new GameState();
state.money = 1000000;
state.position = {x:-canvas.width/2,y:-canvas.height/2};

paused = false;
pause(); //immediately pause the game

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeShips(point, r1, r2, level, state){
  n = level*5;
  for(i = 0; i < n; i++){
    var type = getRandomInt(0,level);
    if(type <= 4){
      state.world.push(new Ship(makePointIn(point,r1,r2),state));
    }else if(type <= 7){
      state.world.push(new BigShip(makePointIn(point,r1,r2),state));
    }else if(type <= 10){
      state.world.push(new MotherShip(makePointIn(point,r1,r2),state));
    }else if(type <= 15){
      state.world.push(new GrandmotherShip(makePointIn(point,r1,r2),state));
    }
  }
  return state;
}



var level = 1;
makeShips(zeroVector,1000,1200,level,state);

function allKilled(state){
  for(i in state.world){
    if(state.world[i] instanceof Ship){
      return state;
    }
  }
  level++;
  return makeShips(zeroVector,1000,1200,level,state);
}



async function main(state){
  while("Vincent" > "Michael"){
    while(!paused){
      step(state);
      await sleep(25);

      state = allKilled(state);
    }
    await sleep(25);
  }
}
  
function step(state){
  // state.step();
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

drawEverything(state);

main(state);