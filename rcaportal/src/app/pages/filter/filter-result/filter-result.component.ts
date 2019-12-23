import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.css']
})
export class FilterResultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  
  isPanelOpen= false;
  isPanelFixed= false;
  tiggerPanelStatus(){
    this.isPanelOpen = !this.isPanelOpen;
  }
  triggerPanelPostion(){
    if(this.isPanelOpen){
      this.isPanelFixed = !this.isPanelFixed;
    }
  }
}
