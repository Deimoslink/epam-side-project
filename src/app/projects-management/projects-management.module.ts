import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsManagementComponent} from './projects-management/projects-management.component';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from "../core/core.module";
import {AddEditProjectComponent} from './add-edit-project/add-edit-project.component';

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
    ProjectsManagementComponent,
    AddEditProjectComponent
  ],
  entryComponents: [
    AddEditProjectComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
  ]
})
export class ProjectsManagementModule { }
