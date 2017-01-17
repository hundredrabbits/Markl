function Pos(x,y)
{
  this.x = x;
  this.y = y;

  this.add = function(pos)
  {
    this.x += pos.x;
    this.y += pos.y;
  }
}