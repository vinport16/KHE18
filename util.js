function copyArray(a){
  var newa = [];
  for(var i = 0; i < a.length; i++){
    newa[i] = a[i];
  }
  return newa;
}

function getClosestPoints(struct1, struct2){

  function getPointsCircles(c1, c2){
    unit = unitVector(subtract(c1.position, c2.position));
    p1 = add(c1.position, multiply(unit, c1.radius));
    p2 = add(c1.position, multiply(unit, distance(c1.position, c2.position)-c2.radius));
    return [p1,p2];
  }

  function getClosestPointRec(point, rec){
    function clamp(x, lower, upper){
      return Math.max(lower, Math.min(upper, x))
    }

    left = rec.position.y - rec.width;
    right = rec.position.y + rec.width;
    top = rec.position.x - rec.height;
    bottom = rec.position.x + rec.height;

    x = clamp(point.x, left, right);
    y = clamp(point.y, top, bottom);

    dl = Math.abs(left - x);
    dr = Math.abs(right - x);
    dt = Math.abs(top - y);
    db = Math.abs(bottom - y);

    m = Math.min(dl,dr,dt,db);

    if(m == dl){
      p2 = {x:left, y:y};
    }else if(m == dr){
      p2 = {x:right, y:y};
    }else if(m == dt){
      p2 = {x:x, y:top};
    }else{
      p2 = {x:x, y:bottom};
    }

    return p2;
  }

  function getPointsCircRec(circ, rec){
    p2 = getClosestPointRec(circ.position, rec);

    unit = unitVector(subtract(c1.position, p2));
    p1 = add(c1.position, multiply(unit, c1.radius));

    return [p1,p2];
  }

  function getPointsRecs(rec1, rec2){
    corners = [];
    corners.push(subtract(rec1.position,{x:rec1.width/2, y:rec1.height/2}));
    corners.push(subtract(rec1.position,{x:-rec1.width/2, y:rec1.height/2}));
    corners.push(subtract(rec1.position,{x:rec1.width/2, y:-rec1.height/2}));
    corners.push(subtract(rec1.position,{x:-rec1.width/2, y:-rec1.height/2}));

    closest = [Number.MAX_VALUE,{x:0,y:0},{x:0,y:0}];

    for each(var corner in corners){
      p = getClosestPointRec(corner, rec2);
      if(distance(p,corner) < closest[0]){
        closest[0] = distance(p,corner);
        closest[1] = corner;
        closest[2] = p;
      }
    }

    return [closest[1],closest[2]];
  }


  if(struct1.radius && struct2.radius){
    return getPointsCircles(struct1, struct2);
  }else if(struct1.radius && struct2.width){
    return getPointsCircRec(struct1, struct2);
  }else if(struct1.width && struct2.radius){
    return getPointsCircRec(struct2, struct1);
  }else{
    return getPointsRecs(struct1, struct2);
  }
}

var zeroVector = {x:0,y:0};

function getVector(e){
  return {x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop};
}

function subtract(v1, v2){
  return {x: v1.x-v2.x, y: v1.y-v2.y};
}

function add(v1, v2){
  return {x: v1.x+v2.x, y: v1.y+v2.y};
}

function divide(v1,n){ //divide a vector by a number
  return {x: v1.x/n, y: v1.y/n};
}

function multiply(v1,n){ //multiply a vector by a number
  return {x: v1.x*n, y: v1.y*n};
}

function distance(v1, v2){
  return Math.sqrt( (v1.x-v2.x)*(v1.x-v2.x) + (v1.y-v2.y)*(v1.y-v2.y) );
}

function unitVector(v){
  return divide(v, distance(zeroVector,v));
}

function rotateVector(vec, ang){
    ang = -ang * (Math.PI/180);
    var cos = Math.cos(ang);
    var sin = Math.sin(ang);
    return {x: Math.round(10000*(vec.x * cos - vec.y * sin))/10000, y: Math.round(10000*(vec.x * sin + vec.y * cos))/10000};
}