import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RCAItem } from '@app/entities/rcaItem';
import { HotRankService } from '@app/services/hot-rank.service';
import { RcaDetailService } from '@app/services/rca-detail.service';


@Component({
  selector: 'app-hotRCAs-Dialog',
  templateUrl: './hotRCAs-Dialog.component.html',
  styleUrls: ['./hotRCAs-Dialog.component.css']
})
export class HotRCAsDialogComponent {
  public RCAItems: Array<RCAItem>;
  public isLoading: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<HotRCAsDialogComponent>,
    private rcaDetailSrv: RcaDetailService,
    private hotRankService: HotRankService) {

    this.RCAItems = [];
    this.hotRankService.getHotRCAs(100).then(hotRCAs => {
      this.RCAItems = hotRCAs;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  openRCADetail(hotRCA: RCAItem) {
    this.rcaDetailSrv.openRCADetail(hotRCA);
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
