function Editor()
{
  this.el = document.createElement('yu');
  this.el.id = "editor";
  this.el.className = "home"
  this.codeview = document.createElement('pre');
  this.codeview.id = "codeview";
  this.runeview = document.createElement('yu');
  this.runeview.id = "runeview";
  this.collection = document.createElement('yu');
  this.collection.id = "collection";

  // Tabs
  this.tabs = document.createElement('yu');
  this.tabs.id = "tabs";
  this.home_tab = document.createElement('a')
  this.home_tab.className = "tab home"
  this.home_tab.innerHTML = "home"
  this.code_tab = document.createElement('a')
  this.code_tab.className = "tab code"
  this.code_tab.innerHTML = "code"
  this.rune_tab = document.createElement('a')
  this.rune_tab.className = "tab rune"
  this.rune_tab.innerHTML = "rune"
  this.hide_tab = document.createElement('a')
  this.hide_tab.className = "tab hide"
  this.hide_tab.innerHTML = "hide"

  this.home_tab.onclick = () => { this.el.className = "home" }
  this.code_tab.onclick = () => { this.el.className = "code" }
  this.rune_tab.onclick = () => { this.el.className = "rune" }
  this.hide_tab.onclick = () => { this.el.className = "hide" }

  // Runeview
  this.rune_preview = document.createElement('yu')
  this.rune_preview.innerHTML = ">"
  this.rune_preview.className = "preview"

  this.save_button = document.createElement('button')
  this.save_button.innerHTML = "add"
  this.save_button.className = "save"
  this.clear_button = document.createElement('button')
  this.clear_button.innerHTML = "clear"
  this.clear_button.className = "clear"

  this.lang        = new FightLang();
  this.fightscript = new FightScript();
  this.rune        = new Rune();

  this.save_button.onclick = () => { this.add_rune(this.rune); }
  this.clear_button.onclick = () => { this.clear_rune(); }

  this.install = function(host)
  {
    this.el.appendChild(this.tabs)
    this.tabs.appendChild(this.home_tab)
    this.tabs.appendChild(this.rune_tab)
    this.tabs.appendChild(this.code_tab)
    this.tabs.appendChild(this.hide_tab)
    this.el.appendChild(this.collection)


    this.el.appendChild(this.codeview)
    this.el.appendChild(this.runeview)
    this.runeview.appendChild(this.rune.el)
    this.runeview.appendChild(this.rune_preview)

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
    this.el.className = "home"
  }

  this.clear_rune = function(rune)
  {
    this.rune.clear()
    this.update()
  }

  this.update = function()
  {
    this.codeview.innerHTML = this.fightscript.render();

    this.rune_preview.innerHTML = this.rune.preview() ? this.rune.preview() : ">"

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

