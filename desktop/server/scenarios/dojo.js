
let player = {
  id:0,
  hp:5,
  sp:0,
  name:"USER",
  type:"FIGHTER",
  character: "lancer",
  status:"idle",
  pos:{
    x:2,
    y:1
  }
}

let dummy = {
  id:1,
  hp:3,
  sp:0,
  name:"DUMMY",
  type:"FIGHTER",
  character: "dummy",
  status:"idle",
  pos:{
    x:2,
    y:3
  },
  style: `
DEFAULT
  DEFAULT
    DEFAULT
      WAIT`
}

player.score = {hits:0,blocks:0}
dummy.score = {hits:0,blocks:0}

module.exports = {
  players : [player,dummy],
  events  : [],
  effects : []
}