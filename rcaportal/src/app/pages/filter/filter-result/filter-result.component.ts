import { Component, OnInit } from '@angular/core';
import { RCAItem } from '@app/entities/rcaItem';
import { FilterService } from '@app/services/filter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.css']
})
export class FilterResultComponent implements OnInit {
  public get filterResults(): Array<RCAItem> { return this.filterService.filterResults; };
  public get isLoadAllFinished(): boolean { return !this.isLoading && this.filterResults.length < this.filterService.currentMaxRCAResultCount; }
  public get isLoading(): boolean { return !this.filterService.isLoadFinished; }

  public get isCanLoad(): boolean { return !this.isNoResult && !this.isLoadAllFinished; }
  public get isNoResult(): boolean { return !this.isLoading && (!this.filterResults || this.filterResults.length == 0); }
  public get isNoMoreResult(): boolean { return !this.isNoResult && this.isLoadAllFinished; }

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    window.onscroll = () => {
      if (!this.isLoading && this.isCanLoad) {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

        if (scrollHeight - scrollTop - windowHeight < 30) {
          this.loadMore();
        }
      }
    }
  }

  loadMore() {
    this.filterService.currentMaxRCAResultCount += 10;
    this.filterService.getCurrentFilterResults();
  }
}
