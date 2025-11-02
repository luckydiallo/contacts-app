import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import GroupeResolve from './route/groupe-routing-resolve.service';

const groupeRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/groupe.component').then(m => m.GroupeComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/groupe-detail.component').then(m => m.GroupeDetailComponent),
    resolve: {
      groupe: GroupeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/groupe-update.component').then(m => m.GroupeUpdateComponent),
    resolve: {
      groupe: GroupeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/groupe-update.component').then(m => m.GroupeUpdateComponent),
    resolve: {
      groupe: GroupeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default groupeRoute;
