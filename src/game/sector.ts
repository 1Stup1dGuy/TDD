import { currentSector, type GameState, type LiveUnit } from './state';
import { units } from './data';

const mkEnemy = (id: string, i: number): LiveUnit => ({ uid: `e_${id}_${i}_${Math.random().toString(36).slice(2, 6)}`, templateId: id, hp: units[id].maxHp, shield: 0, dead: false, upgrades: { power: 0, safer: 0 } });

export const spawnEncounter = (s: GameState) => {
  const sec = currentSector(s);
  const boss = s.encounter === 3;
  if (boss) s.enemies = [mkEnemy(sec.bossId, 0)];
  else {
    const count = 1 + Math.floor(Math.random() * 2);
    s.enemies = Array.from({ length: count }, (_, i) => mkEnemy(sec.enemyPool[Math.floor(Math.random() * sec.enemyPool.length)], i));
  }
  s.phase = 'player'; s.rollTotal = 0; s.overloads = 0; s.lastFace = '-';
  s.log.unshift(`${boss ? 'Boss' : 'Encounter'} begins in ${sec.name}.`);
};
