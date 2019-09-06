import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ListItem, TypeaheadSource} from '../../shared/interfaces';
import {ApiService} from '../../shared/api.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'tdct-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent {
  public user: ListItem;
  public usersObservable: TypeaheadSource;

  constructor(private apiService: ApiService,
              public dialogRef: MatDialogRef<AddEditProjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.usersObservable = (newQuery: string) => {
      return this.apiService.findUsers(newQuery)
        .pipe(
          map(users =>
            users.map((user: any) => ({
              id: user.id,
              text: user.name
            }))
          )
        );
    };

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
