import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, finalize, of, tap } from 'rxjs';
import { ClientService } from '../_service/client.service';
import { UserService } from '../_service/user.service';
import { routeToLobby } from '../_helpers/routing.helper';

@Component({
  imports: [
    FormsModule,
    NzButtonModule,
    NzCardComponent,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  selector: 'app-login.component',
  styleUrl: './login.component.less',
  templateUrl: './login.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly clientService: ClientService = inject(ClientService);
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly userService: UserService = inject(UserService);

  readonly isLoading = signal(false);
  readonly loginForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    },
    { updateOn: 'blur' },
  );

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {}

  login() {
    // of({ token: 'LoginToken' })
    const doLogin$ = this.clientService.login();

    this.isLoading.set(true);
    doLogin$
      .pipe(
        tap((token) => console.log(token)),
        delay(3000),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (token: string) => {
          this.userService.saveToken(token);

          const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
          if (returnUrl && returnUrl.startsWith('/')) {
            void this.router.navigateByUrl(returnUrl);
          } else {
            routeToLobby(this.router);
          }
        },
        error: (err) => {
          console.log('Login failed:', err);
        },
      });
  }
}
