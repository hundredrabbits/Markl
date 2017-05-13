function Pos(x,y)
{
  this.x = x;
  this.y = y;

  this.update = function(pos)
  {
    this.x = pos.x;
    this.y = pos.y;
  }

  this.add = function(pos)
  {
    return new Pos(this.x + pos.x, this.y + pos.y);
  }

  this.html = function()
  {
    return new Pos(this.x * TILE_SIZE.width, (markl.arena.size.height * TILE_SIZE.width) - ((this.y + 1) * TILE_SIZE.height) );
  }

  this.is_equal = function(pos)
  {
    if(!pos){ return null; }
    return pos.x == this.x && pos.y == this.y ? true : null;
  }

  this.distance_from = function(pos)
  {
    return 1;
  }

  this.toString = function()
  {
    return this.x+","+this.y;
  }
}