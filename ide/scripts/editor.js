function Editor()
{
  this.el = document.createElement('yu');
  this.el.id = "editor";
  this.el.className = "rune"
  this.preview = document.createElement('pre');
  this.preview.id = "preview";
  this.runeview = document.createElement('yu');
  this.runeview.id = "runeview";
  this.collection = document.createElement('yu');
  this.collection.id = "collection";

  // Tabs
  this.tabs = document.createElement('yu');
  this.tabs.id = "tabs";
  this.code_tab = document.createElement('a')
  this.code_tab.className = "tab code"
  this.code_tab.innerHTML = "code"
  this.rune_tab = document.createElement('a')
  this.rune_tab.className = "tab rune"
  this.rune_tab.innerHTML = "rune"

  this.code_tab.onclick = () => { this.el.className = "code" }
  this.rune_tab.onclick = () => { this.el.className = "rune" }

  this.save_button = document.createElement('button')
  this.save_button.innerHTML = "+"
  this.clear_button = document.createElement('button')
  this.clear_button.innerHTML = "-"

  this.lang        = new FightLang();
  this.fightscript = new FightScript();
  this.rune        = new Rune();

  this.save_button.onclick = () => { this.add_rune(this.rune); }
  this.clear_button.onclick = () => { this.clear_rune(); }

  this.install = function(host)
  {
    this.el.appendChild(this.tabs)
    this.tabs.appendChild(this.rune_tab)
    this.el.appendChild(this.collection)

    this.tabs.appendChild(this.code_tab)

    this.el.appendChild(this.preview)
    this.el.appendChild(this.runeview)
    this.runeview.appendChild(this.rune.el)

    var fragments = this.lang.fragments();
    for(id in fragments){
      this.runeview.appendChild(new Button(this,fragments[id]).el)
    }

    this.runeview.appendChild(this.save_button)
    this.runeview.appendChild(this.clear_button)

    host.appendChild(this.el);
  }

  this.start = function()
  {

  }

  this.add_fragment = function(fragment)
  {
    this.rune.build(fragment);
    this.update();
  }

  this.add_rune = function(rune)
  {
    if(!this.rune.is_complete()){ console.warn("Incomplete rune",rune); return; }

    this.fightscript.add(rune)
    this.clear_rune();
  }

  this.clear_rune = function(rune)
  {
    this.rune.clear()
    this.update()
  }

  this.update = function()
  {
    this.preview.innerHTML = this.fightscript.render();

    var runes = this.fightscript.runes()
    this.collection.innerHTML = ""
    for(id in runes){
      var rune = runes[id]
      rune.update()
      this.collection.innerHTML += rune.el.outerHTML;
    }
  }

  function Button(host,fragment)
  {
    this.host = host;
    this.fragment = fragment;

    this.el = document.createElement('button');
    this.el.className = fragment.type.toLowerCase();
    this.el.innerHTML = `${fragment.name}`;

    this.el.onclick = () => { this.construct(); }

    this.construct = function()
    {
      this.host.add_fragment(this.fragment)
    }
  }
}

