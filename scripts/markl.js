function Markl(element)
{
  this.element = element;

  this.battle = null;
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

  this.add_player = function(player)
  {
    this.players.push(player);
    this.interface.set_player(player);
    this.arena.add_event(player);
  }

  this.ready = function()
  {
    // Set players to spawn points
    for (var i = this.players.length - 1; i >= 0; i--) {
      var player = this.players[i];
      player.ready(this.arena.get_spawn());
      console.log(player.name);
      console.log(player.pos);
    }
    this.arena.update();
    this.start();
  }

  this.start = function()
  {
    this.battle = new Battle();
    this.battle.start();
  }
}