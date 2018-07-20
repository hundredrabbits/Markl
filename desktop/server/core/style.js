var Pos = require('./units/pos.js')

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
    var triggers = this.find_triggers();
    return this.react(triggers);
  }

  this.find_triggers = function()
  {
    var h = {"SIGHT":{"FIGHTER":{},"BLOCKER":{},"MISSILE":{}},"ANY":{"ANY":{"ANY":{}}}};

    var sights = this.find_sights();

    for(id in sights){
      var sight = sights[id];
      if(!sight){ continue; }
      var sight_type = sight.type.toUpperCase();
      var sight_pos = new Pos(sight.pos.x,sight.pos.y);
      var sight_distance = sight_pos.distance_from(this.host.pos);
      console.log(this.host.name,sight.name,sight_distance)
      h["SIGHT"][sight_type]["ANY"] = sight;
      h["SIGHT"][sight_type][`DISTANCE OF ${sight_distance}`] = sight;
      if(sight.character){
        var sight_character = sight.character.toUpperCase().trim();
        h["SIGHT"][sight_type][`CHARACTER OF ${sight_character}`] = sight;
      }
    }

    return h;
  }

  this.find_sights = function()
  {
    var origin = new Pos(this.host.pos.x,this.host.pos.y);
    var sight = [];
    
    for (var x = 1; x < 10; x++){
      var events = this.events_at(origin.add(new Pos(x,0)));
      if(events.length > 0){ sight = sight.concat(events);break;  }
    }
    for (var x = -1; x > -10; x--){
      var events = this.events_at(origin.add(new Pos(x,0)));
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    for (var y = 1; y < 10; y++){
      var events = this.events_at(origin.add(new Pos(0,y)));
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    for (var y = -1; y > -10; y--){
      var events = this.events_at(origin.add(new Pos(0,y)));
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    return sight;
  }

  this.events_at = function(pos)
  {
    var e = [];
    for(id in this.state.players){
      var player = this.state.players[id];
      var player_pos = new Pos(player.pos.x,player.pos.y);
      if(player.hp > 0 && player_pos.is_equal(pos)){
        e.push(player)
      }
    }
    return e;
  }

  this.react = function(triggers)
  {
    for(trigger_id in this.tree){
      var trigger = this.tree[trigger_id];
      for(event_id in trigger.events){
        var event = trigger.events[event_id];
        for(condition_id in event.conditions){
          var condition = event.conditions[condition_id];
          var r = this.make_reaction(triggers,trigger.name,event.name,condition.name);
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
    var a = [];
    var lines = text.toUpperCase().split("\n");
    var stash = null;
    var trigger = null;
    var event = null;
    var condition = null;
    var action = null;
    for(id in lines){
      var line = lines[id];
      var pad = pad_length(line);
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
    var i = 0;
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
