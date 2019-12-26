import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RcaDetailPanelService {

  constructor() { }

  private _isPanelOpen = false;
  private _isPanelFixed = false;
  
  get isPanelOpen(){
    return this._isPanelOpen;
  }
  get isPanelFixed(){
    return this._isPanelFixed;
  }

  tiggerPanelStatus() {
    this._isPanelOpen = !this._isPanelOpen;
  }
  triggerPanelPostion() {
    if (this.isPanelOpen) {
      this._isPanelFixed = !this._isPanelFixed;
    }
  }
}
