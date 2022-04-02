//Resource
resourceTypeValues = {
  "ore": ["#545e60", 10],
  "ice": ["#add8e6", 7],
  "iron": ["#804000", 10],
  "uranium": ["#a5a500", 15],
}
class Resource extends GameObject {
  constructor(pos, initialAmt, type) {
    this.position = pos;
    this.amount = initialAmt;
    this.radius = this.amount / this.density;
    this.name = type;
    this.color = resourceTypeValues[type][0];
    this.density = resourceTypeValues[type][1];
  }

  step(state) {
    console.log("DELETE RESOURCE STEP!!!");
  }

  extract(amt) {
    this.amount -= amt;
    if (this.amount <= 0) {
      this.delete(state);
    } else {
      this.radius = this.amount / this.density;
    }
  }
}