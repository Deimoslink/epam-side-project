import {Sort} from '@angular/material';
import {Observable} from 'rxjs';

export interface Filters {
  [key: string]: string;
}

export interface PaginatedRequestQuery {
  pageIndex: number;
  pageSize: number;
  filters: Filters | null;
  sort: Sort;
}

export interface UrlParams {
  [key: string]: string;
}

export interface ListItem {
  id: number;
  [key: string]: any;
}

export type TypeaheadSource = (newQuery: string) => Observable<Array<ListItem>>;
