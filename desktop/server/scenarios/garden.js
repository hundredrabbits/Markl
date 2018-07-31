
var Lancer = require('../core/fighters/lancer')
var Patience = require('../core/fighters/patience')
var Pest = require('../core/fighters/pest')
var Sin = require('../core/fighters/sin')

let player = new Lancer(0,"USER",{x:4,y:0})
let patience = new Patience(1,"CPU1",{x:0,y:0});
let sin = new Sin(2,"CPU2",{x:4,y:4});
let pest = new Pest(3,"CPU3",{x:0,y:4});

var aggro = `
SIGHT
  FIGHTER
    DISTANCE OF 1
      ATTACK TOWARD
    ANY
      MOVE TOWARD
ANY
  ANY
    ANY
      MOVE ANY`

patience.style = aggro
sin.style = aggro
pest.style = aggro

module.exports = {
  players : [player,patience,sin,pest],
  events  : [],
  effects : []
}