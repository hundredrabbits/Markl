function Event(pos = null)
{
  Tile.call(this,pos);

  this.is_collider = null;
  this.is_visible = true;
  this.type = "Any";

  this.el = document.createElement("event");
  this.el.setAttribute("class","");

  this.el.setAttribute("style","left:"+(this.pos.x*TILE_SIZE.width)+"px;bottom:"+(this.pos.y*TILE_SIZE.width)+"px");  

  this.update = function()
  {
    if(this.pos){
      this.el.setAttribute("style","left:"+(this.pos.x*TILE_SIZE.width)+"px;bottom:"+(this.pos.y*TILE_SIZE.width)+"px");  
    }
  }

  this.toString = function()
  {
    return this.name+"["+this.type+"] "+this.pos.toString();
  }
}