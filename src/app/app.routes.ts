import { Routes } from '@angular/router';
import { LoginComponent } from './login.component/login.component';
import { privateGuard } from './_guards/private.guard';
import { publicGuard } from './_guards/public.guard';

export const APP_ROUTES = {
  lobby: 'lobby',
  login: 'login',
  test: 'test',
} as const;
export const routes: Routes = [
  {
    path: APP_ROUTES.login,
    component: LoginComponent,
    canActivate: [publicGuard]
  },
  {
    path: APP_ROUTES.lobby,
    loadComponent: () => import('./lobby.component/lobby.component').then((c => c.LobbyComponent)),
    canActivate: [privateGuard],
    canActivateChild: [privateGuard]
  },
  {
    path: APP_ROUTES.test,
    loadComponent: () => import('./lobby.component/lobby.component').then((c => c.LobbyComponent)),
    canActivate: [privateGuard],
    canActivateChild: [privateGuard]
  },
  {
    path: '',
    redirectTo: `/${APP_ROUTES.login}`,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: `/${APP_ROUTES.login}`,
  },
];
