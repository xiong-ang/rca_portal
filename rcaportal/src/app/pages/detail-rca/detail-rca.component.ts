import { Component, OnInit } from '@angular/core';
import { RCAItem } from '@app/entities/rcaItem';
import { RcaDetailService } from '@app/services/rca-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-rca',
  templateUrl: './detail-rca.component.html',
  styleUrls: ['./detail-rca.component.css']
})
export class DetailRcaComponent implements OnInit {
  public get RCADetail(): RCAItem { return this.rcaDetailService.currentRCAItem; }

  constructor(private rcaDetailService: RcaDetailService,
    private router: Router) {

    if (!this.RCADetail) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
  }

}
