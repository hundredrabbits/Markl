let player1 = {
  id:0,
  hp:5,
  sp:0,
  name:"USER",
  type:"FIGHTER",
  character: "Pest",
  pos:{
    x:0,
    y:0
  },
  style: `
SIGHT
  FIGHTER
    CHARACTER IS SIN
      MOVE AWAY
    DISTANCE IS 4
      WAIT
    DISTANCE IS 2
      MOVE AWAY
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE AWAY
  OBJECT
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE
  PROJECTILE
    DEFAULT
      STEP
DEFAULT
  DEFAULT
    DEFAULT
      MOVE UP`
}

let player2 = {
  id:1,
  hp:5,
  sp:0,
  name:"CPU1",
  type:"FIGHTER",
  character: "Sin",
  pos:{
    x:0,
    y:4
  },
  style: `
SIGHT
  FIGHTER
    DISTANCE IS 4
      WAIT
    DISTANCE IS 2
      MOVE AWAY
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE AWAY
  OBJECT
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE
  PROJECTILE
    DEFAULT
      STEP
DEFAULT
  DEFAULT
    DEFAULT
      MOVE RIGHT`
}

module.exports = {
  players : [player1,player2]
}