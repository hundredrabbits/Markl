function Style(name)
{
  this.name = name;
  this.host = null;

  this.act = function()
  {
    // Find Trigger, run action
    var sights = this.host.find_sights();

    if(sights.length > 0){
      action = this.on_sight(sights);
    }
    else{
      action = this.on_default();
    }

    this.render(action);
  }

  this.react = function(collided_onto,attacked_by = null)
  {
    if(collided_onto){
      if(collided_onto.style){
        action = this.on_collision(collided_onto);  
      }
      else{
        action = this.on_bump(collided_onto);  
      }
    }

    if(attacked_by){
      action = this.on_attacked(attacked_by);
    }

    console.warn(this.host.name,"reaction begin:");
    this.render(action);
    console.log(this.host.name,"reaction ended.)");
  }

  this.render = function(action = new WAIT())
  {
    var log = action.play(this.host);
    this.host.update();
    this.host.stamina -= 1;
  }

  // Triggers

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