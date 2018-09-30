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
    const origin = pos;
    const sights = [];
    
    for (let x = 1; x < 10; x++){
      const events = events_at({x:pos.x+x,y:pos.y},stage);
      for(const id in events){ 
        sights.push(events[id]); 
      }
    }
    for (let x = -1; x > -10; x--){
      const events = events_at({x:pos.x+x,y:pos.y},stage);
      for(const id in events){ 
        sights.push(events[id]); 
      }
    }
    for (let y = 1; y < 10; y++){
      const events = events_at({x:pos.x,y:pos.y+y},stage);
      for(const id in events){ 
        sights.push(events[id]); 
      }
    }
    for (let y = -1; y > -10; y--){
      const events = events_at({x:pos.x,y:pos.y+y},stage);
      for(const id in events){ 
        sights.push(events[id]); 
      }
    }
    return sights;
  }

  function format_sights(sights)
  {
    // TODO
    const h = {}
    for(const id in sights){
      const sight = sights[id]
      let sight_type = sight.type.toUpperCase();
      let sight_pos = new Pos(sight.pos.x,sight.pos.y);
      let sight_distance = sight_pos.distance_from(this.host.pos);
      h["SIGHT"][sight_type]["ANY"] = sight;
      h["SIGHT"][sight_type][`DISTANCE OF ${sight_distance}`] = sight;
      if(sight.character){
        let sight_character = sight.character.toUpperCase().trim();
        h["SIGHT"][sight_type][`CHARACTER OF ${sight_character}`] = sight;
      }
    }
  }

  this.triggers = function(host)
  {
    console.log(`Find triggers for ${host}`);
    const sights = find_sights(host.pos,this)
    return format_sights(sights);
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