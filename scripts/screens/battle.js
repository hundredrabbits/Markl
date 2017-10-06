function Battle_Screen()
{
  Screen.call(this);
  
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
    var triggers = this.find_triggers();
  }

  this.find_triggers = function()
  {
    var h = {"SIGHT":{},"DEFAULT":{"DEFAULT":{"DEFAULT":{}}}};

    var sights = markl.arena.events_visible_from(markl.fighter.pos);

    for(id in sights){
      var sight = sights[id];
      if(!sight.is_visible){ continue; }
      var sight_type = sight.type.toUpperCase();
      var sight_distance = sight.pos.distance_from(markl.fighter.pos);
      if(!h["SIGHT"][sight_type]){
        h["SIGHT"][sight_type] = {};
      }
      h["SIGHT"][sight_type]["DEFAULT"] = sight;
      h["SIGHT"][sight_type]["DISTANCE IS "+sight_distance] = sight;
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
    
  // this.turn = function()
  // {
  //   this.counter += 1;
  //   if(this.counter > this.limit){ return this.end(); }

  //   var next_fighter = this.next_fighter();

  //   if(!next_fighter || markl.arena.get_fighters_alive().length < 2){
  //     return this.end();
  //   }

  //   if(next_fighter.name == "Trainer"){
  //     console.warn("TURN "+this.counter+" : "+next_fighter.name+" "+next_fighter.hp+"HP");
  //   }
  //   else{
  //     console.info("TURN "+this.counter+" : "+next_fighter.name);  
  //   }

  //   markl.designer.update();
    
  //   this.next_fighter().act();
  // }

  this.end = function()
  {
    this.counter = 0;
    console.log("<Battle>Ended");
    markl.designer.update();
  }
  
}