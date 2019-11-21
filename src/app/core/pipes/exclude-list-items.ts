import {Pipe, PipeTransform} from '@angular/core';
import {ListItem} from '../../shared/interfaces';


@Pipe({
  name: 'excludeListItems'
})
export class ExcludeListItemsPipe implements PipeTransform {
  transform(items: Array<ListItem>, itemsToExclude: Array<ListItem>) {
    return items && items.filter(item => !itemsToExclude.some(el => el && el.id === item.id));
  }
}
