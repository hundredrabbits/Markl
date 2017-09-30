function Event(pos = null)
{
  this.pos = pos;
  this.is_collider = null;

  this.el = document.createElement("event");
  this.el.setAttribute("class","");

  this.update = function()
  {
    if(this.pos){
      this.el.setAttribute("style","left:"+(this.pos.x*50)+"px;bottom:"+(this.pos.y*50)+"px");  
    }
  }
}