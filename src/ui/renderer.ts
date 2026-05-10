import { enemyIntent } from '../game/combat';
import { sectors, units } from '../game/data';
import { unitDef, type GameState } from '../game/state';

export const draw = (canvas: HTMLCanvasElement, s: GameState) => {
  const ctx = canvas.getContext('2d')!;
  const t = Date.now() * 0.0003;
  const pulse = Math.max(0, s.fxPulse--) / 10;
  const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
  g.addColorStop(0, '#02060f'); g.addColorStop(1, '#080f24');
  ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 100; i++) { const x = (i * 53 + t * (10 + (i % 7))) % canvas.width; const y = (i * 97 + t * (6 + (i % 5))) % canvas.height; ctx.fillStyle = `rgba(180,220,255,${0.2 + (i % 10) / 15})`; ctx.fillRect(x, y, 2, 2); }
  ctx.fillStyle = `rgba(170,90,255,${0.08 + pulse * 0.35})`; ctx.beginPath(); ctx.ellipse(190, 120, 170, 60, 0.3, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#9de7ff'; ctx.font = '14px system-ui';
  ctx.fillText(`SECTOR ${s.sectorIndex + 1}/5 :: ${sectors[Math.min(s.sectorIndex, 4)]?.name ?? 'Complete'}`, 16, 24);
  ctx.fillText(`Node ${s.encounter + 1}/4`, 16, 44);
  ctx.fillText('Route: ' + ['○','○','○','◎'].map((n,i)=>i===s.encounter?'◉':n).join('─'), 16, 64);

  s.party.forEach((u, i) => { const y = 100 + i * 74; ctx.strokeStyle = '#3bc7ff77'; ctx.strokeRect(16, y - 24, 300, 56); ctx.fillStyle = '#7de8ff'; ctx.fillText(`${unitDef(u).name} [${unitDef(u).role}]`, 24, y - 4); ctx.fillText(`HP ${u.hp}/${unitDef(u).maxHp}  🛡${u.shield}  ⚙+${u.upgrades.power}/${u.upgrades.safer}`, 24, y + 16); });

  s.enemies.forEach((u, i) => { const y = 96 + i * 92; ctx.strokeStyle = '#ff6aa688'; ctx.strokeRect(390, y - 18, 290, 62); ctx.fillStyle = '#ff9cc5'; ctx.fillText(`${unitDef(u).name} HP ${u.hp}/${unitDef(u).maxHp}`, 400, y); ctx.fillText(`Intent: ${enemyIntent(u.templateId)}`, 400, y + 20); ctx.fillText(unitDef(u).flavor, 400, y + 40); });

  const actor = s.party[0];
  const limit = actor ? unitDef(actor).overloadLimit + actor.upgrades.safer : 2;
  ctx.fillStyle = pulse > 0.2 ? '#ff5577' : '#7be7ff';
  ctx.fillText(`Charge ${s.rollTotal} | Overload ${s.overloads}/${limit} | Face ${s.lastFace}`, 16, 336);
};

export const rosterMarkup = (s: GameState) => [...s.party, ...s.roster].map((u, i) => `<button data-roster='${i}' class='roster-btn'>${units[u.templateId].name} <small>${units[u.templateId].role}</small> <small>${u.hp}/${units[u.templateId].maxHp}hp</small> ${s.party.some((p)=>p.uid===u.uid)?'ACTIVE':'BENCH'}</button>`).join('');
