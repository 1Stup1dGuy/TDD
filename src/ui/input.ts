import { afterRewardAdvance, defend, enemyTurn, fireNow, rollAgain } from '../game/combat';
import { units } from '../game/data';
import { clearSave, saveGame } from '../game/save';
import { unitDef, type GameState } from '../game/state';

export const bind = (root: HTMLElement, s: GameState, rerender: () => void, startNew: () => void, goTitle: () => void) => {
  root.onclick = (ev) => {
    const t = ev.target as HTMLElement;
    if (t.id === 'new') return startNew();
    if (t.id === 'title') return goTitle();
    if (t.id === 'roll') { rollAgain(s); rerender(); return; }
    if (t.id === 'fire') { fireNow(s); enemyTurn(s); rerender(); return; }
    if (t.id === 'defend') { defend(s); enemyTurn(s); rerender(); return; }
    if (t.id === 'party' || t.id === 'roster') { s.screen = 'roster'; rerender(); return; }
    if (t.id === 'back') { s.screen = s.enemies.length ? 'battle' : 'reward'; rerender(); return; }
    if (t.id === 'save') { saveGame(s); s.log.unshift('Saved.'); rerender(); return; }
    if (t.id === 'scan' && s.pendingRecruit) {
      const u = { uid: `r_${Date.now()}`, templateId: s.pendingRecruit, hp: Math.floor(units[s.pendingRecruit].maxHp * 0.7), shield: 0, dead: false, upgrades: { power: 0, safer: 0 } };
      s.roster.push(u); s.pendingRecruit = undefined; s.log.unshift(`${unitDef(u).name} recruited.`); rerender(); return;
    }
    if (t.dataset.reward !== undefined) {
      const i = Number(t.dataset.reward);
      if (i === 0) [...s.party, ...s.roster].forEach((u) => (u.hp = Math.min(unitDef(u).maxHp, u.hp + 6)));
      if (i === 1) s.party[Math.floor(Math.random() * s.party.length)].upgrades.power += 1;
      if (i === 2) s.party[Math.floor(Math.random() * s.party.length)].upgrades.safer += 1;
      afterRewardAdvance(s); rerender(); return;
    }
    if (t.dataset.roster !== undefined) {
      const all = [...s.party, ...s.roster]; const idx = Number(t.dataset.roster); const picked = all[idx];
      const inParty = s.party.some((p) => p.uid === picked.uid);
      if (inParty && s.party.length > 1) { s.party = s.party.filter((p) => p.uid !== picked.uid); s.roster.push(picked); }
      else if (!inParty && s.party.length < 3) { s.roster = s.roster.filter((r) => r.uid !== picked.uid); s.party.push(picked); }
      rerender(); return;
    }
    if (t.id === 'debug-heal') { s.party.forEach((u) => (u.hp = unitDef(u).maxHp)); rerender(); return; }
    if (t.id === 'debug-next') { s.enemies = []; s.screen = 'reward'; s.rewardOptions = ['Repair Hull (+6 HP all)', 'Tune Dice (+1 power random)', 'Stabilize Core (+1 safer random)']; rerender(); return; }
    if (t.id === 'debug-final') { s.sectorIndex = 4; s.encounter = 3; rerender(); return; }
    if (t.id === 'debug-clear') { clearSave(); rerender(); return; }
  };
};
