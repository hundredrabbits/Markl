function Battle()
{
  this.counter = 0;
  this.limit = 30;

  this.start = function()
  {
    this.turn();
  }

  this.turn = function()
  {
    this.counter += 1;

    console.info("Turn "+this.counter,"=======================");
    if(markl.arena.get_players_alive().length < 2 || this.counter > this.limit){
      return this.end();
    }

    this.next_player().act();
  }

  this.next_player = function()
  {
    var p = null;

    // Find player with the most stamina
    for (var i = markl.players.length - 1; i >= 0; i--) {
      if(!p){ p = markl.players[i]; continue; }
      if(markl.players[i].stamina > p.stamina){ p = markl.players[i]; }
    }

    return p;
  }

  this.end = function()
  {
    console.log("<Battle>Ended");
  }
}