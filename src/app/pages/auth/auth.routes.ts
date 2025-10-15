import { Routes } from "@angular/router";
import { AuthGuard } from "../../infrastructure/guards/auth.guard";

export const AuthRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import("./login/login.component").then(c=>c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import("./register/register.component").then(c=>c.RegisterComponent),
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
