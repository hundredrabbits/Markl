function Custom()
{
  Style.call(this,"custom")

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
    else{
      return MOVE_LEFT;
    }
  }

  this.on_collision_up = function(collider)
  {
    console.log("collide up");
    return MOVE_RIGHT
  }

  this.on_collision_down = function(collider)
  {
    console.log("collide down");
    return MOVE_LEFT
  }

  this.on_collision_left = function(collider)
  {
    console.log("collide left");
    return MOVE_UP
  }

  this.on_collision_right = function(collider)
  {
    console.log("collide right");
    return MOVE_DOWN
  }

  this.on_default = function()
  {
    var items = [MOVE_UP,MOVE_DOWN,MOVE_RIGHT,MOVE_LEFT];
    return items[Math.floor(Math.random()*items.length)];
  }
}