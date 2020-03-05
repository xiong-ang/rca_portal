import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RCAItem } from '@app/entities/rcaItem';
import { RequestProxyService } from './httpRequest/request-proxy.service';
@Injectable({
  providedIn: 'root'
})
export class RcaDetailService {
  public currentRCAItem: RCAItem;

  constructor(private router: Router, private requestProxyService: RequestProxyService) { }

  getRCAByFilterCondition() {

  }

  openRCADetail(RCAID: string) {
    this.requestProxyService.GetRCA(RCAID).then(
      RCAData => {
        this.currentRCAItem = RCAData;
        this.router.navigateByUrl('/rca');
      },
      (error) => {
        if (error) {
          alert(error);
        }
      });
  }
}
