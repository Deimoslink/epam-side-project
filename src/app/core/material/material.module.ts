import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDividerModule,
  MatExpansionModule, MatFormFieldModule,
  MatGridListModule, MatIconModule, MatInputModule, MatListModule,
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
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
})
export class MaterialModule { }
