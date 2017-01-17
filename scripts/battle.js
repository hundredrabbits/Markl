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
    if(markle.arena.get_players_alive().length < 2){
      return this.end();
    }

    // Run
    for (var i = markle.players.length - 1; i >= 0; i--) {
      markle.players[i].act();
    }

    this.turn_id += 1;
    setTimeout(function(){ markle.battle.turn(); }, 1000);
  }

  this.end = function()
  {
    console.log("<Battle>Ended");
  }
}