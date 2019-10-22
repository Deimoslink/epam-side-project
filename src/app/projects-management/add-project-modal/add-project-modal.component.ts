import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../shared/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material";

export interface Chip {
  name: string;
}

@Component({
  selector: 'tdct-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent {
  public controls = [];

  public fg: FormGroup;

  constructor(private apiService: ApiService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddProjectModalComponent>) {

    this.fg = this.fb.group({
      projectName: new FormControl({value: '', disabled: false}, Validators.required),
    });
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

  onSave(): void {
    this.dialogRef.close(this.fg.getRawValue());
  }

}
