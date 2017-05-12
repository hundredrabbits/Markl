function Style(name)
{
  this.name = name;
  this.host = null;

  this.act = function(collider = null)
  {
    // Find Trigger, run action
    var sights = this.host.find_sights();
    
    if(this.host.collider){
      action = this.on_collision(this.host.collider);
      this.host.collider = null;
    }
    else if(sights.length > 0){
      action = this.on_sight(sights);
    }
    else{
      action = this.on_default();
    }

    this.render(action);
  }

  this.render = function(action = new WAIT())
  {
    action.play(this.host);
    this.host.update();
    this.host.stamina -= 1;
  }

  // Triggers

  this.on_sight = function(sights)
  {
  }

  this.on_sighted = function(enemy)
  {
    
  }

  this.on_attack = function(target)
  {
    
  }

  this.on_attacked = function(attacker)
  {
    
  }

  this.on_collision = function(collider)
  {
    console.log("collide");
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

  this.on_collided = function(collider)
  {
    
  }

  this.on_default = function()
  {
    return new WAIT();
  }
}