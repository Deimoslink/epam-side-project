import {Component, OnDestroy, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {MatDialog} from '@angular/material';
import {ApiService} from "../../shared/api.service";
import {AddProjectModalComponent} from "../add-project-modal/add-project-modal.component";
import {PaginatedTablePage} from '../../shared/paginated-table-page';
import {PaginatedRequestQuery} from '../../shared/interfaces';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'tdct-projects-management',
  templateUrl: './projects-management.component.html',
  styleUrls: ['./projects-management.component.scss']
})
export class ProjectsManagementComponent extends PaginatedTablePage implements OnInit, OnDestroy {
  public readonly defaultSortOrder: Sort = {
    active: 'name',
    direction: 'asc'
  };
  public readonly COLUMNS = ['id', 'name', 'code', 'owner.name', 'manager.name'];
  public readonly PLACEHOLDERS = {
    'name': 'Project Name',
    'code': 'Project Code',
    'owner.name': 'Project Owner',
    'manager.name': 'Project Manager'
  };

  constructor(public api: ApiService, public dialog: MatDialog) {
    super()
  }

  public populateTable(query: PaginatedRequestQuery): void {
    this.api.getProjects(query).pipe(takeUntil(this.subscription))
    .subscribe(res => {
        console.log(res);
        this.totalElements = res.totalItems;
        this.data = res.content;
        this.loadingInProgress = false;
    });
  }

  public editProject(item: any) {
    const dialogRef = this.dialog.open(AddProjectModalComponent, {
      width: '640px',
      height: 'calc(100vh - 8em)',
      minHeight: 'auto',
      maxHeight: 'auto',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh.next();
    });
  }

  public addProject() {
    const dialogRef = this.dialog.open(AddProjectModalComponent, {
      width: '640px',
      height: 'calc(100vh - 8em)',
      minHeight: 'auto',
      maxHeight: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh.next();
    });
  }

}
