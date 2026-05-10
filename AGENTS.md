# AGENTS.md

## Project
This repo contains a browser-based space dice RPG called Dicebound Galaxy.

The game is an original spiritual successor to broad dice RPG ideas. Do not copy Tiny Dice Dungeon assets, UI, names, layouts, dialogue, characters, sprites, sounds, exact mechanics, or protected expression.

## Tech Stack
Use:
- TypeScript
- Vite
- HTML Canvas
- CSS
- localStorage

Do not use:
- Unity
- Phaser
- Paid assets
- External art packs
- Backend services
- Authentication
- Online multiplayer

React is not needed for this MVP.

## Setup
Install dependencies with:

```bash
npm install
```

Run locally with:

```bash
npm run dev
```

Build with:

```bash
npm run build
```

Lint/type-check with:

```bash
npm run lint
```

## Expected Project Structure

```text
src/
  main.ts
  game/
    state.ts
    data.ts
    dice.ts
    combat.ts
    sector.ts
    save.ts
  ui/
    renderer.ts
    input.ts
    screens.ts
  styles.css
```

## Development Rules
- Make a complete playable MVP.
- Prefer simple working code over over-engineered architecture.
- Keep the game data-driven.
- Put aliens, bosses, dice faces, sectors, rewards, and abilities in `src/game/data.ts`.
- Keep game state serializable so it can be saved to localStorage.
- Use canvas for the main game visuals.
- Use HTML/CSS for buttons and layout if easier.
- Do not leave placeholder TODO screens.
- Do not create broken menu buttons.
- Do not require image files.
- Use procedural shapes, simple icons, text, and canvas drawing.

## Game Design Priorities
The core feeling is push-your-luck dice combat.

The player should repeatedly decide:

“Do I roll again for more damage, or stop before the reactor overloads?”

Required systems:
- Turn-based combat
- Roll Again / Fire Now decision
- Reactor overload bust mechanic
- Defend action
- Enemy intent preview
- Scan & Recruit action for low-HP aliens
- Party of up to 3 active units
- Bench roster
- 5 sectors
- 3 normal battles plus 1 boss battle per sector
- Rewards after battles
- Dice upgrades
- localStorage save/load
- Game over screen
- Victory screen

## Quality Bar
Before finishing, verify:

```bash
npm run build
npm run lint
```

The build must pass.

Also check:
- No missing imports
- No TypeScript errors
- No console errors during normal play
- New Game works
- Continue works after saving
- Combat buttons work
- Rewards work
- Sector progression works
- Final boss can be reached
- Victory screen appears
