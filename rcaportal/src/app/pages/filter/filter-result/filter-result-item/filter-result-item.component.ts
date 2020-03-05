import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RcaDialogService } from 'src/app/services/rca-dialog.service';
import { RcaDetailService } from 'src/app/services/rca-detail.service';
import { RCAItem } from '@app/entities/rcaItem';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';
import { FilterService } from '@app/services/filter.service';

@Component({
  selector: 'app-filter-result-item',
  templateUrl: './filter-result-item.component.html',
  styleUrls: ['./filter-result-item.component.css']
})
export class FilterResultItemComponent implements OnInit {
  @Input() RCAResult: RCAItem;
  constructor(private rcaDialogSrv: RcaDialogService,
              private rcaDetailSrv: RcaDetailService,
              private router: Router,
              private requestProxyService: RequestProxyService,
              private filterService: FilterService) { }

  ngOnInit() {
  }

  openRCADetail(){
    this.rcaDetailSrv.openRCADetail(this.RCAResult.ID);
  }

  updateRCA(){
    this.rcaDialogSrv.openUpdateDialog(this.RCAResult.ID).then(
      success => {
        if (success) {
          this.requestProxyService.GetRCA(this.RCAResult.ID).then((rcaItem) => {
            this.RCAResult = rcaItem;
          });
        }
      }
    );
  }

  deleteRCA(){
    this.rcaDialogSrv.openDeleteDialog(this.RCAResult.ID, this.RCAResult.RCAID).then(
      success => {
        this.filterService.getCurrentFilterResults();
      }
    );
  }
}
