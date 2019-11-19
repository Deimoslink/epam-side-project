import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessEntitiesComponent} from './business-entities/business-entities.component';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../core/core.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BusinessEntitiesComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [BusinessEntitiesComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
  ]
})
export class BusinessEntitiesModule { }
