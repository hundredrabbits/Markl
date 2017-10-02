function Vector(x,y)
{
  this.x = clamp(x,-1,1);
  this.y = clamp(y,-1,1);

  if(this.x == 1){ this.name = "right"; }
  if(this.x == -1){ this.name = "left"; }
  if(this.y == 1){ this.name = "up"; }
  if(this.y == -1){ this.name = "down"; }

  function clamp(v, min, max)
  { 
    return v < min ? min : v > max ? max : v; 
  }
}