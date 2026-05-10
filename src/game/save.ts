import type { GameState } from './state';

const KEY = 'dicebound_galaxy_save_v1';
export const saveGame = (s: GameState) => localStorage.setItem(KEY, JSON.stringify(s));
export const loadGame = (): GameState | null => {
  const raw = localStorage.getItem(KEY); if (!raw) return null;
  try { return JSON.parse(raw) as GameState; } catch { return null; }
};
export const clearSave = () => localStorage.removeItem(KEY);
