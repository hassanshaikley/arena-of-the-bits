/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var  Fly            = require("./units/fly").Fly,
     Redhatter      = require("./units/redhatter").Redhatter,
     Grimes         = require("./units/grimes").Grimes,
     Bowman         = require("./units/bowman").Bowman,
     Skelly         = require("./units/skelly").Skelly,
     Shanker        = require("./units/shanker").Shanker,
     Crevice        = require("./units/crevice").Crevice,
     Spells         = require("./spellsandprojectiles.js").Spells,
     Meteor         = require("./spellsandprojectiles.js").Meteor,
     Stealth        = require("./spells/stealth.js").Stealth,
     TortStun       = require("./spells/tortstun.js").TortStun,
     BowmanArrow    = require("./spellsandprojectiles.js").BowmanArrow;

     var CONFIG = require("./config");

    canvas_width = 800;

var Events = function(){
    function onSocketConnection(client) {
        // Listen for client disconnected
        client.on("disconnect", onClientDisconnect);
        client.on('sendMessage', function (data) {
            this.broadcast.emit('message', { text: data.text, id: this.id});
            util.log("chat"+this.id);
            this.emit('message', { text: data.text, id: this.id});
        });
        // Listen for new player message
        client.on("new player", onNewPlayer);
		client.on("spell one", onSpellOne);
        client.on("respawn player", onRespawn);
        client.on("descend attack change", onDescendAttackChange);
        client.on("meelee attack", onMeeleeAttack);
        client.on("init me", initClient);
        client.on("key press", onKeyPress);
    };

    var setEventHandlers = function(io) {
        // Socket.IO
        io.set("transports", ["websocket"]);
        io.set("polling duration", 10);
        io.sockets.on("connection", onSocketConnection);
    };

    function onKeyPress(data){
        var player = playerById(this.id);
        if(data.key === "left"){
            if (data.down){
                player.left = true;
            }else {
                player.left = false;
            }
        }
        if(data.key === "right"){
            if (data.down){
                player.right = true;
            } else {
                player.right = false;
            }
        }
        if(data.key === "up"){
            if (data.down){
                player.up = true;
            } else {
                player.up = false;
            }
        }
        if(data.key === "down"){
            if (data.down){
                player.down = true;
            } else {
                player.down = false;
            }
        }
    }

    /*
    function onArrowCreated(data){
        //util.log("arrow created son");
        //get the arrow and validate that this move was allowed
        this.emit('arrow fired', {x: data.x, y :data.y, caster: this.id });
        this.broadcast.emit('arrow fired', {x: data.x, y: data.y, caster: this.id});

        // spell is maintained on the server :D
        var team =playerById(this.id).getTeam();
        v = new BowmanArrow(data.x, data.y, this.id,team );
        Spells.spellsarray.push(v);
        //create it on the sever
        //send information of this arrow to everybody
        //arrow can appear visually on other peoples machines, but have their machiens render it independently, I think ? IDK. lol swag
    };*/

    function onMeeleeAttack(data){ //when a player left clicks
        var attacker = playerById(this.id);
        
	/* Make sure Meelee Attack isn't on CoolDown */
        if (attacker.meeleeAttackTime == null || attacker.meeleeAttackTime + 1000 <= Date.now()){
            attacker.meeleeAttackTime = Date.now();
        } else {    //meelee attack is on CD
            return;
        }
	
        var i;
	var that = this;
	setTimeout( function(){
	  var _x = attacker.getX() - 20;
	  var _y = attacker.getY()-15;
          switch (attacker.getCharacterType()) {
          case "Shanker":
            if (data.direction === "right"){
		_x += 53;
	    } else {
		_x -=12;
	     }
              break;
              case "Redhatter":
                if (data.direction === "right"){
                    _x +=63;
                    } else {
                     _x -=28;
                }
                _y +=10;
                break;
              case "Fly":
                if (data.direction === "right"){
                    _x+=63;
                    } else {
                        _x-= 28;
                        }
                  _y+=55;
                break;
          }
            //now iterate through all players see if it hits!

	    
            var playersHit = didAttackHitPlayer(_x, _y, attacker.getTeam(), attacker.getDamage());
            didAttackHitTower(_x, _y, attacker.getTeam(), attacker.getDamage());
	    if (attacker.getCharacterType() === "Redhatter"){
	      //knockback
		var distance = 0;
		if (data.direction == "right"){
			distance = 200;
		} else {
			distance = -200;
		}
	      for (var i = 0; i < playersHit.length ; i++){
		playersHit[i].setX(playersHit[i].getX() + distance);
	    }
	  }
	  that.broadcast.emit("draw hitmarker",  {x: _x, y: _y });
	  that.emit("draw hitmarker",  {x: _x, y: _y });
	}, 500);

        //hitbox should depend on direction, so should create a hitbox then tell if the two hitboxes overlap!
        //a helped function would ideally take two rectangles and tell you if overlaps





        util.log("Meelee Attack: at " + attacker.getX() + " tower at " + game1.shrine_1.getX() + " and " +game1.shrine_0.getX()  ); //between 60 and 150 is perfect


        //Now get all the characters to animate the meelee attack = )
        this.emit('meelee attack', {attacker: "you" });
        this.broadcast.emit('meelee attack', {attacker: this.id});
    }

    function didAttackHitTower(attackX, attackY, team, damage){
        var shrine;
        util.log ("attacker team is " + team );

        if (team == 0){
            shrine = game1.shrine_1;
        } else {
            shrine = game1.shrine_0;
        }
        util.log("shrine x is " + shrine.getX() + "width is "+ shrine.getHalfWidth());
        util.log("attacked at " + attackX + ", " + attackY);
            if  (Math.abs(attackX - shrine.getX()) <= shrine.getHalfWidth() ){
                if (Math.abs(shrine.getY() - attackY) <= shrine.getHeight()/2 ){
                  shrine.setHp(shrine.getHp() - damage );
               }
      }

    }
    function didAttackHitPlayer(attackX, attackY, team, damage){
	var playersHit = [];
        for (i = 0; i< players.length; i++){
            if (players[i].getTeam() === team){
                continue;
            }
            if  (Math.abs(players[i].getX() - attackX) <= players[i].getWidth()/2){
                if (Math.abs(players[i].getY() - attackY) <= players[i].getHeight()/2){
                    setHp(players[i], damage);
	  	    playersHit.push(players[i]);
                }
           }
	return playersHit;
       }
    }


    function onDescendAttackChange(data){
        var dAP = playerById(this.id);
        dAP.setDescendAttack(data.descendAttack);
        this.emit("descend attack changes", { id: "self", descendAttack: data.descendAttack });
        this.broadcast.emit("descend attack changes", {id: this.id, descendAttack: data.descendAttack});
    };
    function onRespawn(){
        var respawnPlayer = playerById(this.id);
        util.log("a player has respawned (id:" + this.id + ")");
        respawnPlayer.alive = true;
        respawnPlayer.hp = 100;
        this.emit("respawn player", {id: this.id});
        this.broadcast.emit("respawn player", {id: this.id});
    };
    function onClientDisconnect() {
        var removePlayer = playerById(this.id);

        // Player not found
        util.log(removePlayer.id +" has left");
        if (!removePlayer) {
            return;
        };
        // Remove player from players array
        players.splice(players.indexOf(removePlayer), 1);
        // Broadcast removed player to connected socket clients
        this.broadcast.emit("remove player", {id: this.id});
    };

    // New player has joined
    function onNewPlayer(data) {
        // Create a new player
        util.log("A " + (data.characterType || "unknown") + " has joined the game.");
        if (data.characterType === CONFIG.Fly){
            var newPlayer = new Fly(data.name);
        }
        else if (data.characterType === CONFIG.Redhatter){
            var newPlayer = new Redhatter(data.name);
				}
        else if (data.characterType === CONFIG.Grimes){
            var newPlayer = new Grimes(data.name);
        }
        else if (data.characterType === CONFIG.Bowman){
            var newPlayer = new Bowman(data.name);
        } else if (data.characterType === CONFIG.Shanker){
            console.log("MADE HSANKAAR");
            var newPlayer = new Shanker(data.name);
        }
        else { // (data.characterType === "Crevice"){
            var newPlayer = new Crevice(data.name);
        }
        newPlayer.id = this.id;
        game1.addPlayer(newPlayer);
        this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), name: newPlayer.getName(), characterType : newPlayer.getCharacterType() });
        // Send existing players to the new player
        var i, existingPlayer;
        for (i = 0; i < players.length; i++) {
            existingPlayer = players[i];
            this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), hp: existingPlayer.getHp(), name: existingPlayer.getName(), characterType : existingPlayer.getCharacterType(), team: newPlayer.getTeam()});
        };
        util.log("Total # of players is " + (players.length+1));
        // Add new player to the players array
        players.push(newPlayer);

    };

	function onSpellOne(data){
		var player = playerById(this.id);
        var team = player.getTeam();
        if (player.getCharacterType() === "Grimes" && player.spellOneCastTime + TortStun.getCooldown()  <=  Date.now() ) {
            player.spellOneCastTime = Date.now();
		    var v = new TortStun(data.x, data.y, team);
            Spells.spellsarray.push(v);
            this.emit('spell one', {x: data.x, spell: "tort stun", casted_by_me: true});
            this.broadcast.emit('spell one', {x: data.x, spell: "tort stun" });
        }
        if (player.getCharacterType() === "Redhatter" && player.spellOneCastTime + Meteor.getCooldown()  <=  Date.now() ){
            player.spellOneCastTime = Date.now();
                //var v = new TortStun(data.x, data.y, team);
                var v = new Meteor(data.x, data.y, team);
                Spells.spellsarray.push(v);
                this.emit('spell one', {x: data.x, spell: "meteor" });
                this.broadcast.emit('spell one', {x: data.x, spell: "meteor" });
        }
        if (player.getCharacterType() === "Shanker" && player.spellOneCastTime + Stealth.getCooldown() <= Date.now() ){

        }

	};

    //io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
    //hitBy.setGold(hitBy.getGold()+1);
    function setHp(hitPlayer, damage){ //where hitplayer is like players[i]
        hitPlayer.setHp(hitPlayer.getHp() -damage);
        //    io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
        //    io.sockets.connected[hitPlayer.id].emit('set hp', { hp: hitPlayer.getHp() });
    }

    /* sends a message to one player and responds with it's team*/
    var initClient = function(){
        var initPlayer = playerById(this.id);
        this.emit("init me", { team: initPlayer.getTeam(), x: initPlayer.getRespawnX()});
    };
    /**************************************************
     ** GAME HELPER FUNCTIONS
     **************************************************/
    function playerById(id) {
        var i;
        for (i = 0; i < players.length; i++) {
            if (players[i].id == id)
                return players[i];
        };
        return false;
    };

    return {
        setEventHandlers : setEventHandlers,
    };
};

exports.Events = Events;
