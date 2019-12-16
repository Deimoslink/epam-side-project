import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsManagementComponent} from './projects-management/projects-management.component';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {AddProjectModalComponent} from './add-project-modal/add-project-modal.component';

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
    AddProjectModalComponent
  ],
  entryComponents: [
    AddProjectModalComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
  ]
})
export class ProjectsManagementModule { }
