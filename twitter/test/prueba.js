var Tweet = artifacts.require("./Tweet.sol");

contract("Tweet", function(accounts) {
  var tweetInstance;

  it("TestAddTweet", function() {
    return Tweet.deployed().then(function(instance) {
        tweetInstance = instance;
        return tweetInstance.addTweet("Mensaje de prueba", { from: accounts[1] });
    }).then(function() {
        return tweetInstance.getNumberTweets({ from: accounts[1] });
    }).then(function(num) {
        assert.equal(num, 1);
        return tweetInstance.getOwnTweets(1,{ from: accounts[1]});
    }).then(function(contenido) {
        assert.equal(contenido, "Mensaje de prueba"); 
    });
  });

  it("TestSeguir", function() {
    return Tweet.deployed().then(function(instance) {
        tweetInstance = instance;
        return tweetInstance.seguir("0xc383dfb5fc71ff1bb2bbadb812229681fb7a8e3c", { from: accounts[1]});
    }).then(function() {
        return tweetInstance.getNumSeguidos({ from: accounts[1]});
    }).then(function(num) {
        assert.equal(num, 1);
        return tweetInstance.getSeguidos(1,{ from: accounts[1]});
    }).then(function(contenido) {
        assert.equal(contenido.toUpperCase(), "0xc383dfb5fc71ff1bb2bbadb812229681fb7a8e3c".toUpperCase()); 
    });
  });
});