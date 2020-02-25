import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../shared/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeaheadSource} from '../../shared/interfaces';
import {Unsubscribe} from '../../shared/unsubscribe';
import {map, takeUntil} from 'rxjs/operators';
import {Page} from '../../core/interfaces/interfaces';

@Component({
  selector: 'tdct-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent extends Unsubscribe implements OnInit {
  public usersObservable: TypeaheadSource;

  public fg: FormGroup;

  constructor(private apiService: ApiService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddProjectModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super();

    this.fg = this.fb.group({
      name: new FormControl({value: '', disabled: false}, Validators.required),
      code: new FormControl({value: '', disabled: false}, Validators.required),
      owner: new FormControl({value: '', disabled: false}, Validators.required),
      manager: new FormControl({value: '', disabled: false}, Validators.required),
      baTeamMembers: new FormControl({value: null, disabled: false}),
      devTeamMembers: new FormControl({value: null, disabled: false}),
      qaTeamMembers: new FormControl({value: null, disabled: false}),
      additionalTeamMembers: new FormControl({value: null, disabled: false}),
    });

    this.usersObservable = (newQuery: string) => {
      return this.apiService.findUsersByName(newQuery).pipe(
          map((el: Page<any>) => {
            return el.content.map(user => {
              return {id: user.id, name: user.name}
            })
          })
      );
    };
  }

  public ngOnInit(): void {
    if (this.data) {
      this.fg.patchValue(this.data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const body = Object.assign({active: true}, JSON.parse(JSON.stringify(this.fg.getRawValue())));
    if (this.data && this.data.id) {
      body['id'] = this.data.id;
    }
    this.apiService.addProject(body).pipe(takeUntil(this.subscription)).subscribe(() => {
      this.dialogRef.close(body);
    });
  }

}
