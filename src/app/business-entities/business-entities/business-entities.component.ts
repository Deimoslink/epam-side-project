import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {PaginatedTablePage} from '../../shared/paginated-table-page';
import {MatDialog, Sort} from '@angular/material';
import {AddEditBusinessEntityComponent} from '../add-edit-business-entity/add-edit-business-entity.component';
import {PaginatedRequestQuery} from '../../shared/interfaces';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'tdct-business-entities',
  templateUrl: './business-entities.component.html',
  styleUrls: ['./business-entities.component.scss']
})
export class BusinessEntitiesComponent extends PaginatedTablePage implements OnInit, OnDestroy {
  @ViewChild('projectName', {static: false}) projectName: ElementRef;
  public readonly defaultSortOrder: Sort = {
    active: 'projectName',
    direction: 'asc'
  };
  public readonly COLUMNS = ['id', 'project', 'name', 'properties', 'functions'];
  public readonly PLACEHOLDERS = {
    'project': 'Project Name',
    'name': 'Business Entity',
    'properties': 'Properties',
    'functions': 'Functions'
  };

  constructor(public api: ApiService, public dialog: MatDialog) {
    super()
  }

  public populateTable(query: PaginatedRequestQuery): void {
    this.api.getBusinessEntities(query).pipe(takeUntil(this.subscription))
        .subscribe(res => {
          console.log(res);
          this.totalElements = res.totalItems;
          this.data = res.content;
          this.loadingInProgress = false;
        });
  }

  public editBusinessEntity(item: any): void {
    const dialogRef = this.dialog.open(AddEditBusinessEntityComponent, {
      width: '640px',
      height: 'calc(100vh - 8em)',
      minHeight: 'auto',
      maxHeight: 'auto',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterChanged('projectName', result);
        this.projectName.nativeElement.value = result;
      }
    });
  }

  public addBusinessEntity(): void {
    const dialogRef = this.dialog.open(AddEditBusinessEntityComponent, {
      width: '640px',
      height: 'calc(100vh - 8em)',
      minHeight: 'auto',
      maxHeight: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterChanged('projectName', result);
        this.projectName.nativeElement.value = result;
      }
      console.log('The dialog was closed', result);
    });
  }

}
