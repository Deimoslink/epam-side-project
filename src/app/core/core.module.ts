import {NgModule} from '@angular/core';
import {AuthModule} from './auth/auth.module';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppLogoComponent} from '../shared/app-logo/app-logo.component';
import {HttpClientModule} from '@angular/common/http';
import {FooterComponent} from '../shared/footer/footer.component';
import {HeaderComponent} from '../shared/header/header.component';



@NgModule({
  declarations: [
    AppLogoComponent,
    FooterComponent,
    HeaderComponent
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
    FooterComponent,
    HeaderComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CoreModule { }
