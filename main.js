function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

state = new GameState();
paused = false;





a = new Tower({x:40,y:20},state);
state.world.push(a);
b = new Building({x:200,y:80}, state);
state.world.push(b);

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
    gobject.step(state);
  });
  drawEverything(state);
}

main(state);