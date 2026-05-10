export type DieFace = { type: 'hit' | 'overload' | 'shield'; value: number; label: string };

export type UnitTemplate = {
  id: string;
  name: string;
  role: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Boss';
  maxHp: number;
  die: DieFace[];
  overloadLimit: number;
  ability: string;
  flavor: string;
  recruitable?: boolean;
};

export type SectorDef = { id: number; name: string; bossId: string; enemyPool: string[] };

const basicDie: DieFace[] = [
  { type: 'hit', value: 2, label: '⚡2' },
  { type: 'hit', value: 3, label: '⚡3' },
  { type: 'hit', value: 4, label: '⚡4' },
  { type: 'shield', value: 2, label: '🛡2' },
  { type: 'overload', value: 0, label: '☢' },
  { type: 'overload', value: 0, label: '☢' },
];

const spikeDie: DieFace[] = [
  { type: 'hit', value: 1, label: '⚡1' },
  { type: 'hit', value: 5, label: '⚡5' },
  { type: 'hit', value: 5, label: '⚡5' },
  { type: 'shield', value: 1, label: '🛡1' },
  { type: 'overload', value: 0, label: '☢' },
  { type: 'overload', value: 0, label: '☢' },
];

export const units: Record<string, UnitTemplate> = {
  captain_rook: { id: 'captain_rook', name: 'Captain Rook', role: 'Pilot', rarity: 'Rare', maxHp: 34, die: basicDie, overloadLimit: 2, ability: 'Steady Aim: +1 fire damage.', flavor: 'A veteran scavenger with a cracked visor.' },
  zib: { id: 'zib', name: 'Zib', role: 'Engineer', rarity: 'Uncommon', maxHp: 28, die: basicDie, overloadLimit: 2, ability: 'Patch Loop: defend grants +1 shield.', flavor: 'Gremlin mechanic who talks to engines.' },
  zibling: { id: 'zibling', name: 'Zibling', role: 'Scout', rarity: 'Common', maxHp: 18, die: basicDie, overloadLimit: 2, ability: 'Quick Ping', flavor: 'A squeaky comet chaser.', recruitable: true },
  scrap_skitter: { id: 'scrap_skitter', name: 'Scrap Skitter', role: 'Bruiser', rarity: 'Common', maxHp: 20, die: spikeDie, overloadLimit: 2, ability: 'Rust Claws', flavor: 'Crab made of junk hull plates.', recruitable: true },
  plasma_moth: { id: 'plasma_moth', name: 'Plasma Moth', role: 'Caster', rarity: 'Uncommon', maxHp: 19, die: spikeDie, overloadLimit: 2, ability: 'Ion Dust', flavor: 'Drifts in burning arcs.', recruitable: true },
  grav_gobbler: { id: 'grav_gobbler', name: 'Grav Gobbler', role: 'Tank', rarity: 'Uncommon', maxHp: 25, die: basicDie, overloadLimit: 3, ability: 'Heavy Field', flavor: 'Eats loose satellites.', recruitable: true },
  rustback_beetle: { id: 'rustback_beetle', name: 'Rustback Beetle', role: 'Tank', rarity: 'Common', maxHp: 23, die: basicDie, overloadLimit: 2, ability: 'Carapace', flavor: 'Slow but stubborn.', recruitable: true },
  crystal_quark: { id: 'crystal_quark', name: 'Crystal Quark', role: 'Striker', rarity: 'Rare', maxHp: 21, die: spikeDie, overloadLimit: 2, ability: 'Prism Lance', flavor: 'Fractal shard intelligence.', recruitable: true },
  void_pup: { id: 'void_pup', name: 'Void Pup', role: 'Scout', rarity: 'Common', maxHp: 17, die: basicDie, overloadLimit: 2, ability: 'Howl Echo', flavor: 'Friendly void hound.', recruitable: true },
  lantern_wisp: { id: 'lantern_wisp', name: 'Lantern Wisp', role: 'Support', rarity: 'Uncommon', maxHp: 18, die: basicDie, overloadLimit: 2, ability: 'Glow Ward', flavor: 'A lamp in deep dark.', recruitable: true },
  iron_shell_snail: { id: 'iron_shell_snail', name: 'Iron Shell Snail', role: 'Tank', rarity: 'Uncommon', maxHp: 26, die: basicDie, overloadLimit: 3, ability: 'Plated Trail', flavor: 'Can survive meteor rain.', recruitable: true },
  venom_sporeling: { id: 'venom_sporeling', name: 'Venom Sporeling', role: 'Caster', rarity: 'Uncommon', maxHp: 20, die: spikeDie, overloadLimit: 2, ability: 'Toxic Puff', flavor: 'Spores shimmer neon green.', recruitable: true },
  dice_mimic_drone: { id: 'dice_mimic_drone', name: 'Dice Mimic Drone', role: 'Trickster', rarity: 'Rare', maxHp: 22, die: spikeDie, overloadLimit: 2, ability: 'Face Shift', flavor: 'Copies nearby rolls.', recruitable: true },
  hollow_star_knight: { id: 'hollow_star_knight', name: 'Hollow Star Knight', role: 'Elite', rarity: 'Rare', maxHp: 27, die: spikeDie, overloadLimit: 3, ability: 'Vacuum Slash', flavor: 'An empty suit that still salutes.', recruitable: true },
  scrap_baron: { id: 'scrap_baron', name: 'The Scrap Baron', role: 'Boss', rarity: 'Boss', maxHp: 45, die: spikeDie, overloadLimit: 3, ability: 'Magnet Crush', flavor: 'Rules junk moons.' },
  plasma_broodmother: { id: 'plasma_broodmother', name: 'Plasma Broodmother', role: 'Boss', rarity: 'Boss', maxHp: 52, die: spikeDie, overloadLimit: 3, ability: 'Solar Brood', flavor: 'Carries a furnace swarm.' },
  gravity_maw: { id: 'gravity_maw', name: 'The Gravity Maw', role: 'Boss', rarity: 'Boss', maxHp: 58, die: spikeDie, overloadLimit: 3, ability: 'Tidal Pull', flavor: 'A living gravity well.' },
  hollow_star_commander: { id: 'hollow_star_commander', name: 'Hollow Star Commander', role: 'Boss', rarity: 'Boss', maxHp: 63, die: spikeDie, overloadLimit: 3, ability: 'Command Burst', flavor: 'Leads spectral fleets.' },
  singularity_core: { id: 'singularity_core', name: 'The Singularity Core', role: 'Boss', rarity: 'Boss', maxHp: 75, die: spikeDie, overloadLimit: 4, ability: 'Event Horizon', flavor: 'A broken star engine.' },
};

export const sectors: SectorDef[] = [
  { id: 1, name: 'Drift Scrapfields', bossId: 'scrap_baron', enemyPool: ['zibling', 'scrap_skitter', 'rustback_beetle'] },
  { id: 2, name: 'Ion Nest', bossId: 'plasma_broodmother', enemyPool: ['plasma_moth', 'void_pup', 'lantern_wisp'] },
  { id: 3, name: 'Crushed Orbit', bossId: 'gravity_maw', enemyPool: ['grav_gobbler', 'iron_shell_snail', 'venom_sporeling'] },
  { id: 4, name: 'Hollow Armada', bossId: 'hollow_star_commander', enemyPool: ['dice_mimic_drone', 'hollow_star_knight', 'crystal_quark'] },
  { id: 5, name: 'Core Verge', bossId: 'singularity_core', enemyPool: ['hollow_star_knight', 'dice_mimic_drone', 'crystal_quark'] },
];
