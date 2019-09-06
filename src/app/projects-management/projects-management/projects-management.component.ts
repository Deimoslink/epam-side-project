import {Component, OnInit, ViewChild} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {MatDialog, MatPaginator, PageEvent} from '@angular/material';
import {Subject} from 'rxjs';
import {debounceTime, map, scan, takeUntil, merge} from 'rxjs/operators';
import {Filters, PaginatedRequestQuery} from '../../shared/interfaces';
import {ApiService} from "../../shared/api.service";
import {AddEditProjectComponent} from '../add-edit-project/add-edit-project.component';

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
  private requests = new Subject<PaginatedRequestQuery>();

  public filterState: Filters = {};
  public readonly defaultSortOrder: Sort = {
    active: 'name',
    direction: 'asc'
  };

  public data: any[];
  public pageSize = 10;
  public totalElements = 0;
  public readonly COLUMNS = ['id', 'name', 'company', 'balance'];

  public loadingInProgress = false;

  constructor(private api: ApiService, public dialog: MatDialog) { }

  public sortChanged(sort: Sort) {
    this.sorting.next(sort);
  }

  public filterChanged(column: string, value: string) {
    this.filters.next({[column]: value});
  }

  public pageChanged(pageEvent: PageEvent) {
    this.pagination.next(pageEvent);
  }

  public editProject(item: any) {
    const dialogRef = this.dialog.open(AddEditProjectComponent, {
      width: '640px',
      height: 'calc(100vh - 8em)',
      minHeight: 'auto',
      maxHeight: 'auto',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
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
        this.loadingInProgress = true;
        this.api.getProjects(query).pipe(
          takeUntil(this.subscription)
        ).subscribe(res => {
          this.totalElements = parseInt(res.headers.get('X-Total-Count'));
          this.data = res.body;
          this.loadingInProgress = false;
        });
      })
    ).subscribe();

    this.requests.next({pageIndex: 0, pageSize: this.pageSize, filters: null, sort: this.defaultSortOrder});
  }

}
