function makeSquad(number, position, state){
  outerRadius = Math.sqrt(number) * 20;

  squad = [];

  for(var i = 0; i < number; i++){
    var ship = new Ship(makePointIn(position, 1, 1+outerRadius, state));
    squad.push(ship);
    ship.squad = squad;
    state.world.push(ship);
  }
  
}