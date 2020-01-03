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

@Injectable({
  providedIn: 'root'
})
export class RcaDialogService {
  constructor(public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private requestProxyService: RequestProxyService) { }

  openCreateDialog(): void {
    let newRCAItem = new RCAItem();
    //TODO: Init necessary items
    newRCAItem.Submitter = this.authenticationService.currentUserValue.userName;

    this.dialog.open(RcaDialogComponent, {
      width: '1000px',
      maxHeight: '800px',
      data: { type: 'Create', rcaData: newRCAItem }
    });
  }

  openUpdateDialog(rcaItem: RCAItem): void {
    this.dialog.open(RcaDialogComponent, {
      width: '1000px',
      maxHeight: '800px',
      data: { type:'Update', rcaData: rcaItem }
    });
  }

  openDeleteDialog(rcaID: string): void {
    this.dialog.open(MsgDialogComponent, {
      data: { type: 'warning',
        msg: `Do you want to delete RCA ${rcaID} ?`,
        okAction: ()=>{
          this.requestProxyService.DeleteRCA(rcaID);
        },
        cancelAction:()=>{}
      }
    });
  }

  openHotRCAsDialog(): void {
    this.dialog.open(HotRCAsDialogComponent, {
      width: '800px',
      minHeight: '600px'
    });
  }
}
