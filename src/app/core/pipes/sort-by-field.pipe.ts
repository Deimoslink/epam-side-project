import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortByField'
})

export class SortByFieldPipe implements PipeTransform {

  transform(array: Array<any> = [], fieldName: string, backwards?: boolean): Array<any> {
    return array.sort((a: any, b: any) => {
      if (a[fieldName] < b[fieldName]) {
        return backwards ? 1 : -1;
      } else if (a[fieldName] > b[fieldName]) {
        return backwards ? -1 : 1;
      } else {
        return 0;
      }
    });
  }
}
