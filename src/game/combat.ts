import { rollForUnit } from './dice';
import { currentSector, unitDef, type GameState, type LiveUnit } from './state';

const alive = (arr: LiveUnit[]) => arr.filter((u) => !u.dead && u.hp > 0);
const damage = (u: LiveUnit, amt: number) => { const blocked = Math.min(u.shield, amt); u.shield -= blocked; const left = amt - blocked; u.hp -= left; if (u.hp <= 0) { u.dead = true; u.hp = 0; } };

const resetTurnCharge = (s: GameState) => {
  s.rollTotal = 0;
  s.overloads = 0;
  s.lastFace = '-';
};

export const rollAgain = (s: GameState) => {
  if (s.screen !== 'battle' || s.phase !== 'player') return;
  const actor = alive(s.party)[0]; if (!actor) return;
  const face = rollForUnit(actor); s.lastFace = face.label; s.fxPulse = 10;
  if (face.type === 'overload') s.overloads += 1;
  else if (face.type === 'hit') s.rollTotal += face.value + actor.upgrades.power;
  else actor.shield += face.value;
  const limit = unitDef(actor).overloadLimit + actor.upgrades.safer;
  if (s.overloads > limit) { s.log.unshift('☢ OVERLOAD! Charge vented and enemy gets initiative.'); resetTurnCharge(s); s.phase = 'enemy'; }
};

export const fireNow = (s: GameState) => {
  if (s.screen !== 'battle' || s.phase !== 'player') return;
  const target = alive(s.enemies)[0];
  const actor = alive(s.party)[0];
  if (!target || !actor) { resetTurnCharge(s); return; }
  if (s.rollTotal <= 0) { s.log.unshift('⚠ Roll at least once before firing.'); return; }
  const dmg = Math.max(1, s.rollTotal + (actor.templateId === 'captain_rook' ? 1 : 0));
  damage(target, dmg); s.log.unshift(`🔥 You fired for ${dmg} damage into ${unitDef(target).name}.`); resetTurnCharge(s); s.phase = 'enemy';
  if (target.dead && unitDef(target).recruitable) s.pendingRecruit = target.templateId;
};

export const defend = (s: GameState) => {
  if (s.screen !== 'battle' || s.phase !== 'player') return;
  for (const u of alive(s.party)) u.shield += 3 + (u.templateId === 'zib' ? 1 : 0);
  resetTurnCharge(s);
  s.log.unshift('🛡 Crew braced. Shields raised.'); s.phase = 'enemy';
};

export const enemyTurn = (s: GameState) => {
  if (s.screen !== 'battle') return;
  resetTurnCharge(s);
  for (const e of alive(s.enemies)) {
    const def = unitDef(e);
    const dmg = def.intent.min + Math.floor(Math.random() * (def.intent.max - def.intent.min + 1));
    const t = alive(s.party)[0]; if (!t) break;
    damage(t, dmg); s.log.unshift(`${def.name} uses ${def.intent.style} for ${dmg}.`);
  }
  if (alive(s.party).length === 0) { s.screen = 'gameover'; s.phase = 'ended'; resetTurnCharge(s); return; }
  if (alive(s.enemies).length === 0) {
    s.screen = 'reward';
    s.phase = 'ended';
    resetTurnCharge(s);
    s.rewardOptions = ['Overclock Die (+2 roll this sector for one unit)', 'Nano-Repair (heal all +8)', 'Core Lattice (+1 overload limit random unit)', 'Tactical Swap (draw 1 alien from bench to full HP)'];
    return;
  }
  s.phase = 'player';
};

export const enemyIntent = (id: string) => {
  const i = unitDef({ templateId: id } as LiveUnit).intent;
  return `${i.style}: ${i.min}-${i.max} dmg`;
};

export const captureChance = (hp: number, maxHp: number) => Math.max(10, Math.min(90, Math.round((1 - hp / maxHp) * 100)));

export const afterRewardAdvance = (s: GameState) => {
  s.encounter += 1;
  if (s.encounter > 3) { s.encounter = 0; s.sectorIndex += 1; }
  if (s.sectorIndex >= 5) { s.screen = 'victory'; s.phase = 'ended'; resetTurnCharge(s); s.enemies = []; return; }
  s.screen = 'battle';
  s.phase = 'player';
  s.pendingRecruit = undefined;
  s.enemies = [];
  resetTurnCharge(s);
  s.log.unshift(`➡ Jumping to ${currentSector(s).name}. ${currentSector(s).flavor}`);
};
