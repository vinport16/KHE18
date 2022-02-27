function Structure(pos, price, maxHealth, ER, name, state) {

  GameObject.call(this, pos);

  this.name = name;

  this.maxHealth = maxHealth;
  this.health = this.maxHealth;
  this.price = price;
  this.energyRange = ER;

  this.connected = [];
  this.activeConnections = [];

  this.connectToAll(state);
}

Structure.prototype = Object.create(GameObject.prototype);
Structure.prototype.constructor = Structure;

Structure.prototype.delete = function (state) {
  GameObject.prototype.delete.call(this, state);
  for (i in this.connected) {
    index = this.connected[i].connected.indexOf(this);
    if (index !== -1) this.connected[i].connected.splice(index, 1);
  }
}


Structure.prototype.sell = function (state) {
  state.money += Math.floor(this.price * (this.health / this.maxHealth));
  this.delete(state);
}

function canAfford(upgrade, state) {
  return (state.money >= upgrade.price && state.ice >= upgrade.icePrice && state.iron >= upgrade.ironPrice && state.ore >= upgrade.orePrice && state.uranium >= upgrade.uraniumPrice);
}

Structure.prototype.upgrade = function (upgradeList, index, state) {
  upgrade = upgradeList[index];
  if (canAfford(upgrade, state)) {
    state.money -= upgrade.price;
    state.ice -= upgrade.icePrice;
    state.iron -= upgrade.ironPrice;
    state.ore -= upgrade.orePrice;
    state.uranium -= upgrade.uraniumPrice;
    this["price"] += upgrade.price

    for (var k in upgrade.updateProperties) {
      if (this.hasOwnProperty(k)) {
        this[k] = upgrade.updateProperties[k];
      }
    }
    if (upgrade["next"] != null) {
      this["tree"][index] = upgrade["next"]
    } else {
      this["tree"][index] = { name: "No Upgrade Available" }
    }
  }
}

Structure.prototype.replace = function (upgradeList, index, state) {
  upgrade = upgradeList[index];
  if (canAfford(upgrade, state)) {
    state.money -= upgrade.price;
    state.ice -= upgrade.icePrice;
    state.iron -= upgrade.ironPrice;
    state.ore -= upgrade.orePrice;
    state.uranium -= upgrade.uraniumPrice;

    var newStruct = getNewTower(upgrade.newStruct, this.position, state);
    for (var k in this) {
      if (k == "name") {
        newStruct[k] = upgrade.name;
      } else if (k == "price") {
        newStruct[k] = this.price + upgrade.price
      } else if (k == "tree") {
        if (upgrade["next"] != null) {
          nextUpgrade = upgrade["next"];
        } else {
          nextUpgrade = { name: "No Upgrade Available" }
        }
        if (index == 0) {
          newStruct.tree = [nextUpgrade, this.tree[1]]
        } else {
          newStruct.tree = [this.tree[0], nextUpgrade]
        }
      } else if (k == "constructor" || k == "activeConnections" || k == "connected" || k == "shoot" || k == "step" || k == "waitToShoot") {
        // ignore these
      } else {
        if (newStruct[k] != this[k]) {
        }
        newStruct[k] = this[k];

      }
    }

    state.world.push(newStruct);
    state.selectedStructure = newStruct;
    this.delete(state);
  }
}

Structure.prototype.connectToAll = function (state) {
  for (var i = 0; i < state.world.length; i++) {
    var o2 = state.world[i];
    if (o2 instanceof Structure && distanceBetween(this, o2) < this.energyRange + o2.energyRange) {
      this.connect(o2);
    }
  }
}

Structure.prototype.disconnectAll = function () {
  for (i in this.connected) {
    index = this.connected[i].connected.indexOf(this);
    if (index !== -1) this.connected[i].connected.splice(index, 1);
  }
  this.connected = [];
}

Structure.prototype.connect = function (struct) {
  this.connected.push(struct);
  struct.connected.push(this);
}

Structure.prototype.findConnectedEnergyPath = function () {
  var q = [[this]];
  var visited = [this];
  while (q.length != 0) {
    var b = q[0][q[0].length - 1];
    if (b.energyMax && b.energy > 0) {
      return (q[0]);
    } else {
      for (var i = 0; i < b.connected.length; i++) {
        if (!visited.includes(b.connected[i])) {
          var path = copyArray(q[0]);
          path.push(b.connected[i]);
          visited.push(b.connected[i]);
          q.push(path);
        }
      }
    }
    q.splice(0, 1);
  }
  return false;
}

Structure.prototype.getEnergyFor = function (n, state) {
  if (state.energy < n) {
    // if there is not enough energy available, abort
    return false;
  }
  var available = 0;
  var paths = [];
  var amounts = [];
  var path = this.findConnectedEnergyPath();
  while (path && available < n) {

    var source = path[path.length - 1];
    if (source.energy < n - available) {
      amounts.push(source.energy);
      available += source.energy;
      source.energy = 0;
    } else {
      amounts.push(n - available);
      source.energy = source.energy - (n - available);
      available = n;
    }

    paths.push(path);
    path = this.findConnectedEnergyPath();
  }
  if (available < n) {
    //return energy
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      var source = path[path.length - 1];
      source.energy += amounts[i];
    }
    return false;
  } else {
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      //connect path
      for (var j = 0; j < path.length - 1; j++) {
        path[j].activeConnections.push(path[j + 1]);
      }

    }
    return true;
  }
}

function placeStructure(s, state) {
  disableAllButtons();
  document.getElementById("cancel").disabled = false;

  for (var i = 0; i < controlButtons.length; i++) {
    controlButtons[i].disabled = false;
  }

  state.proto = s;

  canvas.addEventListener("mousemove", function (event) {
    s.position = absolute(getVector(event), state);

    drawEverything(state);
    //drawProto(s, state);
  });

  canvas.addEventListener("mousedown", function (event) {
    s.position = absolute(getVector(event), state);
    if (s.price <= state.money && s.orePrice <= state.ore && s.icePrice <= state.ice && s.ironPrice <= state.iron && s.uraniumPrice <= state.uranium && !checkStructureOverlap(s, state)) {
      state.world.push(s);
      state.money -= s.price;
      state.ice -= s.icePrice;
      state.ore -= s.orePrice;
      state.iron -= s.ironPrice;
      state.uranium -= s.uraniumPrice;
      state.selectedStructure = s;
      updateSelectedDetails(state.selectedStructure);
      drawEverything(state);
    } else {
      s.disconnectAll(state);
    }

    state.proto = null;

    clearListeners(state);
    resetCancel();
    enableAllButtons();

  });

  document.getElementById("cancel").addEventListener("mousedown", function (event) {
    s.disconnectAll(state);
    state.proto = null;
    clearListeners(state);
    resetCancel();
    enableAllButtons();
  });
}