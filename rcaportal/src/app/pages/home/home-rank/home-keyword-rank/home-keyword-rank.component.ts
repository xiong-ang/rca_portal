import { Component, OnInit } from '@angular/core';
import { HotKeyword } from '@app/entities/hotKeyword';
import { HotRankService } from '@app/services/hot-rank.service';

@Component({
  selector: 'app-home-keyword-rank',
  templateUrl: './home-keyword-rank.component.html',
  styleUrls: ['./home-keyword-rank.component.css']
})
export class HomeKeywordRankComponent implements OnInit {
  public HotKeywords: Array<HotKeyword>;
  public get isLoadAll(): boolean { return this.HotKeywords.length < 9 * (1 + this.currentPage) };
  public currentPage = 0;

  constructor(private hotRankService: HotRankService) {
    this.fetchKeywords();
  }

  ngOnInit() {
  }

  onMoreClick() {
    this.currentPage++;
    this.fetchKeywords();
  }

  private fetchKeywords() {
    this.hotRankService.getHotKeywords(0, 9 * (1 + this.currentPage)).then(keywords => {
      this.HotKeywords = keywords;
    })
  }
}
