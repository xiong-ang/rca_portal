import { Component, OnInit } from '@angular/core';
import { RcaDetailPanelService } from 'src/app/services/rca-detail-panel.service';

@Component({
  selector: 'app-rca-panel',
  templateUrl: './rca-panel.component.html',
  styleUrls: ['./rca-panel.component.css']
})
export class RcaPanelComponent implements OnInit {

  constructor(private detailPanelSrv: RcaDetailPanelService) { }

  ngOnInit() {
  }

  get isPanelOpen(){
    return this.detailPanelSrv.isPanelOpen;
  }

  get isPanelFixed(){
    return this.detailPanelSrv.isPanelFixed;
  }

  tiggerPanelStatus(){
    this.detailPanelSrv.tiggerPanelStatus();
  }
  triggerPanelPostion(){
    this.detailPanelSrv.triggerPanelPostion();
  }
}
