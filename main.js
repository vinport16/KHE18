function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

state = new GameState();
paused = false;





a = new Tower({x:40,y:20},state);
state.world.push(a);

a1 = new Tower({x:400,y:20},state);
state.world.push(a1);
a2 = new Tower({x:200,y:20},state);
state.world.push(a2);
a3 = new Tower({x:200,y:200},state);
state.world.push(a3);
a3 = new Tower({x:200,y:200},state);
state.world.push(a3);
a3 = new Tower({x:800,y:200},state);
state.world.push(a3);

b = new Building({x:200,y:80}, state);
state.world.push(b);

b1 = new Building({x:800,y:20}, state);
state.world.push(b1);

b2 = new Building({x:345,y:74}, state);
state.world.push(b2);

b4 = new Building({x:380,y:74}, state);
state.world.push(b4);

b3 = new Building({x:35,y:114}, state);
state.world.push(b3);

s = new Ship({x:400, y:400},state);
state.world.push(s);

s1 = new Ship({x:100, y:400},state);
state.world.push(s1);



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