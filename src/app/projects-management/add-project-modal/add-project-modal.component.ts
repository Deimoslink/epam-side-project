import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../shared/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeaheadSource} from '../../shared/interfaces';
import {Unsubscribe} from '../../shared/unsubscribe';
import {takeUntil} from 'rxjs/operators';

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
      projectName: new FormControl({value: '', disabled: false}, Validators.required),
      projectCode: new FormControl({value: '', disabled: false}, Validators.required),
      projectOwner: new FormControl({value: '', disabled: false}, Validators.required),
      projectManager: new FormControl({value: '', disabled: false}, Validators.required),
      teamBA: new FormControl({value: null, disabled: false}),
      teamDev: new FormControl({value: null, disabled: false}),
      teamQA: new FormControl({value: null, disabled: false}),
      teamOther: new FormControl({value: null, disabled: false}),
    });

    this.usersObservable = (newQuery: string) => {
      return this.apiService.findUsers(newQuery);
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
    const body = JSON.parse(JSON.stringify(this.fg.getRawValue()));
    this.apiService.addProject(body).pipe(takeUntil(this.subscription)).subscribe(() => {
      this.dialogRef.close(body);
    });
  }

}
