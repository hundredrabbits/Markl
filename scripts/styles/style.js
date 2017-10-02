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
    this.reaction = this.find_reaction();
    this.run(this.reaction);
  }

  this.run = function(reaction,index = 0)
  {
    console.log(reaction)
    var action = reaction.actions[index];
    var action_name = action.indexOf(" ") > -1 ? action.split(" ")[0] : action;
    var action_attr = action.indexOf(" ") > -1 ? action.split(" ")[1] : null;

    var a = new window[action_name](this.host,action_attr,reaction.target);
    a.run();
  }

  this.find_triggers = function()
  {
    var h = {"SIGHT":{}};

    var sights = this.host.find_sights();

    for(id in sights){
      var sight = sights[id];
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
    return {actions:["WAIT"]};
  }

  this.make_reaction = function(trigger = null,event = null,condition = null)
  {
    if(!this.triggers[trigger]){ return null; }
    if(!this.triggers[trigger][event]){ return null; }
    if(!this.triggers[trigger][event][condition]){ return null; }
    return {trigger:trigger,event:event,condition:condition,target:this.triggers[trigger][event][condition]};
  }

  this.render = function(action = new WAIT())
  {
    this.host.el.className = "fighter active";
    var s = this;

    var log = action.play(this.host);
    this.host.update();

    setTimeout(function(){ s.complete(); }, ACT_SPEED);
  }

  this.complete = function()
  {
    console.log("complete")
    this.host.el.className = "fighter idle";
    markl.battle.turn();
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