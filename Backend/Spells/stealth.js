/* There should be spells and projectiles... */
var Spell = require("./spell").Spell; // so it can inherits :D
var IDComponent = require("../Components/id-component.js").IDComponent;
var Stealth = function(_x, _y, _team) {
    _y = 510;
    var spell = new Spell(_x, _y, _team, 10);
    IDComponent(this);
    this.getDamage = function(){
    	return 10;
    };
};
Stealth.getCooldown = function() {
    return 5000;
};
exports.Stealth = Stealth;