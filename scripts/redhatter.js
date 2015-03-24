/**************************************************
   ** REDHATTER CLASS IN CLIENT
    **************************************************/
var Animate = 0,
    floorHeight = 474,
    localX = 0;

var Redhatter = function(x, y, hp, name){
  var moveSpeed = 2.3;
  var skeleton =  new Player(x, y, hp, name, moveSpeed),
      facing_left;

  var spritesheet_offset_y = 0;

  /* CASTS A METEOR :D */
  skeleton.rightClick = function(clientX, clientY){
   // console.log("meteor right click - x is " + clientX + " y is "+ clientY);

    Spells.meteor(clientX, clientY);
  };

  /* Maybe make this heal?? */ 
  skeleton.leftClick = function(){
  };

  /* Lolswagz */
  skeleton.getCharacterType = function(){
    return "Redhatter";
  };

  skeleton.draw = function(ctx) {
    //var drawAtX = skeleton.getX()-50;
    this.drawText();
    ctx.save();
    if (skeleton.getTeam()==0){
      ctx.shadowBlur=20;
      ctx.shadowColor="blue";
    }
    else {
      ctx.shadowBlur=20;
      ctx.shadowColor="green";
    }
    if (this.getMoveDirection() === "left"){
      facing_left = true;
    } else if (this.getMoveDirection() === "right"){
      facing_left = false;
    }
    if (facing_left){
      spritesheet_offset_y = 100;
    }
    else {
      spritesheet_offset_y = 0;
    }
   var   drawAtX = canvas.width/2 + this.getDrawAtX() - localX - 50;
    

    /* Decides what sprite to draw*/
    if (this.getAnimate() <= 15){ 
      ctx.drawImage(RedhatterSprite,0,spritesheet_offset_y, 75, 100, drawAtX+20,this.getY()-70, 75, 100);
    }
    else if (this.getAnimate() <= 30){
      ctx.drawImage(RedhatterSprite,75,spritesheet_offset_y, 75, 100, drawAtX+20,this.getY()-70, 75, 100);
    }
    else if (this.getAnimate() <= 45){
      ctx.drawImage(RedhatterSprite,150,spritesheet_offset_y, 75, 100, drawAtX+20,this.getY()-70, 75, 100);
    } else{
      ctx.drawImage(RedhatterSprite,225,spritesheet_offset_y, 75, 100, drawAtX+20,this.getY()-70, 75, 100);
    }
    ctx.restore();
  };
  
  /* Constantly called for the localPlayer, updates the actual 
   * Position held by the server
   */
  skeleton.update = function(keys) {
    localX = this.getX();
  };
  return skeleton;
};
