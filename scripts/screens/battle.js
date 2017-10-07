function Battle_Screen()
{
  Screen.call(this);

  this.name = "Battle"
  
  this.start = function()
  {
    console.info("BATTLE","start("+markl.arena.name+")");
    markl.arena.setup();
    this.el.appendChild(markl.arena.el);
    markl.arena.start();
    markl.designer.update();

    this.next();
  }

  this.next = function()
  {
    if(markl.arena.get_fighters_alive().length < 2){
      this.end();
      return;
    }
    if(markl.designer.is_running){
      this.move_missiles();
      var fighter = this.next_fighter();
      var triggers = this.find_triggers(fighter);
      var reaction = fighter.style.react(triggers);
      if(reaction){ fighter.style.run(reaction); }else{ console.log("No reaction",reaction); }
      
      markl.designer.update(fighter,parseInt(reaction.actions[0].line),reaction.target);
    } 

    markl.arena.focus();
    
    var s = this;
    setTimeout(function(){ s.next(); }, ACT_SPEED);
  }

  this.move_missiles = function()
  {
    for(id in markl.arena.events)
    {
      var event = markl.arena.events[id];
      if(event.type != "missile"){ continue; }
      var missile = event;
      missile.move();
    }
  }

  this.find_triggers = function(fighter)
  {
    var h = {"SIGHT":{"FIGHTER":{},"BLOCKER":{},"MISSILE":{}},"DEFAULT":{"DEFAULT":{"DEFAULT":{}}}};

    var sights = markl.arena.events_visible_from(fighter.pos);

    for(id in sights){
      var sight = sights[id];
      if(!sight || !sight.is_visible){ continue; }
      var sight_type = sight.type.toUpperCase().trim();
      var sight_distance = sight.pos.distance_from(fighter.pos);
      console.log(sight,sight_type);
      h["SIGHT"][sight_type]["DEFAULT"] = sight;
      h["SIGHT"][sight_type]["DISTANCE IS "+sight_distance] = sight;
      if(sight.character){
        var sight_character = sight.character.toUpperCase().trim();
        h["SIGHT"][sight_type]["CHARACTER IS "+sight_character] = sight;
      }
    }
    return h;
  }

  this.next_fighter = function()
  {
    var p = null;
    for (var i = markl.fighters.length - 1; i >= 0; i--) {
      if(markl.fighters[i].is_alive() == false){ continue; }
      if(!p || markl.fighters[i].stamina > p.stamina){ p = markl.fighters[i]; }
    }
    if(p.hp == 0){ return; }
    return p;
  }

  this.end = function()
  {
    this.counter = 0;
    console.log("<Battle>Ended");

    for(id in markl.fighters){
      if(!markl.fighters[id].is_alive()){ continue; }
      markl.fighters[id].status = {action:"idle",vector:"down"};
    }
    markl.designer.update();
  }
}