function Rune(characters = [])
{
  this.el = document.createElement('rune');
  this.el.className = "rune"
  this.characters = characters;
  
  this.trigger = null;
  this.event = null;
  this.condition = null;
  this.action = null;

  this.build = function(fragment)
  {
    this.characters[fragment.depth] = fragment.name;
    this.update();
  }

  this.clear = function()
  {
    this.characters = []
    this.update()
  }

  this.update = function()
  {
    this.trigger = this.characters[0] ? this.characters[0].toUpperCase() : null
    this.event = this.characters[1] ? this.characters[1].toUpperCase() : null
    this.condition = this.characters[2] ? this.characters[2].toUpperCase() : null
    this.action = this.characters[3] ? this.characters[3].toUpperCase() : null

    this.draw()
  }

  this.draw = function()
  { 
    var html = ""

    if(this.trigger){ html += "<yu class='fragment trigger'></yu>" }
    if(this.event){ html += "<yu class='fragment event'></yu>" }
    if(this.condition){ html += "<yu class='fragment condition'></yu>" }
    if(this.action){ html += "<yu class='fragment action'></yu>" }

    this.el.innerHTML = html
  }

  this.is_complete = function()
  {
    return this.trigger && this.event && this.condition && this.action;
  }

  this.preview = function()
  {
    var html = ""

    if(this.trigger){ html += `<t class='trigger'>ON ${this.trigger}</t> ` }
    if(this.event){ html += `<t class='event'>OF ${this.event}</t> ` }
    if(this.condition){ html += `<t class='condition'>AND ${this.condition}</t> ` }
    if(this.action){ html += `<t class='action'>THEN ${this.action}</t> ` }

    return html.trim()
  }
}

function Fragment(type,name)
{
  this.type = type;
  this.name = name;
  this.depth = ["TRIGGER","EVENT","CONDITION","ACTION"].indexOf(this.type)
}

