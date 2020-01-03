import { Component, OnInit, Input } from '@angular/core';
import { RcaDialogService } from 'src/app/services/rca-dialog.service';
import { RcaDetailService } from 'src/app/services/rca-detail.service';
import { RCAItem } from '@app/entities/rcaItem';

@Component({
  selector: 'app-filter-result-item',
  templateUrl: './filter-result-item.component.html',
  styleUrls: ['./filter-result-item.component.css']
})
export class FilterResultItemComponent implements OnInit {
  @Input() RCAResult: RCAItem;
  constructor(private rcaDialogSrv: RcaDialogService, private rcaDetailSrv: RcaDetailService) { }

  ngOnInit() {
  }

  openRCADetail(){
    this.rcaDetailSrv.openRCADetail(this.RCAResult);
  }

  updateRCA(){
    this.rcaDialogSrv.openUpdateDialog(this.RCAResult);
  }

  deleteRCA(){
    this.rcaDialogSrv.openDeleteDialog(this.RCAResult.ID);
  }
}
