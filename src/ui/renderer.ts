import { enemyIntent } from '../game/combat';
import { sectors, units } from '../game/data';
import { unitDef, type GameState } from '../game/state';

export const draw = (canvas: HTMLCanvasElement, s: GameState) => {
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#050815'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 80; i++) { ctx.fillStyle = `rgba(180,220,255,${Math.random()})`; ctx.fillRect((i * 97) % canvas.width, (i * 53) % canvas.height, 2, 2); }
  ctx.fillStyle = '#7be7ff'; ctx.fillText(`Sector ${s.sectorIndex + 1}/5: ${sectors[Math.min(s.sectorIndex,4)]?.name ?? 'Complete'}`, 16, 24);
  ctx.fillText(`Encounter ${s.encounter + 1}/4`, 16, 44);
  ctx.fillText(`Roll: ${s.rollTotal} | Overloads: ${s.overloads} | Last: ${s.lastFace}`, 16, 64);
  s.party.forEach((u, i) => { const y = 100 + i * 70; ctx.fillStyle = '#3cd2ff'; ctx.fillText(`${unitDef(u).name} HP ${u.hp}/${unitDef(u).maxHp} 🛡${u.shield}`, 20, y); });
  s.enemies.forEach((u, i) => { const y = 100 + i * 90; ctx.strokeStyle = '#ff6aa6'; ctx.strokeRect(430, y - 18, 230, 54); ctx.fillStyle = '#ff9cc5'; ctx.fillText(`${unitDef(u).name} HP ${u.hp}/${unitDef(u).maxHp}`, 440, y); ctx.fillText(`Intent: ${enemyIntent()}`, 440, y + 20); });
};

export const rosterMarkup = (s: GameState) => [...s.party, ...s.roster].map((u, i) => `<button data-roster='${i}'>${units[u.templateId].name} (${u.hp}hp)</button>`).join('');
