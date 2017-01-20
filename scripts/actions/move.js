function Move(pos)
{
  Action.call(this);
  
  this.pos = pos;

  this.play = function()
  {
    this.host.stamina -= 1;
    this.host.pos.add(this.pos);
    $(this.host.element).animate({ top:this.host.pos.html().y }, 100, function(){
      markl.battle.turn();
    });
  }
}