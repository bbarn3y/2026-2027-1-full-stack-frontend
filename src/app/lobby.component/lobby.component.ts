import { Component, inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { UserService } from '../_service/user.service';
import { routeToLogin } from '../_helpers/routing.helper';
import { Router } from '@angular/router';
import { ClientService } from '../_service/client.service';
import { CharacterListingComponent } from '../character-listing.component/character-listing.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CharacterCreatorComponent } from '../character-creator/character-creator.component';

@Component({
  imports: [NzButtonComponent, NzModalModule, CharacterListingComponent],
  selector: 'app-lobby.component',
  styleUrl: './lobby.component.less',
  templateUrl: './lobby.component.html',
})
export class LobbyComponent {
  readonly clientService = inject(ClientService);
  readonly nzModalService = inject(NzModalService);
  readonly router: Router = inject(Router);
  readonly userService = inject(UserService);

  constructor() {
    // this.clientService.login().subscribe();
  }

  logout() {
    this.userService.removeToken();
    void routeToLogin(this.router);
  }

  openCharacterCreatorModal() {
    this.nzModalService.create({
      nzTitle: 'Character Creator',
      nzContent: CharacterCreatorComponent,
      nzFooter: null
    });
  }
}
