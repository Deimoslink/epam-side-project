import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoggedInGuard, LoggedOutGuard} from './core/auth/auth.guards';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import ('./dashboard/dashboard.module').then(m => m.DashboardModule),
    pathMatch: 'full'
  },
  {
    path: 'projects-management',
    loadChildren: () => import ('./projects-management/projects-management.module').then(m => m.ProjectsManagementModule),
    canLoad: [LoggedInGuard],
    canActivate: [LoggedInGuard]
  },
  {
    path: 'business-entities',
    loadChildren: () => import ('./business-entities/business-entities.module').then(m => m.BusinessEntitiesModule),
    canLoad: [LoggedInGuard],
    canActivate: [LoggedInGuard]
  },
  {
    path: 'login',
    loadChildren: () => import ('./login/login.module').then(m => m.LoginModule),
    canLoad: [LoggedOutGuard],
    canActivate: [LoggedOutGuard]
  },
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
