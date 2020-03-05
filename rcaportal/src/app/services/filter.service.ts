import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FilterCondition } from '@app/entities/filterCondition';
import { RCAItem } from '@app/entities/rcaItem';
import { RequestProxyService } from './httpRequest/request-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public currentFilterCondition: FilterCondition;
  public filterResults: Array<RCAItem> = [];
  public currentMaxRCAResultCount = 10;
  public isLoadFinished = true;
  public filterConditionChangeEvent = new EventEmitter();

  constructor(private router: Router,
              private requestProxyService: RequestProxyService) { }

  getCurrentFilterResults() {
    this.isLoadFinished = false;
    this.requestProxyService.GetRCAs(this.currentFilterCondition, 1, this.currentMaxRCAResultCount)
    .then(
    (results) => {
      this.filterResults = results;
      this.isLoadFinished = true;
    },
    (err) => {
      this.isLoadFinished = true;
    })
  }

  showFilterResults(filterCondition) {
    this.currentFilterCondition = filterCondition;
    this.filterConditionChangeEvent.emit();

    this.filterResults = [];
    this.currentMaxRCAResultCount = 10;

    this.getCurrentFilterResults();
    this.router.navigateByUrl('/filter');
  }

  isFilterConditionEmpty() {
    return !this.currentFilterCondition || this.currentFilterCondition.isEmpty();
  }
}
