import {Sort} from '@angular/material';

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
