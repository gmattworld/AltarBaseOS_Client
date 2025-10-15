import { Routes } from '@angular/router';

export const PublicRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./services/services.component').then(
            (m) => m.ServicesComponent
          ),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./events/events.component').then(
            (m) => m.EventsComponent
          ),
      },
      {
        path: 'ministries',
        loadComponent: () =>
          import('./ministries/ministries.component').then(
            (m) => m.MinistriesComponent
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
      {
        path: 'visit',
        loadComponent: () =>
          import('./visit/visit.component').then(
            (m) => m.VisitComponent
          ),
      },
      {
        path: 'giving',
        loadComponent: () =>
          import('./giving/giving.component').then(
            (m) => m.GivingComponent
          ),
      },
    ],
  },
];
