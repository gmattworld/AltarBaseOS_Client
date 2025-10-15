import { Routes } from '@angular/router';
import { AuthRoutes } from './pages/auth/auth.routes';
import { ModularAuthGuard } from './infrastructure/guards/modular-auth.guard';
import { PublicRoutes } from './pages/public/public.routes';
import { MemberRoutes } from './pages/members/member.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'account', redirectTo: 'account/login', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'app/dashboard', pathMatch: 'full' },
  {
    path: '',
    children: PublicRoutes,
  },

  {
    path: 'account',
    children: AuthRoutes
  },
  {
    path: 'app',
    canActivate: [ModularAuthGuard],
    children: MemberRoutes
  },
  { path: '**', redirectTo: '' },
];
