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
openDialog(): void {
  const dialogRef = this.dialog.open(RcaDialogComponent, {
    width: '800px',
    minWidth:'800px',
    maxHeight:'800px',
    data: {title:'Create a new anomaly', name: this.name, animal: this.animal}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.animal = result;
  });
}

}
