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
    $.getJSON("Tweet.json", function (election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Tweet = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Tweet.setProvider(App.web3Provider);

      return App.render();
    });
  },

  tweet: function () {
    var tweet_str = $('#tweet').val();
    App.contracts.Tweet.deployed().then(function (instance) {
      return instance.addTweet(tweet_str);
    }).then(function (result) {
      location.reload();
      // $("#content").hide();
      // $("#loader").show();
    }).catch(function (err) {
      // $("#principioPagina").append(plantillaAlerta.replace("{{CONTENIDO}}", "Error al publicar el tweet"));
      console.error(err);
    });
  },

  seguir: function () {
    var seguir_str = $('#seguidor').val();
    App.contracts.Tweet.deployed().then(function (instance) {
      return instance.seguir(seguir_str);
    }).then(function (result) {
      alert("Se ha seguido correctamente");
      // $("#content").hide();
      // $("#loader").show();
    }).catch(function (err) {
      // $("#principioPagina").append(plantillaAlerta.replace("{{CONTENIDO}}", "Error al publicar el tweet"));
      console.error(err);
    });
  },

  render: function () {
    var tweeterInstance;
    var loader = $("#loader");
    var content = $("#content");


    loader.hide();
    content.show();

    // Load account data
    web3.eth.getCoinbase(function (err, account) {
      if (err === null && account != null) {
        App.account = account;
        $("#accountAddress").html(account);
      } else {
        $("#accountAddress").html("No se puede mostrar el nombre de tu cuenta");
      }
    });

    // Load contract data
    App.contracts.Tweet.deployed().then(function (instance) {
      tweeterInstance = instance;
      return tweeterInstance.getNumberTweets();
    }).then(function (numTweets) {
      console.log("Numero de Tweets: " + numTweets);
      // if (numTweets != 0) {
      //   tweeterInstance.getFirstTweet().then(function(n){
      //     alert(n);
      //   });
      // }
      var plantillaTweet = '<div class="card my-3"><div class="card-body">{{CONTENIDO}}</div></div>';

      for (let i = 1; i <= numTweets; i++) {
        tweeterInstance.getOwnTweets(i).then(function (str_tweet) {
          $("#menu1").append(plantillaTweet.replace('{{CONTENIDO}}', str_tweet));
        });
      }

      // tweeterInstance.getOwnTweets().then(function (tweets) {
      //   $.each(tweets, function( index, value ) {
      //     $("#MisTweets").append(plantillaTweet.replace('{{CONTENIDO}}', value));
      //   });
      // });
      // return electionInstance.voters(App.account);
    }).catch(function (error) {
      console.warn(error);
    });

    App.contracts.Tweet.deployed().then(function (instance) {
      tweeterInstance = instance;
      return tweeterInstance.getNumSeguidos();
    }).then(function (numSeguidos) {
      console.log("Numero de Seguidos: " + numSeguidos);
      for (let i = 1; i <= numSeguidos; i++) {
        tweeterInstance.getSeguidos(i).then(function (str_account) {
          tweeterInstance.getNumTweetAddress(str_account).then(function (n) {
            for (let j = 1; j <= n; j++) {
              tweeterInstance.getTweetSeguidos(str_account, j).then(function (msg) {
                $("#menu2").append('<div class="card my-3"><div class="card-body"><h5 class="card-title">' + str_account + '</h5>' + msg + '</div></div>');
              }); 
            }
          });
        });
      }
    }).catch(function (error) {
      console.warn(error);
    });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});