import { Injectable, signal } from '@angular/core';
import { Character, CharacterClass } from '../_models/character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly characterStorageKey = 'characters';

  private readonly _characters = signal<readonly Character[]>(this.readCharactersFromStorage());
  readonly characters = this._characters.asReadonly();

  constructor() {}

  addCharacter(character: Character): void {
    this._characters.update((characters) => [...characters, character]);
    this.saveCharactersToStorage(this.characters());
  }

  // @note To exclude multiple fields from the type: Omit<Character, 'id' | 'name' | 'maxHp'>
  editCharacter(id: string, changes: Omit<Character, 'id'>): void {
    this._characters.update((characters) =>
      characters.map((c) => (c.id === id ? { ...changes, id } : c)),
    );
    this.saveCharactersToStorage(this.characters());
  }

  removeCharacter(id: string): void {
    this._characters.update((characters) => characters.filter((c) => c.id !== id));
    this.saveCharactersToStorage(this.characters());
  }

  private readCharactersFromStorage(): Character[] {
    // Mock
    // return [
    //   new Character('Mage Máté', '/classes/mage.webp', CharacterClass.MAGE, 4),
    //   new Character('Rogue Rozália', '/classes/rogue.webp', CharacterClass.ROGUE, 8),
    //   new Character('Warrior Vazul', '/classes/warrior.webp', CharacterClass.WARRIOR, 11),
    // ];

    // Real solution
    try {
      const storageString = localStorage.getItem(this.characterStorageKey);
      if (storageString === null) {
        return [];
      }

      const storedCharacters: unknown = JSON.parse(storageString);
      return Array.isArray(storedCharacters) && storedCharacters.every(this.isCharacter)
        ? storedCharacters
        : [];
    } catch {
      return [];
    }
  }

  private isCharacter(value: unknown): value is Character {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const character = value as Record<string, unknown>;
    return (
      typeof character['id'] === 'string' &&
      character['id'].length > 0 &&
      typeof character['name'] === 'string' &&
      typeof character['image'] === 'string' &&
      Object.values(CharacterClass).some(
        (characterClass) => characterClass === character['characterClass'],
      ) &&
      typeof character['maxHp'] === 'number' &&
      Number.isFinite(character['maxHp'])
    );
  }

  private saveCharactersToStorage(characters: readonly Character[]): void {
    localStorage.setItem(this.characterStorageKey, JSON.stringify(characters));
  }
}
