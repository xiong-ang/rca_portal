import { Component, OnInit, Input } from '@angular/core';
import { RcaDetailService } from 'src/app/services/rca-detail.service';
import { RCAItem } from '@app/entities/rcaItem';

@Component({
  selector: 'app-home-rca-item',
  templateUrl: './home-rca-item.component.html',
  styleUrls: ['./home-rca-item.component.css']
})
export class HomeRcaItemComponent implements OnInit {
  @Input() hotRCA: RCAItem;
  @Input() rcaIndex: number;
  get RCARank(): string { return this.rcaIndex + 1 < 10 ? `0${this.rcaIndex + 1}` : `${this.rcaIndex + 1}`; }
  get RCAHeader(): string { return this.hotRCA.Header; }

  constructor() { }

  ngOnInit() {}
}
