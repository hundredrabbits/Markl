
var TILE_SIZE = new Size(80,80);
var ACT_SPEED = 150;

// Responses

var UP = new Vector(0,1);
var DOWN = new Vector(0,-1);
var LEFT = new Vector(-1,0);
var RIGHT = new Vector(1,0);

function Markl()
{
  this.el = document.createElement('yu');
  this.el.className = "screen";

  this.screen = null;

  this.arena = null;
  this.fighter = new Fighter("USER", new Style("Test",custom_style));
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
    this.keyboard.install();
    this.designer.install();
    
    // Comment to skip
    this.select_fighter(new Lancer("USER",new Style("TUTORIAL",custom_style)));
    this.select_arena(arenas.tutorial);

    this.show(new Character_Screen());
    this.designer.update();
  }

  this.reset = function()
  {
    console.warn("RESET")

    this.fighter = null;
    this.fighters = [];
    this.arena = null;
    this.show(new Character_Screen());
  }

  this.show = function(screen)
  {
    this.screen = screen;
    this.el.innerHTML = "";
    this.el.appendChild(screen.el);
    screen.start();
  }

  this.select_arena = function(arena)
  {
    console.log("Selecting arena:",arena.name);
    this.arena = arena;
  }

  this.select_fighter = function(fighter)
  {
    console.log("Selecting fighter:",fighter.name);
    this.fighter = fighter;
    this.fighters.push(this.fighter);
    this.fighter.setup();
    this.designer.select_fighter(fighter);
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