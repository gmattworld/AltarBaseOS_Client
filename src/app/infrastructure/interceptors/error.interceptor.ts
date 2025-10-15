import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      // Skip handling if it's a refresh token request to prevent infinite loops
      if (req.url.includes('/auth/refresh')) {
        return throwError(() => err);
      }

      if (err.status === 401) {
        // Only logout if it's not a refresh token request and we don't have a refresh token
        const currentUser = authService.currentUserValue;
        if (!currentUser?.refresh_token) {
          authService.logout();
          router.navigate(['/auth/login']);
        }
      }

      if (err.status === 500) {
        router.navigate(['/500']);
      }

      // Return a consistent error format
      return throwError(() => ({
        error: err.error,
        status: err.status,
        message: err.error?.message || 'An error occurred',
      }));
    })
  );
};
