import {Component, OnInit, ViewChild} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {debounceTime, map, scan, takeUntil, merge} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'tdct-projects-management',
  templateUrl: './projects-management.component.html',
  styleUrls: ['./projects-management.component.scss']
})
export class ProjectsManagementComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private subscription = new Subject<void>();
  private filters = new Subject<any>();
  private pages = new Subject<PageEvent>();
  public pageSize = 10;
  private sorting = new Subject<any>();
  private requests = new ReplaySubject<any>();
  public filterState: any = {};
  public defaultSortOrder = {
    active: 'name',
    direction: 'asc'
  };


  public data: any[] = [];
  public totalElems = 0;
  public COLUMNS = ['id', 'name', 'company', 'balance'];

  public sortData(sort: Sort) {
    this.sorting.next(sort);
  }

  public filterChanged(column: string, value: string) {
    this.filters.next({[column]: value});
  }

  public pageChanged(pageEvent: PageEvent) {
    this.pages.next(pageEvent);
  }

  public getData(pageIndex, pageSize, sort, filters): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/data?_page=${pageIndex}&_limit=${pageSize}&_sort=${sort.active}&_order=${sort.direction}&${filters.join('&')}`, {observe: 'response'});
  }

  constructor(private readonly http: HttpClient) { }

  applyFilters(filters): string[] {
    if (filters) {
      return Object.keys(filters).map(filter => {
        return filters[filter] ? `${filter}_like=${filters[filter]}` : '';
      })
    } else {
      return [''];
    }
  }

  ngOnInit() {
    this.requests.pipe(
      takeUntil(this.subscription),
      merge(this.pages.pipe(
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
      scan((query: any, part: any) => ({...query, ...part}), {}),
      map(query => {
        this.getData(query.pageIndex + 1, query.pageSize, query.sort, this.applyFilters(query.filters)).subscribe(res => {
          this.totalElems = res.headers.get('X-Total-Count');
          this.data = res.body;
        });
      })
    ).subscribe();

    this.requests.next({pageIndex: 0, pageSize: this.pageSize, filters: null, sort: this.defaultSortOrder});
  }

}
