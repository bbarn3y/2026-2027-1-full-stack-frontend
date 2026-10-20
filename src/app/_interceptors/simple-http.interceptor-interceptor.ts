import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../_service/user.service';
import { catchError, throwError } from 'rxjs';

export const simpleHttpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);

  const authenticatedReq = userService.isLoggedIn() ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${userService.token()}`
    }
  }) : req;

  return next(authenticatedReq).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        userService.removeToken();
      }
      return throwError(err);
    })
  );

};
