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
import { Router } from '@angular/router';
import { delay, of, tap } from 'rxjs';

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
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  readonly isLoading = signal(false);
  readonly loginForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    },
    { updateOn: 'blur' },
  );

  constructor(private router: Router) {}

  login() {
    this.isLoading.set(true)
    of({ token: 'LoginToken' })
      .pipe(
        tap((value) => console.log(value.token)),
        delay(3000),
      )
      .subscribe((value) => {
        this.isLoading.set(false);
      });
  }
}
