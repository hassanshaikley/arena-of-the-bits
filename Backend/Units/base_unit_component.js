/* Units include towers, NPCs, and players
 * A Base unit has health, a position
 */
exports.BaseUnitComponent = function(maxHp, width, height, that){

    var x = 1500;
    var y = 250;
    var birdStun = {active: false, bird: false };
    var name = "unknown";

    if (maxHp == null){
	throw("Dude come on, you need health to create a base unit");
    }

    that.spellOneCastTime = 0;
    that.spellTwoCastTime = 0;
    that.hitby = [];
    if (! that.emptyYSpace){
        that.emptyYSpace = 0;
    }

    var currHp = maxHp;

    that.getHp = function(){
	return currHp;
    };

    that.resetHp= function(){
        currHp = maxHp;

    };
    that.getAlive = function(){
        return (that.getHp() > 0)
    };
    that.getRespawnTime = function(){
        return 3000;
    };

    that.doDamage = function(damage){

	currHp = currHp -damage;
        if (currHp <= 0){
            currHp = 0;
            setTimeout(function(){
                that.respawn();
            }, that.getRespawnTime());
        }
    };

    that.respawn = function(){
        currHp = maxHp;
        that.setX(that.getRespawnX());
    };

    that.getWidth = function(){
	return width;
    };

    that.getHeight = function(){
	return height;
    };

    that.isStunned = function(){
        return 0;
    };

    that.getX = function(){
    	return x;
    };

    that.getY = function(){
    	return y;
    };

    that.setX = function(_x){
    	x = _x;
    };
    that.setY = function(_y){
    	y = _y;
    };

    that.getName = function(){
    	return name;
    };
    that.setName = function(newName){
    	name = newName;
    };


    that.birdStun = function(bird){ //locks location to bird and makes it incapable of moving
        if (birdStun.active) { //spell is already going on
            return;
        }
        birdStun.active = true;
        birdStun.bird = bird;
        setTimeout(function(){
            birdStun.active = false;
        }, 3000);
    };

    this.update = function(){
    	//perhaps apply damage that has been given to this unit?
        if (birdStun.active){
            that.setX(birdStun.bird.getX());
            that.setY(birdStun.bird.getY() +50);
        }
    };
};