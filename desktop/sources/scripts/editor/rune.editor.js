function RuneEditor()
{
  this.el = document.createElement('div');
  this.el.id = "rune_editor";

  this.preview_wrapper = document.createElement('wrapper')
  this.rune_preview = document.createElement('yu')
  this.rune_preview.className = "preview"
  this.rune        = new Rune();
  this.buttons     = []

  this.el.appendChild(this.preview_wrapper)
  this.preview_wrapper.appendChild(this.rune.el)
  this.preview_wrapper.appendChild(this.rune_preview)

  var fragments = new FightLang().fragments();

  for(id in fragments){
    var button = new RuneButton(this,fragments[id])
    this.el.appendChild(button.el)
    this.buttons.push(button)
  }

  this.merge = function()
  {
    if(!this.rune.validate()){ console.warn("Invalid rune",this.rune); return; }

    console.info(`Crafting ${this.rune.name}..`)
    markl.editor.fightscript.add(this.rune.copy())
    this.clear();
    markl.editor.select("list");
  }

  this.clear = function(rune)
  {
    this.rune.clear()
    this.update()
  }

  this.update = function()
  {
    this.update_buttons();
  }

  this.update_buttons = function()
  {
    for(id in this.buttons){
      var button = this.buttons[id];
      var fragment = button.fragment;
      if(this.rune[fragment.type.toLowerCase()] == fragment.name){
        button.disable();
      }
      else{
        button.enable()
      }
    }
  }

  this.add_fragment = function(fragment)
  {
    console.log("Add fragment")
    this.rune.build(fragment);
    markl.editor.update();
  }

  this.status = function(history)
  {
    return ""
  }
}

function RuneButton(host,fragment)
{
  this.host = host;
  this.fragment = fragment;

  this.is_enabled = true;

  this.el = document.createElement('button');
  this.el.className = "rune "+fragment.type.toLowerCase();
  this.el.style.backgroundImage = `url(media/runes/fragments/${fragment.name.toLowerCase().replace(/ /g,'.')}.png)`;
  this.el.onclick = () => { this.construct(); }

  this.construct = function()
  {
    if(!this.is_enabled){ return; }

    this.host.add_fragment(this.fragment)
  }

  this.enable = function()
  {
    this.is_enabled = true;
    this.update();
  }

  this.disable = function()
  {
    this.is_enabled = false;
    this.update();
  }

  this.update = function()
  {
    this.el.className = `rune ${fragment.type.toLowerCase()} ${!this.is_enabled ? 'disabled' : ''}`
  }
}