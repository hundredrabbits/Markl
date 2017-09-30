function Interface()
{
  this.el = document.createElement("div");
  this.el.setAttribute("id","interface");

  this.set_player = function(player)
  {
    this.el.appendChild(player.interface);    
  }
}