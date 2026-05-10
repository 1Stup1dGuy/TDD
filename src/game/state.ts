import { sectors, units, type UnitTemplate } from './data';

export type Screen = 'title' | 'battle' | 'reward' | 'roster' | 'gameover' | 'victory';
export type CombatPhase = 'player' | 'enemy' | 'ended';
export type LiveUnit = { uid: string; templateId: string; hp: number; shield: number; dead: boolean; upgrades: { power: number; safer: number } };

export type GameState = {
  screen: Screen;
  sectorIndex: number;
  encounter: number;
  phase: CombatPhase;
  party: LiveUnit[];
  roster: LiveUnit[];
  enemies: LiveUnit[];
  rollTotal: number;
  overloads: number;
  lastFace: string;
  log: string[];
  credits: number;
  pendingRecruit?: string;
  rewardOptions: string[];
};

const mk = (id: string, n: number): LiveUnit => ({ uid: `${id}_${n}_${Math.random().toString(36).slice(2, 6)}`, templateId: id, hp: units[id].maxHp, shield: 0, dead: false, upgrades: { power: 0, safer: 0 } });

export const unitDef = (u: LiveUnit): UnitTemplate => units[u.templateId];

export const newGame = (): GameState => ({
  screen: 'battle', sectorIndex: 0, encounter: 0, phase: 'player',
  party: [mk('captain_rook', 1), mk('zib', 2)], roster: [], enemies: [],
  rollTotal: 0, overloads: 0, lastFace: '-', log: ['Mission start.'], credits: 0, rewardOptions: []
});

export const currentSector = (s: GameState) => sectors[s.sectorIndex];
