import './styles.css';
import { spawnEncounter } from './game/sector';
import { clearSave, loadGame, saveGame } from './game/save';
import { newGame, type GameState } from './game/state';
import { bind } from './ui/input';
import { draw } from './ui/renderer';
import { view } from './ui/screens';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app element');

let state: GameState = { ...newGame(), screen: 'title' };

const normalize = (s: GameState): GameState => ({ ...newGame(), ...s, tutorialStep: s.tutorialStep ?? 0, fxPulse: s.fxPulse ?? 0 });
const startNew = () => { state = newGame(); spawnEncounter(state); saveGame(state); render(); };
const goTitle = () => { state.screen = 'title'; render(); };

const render = () => {
  const hasSave = !!loadGame();
  app.innerHTML = `<main class='layout'><canvas id='scene' width='700' height='360'></canvas><section class='panel'>${view(state, hasSave)}</section><aside class='debug'><h4>Debug</h4><button id='debug-heal'>Heal party</button><button id='debug-next'>Advance to next encounter</button><button id='debug-final'>Jump to final sector</button><button id='debug-clear'>Clear save</button></aside></main>`;
  const canvas = document.getElementById('scene') as HTMLCanvasElement;
  if (state.screen !== 'title') draw(canvas, state);
  bind(app, state, render, startNew, goTitle);
  const cont = document.getElementById('cont');
  if (cont) cont.onclick = () => { const loaded = loadGame(); if (loaded) { state = normalize(loaded); if (state.enemies.length === 0 && state.screen === 'battle') spawnEncounter(state); } render(); };
  if (state.screen === 'battle' && state.enemies.length === 0) { spawnEncounter(state); render(); }
};

render();
window.addEventListener('beforeunload', () => { if (state.screen !== 'title') saveGame(state); });
(window as unknown as { clearDiceboundSave: () => void }).clearDiceboundSave = clearSave;
