function Arena_Screen()
{
  Screen.call(this);
  
  this.name = "arena selection";
  this.index = 0;

  this.arenas = [];

  this.arenas.push(new Arena("Training",new Size(5,5),[
    new Spawn(new Pos(0,0)),
    new Spawn(new Pos(4,4)),
    new Spawn(new Pos(4,0)),
    new Spawn(new Pos(0,4)),
    new Hole(new Pos(2,2),1)
  ]));

  this.arenas.push(new Arena("Duel",new Size(3,5),[
    new Spawn(new Pos(1,1)),
    new Spawn(new Pos(1,4))
  ]));

  this.arenas.push(new Arena("Temple",new Size(3,5),[
    new Spawn(new Pos(1,1)),
    new Spawn(new Pos(1,4))
  ]));

  this.el.className = "arena_selection";

  this.start = function()
  {
    console.info("ARENA","start")

    if(markl.arena){
      this.leave();
      return;
    }
    this.move_to(0);
    this.next();
  }

  this.act = function(reaction)
  {
    if(reaction.actions[0].name == "SELECT"){
      this.select_arena(reaction.target);
    }    
  }

  this.select_arena = function(name)
  {
    for(id in this.arenas){
      if(this.arenas[id].name.toUpperCase() == name.toUpperCase()){
        markl.select_arena(this.arenas[id]);
      }
    }
    markl.designer.update();
  }

  this.next = function()
  {
    var s = this;
    this.index += 1;
    this.index = this.index % 3;

    this.move_to(this.index);

    var triggers = this.find_triggers();
    markl.designer.run(triggers);

    if(markl.arena){
      this.leave();
      return;
    }

    setTimeout(function(){ s.next(); }, ACT_SPEED * 8);
  }

  this.find_triggers = function()
  {
    var names = [];

    for(id in this.arenas){
      names.push(this.arenas[id].name.toUpperCase());
    }

    var name_is = "NAME IS "+names[this.index];
    var triggers = {"MENU":{"ARENA":{}}};
    triggers["MENU"]["ARENA"][name_is] = names[this.index];

    return triggers;
  }

  this.move_to = function(index)
  {
    var html = "";  

    for(id in this.arenas){
      html += "<ln class='"+(this.index == id ? "highlight" : "")+"'>"+this.arenas[id].name+"</ln>";
    }
    this.el.innerHTML = "<list>"+html+"</list>"
  }

  this.leave = function()
  {
    console.log("LEAVE")
    markl.show(new Battle_Screen());
  }
}