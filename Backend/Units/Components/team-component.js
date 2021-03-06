var Config = require("../../config.js");
var num_connections = 0;
exports.BaseTeamComponent = function(that, team) {
    that.getTeam = function() {
        return team;
    };
    var respawnX;
    that.setTeam = function(newTeam) {
        if (newTeam == null) {
            newTeam = num_connections % 2;
        }
        var randomOffset = Math.floor(Math.random() * (200)) - 100;
        if (newTeam == 1) {
            respawnX = Config.ARENA_WIDTH + 1000 - 100 + randomOffset;
        } else {
            respawnX = 1100 + randomOffset;
        }
        //that.x = respawnX;
        that.setX(respawnX);
        team = newTeam;
    };
    that.getRespawnX = function() {
        return respawnX;
    };
    this.update = function() {
        //update which team a player is on?
    };
    num_connections++;
    that.switchTeam = function(){
        if (team == 0){
            that.setTeam(1);
        } else {
            that.setTeam(0);
        };
    };
};
