// drawing functions

function drawEverything(state){
	clearCanvas();
  clearMap();
	drawWorld(state);
  displayMoney(state);
  displayEnergy(state);
}

function displayMoney(state){
  document.getElementById("gems").innerHTML = state.money + "$";
}

function displayEnergy(state){
  ec = state.getEnergyCapacity();
  et = state.getEnergyTotal();
  if(ec>0){
    document.getElementById("amount").style.width = ""+(100*et/ec)+"%";
  }else{
    document.getElementById("amount").style.width = "0%";
  }
  document.getElementById("amount").innerHTML ="&nbsp" + Math.round(et) + "e";
}

function drawWorld(state){
  // draw ranges
  for(var i in state.world){
    gobj = state.world[i];
    if(gobj instanceof Tower){
      drawRange(gobj, state);
    }
  }
  // draw connections
  for(var i in state.world){
    gobj = state.world[i];

    if(gobj.connected){
      others = gobj.connected;
      for(var j in others){
        points = getClosestPoints(gobj, others[j]);
        drawLine(relative(points[0],state),relative(points[1],state),  "rgba(20,80,200,0.3)");
      }
    }

    if(gobj.activeConnections){
      others = gobj.activeConnections;
      for(var j in others){
        points = getClosestPoints(gobj, others[j]);
        drawLine(relative(points[0],state),relative(points[1],state),  "rgba(50,255,200,0.5)");
      }
    }
  }
  // draw gobjects
	for(var i in state.world){
    gobj = state.world[i];
		if(gobj.width != null){
			drawBuilding(gobj, state);
      mapDrawBuilding(gobj, state);
		}else if(gobj instanceof Ship){
			drawShip(gobj, state);
      mapDrawShip(gobj, state);
		}else if(gobj instanceof Tower){
			drawTower(gobj, state);
      mapDrawTower(gobj, state);
		}else if(gobj instanceof Projectile){
      drawProjectile(gobj, state);
    }else{
			console.log(typeof gobj);
		}

    
	}
  if(state.selectedStructure){
    highlight(state.selectedStructure,state); 
  }
}

function clearCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function clearMap(){
  maptx.clearRect(0,0,map.width,map.height);
}

function clearListeners(state){
  var clone = canvas.cloneNode(true);
  canvas.parentNode.replaceChild(clone, canvas);
  canvas = clone;
  ctx = canvas.getContext("2d");

  drawEverything(state);
  resetSelect();
}

function clearMapListeners(state){
  var clone = map.cloneNode(true);
  map.parentNode.replaceChild(clone, map);
  map = clone;
  maptx = map.getContext("2d");

  drawEverything(state);
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

function highlight(struct, state){
  if(struct.width){
    drawRectangle(relative(subtract(struct.position, {x:struct.width/2+20,y:struct.height/2+20}),state), struct.height+40, struct.width+40, "rgba(255,255,255,0)","rgba(255,255,255,1)" )
  }else{
    drawCircle(relative(struct.position,state),struct.radius+20,"rgba(255,255,255,0)","rgba(255,255,255,1)");
  }
}

function mapDrawTower(tower,state){
  rp = multiply({x:map.width/2, y:map.height/2}, mapscale);
  rp = add(tower.position, subtract(rp, add(state.position, {x:canvas.width/2, y:canvas.height/2})));
  rp = divide(rp,mapscale);
  radius = (tower.range+tower.radius)/mapscale;

  maptx.beginPath();
  maptx.arc(rp.x, rp.y, radius, 0, 2 * Math.PI, false);
  maptx.fillStyle = "rgba(0,255,0,0.06)";
  maptx.strokeStyle = "rgba(255,255,255,0.0)";
  maptx.lineWidth = 1;
  maptx.fill();
  maptx.stroke();
}

function mapDrawBuilding(building, state){
  rp = multiply({x:map.width/2, y:map.height/2}, mapscale);
  rp = add(subtract(building.position,{x:building.width/2, y:building.height/2}), subtract(rp, add(state.position, {x:canvas.width/2, y:canvas.height/2})));
  rp = divide(rp,mapscale);
  width = building.width/mapscale;
  height = building.height/mapscale;

  maptx.beginPath();
  maptx.fillStyle = "rgba(100,255,255,0.7)";
  maptx.strokeStyle = "rgba(100,255,255,0)";
  maptx.lineWidth = 1;
  maptx.rect(rp.x, rp.y, width, height);
  maptx.fill();
  maptx.stroke();
}

function mapDrawShip(ship, state){
  rp = multiply({x:map.width/2, y:map.height/2}, mapscale);
  rp = add(ship.position, subtract(rp, add(state.position, {x:canvas.width/2, y:canvas.height/2})));
  rp = divide(rp,mapscale);

  radius = (ship.radius)/mapscale;
  if(radius < 2){ radius = 2; }

  maptx.beginPath();
  maptx.arc(rp.x, rp.y, radius, 0, 2 * Math.PI, false);
  maptx.fillStyle = "rgba(255,0,0,1)";
  maptx.strokeStyle = "rgba(255,255,255,0)";
  maptx.lineWidth = 1;
  maptx.fill();
  maptx.stroke();
}

function drawTower(o,state){
  rp = relative(o.position, state);
  drawCircle(rp,o.radius,o.color,"rgba(255,255,100,1)");
  //draw health level
  var p1 = subtract(rp,{x:10,y:(4+o.radius)});
  var p2 = {x:(p1.x+20),y:(p1.y)};
  drawLine(p1,p2,"rgba(200,50,50,1)");
  p2.x = p1.x + 20*(o.health/o.maxHealth);
  drawLine(p1,p2,"rgba(150,200,150,1)");
}

function drawRange(o,state){
  rp = relative(o.position, state);
  //draw range
  drawCircle(rp, o.range+o.radius, "rgba(0,255,0,0.06)", "rgba(255,255,255,0.0)");
}

function drawProto(proto, state){
  if(proto instanceof Tower){
    drawProtoTower(proto, state);
  }else{
    drawProtoBuilding(proto, state);
  }
}

function drawProtoTower(proto,state){
  rp = relative(proto.position, state);
  if(proto.price > state.money || checkStructureOverlap(proto,state)){
    drawCircle(rp,proto.radius,"rgba(0,0,0,0)","rgba(255,100,100,100)");
  }else{
    drawCircle(rp,proto.radius,"rgba(0,0,0,0)","rgba(100,255,100,100)");
  }

  //draw connections
  proto.disconnectAll(state);
  proto.connectToAll(state);

  for(var j = 0; j < proto.connected.length; j++){
    var o = proto.connected[j];
    points = getClosestPoints(proto, o);
    drawLine(relative(points[0], state),relative(points[1], state), "rgba(20,80,200,1)");
  }

  //draw firing radius
  drawCircle(rp, proto.range, "rgba(0,0,0,0)", "rgba(255,255,255,0.6)");
}

function drawBuilding(o, state){
  rp = relative(o.position, state);
  var topLeft = subtract(rp,{x:o.width/2,y:o.height/2});
  var bottomRight = add(rp,{x:o.width/2,y:o.height/2});
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

function drawProtoBuilding(proto, state){
  rp = relative(proto.position, state);
  tl = subtract(rp,{x:proto.width/2, y:proto.height/2});
  if(proto.price > state.money || checkStructureOverlap(proto, state)){
    drawRectangle(tl, proto.height, proto.width, "rgba(0,0,0,0)", "rgba(255,100,100,100)");
  }else{
    drawRectangle(tl, proto.height, proto.width, "rgba(0,0,0,0)","rgba(100,255,100,100)");
  }

  //draw connections
  proto.disconnectAll(state);
  proto.connectToAll(state);

  for(var j = 0; j < proto.connected.length; j++){
    var o = proto.connected[j];
    points = getClosestPoints(proto, o);
    drawLine(relative(points[0], state),relative(points[1], state), "rgba(20,80,200,1)");
  }
}

function drawShip(o, state){
  rp = relative(o.position, state);
  drawCircle(rp,o.radius,"rgba(255,0,0,0.6)","rgba(255,255,255,0.3)");
  //draw health level
  var p1 = subtract(rp,{x:10,y:(4+o.radius)});
  var p2 = {x:(p1.x+20),y:(p1.y)};
  drawLine(p1,p2,"rgba(200,50,50,1)");
  p2.x = p1.x + 20*(o.health/o.maxHealth);
  drawLine(p1,p2,"rgba(150,200,150,1)");
}

function drawProjectile(p, state){
  rp = relative(p.position, state);
  drawCircle(rp,p.radius,p.color,"rgba(0,0,0,0)");
}