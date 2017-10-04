function Arena_Screen()
{
  Screen.call(this);
  
  this.name = "character selection";
  this.index = 3;

  this.arenas = {};

  this.arenas.training = new Arena("Training",new Size(5,5),[
    new Spawn(new Pos(0,0)),
    new Spawn(new Pos(4,4)),
    new Spawn(new Pos(4,0)),
    new Spawn(new Pos(0,4)),
    new Block(new Pos(1,1)),
    new Block(new Pos(3,3))
  ]);

  this.arenas.duel = new Arena("Training",new Size(3,5),[
    new Spawn(new Pos(1,1)),
    new Spawn(new Pos(1,4))
  ]);

  this.el.className = "arena_selection";

  this.start = function()
  {
    console.log("arena start")

    var html = "";  
  
    for(id in this.arenas){
      html += "<ln>"+id+"</ln>";
    }
    this.el.innerHTML = "<list>"+html+"</list>"
  }
}