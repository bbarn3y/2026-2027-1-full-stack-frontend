import { Component, inject, signal } from '@angular/core';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { CharacterCardComponent } from '../character-card.component/character-card.component';
import { CharacterService } from '../_service/character.service';

@Component({
  imports: [CharacterCardComponent, NzEmptyComponent],
  selector: 'app-character-listing',
  styleUrl: './character-listing.component.less',
  templateUrl: './character-listing.component.html',
})
export class CharacterListingComponent {
  private readonly characterService = inject(CharacterService);

  readonly characters = this.characterService.characters;

  selectCharacter(character: { name: string }) {
    console.log(character);
  }
}
