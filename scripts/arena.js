function Arena(name,size)
{
  this.name = name;
  this.size = size;

  this.element = document.createElement("div");
  this.element.setAttribute("class","arena");
  this.element.innerHTML = this.name;
}