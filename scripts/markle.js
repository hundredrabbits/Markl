function Markle(element)
{
  this.element = element;

  this.arena = null;
  this.players = [];
  this.interface = new Interface();

  this.install = function()
  {
    this.element.appendChild(this.interface.element);
  }

  this.set_arena = function(arena)
  {
    this.arena = arena;
    this.element.appendChild(this.arena.element);
  }

  this.set_player = function(player)
  {
    this.players.push(player);
    this.interface.set_player(player);
  }

  this.start = function()
  {

  }
}