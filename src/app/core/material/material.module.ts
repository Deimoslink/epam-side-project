import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule,
  MatExpansionModule, MatFormFieldModule,
  MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatRadioModule,
  MatSidenavModule, MatSortModule, MatTableModule
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
    MatDialogModule
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
    MatDialogModule
  ],
})
export class MaterialModule { }
