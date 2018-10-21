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

function makeShips(point, r1, r2, n, state){
  for(i = 0; i < n; i++){
    var type = getRandomInt(0,10);
    if(type < 4){
      state.world.push(new Ship(makePointIn(point,r1,r2),state));
    }else if(type < 7){
      state.world.push(new BigShip(makePointIn(point,r1,r2),state));
    }else if(type <= 8){
      state.world.push(new MotherShip(makePointIn(point,r1,r2),state));
    }else if(type <= 9){
      state.world.push(new GrandmotherShip(makePointIn(point,r1,r2),state));
    }
  }
  state.world.push(new BigShip(makePointIn(point,r1,r2),state));
  
}


function spawnLevel(level, state){
  //var dist = getFarthestStructure(state);
  makeShips(zeroVector,800,850,level*5,state);
}

function getFarthestStructure(state){
  var farthest = [false, 0];
  for(i in state.world){
    if(state.world[i] instanceof Structure){
      gobj = state.world[i];
      if(distanceBetween({x:0,y:0}, gobj) > farthest[1]){
        farthest = [gobj, distanceBetween({x:0,y:0},gobj)];
      }
    }
  }
  return farthest[1];
}

function allKilled(level, state){
  var totalKilled = 0;
  for(i in state.world){
    if(state.world[i] instanceof Tower){
      totalKilled += state.world[i].kills;
    }
  }
  var totalSpawned = 0;
  var i = 1;
  while(i <= level){
    totalSpawned += 5*i;
    i++;
  }
  if(totalSpawned == totalKilled){
    return true;
  }else{
    return false;
  }

}

//makeShips(zeroVector,800,2850,50,state);


async function main(state){
  var level = 1;
  spawnLevel(level, state);
  while("Vincent" > "Michael"){
    while(!paused){
      step(state);
      await sleep(25);


      if(allKilled(level, state)){
        level++;
        spawnLevel(level, state);
      }      

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