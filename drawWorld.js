//drawWorld.js

function drawWorld(){
	for each (var obj in state.world){
		if(obj.width != null){
			drawRectangle(obj);
		}else{
			drawCircle(obj);
		}
	}
}