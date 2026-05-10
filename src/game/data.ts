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
  intent: { min: number; max: number; style: string };
};

export type SectorDef = { id: number; name: string; bossId: string; enemyPool: string[]; flavor: string };
const d=(a:number,b:number,c:number,s:number,o:number):DieFace[]=>[{type:'hit',value:a,label:`⚡${a}`},{type:'hit',value:b,label:`⚡${b}`},{type:'hit',value:c,label:`⚡${c}`},{type:'shield',value:s,label:`🛡${s}`},{type:'overload',value:0,label:'☢'},{type:'overload',value:0,label:o>1?'☢!':'☢'}];

export const units: Record<string, UnitTemplate> = {
 captain_rook:{id:'captain_rook',name:'Captain Rook',role:'Pilot',rarity:'Rare',maxHp:34,die:d(2,3,4,2,1),overloadLimit:2,ability:'Steady Aim: +1 fire damage.',flavor:'Veteran scavenger with a cracked visor.',intent:{min:0,max:0,style:'Leader'}},
 zib:{id:'zib',name:'Zib',role:'Engineer',rarity:'Uncommon',maxHp:28,die:d(2,3,3,3,1),overloadLimit:2,ability:'Patch Loop: defend grants +1 shield.',flavor:'Gremlin mechanic who talks to engines.',intent:{min:0,max:0,style:'Support'}},
 zibling:{id:'zibling',name:'Zibling',role:'Scout',rarity:'Common',maxHp:18,die:d(2,3,4,1,2),overloadLimit:2,ability:'Quick Ping',flavor:'Squeaky comet chaser.',recruitable:true,intent:{min:2,max:5,style:'Quick jab'}},
 scrap_skitter:{id:'scrap_skitter',name:'Scrap Skitter',role:'Bruiser',rarity:'Common',maxHp:22,die:d(1,5,5,1,2),overloadLimit:2,ability:'Rust Claws',flavor:'Crab made of junk hull plates.',recruitable:true,intent:{min:4,max:8,style:'Heavy claw'}},
 plasma_moth:{id:'plasma_moth',name:'Plasma Moth',role:'Caster',rarity:'Uncommon',maxHp:19,die:d(2,4,5,1,2),overloadLimit:2,ability:'Ion Dust',flavor:'Drifts in burning arcs.',recruitable:true,intent:{min:3,max:7,style:'Burn ray'}},
 grav_gobbler:{id:'grav_gobbler',name:'Grav Gobbler',role:'Tank',rarity:'Uncommon',maxHp:26,die:d(2,3,4,2,1),overloadLimit:3,ability:'Heavy Field',flavor:'Eats loose satellites.',recruitable:true,intent:{min:2,max:6,style:'Crush bite'}},
 rustback_beetle:{id:'rustback_beetle',name:'Rustback Beetle',role:'Tank',rarity:'Common',maxHp:23,die:d(2,3,3,3,1),overloadLimit:2,ability:'Carapace',flavor:'Slow but stubborn.',recruitable:true,intent:{min:2,max:6,style:'Ram'}},
 crystal_quark:{id:'crystal_quark',name:'Crystal Quark',role:'Striker',rarity:'Rare',maxHp:21,die:d(1,5,6,1,2),overloadLimit:2,ability:'Prism Lance',flavor:'Fractal shard intelligence.',recruitable:true,intent:{min:5,max:9,style:'Prism spike'}},
 void_pup:{id:'void_pup',name:'Void Pup',role:'Scout',rarity:'Common',maxHp:17,die:d(2,3,4,1,2),overloadLimit:2,ability:'Howl Echo',flavor:'Friendly void hound.',recruitable:true,intent:{min:2,max:5,style:'Void nip'}},
 lantern_wisp:{id:'lantern_wisp',name:'Lantern Wisp',role:'Support',rarity:'Uncommon',maxHp:18,die:d(2,3,3,3,1),overloadLimit:2,ability:'Glow Ward',flavor:'A lamp in deep dark.',recruitable:true,intent:{min:1,max:5,style:'Flash pulse'}},
 iron_shell_snail:{id:'iron_shell_snail',name:'Iron Shell Snail',role:'Tank',rarity:'Uncommon',maxHp:28,die:d(2,3,4,2,1),overloadLimit:3,ability:'Plated Trail',flavor:'Can survive meteor rain.',recruitable:true,intent:{min:2,max:6,style:'Slow slam'}},
 venom_sporeling:{id:'venom_sporeling',name:'Venom Sporeling',role:'Caster',rarity:'Uncommon',maxHp:20,die:d(1,4,5,2,2),overloadLimit:2,ability:'Toxic Puff',flavor:'Spores shimmer neon green.',recruitable:true,intent:{min:3,max:7,style:'Toxin burst'}},
 dice_mimic_drone:{id:'dice_mimic_drone',name:'Dice Mimic Drone',role:'Trickster',rarity:'Rare',maxHp:22,die:d(1,5,5,2,2),overloadLimit:2,ability:'Face Shift',flavor:'Copies nearby rolls.',recruitable:true,intent:{min:3,max:8,style:'Copied burst'}},
 hollow_star_knight:{id:'hollow_star_knight',name:'Hollow Star Knight',role:'Elite',rarity:'Rare',maxHp:27,die:d(2,4,6,1,2),overloadLimit:3,ability:'Vacuum Slash',flavor:'Empty suit that still salutes.',recruitable:true,intent:{min:4,max:8,style:'Vacuum slash'}},
 scrap_baron:{id:'scrap_baron',name:'The Scrap Baron',role:'Boss',rarity:'Boss',maxHp:48,die:d(2,5,6,2,2),overloadLimit:3,ability:'Magnet Crush',flavor:'Rules junk moons.',intent:{min:5,max:10,style:'Magnet crush'}},
 plasma_broodmother:{id:'plasma_broodmother',name:'Plasma Broodmother',role:'Boss',rarity:'Boss',maxHp:54,die:d(2,5,6,2,2),overloadLimit:3,ability:'Solar Brood',flavor:'Carries a furnace swarm.',intent:{min:6,max:11,style:'Solar brood'}},
 gravity_maw:{id:'gravity_maw',name:'The Gravity Maw',role:'Boss',rarity:'Boss',maxHp:60,die:d(3,5,6,2,2),overloadLimit:3,ability:'Tidal Pull',flavor:'A living gravity well.',intent:{min:6,max:12,style:'Gravity crush'}},
 hollow_star_commander:{id:'hollow_star_commander',name:'Hollow Star Commander',role:'Boss',rarity:'Boss',maxHp:66,die:d(3,5,7,2,2),overloadLimit:3,ability:'Command Burst',flavor:'Leads spectral fleets.',intent:{min:7,max:12,style:'Command burst'}},
 singularity_core:{id:'singularity_core',name:'The Singularity Core',role:'Boss',rarity:'Boss',maxHp:78,die:d(3,6,8,2,2),overloadLimit:4,ability:'Event Horizon',flavor:'A broken star engine.',intent:{min:8,max:14,style:'Horizon rupture'}},
};

export const sectors: SectorDef[] = [
{id:1,name:'Drift Scrapfields',bossId:'scrap_baron',enemyPool:['zibling','scrap_skitter','rustback_beetle'],flavor:'Shattered freighters drift through electric fog.'},
{id:2,name:'Ion Nest',bossId:'plasma_broodmother',enemyPool:['plasma_moth','void_pup','lantern_wisp'],flavor:'Bioluminescent colonies charge the void.'},
{id:3,name:'Crushed Orbit',bossId:'gravity_maw',enemyPool:['grav_gobbler','iron_shell_snail','venom_sporeling'],flavor:'Gravity tides bend metal and bone.'},
{id:4,name:'Hollow Armada',bossId:'hollow_star_commander',enemyPool:['dice_mimic_drone','hollow_star_knight','crystal_quark'],flavor:'Ghost hulls patrol forgotten war lanes.'},
{id:5,name:'Core Verge',bossId:'singularity_core',enemyPool:['hollow_star_knight','dice_mimic_drone','crystal_quark'],flavor:'Reality thins around a caged sun.'},
];
