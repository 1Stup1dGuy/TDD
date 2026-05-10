import { captureChance } from '../game/combat';
import { unitDef, type GameState } from '../game/state';
import { rosterMarkup } from './renderer';

export const view = (s: GameState, hasSave: boolean) => {
  if (s.screen === 'title') return `<h1>Dicebound Galaxy</h1><p>Push-your-luck starship dice RPG.</p><button id='new'>New Game</button><button id='cont' ${hasSave ? '' : 'disabled'}>Continue</button>`;
  if (s.screen === 'tutorial') return `<h2>Command Briefing</h2><p>Roll Again builds charge but overloads can bust your turn. Fire Now spends charge. Defend buys time. Scan defeated low-HP aliens to recruit them.</p><ul><li>Overload limit is per active pilot.</li><li>Enemy intent shows next attack range.</li><li>Build a 3-unit strike team from your roster.</li></ul><button id='tutorial-go'>Launch Mission</button>`;
  if (s.screen === 'gameover') return `<h1>Ship Lost</h1><p>Your hull broke in sector ${s.sectorIndex + 1}.</p><button id='new'>New Game</button><button id='title'>Title</button>`;
  if (s.screen === 'victory') return `<h1>Sector Secured</h1><p>You collapsed The Singularity Core and saved the Drift Lanes.</p><button id='new'>New Game</button><button id='title'>Title</button>`;
  if (s.screen === 'reward') return `<h2>Reward Uplink</h2><p>Choose one tactical card:</p>${s.rewardOptions.map((r, i) => `<button data-reward='${i}'>${r}</button>`).join('')}<button id='roster'>Roster</button>`;
  if (s.screen === 'roster') return `<h2>Roster Console</h2><div>${rosterMarkup(s)}</div><p>Tap a unit to move between active party (max 3) and bench.</p><button id='back'>Back</button>`;
  const recruitTarget = s.enemies.find((e) => e.templateId === s.pendingRecruit);
  const chance = recruitTarget ? captureChance(recruitTarget.hp, unitDef(recruitTarget).maxHp) : 0;
  return `<div class='actions'><button id='roll'>Roll Again</button><button id='fire'>Fire Now</button><button id='defend'>Defend</button><button id='scan' ${s.pendingRecruit ? '' : 'disabled'}>${s.pendingRecruit ? `Scan & Recruit (${chance}%)` : 'Scan & Recruit'}</button><button id='party'>Roster</button><button id='save'>Save</button></div><div class='hud'>Charge <b>${s.rollTotal}</b> | Overloads <b>${s.overloads}</b> | Last face <b>${s.lastFace}</b></div><div id='log'>${s.log.slice(0, 10).map((l) => `<div>${l}</div>`).join('')}</div>`;
};
