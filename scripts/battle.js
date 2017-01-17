function Battle()
{
  this.turn_id = 0;

  this.start = function()
  {
    this.turn();
  }

  this.turn = function()
  {
    console.log("<Battle>Turn "+this.turn_id);

    if(this.turn_id > 10){
      return this.end();
    }

    if(markle.arena.get_players_alive().length > 1){
      setTimeout(function(){ markle.battle.turn(); }, 1000);
    }

    this.turn_id += 1;
  }

  this.end = function()
  {
    console.log("<Battle>Ended");
  }
}