function Arena_Screen()
{
  Screen.call(this);
  
  this.name = "arena selection";
  this.index = 0;

  this.el.className = "arena_selection";

  this.start = function()
  {
    console.info("ARENA","start")

    if(markl.arena){
      this.leave();
      return;
    }

    var html = "";  

    for(id in campaign.stages){
      html += "<ln>"+campaign.stages[id]+"</ln>";
    }
    this.el.innerHTML = "<list>"+html+"</list>"

    var s = this;

    setTimeout(function(){ s.select_arena(); }, ACT_SPEED * 12);
  }

  this.select_arena = function()
  {
    for(id in campaign.stages){
      if(campaign.stages[id].is_complete == true){ continue; }
      markl.select_arena(campaign.stages[id].arena);
      markl.select_opponents(campaign.stages[id].fighters);
      this.leave();
      return;
    }
    markl.designer.update();
  }

  this.leave = function()
  {
    console.log("LEAVE")
    markl.show(new Battle_Screen());
  }
}