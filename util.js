function copyArray(a) {
  var newa = [];
  for (var i = 0; i < a.length; i++) {
    newa[i] = a[i];
  }
  return newa;
}

function getClosestPoints(go1, go2) {

  function getPointsCircles(c1, c2) {
    unit = unitVector(subtract(c1.position, c2.position));
    p1 = subtract(c1.position, multiply(unit, c1.radius));
    p2 = subtract(c1.position, multiply(unit, distance(c1.position, c2.position) - c2.radius));
    return [p1, p2];
  }

  function getClosestPointRec(point, rec) {
    function clamp(x, lower, upper) {
      return Math.max(lower, Math.min(upper, x))
    }

    left = rec.position.x - rec.width / 2;
    right = rec.position.x + rec.width / 2;
    // 'top' is reserved (?) so use 'topp' instead
    topp = rec.position.y - rec.height / 2;
    bottom = rec.position.y + rec.height / 2;

    x = clamp(point.x, left, right);
    y = clamp(point.y, topp, bottom);

    dl = Math.abs(left - x);
    dr = Math.abs(right - x);
    dt = Math.abs(topp - y);
    db = Math.abs(bottom - y);

    m = Math.min(dl, dr, dt, db);

    if (m == dl) {
      p2 = { x: left, y: y };
    } else if (m == dr) {
      p2 = { x: right, y: y };
    } else if (m == dt) {
      p2 = { x: x, y: topp };
    } else {
      p2 = { x: x, y: bottom };
    }

    return p2;
  }

  function getPointsCircRec(circ, rec) {
    p2 = getClosestPointRec(circ.position, rec);

    unit = unitVector(subtract(circ.position, p2));
    p1 = subtract(circ.position, multiply(unit, circ.radius));

    return [p1, p2];
  }

  function getPointsRecs(rec1, rec2) {
    corners = [];
    corners.push(subtract(rec1.position, { x: rec1.width / 2, y: rec1.height / 2 }));
    corners.push(subtract(rec1.position, { x: -rec1.width / 2, y: rec1.height / 2 }));
    corners.push(subtract(rec1.position, { x: rec1.width / 2, y: -rec1.height / 2 }));
    corners.push(subtract(rec1.position, { x: -rec1.width / 2, y: -rec1.height / 2 }));

    closest = [Number.MAX_VALUE, { x: 0, y: 0 }, { x: 0, y: 0 }];

    for (var i in corners) {
      p = getClosestPointRec(corners[i], rec2);
      if (distance(p, corners[i]) < closest[0]) {
        closest[0] = distance(p, corners[i]);
        closest[1] = corners[i];
        closest[2] = p;
      }
    }

    return [closest[1], closest[2]];
  }


  if (!(go1 instanceof Building) && !(go2 instanceof Building)) {
    return getPointsCircles(go1, go2);
  } else if (!(go1 instanceof Building) && go2 instanceof Building) {
    return getPointsCircRec(go1, go2);
  } else if (go1 instanceof Building && !(go2 instanceof Building)) {
    return getPointsCircRec(go2, go1).reverse();
  } else {
    p1s = getPointsRecs(go1, go2);
    p2s = getPointsRecs(go2, go1);
    // if one of the lines is shorter, choose that one
    if (distance(p1s[0], p1s[1]) > distance(p2s[0], p2s[1])) {
      return p2s;
    } else if (distance(p1s[0], p1s[1]) < distance(p2s[0], p2s[1])) {
      return p1s;
    }
    // if they are the same length but different points,
    // choose the one furthest from the origin (arbitrary but consistent)
    if (p1s[0].x + p1s[1].x + p1s[0].y + p1s[1].y > p2s[0].x + p2s[1].x + p2s[0].y + p2s[1].y) {
      return p1s;
    } else {
      return p2s;
    }
  }
}

function sameTeam(o1, o2) {
  if (o1.enemy == o2.enemy) {
    return true;
  }
  return false;
}


function checkOverlap(o1, o2) {
  if (o1.width != null && o2.width != null) {
    return checkRectOverlap(o1, o2);
  } else if (o1.width != null && o2.width == null) {
    return checkMixedOverlap(o2, o1);
  } else if (o1.width == null && o2.width != null) {
    return checkMixedOverlap(o1, o2);
  } else if (o1.width == null && o2.width == null) {
    return checkCircleOverlap(o1, o2);
  } else {
    console.log("there is a problem if this is printed.");
  }
}

function checkMixedOverlap(c, r) {
  var topLeft = subtract(r.position, { x: r.width / 2, y: r.height / 2 });
  var bottomRight = add(r.position, { x: r.width / 2, y: r.height / 2 });

  var width = Math.abs(topLeft.x - bottomRight.x);
  var height = Math.abs(topLeft.y - bottomRight.y);

  var x = Math.abs(c.position.x - (topLeft.x + bottomRight.x) / 2);
  var y = Math.abs(c.position.y - (topLeft.y + bottomRight.y) / 2);

  if (x > (width / 2 + c.radius)) { return false; }
  if (y > (height / 2 + c.radius)) { return false; }

  if (x <= (width / 2)) { return true; }
  if (y <= (height / 2)) { return true; }

  var cornerDistance_sq = (x - width / 2) * (x - width / 2) + (y - height / 2) * (y - height / 2);

  return cornerDistance_sq <= (c.radius * c.radius);
}

function checkRectOverlap(r1, r2) {
  r1rp = relative(r1.position, state);
  r2rp = relative(r2.position, state);

  function rectanglesOverlap(aw, ah, acx, acy, bw, bh, bcx, bcy) {
    var w = 0.5 * (aw + bw);
    var h = 0.5 * (ah + bh);
    var dx = acx - bcx;
    var dy = acy - bcy;

    if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
      return true;
    }
    return false;
  }

  return rectanglesOverlap(r1.width, r1.height, r1rp.x, r1rp.y, r2.width, r2.height, r2rp.x, r2rp.y);
}

function checkCircleOverlap(c1, c2) {
  var distance = Math.sqrt((c1.position.x - c2.position.x) * (c1.position.x - c2.position.x) + (c1.position.y - c2.position.y) * (c1.position.y - c2.position.y));
  if (distance < c1.radius + c2.radius) {
    return true;
  } else {
    return false;
  }
}

function checkStructureOverlap(s, state) {
  for (i in state.world) {
    gobj = state.world[i];
    if (gobj instanceof Structure) {
      if (checkOverlap(s, gobj)) {
        return true;
      }
    }
  }
  return false;
}

function findStructureAtPoint(point, state) {
  circle = { position: point, radius: 1 };

  for (i in state.world) {
    gobj = state.world[i];
    if (gobj instanceof Structure && checkOverlap(circle, gobj)) {
      return gobj;
    }
  }
  return null;
}

function distanceBetween(go1, go2) {
  points = getClosestPoints(go1, go2);
  return distance(points[0], points[1]);
}

// makes a point between radius1 and radius2 (random places in the ring)
function makePointIn(point, r1, r2) {
  d = r1 + Math.random() * (r2 - r1);
  rotate = rotateVector({ x: 1, y: 0 }, Math.random() * 360);
  return (add(multiply(rotate, d), point));
}

var zeroVector = { x: 0, y: 0 };

function getVector(e) {
  return { x: e.clientX - canvas.parentElement.offsetLeft, y: e.clientY - canvas.parentElement.offsetTop };
}

function relative(position, state) {
  return subtract(position, state.position);
}

function absolute(position, state) {
  return add(position, state.position);
}

function subtract(v1, v2) {
  return { x: v1.x - v2.x, y: v1.y - v2.y };
}

function add(v1, v2) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

function divide(v1, n) { //divide a vector by a number
  return { x: v1.x / n, y: v1.y / n };
}

function multiply(v1, n) { //multiply a vector by a number
  return { x: v1.x * n, y: v1.y * n };
}

function distance(v1, v2) {
  return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
}

function unitVector(v) {
  return divide(v, distance(zeroVector, v));
}

function duplicate(v) {
  var x1 = v.x;
  var y1 = v.y;

  var v1 = { x: x1, y: y1 };
  return v1;
}

function rotateVector(vec, ang) {
  ang = -ang * (Math.PI / 180);
  var cos = Math.cos(ang);
  var sin = Math.sin(ang);
  return { x: Math.round(10000 * (vec.x * cos - vec.y * sin)) / 10000, y: Math.round(10000 * (vec.x * sin + vec.y * cos)) / 10000 };
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function upperCaseFirstLetter(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1, str.length)
}

state = false;