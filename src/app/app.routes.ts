import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { environment } from 'src/environments/environment';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/starter',
        pathMatch: 'full',
      },
      {
        path: 'starter',
        loadChildren: () =>
          import('./starter/starter.module').then(m => m.StarterModule)
      },
      {
        path: 'admon',
        loadChildren: () => import('./admon/admon.module').then(m => m.AdmonModule)
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/starter',
  },
];
