import { Component, OnInit } from '@angular/core';
import { RcaDialogService } from 'src/app/services/rca-dialog.service';
import { RcaDetailService } from 'src/app/services/rca-detail.service';

@Component({
  selector: 'app-filter-result-item',
  templateUrl: './filter-result-item.component.html',
  styleUrls: ['./filter-result-item.component.css']
})
export class FilterResultItemComponent implements OnInit {

  constructor(private rcaDialogSrv: RcaDialogService, private rcaDetailSrv: RcaDetailService) { }

  ngOnInit() {
  }

  openRCADetail(){
    this.rcaDetailSrv.openRCADetail();
  }

  updateRCA(){
    this.rcaDialogSrv.openUpdateDialog();
  }
}
