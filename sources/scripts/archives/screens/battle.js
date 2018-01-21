function Battle_Screen()
{
  Screen.call(this);

  this.name = "Battle";

  this.summary_el = document.createElement("yu");
  this.summary_el.className = "summary";
  
  this.start = function()
  {
    console.info("BATTLE","start("+markl.arena.name+")");
    markl.arena.setup();
    this.el.appendChild(markl.arena.el);
    markl.arena.start();
    markl.designer.update();

    markl.screen.el.appendChild(this.summary_el);

    this.next();
  }

  this.next = function()
  {
    this.update_interface();

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
    setTimeout(function(){ s.next(); }, ACT_SPEED * 1.001);
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

  this.update_interface = function()
  {
    var html = "";

    for(id in markl.fighters){
      var fighter = markl.fighters[id];
      html += fighter.name+" ";
      if(fighter.score.hits > 0){
        html += fighter.score.hits+"H ";
      }
      if(fighter.score.kills > 0){
        html += fighter.score.kills+"K ";
      }
      if(fighter.score.turns > 0){
        html += fighter.score.turns+"T ";
      }
      if(fighter.is_alive() && fighter.relative_stamina() > 0){
        html += fighter.relative_stamina()+"S ";
      }
      html += "<br />";
    }
    if(html != this.summary_el.innerHTML){
      // console.log("update")
      // this.summary_el.innerHTML = html;  
    }
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