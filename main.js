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

<<<<<<< HEAD
=======
function makeTowers(n,t){
  i = 0;
  while(i<n/t){
    a = new Tower({x:i*70+20,y:i+75},state);
    state.world.push(a);
    i++;
  }
  while(i<2*n/t){
    a = new HeavyTower({x:i*70+20,y:i+75},state);
    state.world.push(a);
    i++;
  }
  while(i<3*n/t){
    a = new SeekingTower({x:i*70+20,y:i+75},state);
    state.world.push(a);
    i++;
  }
  while(i<4*n/t){
    a = new MultiShotTower({x:i*70+20,y:i+75},state);
    state.world.push(a);
    i++;
  }
  
}
function makeBuildings(n,t){
  i = 0;
  while(i<n/t){
    a = new Building({x:i*70+20,y:i+25},state);
    state.world.push(a);
    i++;
  }
  while(i<2*n/t){
    a = new SolarPanel({x:i*70+20,y:i-20},state);
    state.world.push(a);
    i++;
  }
  while(i<3*n/t){
    a = new PowerPlant({x:i*70+20,y:i+25},state);
    state.world.push(a);
    i++;
  }
  while(i<4*n/t){
    a = new SolarFarm({x:i*70+20,y:i+25},state);
    state.world.push(a);
    i++;
  }
}

function makeShips(n,wave){
  i = 0;
  while(i<n){
    a = new Ship({x:i*80+20,y:i+200+getRandomInt(300*wave, 500*wave)},state);
    state.world.push(a);
    i++;
  }
}

async function main(state){
  while("Vincent" > "Michael"){
    while(!paused){
      step(state);
      await sleep(25);
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

main(state);