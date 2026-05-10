import type { GameState } from '../game/state';
import { rosterMarkup } from './renderer';

export const view = (s: GameState, hasSave: boolean) => {
  if (s.screen === 'title') return `<h1>Dicebound Galaxy</h1><button id='new'>New Game</button><button id='cont' ${hasSave ? '' : 'disabled'}>Continue</button>`;
  if (s.screen === 'gameover') return `<h1>Game Over</h1><button id='new'>New Game</button><button id='title'>Title</button>`;
  if (s.screen === 'victory') return `<h1>Victory!</h1><p>You defeated The Singularity Core.</p><button id='new'>New Game</button><button id='title'>Title</button>`;
  if (s.screen === 'reward') return `<h2>Battle Rewards</h2>${s.rewardOptions.map((r, i) => `<button data-reward='${i}'>${r}</button>`).join('')}<button id='roster'>Roster</button>`;
  if (s.screen === 'roster') return `<h2>Roster Management</h2><div>${rosterMarkup(s)}</div><p>Click unit to move between active party (max 3) and bench.</p><button id='back'>Back</button>`;
  return `<div class='actions'><button id='roll'>Roll Again</button><button id='fire'>Fire Now</button><button id='defend'>Defend</button><button id='scan' ${s.pendingRecruit ? '' : 'disabled'}>Scan & Recruit</button><button id='party'>Roster</button><button id='save'>Save</button></div><div id='log'>${s.log.slice(0, 8).map((l) => `<div>${l}</div>`).join('')}</div>`;
};
