let enemy_style = `
SIGHT
  FIGHTER
    CHARACTER IS SIN
      MOVE AWAY
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE TOWARD
DEFAULT
  DEFAULT
    DEFAULT
      MOVE ANY
      MOVE DOWN`;

let player1 = {
  id:0,
  hp:5,
  sp:0,
  name:"USER",
  type:"FIGHTER",
  character: "lancer",
  status:"idle",
  pos:{
    x:2,
    y:0
  },
  style: enemy_style
}

let player2 = {
  id:1,
  hp:3,
  sp:0,
  name:"CPU1",
  type:"FIGHTER",
  character: "lancer",
  status:"idle",
  pos:{
    x:1,
    y:3
  },
  style: enemy_style
}

let player3 = {
  id:2,
  hp:3,
  sp:0,
  name:"CPU2",
  type:"FIGHTER",
  character: "lancer",
  status:"idle",
  pos:{
    x:3,
    y:3
  },
  style: enemy_style
}
player1.score = {hits:0,blocks:0}
player2.score = {hits:0,blocks:0}
player3.score = {hits:0,blocks:0}

module.exports = {
  players : [player1,player2,player3],
  events  : [],
  effects : []
}