import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  animal: string;
  name: string;
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
