import { Router } from '@angular/router';
import { APP_ROUTES } from '../app.routes';

export function routeToLobby(router: Router) {
  return router.navigateByUrl(`/${APP_ROUTES.lobby}`);
}

export function routeToLogin(router: Router) {
  return router.navigateByUrl(`/${APP_ROUTES.login}`);
}
