import {Component, Inject, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Unsubscribe} from '../../shared/unsubscribe';

@Component({
  selector: 'tdct-add-edit-business-entity',
  templateUrl: './add-edit-business-entity.component.html',
  styleUrls: ['./add-edit-business-entity.component.scss']
})
export class AddEditBusinessEntityComponent extends Unsubscribe implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditBusinessEntityComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { super(); }

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {

  }

}
