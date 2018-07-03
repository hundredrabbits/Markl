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
    console.warn("TODO")
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
    return style;
  }

  this.runes = function()
  {
    var a = [];
    for(trigger in this.style){
      for(event in this.style[trigger]){
        for(condition in this.style[trigger][event]){
          for(id in this.style[trigger][event][condition]){
            var action = this.style[trigger][event][condition][id];
            a.push(new Rune([trigger,event,condition,action]))
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
}