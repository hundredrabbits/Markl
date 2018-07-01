function Commander()
{
  this.el = document.createElement('yu');
  this.el.id = "commander";

  this.preview = document.createElement('pre');
  this.preview.id = "preview";

  this.collection = document.createElement('yu');
  this.collection.id = "collection";

  this.fightscript = new FightScript();

  this.runes = []

  // Construction
  this.rune = new Rune();

  // UI
  this.buttons = []

  this.buttons.push(new Fragment(this,"TRIGGER","SIGHT"))
  this.buttons.push(new Fragment(this,"TRIGGER","ATTACKED"))
  this.buttons.push(new Fragment(this,"TRIGGER","ANY"))
  this.buttons.push(new Fragment(this,"EVENT","FIGHTER"))
  this.buttons.push(new Fragment(this,"EVENT","BLOCKER"))
  this.buttons.push(new Fragment(this,"EVENT","PROJECTILE"))
  this.buttons.push(new Fragment(this,"EVENT","ANY"))
  this.buttons.push(new Fragment(this,"CONDITION","DISTANCE IS 4"))
  this.buttons.push(new Fragment(this,"CONDITION","DISTANCE IS 3"))
  this.buttons.push(new Fragment(this,"CONDITION","DISTANCE IS 2"))
  this.buttons.push(new Fragment(this,"CONDITION","DISTANCE IS 1"))
  this.buttons.push(new Fragment(this,"CONDITION","TURN IS 1"))
  this.buttons.push(new Fragment(this,"CONDITION","TURN IS 2"))
  this.buttons.push(new Fragment(this,"CONDITION","TURN IS 3"))
  this.buttons.push(new Fragment(this,"CONDITION","TURN IS 4"))
  this.buttons.push(new Fragment(this,"CONDITION","HEALTH IS 1"))
  this.buttons.push(new Fragment(this,"CONDITION","HEALTH IS 2"))
  this.buttons.push(new Fragment(this,"CONDITION","HEALTH IS 3"))
  this.buttons.push(new Fragment(this,"CONDITION","HEALTH IS 4"))
  this.buttons.push(new Fragment(this,"CONDITION","ANY"))
  this.buttons.push(new Fragment(this,"ACTION","MOVE LEFT"))
  this.buttons.push(new Fragment(this,"ACTION","MOVE UP"))
  this.buttons.push(new Fragment(this,"ACTION","MOVE RIGHT"))
  this.buttons.push(new Fragment(this,"ACTION","MOVE DOWN"))
  this.buttons.push(new Fragment(this,"ACTION","MOVE TOWARD"))
  this.buttons.push(new Fragment(this,"ACTION","MOVE AWAY"))
  this.buttons.push(new Fragment(this,"ACTION","MOVE ANY"))
  this.buttons.push(new Fragment(this,"ACTION","MOVE ASIDE"))
  this.buttons.push(new Fragment(this,"ACTION","ATTACK LEFT"))
  this.buttons.push(new Fragment(this,"ACTION","ATTACK UP"))
  this.buttons.push(new Fragment(this,"ACTION","ATTACK RIGHT"))
  this.buttons.push(new Fragment(this,"ACTION","ATTACK DOWN"))
  this.buttons.push(new Fragment(this,"ACTION","ATTACK TOWARD"))
  this.buttons.push(new Fragment(this,"ACTION","ATTACK AWAY"))
  this.buttons.push(new Fragment(this,"ACTION","ATTACK ANY"))
  this.buttons.push(new Fragment(this,"ACTION","DASH LEFT"))
  this.buttons.push(new Fragment(this,"ACTION","DASH UP"))
  this.buttons.push(new Fragment(this,"ACTION","DASH RIGHT"))
  this.buttons.push(new Fragment(this,"ACTION","DASH DOWN"))
  this.buttons.push(new Fragment(this,"ACTION","DASH TOWARD"))
  this.buttons.push(new Fragment(this,"ACTION","DASH AWAY"))
  this.buttons.push(new Fragment(this,"ACTION","DASH ANY"))
  this.buttons.push(new Fragment(this,"ACTION","FIRE LEFT"))
  this.buttons.push(new Fragment(this,"ACTION","FIRE UP"))
  this.buttons.push(new Fragment(this,"ACTION","FIRE RIGHT"))
  this.buttons.push(new Fragment(this,"ACTION","FIRE DOWN"))
  this.buttons.push(new Fragment(this,"ACTION","FIRE TOWARD"))
  this.buttons.push(new Fragment(this,"ACTION","FIRE AWAY"))
  this.buttons.push(new Fragment(this,"ACTION","FIRE ANY"))

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
    host.appendChild(this.preview);
    host.appendChild(this.collection);
    host.appendChild(this.rune.el);
    host.appendChild(this.el);


    for(id in this.buttons){
      var button = this.buttons[id]
      this.el.appendChild(button.el)
    }
    this.el.appendChild(this.save_button)
    this.el.appendChild(this.clear_button)
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

