
var TILE_SIZE = new Size(80,80);
var ACT_SPEED = 200;

// Responses

var UP = new Vector(0,1);
var DOWN = new Vector(0,-1);
var LEFT = new Vector(-1,0);
var RIGHT = new Vector(1,0);

function Markl()
{
  this.el = document.createElement('yu');

  this.arena = null;
  this.fighter = null;

  this.battle = null;
  
  this.players = [];
  this.interface = new Interface();

  this.install = function()
  {
    document.body.appendChild(this.el);
  }

  this.set_arena = function(arena)
  {
    this.arena = arena;
    this.el.appendChild(this.arena.el);
    this.arena.start();
  }

  this.add_player = function(player)
  {
    this.players.push(player);
    this.interface.set_player(player);
    this.arena.add_event(player);
  }

  this.player_with_name = function(name)
  {
    for(id in this.players){
      if(this.players[id].name == name){ return this.players[id]; }
    }
    return null;
  }

  this.start = function()
  {
    console.log("start");

    this.select_arena(arenas.training);
    // this.select_fighter(fighters.patience("PLAYER",new Idle()));

    // Set players to spawn points
    // for (var i = this.players.length - 1; i >= 0; i--) {
    //   var player = this.players[i];
    //   player.ready(this.arena.get_spawn());
    // }
    // this.arena.update();
    // this.start();

    // this.battle = new Battle();
    // this.battle.start();
  }

  this.select_arena = function(arena)
  {
    console.log("Selecting arena:",arena);
    this.arena = arena;
    this.arena.start();
  }

  this.select_fighter = function(fighter)
  {
    console.log("Selecting fighter:",fighter);
    this.fighter = fighter;
  }
}