function Event(pos)
{
  this.position = pos;

  console.log(this.position);
  this.element = document.createElement("event");
  this.element.setAttribute("style","left:"+(this.position.x*50)+"px;top:"+(this.position.y*50)+"px");
}