import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthResolverService } from './auth/auth-resolver.service';
import { AccountResolverService } from './account/account-resolver.service';
import { AccountAndPropertiesAndComparablesResolverService } from './shared/services/account-and-properties-and-comparables-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  
  { path: 'auth',
    resolve: [AuthResolverService],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  
  { path: 'account',
    canActivate: [AuthGuard],
    resolve: [AccountResolverService],
    component:  AccountComponent
  },

  { path: 'properties',
    canActivate: [AuthGuard],
    resolve: [AccountAndPropertiesAndComparablesResolverService],
    loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule) },

  { path: 'comparables',
  canActivate: [AuthGuard],
  resolve: [AccountAndPropertiesAndComparablesResolverService],
    loadChildren: () => import('./comparables/comparables.module').then(m => m.ComparablesModule) },
  
  { path: 'not-found', 
    component: NotFoundComponent, 
    data: { 
      message: 'Unfortunately the page you\'re looking for isn\'t available to you, or doesn\'t exist.' 
    }
  },

  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    onSameUrlNavigation: 'reload',
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
