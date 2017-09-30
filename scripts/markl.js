
var TILE_SIZE = new Size(80,80);
var ACT_SPEED = 500;

// Responses

var UP = new Vector(0,1);
var DOWN = new Vector(0,-1);
var LEFT = new Vector(-1,0);
var RIGHT = new Vector(1,0);

function Markl()
{
  this.el = document.createElement('yu');
  this.el.style.padding = (TILE_SIZE.width/2)+"px";

  this.arena = null;
  this.fighter = null;
  this.fighters = [];
  this.battle = null;

  this.interface = new Interface();

  this.install = function()
  {
    document.body.appendChild(this.el);
  }
  
  this.start = function()
  {
    console.log("start");

    this.select_fighter(new Patience("Trainer",new Idle()));
    this.select_arena(arenas.training);
    this.select_opponents([new Sage("CPU1",new Custom()),new Sage("CPU2",new Idle()),new Sage("CPU3",new Idle())]);

    this.interface.start();

    this.arena.start();

    this.battle = new Battle();
    this.battle.start();
  }

  this.select_arena = function(arena)
  {
    console.log("Selecting arena:",arena.name);
    this.arena = arena;
    this.arena.setup();
  }

  this.select_fighter = function(fighter)
  {
    console.log("Selecting fighter:",fighter.name);
    this.fighter = fighter;
    this.fighters.push(this.fighter);
    this.fighter.setup();
  }

  this.select_opponents = function(opponents)
  {
    for(id in opponents){
      this.fighters.push(opponents[id]);
    }
  }
}