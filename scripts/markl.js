
var TILE_SIZE = new Size(80,80);
var ACT_SPEED = 100;

// Responses

var UP = new Vector(0,1);
var DOWN = new Vector(0,-1);
var LEFT = new Vector(-1,0);
var RIGHT = new Vector(1,0);

function Markl()
{
  this.el = document.createElement('yu');
  this.el.className = "screen";

  this.arena = null;
  this.fighter = null;
  this.fighters = [];
  this.battle = null;

  this.designer = new Designer();
  this.keyboard = new Keyboard();

  this.install = function()
  {
    document.body.appendChild(this.el);
  }
  
  this.start = function()
  {
    console.log("start");

    this.keyboard.install();
    this.designer.install();

    this.designer.select_style(new Style("custom",menu_test));

    this.show(new Character_Screen());

    // this.select_fighter(new Patience("USER"));

    // this.select_arena(arenas.training);
    // this.select_opponents([new Sage("CPU1",new Style("idle",custom_style)),new Sage("CPU2",new Style("idle",custom_style)),new Sage("CPU3",new Style("idle",custom_style))]);


    // this.arena.start();

    // this.battle = new Battle();
  }

  this.show = function(screen)
  {
    this.el.innerHTML = "";
    this.el.appendChild(screen.el);
    screen.start();
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
    this.designer.update();
  }

  this.select_opponents = function(opponents)
  {
    for(id in opponents){
      this.fighters.push(opponents[id]);
    }
  }
}

window.addEventListener('dragover',function(e)
{
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

window.addEventListener('drop', function(e)
{
  e.stopPropagation();
  e.preventDefault();
  // markl.battle.start();
});