# Dicebound Galaxy

A complete browser MVP of a space-themed push-your-luck dice RPG built with **Vite + TypeScript + HTML Canvas + CSS + localStorage**.

## Run

```bash
npm install
npm run dev
```

## Build / Lint

```bash
npm run build
npm run lint
```

## How to play

- Start from **New Game** on title.
- In battle, repeatedly choose **Roll Again** to increase fire power, but overload faces increase reactor risk.
- Use **Fire Now** to spend current roll total as damage.
- If overloads exceed limit, attack is lost.
- Use **Defend** to gain shields.
- Watch **enemy intent** in the canvas panel.
- When recruitable aliens fall low and are defeated, **Scan & Recruit** can add them to your bench roster.
- Manage active party (max 3) in **Roster** screen.
- After each battle choose rewards: healing, power die tuning, or safer core tuning.
- Clear 3 normal encounters + 1 boss per sector across 5 sectors.
- Lose all party members = **Game Over**.
- Defeat final boss in sector 5 = **Victory**.

## Implemented systems

- Title, Battle, Reward, Roster, Game Over, Victory screens.
- Turn-based combat with roll-again/fire-now push-your-luck loop.
- Reactor overload bust mechanic.
- Defend and shields.
- Enemy intent preview.
- Recruitable alien roster and party swapping.
- Sector progression with 5 sectors and 5 bosses.
- Reward flow and dice upgrades that alter roll behavior.
- Save/Continue via localStorage.
- Debug tools: heal, skip encounter, jump final sector, clear save.
- Procedural visuals (canvas stars, neon panels, procedural text-driven unit cards).

## Known limitations

- Enemy AI is simple and always attacks first alive party unit.
- Balance is intentionally MVP-level and may need tuning.
- Intent preview is approximate readout rather than deterministic script.

## Suggested improvements

- Better enemy behavior variety and status effects.
- Richer abilities per alien.
- More visual juice for dice rolls and attacks.
- Additional reward/item variety and economy depth.
- Mobile-specific layout refinements.
