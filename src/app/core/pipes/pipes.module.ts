import {NgModule} from '@angular/core';
import {HighlightPipe} from './highlight.pipe';
import {SortByFieldPipe} from './sort-by-field.pipe';

@NgModule({
  declarations: [
    HighlightPipe,
    SortByFieldPipe
  ],
  exports: [
    HighlightPipe,
    SortByFieldPipe
  ]
})
export class PipesModule { }
