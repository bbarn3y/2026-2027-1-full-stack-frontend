import { Component, inject, Input, input, output } from '@angular/core';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgTemplateOutlet } from '@angular/common';
import { Character } from '../_models/character';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CharacterCreatorComponent } from '../character-creator/character-creator.component';
import { CharacterService } from '../_service/character.service';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';

@Component({
  imports: [
    NzCardComponent,
    NzCardMetaComponent,
    NzIconModule,
    NgTemplateOutlet,
    NzPopconfirmDirective,
  ],
  selector: 'app-character-card',
  styleUrl: './character-card.component.less',
  templateUrl: './character-card.component.html',
})
export class CharacterCardComponent {
  // @Input() char

  character = input.required<Character>();
  characterSelected = output<Character>();

  private nzModalService = inject(NzModalService);
  characterService = inject(CharacterService);

  editCharacter(character: Character): void {
    this.nzModalService.create({
      nzTitle: `Edit ${character.name}`,
      nzContent: CharacterCreatorComponent,
      nzFooter: null,
      nzData: {
        character,
      },
    });
  }
}
