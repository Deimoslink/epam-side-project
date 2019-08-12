import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {CoreModule} from "../core/core.module";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
