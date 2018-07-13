function ListEditor()
{
  this.el = document.createElement('div');
  this.el.id = "list_editor";

  this.update = function(state)
  {
    var runes = markl.editor.fightscript.runes();

    this.el.innerHTML = ""
    
    for(var id in runes){
      var rune = runes[id]
      rune.update()
      this.el.innerHTML += `
      <ln class='${state && rune.name == new Rune(state.reaction).name ? 'selected' : ''}'>
        ${rune.el.outerHTML}
        <t class='name'>
          ${rune.name}
          <t class='option' onclick='markl.editor.list_editor.remove(\"${rune.name}\")'>remove</t>
          ${id > 0 ? "<t class='option'>up</t>" : ''}
          ${id < runes.length-1 ? "<t class='option'>down</t>" : ''}
        </t>
        <t class='value'>${rune.render()}</t>
      </ln>`;
    }
  }

  this.remove = function(target_name)
  {
    var runes = markl.editor.fightscript.runes();
    var target = null
    this.el.innerHTML = ""
    
    for(var id in runes){
      var rune = runes[id]
      if(rune.name != target_name){ continue; }
      target = rune;
    }
    if(target){
      markl.editor.fightscript.remove(target);
      this.update();
    }
    else{
      console.warn("Cannot find rune",target)  
    }
  }

  this.status = function(state)
  {
    if(state.player.id != 0){ return ""; }

    return `${new Rune(state.reaction).name}`
  }
}