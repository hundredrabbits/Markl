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
  this.home_tab.innerHTML = "H"
  this.code_tab = document.createElement('a')
  this.code_tab.className = "tab code"
  this.code_tab.innerHTML = "C"
  this.rune_tab = document.createElement('a')
  this.rune_tab.className = "tab rune"
  this.rune_tab.innerHTML = "R"
  this.hide_tab = document.createElement('a')
  this.hide_tab.className = "tab hide"
  this.hide_tab.innerHTML = ">"

  this.home_tab.onclick = () => { this.el.className = "home" }
  this.code_tab.onclick = () => { this.el.className = "code" }
  this.rune_tab.onclick = () => { this.el.className = "rune" }
  this.hide_tab.onclick = () => { this.el.className += " hide" }

  // Menu

  this.menu = document.createElement('yu');
  this.menu.id = "menu";
  this.add_button = document.createElement('button')
  this.add_button.innerHTML = "add"
  this.clear_button = document.createElement('button')
  this.clear_button.innerHTML = "clear"
  this.run_button = document.createElement('button')
  this.run_button.innerHTML = "run"
  this.refresh_button = document.createElement('button')
  this.refresh_button.className = "refresh"
  this.refresh_button.innerHTML = "refresh"
  this.export_button = document.createElement('button')
  this.export_button.innerHTML = "export"

  this.add_button.onclick = () => { this.add_rune(this.rune); }
  this.clear_button.onclick = () => { this.clear_rune(); }
  this.refresh_button.onclick = () => { this.reload_code(); }

  // Runeview

  this.rune_preview = document.createElement('yu')
  this.rune_preview.innerHTML = ">"
  this.rune_preview.className = "preview"
  this.rune_name = document.createElement('yu')
  this.rune_name.innerHTML = "??"
  this.rune_name.className = "name"
  this.rune        = new Rune();

  // Codeview

  this.textbox = document.createElement('textarea')
  this.hint = document.createElement('hint')
  this.status = document.createElement('t')
  this.status.id = "status"
  this.textbox.onchange = () => { this.reload_code(); console.log("!!!"); }

  this.lang        = new FightLang();
  this.fightscript = new FightScript();

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
    this.menu.appendChild(this.add_button)
    this.menu.appendChild(this.clear_button)
    this.menu.appendChild(this.status)

    this.el.appendChild(this.homeview)
    this.el.appendChild(this.runeview)
    this.runeview.appendChild(this.rune.el)
    this.runeview.appendChild(this.rune_name)
    this.runeview.appendChild(this.rune_preview)

    // Codeview
    this.codeview.appendChild(this.hint)
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
    if(!this.rune.validate()){ console.warn("Invalid rune",rune); return; }

    var updated = this.fightscript.copy();
    updated.add(rune);

    var is_valid = updated.validate();

    if(!is_valid){ console.warn("Invalid fightscript",rune); return;}

    this.fightscript.add(rune)
    this.clear_rune();
    this.textbox.value = this.fightscript.render()
    this.el.className = "home"
  }

  this.clear_rune = function(rune)
  {
    this.rune.clear()
    this.update()
  }

  this.reload_code = function()
  {
    this.validate();
    this.update();
  }

  this.validate = function()
  {
    var code = this.textbox.value
    var parsed = new FightScript().parse(code)
    var fightscript = new FightScript(parsed)
    var is_valid = fightscript.validate();

    if(is_valid){
      this.fightscript.replace(this.textbox.value); 
      this.status.innerHTML = "Valid code!"
    }
    else{
      this.status.innerHTML = "Invalid code."
    }
  }

  this.update = function()
  {
    var code_preview = this.fightscript.render()
    var rune_preview = this.rune.render()

    this.textbox.innerHTML = code_preview ? code_preview : '' ;
    this.rune_preview.innerHTML = rune_preview ? rune_preview : ''
    this.rune_name.innerHTML = this.rune.name

    this.home_tab.style.display = this.fightscript.runes().length < 1 ? "none" : "inline-block"

    // Menu
    this.run_button.className = this.fightscript.runes().length < 1 ? "disabled run" : "run"
    this.clear_button.className = !this.rune.fragments().length > 0 ? "disabled clear" : "clear"
    this.add_button.className = !this.rune.validate() ? "disabled add" : "add"

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

