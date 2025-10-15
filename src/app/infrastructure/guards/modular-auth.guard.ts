import { inject, PLATFORM_ID } from '@angular/core';
import { Router, type CanActivateChildFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const ModularAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const platformId: Object = inject(PLATFORM_ID)
  if (isPlatformBrowser(platformId)) {
    const authService = inject(AuthService);
    const router = inject(Router)

    const currentUser = authService.currentUserValue;
    if (!currentUser) {
      router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // if (!currentUser?.data.is_verified){
    //   localStorage.setItem('registration_public_key', currentUser.data.public_key)
    //   router.navigate(['/auth/verify-account']);
    //   return false;
    // }

    // if (!currentUser?.data.is_preference_configured){
    //   router.navigate(['/auth/preferences']);
    //   return false;
    // }

    return true;
  }

  return false;
};
