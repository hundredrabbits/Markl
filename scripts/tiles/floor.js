function Floor(pos = null)
{
  Tile.call(this,pos);

  this.el.className = "floor x_"+pos.x+" y_"+pos.y;

  if(this.pos.x == 1 || this.pos.y == 1 || this.pos.x == markl.arena.size.width - 2 || this.pos.y == markl.arena.size.height - 2){
    if((this.pos.x == 1 || this.pos.x == markl.arena.size.width - 2) && (this.pos.y == 1 || this.pos.y == markl.arena.size.height - 2)){
      this.el.className += " alt_1";
    }
  }
  else if((markl.arena.size.width+1)/2 && (markl.arena.size.height+1)/2){
    this.el.className += " alt_2";
  }

  this.el.setAttribute("style","left:"+(pos.x*TILE_SIZE.width)+"px;bottom:"+(pos.y*TILE_SIZE.height)+"px");
  this.el.innerHTML = "<sprite></sprite>";
  this.el.id = "floor_"+pos.x+"_"+pos.y;
}