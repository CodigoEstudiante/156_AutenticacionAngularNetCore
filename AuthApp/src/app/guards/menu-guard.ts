import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const menuGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  const currentUser = authService.currentUser();
  if (!currentUser) return router.createUrlTree(['/login'])

  const currentUrl = state.url;

  const hasPermission = currentUser.menus.some(menu => menu.link === currentUrl)
  if (hasPermission) return true;


  return router.createUrlTree(['/notfound']);
};
