/* All the server needs to know is the spawn point of the meteor 
 * Then the clients will calculate if they are hit, and if they are
 * then it sends who hit them, as well as how much damage has been done 
 * to them to the server!
 * 
 */
var Spells = {
  spellsarray: [],

  meteor: function(clientX, clientY) {
    var x = CalculateMeteorX(clientX, clientY);
    var m = new Meteor(x);
    socket.emit("meteor cast", { meteor_x : m.getX()});
  },
  yoloswag: function() {
    console.log("Yolo Swag");
  }
};

function CalculateMeteorX(mouseX, mouseY){
  //location standing - canvas with + offset off mouse
  //console.log(localPlayer.getX() + " - " + (canvas.width/2) + " + " + mouseX); 
  console.log("localplayer x is " + localPlayer.getX());

  var meteorX = localPlayer.getX() - (canvas.width/2) + mouseX +305;
  return meteorX;
};

/* startY isn't necessary, but neither is swag */
var Meteor = function(meteorX){
  var x =meteorX, 
      y = -100;  
  var update = function(){
    y += 15;
    //x += 2;
    var index = Spells.spellsarray.indexOf(this);
    if (y >= 500){
      Spells.spellsarray.splice(index, 1);
    };
  };


  var getX = function(){
    return x;
  };
  var getY = function(){
    return y;
  };

  var draw = function(ctx){
    ctx.save();

    ctx.globalCompositeOperation = "source-over";

	var fireballX = x  - localPlayer.getX() + 50;
    ctx.drawImage(fireballSprite,0,0, 100, 100, fireballX, y, 100, 100);
    //regenerate particles


    ctx.restore();
  };

  return {
    getX : getX,
         getY : getY,
         draw : draw,
         update : update,
         CalculateMeteorX : CalculateMeteorX
  }
};
