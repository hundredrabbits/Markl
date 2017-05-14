function Battle()
{
  this.counter = 0;
  this.limit = 20;

  this.start = function()
  {
    this.turn();
  }

  this.turn = function()
  {
    this.counter += 1;
    if(this.counter > this.limit){ return this.end(); }

    console.info("Turn "+this.counter,"===================");

    if(markl.arena.get_players_alive().length < 2){
      return this.end();
    }
    
    this.next_player().act();
  }

  this.sort_players = function()
  {
    var order = [];
    while(order.length < markl.players.length){
      order.push(this.next_player(order).name);
    }
    return order
  }

  this.next_player = function()
  {
    var p = markl.players[0];
    // Find player with the most stamina
    for (var i = markl.players.length - 1; i >= 0; i--) {
      // if(selection.indexOf(markl.players[i].name) > -1){ continue; }
      if(!markl.players[i].is_alive()){ continue; }
      if(markl.players[i].stamina > p.stamina){ p = markl.players[i]; }
    }
    return p;
  }

  this.end = function()
  {
    console.log("<Battle>Ended");
  }
}