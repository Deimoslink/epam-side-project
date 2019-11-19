import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {PaginatedTablePage} from '../../shared/paginated-table-page';
import {Sort} from '@angular/material';

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

  constructor(public api: ApiService) {
    super(api.getBusinessEntities)
  }

  public editBusinessEntity(element): void {
    console.log(element);
  }

  public addBusinessEntity(): void {
    console.log('new be');
  }

}
