var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Fly = require('../units/fly.js').Fly;
var Redhatter = require('../units/redhatter.js').Redhatter;
var Shanker = require('../units/shanker.js').Shanker;

describe("Test Game", function() {
        var game;
    beforeEach(function(done){
        game = new Game();
        done();
    });

    it ("should have made an empty game", function(){
        assert.equal(game.getPlayers().length, 0);
        var fly = new Fly("hassanlol", 0);
        game.addPlayer(fly);
        assert.equal(game.getPlayers()[0].getName(), "hassanlol"); 
    });  

    it ("should be able to remove a player", function(){
        var fly = new Fly("hassanlol", 0);
        game.addPlayer(fly);
        assert.equal(game.getPlayers().length, 1); 
        game.removePlayer(fly);
        assert.equal(game.getPlayers().length, 0); 
    });
    it ("shouldn't crash", function(){
     assert.notEqual(game.getWinner(), "please dont crash");
  });
    it ("able to change game state to 0", function(){
      assert.equal(game.getState(), 1);
       game.setState(0);
      assert.equal(game.getState(), 0);
  });
});
