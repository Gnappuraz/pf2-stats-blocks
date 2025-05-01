import { StatBlock } from './types';

export interface Action {
  name: string;
  actionType: 'free' | 'reaction' | 'one' | 'two' | 'three' | 'passive';
  description: string;
}

export interface Ability {
  name: string;
  description: string;
}

export interface SpellLevel {
  level: number;
  spells: string[];
  atWill?: boolean;
  timesPerDay?: number;
}

export interface StatBlock {
  name: string;
  level: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'unique';
  alignment: string;
  size: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan';
  traits: string[];
  perception: string;
  languages: string[];
  skills: Record<string, number>;
  abilityScores: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  items: string;
  interactionAbilities: Ability[];
  ac: number;
  savingThrows: {
    fortitude: number;
    reflex: number;
    will: number;
  };
  hp: number;
  immunities: string[];
  resistances: string[];
  weaknesses: string[];
  automaticAbilities: Ability[];
  reactiveAbilities: Ability[];
  speed: string;
  abilities: Ability[];
  attacks: {
    melee: Array<{
      name: string;
      bonus: number;
      damage: string;
      traits: string[];
    }>;
    ranged: Array<{
      name: string;
      bonus: number;
      damage: string;
      range: number;
      traits: string[];
    }>;
  };
  spells: {
    tradition?: string;
    dc?: number;
    attack?: number;
    innate?: SpellLevel[];
    focus?: SpellLevel[];
    rituals?: SpellLevel[];
    prepared?: SpellLevel[];
  };
  actions: Action[];
}

export const defaultStatBlock: StatBlock = {
  name: 'Creature Name',
  level: 1,
  rarity: 'common',
  alignment: 'N',
  size: 'medium',
  traits: ['humanoid'],
  perception: '+5 (expert)',
  languages: ['Common'],
  skills: {
    Acrobatics: 5,
    Athletics: 3,
    Stealth: 5
  },
  abilityScores: {
    str: 0,
    dex: 2,
    con: 1,
    int: 0,
    wis: 1,
    cha: 0
  },
  items: 'shortsword, leather armor, explorer\'s pack',
  interactionAbilities: [],
  ac: 16,
  savingThrows: {
    fortitude: 5,
    reflex: 7,
    will: 4
  },
  hp: 20,
  immunities: [],
  resistances: [],
  weaknesses: [],
  automaticAbilities: [],
  reactiveAbilities: [],
  speed: '25 feet',
  abilities: [
    {
      name: 'Darkvision',
      description: 'The creature can see in darkness and dim light just as well as it can see in bright light, though its vision in darkness is in black and white.'
    }
  ],
  attacks: {
    melee: [
      {
        name: 'Shortsword',
        bonus: 7,
        damage: '1d6+2 piercing',
        traits: ['agile', 'finesse', 'versatile S']
      }
    ],
    ranged: []
  },
  spells: {},
  actions: [
    {
      name: 'Quick Jump',
      actionType: 'one',
      description: 'The creature Leaps up to 15 feet horizontally or 5 feet vertically without triggering reactions.'
    }
  ]
};