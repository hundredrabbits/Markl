function MOVE(vector)
{
  Action.call(this);
  
  this.vector = vector;

  this.play = function()
  {
    var target_pos = new Pos(this.host.pos.x,this.host.pos.y).add(this.vector);
    var destination_tile = markl.arena.collider_at(target_pos);

    if(target_pos.x < 0 || target_pos.x >= markl.arena.size.width || target_pos.y < 0 || target_pos.y >= markl.arena.size.height){
      var action = this.host.style.on_collision(new Wall(target_pos));
      this.host.style.render(action);
    }
    else if(destination_tile && destination_tile.is_collider){
      this.host.style.render(this.host.style.on_collision(destination_tile));
    }
    else{
      this.host.pos.update(target_pos);
      $(this.host.element).animate({ top:target_pos.html().y, left:target_pos.html().x }, 100, function(){
        markl.battle.turn();
      });
    }
    
  }
}