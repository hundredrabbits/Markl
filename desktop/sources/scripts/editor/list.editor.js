function ListEditor()
{
  this.el = document.createElement('div');
  this.el.id = "list_editor";

  this.update = function()
  {
    var runes = markl.editor.fightscript.runes();
    
    for(id in runes){
      var rune = runes[id]
      rune.update()
      this.el.innerHTML += `<ln>${rune.el.outerHTML}<t class='name'>${rune.name}</t><t class='value'>${rune.render()}</t></ln>`;
    }
  }
}