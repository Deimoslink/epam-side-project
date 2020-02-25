import {OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent, Sort} from '@angular/material';
import {Subject} from 'rxjs';
import {Filters, PaginatedRequestQuery} from './interfaces';
import {debounceTime, map, merge, scan, takeUntil, tap} from 'rxjs/operators';
import {Unsubscribe} from './unsubscribe';

export abstract class PaginatedTablePage extends Unsubscribe implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private filters = new Subject<Filters>();
  private pagination = new Subject<PageEvent>();
  private sorting = new Subject<Sort>();
  private requests = new Subject<PaginatedRequestQuery>();

  public filterState: Filters = {};
  public readonly defaultSortOrder: Sort;

  public data: Array<any>;
  public pageSize = 10;
  public totalElements = 0;
  public readonly COLUMNS;
  public readonly PLACEHOLDERS;

  public loadingInProgress = false;
  protected refresh = new Subject<void>();

  protected constructor() {super()}

  public sortChanged(sort: Sort) {
    this.sorting.next(sort);
  }

  public filterChanged(column: string, value: string) {
    this.filters.next({[column]: value});
  }

  public pageChanged(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.pagination.next(pageEvent);
  }

  protected abstract populateTable(query: PaginatedRequestQuery): void;

  ngOnInit() {
    this.requests.pipe(
      takeUntil(this.subscription),
      merge(this.refresh),
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
      scan((query: PaginatedRequestQuery, part) => ({...query, ...part}), {} as PaginatedRequestQuery),
      map((query: PaginatedRequestQuery) => {
        this.loadingInProgress = true;
        this.populateTable(query);
      })
    ).subscribe();

    this.requests.next({pageIndex: 0, pageSize: this.pageSize, filters: null, sort: this.defaultSortOrder});
  }

}
