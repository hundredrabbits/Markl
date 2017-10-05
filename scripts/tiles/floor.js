function Floor(pos = null)
{
  Tile.call(this,pos);

  this.el.className = "floor x_"+pos.x+" y_"+pos.y;

  this.el.setAttribute("style","left:"+(pos.x*TILE_SIZE.width)+"px;bottom:"+(pos.y*TILE_SIZE.height)+"px");
  this.el.innerHTML = "<sprite></sprite>";
  this.el.id = "floor_"+pos.x+"_"+pos.y;
}