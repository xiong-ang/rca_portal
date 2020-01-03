import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RCAItem } from '@app/entities/rcaItem';
import { HotRankService } from '@app/services/hot-rank.service';


@Component({
  selector: 'app-hotRCAs-Dialog',
  templateUrl: './hotRCAs-Dialog.component.html',
  styleUrls: ['./hotRCAs-Dialog.component.css']
})
export class HotRCAsDialogComponent {
  public RCAItems: Array<RCAItem>;

  constructor(
    public dialogRef: MatDialogRef<HotRCAsDialogComponent>,
    private hotRankService: HotRankService) {

    this.RCAItems = [];
    this.hotRankService.getHotRCAs(100).then(hotRCAs => {
      this.RCAItems = hotRCAs;
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
