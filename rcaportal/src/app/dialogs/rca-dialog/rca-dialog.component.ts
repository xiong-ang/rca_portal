import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RCAItem } from '@app/entities/rcaItem';

export interface DialogData {
  title: string;
  rcaData: RCAItem;
}

@Component({
  selector: 'app-rca-dialog',
  templateUrl: './rca-dialog.component.html',
  styleUrls: ['./rca-dialog.component.css']
})
export class RcaDialogComponent implements OnInit {
  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<RcaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onApplyClick(): void {
    this.dialogRef.close();
  }
}
