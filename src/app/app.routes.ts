import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      // import('./gifs/pages/dashboard-page/dashboard-page.component').then(c => c.DashboardPageComponent)
      import('./gifs/pages/dashboard-page/dashboard-page.component'),

    children: [
      {
        path: 'treanding',
        loadComponent: () =>
          import('./gifs/pages/treanding-page/treanding-page.component')
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search-page/search-page.component')
      },
      {
        path: 'history/:queryData',
        loadComponent: () =>
          import('./gifs/pages/gifs-history/gifs-history.component')
      },
      {
        path: '**',
        redirectTo: 'treanding'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
