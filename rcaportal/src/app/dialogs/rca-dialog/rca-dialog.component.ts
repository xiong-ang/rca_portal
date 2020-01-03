import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RCAItem } from '@app/entities/rcaItem';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';

export interface RCADialogData {
  type: string;
  rcaData: RCAItem;
}

@Component({
  selector: 'app-rca-dialog',
  templateUrl: './rca-dialog.component.html',
  styleUrls: ['./rca-dialog.component.css']
})
export class RcaDialogComponent {
  public get isCreateMode(): boolean { return this.data.type == 'Create'; }
  public get dialogTitle(): string { return this.isCreateMode ? 'Create a new RCA' : 'Update RCA'; }
  public get testRCAData(): string { return JSON.stringify(this.data.rcaData); }
  constructor(
    public dialogRef: MatDialogRef<RcaDialogComponent>,
    private requestProxyService: RequestProxyService,
    @Inject(MAT_DIALOG_DATA) public data: RCADialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.dialogRef.close();

    //TODO: Get RCAItem -> data.rcaData

    this.requestProxyService.CreateRCA(this.data.rcaData);
  }

  onUpdateClick(): void {
    this.dialogRef.close();

    //TODO: Fetch RCAItem -> data.rcaData

    this.requestProxyService.UpdateRCA(this.data.rcaData.ID, this.data.rcaData);
  }
}
