# Markl

## FightScript Documentation

FightScript is meant to be as simple as possible and allow for flexible fighting behaviours. The preceeding number of characters on a line tells the parser what to expect.

```
{TRIGGER}
--{EVENT}
----{CONDITION}
------{ACTION}
```

Here's an example where the character will move away whenever an enemy fighter is at 2 tiles of distance:

```
MENU
  CHARACTER
    NAME IS PEST
      SELECT
SIGHT
  FIGHTER
    DISTANCE IS 2
      ATTACK TOWARD
    DEFAULT
      MOVE AWAY
```

### Triggers

- `OPTION` Will trigger when an option is highlighted.
- `MENU` Will trigger when a menu is highlighted.
- `SIGHT` Will trigger when something is in sight.
- `DEFAULT` Will trigger if no other trigger is found.

### Events

- Menu Events
  - `CHARACTER` Will trigger when a character is selected in the character selection screen.
  - `ARENA` Will trigger when an arena is selected in the arena selection screen.
- Arena Events
  - `FIGHTER` Will trigger if an enemy fighter is in sight.
  - `OBJECT` Will trigger if an interactible object is in sight.
  - `PROJECTILE` Will trigger if a projectile is in sight.
  - `DEFAULT` Will trigger if no other event is found.

### Conditions

Conditions can be combined with `AND`.

- `NAME IS ` (**STRING**), will trigger if the event's name is equal to the string parameter.
- `DISTANCE IS ` (**INTEGER**), requires *sight*, will trigger if the event is at distance X.
- `DIRECTION IS ` (UP,DOWN,LEFT,RIGHT,ANY,*TOWARD*,*AWAY*), requires *sight*, will trigger if the event is at distance X.
- `DEFAULT` Will trigger if no condition is met.

### Actions

The `ANY` vector will choose a vector randomly. 

- `MOVE` (UP,DOWN,LEFT,RIGHT,ANY,*TOWARD*,*AWAY*)
- `ATTACK` (UP,DOWN,LEFT,RIGHT,ANY,*TOWARD*,*AWAY*)
- `FIRE` (UP,DOWN,LEFT,RIGHT,ANY,*TOWARD*,*AWAY*)
- `CAST` (UP,DOWN,LEFT,RIGHT,ANY,*TOWARD*,*AWAY*)
- `WAIT`
- `SELECT`, used in menu.

### Formatting

#### Comment

You can comment a line with `--`.

```
-- This is a comment
```

#### Break

You can end the parsing of a file with `::`.

```
Code is executed.
++
Code is not executed.
```
