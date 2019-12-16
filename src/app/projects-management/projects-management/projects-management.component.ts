import {Component, OnDestroy, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {MatDialog} from '@angular/material';
import {ApiService} from "../../shared/api.service";
import {AddProjectModalComponent} from "../add-project-modal/add-project-modal.component";
import {PaginatedTablePage} from '../../shared/paginated-table-page';

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
  public readonly COLUMNS = ['id', 'projectName', 'projectCode', 'projectOwner.name', 'projectManager.name'];
  public readonly PLACEHOLDERS = {
    'projectName': 'Project Name',
    'projectCode': 'Project Code',
    'projectOwner.name': 'Project Owner',
    'projectManager.name': 'Project Manager'
  };

  constructor(public api: ApiService, public dialog: MatDialog) {
    super(api.getProjects)
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
      console.log('The dialog was closed', result);
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
      console.log('The dialog was closed', result);
    });
  }

}
