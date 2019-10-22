import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule
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
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatChipsModule
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
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatChipsModule
  ],
})
export class MaterialModule { }
