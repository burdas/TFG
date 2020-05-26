App = {
  web3Provider: null,
  contracts: {},
  account: '0x00',
  marcador1: '❌',
  marcador2: '⭕',

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("TresRaya.json", function (election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.TresRaya = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.TresRaya.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  buscarPartida: function () {
    var tresRaya;
    App.contracts.TresRaya.deployed().then(function (instance) {
      tresRaya = instance;
      return tresRaya.hayHueco();
    }).then(function (result) {
      if (result) {
        tresRaya.hayJugador1().then(function (result2) {
          console.log("Hay jugador 1? " + result2);
          if (!result2) {
            tresRaya.setPlayer1().then(function () {
              console.log("Eres el jugador 1");
              $("#divButton").hide();
              $("#divTabla").show();
              $("#turno").text("Jugador 1");
              $("#informacion").text("Turno del jugador 1");
            });
          } else {
            tresRaya.setPlayer2().then(function () {
              console.log("Eres el jugador 2");
              $("#divButton").hide();
              $("#divTabla").show();
              $("#turno").text("Jugador 2");
              $("#informacion").text("Turno del jugador 1");
            });
          }
          $("#td1").click(click1);
          $("#td2").click(click2);
          $("#td3").click(click3);
          $("#td4").click(click4);
          $("#td5").click(click5);
          $("#td6").click(click6);
          $("#td7").click(click7);
          $("#td8").click(click8);
          $("#td9").click(click9);
        });
      } else {
        alert("Ya hay una partida en curso");
      }
    }).catch(function (err) {
      console.error(err);
    });
  },

  resetear: function () {
    App.contracts.TresRaya.deployed().then(function (instance) {
      return instance.reset();
    }).then(function (result) {

    }).catch(function (err) {
      console.error(err);
    });
  },

  listenForEvents: function () {
    var instancia;
    App.contracts.TresRaya.deployed().then(function (instance) {
      instancia = instance;
      instance.movimientoRealizado({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function (error, event) {
        var x = Number(event.args.x);
        var y = Number(event.args.y);
        var turno = Number(event.args.turno);
        var ganador = Number(event.args.ganador);
        console.log("x", x);
        console.log("y", y);
        console.log("turno", turno);
        console.log("ganador", ganador);
        if (turno == 1) {
          if (x == 0 && y == 0) { $("#td7").text(App.marcador1); }
          if (x == 0 && y == 1) { $("#td8").text(App.marcador1); }
          if (x == 0 && y == 2) { $("#td9").text(App.marcador1); }
          if (x == 1 && y == 0) { $("#td4").text(App.marcador1); }
          if (x == 1 && y == 1) { $("#td5").text(App.marcador1); }
          if (x == 1 && y == 2) { $("#td6").text(App.marcador1); }
          if (x == 2 && y == 0) { $("#td1").text(App.marcador1); }
          if (x == 2 && y == 1) { $("#td2").text(App.marcador1); }
          if (x == 2 && y == 2) { $("#td3").text(App.marcador1); }
          $("#informacion").text("Es el turno del jugador 2");
        } else {
          if (x == 0 && y == 0) { $("#td7").text(App.marcador2); }
          if (x == 0 && y == 1) { $("#td8").text(App.marcador2); }
          if (x == 0 && y == 2) { $("#td9").text(App.marcador2); }
          if (x == 1 && y == 0) { $("#td4").text(App.marcador2); }
          if (x == 1 && y == 1) { $("#td5").text(App.marcador2); }
          if (x == 1 && y == 2) { $("#td6").text(App.marcador2); }
          if (x == 2 && y == 0) { $("#td1").text(App.marcador2); }
          if (x == 2 && y == 1) { $("#td2").text(App.marcador2); }
          if (x == 2 && y == 2) { $("#td3").text(App.marcador2); }
          $("#informacion").text("Es el turno del jugador 1");
        }
        if (ganador != 0) {
          if (ganador == 1) {
            alert("Ha ganado el Jugador 1");
          } else if(ganador == 2) {
            alert("Ha ganado el jugador 2");
          } else {
            alert("Empate");
          } 
          location.reload();
        }
      });
    });
  },

  render: function () {
    var loader = $("#loader");
    var content = $("#content");

    loader.hide();
    content.show();

  }
};

$(function () {
  $(window).load(function () {
    App.init();
    $('td').height(125);
    $('td').width(125)
  });
});

function click1() {
  App.contracts.TresRaya.deployed().then(function (instance) {
    return instance.movimiento(2, 0);
  }).then(function (result) {
    // console.log(result);
  }).catch(function (err) {
    console.error(err);
  });
}

function click2() {
  App.contracts.TresRaya.deployed().then(function (instance) {
    return instance.movimiento(2, 1);
  }).then(function (result) {
  }).catch(function (err) {
    console.error(err);
  });
}

function click3() {
  App.contracts.TresRaya.deployed().then(function (instance) {
    return instance.movimiento(2, 2);
  }).then(function (result) {
  }).catch(function (err) {
    console.error(err);
  });
}

function click4() {
  App.contracts.TresRaya.deployed().then(function (instance) {
    return instance.movimiento(1, 0);
  }).then(function (result) {
  }).catch(function (err) {
    console.error(err);
  });
}

function click5() {
  App.contracts.TresRaya.deployed().then(function (instance) {
    return instance.movimiento(1, 1);
  }).then(function (result) {
  }).catch(function (err) {
    console.error(err);
  });
}

function click6() {
  App.contracts.TresRaya.deployed().then(function (instance) {
    return instance.movimiento(1, 2);
  }).then(function (result) {
  }).catch(function (err) {
    console.error(err);
  });
}

function click7() {
  App.contracts.TresRaya.deployed().then(function (instance) {
    return instance.movimiento(0, 0);
  }).then(function (result) {
  }).catch(function (err) {
    console.error(err);
  });
}

function click8() {
  App.contracts.TresRaya.deployed().then(function (instance) {
    return instance.movimiento(0, 1);
  }).then(function (result) {
  }).catch(function (err) {
    console.error(err);
  });
}

function click9() {
  App.contracts.TresRaya.deployed().then(function (instance) {
    return instance.movimiento(0, 2);
  }).then(function (result) {
  }).catch(function (err) {
    console.error(err);
  });
} 