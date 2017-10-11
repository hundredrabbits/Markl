function Style(name,text)
{
  this.name = name;
  this.text = text;
  this.tree = parse(this.text);
  
  this.host = null;

  this.triggers = {};
  this.reaction = null;

  this.run = function(reaction,index = 0)
  {
    var action = reaction.actions[index];

    if(!window[action.name]){
      console.warn("Unknown",action.name)
      return;
    }

    this.host.score.turns += 1;

    var a = new window[action.name](this.host,action.attr,reaction.target);
    a.run();

    this.host.update();
    var s = this;
  }

  this.complete = function()
  {
    markl.screen.next();
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