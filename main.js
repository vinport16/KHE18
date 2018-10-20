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