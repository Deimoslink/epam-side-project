import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypeaheadComponent} from './typeahead.component';
import {PipesModule} from '../../core/pipes/pipes.module';
import {MaterialModule} from '../../core/material/material.module';

@NgModule({
  declarations: [
    TypeaheadComponent
  ],
  exports: [
    TypeaheadComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule
  ]
})
export class TypeaheadModule { }
