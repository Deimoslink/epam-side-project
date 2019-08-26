import {NgModule} from '@angular/core';
import {AuthModule} from './auth/auth.module';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppLogoComponent} from '../shared/app-logo/app-logo.component';
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    AppLogoComponent
  ],
  imports: [
    AuthModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    AppLogoComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CoreModule { }
