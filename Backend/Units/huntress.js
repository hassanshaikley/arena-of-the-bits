/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
var MovementComponent = require("./movement_component.js").MovementComponent;
var BaseUnitComponent = require("./base_unit_component.js").BaseUnitComponent;
var BaseTeamComponent = require("./base_team_component.js").BaseTeamComponent;

var Huntress = function(team) {

    var speed = 13;
    var health = 140;
    var width = 40;
    var height = 60;
    var myMovementComponent = new MovementComponent(speed, this); // handles key input
    var myBaseUnitComponent = new BaseUnitComponent(health, width, height, this);
    var myBaseTeamComponent = new BaseTeamComponent(this);
    this.setTeam();
    this.getCharacterType = function() {
        return "Huntress";
    };
    this.getDamage = function() {
        return 18;
    };
    var that = this;
    this.update = function() {
        myMovementComponent.update(that);
        myBaseUnitComponent.update();
        myBaseTeamComponent.update();
    };
    this.attackEffect = function(obj) {

    };
};
exports.Huntress = Huntress;
