import { Component, OnInit } from '@angular/core';
import { RCAItem } from '@app/entities/rcaItem';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';
import { FilterService } from '@app/services/filter.service';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.css']
})
export class FilterResultComponent implements OnInit {
  public get filterResults(): Array<RCAItem> { return this.filterService.filterResults; };
  public get isLoadAll(): boolean { return this.filterResults.length < this.filterService.currentMaxRCAResultCount; }

  constructor(private filterService: FilterService) {
  }

  ngOnInit() {
  }

  onMoreClick() {
    this.filterService.currentMaxRCAResultCount += 10;
    this.filterService.getCurrentFilterResults();
  }
}
