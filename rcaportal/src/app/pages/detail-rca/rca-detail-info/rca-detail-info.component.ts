import { Component, OnInit, Input } from '@angular/core';
import { RCAItem } from '@app/entities/rcaItem';

@Component({
  selector: 'app-rca-detail-info',
  templateUrl: './rca-detail-info.component.html',
  styleUrls: ['./rca-detail-info.component.css']
})
export class RcaDetailInfoComponent implements OnInit {
  @Input() RCADetail: RCAItem;
  get RCADetailTest() { return JSON.stringify(this.RCADetail); }

  constructor() { }

  ngOnInit() {
  }

}
