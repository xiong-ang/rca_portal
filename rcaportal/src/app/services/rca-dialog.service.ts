import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RcaDialogComponent } from '../dialogs/rca-dialog/rca-dialog.component';
import { RcaDetailService } from './rca-detail.service';
import { RCAItem } from '@app/entities/rcaItem';

@Injectable({
  providedIn: 'root'
})
export class RcaDialogService {
  public operationRCAItem: RCAItem;

  constructor(public dialog: MatDialog) { }

  openCreateDialog(): void {
    this.operationRCAItem = new RCAItem();
    //TODO: Init necessary items

    const dialogRef = this.dialog.open(RcaDialogComponent, {
      width: '1000px',
      maxHeight: '800px',
      data: { title: 'Create a new RCA', rcaData: this.operationRCAItem }
    });

    dialogRef.afterClosed().subscribe(result => {
      //TODO: Insert data to DB
    });
  }

  openUpdateDialog(): void {
    //TODO: Get RCAItem by args

    const dialogRef = this.dialog.open(RcaDialogComponent, {
      width: '1000px',
      maxHeight: '800px',
      data: { title: 'Update RCA', rcaData: this.operationRCAItem }
    });

    dialogRef.afterClosed().subscribe(result => {
      //TODO: Update data to DB
    });
  }
}
