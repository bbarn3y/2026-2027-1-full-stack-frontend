import { Component, computed, inject, signal } from '@angular/core';
import { Character, CharacterClass } from '../_models/character';
import { form, FormField, max, min, required, validate } from '@angular/forms/signals';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ValidatorService } from '../_service/validator.service';
import { CharacterService } from '../_service/character.service';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrls: ['./character-creator.component.less'],
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    FormField,
    NzSelectComponent,
    NzOptionComponent,
    NzInputNumberComponent,
    NzButtonComponent,
  ],
})
export class CharacterCreatorComponent {
  private readonly characterService = inject(CharacterService);
  private readonly validatorService = inject(ValidatorService);

  private readonly nzModalData: { character?: Character } = inject(NZ_MODAL_DATA, {
    optional: true,
  });
  private readonly nzModalRef = inject(NzModalRef);

  private readonly characterToModify = this.nzModalData?.character ?? null;

  private readonly characterModel = signal<Omit<Character, 'id'>>({
    name: this.characterToModify?.name ?? '',
    image: this.characterToModify?.image ?? '',
    characterClass: this.characterToModify?.characterClass ?? CharacterClass.MAGE,
    maxHp: this.characterToModify?.maxHp ?? 1,
  });

  readonly characterForm = form(this.characterModel, (path) => {
    (required(path.name, { message: 'Please provide a name!' }),
      validate(path.name, (context) => this.validatorService.fullNameValidator(context.value())),
      required(path.image, { message: 'Please provide a image path!' }),
      required(path.characterClass, { message: 'Please provide a character class!' }),
      required(path.maxHp, { message: 'Please provide a maximum HP!' }),
      min(path.maxHp, 1, { message: 'The max HP must be at least 1!' }),
      max(path.maxHp, 12, { message: 'The max HP must be at most 12!' }),
      validate(path, ({ value }) => this.validatorService.maxHpByClassValidator(value())));
  });

  readonly maxHpErrors = computed(() => [
    ...this.characterForm.maxHp().errors(),
    ...this.characterForm().errors(),
  ]);

  saveCharacter(event: Event) {
    event.preventDefault();

    const character = this.characterModel();

    if (this.characterToModify) {
      this.characterService.editCharacter(this.characterToModify.id, character);
    } else {
      this.characterService.addCharacter(
        new Character(character.name, character.image, character.characterClass, character.maxHp),
      );
    }

    this.nzModalRef?.close();
  }

  protected readonly CharacterClass = CharacterClass;
}
