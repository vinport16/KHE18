function copyArray(a){
  var newa = [];
  for(var i = 0; i < a.length; i++){
    newa[i] = a[i];
  }
  return newa;
}

function getClosestPoints(go1, go2){

  function getPointsCircles(c1, c2){
    unit = unitVector(subtract(c1.position, c2.position));
    p1 = subtract(c1.position, multiply(unit, c1.radius));
    p2 = subtract(c1.position, multiply(unit, distance(c1.position, c2.position)-c2.radius));
    return [p1,p2];
  }

  function getClosestPointRec(point, rec){
    function clamp(x, lower, upper){
      return Math.max(lower, Math.min(upper, x))
    }

    left = rec.position.x - rec.width/2;
    right = rec.position.x + rec.width/2;
    // 'top' is reserved (?) so use 'topp' instead
    topp = rec.position.y - rec.height/2;
    bottom = rec.position.y + rec.height/2;

    x = clamp(point.x, left, right);
    y = clamp(point.y, topp, bottom);

    dl = Math.abs(left - x);
    dr = Math.abs(right - x);
    dt = Math.abs(topp - y);
    db = Math.abs(bottom - y);

    m = Math.min(dl,dr,dt,db);

    if(m == dl){
      p2 = {x:left, y:y};
    }else if(m == dr){
      p2 = {x:right, y:y};
    }else if(m == dt){
      p2 = {x:x, y:topp};
    }else{
      p2 = {x:x, y:bottom};
    }

    return p2;
  }

  function getPointsCircRec(circ, rec){
    p2 = getClosestPointRec(circ.position, rec);

    unit = unitVector(subtract(circ.position, p2));
    p1 = subtract(circ.position, multiply(unit, circ.radius));

    return [p1,p2];
  }

  function getPointsRecs(rec1, rec2){
    corners = [];
    corners.push(subtract(rec1.position,{x:rec1.width/2, y:rec1.height/2}));
    corners.push(subtract(rec1.position,{x:-rec1.width/2, y:rec1.height/2}));
    corners.push(subtract(rec1.position,{x:rec1.width/2, y:-rec1.height/2}));
    corners.push(subtract(rec1.position,{x:-rec1.width/2, y:-rec1.height/2}));

    closest = [Number.MAX_VALUE,{x:0,y:0},{x:0,y:0}];

    for (var i in corners){
      p = getClosestPointRec(corners[i], rec2);
      if(distance(p,corners[i]) < closest[0]){
        closest[0] = distance(p,corners[i]);
        closest[1] = corners[i];
        closest[2] = p;
      }
    }

    return [closest[1],closest[2]];
  }


  if(go1.radius && go2.radius){
    return getPointsCircles(go1, go2);
  }else if(go1.radius && go2.width){
    return getPointsCircRec(go1, go2);
  }else if(go1.width && go2.radius){
    return getPointsCircRec(go2, go1);
  }else{
    return getPointsRecs(go1, go2);
  }
}

function distanceBetween(go1, go2){
  points = getClosestPoints(go1,go2);
  return distance(points[0],points[1]);
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