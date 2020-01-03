import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RCAItem } from '@app/entities/rcaItem';

@Injectable({
  providedIn: 'root'
})
export class RcaDetailService {
  public currentRCAItem: RCAItem;

  constructor(private router: Router) { }

  getRCAByFilterCondition() {

  }

  openRCADetail(rcaItem: RCAItem) {
    this.currentRCAItem = rcaItem;
    this.router.navigateByUrl('/rca');
  }
}
