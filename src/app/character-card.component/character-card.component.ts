import { Component, Input, input, output } from '@angular/core';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  imports: [NzCardComponent, NzCardMetaComponent, NzIconModule, NgTemplateOutlet],
  selector: 'app-character-card',
  styleUrl: './character-card.component.less',
  templateUrl: './character-card.component.html',
})
export class CharacterCardComponent {
  // @Input() char

  character = input.required<{ name: string }>();
  characterSelected = output<{ name: string }>();
}
