import { Component, OnInit } from '@angular/core';
import { HotRankService } from '@app/services/hot-rank.service';
import { RcaDialogService } from '@app/services/rca-dialog.service';
import { RCAItem } from '@app/entities/rcaItem';

@Component({
  selector: 'app-home-rca-rank',
  templateUrl: './home-rca-rank.component.html',
  styleUrls: ['./home-rca-rank.component.css']
})
export class HomeRcaRankComponent implements OnInit {
  public mostHotRCAs: Array<RCAItem> = [];
  public get isLoadAll(): boolean { return this.mostHotRCAs.length < 8 };
  public isFirstLoading: boolean = true;

  constructor(private hotRankService: HotRankService,
    private rcaDialogService: RcaDialogService) {
    this.mostHotRCAs = [];
    this.hotRankService.getHotRCAs(8).then(hotRCAs => {
      this.mostHotRCAs = hotRCAs;
      this.isFirstLoading = false;
    },()=>{
      this.isFirstLoading = false;
    });
  }

  ngOnInit() {
  }

  onUnfoldHotRCAs() {
    this.rcaDialogService.openHotRCAsDialog();
  }
}
