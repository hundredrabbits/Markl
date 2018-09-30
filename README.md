# README

- To Electron: `npm start`.
- To use the headless server: `npm run scenario`.
- To use the headless server, with specific scenario: `npm run scenario dojo`.

## Flow

To run a game, the scenario needs 3 things.

- Fightscript
- Character
- Stage

### 

```
markl
  scenario
    fightscript
    character
    stage
  supervisor.render(stage.serialize) -> arena_screen
```