function Custom()
{
  Style.call(this,"custom")

  this.on_loadout_1 = function()
  {
    return new FIRE();
  }

  this.on_loadout_1 = function()
  {
    return new DASH();
  }

  this.on_sight = function()
  {
    return new MOVE(RIGHT)
  }

  this.on_attack = function()
  {
    
  }

  this.on_collision_up = function(collider)
  {
    return new MOVE(DOWN);
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
    return new MOVE(LEFT);
  }

  this.on_default = function()
  {
    return new MOVE(RIGHT)
    var items = [new MOVE(RIGHT), new MOVE(LEFT), new MOVE(UP), new MOVE(DOWN)];
    return items[Math.floor(Math.random()*items.length)];
  }
}