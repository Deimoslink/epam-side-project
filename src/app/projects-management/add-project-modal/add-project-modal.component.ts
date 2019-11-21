import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../shared/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material";
import {ListItem, TypeaheadSource} from '../../shared/interfaces';
import {map, takeUntil} from 'rxjs/operators';
import {Unsubscribe} from '../../shared/unsubscribe';

export interface Chip {
  name: string;
}

@Component({
  selector: 'tdct-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent extends Unsubscribe {
  public usersObservable: TypeaheadSource;

  public fg: FormGroup;

  constructor(private apiService: ApiService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddProjectModalComponent>) {
    super();

    this.fg = this.fb.group({
      projectName: new FormControl({value: '', disabled: false}, Validators.required),
      projectCode: new FormControl({value: '', disabled: false}, Validators.required),
      projectOwner: new FormControl({value: '', disabled: false}, Validators.required),
      projectManager: new FormControl({value: '', disabled: false}, Validators.required),
      teamBA: new FormControl({value: null, disabled: false}),
      teamDEV: new FormControl({value: null, disabled: false}),
      teamQA: new FormControl({value: null, disabled: false}),
      teamOther: new FormControl({value: null, disabled: false}),
    });

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

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public businessEntities: Chip[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.businessEntities.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove(be: Chip): void {
    const index = this.businessEntities.indexOf(be);
    if (index >= 0) {
      this.businessEntities.splice(index, 1);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  transformFormat(obj: ListItem): any {
    obj['name'] = obj.text;
    delete obj.text;
  }

  onSave(): void {
    const body = JSON.parse(JSON.stringify(this.fg.getRawValue()));
    this.transformFormat(body.projectManager);
    this.transformFormat(body.projectOwner);
    body.teamBA.map(member => this.transformFormat(member));
    body.teamDEV.map(member => this.transformFormat(member));
    body.teamQA.map(member => this.transformFormat(member));
    body.teamOther.map(member => this.transformFormat(member));
    this.apiService.addProject(body).pipe(takeUntil(this.subscription)).subscribe(() => {
      this.dialogRef.close(body);
    });
  }

}
