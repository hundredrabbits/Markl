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

    console.info("TURN "+this.counter,"===================");

    if(markl.arena.get_fighters_alive().length < 2){
      return this.end();
    }
    
    // this.next_fighter().act();
  }

  this.sort_fighters = function()
  {
    var order = [];
    while(order.length < markl.fighters.length){
      order.push(this.next_fighter(order).name);
    }
    return order
  }

  this.next_fighter = function()
  {
    var p = markl.fighters[0];
    // Find fighter with the most stamina
    for (var i = markl.fighters.length - 1; i >= 0; i--) {
      // if(selection.indexOf(markl.fighters[i].name) > -1){ continue; }
      if(!markl.fighters[i].is_alive()){ continue; }
      if(markl.fighters[i].stamina > p.stamina){ p = markl.fighters[i]; }
    }
    return p;
  }

  this.end = function()
  {
    console.log("<Battle>Ended");
  }
}