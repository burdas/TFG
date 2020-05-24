App = {
  web3Provider: null,
  contracts: {},
  account: '0x00',

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
    $.getJSON("Diario.json", function (election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Diario = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Diario.setProvider(App.web3Provider);

      return App.render();
    });
  },

  getEntrada: function () {
    var pass_str = $('#pass').val();
    var diarioInstance;
    App.contracts.Diario.deployed().then(function (instance) {
      diarioInstance = instance;
      return instance.getOwnNumEntradas();
    }).then(function (numEntradas) {
      $('#getEntradas').hide();
      if (numEntradas == 0) {
        $('#setEntradas').before('<div class="card mb-3 bg-danger"><div class="card-body h4">No hay entradas aún</div></div>');
        return;
      }
      plantilla = '<div class="card mb-3"><h5 class="card-header">Entrada NUMERO</h5><div class="card-body"><p class="card-text">CONTENIDO</p></div><div class="card-footer text-right"><small class="text-muted">FECHA</small></div></div>';
      for (let i = 1; i <= numEntradas; i++) {
        diarioInstance.getContenidoEntada(i).then(function (contenido){
          diarioInstance.getFechaEntrada(i).then(function (fechaNum){
            var decrypted = CryptoJS.AES.decrypt(contenido, pass_str).toString(CryptoJS.enc.Utf8);
            fechaNum = Number(fechaNum);
            var fecha = new Date(fechaNum);
            console.log(fecha);
            var html = plantilla.replace('NUMERO', i);
            html = html.replace('CONTENIDO', decrypted);
            html = html.replace('FECHA', fecha.toLocaleString());
            $('#setEntradas').before(html);
          })
        });
      }
      // $("#content").hide();
      // $("#loader").show();
    }).catch(function (err) {
      // $("#principioPagina").append(plantillaAlerta.replace("{{CONTENIDO}}", "Error al publicar el tweet"));
      console.error(err);
    });
  },

  setEntrada: function () {
    var pass_str = $('#pass2').val();
    var contenido = $('#texto_entrada').val();
    var fecha = Number((new Date()).getTime());
    App.contracts.Diario.deployed().then(function (instance) {
      var encrypted = CryptoJS.AES.encrypt(contenido, pass_str);
      encrypted = String(encrypted);
      console.log("Contenido:\n" + encrypted + '\n' + typeof(encrypted) + "\nFecha:\n" + fecha + '\n' + typeof(fecha));
      return instance.setEntrada(encrypted, fecha);
    }).then(function (result) {
      alert("Se ha guardado correctamente");
      location.reload();
    }).catch(function (err) {
      console.error(err);
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
  });
});