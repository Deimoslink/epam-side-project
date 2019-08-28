import {Component, OnInit, ViewChild} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {debounceTime, map, scan, takeUntil, merge} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

export enum OrderDirections {
  ascending = 'asc',
  descending = 'desc'
}

export interface Sort {
  active: string;
  direction: OrderDirections;
}

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

@Component({
  selector: 'tdct-projects-management',
  templateUrl: './projects-management.component.html',
  styleUrls: ['./projects-management.component.scss']
})
export class ProjectsManagementComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription = new Subject<void>();
  private filters = new Subject<Filters>();
  private pagination = new Subject<PageEvent>();
  private sorting = new Subject<Sort>();
  private requests = new ReplaySubject<PaginatedRequestQuery>();

  public filterState: Filters = {};
  public defaultSortOrder: Sort = {
    active: 'name',
    direction: 'asc'
  };

  public data: any[];
  public pageSize = 10;
  public totalElements = 0;
  public readonly COLUMNS = ['id', 'name', 'company', 'balance'];

  constructor(private readonly http: HttpClient) { }

  public sortChanged(sort: Sort) {
    this.sorting.next(sort);
  }

  public filterChanged(column: string, value: string) {
    this.filters.next({[column]: value});
  }

  public pageChanged(pageEvent: PageEvent) {
    this.pagination.next(pageEvent);
  }

  private queryToParams(query: PaginatedRequestQuery): UrlParams {
    const pageIndex: number = query.pageIndex + 1;
    const pageSize: number = query.pageSize;
    const sort: Sort = query.sort;
    const filters: Filters = {};
    if (query.filters) {
      Object.keys(query.filters).map(filter => {
        if (query.filters[filter]) {
          filters[filter + '_like'] = query.filters[filter];
        }
      })
    }
    return Object.assign({
      _page: pageIndex.toString(),
      _limit: pageSize.toString(),
      _sort: sort.active,
      _order: sort.direction
    }, filters);
  }

  public getData(query: PaginatedRequestQuery): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/data`,
      {
        observe: 'response',
        params: this.queryToParams(query)
      });
  }

  ngOnInit() {
    this.requests.pipe(
      takeUntil(this.subscription),
      merge(this.pagination.pipe(
        map(pageEvent => ({pageIndex: pageEvent.pageIndex, pageSize: pageEvent.pageSize}))
      )),
      merge(this.filters.pipe(
        debounceTime(300),
        map(filter => {
          this.filterState = Object.assign(this.filterState, filter);
          this.paginator.firstPage();
          return this.filterState;
        }),
        map(filter => ({filters: filter, pageIndex: 0}))
      )),
      merge(this.sorting.pipe(
        map(sorting => ({sort: sorting}))
      )),
      scan((query: PaginatedRequestQuery, part) => ({...query, ...part}), {}),
      map((query: PaginatedRequestQuery) => {
        this.getData(query).subscribe(res => {
          this.totalElements = res.headers.get('X-Total-Count');
          this.data = res.body;
        });
      })
    ).subscribe();

    this.requests.next({pageIndex: 0, pageSize: this.pageSize, filters: null, sort: this.defaultSortOrder});
  }

}
