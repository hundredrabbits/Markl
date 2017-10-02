function Style(name,text)
{
  this.name = name;
  this.text = text;
  this.tree = parse(this.text);
  
  this.host = null;
  this.sights = [];
  this.target = null;

  this.act = function()
  {
    this.host.stamina -= 1;
    this.host.el.className = "fighter acting";

    this.sights = this.host.find_sights();
    this.target = this.host.find_target(this.sights);

    var action = this.find_action();
  }

  this.find_action = function()
  {
    for(trigger_id in this.tree){
      var trigger = this.tree[trigger_id];
      for(event_id in trigger.events){
        var event = trigger.events[event_id];
        for(condition_id in event.conditions){
          var condition = event.conditions[condition_id];
          var is_valid = this.validate(trigger.name,event.name,condition.name);
          console.log(trigger.name+" > "+event.name+" > "+condition.name+"->"+is_valid);
        }
      }
    }
    return null;
  }

  this.validate = function(trigger,event,condition)
  {
    if(trigger == "DEFAULT" || (trigger == "SIGHT" && this.sights.length > 0)){
      return true;
    }
    return false;
  }

  this.render = function(action = new WAIT())
  {
    this.host.el.className = "fighter active";
    var s = this;

    var log = action.play(this.host);
    this.host.update();

    setTimeout(function(){ s.complete(); }, ACT_SPEED);
  }

  this.complete = function()
  {
    console.log("complete")
    this.host.el.className = "fighter idle";
    markl.battle.turn();
  }

  // Triggers

  this.on_target = function(target)
  {
    if(target.pos.y > this.host.pos.y){
      return this.on_target_up(target);
    }
    else if(target.pos.y < this.host.pos.y){
      return this.on_target_down(target);
    }
    else if(target.pos.x > this.host.pos.x){
      return this.on_target_right(target);
    }
    else if(target.pos.x < this.host.pos.x){
      return this.on_target_left(target);
    }
    return WAIT();     
  }

  this.on_target_up = function(target){ return WAIT(); }
  this.on_target_down = function(target){ return WAIT(); }
  this.on_target_left = function(target){ return WAIT(); }
  this.on_target_right = function(target){ return WAIT(); }

  this.on_sight = function(sights)
  {
    var nearest = null;

    for(id in sights){
      var sight = sights[id];
      if(!nearest || sight.pos.distance_from(this.host.pos) < nearest.pos.distance_from(this.host.pos)){
        nearest = sight;
      }
    }

    if(!nearest){
      return WAIT();
    }

    if(nearest.pos.y > this.host.pos.y){
      return this.on_sight_up(nearest);
    }
    else if(nearest.pos.y < this.host.pos.y){
      return this.on_sight_down(nearest);
    }
    else if(nearest.pos.x > this.host.pos.x){
      return this.on_sight_right(nearest);
    }
    else if(nearest.pos.x < this.host.pos.x){
      return this.on_sight_left(nearest);
    }
    return WAIT();    
  }

  this.on_sight_up = function(sight){ return WAIT(); }
  this.on_sight_down = function(sight){ return WAIT(); }
  this.on_sight_left = function(sight){ return WAIT(); }
  this.on_sight_right = function(sight){ return WAIT(); }

  this.on_attacked = function(attacker)
  {
    console.log(this.host.name,"attacked by "+attacker.name);

    if(attacker.pos.y > this.host.pos.y){
      return this.on_attacked_up(attacker);
    }
    else if(attacker.pos.y < this.host.pos.y){
      return this.on_attacked_down(attacker);
    }
    else if(attacker.pos.x > this.host.pos.x){
      return this.on_attacked_right(attacker);
    }
    else if(attacker.pos.x < this.host.pos.x){
      return this.on_attacked_left(attacker);
    }
    return WAIT();    
  }

  this.on_attacked_up = function(bumper)
  {
    console.log("attacked up");
    return new WAIT();
  }

  this.on_attacked_down = function(bumper)
  {
    console.log("attacked down");
    return new WAIT();
  }

  this.on_attacked_left = function(bumper)
  {
    console.log("attacked left");
    return new WAIT();
  }

  this.on_attacked_right = function(bumper)
  {
    console.log("attacked right");
    return new WAIT();
  }

  this.on_collision = function(collider)
  {
    if(collider.pos.y > this.host.pos.y){
      return this.on_collision_up(collider);
    }
    else if(collider.pos.y < this.host.pos.y){
      return this.on_collision_down(collider);
    }
    else if(collider.pos.x > this.host.pos.x){
      return this.on_collision_right(collider);
    }
    else if(collider.pos.x < this.host.pos.x){
      return this.on_collision_left(collider);
    }
    return WAIT();
  }

  this.on_collision_up = function(collider)
  {
    console.log("collide up");
    return new WAIT();
  }

  this.on_collision_down = function(collider)
  {
    console.log("collide down");
    return new WAIT();
  }

  this.on_collision_left = function(collider)
  {
    console.log("collide left");
    return new WAIT();
  }

  this.on_collision_right = function(collider)
  {
    console.log("collide right");
    return new WAIT();
  }

  this.on_bump = function(bumper)
  {
    console.log("bump");
    if(bumper.pos.y > this.host.pos.y){
      return this.on_bump_up(bumper);
    }
    else if(bumper.pos.y < this.host.pos.y){
      return this.on_bump_down(bumper);
    }
    else if(bumper.pos.x > this.host.pos.x){
      return this.on_bump_right(bumper);
    }
    else if(bumper.pos.x < this.host.pos.x){
      return this.on_bump_left(bumper);
    }
    return WAIT();
  }

  this.on_bump_up = function(bumper)
  {
    console.log("bump up");
    return new WAIT();
  }

  this.on_bump_down = function(bumper)
  {
    console.log("bump down");
    return new WAIT();
  }

  this.on_bump_left = function(bumper)
  {
    console.log("bump left");
    return new WAIT();
  }

  this.on_bump_right = function(bumper)
  {
    console.log("bump right");
    return new WAIT();
  }

  this.on_collided = function(collider)
  {
    
  }

  this.on_sighted = function(enemy)
  {
    
  }

  this.on_attack = function(target)
  {
    
  }

  this.on_default = function()
  {
    return new WAIT();
  }


















  function parse(text)
  {
    var a = [];
    var lines = text.toUpperCase().split("\n");
    var stash = null;
    var trigger = null;
    var event = null;
    var condition = null;
    var action = null;
    for(id in lines){
      var line = lines[id];
      var pad = pad_length(line);
      if(line.trim() == "" || line.substr(0,2) == "--"){ continue; }
      if(pad == 0){
        if(trigger){ a.push(trigger); }
        trigger = {name:line,events:[]};
      }
      if(pad == 2){
        event = {name:line.trim(),conditions:[]};
        trigger.events.push(event);
      }
      if(pad == 4){
        condition = {name:line.trim(),actions:[]};
        event.conditions.push(condition);
      }
      if(pad == 6){
        condition.actions.push(line.trim());
      }
    }
    if(trigger){ a.push(trigger); }
    return a;
  }

  function pad_length(str)
  {
    var i = 0;
    while(i < str.length){
      if(str.substr(i,1) != " "){
        return i;
      }
      i += 1;
    }
    return i;
  }
}