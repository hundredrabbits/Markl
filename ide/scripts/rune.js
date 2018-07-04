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

    if(this.trigger){ html += `<yu class='fragment trigger' style='background-image:url(media/runes/fragments/${this.trigger.toLowerCase().replace(/ /g,'.')}.png)'></yu>` }
    if(this.event){ html += `<yu class='fragment event' style='background-image:url(media/runes/fragments/${this.event.toLowerCase().replace(/ /g,'.')}.png)'></yu>` }
    if(this.condition){ html += `<yu class='fragment condition' style='background-image:url(media/runes/fragments/${this.condition.toLowerCase().replace(/ /g,'.')}.png)'></yu>` }
    if(this.action){ html += `<yu class='fragment action' style='background-image:url(media/runes/fragments/${this.action.toLowerCase().replace(/ /g,'.')}.png)'></yu>` }

    this.el.innerHTML = html
  }

  this.validate = function()
  {
    this.update()
    if(!this.trigger || !this.event || !this.condition || !this.action){ return false; }

    var lang = new FightLang();

    if(lang.spec.TRIGGER.indexOf(this.trigger) < 0){
      return false;
    }
    if(lang.spec.EVENT.indexOf(this.event) < 0){
      return false;
    }
    if(lang.spec.CONDITION.indexOf(this.condition) < 0){
      return false;
    }
    if(lang.spec.ACTION.indexOf(this.action) < 0){
      return false;
    }

    return true
  }

  this.fragments = function()
  {
    var a = []

    if(this.trigger){ a.push(this.trigger); }
    if(this.event){ a.push(this.event); }
    if(this.condition){ a.push(this.condition); }
    if(this.action){ a.push(this.action); }

    return a
  }

  this.render = function()
  {
    var html = ""

    if(this.trigger){ html += `<t class='trigger'>ON ${this.trigger}</t> ` }
    if(this.event){ html += `<t class='event'>OF ${this.event}</t> ` }
    if(this.condition){ html += `<t class='condition'>AND ${this.condition}</t> ` }
    if(this.action){ html += `<t class='action'>THEN ${this.action}</t> ` }

    return html.trim()
  }

  this.name = function()
  {
    var lang = new FightLang();

    var s1 = lang.spec.TRIGGER.indexOf(this.trigger) + 2
    var s2 = lang.spec.EVENT.indexOf(this.event) + 2
    var s3 = lang.spec.CONDITION.indexOf(this.condition) + 2
    var s4 = lang.spec.ACTION.indexOf(this.action) + 2

    var vowels = ["a","e","i","o","u"]
    var cons_w = ["r","s","f","h","j","l","z","v","n","m","y"]
    var cons_s = ["t","p","d","g","b"]

    var s = ""

    s += s1 > -1 ? vowels[(s1+s2*s3+s4) % vowels.length] : "" 
    s += s2 > 1 ? vowels[(s1*s2+s3*s4) % vowels.length] + cons_w[(s1+s2*s3+s4) % cons_w.length] : ""
    s += s3 > 1 ? "'"+ vowels[(s1*s2*s3*s4) % vowels.length] + cons_w[(s1+s2+s3+s4) % cons_w.length] : ""
    s += s4 > 1 ? vowels[((s1+s2+s3*s4)) % vowels.length] + cons_s[((s1*s2*s3+s4)) % cons_s.length] : ""
    
    s = s.replace(/aa/g,"ä")
    s = s.replace(/ee/g,"ë")
    s = s.replace(/ii/g,"ï")
    s = s.replace(/oo/g,"ö")
    s = s.replace(/uu/g,"ü")
    s = s.replace(/yy/g,"ÿ")

    return s.trim().capitalize()
  }
}

function Fragment(type,name)
{
  this.type = type;
  this.name = name;
  this.depth = ["TRIGGER","EVENT","CONDITION","ACTION"].indexOf(this.type)
}

String.prototype.capitalize = function()
{
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}