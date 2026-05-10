import { rollForUnit } from './dice';
import { currentSector, unitDef, type GameState, type LiveUnit } from './state';

const alive = (arr: LiveUnit[]) => arr.filter((u) => !u.dead && u.hp > 0);
const damage = (u: LiveUnit, amt: number) => { const blocked = Math.min(u.shield, amt); u.shield -= blocked; const left = amt - blocked; u.hp -= left; if (u.hp <= 0) { u.dead = true; u.hp = 0; } };

export const rollAgain = (s: GameState) => {
  const actor = alive(s.party)[0]; if (!actor) return;
  const face = rollForUnit(actor); s.lastFace = face.label;
  if (face.type === 'overload') s.overloads += 1;
  else if (face.type === 'hit') s.rollTotal += face.value;
  else actor.shield += face.value;
  const limit = unitDef(actor).overloadLimit + actor.upgrades.safer;
  if (s.overloads > limit) { s.log.unshift('Reactor overload! Attack lost.'); s.rollTotal = 0; s.overloads = 0; s.phase = 'enemy'; }
};

export const fireNow = (s: GameState) => {
  const target = alive(s.enemies)[0]; if (!target) return;
  const actor = alive(s.party)[0]; if (!actor) return;
  const dmg = s.rollTotal + (actor.templateId === 'captain_rook' ? 1 : 0);
  damage(target, dmg); s.log.unshift(`Fired for ${dmg} damage.`); s.rollTotal = 0; s.overloads = 0; s.phase = 'enemy';
  if (target.dead && unitDef(target).recruitable) s.pendingRecruit = target.templateId;
};

export const defend = (s: GameState) => {
  for (const u of alive(s.party)) u.shield += 3 + (u.templateId === 'zib' ? 1 : 0);
  s.log.unshift('Party braced and gained shields.'); s.phase = 'enemy';
};

export const enemyTurn = (s: GameState) => {
  for (const e of alive(s.enemies)) {
    const dmg = 2 + Math.floor(Math.random() * 6);
    const t = alive(s.party)[0]; if (!t) break;
    damage(t, dmg); s.log.unshift(`${unitDef(e).name} attacks for ${dmg}.`);
  }
  if (alive(s.party).length === 0) { s.screen = 'gameover'; return; }
  if (alive(s.enemies).length === 0) {
    s.screen = 'reward';
    s.rewardOptions = ['Repair Hull (+6 HP all)', 'Tune Dice (+1 power random)', 'Stabilize Core (+1 safer random)'];
    return;
  }
  s.phase = 'player';
};

export const enemyIntent = () => `${2 + Math.floor(Math.random() * 6)} dmg`;

export const afterRewardAdvance = (s: GameState) => {
  s.encounter += 1;
  if (s.encounter > 3) { s.encounter = 0; s.sectorIndex += 1; }
  if (s.sectorIndex >= 5) { s.screen = 'victory'; return; }
  s.screen = 'battle'; s.pendingRecruit = undefined;
  s.log.unshift(`Jumping to ${currentSector(s).name}.`);
};
