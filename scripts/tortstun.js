  ints = 0;

var TortStun = function(_x,_y, _team ){
  this.team = _team;
	var cooldown = 1000;
  var x = _x, //center x
      y = 370;
 	var timer = 0; 
	this.update = function(){
		timer = timer+1;
    if (y >= 360){
			y = y-2;
    } else if (timer >= 200 ){
			var index = Spells.spellsarray.indexOf(this);
			Spells.spellsarray.splice(index, 1);
      console.log("SGWEEE " + ints);
      ints = ints + 1;
      MAIN.stage.removeChild(tortStunClip)
		}
  };



  this.getX = function(){
    return x;
  };

  this.getY = function(){
    return y;
  };

  var tortStunClip =new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("tort_stun.png")]);
  MAIN.stage.addChild(tortStunClip);

  this.draw = function(ctx){
    var newX = x  -localPlayer.getDrawAtX()- 50+canvas.width/2;
    tortStunClip.position.x = newX;
    tortStunClip.position.y = y;

    /* Check if a spell hits - going to need to be refactored*/
    ctx.save();
    ctx.drawImage(tortStun,0,0, 100, 100, newX, y, 100, 100);
    ctx.restore();
  };
  return this;
};

//static function that returns thumbnail
TortStun.thumbnail = function(){
  return 1;
}
