//gameObjects

var GameObject = function (pos) {
}
class GameObject {
  constructor(pos) {
    this.position = pos;
  }

  delete(state) {
    var index = state.world.indexOf(this);
    if (index !== -1) state.world.splice(index, 1);
    this.destroyed = true;
  }
}