import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsManagementComponent} from './projects-management/projects-management.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProjectsManagementComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    ProjectsManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProjectsManagementModule { }
