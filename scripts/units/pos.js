function Pos(x,y)
{
  this.x = x;
  this.y = y;

  this.add = function(pos)
  {
    this.x += pos.x;
    this.y += pos.y;
  }

  this.html = function()
  {
    return new Pos(this.x * TILE_SIZE.width, (markl.arena.size.height * TILE_SIZE.width) - ((this.y + 1) * TILE_SIZE.height) );
  }
}