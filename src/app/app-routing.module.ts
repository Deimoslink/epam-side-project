import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', pathMatch: 'full',},
  {path: 'projects-management', loadChildren: './projects-management/projects-management.module#ProjectsManagementModule'},
  {path: 'business-entities', loadChildren: './business-entities/business-entities.module#BusinessEntitiesModule'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
