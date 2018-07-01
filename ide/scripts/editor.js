function Editor()
{
  this.el = document.createElement('yu');
  this.el.id = "editor";

  this.preview = document.createElement('pre');
  this.preview.id = "preview";

  this.collection = document.createElement('yu');
  this.collection.id = "collection";

  this.fightscript = new FightScript();

  this.runes = []

  // Construction
  this.rune = new Rune();
  this.lang = new FightLang();

  this.buttons = []

  for(type in this.lang.spec){
    for(id in this.lang.spec[type]){
      this.buttons.push(new Fragment(this,type,this.lang.spec[type][id]))
    }
  }

  this.save_button = document.createElement('button')
  this.save_button.innerHTML = "SAVE"

  this.clear_button = document.createElement('button')
  this.clear_button.innerHTML = "CLEAR"

  this.save_button.onclick = () => {
    this.save_rune(this.rune)
  }
  this.clear_button.onclick = () => {
    this.clear_rune()
  }

  this.install = function(host)
  {
    this.el.appendChild(this.preview);
    this.el.appendChild(this.collection);
    this.el.appendChild(this.rune.el);
    host.appendChild(this.el);

    for(id in this.buttons){
      var button = this.buttons[id]
      this.el.appendChild(button.el)
    }
    this.el.appendChild(this.save_button)
    this.el.appendChild(this.clear_button)
  }

  this.start = function()
  {

  }

  this.save_rune = function(rune)
  {
    if(!this.rune.is_complete()){
      console.warn("Incomplete rune",rune)
      return;
    }
    
    this.fightscript.add(rune)
    this.clear_rune();
  }

  this.clear_rune = function(rune)
  {
    this.rune.clear()
    this.update()
  }

  this.add_fragment = function(fragment)
  {
    this.rune.build(fragment.depth,fragment.text);
    this.update();
  }

  this.update = function()
  {
    var html = this.fightscript.render();

    this.preview.innerHTML = html;

    // Update collection
    html = ""
    var runes = this.fightscript.runes()
    this.collection.innerHTML = ""
    for(id in runes){
      var rune = runes[id]
      rune.update()
      this.collection.innerHTML += rune.el.outerHTML;
    }
  }
}

