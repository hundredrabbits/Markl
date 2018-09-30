'use strict';

let Pos = require('./units/pos.js')
let Sight = require('./sight.js')

// Trigger
// Event
// Condition
// Action

function Style(host)
{
  this.host = host;
  this.tree = parse(host.style);
  this.state = null;

  this.run = function(state)
  {
    this.state = state;
    let triggers = this.find_triggers();
    return this.react(triggers);
  }

  this.find_triggers = function()
  {
    let h = {"SIGHT":{"FIGHTER":{},"BLOCKER":{},"MISSILE":{}},"ANY":{"ANY":{"ANY":{}}}};

    let sights = this.find_sights();

    for(let id in sights){
      let sight = sights[id];
      if(!sight){ continue; }
      let sight_type = sight.type.toUpperCase();
      let sight_pos = new Pos(sight.pos.x,sight.pos.y);
      let sight_distance = sight_pos.distance_from(this.host.pos);
      h["SIGHT"][sight_type]["ANY"] = sight;
      h["SIGHT"][sight_type][`DISTANCE OF ${sight_distance}`] = sight;
      if(sight.fighter){
        let sight_fighter = sight.fighter.toUpperCase().trim();
        h["SIGHT"][sight_type][`CHARACTER OF ${sight_fighter}`] = sight;
      }
    }
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

  this.react = function(triggers)
  {
    for(let trigger_id in this.tree){
      let trigger = this.tree[trigger_id];
      for(let event_id in trigger.events){
        let event = trigger.events[event_id];
        for(let condition_id in event.conditions){
          let condition = event.conditions[condition_id];
          let r = this.make_reaction(triggers,trigger.name,event.name,condition.name);
          if(r){
            r.actions = condition.actions;
            r.action = condition.actions[0]
            return r;
          }
        }
      }
    }
    // Throw default case
    return {trigger: "ANY", event: "ANY", condition: "ANY", actions:["WAIT"]};
  }

  this.make_reaction = function(triggers, trigger = null,event = null,condition = null)
  {
    if(!triggers[trigger]){ return null; }
    if(!triggers[trigger][event]){ return null; }
    if(!triggers[trigger][event][condition]){ return null; }
    return {trigger:trigger,event:event,condition:condition,target:triggers[trigger][event][condition]};
  }

  function parse(text = "")
  {
    let a = [];
    let lines = text.toUpperCase().split("\n");
    let stash = null;
    let trigger = null;
    let event = null;
    let condition = null;
    let action = null;
    for(let id in lines){
      let line = lines[id];
      let pad = pad_length(line);
      if(line.trim() == "" || line.substr(0,1) == "#"){ continue; }
      if(pad == 0){
        if(trigger){ a.push(trigger); }
        trigger = {name:line,events:[]};
      }
      if(pad == 2){
        event = {name:line.trim(),conditions:[]};
        trigger.events.push(event);
      }
      if(pad == 4){
        condition = {name:line.trim(),actions:[]};
        event.conditions.push(condition);
      }
      if(pad == 6){
        condition.actions.push(line.trim());
      }
    }
    if(trigger){ a.push(trigger); }
    return a;
  }

  function pad_length(str)
  {
    let i = 0;
    while(i < str.length){
      if(str.substr(i,1) != " "){
        return i;
      }
      i += 1;
    }
    return i;
  }
}

module.exports = Style;
