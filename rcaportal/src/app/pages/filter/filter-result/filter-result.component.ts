import { Component, OnInit } from '@angular/core';
import { RCAItem } from '@app/entities/rcaItem';
import { FilterService } from '@app/services/filter.service';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.css']
})
export class FilterResultComponent implements OnInit {
  public get filterResults(): Array<RCAItem> { return this.filterService.filterResults; };
  public get isLoadAll(): boolean { return this.filterResults.length < this.filterService.currentMaxRCAResultCount; }
  public get isLoading(): boolean { return !this.filterService.isLoadFinished; }
  public get isNoResult(): boolean { return !this.isLoading && (!this.filterResults || this.filterResults.length == 0);}

  constructor(private filterService: FilterService) { }

  ngOnInit() {
  }

  onMoreClick() {
    this.filterService.currentMaxRCAResultCount += 10;
    this.filterService.getCurrentFilterResults();
  }
}
