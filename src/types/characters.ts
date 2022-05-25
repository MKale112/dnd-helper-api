export enum CharacterGender {
  'MALE' = 'male',
  'FEMALE' = 'female',
  'OTHER' = 'other',
  'NONDISCLOSABLE' = 'nondisclosable',
}

export enum CharacterRace {
  'HUMAN' = 'human',
  'ELF' = 'elf',
  'DWARF' = 'dwarf',
  'HALFLING' = 'halfling',
  'ORC' = 'orc',
}

export interface CharacterCreationInput {
  playerId: string;
  characterName: string;
  gender: CharacterGender;
  race: CharacterRace;
  characterClass: string;
  level: number;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  weapon?: string;
  armor?: string;
  shield: boolean;
  bio?: string;
  wallet?: { cp: number; sp: number; gp: number };
}
