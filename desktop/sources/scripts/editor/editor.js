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
  this.home_tab.innerHTML = "<icon/>"
  this.code_tab = document.createElement('a')
  this.code_tab.className = "tab code"
  this.code_tab.innerHTML = "<icon/>"
  this.rune_tab = document.createElement('a')
  this.rune_tab.className = "tab rune"
  this.rune_tab.innerHTML = "<icon/>"
  this.hide_tab = document.createElement('a')
  this.hide_tab.className = "tab hide"
  this.hide_tab.innerHTML = "<icon/>"

  this.home_tab.onclick = () => { this.el.className = "home" }
  this.code_tab.onclick = () => { this.el.className = "code" }
  this.rune_tab.onclick = () => { this.el.className = "rune" }
  this.hide_tab.onclick = () => { this.el.className += " hide" }

  // Menu

  this.menu = document.createElement('yu');
  this.menu.id = "menu";
  this.add_button = document.createElement('button')
  this.add_button.innerHTML = "<icon/>"
  this.add_button.className = "add"
  this.clear_button = document.createElement('button')
  this.clear_button.innerHTML = "<icon/>"
  this.clear_button.className = "clear"
  this.run_button = document.createElement('button')
  this.run_button.innerHTML = "<icon/>"
  this.run_button.className = "run"
  this.refresh_button = document.createElement('button')
  this.refresh_button.className = "refresh"
  this.refresh_button.innerHTML = "<icon/>"
  this.export_button = document.createElement('button')
  this.export_button.innerHTML = "<icon/>"
  this.export_button.className = "export"

  this.add_button.onclick = () => { this.merge_rune(this.rune); }
  this.run_button.onclick = () => { this.run(); }
  this.clear_button.onclick = () => { this.clear_rune(); }
  this.refresh_button.onclick = () => { this.reload_code(); }

  // Runeview

  this.preview_wrapper = document.createElement('wrapper')
  this.rune_preview = document.createElement('yu')
  this.rune_preview.className = "preview"
  this.rune        = new Rune();
  this.buttons     = []

  // Codeview

  this.textbox = document.createElement('textarea')
  this.hint = document.createElement('hint')
  this.status = document.createElement('t')
  this.status.id = "status"
  this.textbox.onchange = () => { this.reload_code(); console.log("!!!"); }

  this.lang        = new FightLang();
  this.fightscript = new FightScript();

  this.is_paused = false;
  this.is_playing = false;
  this.history = null;
  this.index = 0;
  this.timer = null;

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

    // Homeview
    this.el.appendChild(this.homeview)

    // Runeview
    this.el.appendChild(this.runeview)
    this.runeview.appendChild(this.preview_wrapper)
    this.preview_wrapper.appendChild(this.rune.el)
    this.preview_wrapper.appendChild(this.rune_preview)
    var fragments = this.lang.fragments();
    for(id in fragments){
      var button = new RuneButton(this,fragments[id])
      this.runeview.appendChild(button.el)
      this.buttons.push(button)
    }

    // Codeview
    this.el.appendChild(this.codeview)
    this.codeview.appendChild(this.hint)
    this.codeview.appendChild(this.textbox)

    // Runeview
    
    host.appendChild(this.el);

    this.update();

    // setTimeout(()=>{
    //   console.log("Ready.")

    //   var some_rune = new Rune(["SIGHT","FIGHTER","DISTANCE OF 2","MOVE TOWARD"])
    //   some_rune.update()
    //   this.fightscript.add(some_rune)
    //   this.update()

    //   console.log("Done.")
    // },2000)
  }

  this.run = function()
  {
    markl.scenario.reload()
    markl.scenario.inject_style(this.fightscript.render());

    this.history = markl.scenario.run();
    this.index = 0;

    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.start = function()
  {
    this.is_paused = false;
    this.is_playing = true;
    this.timer = setInterval(() => { this.next(); },TIMING.turn);
  }

  this.pause = function()
  {
    if(!this.history){ return; }
    if(this.is_paused){ this.resume(); return; }

    this.is_paused = true;
    clearInterval(this.timer);
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.resume = function()
  {
    this.is_paused = false;
    this.timer = setInterval(() => { this.next(); },TIMING.turn);
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.stop = function()
  {
    this.is_paused = false;
    this.is_playing = false;
    this.index = 0;
    clearInterval(this.timer);
    this.update();
    if(this.history){
      markl.renderer.update(this.history[this.index].state);  
    }
  }

  this.next = function()
  {
    if(!this.history || this.history.length < 1 ){ console.warn("No history, or at end"); this.pause(); return; }
    if(this.history[this.index].state.players[0].hp < 0){ console.warn("Player is dead"); this.pause(); return; }

    this.index += this.index <= this.history.length ? 1 : 0;
    this.update();
    markl.renderer.animator.start()
    markl.renderer.update(this.history[this.index].state);
  }

  this.prev = function()
  {
    if(!this.history || this.history.length < 1 || this.index == 0){ console.warn("No history, or at beginning"); return; }

    this.index -= this.index >= 0 ? 1 : 0;
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.add_fragment = function(fragment)
  {
    this.rune.build(fragment);
    this.update();
  }

  this.merge_rune = function(rune)
  {
    if(!this.rune.validate()){ console.warn("Invalid rune",rune); return; }

    console.info("Crafting..",rune)
    this.fightscript.add(rune.copy())
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

  this.update = function(state)
  {
    // Status
    
    if(this.history && this.history.length > 0 && this.index > 0){
      console.log(`Playing: ${this.history[this.index].player.id}`,this.history[this.index].reaction)
      this.status.innerHTML = `${this.index}/${this.history.length}`
    }
    else{
      this.status.innerHTML = "Idle."  
    }
    
    var code_preview = this.fightscript.render()
    var rune_preview = this.rune.render()

    this.textbox.innerHTML = code_preview ? code_preview : '' ;
    this.rune_preview.innerHTML = rune_preview ? rune_preview : ''

    this.home_tab.style.display = this.fightscript.runes().length < 1 ? "none" : "inline-block"

    // Menu
    this.run_button.className = this.fightscript.runes().length < 1 ? "disabled run" : "run"
    this.clear_button.className = !this.rune.fragments().length > 0 ? "disabled clear" : "clear"
    this.add_button.className = !this.rune.validate() ? "disabled add" : "add"

    // Homeview
    var runes = this.fightscript.runes()
    this.homeview.innerHTML = ""

    for(id in runes){
      var rune = runes[id]
      rune.update()
      this.homeview.innerHTML += `<ln>${rune.el.outerHTML}<t class='name'>${rune.name}</t><t class='value'>${rune.render()}</t></ln>`;
    }

    // Disable selected buttons
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

