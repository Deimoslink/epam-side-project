import {Component, Inject, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Unsubscribe} from '../../shared/unsubscribe';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../shared/api.service';
import {TypeaheadSource} from '../../shared/interfaces';

@Component({
  selector: 'tdct-add-edit-business-entity',
  templateUrl: './add-edit-business-entity.component.html',
  styleUrls: ['./add-edit-business-entity.component.scss']
})
export class AddEditBusinessEntityComponent extends Unsubscribe implements OnInit {
  public projectsObservable: TypeaheadSource;
  public fg: FormGroup;
  public redirectAvailable = false;

  constructor(private apiService: ApiService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddEditBusinessEntityComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super();

    this.fg = this.fb.group({
      businessEntity: new FormControl({value: '', disabled: false}, Validators.required),
      project: new FormControl({value: '', disabled: false}, Validators.required)
    });

    this.projectsObservable = (newQuery: string) => {
      return this.apiService.findProjects(newQuery);
    };

  }

  public functions: Array<string> = [];
  public properties: Array<string> = [];

  public excludeFunction(item: string) {
    const index = this.functions.findIndex(el => el === item);
    this.functions.splice(index, 1);
  }

  public addFunction(input: HTMLInputElement) {
    if (input.value) {
      this.functions.push(input.value);
    }
    input.value = '';
  }

  public excludeProperty(item: string) {
    const index = this.properties.findIndex(el => el === item);
    this.properties.splice(index, 1);
  }

  public addProperty(input: HTMLInputElement) {
    if (input.value) {
      this.properties.push(input.value);
    }
    input.value = '';
  }

  setFormValues(): void {
    this.projectsObservable(this.data.projectName).subscribe(res => {
      this.fg.controls['project'].setValue(res);
    });
    this.fg.controls['businessEntity'].setValue(this.data.businessEntity);
    this.functions = this.data.functions;
    this.properties = this.data.properties;
  }

  ngOnInit() {
    if (this.data) {
      this.setFormValues();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const body = {
      projectName: this.fg.controls['project'].value.projectName,
      businessEntity: this.fg.controls['businessEntity'].value,
      properties: this.properties,
      functions: this.functions
    };
    this.apiService.addBusinessEntity(body)
      .pipe(takeUntil(this.subscription))
      .subscribe(() => {
      this.redirectAvailable = true;
    });
  }

  applyFilter(): void {
    this.dialogRef.close(this.fg.controls['project'].value.projectName)
  }

}
