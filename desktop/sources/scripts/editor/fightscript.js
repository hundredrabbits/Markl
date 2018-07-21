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

  this.insert = function(target,index)
  {
    console.log(`Insert ${target.name} at ${index}`);

    var runes = this.runes();
    runes.splice(index, 0, target);

    var temp = new FightScript()
    for(id in runes){
      var rune = runes[id]
      temp.add(rune);
    }
    this.parse(temp.render())
    this.refresh();
  }

  this.remove = function(target)
  {
    var runes = this.runes()

    var temp = new FightScript()
    for(id in runes){
      var rune = runes[id]
      if(target.name == rune.name){ console.log(`Removed ${target.name} at ${id}.`); continue; }
      temp.add(rune);
    }
    this.parse(temp.render())
    this.refresh();
  }

  this.move = function(target,direction)
  {
    var position = this.indexOf(target)
    var index = parseInt(position) + parseInt(direction)

    console.log(`Move ${target.name}[@${position}] toward ${direction} at ${index}`)

    this.remove(target);
    this.insert(target,index)
  }

  this.replace = function(text)
  {
    this.style = this.parse(text)
  }

  this.refresh = function()
  {
    this.style = this.copy().style
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

  this.find = function(reaction,player)
  {
    if(!player){ return null; }
    
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
            line += player.tp % this.style[trigger][event][condition].length
            if(trigger == reaction.trigger && event == reaction.event && condition == reaction.condition && action == reaction.action){ return line; }
          }
        }
      }
    }
    return null
  }

  this.indexOf = function(target)
  {
    var runes = this.runes();
    for(var id in runes){
      var rune = runes[id]
      if(rune.name == target.name){ return parseInt(id); }
    }
    return -1
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