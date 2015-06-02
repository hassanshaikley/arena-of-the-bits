var Redhatter = function(name, x, y, hp){


  var skeleton =  new Player(-100, -100, hp, name);
  var facing_left;

	//used for animation
  var spritesheet_offset_y = 0;

  /* CASTS A METEOR :D */

  skeleton.rightClick = function(clientX, clientY){
    var t_x = clientX ;
    socket.emit("spell one", { x: t_x });
  };

  /* Lolswagz */
  skeleton.getCharacterType = function(){
    return "Redhatter";
  };


  var redhatter_l =new PIXI.extras.MovieClip([PIXI.Texture.fromImage("l_redhatter1.png"),PIXI.Texture.fromImage("l_redhatter2.png"),PIXI.Texture.fromImage("l_redhatter3.png"),PIXI.Texture.fromImage("l_redhatter4.png")]);
  var redhatter_r =new PIXI.extras.MovieClip([PIXI.Texture.fromImage("r_redhatter1.png"),PIXI.Texture.fromImage("r_redhatter2.png"),PIXI.Texture.fromImage("r_redhatter3.png"),PIXI.Texture.fromImage("r_redhatter4.png")]);



  var clipnames = [];

  for (var _i = 1; _i <= 8; _i ++){
    clipnames.push(PIXI.Texture.fromImage("hatter_attack_v2_state"+_i+".png"));
  }
  redhatter_r_attack = new PIXI.extras.MovieClip(clipnames);


  redhatter_l.gotoAndPlay(0);
  redhatter_r.gotoAndPlay(0);

  
  redhatter_r_attack.animationSpeed = .15;

  redhatter_l.animationSpeed = .15;
  redhatter_r.animationSpeed = .15;
  skeleton.redhatter_l = redhatter_l;

  skeleton.imageContainer.addChild(redhatter_l);
  var first = false,
      loop = false;
  skeleton.draw = function() {
    this.drawText();
   // this.update_player();

    var drawAtX  = CONFIG.SCREEN_WIDTH/2 + skeleton.getDrawAtX() - skeleton.localX() -50;



    redhatter_l.position.y = 380;
    redhatter_r.position.y = 380;
    redhatter_r_attack.position.y = 380+10;

    redhatter_l.position.x = drawAtX;
    redhatter_r.position.x = drawAtX;
    redhatter_r_attack.position.x = drawAtX;
    skeleton.imageContainer.removeChild(redhatter_l);
    skeleton.imageContainer.removeChild(redhatter_r);
    //  skeleton.imageContainer.removeChild(redhatter_l_attack);
    skeleton.imageContainer.removeChild(redhatter_r_attack);

    console.log("cur action: " + this.getCurrentAction());
    //console.log("mov action: " + this.getMoveDirection());

    if (this.getCurrentAction() === CONFIG.ACTION.ATTACK_RIGHT){
      if (first === false){
        redhatter_r_attack.gotoAndPlay(0);
        first = true; //at the very end set first to true
      }
      skeleton.imageContainer.addChild(redhatter_r_attack);
      if (redhatter_r_attack.currentFrame === 1){
        loop = true;
      }
      if (redhatter_r_attack.currentFrame === 0 && loop){
        first = false;
        //this.setCurrentAction(CONFIG.ACTION.MOVING_RIGHT);
        this.setMeeleeAttack(false);
        loop = false;
      }
    } else if (this.getCurrentAction() === CONFIG.ACTION.ATTACK_LEFT){
      if (first === false){
        redhatter_r_attack.gotoAndPlay(0);
        first = true; //at the very end set first to true
      }
      skeleton.imageContainer.addChild(redhatter_r_attack);
      if (redhatter_r_attack.currentFrame === 1){
        loop = true;
      }
      if (redhatter_r_attack.currentFrame === 0 && loop){
        first = false;
        //this.setCurrentAction(CONFIG.ACTION.MOVING_RIGHT);
        this.setMeeleeAttack(false);
        loop = false;
      }

    } else if (this.getCurrentAction() === CONFIG.ACTION.MOVING_RIGHT){
      skeleton.imageContainer.addChild(redhatter_r);
    } else if (this.getCurrentAction() === CONFIG.ACTION.MOVING_LEFT){
      skeleton.imageContainer.addChild(redhatter_l);
    }  else { //is idling
      if (this.getMoveDirection() === "left"){
        skeleton.imageContainer.addChild(redhatter_l);
      } else {
        skeleton.imageContainer.addChild(redhatter_r);
      }
    }

  /*  if (this.getMeeleeAttack()){
        console.log("TRUE");
        skeleton.imageContainer.removeChild(redhatter_r);
        skeleton.imageContainer.removeChild(redhatter_l);
	  if (this.getMoveDirection() === "left"){
        skeleton.imageContainer.addChild(redhatter_r_attack);

    } else if (this.getMoveDirection() === "right" ){
    	  skeleton.imageContainer.addChild(redhatter_r_attack);
    } */


	//} else {

/*
  	if (this.getMoveDirection() === "left"){

  	  skeleton.imageContainer.removeChild(redhatter_r);
  	  skeleton.imageContainer.removeChild(redhatter_l);

  	  skeleton.imageContainer.addChild(redhatter_l);
  	
  	} else if (this.getMoveDirection() === "right" ){
  	  skeleton.imageContainer.removeChild(redhatter_r);
  	  skeleton.imageContainer.removeChild(redhatter_l);
  	  skeleton.imageContainer.addChild(redhatter_r);

  	} 
*/
  
    if (this.getMoveDirection() === "left" || this.getMoveDirection() ==="right"){
      redhatter_l.animationSpeed = .2;
      redhatter_r.animationSpeed = .2;
    } else {
        redhatter_l.animationSpeed = .0;
        redhatter_r.animationSpeed = .0;
      }

  };
  
  /* Constantly called for the localPlayer
   */
  skeleton.update = function(keys) {

  };
  return skeleton;
};
