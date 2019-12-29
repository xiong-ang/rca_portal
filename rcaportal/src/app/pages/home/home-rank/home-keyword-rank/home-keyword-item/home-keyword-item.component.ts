import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-home-keyword-item',
  templateUrl: './home-keyword-item.component.html',
  styleUrls: ['./home-keyword-item.component.css']
})
export class HomeKeywordItemComponent implements OnInit {

  constructor(private filterSrv: FilterService) { }

  ngOnInit() {
  }

  openKeyWordFilterResult(){
    this.filterSrv.openFilterResultPage();
  }
}
