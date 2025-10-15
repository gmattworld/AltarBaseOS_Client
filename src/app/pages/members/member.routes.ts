import { Routes } from "@angular/router";
import { AuthGuard } from "../../infrastructure/guards/auth.guard";

export const MemberRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import("./dashboard/dashboard.component").then(c => c.DashboardComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import("./profile/profile.component").then(c => c.ProfileComponent),
      },
      {
        path: 'giving',
        loadComponent: () => import("./giving/giving.component").then(c => c.GivingComponent),
      },
      // {
      //   path: 'verify-account',
      //   loadComponent: () => import("./verify-account/verify-account.component").then(c=>c.VerifyAccountComponent),
      // },
      // {
      //   path: 'forgot-password',
      //   loadComponent: () => import("./forgot-password/forgot-password.component").then(c=>c.ForgotPasswordComponent),
      // },
      // {
      //   path: 'verify-password-reset',
      //   loadComponent: () => import("./verify-password-reset/verify-password-reset.component").then(c=>c.VerifyPasswordResetComponent),
      // },
      // {
      //   canActivate: [AuthGuard],
      //   path: 'reset-password',
      //   loadComponent: () => import("./reset-password/reset-password.component").then(c=>c.ResetPasswordComponent),
      // },
    ]
  },
];
