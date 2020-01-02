import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RCAItem } from '@app/entities/rcaItem';

@Injectable({
  providedIn: 'root'
})
export class RcaDetailService {
  public currentRCAItem: RCAItem;

  constructor(private router: Router) { }

  getRCAById() {

  }

  getRCAByFilterCondition() {

  }

  openRCADetail() {
    this.router.navigateByUrl('/rca');
  }
}
