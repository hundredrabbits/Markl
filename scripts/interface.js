function Interface()
{
  this.element = document.createElement("div");
  this.element.setAttribute("id","interface");

  this.set_player = function(player)
  {
    this.element.appendChild(player.element);    
  }
}