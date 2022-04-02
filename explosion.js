class Explosion extends GameObject {
  radius = 1;
  inProgress = true;
  color = "red";
  damage = 1;
  speed = 1;
  constructor(pos, maxRadius, friendlyFire) {
    this.position = pos;
    this.maxRadius = maxRadius;
    this.friendlyFire = friendlyFire;
  }

  pColor(radius, maxRadius) {
    var colorStr = "";
    if (radius < 5) {
      colorStr = "rgba(255,255,255,0.3)";
    } else {
      var redValue = Math.floor(255 - (radius * (255 / maxRadius)));
      var greenValue = Math.floor(255 - (radius * 255 / maxRadius));
      var blueValue = Math.floor(255 - (radius * 255 / maxRadius));
      colorStr = "rgba(" + redValue + "," + greenValue + "," + blueValue + ",0.3)";
    }
    return colorStr;
  }

  step(state) {
    this.collisionCheck(state, this.friendlyFire);
    if (this.inProgress) {
      if (this.radius < this.maxRadius) {
        this.color = this.pColor(this.radius, this.maxRadius);
        this.radius += this.speed;
      } else {
        this.radius = 0;
        this.inProgress = false;
        this.delete(state);
      }
    }
  }

  collisionCheck(state, friendlyFire) {
    for (var i in state.world) {
      gobj = state.world[i];
      if (gobj instanceof Projectile || gobj instanceof Laser || gobj instanceof Explosion) {
      } else if (friendlyFire) {
        if (checkOverlap(this, gobj)) {
          gobj.health -= this.damage;
          if (gobj.health < 0) {
            if (gobj instanceof Ship) {
              if (gobj.name in state.shipsKilled) {
                state.shipsKilled[gobj.name] += 1;
              } else {
                state.shipsKilled[gobj.name] = 1;
              }
              updateShipsKilledDisplay(state.shipsKilled)
            }
            gobj.delete(state);
          }
        }
      } else {
        if (gobj instanceof Tower || gobj instanceof Building) {
          //skip
        } else {
          if (checkOverlap(this, gobj)) {
            gobj.health -= this.damage;
            if (gobj.health < 0) {
              if (gobj instanceof Ship) {
                if (gobj.name in state.shipsKilled) {
                  state.shipsKilled[gobj.name] += 1;
                } else {
                  state.shipsKilled[gobj.name] = 1;
                }
                updateShipsKilledDisplay(state.shipsKilled)
              }
              gobj.delete(state);
            }
          }
        }
      }
    }
  }
}