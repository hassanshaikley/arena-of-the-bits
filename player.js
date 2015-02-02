/**************************************************
 ** PLAYER CLASS IN SERVER
 **************************************************/
var Player = function(startX, startY, startHp, _name) {
  var x = startX,
      y = startY,
      id, //id of the socket
      name = _name,
      hp = 100,
      maxHp = hp,
      character_type = "Unknown", 
      zone = "The Borough";
      gold = 0,
    //team is determined randomly
      team = Math.round(Math.random() * (1));
    
    var getTeam = function(){
	     return this.team;
    };

/* Every character has a type - this is sent from the client */
  var setCharacterType = function(newType){
    this.character_type = newType;
  };
  
  var setGold = function(amount){
    gold = amount;
  };
  
  var getGold = function(){
    return gold
  };
  
  var getCharacterType = function(){
    return this.character_type;
  }

  var getName = function(){
    return name;
  };
  var setName = function(newName){
    name = newName;
  };

  var getHp = function(){
    return hp;
  };

  var setHp = function(newHp){
    if (newHp >= maxHp){
      hp = maxHp;
    }
    hp = newHp;
  };

  var getX = function() {
    return x;
  };

  var getY = function() {
    return y;
  };

  var setX = function(newX) {
    x = newX;
  };

  var setY = function(newY) {
    y = newY;
  };
  var setId = function(newId){
    id = newId;
  };
  var setZone = function(newZone){
    zone = newZone;
  };
  var getZone = function(){
    return zone;
  };
  // Define which variables and methods can be accessed by the world outside
  return {
      getX: getX,
      getY: getY,
      getX : getX,
      setX: setX,
      setY: setY,
      getHp : getHp,
      setHp : setHp,
      setName : setName,
      getName : getName,
      getCharacterType : getCharacterType,
      setCharacterType : setCharacterType,
      setId : setId,
      setZone : setZone,
      getZone : getZone,
      getGold : getGold,
      setGold : setGold,
      getTeam : getTeam,
      id: id
  };
};

exports.Player = Player;
