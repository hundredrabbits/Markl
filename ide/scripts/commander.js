function Commander()
{
  this.el = document.createElement('yu');
  this.el.id = "commander";

  this.preview = document.createElement('pre');
  this.preview.id = "preview";

  this.runes = []
  
  this.install = function(host)
  {
    host.appendChild(this.el);
    host.appendChild(this.preview);
  }

  this.add = function(rune)
  {
    this.runes.push(rune)
    this.update()
  }

  this.update = function()
  {
    this.el.innerHTML = `${this.runes.length} runes`;
    this.preview.innerHTML = this.render();
  }

  this.render = function()
  {
    var stash = {}

    for(id in this.runes){
      var rune = this.runes[id];
      if(!stash[rune.trigger]){stash[rune.trigger] = {}}
      if(!stash[rune.trigger][rune.event]){stash[rune.trigger][rune.event] = {}}
      if(!stash[rune.trigger][rune.event][rune.condition]){stash[rune.trigger][rune.event][rune.condition] = []}
      stash[rune.trigger][rune.event][rune.condition].push(rune.action)
    }

    var text = ""
    for(trigger in stash){
      text += `${trigger}\n`
      for(event in stash[trigger]){
        text += `  ${event}\n`
        for(condition in stash[trigger][event]){
          text += `    ${condition}\n`
          for(id in stash[trigger][event][condition]){
            text += `      ${stash[trigger][event][condition][id]}\n`
          }
        }
      }
    }
    
    return text
  }
}