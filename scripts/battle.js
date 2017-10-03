function Battle()
{
  this.counter = 0;
  this.limit = 500;

  this.start = function()
  {
    this.turn();
  }

  this.stop = function()
  {
    console.log("STOP")
  }

  this.turn = function()
  {
    this.counter += 1;
    if(this.counter > this.limit){ return this.end(); }

    var next_fighter = this.next_fighter();

    if(!next_fighter || markl.arena.get_fighters_alive().length < 2){
      return this.end();
    }

    if(next_fighter.name == "Trainer"){
      console.warn("TURN "+this.counter+" : "+next_fighter.name+" "+next_fighter.hp+"HP");
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
    var p = null;
    for (var i = markl.fighters.length - 1; i >= 0; i--) {
      if(markl.fighters[i].is_alive() == false){ continue; }
      if(!p || markl.fighters[i].stamina > p.stamina){ p = markl.fighters[i]; }
    }
    if(p.hp == 0){ return; }
    return p;
  }

  this.end = function()
  {
    this.counter = 0;
    console.log("<Battle>Ended");
    markl.interface.update();
  }
}