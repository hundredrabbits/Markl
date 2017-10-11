let arenas = {};

arenas.training = new Arena("training",new Size(5,5),[
  new Spawn(new Pos(0,0)),
  new Spawn(new Pos(4,4)),
  new Spawn(new Pos(4,0)),
  new Spawn(new Pos(0,4)),
  new Hole(new Pos(2,2),1)
]);

arenas.duel = new Arena("duel",new Size(3,7),[
  new Spawn(new Pos(1,0)),
  new Spawn(new Pos(1,6))
])

arenas.temple = new Arena("temple",new Size(3,5),[
  new Spawn(new Pos(1,1)),
  new Spawn(new Pos(1,4))
])

arenas.large = new Arena("large",new Size(5,7),[
  new Spawn(new Pos(2,0)),
  new Spawn(new Pos(0,3)),
  new Spawn(new Pos(4,3)),
  new Spawn(new Pos(2,6))
]);

let custom_style = `
SIGHT
  FIGHTER
    DISTANCE IS 4
      MOVE AWAY
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE TOWARD
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
      MOVE ANY
      
-- MENUS & STUFF

MENU
  OPTION
    NAME IS AUDIO
      SET OFF
  CHARACTER
    NAME IS LANCER
      SELECT
  ARENA
    NAME IS TRAINING
      SELECT
  LOADOUT
    NAME IS TELEKINETIC
      SELECT
`;

let idle_style = `-- idle.fight

DEFAULT
  DEFAULT
    DEFAULT
      WAIT
`;

let other_style = `-- dodge.fight

SIGHT
  FIGHTER
    DISTANCE IS 3
      MOVE AWAY
    DISTANCE IS 2
      MOVE AWAY
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      FIRE TOWARD
  OBJECT
    DEFAULT
      MOVE
  PROJECTILE
    DEFAULT
      MOVE AWAY

DEFAULT
  DEFAULT
    DEFAULT
      MOVE ANY

MENU
  CHARACTER
    NAME IS PEST
      SELECT
`;

let flower_style = `-- flower.fight
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
      MOVE ANY
`;

let campaign = new Campaign();

campaign.stages.push(new Stage("Dojo",arenas.dojo,[new Sin("CPU1",new Style("idle",flower_style))],"tatami"));
campaign.stages.push(new Stage("Training",arenas.training,[new Patience("CPU1",new Style("idle",flower_style))],"tatami"));
campaign.stages.push(new Stage("Lesson",arenas.training,[new Pest("CPU1",new Style("idle",flower_style))],"bamboo"));
campaign.stages.push(new Stage("Trial",arenas.training,[new Patience("CPU1",new Style("idle",flower_style))],"bamboo"));
campaign.stages.push(new Stage("Exam",arenas.training,[new Lancer("CPU1",new Style("idle",flower_style))],"temple"));
campaign.stages.push(new Stage("Duel",arenas.training,[new Lancer("CPU1",new Style("idle",flower_style))],"temple"));









