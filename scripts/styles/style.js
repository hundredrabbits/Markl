function Style(name)
{
  this.name = name;
  this.host = null;

  this.act = function()
  {
    var action = this.on_default(); console.log(action);

    if(action){
      this.render(action);
    }
    else{
      this.render(new WAIT());
    }
  }

  this.render = function(action)
  {
    action.host = this.host;

    action.play();
    this.host.update();
    this.host.stamina -= 1;
  }

  // Triggers

  this.on_sight = function()
  {
    
  }

  this.on_attack = function()
  {
    
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
    return WAIT();
  }

  this.on_collision_down = function(collider)
  {
    console.log("collide down");
    return WAIT();
  }

  this.on_collision_left = function(collider)
  {
    console.log("collide left");
    return WAIT();
  }

  this.on_collision_right = function(collider)
  {
    console.log("collide right");
    return WAIT();
  }

  this.on_default = function()
  {
    
  }
}