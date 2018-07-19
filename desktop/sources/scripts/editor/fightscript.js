function FightScript(style = {})
{
  this.style = style;

  this.add = function(rune)
  {
    if(!this.style[rune.trigger]){ this.style[rune.trigger] = {}}
    if(!this.style[rune.trigger][rune.event]){ this.style[rune.trigger][rune.event] = {}}
    if(!this.style[rune.trigger][rune.event][rune.condition]){ this.style[rune.trigger][rune.event][rune.condition] = []}
    if(this.style[rune.trigger][rune.event][rune.condition].indexOf(rune.action) > -1){ console.warn("Rune is already present"); return; }
    this.style[rune.trigger][rune.event][rune.condition].push(rune.action)
  }

  this.remove = function(rune)
  {
    var index = this.style[rune.trigger][rune.event][rune.condition].indexOf(rune.action);

    if(index < 0){ console.warn("Cannot find rune",rune.action); return; }

    this.style[rune.trigger][rune.event][rune.condition].splice(index,1)
  }

  this.move = function(target,direction)
  {
    var runes = this.runes()
    var position = -1

    // // Find rune ID
    for(var id in runes){
      var rune = runes[id]
      if(rune.name == target.name){ position = id }
    }
    var destination = parseInt(position) + parseInt(direction)

    // TODO: Clean that mess, what the fuck!?
    console.log(`Move ${position} at ${destination}`,target)
    this.remove(target);

    this.style = this.copy().style

    var runes = this.runes();
    runes.splice(destination, 0, target);

    var complete = new FightScript()
    for(id in runes){
      var rune = runes[id]
      complete.add(rune);
    }

    this.style = complete.style;
  }

  this.replace = function(text)
  {
    this.style = this.parse(text)
  }

  this.parse = function(text)
  {
    var style = {};
    var lines = text.toUpperCase().split("\n");
    var stash = null;
    var trigger = null;
    var event = null;
    var condition = null;
    var action = null;
    for(id in lines){
      var pad = lines[id].search(/\S|$/);
      var line = lines[id].trim();
      if(line == "" || line.substr(0,1) == "#"){ continue; }
      if(pad == 0){ trigger = line ; style[line] = {}; }
      if(pad == 2){ event = line ; style[trigger][event] = {}; }
      if(pad == 4){ condition = line ; style[trigger][event][condition] = []; }
      if(pad == 6){ action = line ; style[trigger][event][condition].push(line); }
    }
    this.style = style;
    return this;
  }

  this.runes = function()
  {
    var a = [];
    for(trigger in this.style){
      for(event in this.style[trigger]){
        for(condition in this.style[trigger][event]){
          for(id in this.style[trigger][event][condition]){
            var action = this.style[trigger][event][condition][id];
            a.push(new Rune({trigger:trigger,event:event,condition:condition,action:action}))
          }
        }
      }
    }
    return a
  }
  
  this.render = function()
  {
    var text = ""
    for(trigger in this.style){
      text += `${trigger}\n`
      for(event in this.style[trigger]){
        text += `  ${event}\n`
        for(condition in this.style[trigger][event]){
          text += `    ${condition}\n`
          for(id in this.style[trigger][event][condition]){
            text += `      ${this.style[trigger][event][condition][id]}\n`
          }
        }
      }
    }
    return text
  }

  this.toString = function()
  {
    var text = ""
    for(trigger in this.style){
      text += trigger+' '
      for(event in this.style[trigger]){
        text += event+' '
        for(condition in this.style[trigger][event]){
          text += condition+' '
          for(id in this.style[trigger][event][condition]){
            text += this.style[trigger][event][condition][id]
          }
        }
      }
    }
    return text.trim()
  }

  this.find = function(reaction)
  {
    var line = 1
    var text = ""
    for(trigger in this.style){
      line += 1
      for(event in this.style[trigger]){
        line += 1
        for(condition in this.style[trigger][event]){
          line += 1
          for(id in this.style[trigger][event][condition]){
            var action = this.style[trigger][event][condition][id]
            line += 1
            if(trigger == reaction.trigger && event == reaction.event && condition == reaction.condition && action == reaction.action){ return line; }
          }
        }
      }
    }
    return null
  }

  this.copy = function()
  {
    var style = JSON.parse(JSON.stringify(this.style))
    return new FightScript(style)
  }

  this.validate = function()
  {
    var runes = this.runes()
    for(id in runes){
      var rune = runes[id];
      var is_valid = rune.validate();
      if(!is_valid){ return false; }
    }
    return true;
  }
}