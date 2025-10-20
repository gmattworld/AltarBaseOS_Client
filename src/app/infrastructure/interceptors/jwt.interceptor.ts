import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { catchError, switchMap, throwError } from 'rxjs';

export const JWTInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const currentUser = authService.currentUserValue;
  const isLoggedIn = currentUser && currentUser.access_token;
  const isApiUrl = req.url.startsWith(environment.API_BASE_URL);

  if (isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${environment.TENANT_PUBLIC_KEY}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && isLoggedIn && currentUser.refresh_token) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Retry the original request with new token
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${authService.currentUserValue?.access_token}`,
              },
            });
            return next(newReq);
          }),
          catchError((refreshError) => {
            // If refresh fails, logout user
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
