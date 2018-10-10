# README

- To Electron: `npm start`.
- To use the headless server: `npm run scenario`.
- To use the headless server, with specific scenario: `npm run scenario dojo`.

## Flow

To run a game, the scenario needs 3 things.

- a Fightscript
- a Fighter
- a Stage

### The screen flow is as follow

```
Splash -> Option Screen -> Fighter Screen -> Stage Screen -> Arena Screen
```

## The Option Screen(menu)

```
MENU
  OPTION
    NAME IS MUSIC
      SET OFF
    NAME IS SFX
      SET ON
```

## The Fighter Screen(menu)

```
MENU
  FIGHTER
    NAME IS SIN 
      SELECT
```

## The Stage Screen

No option is required.

## The Arena Screen

```
SIGHT
  FIGHTER
    DISTANCE IS 4 & NAME IS PEST
      MOVE AWAY
    NAME IS DUMMY
      MOVE TOWARD
      FIRE TOWARD
    ANY
      MOVE TOWARD
      ATTACK TOWARD
```