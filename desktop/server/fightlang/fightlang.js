'use strict';

let Rune = require('./fightrune')

let Move = require('../core/actions/move')
let Attack = require('../core/actions/attack')
let Dash = require('../core/actions/dash')
let Fire = require('../core/actions/fire')
let Push = require('../core/actions/push')
let Wait = require('../core/actions/wait')

function Fightlang() 
{
  this.actions = {
    move: Move,
    attack: Attack,
    dash: Dash,
    fire: Fire,
    push: Push,
    wait: Wait
  }

  this.spec = {
    TRIGGER : [
      "SIGHT",
      "COLLISION",
      "HIT",
      "ANY"],
    EVENT : [
      "FIGHTER", 
      "BLOCKER", 
      "PROJECTILE", 
      "ANY"],
    CONDITION : [
      "DISTANCE OF 1",
      "DISTANCE OF 2",
      "DISTANCE OF 3",
      "DISTANCE OF 4",
      "HEALTH OF 1",
      "HEALTH OF 2",
      "HEALTH OF 3",
      "HEALTH OF 4",
      "STAMINA OF 1",
      "STAMINA OF 2",
      "STAMINA OF 3",
      "STAMINA OF 4",
      "CHAR OF SIN",
      "CHAR OF PEST",
      "CHAR OF PATIENCE",
      "CHAR OF LANCER",
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
      "WAIT",
      "TAUNT"
    ]
  }

  this.create = function(action_name)
  {
    if(!this.actions[action_name.toLowerCase()]){ return; }

    return this.actions[action_name.toLowerCase()];
  }

  this.fragments = function()
  {
    let a = []
    for(let type in this.spec){
      for(let id in this.spec[type]){
        a.push(new Fragment(type,this.spec[type][id]))
      }
    }
    return a;
  }

  this.phonetic = function(rune)
  {
    let k1 = this.spec.TRIGGER.indexOf(rune.trigger)+1
    let k2 = this.spec.EVENT.indexOf(rune.event)+1

    let k_p1 = rune.condition ? rune.condition.split(" ") : 0
    let k3 = this.spec.CONDITION.indexOf(rune.condition)+1
    let k4 = rune.condition ? word_value(k_p1[0]) : 0
    let k5 = rune.condition ? word_value(k_p1[k_p1.length-1]) : 0

    let k_p2 = rune.action ? rune.action.split(" ") : 0
    let k6 = this.spec.ACTION.indexOf(rune.action)
    let k7 = rune.action ? word_value(k_p2[0]) : 0
    let k8 = rune.action ? word_value(k_p2[k_p2.length-1]) : 0

    let vowels = ["a","e","i","o","u"]
    let cons_w = ["r","s","f","h","j","l","z","v","n","m","y","'"]
    let cons_s = ["t","p","d","g","b"]

    let s = ""
    s += k1 > -1 ? vowels[k1 % vowels.length] : ''
    s += k2+k1 > -1 ? vowels[((k1*vowels.length)+k2) % vowels.length] + cons_w[((k1*vowels.length)+k2) % cons_w.length] : ''
    
    s += k3 > 0 ? vowels[k3 % vowels.length] : ''
    s += k4+k3 > 0 ? vowels[(Math.floor(k3/vowels.length)+k4) % vowels.length] : ''
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
    let chars = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let val = 0
    for(let id in word){
      val += chars.indexOf(word.charAt(id).toLowerCase())
    }
    return val
  }
}

module.exports = Fightlang
