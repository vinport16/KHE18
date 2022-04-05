//Projetile
// class Dog extends Animal {
//   constructor(name) {
//     super(name); // call the super class constructor and pass in the name parameter
//   }

//   speak() {
//     console.log(`${this.name} barks.`);
//   }
// }
class Projectile extends GameObject {
  acceleration = 0.1;

  constructor(tar, radius, pos, speed, damage, enemy, parent, isSeeking = false, explode = false) {
    super(pos);
    this.target = tar;
    this.radius = radius;
    this.speed = speed;
    this.damage = damage;
    this.enemy = enemy;
    this.parent = parent;
    this.isSeeking = isSeeking;
    this.explode = explode;
    this.color = getColor(this.enemy);
    this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target, this)[0], this.position)), this.speed);
  }

  getColor(enemy) {
    if (enemy) {
      return "red";
    } else {
      return "yellow";
    }
  }

  getNewTarget(state) {
    closest = [false, this.range];
    for (i in state.world) {
      gobj = state.world[i];
      if (gobj.enemy && gobj.maxHealth && distanceBetween(gobj, this) <= closest[1]) {
        closest = [gobj, distanceBetween(gobj, this)];
      }
    }
    this.target = closest[0];
    return closest[0];
  }

  doExplosion(state) {
    var explosion = new Explosion(duplicate(this.position), 100, false);
    explosion.damage = 5;
    explosion.speed = 5;
    state.world.push(explosion);
    this.delete(state);
  }

  move(state) {
    if (this.isSeeking) {
      if (this.target.destroyed || this.target == false) {
        var newtarget = this.getNewTarget(state);
        if (!(newtarget == false)) {
          this.velocity = multiply(unitVector(subtract(getClosestPoints(newtarget, this)[0], this.position)), this.speed);
        }
      } else {
        if (!(this.target == false)) {
          this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target, this)[0], this.position)), this.speed);
        }
      }
    } else if (!this.target.destroyed) {
      this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target, this)[0], this.position)), this.speed);
    }
    this.position = add(this.position, this.velocity);
    if (this.position.x > 5000 || this.position.x < -5000 || this.position.y > 5000 || this.position.y < -5000) {
      this.delete(state);
    }
  }

  collisionCheck(state) {
    for (var i in state.world) {
      gobj = state.world[i];
      if (gobj instanceof Projectile || gobj instanceof Laser || gobj instanceof Explosion || gobj instanceof Resource) {
      } else {
        if (checkOverlap(this, gobj) && !(sameTeam(this, gobj))) {
          if (this.explode) {
            this.doExplosion(state);
          } else {
            if (this.damage > gobj.health) {
              this.damage -= gobj.health;
              if (gobj instanceof Ship) {
                if (gobj.name in state.shipsKilled) {
                  state.shipsKilled[gobj.name] += 1;
                } else {
                  state.shipsKilled[gobj.name] = 1;
                }
                updateShipsKilledDisplay(state.shipsKilled)
              }

              if (this.parent instanceof FriendlyShip) {
                this.parent.parent.kills++;
              } else {
                this.parent.kills++;
              }
              if (gobj instanceof Building) {
                var E1 = new Explosion(duplicate(gobj.position), (gobj.energyMax / 10), true);
                state.world.push(E1);
              } else if (gobj instanceof Tower) {
                var E1 = new Explosion(duplicate(gobj.position), (gobj.projectileDamage / gobj.bufferTime * (gobj.range / 10)), true);
                state.world.push(E1);
              }
              gobj.delete(state);
            } else {
              gobj.health -= this.damage;
              if (this.explode) {
                var explosion = new Explosion(duplicate(this.position), 50, false);
                explosion.damage = 5;
                explosion.speed = 5;
                state.world.push(explosion);
              }
              this.delete(state);
            }
          }
        }
      }
    }
  }

  step(state) {
    this.move(state);
    this.collisionCheck(state);
  }
}


// var SeekingProjectile = function (tar, radius, pos, speed, damage, enemy, parent, state) {
//   this.target = tar;
//   this.position = pos;
//   GameObject.call(this, pos);
//   this.radius = radius;
//   //this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target,this)[0], this.position)), speed);
//   this.velocity = multiply(unitVector(subtract(getClosestPoints(this.target, this)[0], this.position)), this.speed);
//   this.acceleration = 0.1;
//   this.speed = speed;
//   this.damage = damage;
//   this.enemy = enemy;
//   this.parent = parent;
//   this.range = 2000;
//   this.color = "yellow";
//   this.explode = false

// }
// SeekingProjectile.prototype = Object.create(Projectile.prototype);
// SeekingProjectile.prototype.constructor = SeekingProjectile;
