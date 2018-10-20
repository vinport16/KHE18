function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

state = new GameState();
state.position = {x:-canvas.width/2,y:-canvas.height/2};
paused = false;

placeBuilding(new Building({x:0,y:0},state), state);




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
    a = new LongRangeTower({x:i*70+20,y:i+75},state);
    state.world.push(a);
    i++;
  }
  while(i<4*n/t){
    a = new MachineGunTower({x:i*70+20,y:i+75},state);
    state.world.push(a);
    i++;
  }
  while(i<5*n/t){
    a = new GoliathTower({x:i*70+20,y:i+75},state);
    state.world.push(a);
    i++;
  }
}
function makeBuildings(n){
  i = 0;
  while(i<n){
    a = new Building({x:i*70+20,y:i+25},state);
    state.world.push(a);
    i++;
  }
}
function makeShips(n,wave){
  i = 0;
  while(i<n){
    a = new Ship({x:i*80+20,y:i+200+300*wave},state);
    state.world.push(a);
    i++;
  }
}

makeTowers(20, 5);
makeBuildings(12);
makeShips(12,1);
makeShips(8,2)





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