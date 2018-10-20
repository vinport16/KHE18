// drawing functions

function drawEverything(state){
	clearCanvas();
	drawWorld(state);
}

function drawWorld(state){
	for(var i in state.world){
    gobj = state.world[i];
		if(gobj.width != null){
			drawBuilding(gobj);
		}else if(gobj instanceof Ship){
			drawShip(gobj);
		}else if(gobj instanceof Tower){
			drawTower(gobj);
		}else{
			console.log(typeof gobj);
		}

    if(gobj.connected){
      others = gobj.connected;
      for(var j in others){
        points = getClosestPoints(gobj, others[j], "rgba(0,200,150,0.1)");
        drawLine(points[0],points[1]);
      }
    }

    if(gobj.activeConnections){
      others = gobj.activeConnections;
      for(var j in others){
        points = getClosestPoints(gobj, others[j], "rgba(0,200,150,0.1)");
        drawLine(points[0],points[1]);
      }
    }
	}
}

function clearCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function clearListeners(){
  var clone = canvas.cloneNode(true);
  canvas.parentNode.replaceChild(clone, canvas);
  canvas = clone;
  ctx = canvas.getContext("2d");

  drawEverything();
}

function drawCircle(position, r, fill, stroke){
	ctx.beginPath();
  ctx.arc(position.x, position.y, r, 0, 2 * Math.PI, false);
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.fill();
  ctx.stroke();
}

function drawRectangle(tl, h, w, fill, stroke){
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.rect(tl.x, tl.y, w, h);
  ctx.fill();
  ctx.stroke();
}

function drawLine(v1, v2, stroke){
	ctx.beginPath();
	ctx.moveTo(v1.x,v1.y);
	ctx.lineTo(v2.x,v2.y);
	ctx.lineWidth = 2;
	ctx.strokeStyle = stroke;
	ctx.stroke();
}

function drawTower(o){
  drawCircle(o.position,o.radius,o.color,"rgba(255,255,100,1)");
  //draw health level
  var p1 = subtract(o.position,{x:10,y:(4+o.radius)});
  var p2 = {x:(p1.x+20),y:(p1.y)};
  drawLine(p1,p2,"rgba(200,50,50,1)");
  p2.x = p1.x + 20*(o.health/o.maxHealth);
  drawLine(p1,p2,"rgba(150,200,150,1)");
}

function drawRange(o){
  //draw range
  drawCircle(o.position, o.range, "rgba(0,255,0,0.06)", "rgba(255,255,255,0.0)");
}

function drawProtoTower(proto){
  if(checkCollisions(proto) || proto.price > gems){
    drawCircle(proto.position,proto.radius,"rgba(0,0,0,0)","rgba(255,100,100,100)");
  }else{
    drawCircle(proto.position,proto.radius,"rgba(0,0,0,0)","rgba(100,255,100,100)");
  }

  //draw connections
  proto.connected = [];
  protoConnect(proto);

  for(var j = 0; j < proto.connected.length; j++){
    var o = proto.connected[j];
    drawLine(getCenter(proto),getCenter(o),"rgba(20,80,200,1)");
  }

  //draw firing radius
  drawCircle(proto.position, proto.range, "rgba(0,0,0,0)", "rgba(255,255,255,0.6)");
}

function drawBuilding(o){
  var topLeft = subtract(o.position,{x:o.width/2,y:o.height/2});
  var bottomRight = add(o.position,{x:o.width/2,y:o.height/2});
  drawRectangle(topLeft, o.height, o.width,"rgba(0,255,0,0.1)","rgba(100,255,255,1)");
  //draw energy level
  var p1 = subtract(topLeft,{x:0,y:3});
  var p2 = {x:bottomRight.x,y:p1.y};
  drawLine(p1,p2,"rgba(100,100,100,1)");
  p2.x = p1.x + (o.energy/o.energyMax)*(p2.x-p1.x);
  drawLine(p1,p2,"rgba(100,150,200,1)");
  //draw health level
  p1 = subtract(topLeft,{x:0,y:6});
  p2 = {x:bottomRight.x,y:p1.y};
  drawLine(p1,p2,"rgba(200,50,50,1)");
  p2.x = p1.x + (o.health/o.maxHealth)*(p2.x-p1.x);
  drawLine(p1,p2,"rgba(150,200,150,1)");
}

function drawProtoBuilding(proto){
  if(checkCollisions(proto) || proto.price > gems){
    drawRectangle(proto.topLeft,subtract(proto.bottomRight,proto.topLeft),"rgba(0,0,0,0)","rgba(255,100,100,100)");
  }else{
    drawRectangle(proto.topLeft,subtract(proto.bottomRight,proto.topLeft),"rgba(0,0,0,0)","rgba(100,255,100,100)");
  }

  //draw connections
  proto.connected = [];
  protoConnect(proto);

  for(var j = 0; j < proto.connected.length; j++){
    var o = proto.connected[j];
    drawLine(getCenter(proto),getCenter(o),"rgba(20,80,200,1)");
  }
}

function drawShip(o){
  drawCircle(o.position,o.radius,"rgba(255,0,0,0.6)","rgba(255,255,255,0.3)");
  //draw health level
  var p1 = subtract(o.position,{x:10,y:(4+o.radius)});
  var p2 = {x:(p1.x+20),y:(p1.y)};
  drawLine(p1,p2,"rgba(200,50,50,1)");
  p2.x = p1.x + 20*(o.health/o.maxHealth);
  drawLine(p1,p2,"rgba(150,200,150,1)");
}

function drawProjectile(p){
  drawCircle(p.position,p.radius,p.color,"rgba(0,0,0,0)");
}

function drawEnemyProjectile(p){
  drawCircle(p.position,p.radius,p.color,"rgba(255,0,0,0.5)");
}