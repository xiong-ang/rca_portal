import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RcaDialogComponent } from '../dialogs/rca-dialog/rca-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class RcaDialogService {

  constructor(public dialog: MatDialog) { }

  animal: string;
  name: string;
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(RcaDialogComponent, {
      width: '1000px',
      maxHeight: '800px',
      data: { title: 'Create a new RCA', name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(RcaDialogComponent, {
      width: '1000px',
      maxHeight: '800px',
      data: { title: 'Update RCA', name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
