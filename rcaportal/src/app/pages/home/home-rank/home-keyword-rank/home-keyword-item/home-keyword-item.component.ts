import { Component, Input } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { HotKeyword } from '@app/entities/hotKeyword';
import { FilterCondition } from '@app/entities/filterCondition';

@Component({
  selector: 'app-home-keyword-item',
  templateUrl: './home-keyword-item.component.html',
  styleUrls: ['./home-keyword-item.component.css']
})
export class HomeKeywordItemComponent {
  @Input() hotKeyword: HotKeyword;
  @Input() keywordIndex: number;

  constructor(private filterSrv: FilterService) { }

  openKeyWordFilterResult() {
    let filterCondition = new FilterCondition();
    filterCondition.Keywords = [this.hotKeyword.KeywordValue];

    this.filterSrv.showFilterResults(filterCondition);
  }

  get keywordColor(): string {
    switch (this.keywordIndex) {
      case 0:
        return 'rgb(203,41,41)';
      case 1:
        return 'rgb(242,89,0)';
      case 2:
        return 'rgb(255,170,0)';
      case 3:
        return 'rgb(173,229,0)';
      case 4:
        return 'rgb(4,226,156)';
      case 5:
        return 'rgb(6,196,211)';
      case 6:
        return 'rgb(0,150,243)';
      case 7:
        return 'rgb(0,88,244)';
      case 8:
        return 'rgb(140,60,204)';
      default:
        return 'rgb(136,136,136)';
    }
  }
}
