import {NgModule} from '@angular/core';
import {HighlightPipe} from './highlight.pipe';
import {SortByFieldPipe} from './sort-by-field.pipe';
import {ExcludeListItemsPipe} from './exclude-list-items';

@NgModule({
  declarations: [
    HighlightPipe,
    SortByFieldPipe,
    ExcludeListItemsPipe
  ],
  exports: [
    HighlightPipe,
    SortByFieldPipe,
    ExcludeListItemsPipe
  ]
})
export class PipesModule { }
