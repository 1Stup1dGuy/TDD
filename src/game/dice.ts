import { unitDef, type LiveUnit } from './state';

export const rollForUnit = (u: LiveUnit) => {
  const def = unitDef(u);
  const faces = [...def.die];
  for (let i = 0; i < u.upgrades.safer; i++) {
    const idx = faces.findIndex((f) => f.type === 'overload');
    if (idx >= 0) faces[idx] = { type: 'hit', value: 2, label: '⚡2+' };
  }
  const face = faces[Math.floor(Math.random() * faces.length)];
  const bonus = face.type === 'hit' ? u.upgrades.power : 0;
  return { ...face, value: face.value + bonus };
};
