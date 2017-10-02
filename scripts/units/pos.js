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
    if(pos.x == this.x && pos.y == this.y){ return 0; } // Same tile
    if(pos.x != this.x && pos.y != this.y){ return null; } // No aligned

    if(Math.abs(pos.x - this.x) > 0){ return Math.abs(pos.x - this.x); }
    if(Math.abs(pos.y - this.y) > 0){ return Math.abs(pos.y - this.y); }
    return null;
  }

  this.toString = function()
  {
    return this.x+","+this.y;
  }

  this.offset = function(pos)
  {
    return new Pos(this.x - pos.x,this.y - pos.y);
  }

  this.invert = function()
  {
    return new Pos(this.x*-1,this.y*-1);
  }
}