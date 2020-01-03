import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface RCADialogData {
  type: string;
  msg: string;
  okAction: any;
  cancelAction: any;
}

@Component({
  selector: 'app-msg-dialog',
  templateUrl: './msg-dialog.component.html',
  styleUrls: ['./msg-dialog.component.css']
})
export class MsgDialogComponent {
  public get isWarning(): boolean { return this.data.type == 'warning'; }
  public get isError(): boolean { return this.data.type == 'error'; }
  public get isInfo(): boolean { return this.data.type == 'info'; }

  constructor(
    public dialogRef: MatDialogRef<MsgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RCADialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
    this.data.cancelAction()
  }

  onOKClick(): void {
    this.dialogRef.close();
    this.data.okAction();
  }
}
