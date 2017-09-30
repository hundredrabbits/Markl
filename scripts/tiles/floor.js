function Floor(pos = null)
{
  Tile.call(this,pos);

  this.el.className = "floor";

  this.el.setAttribute("style","left:"+(pos.x*TILE_SIZE.width)+"px;bottom:"+(pos.y*TILE_SIZE.height)+"px");
  this.el.innerHTML = pos.toString();
}