import {Pipe, PipeTransform} from '@angular/core';

function escapeRegexp(queryToEscape: string): string {
  return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}

@Pipe({name: 'highlight'})
export class HighlightPipe implements PipeTransform {
  public transform(value: string, query: string): any {
    if (query.length < 1) {
      return value;
    }

    if ( query ) {
      const tagRE = new RegExp('<[^<>]*>', 'ig');
      const tagList = value.match( tagRE );
      const tmpValue = value.replace( tagRE, '$!$');
      value = tmpValue.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>');
      for (let i = 0; value.indexOf('$!$') > -1; i++) {
        if (tagList) {
          value = value.replace('$!$', tagList[i]);
        }
      }
    }
    return value;
  }

}
