import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import contactResolve from './contact/route/contact-routing-resolve.service';
import groupeResolve from './groupe/route/groupe-routing-resolve.service';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'Authorities' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */

  {
    path: 'contact',
    loadComponent: () => import('./contact/list/contact.component').then(m => m.ContactComponent),
    data: {
      authorities: ['ROLE_ADMIN'],
    },
    canActivate: [UserRouteAccessService],
  },

  {
    path: 'contact/new',
    loadComponent: () => import('./contact/update/contact-update.component').then(m => m.ContactUpdateComponent),
    resolve: {
      authority: contactResolve,
    },
    data: {
      authorities: ['ROLE_ADMIN'],
    },
    canActivate: [UserRouteAccessService],
  },

  {
    path: 'groupe',
    loadComponent: () => import('./groupe/list/groupe.component').then(m => m.GroupeComponent),
    data: {
      authorities: ['ROLE_ADMIN'],
    },
    canActivate: [UserRouteAccessService],
  },

  {
    path: 'groupe/new',
    loadComponent: () => import('./groupe/update/groupe-update.component').then(m => m.GroupeUpdateComponent),
    resolve: {
      authority: groupeResolve,
    },
    data: {
      authorities: ['ROLE_ADMIN'],
    },
    canActivate: [UserRouteAccessService],
  },
];

export default routes;
