function Event(pos = null)
{
  this.pos = pos;
  this.is_collider = null;

  this.element = document.createElement("event");
  this.element.setAttribute("class","");

  this.update = function()
  {
    if(this.pos){
      this.element.setAttribute("style","left:"+(this.pos.x*50)+"px;bottom:"+(this.pos.y*50)+"px");  
    }
  }
}