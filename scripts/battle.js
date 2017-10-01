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

    if(markl.arena.get_fighters_alive().length < 2){
      return this.end();
    }

    var next_fighter = this.next_fighter();

    if(next_fighter.name == "Trainer"){
      console.warn("TURN "+this.counter+" : "+next_fighter.name);
    }
    else{
      console.info("TURN "+this.counter+" : "+next_fighter.name);  
    }
    
    
    this.next_fighter().act();
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
    for (var i = markl.fighters.length - 1; i >= 0; i--) {
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