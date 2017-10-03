# Markl

## TODOs

- CPU2 is trying to move in diagonal, because it sees in diagonal?
- Knockback, detect blockers
- Add moveable objects(pots,etc..)
- Add dash
- Add projectiles

## Characters

## Pest

- `STUN(VECTOR)`, replaced with `STUN`, stamina malus to all neighboring fighters.
- `FIRE(VECTOR)`, fire a projectile that bounces off the wall in any direction.

## Patience

- `SPELL(VECTOR)`, replaced with `TELEPORT`, move to any fighter or wall.
- `FIRE(VECTOR)`, throws a projectile that bounces back toward patience.

## Lance

- `SPELL(VECTOR)`, replaced with `DASH`, move 2 tiles, if enemy attack.
- `FIRE(VECTOR)`, fire 2 projectiles

### Sin

- `SPELL(VECTOR)`, fires a laser 2 tiles away.
- `FIRE(VECTOR)`, replaced with `XX`.
- `ATTACK(VECTOR)`, does nothing.

## Design

### Backstab

If attacked at the back, instant kill.

### Dodging/Blocking

If stamina allows, a player will dodge/block an attack automatically, but will still suffer the knockback of the attack.

### Life/Death

A fighter can act as long as HP and SP are above 0. 0HP is considered dead.

### Waiting

Waiting costs only 1 stamina, making it more likely to be the next one to move, but waiting twice in a row gives a stamina penality.

## Timeline

### Splash Screen

- Logo
- Start/Option selector

### Character Selection Screen

- Cursor
- Portraits
- Names
- Statistics
- Loadout(?)

### Arena Selection Screen

- Worldmap

### Arena Screen

- Abilities
- Holes
- Doodads
- Parallax

#### Characters

- Basic sprites
- Animation
- Effects

### Extras

- Soundtrack
- Sound Effects

## Fighting Style

- Decide syntax

### Vectors

- `UP`
- `LEFT`
- `RIGHT`
- `DOWN`
- `ANY`, a random direction, will choose an available one for move.

### Commands

- `MOVE(VECTOR)`, uses 2 stamina and move to a neighboring tile.
- `ATTACK(VECTOR)`, uses 5 stamina and attack a neighboring fighter.
- `WAIT`, uses 1 stamina and do nothing.
- `FIRE(VECTOR)`, use 15 stamina and fire a projectile.

#### Sin

- `FIRE(VECTOR)`, fires a laser 2 tiles away.

#### Patience

- `TELEPORT(VECTOR)`, move to any fighter or wall.

#### Lance

- `DASH(VECTOR)`, move 2 tiles, if enemy attack.

#### Pest

- `STUN(VECTOR)`, stamina malus to neighboring fighters.
