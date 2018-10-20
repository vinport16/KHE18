function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

state = new GameState();
paused = false;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


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
    a = new Ship({x:i*80+20,y:i+200+getRandomInt(300*wave, 500*wave)},state);
    state.world.push(a);
    i++;
  }
}

a = new GoliathTower({x:1*70+20,y:1+75},state);
state.world.push(a);
b = new GoliathTower({x:2*70+20,y:2+75},state);
state.world.push(b);
c = new GoliathTower({x:3*70+20,y:3+75},state);
state.world.push(c);
d = new GoliathTower({x:4*70+20,y:4+75},state);
state.world.push(d);

//makeTowers(20, 5);//makeTowers(number of towers, number of types of towers);
makeBuildings(20);//makeBuildings(number of buildings)
makeShips(15,1);//makeShips(number of Ships, wave#)
makeShips(8,2);
makeShips(5,3);
makeShips(30,4);





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