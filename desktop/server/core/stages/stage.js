'use strict';

function Stage()
{
  this.bounds = {x:4,y:4};
  this.fighters = [];

  function events_at(pos,stage)
  {
    const e = [];
    for(const id in stage.fighters){
      const fighter = stage.fighters[id];
      if(!fighter.is_visible){ continue; }
      if(fighter.pos.x != pos.x || fighter.pos.y != pos.y){ continue; }
      e.push(fighter)
    }
    return e;
  }

  function find_sights(pos,stage)
  {
    let origin = pos;
    let sights = [];
    
    for (let x = 1; x < 10; x++){
      let events = events_at({x:pos.x+x,y:pos.y},stage);
      if(events.length > 0){ sights = sights.concat(events);break;  }
    }
    for (let x = -1; x > -10; x--){
      let events = events_at({x:pos.x+x,y:pos.y},stage);
      if(events.length > 0){ sights = sights.concat(events); break;  }
    }
    for (let y = 1; y < 10; y++){
      let events = events_at({x:pos.x,y:pos.y+y},stage);
      if(events.length > 0){ sights = sights.concat(events); break;  }
    }
    for (let y = -1; y > -10; y--){
      let events = events_at({x:pos.x,y:pos.y+y},stage);
      if(events.length > 0){ sights = sights.concat(events); break;  }
    }
    return sights;
  }

  this.triggers = function(host)
  {
    console.log(`Find triggers for ${host}`);
    // TODO move the Style() triggers to stage

    let h = {}
    // let h = {"SIGHT":{"FIGHTER":{},"BLOCKER":{},"MISSILE":{}},"ANY":{"ANY":{"ANY":{}}}};

    console.log(find_sights(host.pos,this))
    // let sights = this.find_sights();

    // for(let id in sights){
    //   let sight = sights[id];
    //   if(!sight){ continue; }
    //   let sight_type = sight.type.toUpperCase();
    //   let sight_pos = new Pos(sight.pos.x,sight.pos.y);
    //   let sight_distance = sight_pos.distance_from(this.host.pos);
    //   h["SIGHT"][sight_type]["ANY"] = sight;
    //   h["SIGHT"][sight_type][`DISTANCE OF ${sight_distance}`] = sight;
    //   if(sight.character){
    //     let sight_character = sight.character.toUpperCase().trim();
    //     h["SIGHT"][sight_type][`CHARACTER OF ${sight_character}`] = sight;
    //   }
    // }
    return h;
  }

  this.find_sights = function()
  {
    let origin = new Pos(this.host.pos.x,this.host.pos.y);
    let sight = [];
    
    for (let x = 1; x < 10; x++){
      let events = this.events_at(origin.add(new Pos(x,0)));
      if(events.length > 0){ sight = sight.concat(events);break;  }
    }
    for (let x = -1; x > -10; x--){
      let events = this.events_at(origin.add(new Pos(x,0)));
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    for (let y = 1; y < 10; y++){
      let events = this.events_at(origin.add(new Pos(0,y)));
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    for (let y = -1; y > -10; y--){
      let events = this.events_at(origin.add(new Pos(0,y)));
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    return sight;
  }

  this.events_at = function(pos)
  {
    let e = [];
    for(let id in this.state.players){
      let player = this.state.players[id];
      let player_pos = new Pos(player.pos.x,player.pos.y);
      if(player.hp > 0 && player_pos.is_equal(pos)){
        e.push(new Sight(player).make())
      }
    }
    return e;
  }

  this.serialize = function()
  {
    const fighters = [];
    for(const id in this.fighters){
      const fighter = this.fighters[id];
      fighters.push({
        id:fighter.id,
        name:fighter.name,
        pos:{x:fighter.pos.x,y:fighter.pos.y},
        status:fighter.status,
        hp: fighter.hp,
        sp: fighter.sp,
        tp: fighter.tp,
        score: fighter.score
      })
    }
    return {fighters:fighters};
  }
}

module.exports = Stage