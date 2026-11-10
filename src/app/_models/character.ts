export class Character {
  readonly id = crypto.randomUUID();

  constructor(
      readonly name: string,
      readonly image: string,
      readonly characterClass: CharacterClass,
      readonly maxHp: number
  ) {}
}

export enum CharacterClass {
  MAGE = 'MAGE',
  ROGUE = 'ROGUE',
  WARRIOR = 'WARRIOR'
}

export interface CharacterDetail {
  maxHp: number;
  color: 'green' | 'red' | 'blue'
}

// Not every key is required: Partial<Record<CharacterClass, CharacterDetail>>
// Alternative for Record<CharacterClass, CharacterDetail>: { [k in CharacterClass]: CharacterDetail }
// Every key is required:
export const CharacterDetails: Record<CharacterClass, CharacterDetail> = {
  [CharacterClass.MAGE]: {
    maxHp: 6,
    color: 'blue'
  },
  [CharacterClass.ROGUE]: {
    maxHp: 8,
    color: 'green'
  },
  [CharacterClass.WARRIOR]: {
    maxHp: 12,
    color: 'red'
  },
} as const;

