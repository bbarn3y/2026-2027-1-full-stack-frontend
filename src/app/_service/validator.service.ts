import { Injectable } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { CharacterClass, CharacterDetails } from '../_models/character';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {

  fullNameValidator(value: string): ValidationError | null {
    return value && value.trim().split(/\s+/).length !== 2
      ? { kind: 'invalidFullName', message: 'The name must consist of exactly two words!' }
      : null;
  }

  maxHpByClassValidator(value: { characterClass: CharacterClass, maxHp: number}): ValidationError | null {
    const limit = CharacterDetails[value.characterClass].maxHp;
    return value.maxHp !== null && value.maxHp > limit
      ? {
          kind: 'invalidMaxHpForClass',
          message: `The maxHp must be ${limit} characters!`
        }
      : null;
  }

}
