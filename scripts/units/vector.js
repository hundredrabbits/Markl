function Vector(x,y)
{
  this.x = x;
  this.y = y;

  if(this.x == 1){ this.name = "right"; }
  if(this.x == -1){ this.name = "left"; }
  if(this.y == 1){ this.name = "up"; }
  if(this.y == -1){ this.name = "down"; }
}