import { Component, OnInit } from '@angular/core';
import { RcaDetailService } from 'src/app/services/rca-detail.service';

@Component({
  selector: 'app-home-rca-item',
  templateUrl: './home-rca-item.component.html',
  styleUrls: ['./home-rca-item.component.css']
})
export class HomeRcaItemComponent implements OnInit {

  constructor(private rcaDetailSrv: RcaDetailService) { }

  ngOnInit() {
  }

  openRCADetail(){
    this.rcaDetailSrv.openRCADetail();
  }
}
