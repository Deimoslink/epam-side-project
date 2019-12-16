import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {PaginatedTablePage} from '../../shared/paginated-table-page';
import {MatDialog, Sort} from '@angular/material';
import {AddEditBusinessEntityComponent} from '../add-edit-business-entity/add-edit-business-entity.component';

@Component({
  selector: 'tdct-business-entities',
  templateUrl: './business-entities.component.html',
  styleUrls: ['./business-entities.component.scss']
})
export class BusinessEntitiesComponent extends PaginatedTablePage implements OnInit, OnDestroy {
  public readonly defaultSortOrder: Sort = {
    active: 'projectName',
    direction: 'asc'
  };
  public readonly COLUMNS = ['id', 'projectName', 'businessEntity', 'properties', 'functions'];
  public readonly PLACEHOLDERS = {
    'projectName': 'Project Name',
    'businessEntity': 'Business Entity',
    'properties': 'Properties',
    'functions': 'Functions'
  };

  constructor(public api: ApiService, public dialog: MatDialog) {
    super(api.getBusinessEntities)
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
      console.log('The dialog was closed', result);
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
      console.log('The dialog was closed', result);
    });
  }

}
