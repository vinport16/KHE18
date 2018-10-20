function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

state = new GameState();
paused = false;




function makeTowers(n){
  i = 0;
  while(i<n){
    a = new Tower({x:i*90+100,y:i+75},state);
    state.world.push(a);
    i++;
  }
}
function makeBuildings(n){
  i = 0;
  while(i<n){
    a = new Building({x:i*70+100,y:i+25},state);
    state.world.push(a);
    i++;
  }
}
function makeShips(n){
  i = 0;
  while(i<n){
    a = new Ship({x:i*80+100,y:i+505},state);
    state.world.push(a);
    i++;
  }
}

makeTowers(6);
makeBuildings(6);
makeShips(6);




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