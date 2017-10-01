function Custom()
{
  Style.call(this,"custom")

  this.on_target_right = function()
  {
    return new ATTACK(RIGHT);
  }

  this.on_target_up = function()
  {
    return new ATTACK(UP);
  }

  this.on_target_left = function()
  {
    return new ATTACK(LEFT);
  }

  this.on_target_down = function()
  {
    return new ATTACK(DOWN);
  }

  this.on_sight_up = function()
  {
    return new MOVE(UP);
  }

  this.on_sight_down = function()
  {
    return new MOVE(DOWN);
  }

  this.on_sight_left = function()
  {
    return new MOVE(LEFT);
  }

  this.on_sight_right = function()
  {
    return new MOVE(RIGHT);
  }

  this.on_collision_up = function(collider)
  {
    return new ATTACK(UP);
  }

  this.on_collision_down = function(collider)
  {
    return new ATTACK(DOWN);
  }

  this.on_collision_left = function(collider)
  {
    return new ATTACK(LEFT);
  }

  this.on_collision_right = function(collider)
  {
    return new ATTACK(RIGHT);
  }




  this.on_attacked_up = function()
  {
    return new MOVE(RIGHT);
  }
  
  this.on_attacked_down = function()
  {
    return new MOVE(LEFT);
  }

  this.on_attacked_right = function()
  {
    return new MOVE(DOWN);
  }

  this.on_attacked_left = function()
  {
    return new MOVE(UP);
  }



  this.on_bump_up = function(bumper)
  {
    return new MOVE(RIGHT);
  }

  this.on_bump_down = function(bumper)
  {
    return new MOVE(UP);
  }

  this.on_bump_left = function(bumper)
  {
    return new MOVE(RIGHT);
  }

  this.on_bump_right = function(bumper)
  {
    return new MOVE(UP);
  }

  this.on_default = function()
  {
    console.log("Move random")
    var items = [new MOVE(RIGHT), new MOVE(LEFT), new MOVE(UP), new MOVE(DOWN)];
    return items[Math.floor(Math.random()*items.length)];
  }
}