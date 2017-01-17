function Event(pos = null)
{
  this.pos = pos;

  this.element = document.createElement("event");
  this.element.setAttribute("class","");

  this.update = function()
  {
    if(this.pos){
      this.element.setAttribute("style","left:"+(this.pos.x*50)+"px;top:"+((50*4)-this.pos.y*50)+"px");  
    }
  }
}