var Dummy = require('../core/fighters/dummy')
var Lancer = require('../core/fighters/lancer')

let player = new Lancer(0,"USER",{x:2,y:1})
let dummy = new Dummy(1,"DUMMY",{x:2,y:3});

dummy.style = `
ANY
  ANY
    ANY
      WAIT`

module.exports = {
  players : [player,dummy],
  events  : [],
  effects : []
}