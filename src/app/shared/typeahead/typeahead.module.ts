import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypeaheadComponent} from './typeahead.component';
import {PipesModule} from '../../core/pipes/pipes.module';
import {MaterialModule} from '../../core/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TypeaheadComponent
  ],
  exports: [
    TypeaheadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    MaterialModule
  ]
})
export class TypeaheadModule { }
