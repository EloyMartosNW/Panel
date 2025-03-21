import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  console.log(AuthService.getAuthToken());
  if (AuthService.getAuthToken() === null) {
    router.navigate(['/auth/login'], { replaceUrl: true });
    return false;
  }
  return true;
};
