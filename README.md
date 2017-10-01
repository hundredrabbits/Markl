# Markl

- Focus on active fighter
- Play each fighter one after the other instead of all at once

## Characters

- Sin
- Patience
- Lance
- Pest

## Design

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

- `MOVE`, uses 2 stamina
- `ATTACK`, uses 5 stamina
- `SPELL`, uses 10 stamina
- `WAIT`, uses 1 stamina
