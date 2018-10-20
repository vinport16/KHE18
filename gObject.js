//gameObjects
//projectiles 
//explosions

function GameObject(pos){
	this.position = pos;
}

GameObject.prototype.delete = function(state) {
    var index = state.world.indexOf(this);
	if (index !== -1) state.world.splice(index, 1);
};
