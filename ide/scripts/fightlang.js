function FightLang() 
{
  this.spec = {
    TRIGGER : [
      "SIGHT",
      "COLLIDE",
      "HIT",
      "ANY"],
    EVENT : [
      "FIGHTER", 
      "BLOCKER", 
      "PROJECTILE", 
      "ANY"],
    CONDITION : [
      "DISTANCE IS 1",
      "DISTANCE IS 2",
      "DISTANCE IS 3",
      "DISTANCE IS 4",
      "TURN IS 1",
      "TURN IS 2",
      "TURN IS 3",
      "TURN IS 4",
      "HEALTH IS 1",
      "HEALTH IS 2",
      "HEALTH IS 3",
      "HEALTH IS 4",
      "CHAR IS SIN",
      "CHAR IS PEST",
      "CHAR IS PATIENCE",
      "CHAR IS LANCER",
      "CHAR IS GOAT",
      "ANY"],
    ACTION : [
      "MOVE UP",
      "MOVE RIGHT",
      "MOVE DOWN",
      "MOVE LEFT",
      "MOVE TOWARD",
      "MOVE AWAY",
      "MOVE ANY",
      "MOVE ASIDE",
      "ATTACK UP",
      "ATTACK RIGHT",
      "ATTACK DOWN",
      "ATTACK LEFT",
      "ATTACK TOWARD",
      "ATTACK AWAY",
      "ATTACK ANY",
      "DASH UP",
      "DASH RIGHT",
      "DASH DOWN",
      "DASH LEFT",
      "DASH TOWARD",
      "DASH AWAY",
      "DASH ANY",
      "FIRE UP",
      "FIRE RIGHT",
      "FIRE DOWN",
      "FIRE LEFT",
      "FIRE TOWARD",
      "FIRE AWAY",
      "FIRE ANY",
      "WAIT"
    ]
  }

  this.fragments = function()
  {
    var a = []
    for(type in this.spec){
      for(id in this.spec[type]){
        a.push(new Fragment(type,this.spec[type][id]))
      }
    }
    return a;
  }

  this.phonetic = function(rune)
  {
    var k1 = this.spec.TRIGGER.indexOf(rune.trigger)
    var k2 = this.spec.EVENT.indexOf(rune.event)

    var k_p = rune.condition ? rune.condition.split(" ") : 0
    var k3 = this.spec.CONDITION.indexOf(rune.condition)
    var k4 = rune.condition ? word_value(k_p[0]) : 0
    var k5 = rune.condition ? word_value(k_p[k_p.length-1]) : 0

    var k_p = rune.action ? rune.action.split(" ") : 0
    var k6 = this.spec.ACTION.indexOf(rune.action)
    var k7 = rune.action ? word_value(k_p[0]) : 0
    var k8 = rune.action ? word_value(k_p[k_p.length-1]) : 0

    var vowels = ["a","e","i","o","u"]
    var cons_w = ["r","s","f","h","j","l","z","v","n","m","y","'"]
    var cons_s = ["t","p","d","g","b"]

    var s = ""
    s += k1 > -1 ? vowels[k1 % vowels.length] : ''
    s += k2+k1 > -1 ? vowels[((k1*vowels.length)+k2) % vowels.length] + cons_w[((k1*vowels.length)+k2) % cons_w.length] : ''
    
    s += k3 > -1 ? vowels[k3 % vowels.length] : ''
    s += k4+k3 > -1 ? vowels[(Math.floor(k3/vowels.length)+k4) % vowels.length] : ''
    s += k5 > 0 ? cons_w[k5 % cons_w.length] : ''

    s += k6 > -1 ? vowels[k6 % vowels.length] : ''
    s += k7+k6 > -1 ? vowels[(Math.floor(k6/vowels.length)+k7) % vowels.length] : ''
    s += k8 > -1 ? cons_w[k8 % cons_w.length] : ''

    s = s.replace(/aa/g,"ä")
    s = s.replace(/ee/g,"ë")
    s = s.replace(/ii/g,"ï")
    s = s.replace(/oo/g,"ö")
    s = s.replace(/uu/g,"ü")
    s = s.replace(/yy/g,"ÿ")

    return s.trim().capitalize()
  }

  function word_value(word)
  {
    var chars = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var val = 0
    for(id in word){
      val += chars.indexOf(word.charAt(id).toLowerCase())
    }
    return val
  }
}