import { Component, OnInit, Input } from '@angular/core';
import { RCAItem } from '@app/entities/rcaItem';
import { FilterService } from 'src/app/services/filter.service';
import { FilterCondition } from '@app/entities/filterCondition';
import { RcaDialogService } from 'src/app/services/rca-dialog.service';
@Component({
  selector: 'app-rca-detail-info',
  templateUrl: './rca-detail-info.component.html',
  styleUrls: ['./rca-detail-info.component.css']
})
export class RcaDetailInfoComponent implements OnInit {
  @Input() RCADetail: RCAItem;
  get RCADetailTest() { return JSON.stringify(this.RCADetail); }

  constructor(private filterSrv: FilterService, private rcaDialogSrv: RcaDialogService) { }

  onClickKeyword(keyWord: string) {
    const filterCondition = new FilterCondition();
    filterCondition.Keywords.push(keyWord);
    this.filterSrv.showFilterResults(filterCondition);
  }
  updateRCA(){
    this.rcaDialogSrv.openUpdateDialog(this.RCADetail);
  }
  ngOnInit() {}
}
