class Laser extends GameObject {
  constructor(parent, target, damage, duration, width, color) {
    super(parent.position);
    this.parent = parent;
    this.target = target;
    this.damage = damage;
    this.duration = duration;
    this.clock = duration;
    this.width = width;
    this.enemy = parent.enemy;
    this.color = color;
  }
  step(state) {
    if (this.parent.destoryed || this.target.destroyed) {
      this.delete(state);
    } else {
      this.position = parent.position; // in case parent moved
      this.target.health -= this.damage / this.duration;
      //this.parent.heal(this.damage*this.healRate);
      if (this.clock <= 0) {
        this.delete(state);
      } else {
        this.clock -= 1;
      }
      if (this.target.health <= 0) {
        this.target.delete(state);
        this.parent.kills++;
      }
    }
  }
}