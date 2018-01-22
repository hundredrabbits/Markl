let player1 = {
  id:0,
  hp:5,
  sp:0,
  name:"USER",
  type:"FIGHTER",
  character: "lancer",
  status:"default",
  pos:{
    x:2,
    y:0
  },
  style: `
DEFAULT
  DEFAULT
    DEFAULT
      WAIT`
}

let player2 = {
  id:1,
  hp:5,
  sp:0,
  name:"CPU1",
  type:"FIGHTER",
  character: "sin",
  status:"default",
  pos:{
    x:2,
    y:4
  },
  style: `
SIGHT
  FIGHTER
    DISTANCE IS 4
      MOVE TOWARD
    DISTANCE IS 3
      FIRE TOWARD
    DISTANCE IS 2
      DASH TOWARD
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE TOWARD
  OBJECT
    DISTANCE IS 1
      ATTACK TOWARD
  PROJECTILE
    DEFAULT
      STEP
DEFAULT
  DEFAULT
    DEFAULT
      MOVE ANY`
}

player1.score = {hits:0,blocks:0}
player2.score = {hits:0,blocks:0}

module.exports = {
  players : [player1,player2],
  events  : []
}