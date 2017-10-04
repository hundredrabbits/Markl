function Style(name,text)
{
  this.name = name;
  this.text = text;
  this.tree = parse(this.text);
  
  this.host = null;

  this.triggers = {};
  this.reaction = null;

  this.act = function()
  {
    this.host.stamina -= 1;
    this.host.el.className = "fighter acting";

    this.triggers = this.find_triggers();
    this.run(this.find_reaction());
  }

  this.run = function(reaction,index = 0)
  {
    var action = reaction.actions[index];

    if(this.host.name == markl.fighter.name){ markl.designer.highlight(action.line,reaction.target); }

    var a = new window[action.name](this.host,action.attr,reaction.target);
    a.run();

    this.host.el.className = "fighter active";
    this.host.update();
    var s = this;

    setTimeout(function(){ s.complete(); }, ACT_SPEED);
  }

  this.complete = function()
  {
    console.log("complete")
    this.host.el.className = "fighter idle";
    // markl.battle.turn();
  }

  this.find_triggers = function()
  {
    var h = {"SIGHT":{},"DEFAULT":{"DEFAULT":{"DEFAULT":{}}}};

    var sights = markl.arena.events_visible_from(this.host.pos);

    for(id in sights){
      var sight = sights[id];
      if(!sight.is_visible){ continue; }
      var sight_type = sight.type.toUpperCase();
      var sight_distance = sight.pos.distance_from(this.host.pos);
      if(!h["SIGHT"][sight_type]){
        h["SIGHT"][sight_type] = {};
      }
      h["SIGHT"][sight_type]["DEFAULT"] = sight;
      h["SIGHT"][sight_type]["DISTANCE IS "+sight_distance] = sight;
    }
    return h;
  }

  this.find_reaction = function()
  {
    for(trigger_id in this.tree){
      var trigger = this.tree[trigger_id];
      for(event_id in trigger.events){
        var event = trigger.events[event_id];
        for(condition_id in event.conditions){
          var condition = event.conditions[condition_id];
          var r = this.make_reaction(trigger.name,event.name,condition.name);
          if(r){
            r.actions = condition.actions;
            return r;
          }
        }
      }
    }
    console.warn("Empty")
    return {actions:[{name:"WAIT"}]};
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
            return r;
          }
        }
      }
    }
    return null;
  }

  this.make_reaction = function(triggers, trigger = null,event = null,condition = null)
  {
    if(!triggers[trigger]){ return null; }
    if(!triggers[trigger][event]){ return null; }
    if(!triggers[trigger][event][condition]){ return null; }
    return {trigger:trigger,event:event,condition:condition,target:triggers[trigger][event][condition]};
  }

  function parse(text)
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
      if(line.trim() == "" || line.substr(0,2) == "--"){ continue; }
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
        var action_obj = {name:line.trim().indexOf(" ") > -1 ? line.trim().split(" ")[0] : line.trim(), attr:line.trim().indexOf(" ") > -1 ? line.trim().split(" ")[1] : null, line:id};
        condition.actions.push(action_obj);
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