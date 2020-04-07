import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RcaDialogComponent } from '../dialogs/rca-dialog/rca-dialog.component';
import { RcaDetailService } from './rca-detail.service';
import { RCAItem } from '@app/entities/rcaItem';
import { HttpRequesterService } from './httpRequest/http-requester.service';
import { HttpRequesterMockService } from './httpRequest/http-requester.mock.service';
import { HotRCAsDialogComponent } from '@app/dialogs/hotRCAs-Dialog/hotRCAs-Dialog.component';
import { AuthenticationService } from './authentication.service';
import { MsgDialogComponent } from '@app/dialogs/msg-dialog/msg-dialog.component';
import { RequestProxyService } from './httpRequest/request-proxy.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RcaDialogService {
  constructor(public dialog: MatDialog,
              private requestProxyService: RequestProxyService) { }
  createDialogOpen = false;
  updateDialogOpen = false;
  deleteDialogOpen = false;

  openCreateDialog(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.createDialogOpen) {
        resolve();
      }

      const dialogRef = this.dialog.open(RcaDialogComponent, {
        width: '1000px',
        maxHeight: '800px',
        disableClose: true,
        data: {
          type: 'Create',
          okAction: () => {
            this.createDialogOpen = false;
            resolve(true);
          },
          cancelAction: () => {
            this.createDialogOpen = false;
            resolve(false);
          }
        }
      });
      this.createDialogOpen = true;
      dialogRef.afterClosed().subscribe(() => {
        this.createDialogOpen = false;
      });
    });
  }

  openUpdateDialog(RCAID: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.updateDialogOpen) {
        resolve();
      }
      const dialogRef = this.dialog.open(RcaDialogComponent, {
        width: '1000px',
        maxHeight: '800px',
        disableClose: true,
        data: {
          type: 'Update',
          rcaID: RCAID,
          okAction: () => {
            resolve(true);
          },
          cancelAction: () => {
            resolve(false);
          }
        }
      });
      this.updateDialogOpen = true;
      dialogRef.afterClosed().subscribe(() => {
        this.updateDialogOpen = false;
      });
    });
  }

  openDeleteDialog(rcaID: string, RCAID: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.deleteDialogOpen) {
        resolve();
      }
      this.openMsgDialog('warning', `Do you want to delete RCA ${RCAID} ?`).then(
        (bOk) => {
          this.deleteDialogOpen = false;
          if (bOk) {
            this.requestProxyService.DeleteRCA(rcaID).then((successed) => {
              resolve(true);
            },
              (error) => {
                if (error) {
                  alert(error);
                }
              });
          } else {
            resolve(false);
          }
        }
      );
      this.deleteDialogOpen = true;
    });
  }

  openHotRCAsDialog(): void {
    this.dialog.open(HotRCAsDialogComponent, {
      disableClose: true,
      width: '800px',
      minHeight: '600px'
    });
  }

  openMsgDialog(dialogType: string, dialogMsg: string, bAllowCancel: boolean = true): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.dialog.open(MsgDialogComponent, {
        disableClose: true,
        data: {
          type: dialogType,
          msg: dialogMsg,
          okAction: () => {
            resolve(true);
          },
          cancelAction: () => {
            resolve(false);
          },
          isAllowCancel: bAllowCancel
          }
        }
       );
    });
  }
}
