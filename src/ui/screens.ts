import { captureChance } from '../game/combat';
import { unitDef, type GameState } from '../game/state';
import { rosterMarkup } from './renderer';

export const view = (s: GameState, hasSave: boolean) => {
  if (s.screen === 'title') return `<div class='title-wrap'><p class='eyebrow'>VOID-LANE TACTICAL CONSOLE</p><h1>Dicebound Galaxy</h1><p>Risk reactor overload to blast alien threats, recruit survivors, and conquer all 5 sectors.</p><div class='actions'><button id='new'>New Game</button><button id='cont' ${hasSave ? '' : "disabled title-disabled"}>${hasSave ? 'Continue Expedition' : 'No Save Found'}</button></div></div>`;
  if (s.screen === 'tutorial') return `<h2>Command Briefing</h2><p>Each turn asks one question: <b>roll again for more charge, or fire now before overload?</b></p><ul><li><b>Roll Again</b>: gain damage or shields, but overload faces stack risk.</li><li><b>Fire Now</b>: spend charge as guaranteed damage.</li><li><b>Defend</b>: gain shields on all active party members.</li><li><b>Scan & Recruit</b>: capture defeated aliens for your bench.</li></ul><button id='tutorial-go'>Launch Mission</button>`;
  if (s.screen === 'gameover') return `<h1>Ship Lost</h1><p>Your hull broke in sector ${s.sectorIndex + 1}. The Drift Lanes go dark.</p><button id='new'>New Game</button><button id='title'>Title</button>`;
  if (s.screen === 'victory') return `<h1>Sector Secured</h1><p>You collapsed The Singularity Core and stabilized the frontier.</p><button id='new'>New Game</button><button id='title'>Title</button>`;
  if (s.screen === 'reward') return `<h2>Reward Uplink</h2><p class='eyebrow'>Choose one card</p><div class='reward-grid'>${s.rewardOptions.map((r, i) => `<button class='reward-card' data-reward='${i}'><span>Protocol ${i + 1}</span><strong>${r}</strong></button>`).join('')}</div><button id='roster'>Roster Console</button>`;
  if (s.screen === 'roster') return `<h2>Roster Console</h2><p class='eyebrow'>Active party max: 3</p><div>${rosterMarkup(s)}</div><button id='back'>Back</button>`;
  const recruitTarget = s.enemies.find((e) => e.templateId === s.pendingRecruit);
  const chance = recruitTarget ? captureChance(recruitTarget.hp, unitDef(recruitTarget).maxHp) : 0;
  return `<div class='actions'><button id='roll'>Roll Again</button><button id='fire'>Fire Now</button><button id='defend'>Defend</button><button id='scan' ${s.pendingRecruit ? '' : "disabled title-disabled"}>${s.pendingRecruit ? `Scan & Recruit ${chance}%` : 'Scan & Recruit (No target)'}</button><button id='party'>Roster</button><button id='save'>Save</button></div><div class='hud'>Charge <b>${s.rollTotal}</b> · Overloads <b>${s.overloads}</b> · Last Face <b>${s.lastFace}</b></div><div id='log'>${s.log.slice(0, 12).map((l, i) => `<div class='log-${i === 0 ? 'new' : 'old'}'>${l}</div>`).join('')}</div>`;
};
