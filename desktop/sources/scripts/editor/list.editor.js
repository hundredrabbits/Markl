function ListEditor()
{
  this.el = document.createElement('div');
  this.el.id = "list_editor";

  this.update = function(state)
  {
    var runes = markl.editor.fightscript.runes();

    this.el.innerHTML = ""
    
    for(id in runes){
      var rune = runes[id]
      rune.update()
      this.el.innerHTML += `<ln class='${state && rune.name == new Rune(state.reaction).name ? 'selected' : ''}'>${rune.el.outerHTML}<t class='name'>${rune.name}</t><t class='value'>${rune.render()}</t></ln>`;
    }
  }

  this.status = function(state)
  {
    if(state.player.id != 0){ return ""; }

    return `${new Rune(state.reaction).name}`
  }
}