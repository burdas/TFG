var Diario = artifacts.require("./Diario.sol");

contract("Diario", function(accounts) {
  var DiarioInstance;

  it("TestSetEntrada", function() {
    return Diario.deployed().then(function(instance) {
        DiarioInstance = instance;
        return DiarioInstance.setEntrada("Contenido", 00000, { from: accounts[1] });
    }).then(function() {
        return DiarioInstance.getOwnNumEntradas({ from: accounts[1] });
    }).then(function(num) {
        assert.equal(num, 1);
    });
  });

  it("TestGetEntrada", function() {
    return Diario.deployed().then(function(instance) {
        DiarioInstance = instance;
        return DiarioInstance.getOwnNumEntradas({ from: accounts[1] });
    }).then(function(num) {
        assert.equal(num, 1);
        return DiarioInstance.getContenidoEntada(1, { from: accounts[1] });
    }).then(function(contenido) {
        assert.equal(contenido, "Contenido");
        return DiarioInstance.getFechaEntrada(1, { from: accounts[1] });
    }).then(function(fecha) {
        assert.equal(fecha, 00000);
    });
  });
});