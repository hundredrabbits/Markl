function Markle(element)
{
  this.element = element;

  this.arena = null;
  this.players = [];
  this.interface = new Interface();

  this.install = function()
  {
    this.interface.install();
  }

  this.set_arena = function(arena)
  {
    this.arena = arena;
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