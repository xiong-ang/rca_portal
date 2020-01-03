import { Injectable } from '@angular/core';
import { RequestProxyService } from './httpRequest/request-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class HotRankService {
  constructor(private requestProxyService: RequestProxyService) { }

  async getHotKeywords(start, count) {
    return this.requestProxyService.GetHotKeywords(start, count);
  }

  async getHotRCAs(count) {
    return this.requestProxyService.GetHotRCAs(0, count);
  }
}
