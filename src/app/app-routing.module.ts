import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoggedInGuard, LoggedOutGuard} from './core/auth/auth.guards';


const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    pathMatch: 'full'
  },
  {
    path: 'projects-management',
    loadChildren: './projects-management/projects-management.module#ProjectsManagementModule',
    canActivate: [LoggedInGuard]
  },
  {
    path: 'business-entities',
    loadChildren: './business-entities/business-entities.module#BusinessEntitiesModule',
    canActivate: [LoggedInGuard]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivate: [LoggedOutGuard]
  },
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
