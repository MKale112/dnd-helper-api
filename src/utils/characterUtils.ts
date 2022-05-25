import { calculateStatBonus } from './dndUtils';

interface ISavingThrows {
  strength: boolean;
  dexterity: boolean;
  constitution: boolean;
  intelligence: boolean;
  wisdom: boolean;
  charisma: boolean;
}

interface ISavingThrowsForClass {
  index: string;
  name: string;
  url: string;
}

// XXX:Researhc Record --> Marija said it is a TS cheatcode! Looks pretty useful as well
// Record<type of keys, type of values>
const propertyDict: Record<string, keyof ISavingThrows> = {
  str: 'strength',
  dex: 'dexterity',
  con: 'constitution',
  int: 'intelligence',
  wis: 'wisdom',
  cha: 'charisma',
};

export const embedSavingThrows = (saving_throws: ISavingThrowsForClass[]): ISavingThrows => {
  const shorthandSaves = saving_throws.map((item) => item.name.substring(item.name.length - 3).toLowerCase());

  const savingThrowObject: ISavingThrows = {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false,
  };

  shorthandSaves.forEach((item) => {
    let statName = propertyDict[item];
    savingThrowObject[statName] = true;
  });

  return savingThrowObject;
};

export const calculateInitialHP = (hit_die: number, level: number, constitution: number): number => {
  return (
    hit_die + calculateStatBonus(constitution) + (level - 1) * (hit_die / 2 + 1 + calculateStatBonus(constitution))
  );
};

export const calculateProfBonus = (level: number): number => {
  if (level < 5) return 2;
  else if (level >= 5 && level < 9) return 3;
  else if (level >= 9 && level < 13) return 4;
  else if (level >= 13 && level < 17) return 5;
  else return 6;
};
