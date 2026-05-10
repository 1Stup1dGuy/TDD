import { enemyIntent } from '../game/combat';
import { sectors, units } from '../game/data';
import { unitDef, type GameState } from '../game/state';

const bar = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, ratio: number, color: string) => {
  ctx.fillStyle = '#0b1020'; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = color; ctx.fillRect(x + 1, y + 1, Math.max(0, (w - 2) * Math.max(0, Math.min(1, ratio))), h - 2);
  ctx.strokeStyle = '#89d8ff44'; ctx.strokeRect(x, y, w, h);
};

export const draw = (canvas: HTMLCanvasElement, s: GameState) => {
  const ctx = canvas.getContext('2d')!;
  const t = Date.now() * 0.0003;
  const pulse = Math.max(0, s.fxPulse--) / 10;
  const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
  g.addColorStop(0, '#02060f'); g.addColorStop(1, '#080f24');
  ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 120; i++) { const x = (i * 53 + t * (10 + (i % 7))) % canvas.width; const y = (i * 97 + t * (6 + (i % 5))) % canvas.height; ctx.fillStyle = `rgba(180,220,255,${0.1 + (i % 10) / 20})`; ctx.fillRect(x, y, 2, 2); }
  ctx.fillStyle = `rgba(170,90,255,${0.1 + pulse * 0.35})`; ctx.beginPath(); ctx.ellipse(170, 122, 190, 68, 0.2, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#9de7ff'; ctx.font = '14px system-ui';
  ctx.fillText(`SECTOR ${s.sectorIndex + 1}/5 :: ${sectors[Math.min(s.sectorIndex, 4)]?.name ?? 'Complete'}`, 16, 24);
  ctx.fillText(`Node ${s.encounter + 1}/4`, 16, 44);
  ctx.fillText('Route: ' + ['○', '○', '○', '◎'].map((n, i) => i === s.encounter ? '◉' : n).join('─'), 16, 64);

  s.party.forEach((u, i) => {
    const y = 98 + i * 76;
    ctx.strokeStyle = '#3bc7ff77'; ctx.strokeRect(16, y - 24, 320, 60);
    ctx.fillStyle = '#7de8ff'; ctx.fillText(`${unitDef(u).name} [${unitDef(u).role}]`, 24, y - 6);
    bar(ctx, 24, y + 2, 180, 10, u.hp / unitDef(u).maxHp, '#39e58f');
    bar(ctx, 210, y + 2, 90, 10, Math.min(1, u.shield / 12), '#52b7ff');
    ctx.fillStyle = '#9de7ff'; ctx.fillText(`⚙${u.upgrades.power}/${u.upgrades.safer}`, 304, y + 11);
  });

  s.enemies.forEach((u, i) => {
    const y = 96 + i * 94;
    ctx.strokeStyle = '#ff6aa688'; ctx.strokeRect(384, y - 18, 300, 72);
    ctx.fillStyle = '#ff9cc5'; ctx.fillText(`${unitDef(u).name}`, 394, y);
    bar(ctx, 394, y + 6, 140, 10, u.hp / unitDef(u).maxHp, '#ff5b7f');
    ctx.fillText(`Intent: ${enemyIntent(u.templateId)}`, 394, y + 32);
    ctx.fillStyle = '#ffc1d8aa'; ctx.fillText(unitDef(u).flavor, 394, y + 50);
    ctx.fillStyle = '#ff6aa655'; ctx.beginPath(); ctx.arc(660, y + 18, 10 + (i % 3) * 4 + pulse * 3, 0, Math.PI * 2); ctx.fill();
  });

  const actor = s.party[0];
  const limit = actor ? unitDef(actor).overloadLimit + actor.upgrades.safer : 2;
  const risk = limit ? s.overloads / limit : 0;
  ctx.strokeStyle = risk >= 1 ? '#ff3f65' : '#67d8ff'; ctx.strokeRect(16, 306, 320, 38);
  ctx.fillStyle = risk >= 1 ? '#ff5577' : '#7be7ff';
  ctx.fillText(`DICE CORE`, 24, 322);
  ctx.fillText(`Charge ${s.rollTotal} | Overload ${s.overloads}/${limit} | Face ${s.lastFace}`, 24, 338);
  if (risk >= 0.75) { ctx.fillStyle = '#ff4d6d'; ctx.fillText('⚠ REACTOR RISK CRITICAL', 210, 322); }
};

export const rosterMarkup = (s: GameState) => [...s.party, ...s.roster].map((u, i) => `<button data-roster='${i}' class='roster-btn ${s.party.some((p)=>p.uid===u.uid)?'active':''}'><strong>${units[u.templateId].name}</strong><small>${units[u.templateId].role}</small><small>HP ${u.hp}/${units[u.templateId].maxHp}</small><small>${s.party.some((p)=>p.uid===u.uid)?'ACTIVE':'BENCH'}</small></button>`).join('');
