var TresRaya = artifacts.require("./TresRaya.sol");

contract("TresRaya", function(accounts) {
  var TresRayaInstance;

  it("TestReset", function() {
    return TresRaya.deployed().then(function(instance) {
        TresRayaInstance = instance;
        return TresRayaInstance.reset();
    }).then(function() {
        return TresRayaInstance.hayHueco();
    }).then(function(result) {
        assert.equal(result, true);
        return TresRayaInstance.hayJugador1();
    }).then(function(result) {
        assert.equal(result, false);
    });
  });

  it("TestSimularGana1", function() {
    return TresRaya.deployed().then(function(instance) {
        TresRayaInstance = instance;
        return TresRayaInstance.setPlayer1({ from: accounts[1] });
    }).then(function() {
        return TresRayaInstance.hayJugador1();
    }).then(function(result) {
        assert.equal(result, true);
        return TresRayaInstance.setPlayer2({ from: accounts[2] });
    }).then(function(result) {
        return TresRayaInstance.hayHueco();
    }).then(function(result) {
        assert.equal(result, false);
        return TresRayaInstance.movimiento(0, 0);
    }).then(function() {
        return TresRayaInstance.movimiento(1, 0);
    }).then(function() {
        return TresRayaInstance.movimiento(0, 1);
    }).then(function() {
        return TresRayaInstance.movimiento(1, 1);
    }).then(function() {
        return TresRayaInstance.movimiento(0, 2);
    }).then(function() {
        return TresRayaInstance.hayHueco();
    }).then(function(result) {
        assert.equal(result, true);
    });
  });

  it("TestSimularGana2", function() {
    return TresRaya.deployed().then(function(instance) {
        TresRayaInstance = instance;
        return TresRayaInstance.setPlayer1({ from: accounts[1] });
    }).then(function() {
        return TresRayaInstance.hayJugador1();
    }).then(function(result) {
        assert.equal(result, true);
        return TresRayaInstance.setPlayer2({ from: accounts[2] });
    }).then(function(result) {
        return TresRayaInstance.hayHueco();
    }).then(function(result) {
        assert.equal(result, false);
        return TresRayaInstance.movimiento(0, 0);
    }).then(function() {
        return TresRayaInstance.movimiento(1, 0);
    }).then(function() {
        return TresRayaInstance.movimiento(0, 1);
    }).then(function() {
        return TresRayaInstance.movimiento(1, 1);
    }).then(function() {
        return TresRayaInstance.movimiento(2, 2);
    }).then(function() {
        return TresRayaInstance.movimiento(1, 2);
    }).then(function() {
        return TresRayaInstance.hayHueco();
    }).then(function(result) {
        assert.equal(result, true);
    });
  });

  it("TestSimularEmpate", function() {
    return TresRaya.deployed().then(function(instance) {
        TresRayaInstance = instance;
        return TresRayaInstance.setPlayer1({ from: accounts[1] });
    }).then(function() {
        return TresRayaInstance.hayJugador1();
    }).then(function(result) {
        assert.equal(result, true);
        return TresRayaInstance.setPlayer2({ from: accounts[2] });
    }).then(function(result) {
        return TresRayaInstance.hayHueco();
    }).then(function(result) {
        assert.equal(result, false);
        return TresRayaInstance.movimiento(0, 0);
    }).then(function() {
        return TresRayaInstance.movimiento(1, 0);
    }).then(function() {
        return TresRayaInstance.movimiento(0, 1);
    }).then(function() {
        return TresRayaInstance.movimiento(0, 2);
    }).then(function() {
        return TresRayaInstance.movimiento(1, 1);
    }).then(function() {
        return TresRayaInstance.movimiento(2, 2);
    }).then(function() {
        return TresRayaInstance.movimiento(1, 2);
    }).then(function() {
        return TresRayaInstance.movimiento(2, 0);
    }).then(function() {
        return TresRayaInstance.movimiento(2, 1);
    }).then(function() {
        return TresRayaInstance.hayHueco();
    }).then(function(result) {
        assert.equal(result, true);
    });
  });
});