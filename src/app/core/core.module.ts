import {NgModule} from '@angular/core';
import {AuthModule} from './auth/auth.module';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppLogoComponent} from '../shared/app-logo/app-logo.component';



@NgModule({
  declarations: [
    AppLogoComponent
  ],
  imports: [
    AuthModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AppLogoComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
