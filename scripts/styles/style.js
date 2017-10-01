function Style(name)
{
  this.name = name;
  this.host = null;
  this.sights = [];
  this.target = null;

  this.act = function()
  {
    this.host.stamina -= 1;

    // Find Trigger, run action
    this.sights = this.host.find_sights();
    this.target = this.host.find_target(this.sights);

    if(this.target){
      action = this.on_target(this.target);
    }
    else if(this.sights.length > 0){
      action = this.on_sight(this.sights);
    }
    else{
      action = this.on_default();
    }
    this.render(action);
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
}