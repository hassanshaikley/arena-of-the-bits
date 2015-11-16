var Config = require("../config.js")
var util = require("util");
var num_connections = 0;
exports.BaseTeamComponent = function(that, team){

    that.getTeam = function(){
	return team;
    };

    var respawnX;

    that.setTeam = function(newTeam){
	var util = require("util");

	if (newTeam == null){
	    var newTeam = num_connections % 2;
	}
	var randomOffset = Math.floor(Math.random() * ( 200 )) - 100;

        if (newTeam == 1){
	    respawnX = Config.ARENA_WIDTH + 1000 - 100 + randomOffset;

	} else {
	    respawnX = 1100 + randomOffset;
	}
	that.x = respawnX;

	util.log("setting team to " + newTeam);
	team = newTeam;
    };


    that.getRespawnX = function(){
	return respawnX;
    };

    this.update = function(){
	//update which team a player is on?
    };
    num_connections++;
};