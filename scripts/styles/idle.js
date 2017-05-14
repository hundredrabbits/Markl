function Idle()
{
  Style.call(this,"idle");

  this.on_sight = function()
  {
    return new WAIT();
  }

  this.on_default = function()
  {
    return new WAIT();
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


  this.on_collision_up = function(collider)
  {
    return new MOVE(RIGHT);
  }

  this.on_collision_down = function(collider)
  {
    return new MOVE(UP);
  }

  this.on_collision_left = function(collider)
  {
    return new MOVE(RIGHT);
  }

  this.on_collision_right = function(collider)
  {
    // Create inifinite loop
    return new WAIT();
    // return new MOVE(LEFT);
  }




  this.on_bump_up = function(bumper)
  {
    return new MOVE(RIGHT);
  }

  this.on_bump_down = function(bumper)
  {
    return new MOVE(LEFT);
  }

  this.on_bump_left = function(bumper)
  {
    return new MOVE(UP);
  }

  this.on_bump_right = function(bumper)
  {
    return new MOVE(DOWN);
  }
  
}