import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatDividerModule,
  MatExpansionModule,
  MatGridListModule, MatListModule,
  MatRadioModule,
  MatSidenavModule
} from '@angular/material';


@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule
  ],
})
export class MaterialModule { }
