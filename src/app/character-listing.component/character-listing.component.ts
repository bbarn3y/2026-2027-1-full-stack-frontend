import { Component, signal } from '@angular/core';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { CharacterCardComponent } from '../character-card.component/character-card.component';

@Component({
  imports: [CharacterCardComponent, NzEmptyComponent],
  selector: 'app-character-listing',
  styleUrl: './character-listing.component.less',
  templateUrl: './character-listing.component.html',
})
export class CharacterListingComponent {
  readonly characters = signal([{ name: 'Test Tamás' }, { name: 'Test Two' }]);

  selectCharacter(character: { name: string } ) {
    console.log(character);
  }
}
