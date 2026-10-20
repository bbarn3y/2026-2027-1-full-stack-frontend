import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../_service/user.service';
import { APP_ROUTES } from '../app.routes';

export const privateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.isLoggedIn()
    ? true
    : router.createUrlTree(['/', APP_ROUTES.login], {
      queryParams: { returnUrl: state.url }
    });
};
