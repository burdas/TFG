pragma solidity >0.4.2;
// pragma experimental ABIEncoderV2;

contract Tweet{

    mapping (address => mapping(uint => string)) tweets;
    mapping (address => uint) numTweets;
    mapping (address => mapping(uint => address)) seguidos;
    mapping (address => uint) numSeguidos;

    function addTweet(string memory tweet_str) public{
        numTweets[msg.sender]++;
        tweets[msg.sender][numTweets[msg.sender]] = tweet_str;
    }

    function getNumberTweets() public view returns (uint) {
        return numTweets[msg.sender];
    }

    function getOwnTweets(uint i) public view returns (string memory){
        return tweets[msg.sender][i];
    }

    function seguir(address guy) public {
        numSeguidos[msg.sender]++;
        seguidos[msg.sender][numSeguidos[msg.sender]] = guy;
    }

    function getNumSeguidos() public view returns(uint) {
        return numSeguidos[msg.sender];
    }

    function getSeguidos(uint i) public view returns(address){
        return seguidos[msg.sender][i];
    }

    function getNumTweetAddress(address guy) public view returns(uint){
        return numTweets[guy];
    }

    function getTweetSeguidos(address n, uint i) public view returns(string memory) {
        return tweets[n][i];
    }

}