function Editor()
{
  this.el = document.createElement('yu');
  this.el.id = "editor";
  this.el.className = "rune"
  this.codeview = document.createElement('div');
  this.codeview.id = "codeview";
  this.runeview = document.createElement('div');
  this.runeview.id = "runeview";
  this.homeview = document.createElement('div');
  this.homeview.id = "homeview";

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

  // Menu

  this.menu = document.createElement('yu');
  this.menu.id = "menu";
  this.save_button = document.createElement('button')
  this.save_button.innerHTML = "add"
  this.save_button.className = "save"
  this.clear_button = document.createElement('button')
  this.clear_button.innerHTML = "clear"
  this.clear_button.className = "clear"
  this.run_button = document.createElement('button')
  this.run_button.innerHTML = "run"
  this.run_button.className = "run"
  this.refresh_button = document.createElement('button')
  this.refresh_button.innerHTML = "refresh"
  this.refresh_button.className = "refresh"
  this.export_button = document.createElement('button')
  this.export_button.innerHTML = "export"
  this.export_button.className = "export"

  this.save_button.onclick = () => { this.add_rune(this.rune); }
  this.clear_button.onclick = () => { this.clear_rune(); }

  // Runeview

  this.rune_preview = document.createElement('yu')
  this.rune_preview.innerHTML = ">"
  this.rune_preview.className = "preview"

  // Codeview

  this.textbox = document.createElement('textarea')

  this.lang        = new FightLang();
  this.fightscript = new FightScript();
  this.rune        = new Rune();


  this.install = function(host)
  {
    this.el.appendChild(this.tabs)
    this.tabs.appendChild(this.home_tab)
    this.tabs.appendChild(this.rune_tab)
    this.tabs.appendChild(this.code_tab)
    this.tabs.appendChild(this.hide_tab)

    this.el.appendChild(this.menu)
    this.menu.appendChild(this.run_button)
    this.menu.appendChild(this.refresh_button)
    this.menu.appendChild(this.export_button)
    this.menu.appendChild(this.save_button)
    this.menu.appendChild(this.clear_button)

    this.el.appendChild(this.homeview)
    this.el.appendChild(this.runeview)
    this.runeview.appendChild(this.rune.el)
    this.runeview.appendChild(this.rune_preview)

    // Codeview
    this.codeview.appendChild(this.textbox)
    this.el.appendChild(this.codeview)

    var fragments = this.lang.fragments();
    for(id in fragments){
      this.runeview.appendChild(new RuneButton(this,fragments[id]).el)
    }

    host.appendChild(this.el);
  }

  this.start = function()
  {
    this.update();
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
    var code_preview = this.fightscript.render()
    var rune_preview = this.rune.render()

    this.textbox.innerHTML = code_preview ? code_preview : '' ;
    this.rune_preview.innerHTML = rune_preview ? rune_preview : '> Begin.'

    this.home_tab.style.display = this.fightscript.runes().length < 1 ? "none" : "inline-block"
    this.code_tab.style.display = this.fightscript.runes().length < 1 ? "none" : "inline-block"

    var runes = this.fightscript.runes()
    this.homeview.innerHTML = ""
    for(id in runes){
      var rune = runes[id]
      rune.update()
      this.homeview.innerHTML += rune.el.outerHTML;
    }
  }

  function RuneButton(host,fragment)
  {
    this.host = host;
    this.fragment = fragment;

    this.el = document.createElement('button');
    this.el.className = "rune "+fragment.type.toLowerCase();
    this.el.style.backgroundImage = `url(media/runes/fragments/${fragment.name.toLowerCase().replace(/ /g,'.')}.png)`;

    this.el.onclick = () => { this.construct(); }

    this.construct = function()
    {
      this.host.add_fragment(this.fragment)
    }
  }
}

