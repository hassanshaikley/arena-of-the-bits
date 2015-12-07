var util = require("util");
var Config = require("../config.js");
// On update moves a player : D
exports.MovementComponent = function(speed, that, ySpeed) {
    var fallSpeed = typeof ySpeed !== 'undefined' ? 1 : 25;
    ySpeed = typeof ySpeed !== 'undefined' ? ySpeed : 0;
    var baseSpeed = speed;
    console.log("ys" + ySpeed);
    console.log("fs" + fallSpeed);
    var landY = Config.FLOOR_HEIGHT;

    function gravity(that) {
        if (that.getY() > landY - that.getHeight() / 2) { //if its greater than the ground (V great)!
            that.setY(landY - that.getHeight() / 2); // trying to fly too low
            console.log("IN HERE THO");

        } else if (that.getY() < 0) { //trying to fly way too high rn
            that.setY(0);
        } else if (!that.jumping && !(that.getY() === landY - that.getHeight() / 2)) { //
            that.setY(that.getY() + fallSpeed); // falling
        }
    };
    that.setLandY = function(_landY){
        landY = _landY;
    };
    that.getLandY = function(){
        return landY;
    };
    that.getBaseSpeed = function() {
        return baseSpeed;
    };
    that.getSpeed = function() {
        return speed;
    };
    that.setSpeed = function(newSpeed) {
        speed = newSpeed;
    };
    var jump_speed;
    function jump(that) {
        if (that.jumping) { //jumping
            util.log("JUMP SPEED" + jump_speed);
            if (jump_speed > 0){
                that.setY(that.getY() - jump_speed);
            }
            jump_speed = jump_speed - 2;
        } else if (jump_speed != 25){
            jump_speed = 25;
        };
    }
    this.update = function(that) {
        if (that == null || speed == null) {
            throw new Error("Yo, speed and that need to exist for movement component to update");
        }
        jump(that);
        if (!that.getImmobilize()) {
            if (that.left) {
                that.setX(that.getX() - speed);
            }
            if (that.right) {
                that.setX(that.getX() + speed);
            }
            if (that.up) {
                that.setY(that.getY() - ySpeed);
            }
            if (that.down) {
                that.setY(that.getY() + ySpeed);
            }
            if (that.getX() <= 1000) {
                that.setX(1000);
            } else if (that.getX() >= Config.ARENA_WIDTH + 1000) {
                that.setX(Config.ARENA_WIDTH + 1000);
            }
        }
        gravity(that);
    };
};
